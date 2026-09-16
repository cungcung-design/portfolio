import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools5 from "/assets/tools/bootstrap.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools11 from "/assets/tools/figma.png";
import Tools14 from "/assets/tools/html.png";
import Tools15 from "/assets/tools/css.png";
import Tools16 from "/assets/tools/ts.png";
import Tools17 from "/assets/tools/php.png";
import Tools18 from "/assets/tools/vite.png";
import Tools19 from "/assets/tools/mysql.png";

const iconUrl = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const simpleIcon = (slug, color = "ffffff") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const skillGroups = [
  {
    title: "Languages",
    items: [
      { id: "html", icon: Tools14, name: "HTML", type: "Language", delay: "100" },
      { id: "css", icon: Tools15, name: "CSS", type: "Language", delay: "150" },
      { id: "javascript", icon: Tools6, name: "JavaScript", type: "Language", delay: "200" },
      { id: "python", icon: iconUrl("python/python-original.svg"), name: "Python", type: "Language", delay: "250" },
      { id: "typescript", icon: Tools16, name: "TypeScript", type: "Language", delay: "300" },
      { id: "php", icon: Tools17, name: "PHP", type: "Language", delay: "350" },
      { id: "dart", icon: iconUrl("dart/dart-original.svg"), name: "Dart", type: "Language", delay: "400" },
      { id: "sql", icon: iconUrl("sqlite/sqlite-original.svg"), name: "SQL", type: "Language", delay: "450" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { id: "react", icon: Tools2, name: "React", type: "Library", delay: "100" },
      { id: "vue", icon: iconUrl("vuejs/vuejs-original.svg"), name: "Vue.js", type: "Framework", delay: "125" },
      { id: "nextjs", icon: Tools3, name: "Next.js", type: "Framework", delay: "150" },
      { id: "laravel", icon: iconUrl("laravel/laravel-original.svg"), name: "Laravel", type: "Framework", delay: "200" },
      { id: "fastapi", icon: iconUrl("fastapi/fastapi-original.svg"), name: "FastAPI", type: "Framework", delay: "250" },
      // Official dark/black SVGs don't read on dark cards — use bright Simple Icons
      { id: "django", icon: simpleIcon("django", "34D399"), name: "Django", type: "Framework", delay: "300" },
      { id: "flutter", icon: iconUrl("flutter/flutter-original.svg"), name: "Flutter", type: "Framework", delay: "350" },
      { id: "tailwind", icon: Tools4, name: "Tailwind CSS", type: "Framework", delay: "400" },
      { id: "bootstrap", icon: Tools5, name: "Bootstrap", type: "Framework", delay: "450" },
      { id: "nodejs", icon: Tools7, name: "Node.js", type: "Runtime", delay: "500" },
      { id: "express", icon: simpleIcon("express", "ffffff"), name: "Express.js", type: "Framework", delay: "550" },
      { id: "prisma", icon: simpleIcon("prisma", "A5B4FC"), name: "Prisma", type: "ORM", delay: "600" },
      // { id: "sqlalchemy", icon: simpleIcon("sqlalchemy", "D71F00"), name: "SQLAlchemy", type: "ORM", delay: "650" },
      // { id: "tkinter", icon: iconUrl("python/python-original.svg"), name: "Tkinter", type: "GUI Library", delay: "700" },
    ],
  },
  {
    title: "Tools & Other Technologies",
    items: [
      { id: "postgresql", icon: iconUrl("postgresql/postgresql-original.svg"), name: "PostgreSQL", type: "Database", delay: "100" },
      { id: "mysql", icon: Tools19, name: "MySQL", type: "Database", delay: "150" },
      { id: "mongodb", icon: iconUrl("mongodb/mongodb-original.svg"), name: "MongoDB", type: "Database", delay: "200" },
      { id: "docker", icon: iconUrl("docker/docker-original.svg"), name: "Docker", type: "DevOps", delay: "250" },
      { id: "git", icon: iconUrl("git/git-original.svg"), name: "Git", type: "Version Control", delay: "300" },
      { id: "github", icon: Tools8, name: "GitHub", type: "Repository", delay: "350" },
      { id: "restapi", icon: simpleIcon("swagger", "85EA2D"), name: "REST API", type: "API", delay: "400" },
      // { id: "jwt", icon: simpleIcon("jsonwebtokens", "ffffff"), name: "JWT Authentication", type: "Auth", delay: "450" },
      // { id: "websocket", icon: simpleIcon("socketdotio", "ffffff"), name: "WebSocket", type: "Realtime", delay: "500" },
      { id: "redis", icon: iconUrl("redis/redis-original.svg"), name: "Redis", type: "Cache", delay: "550" },
      // { id: "celery", icon: simpleIcon("celery", "37814A"), name: "Celery", type: "Task Queue", delay: "600" },
      { id: "cloudinary", icon: simpleIcon("cloudinary", "3448C5"), name: "Cloudinary", type: "Media", delay: "650" },
      { id: "stripe", icon: simpleIcon("stripe", "635BFF"), name: "Stripe", type: "Payments", delay: "700" },
      { id: "vite", icon: Tools18, name: "Vite", type: "Build Tool", delay: "750" },
      { id: "figma", icon: Tools11, name: "Figma", type: "Design", delay: "800" },
      // { id: "linux", icon: iconUrl("linux/linux-original.svg"), name: "Linux", type: "OS", delay: "850" },
      // { id: "postman", icon: iconUrl("postman/postman-original.svg"), name: "Postman", type: "API Testing", delay: "900" },
    ],
  },
];

export const listTools = skillGroups.flatMap((group) => group.items);
