import { defineQuery } from "next-sanity";
import { Suspense } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { GenericSectionSkeleton } from "./Skeletons";

const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>
        <Suspense fallback={<GenericSectionSkeleton />}>
          <TestimonialsList />
        </Suspense>
      </div>
    </section>
  );
}

async function TestimonialsList() {
  const testimonials = await client.fetch(
    TESTIMONIALS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Map Sanity testimonials to AnimatedTestimonials format
  const formattedTestimonials = testimonials.map((testimonial) => ({
    quote: testimonial.testimonial || "",
    name: testimonial.name || "Anonymous",
    designation: testimonial.company
      ? `${testimonial.position} at ${testimonial.company}`
      : testimonial.position || "",
    // Use avatar for the main image
    src: testimonial.avatar
      ? urlFor(testimonial.avatar).width(500).height(500).url()
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    // Pass company logo separately to show next to name
    companyLogo: testimonial.companyLogo
      ? urlFor(testimonial.companyLogo).width(32).height(32).url()
      : undefined,
  }));

  return (
    <div className="relative z-10">
      <AnimatedTestimonials
        testimonials={formattedTestimonials}
        autoplay={true}
      />
    </div>
  );
}
