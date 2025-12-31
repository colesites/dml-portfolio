import { serverClient } from "@/sanity/lib/serverClient";

const PORTFOLIO_CONTEXT_QUERY = `{
  "profile": *[_type == "profile"][0]{
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    yearsOfExperience,
    socialLinks,
    stats
  },
  "experience": *[_type == "experience"] | order(startDate desc){
    company,
    position,
    location,
    startDate,
    endDate,
    current,
    achievements,
    responsibilities,
    description,
    employmentType,
    technologies[]->{
      name,
      category
    }
  },
  "projects": *[_type == "project"] | order(_createdAt desc)[0...8]{
    title,
    description,
    technologies,
    liveUrl,
    githubUrl,
    category,
    featured
  },
  "skills": *[_type == "skill"] | order(proficiency desc){
    name,
    category,
    proficiency,
    percentage,
    yearsOfExperience
  },
  "education": *[_type == "education"] | order(endDate desc){
    institution,
    degree,
    field,
    startDate,
    endDate,
    gpa,
    description
  },
  "services": *[_type == "service"]{
    title,
    description,
    icon,
    featured
  },
  "testimonials": *[_type == "testimonial"]{
    name,
    role,
    company,
    content
  }
}`;

export type PortfolioContext = Awaited<
  ReturnType<typeof fetchPortfolioContext>
>;

export async function fetchPortfolioContext() {
  return serverClient.fetch(PORTFOLIO_CONTEXT_QUERY);
}

const MAX_CONTEXT_CHAR_LENGTH = 15000;

export function formatContextForPrompt(context: PortfolioContext) {
  const contextString = JSON.stringify(context, null, 2);
  if (contextString.length <= MAX_CONTEXT_CHAR_LENGTH) {
    return contextString;
  }

  return `${contextString.slice(
    0,
    MAX_CONTEXT_CHAR_LENGTH,
  )}\n...context truncated for length`;
}
