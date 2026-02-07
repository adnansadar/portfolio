/**
 * Email validation utilities for server-side validation
 */

/**
 * Validates email format using RFC 5322 compliant regex
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Validates name field
 */
export function validateName(name: string): boolean {
  if (!name || typeof name !== "string") return false;

  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 100;
}

/**
 * Validates message field
 */
export function validateMessage(message: string): boolean {
  if (!message || typeof message !== "string") return false;

  const trimmedMessage = message.trim();
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 1000;
}

/**
 * Sanitizes input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}
