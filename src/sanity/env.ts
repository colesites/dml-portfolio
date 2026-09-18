export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-26";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio";

/** Site origin for Presentation. Relative studio URLs stay same-origin (`"/"`). */
export const previewInitial = (() => {
  try {
    return new URL("/", studioUrl).origin;
  } catch {
    return "/";
  }
})();

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
