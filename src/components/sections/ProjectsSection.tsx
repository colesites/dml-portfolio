import { defineQuery } from "next-sanity";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectsSkeleton } from "./Skeletons";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  body,
  technologies[]->{name, category, color}
}`);

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
    </section>
  );
}

async function ProjectsList() {
  const projects = await client.fetch(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <FeaturedProjectCard
            key={project.slug?.current || project.title}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
