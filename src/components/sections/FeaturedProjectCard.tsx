"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { urlFor } from "@/sanity/lib/image";

import type { PROJECTS_QUERY_RESULT } from "../../../sanity.types";

type Project = NonNullable<PROJECTS_QUERY_RESULT>[number];

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer @container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 text-left h-full flex flex-col">
          {/* Project Image */}
          {project.coverImage && (
            <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
              <Image
                src={urlFor(project.coverImage).width(600).height(400).url()}
                alt={project.title || "Project image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Glass overlay that fades on hover */}
              <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] group-hover:opacity-0 transition-opacity duration-300" />
            </div>
          )}

          {/* Project Content */}
          <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4 flex flex-col flex-1">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {project.category && (
                  <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary">
                    {project.category}
                  </span>
                )}
              </div>
              <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                {project.title || "Untitled Project"}
              </h3>
              <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
                {project.tagline}
              </p>
            </div>

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 @md/card:gap-2 pt-2">
                {project.technologies.slice(0, 4).map((tech, idx) => {
                  const techData =
                    tech && typeof tech === "object" && "name" in tech
                      ? tech
                      : null;
                  return techData?.name ? (
                    <span
                      key={`${project.slug?.current}-tech-${idx}`}
                      className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
                    >
                      {techData.name}
                    </span>
                  ) : null;
                })}
                {project.technologies.length > 4 && (
                  <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            )}

            <div className="text-xs @md/card:text-sm text-primary font-medium mt-auto pt-2">
              View Project Details &rarr;
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {project.category && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {project.category}
              </span>
            )}
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            {project.title}
          </DialogTitle>
          {project.tagline && (
            <DialogDescription className="text-base">
              {project.tagline}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {project.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={urlFor(project.coverImage).width(1200).height(800).url()}
                alt={project.title || "Project"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg border hover:bg-accent transition-colors font-medium"
              >
                View on GitHub
              </Link>
            )}
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => {
                  const techData =
                    tech && typeof tech === "object" && "name" in tech
                      ? tech
                      : null;
                  return techData?.name ? (
                    <span
                      key={`modal-${project.slug?.current}-tech-${idx}`}
                      className="px-3 py-1 rounded-full bg-muted text-sm"
                    >
                      {techData.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {project.body && (
            <div>
              <h4 className="text-lg font-semibold mb-3">
                Project Description
              </h4>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <PortableText
                  value={project.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-8 mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                          {children}
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                          {children}
                        </ol>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
