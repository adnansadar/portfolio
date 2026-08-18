export const CODE_FILENAME = "api/assessments.ts";

export const CODE_SAMPLE = `export const assessmentsApi = createApi({
  reducerPath: "assessments",
  baseQuery: authedBaseQuery,
  tagTypes: ["Competency", "Review"],
  endpoints: b => ({
    getFramework: b.query({
      query: id => \`/frameworks/\${id}\`,
      providesTags: ["Competency"],
      keepUnusedDataFor: 300,
    }),
    submitReview: b.mutation({
      query: body => ({ url: "/reviews", method: "POST", body }),
      invalidatesTags: ["Review"],
    }),
  }),
});
// Redux holds UI state only — server state lives here.`;

/** One character every 24ms, then a short hold before the loop restarts. */
export const TYPE_INTERVAL_MS = 24;
export const TYPE_HOLD_CHARS = 30;
