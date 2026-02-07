import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/ContactFormEmail";
import { checkRateLimit } from "@/lib/rate-limiter";
import {
  validateEmail,
  validateName,
  validateMessage,
  sanitizeInput,
} from "@/lib/email-validation";
import { ContactFormData, ApiResponse } from "@/types/api";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration from environment variables
const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || "adnansadar11@gmail.com";
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

/**
 * POST /api/send-email
 * Handles contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          message: `Rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    // 2. Parse and validate request body
    let body: ContactFormData;

    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid request format",
        },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Validate all fields
    if (!validateName(name)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Name must be between 2 and 100 characters",
        },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid email address",
        },
        { status: 400 }
      );
    }

    if (!validateMessage(message)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Message must be between 10 and 1000 characters",
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // 3. Send email via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: CONTACT_EMAIL_FROM,
        to: CONTACT_EMAIL_TO,
        replyTo: sanitizedEmail,
        subject: `Portfolio Contact: ${sanitizedName}`,
        react: ContactFormEmail({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
        }),
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: "Failed to send email. Please try again later.",
          },
          { status: 500 }
        );
      }

      // 4. Return success response
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: "Email sent successfully",
          data: { id: data?.id },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in send-email route:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Reject non-POST requests
export async function GET() {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}
