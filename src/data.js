import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

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
      { id: "tkinter", gambar: icon("python/python-original.svg"), nama: "Tkinter", ket: "GUI Library", dad: "700" },
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

import Project1 from "/assets/project/project1.jpg";
import Project2 from "/assets/project/project2.jpg";
import Project3 from "/assets/project/project3.jpg";
import Project4 from "/assets/project/project4.jpg";
import Project5 from "/assets/project/project5.jpg";
import Project6 from "/assets/project/project6.jpg";

export const listProyek = [
  {
    id: 1,
    image: Project1,
    title: "NovaTrend E-Commerce Platform",
    tech: "React • Node.js • Express • PostgreSQL • Prisma • Docker",
    subtitle: "A full-stack e-commerce platform built with a production-style architecture, featuring authentication, product management, shopping cart, and order workflows.",
    fullDescription: "A full-stack e-commerce platform built with a production-style architecture, featuring authentication, product management, shopping cart, and order workflows.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/cungcung-design/ecommerce-project",
    liveUrl: "https://ecommerce-frontend-yn2u.onrender.com/",
    dad: "100",
  },
  {
    id: 2,
    image: Project2,
    title: "Chin Fashion — Traditional Fashion E-Commerce",
    tech: "React • Node.js • Express • MongoDB • Tailwind",
    subtitle: "A traditional fashion e-commerce platform focused on clean product presentation, category browsing, and a boutique shopping experience.",
    fullDescription: "A traditional fashion e-commerce platform focused on clean product presentation, category browsing, and a boutique shopping experience.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/cungcung-design/Chin_Shop",
    liveUrl: "https://chin-fashion.vercel.app/",
    dad: "200",
  },
  {
    id: 3,
    image: Project3,
    title: "Hotel Management & Booking System",
    tech: "Laravel • PHP • MySQL • Blade • CSS",
    subtitle: "A web-based hotel booking system for managing rooms and reservations. It allows users to view available rooms and make bookings easily.",
    fullDescription: "A web-based hotel booking system for managing rooms and reservations. It allows users to view available rooms and make bookings easily.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/cungcung-design/self-learning/tree/main/laravel_project/hotel_project",
    hideLiveDemo: true,
    dad: "300",
  },
  {
    id: 4,
    image: Project4,
    title: "Smart POS — Desktop Point-of-Sale System",
    tech: "Python • Tkinter • MySQL",
    subtitle: "A desktop POS system for managing products, inventory, and sales. It also includes stock movements and receipt management for a simple business workflow.",
    fullDescription: "A desktop POS system for managing products, inventory, and sales. It also includes stock movements and receipt management for a simple business workflow.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/cungcung-design/python/tree/main/posFile",
    hideLiveDemo: true,
    dad: "400",
  },
  {
    id: 5,
    image: Project5,
    title: "SaaS Dashboard — Analytics & Management Platform",
    tech: "Next.js • TypeScript • Prisma • PostgreSQL • Tailwind",
    subtitle: "A SaaS management dashboard focused on data and user management. It provides analytics, access control, filtering, bulk actions, and activity logs.",
    fullDescription: "A SaaS management dashboard focused on data and user management. It provides analytics, access control, filtering, bulk actions, and activity logs.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/cungcung-design/nova",
    hideLiveDemo: true,
    dad: "500",
  },
  {
    id: 6,
    image: Project6,
    title: "Music App — Mobile Music Application",
    tech: "Flutter • Dart",
    subtitle: "A mobile music application built with Flutter for browsing and exploring music. It features clean navigation, responsive layouts, and a simple user-friendly interface.",
    fullDescription: "A mobile music application built with Flutter for browsing and exploring music. It features clean navigation, responsive layouts, and a simple user-friendly interface.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/cungcung-design/music-app-project",
    hideLiveDemo: true,
    dad: "600",
  },
];
