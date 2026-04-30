import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { FloatingDockClient } from "./FloatingDockClient";

const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

export async function FloatingDock() {
  const navItems = await client.fetch(
    NAVIGATION_QUERY,
    {},
    { next: { revalidate: false } },
  );

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={navItems} />;
}
