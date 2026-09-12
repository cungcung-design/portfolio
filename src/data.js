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

const icon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const si = (slug, color = "ffffff") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const skillGroups = [
  {
    title: "Languages",
    items: [
      { id: "html", gambar: Tools14, nama: "HTML", ket: "Language", dad: "100" },
      { id: "css", gambar: Tools15, nama: "CSS", ket: "Language", dad: "150" },
      { id: "javascript", gambar: Tools6, nama: "JavaScript", ket: "Language", dad: "200" },
      { id: "python", gambar: icon("python/python-original.svg"), nama: "Python", ket: "Language", dad: "250" },
      { id: "typescript", gambar: Tools16, nama: "TypeScript", ket: "Language", dad: "300" },
      { id: "php", gambar: Tools17, nama: "PHP", ket: "Language", dad: "350" },
      { id: "dart", gambar: icon("dart/dart-original.svg"), nama: "Dart", ket: "Language", dad: "400" },
      { id: "sql", gambar: icon("sqlite/sqlite-original.svg"), nama: "SQL", ket: "Language", dad: "450" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { id: "react", gambar: Tools2, nama: "React", ket: "Library", dad: "100" },
      { id: "nextjs", gambar: Tools3, nama: "Next.js", ket: "Framework", dad: "150" },
      { id: "laravel", gambar: icon("laravel/laravel-original.svg"), nama: "Laravel", ket: "Framework", dad: "200" },
      { id: "fastapi", gambar: icon("fastapi/fastapi-original.svg"), nama: "FastAPI", ket: "Framework", dad: "250" },
      { id: "django", gambar: icon("django/django-plain.svg"), nama: "Django", ket: "Framework", dad: "300", invert: true },
      { id: "flutter", gambar: icon("flutter/flutter-original.svg"), nama: "Flutter", ket: "Framework", dad: "350" },
      { id: "tailwind", gambar: Tools4, nama: "Tailwind CSS", ket: "Framework", dad: "400" },
      { id: "bootstrap", gambar: Tools5, nama: "Bootstrap", ket: "Framework", dad: "450" },
      { id: "nodejs", gambar: Tools7, nama: "Node.js", ket: "Runtime", dad: "500" },
      { id: "express", gambar: icon("express/express-original.svg"), nama: "Express.js", ket: "Framework", dad: "550", invert: true },
      { id: "prisma", gambar: icon("prisma/prisma-original.svg"), nama: "Prisma", ket: "ORM", dad: "600", invert: true },
      // { id: "sqlalchemy", gambar: si("sqlalchemy", "D71F00"), nama: "SQLAlchemy", ket: "ORM", dad: "650" },
      // { id: "tkinter", gambar: icon("python/python-original.svg"), nama: "Tkinter", ket: "GUI Library", dad: "700" },
    ],
  },
  {
    title: "Tools & Other Technologies",
    items: [
      { id: "postgresql", gambar: icon("postgresql/postgresql-original.svg"), nama: "PostgreSQL", ket: "Database", dad: "100" },
      { id: "mysql", gambar: Tools19, nama: "MySQL", ket: "Database", dad: "150" },
      { id: "mongodb", gambar: icon("mongodb/mongodb-original.svg"), nama: "MongoDB", ket: "Database", dad: "200" },
      { id: "docker", gambar: icon("docker/docker-original.svg"), nama: "Docker", ket: "DevOps", dad: "250" },
      { id: "git", gambar: icon("git/git-original.svg"), nama: "Git", ket: "Version Control", dad: "300" },
      { id: "github", gambar: Tools8, nama: "GitHub", ket: "Repository", dad: "350" },
      { id: "restapi", gambar: si("swagger", "85EA2D"), nama: "REST API", ket: "API", dad: "400" },
      // { id: "jwt", gambar: si("jsonwebtokens", "ffffff"), nama: "JWT Authentication", ket: "Auth", dad: "450" },
      // { id: "websocket", gambar: si("socketdotio", "ffffff"), nama: "WebSocket", ket: "Realtime", dad: "500" },
      { id: "redis", gambar: icon("redis/redis-original.svg"), nama: "Redis", ket: "Cache", dad: "550" },
      // { id: "celery", gambar: si("celery", "37814A"), nama: "Celery", ket: "Task Queue", dad: "600" },
      { id: "cloudinary", gambar: si("cloudinary", "3448C5"), nama: "Cloudinary", ket: "Media", dad: "650" },
      { id: "stripe", gambar: si("stripe", "635BFF"), nama: "Stripe", ket: "Payments", dad: "700" },
      { id: "vite", gambar: Tools18, nama: "Vite", ket: "Build Tool", dad: "750" },
      { id: "figma", gambar: Tools11, nama: "Figma", ket: "Design", dad: "800" },
      // { id: "linux", gambar: icon("linux/linux-original.svg"), nama: "Linux", ket: "OS", dad: "850" },
      // { id: "postman", gambar: icon("postman/postman-original.svg"), nama: "Postman", ket: "API Testing", dad: "900" },
    ],
  },
];

export const listTools = skillGroups.flatMap((group) => group.items);
