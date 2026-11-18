import kingImg from "../assets/stickers/king.webp";
import exclamationImg from "../assets/stickers/exclamation.webp";
import starryNightImg from "../assets/stickers/starry-night.webp";
import moonImg from "../assets/stickers/moon.webp";
import statueImg from "../assets/stickers/statue.webp";
import doveImg from "../assets/stickers/dove.webp";
import knightImg from "../assets/stickers/knight.webp";
import fireImg from "../assets/stickers/fire.webp";
import crownImg from "../assets/stickers/crown.webp";
import flowerImg from "../assets/stickers/flower.webp";
import cloverImg from "../assets/stickers/clover.webp";
import carImg from "../assets/stickers/car.webp";
import einsteinImg from "../assets/stickers/einstein.webp";
import tigerImg from "../assets/stickers/tiger.webp";
import handImg from "../assets/stickers/hand.webp";

export interface Sticker {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: "core" | "architecture" | "craft" | "vibe";
  tagline: string;
  story: string;
  image: ImageMetadata;
  rotation: number; // degrees for playful sticker tilt
  badgeText: string;
}

const baseStickers: Record<string, Sticker> = {
  tiger: {
    id: "4796",
    slug: "tiger",
    name: "Roaring Bengal Tiger",
    role: "Portfolio Mascot & Personal Emblem",
    category: "core",
    tagline: "Fierce Execution & Relentless Curiosity",
    story: "Representing Hyderabad roots and relentless determination in engineering high-stakes production systems.",
    image: tigerImg,
    rotation: -4,
    badgeText: "Mascot",
  },
  king: {
    id: "4783",
    slug: "king",
    name: "Chess King",
    role: "System Architecture & Access Control",
    category: "architecture",
    tagline: "End-Game Precision & 4-Tier RBAC",
    story: "Architected 4-tier role-based access control protecting critical routes across web, Android, and iOS.",
    image: kingImg,
    rotation: 3,
    badgeText: "RBAC & Architecture",
  },
  knight: {
    id: "4789",
    slug: "knight",
    name: "Tactical Knight",
    role: "Native Bridge & Nitro Modules",
    category: "architecture",
    tagline: "Leaping the JS-to-Native Bridge with C++",
    story: "Unconventional moves: building C++ Nitro Modules with JSI to eliminate serialization overhead.",
    image: knightImg,
    rotation: -6,
    badgeText: "C++ / JSI",
  },
  fire: {
    id: "4790",
    slug: "fire",
    name: "Blazing Flame",
    role: "Performance & Rendering Optimization",
    category: "craft",
    tagline: "60 FPS List Scrolling & Fast Execution",
    story: "Profiled React renders with DevTools, memoized selectors, and Hermes engine tuning to sustain liquid-smooth 60 FPS.",
    image: fireImg,
    rotation: 5,
    badgeText: "60 FPS Performance",
  },
  crown: {
    id: "4791",
    slug: "crown",
    name: "Imperial Crown",
    role: "Open-Source npm Releases",
    category: "core",
    tagline: "Production Grade & Package Authoring",
    story: "Published rn-udpb on npm with strict TypeScript types, cross-platform socket relay, and automated CI releases.",
    image: crownImg,
    rotation: -3,
    badgeText: "npm Author",
  },
  moon: {
    id: "4786",
    slug: "moon",
    name: "Halftone Full Moon",
    role: "Deep Work & Dark Mode",
    category: "vibe",
    tagline: "Late-Night Deep Engineering Sprints",
    story: "The quiet hours where complex state synchronizations, OpenAPI codegen, and Nitro modules come together.",
    image: moonImg,
    rotation: 2,
    badgeText: "Deep Work",
  },
  "starry-night": {
    id: "4785",
    slug: "starry-night",
    name: "Starry Night Canvas",
    role: "Frontend Craft & UI Polish",
    category: "craft",
    tagline: "Artistry in Modern Frontend Design",
    story: "Crafting beautiful, accessible web applications with Tailwind CSS, typography, and fluid micro-interactions.",
    image: starryNightImg,
    rotation: -2,
    badgeText: "UI & Craft",
  },
  statue: {
    id: "4787",
    slug: "statue",
    name: "Classical Apollo Bust",
    role: "Engineering Principles & Discipline",
    category: "architecture",
    tagline: "Timeless Software Craftsmanship",
    story: "Clean separations of concerns, OpenAPI contracts, and durable type systems that stand the test of time.",
    image: statueImg,
    rotation: 4,
    badgeText: "Principles",
  },
  dove: {
    id: "4788",
    slug: "dove",
    name: "Soaring Dove",
    role: "Stability & Crash-Free Releases",
    category: "core",
    tagline: "≥99.5% Crash-Free Peace of Mind",
    story: "Configured Sentry monitoring and EAS Update OTA pipelines to guarantee peaceful, rock-solid user experiences.",
    image: doveImg,
    rotation: -5,
    badgeText: "99.5% Stability",
  },
  flower: {
    id: "4792",
    slug: "flower",
    name: "Blooming Daisy",
    role: "Ecosystem Growth & Delight",
    category: "craft",
    tagline: "Human-Centered Design & UI Empathy",
    story: "Software should feel alive, humane, and pleasant. Bringing warmth to technical tooling and user interfaces.",
    image: flowerImg,
    rotation: 6,
    badgeText: "Design Empathy",
  },
  clover: {
    id: "4793",
    slug: "clover",
    name: "Lucky Shamrock",
    role: "Resilient Engineering & Zero Flakes",
    category: "vibe",
    tagline: "Fortune Favors the Prepared Build",
    story: "CI/CD pipelines with GitHub Actions and Jest tests ensuring reliable cloud builds every single time.",
    image: cloverImg,
    rotation: -4,
    badgeText: "CI/CD Resilient",
  },
  car: {
    id: "4794",
    slug: "car",
    name: "Vintage Sedan",
    role: "End-to-End Delivery Vehicle",
    category: "architecture",
    tagline: "Full Lifecycle: From Figma to Store Release",
    story: "From converting 20+ Figma screens in 4 weeks to integrating Cashfree payment gateways and app store launches.",
    image: carImg,
    rotation: 3,
    badgeText: "Full Lifecycle",
  },
  einstein: {
    id: "4795",
    slug: "einstein",
    name: "Playful Einstein",
    role: "Curiosity & Relentless Experimentation",
    category: "vibe",
    tagline: "Curious Minds Build Bold Systems",
    story: "Relentless curiosity: exploring Nitro Modules, JSI, Hermeneutics of performance, and never settling for 'good enough'.",
    image: einsteinImg,
    rotation: -7,
    badgeText: "Curious Mind",
  },
  hand: {
    id: "4797",
    slug: "hand",
    name: "Finger Gun Pointer",
    role: "Direct Collaboration & Action",
    category: "core",
    tagline: "Let's Build Something Memorable",
    story: "Points directly to opportunities, open collaboration, and building high-impact products together.",
    image: handImg,
    rotation: 4,
    badgeText: "Let's Connect",
  },
  exclamation: {
    id: "4784",
    slug: "exclamation",
    name: "Exclamation Marks !!",
    role: "Velocity & Rapid Shipping",
    category: "craft",
    tagline: "Release Time Cut from 4h to 25m",
    story: "Standardized EAS cloud builds, cutting mobile store release turnaround time from 4 hours down to under 25 minutes.",
    image: exclamationImg,
    rotation: -3,
    badgeText: "10x Velocity",
  },
};

export const stickers: Record<string, Sticker> = {
  ...baseStickers,
  starryNight: baseStickers["starry-night"],
};

export const stickerList = Object.values(baseStickers);
