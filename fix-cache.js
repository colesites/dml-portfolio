const fs = require("fs");
const path = require("path");
const glob = require("glob");

const files = [
  "src/components/FloatingDock.tsx",
  "src/components/sections/TestimonialsSection.tsx",
  "src/components/sections/SkillsSection.tsx",
  "src/components/sections/EducationSection.tsx",
  "src/components/sections/ProjectsSection.tsx",
  "src/components/sections/BlogSection.tsx",
  "src/components/sections/ServicesSection.tsx",
  "src/components/sections/HeroSection.tsx",
  "src/components/sections/AchievementsSection.tsx",
  "src/components/sections/ExperienceSection.tsx",
  "src/components/sections/CertificationsSection.tsx",
  "src/components/sections/AboutSection.tsx",
];

files.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");

    // Remove "use cache" and cacheLife
    content = content.replace(
      /import \{ cacheLife \} from "next\/cache";?\n/g,
      "",
    );
    content = content.replace(/\s*"use cache";\n/g, "\n");
    content = content.replace(/\s*cacheLife\([^)]+\);\n/g, "\n");

    // Replace client.fetch without options
    // Find things like: await client.fetch(QUERY_NAME) or await client.fetch(QUERY)
    // Avoid double replacing
    const fetchRegex = /await client\.fetch\(([A-Z_]+)\)/g;

    // For FloatingDock.tsx, set revalidate to false (infinity)
    if (file.includes("FloatingDock.tsx")) {
      content = content.replace(
        fetchRegex,
        "await client.fetch($1, {}, { next: { revalidate: false } })",
      );
    } else {
      content = content.replace(
        fetchRegex,
        "await client.fetch($1, {}, { next: { revalidate: 3600 } })",
      );
    }

    fs.writeFileSync(filePath, content);
    console.log("Fixed", file);
  }
});
