export const links = {
  email: "abhiram.reddy122002@gmail.com",
  github: "https://github.com/AbhiramNukala",
  linkedin: "https://www.linkedin.com/in/nukala-abhiram-0a1828255/",
  npm: "https://www.npmjs.com/~thedummyuser",
};

export const stats = [
  ["99.5%", "crash-free sessions"],
  ["4h → 25m", "store release time"],
  ["60 FPS", "list scrolling"],
  ["4-tier", "RBAC, web + mobile"],
];

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "C++", "SQL", "Java"],
  Web: ["React.js", "React Router", "Material UI", "Tailwind CSS", "Formik", "Yup"],
  Mobile: ["React Native (New Arch, Hermes)", "Expo (EAS)", "React Navigation", "Reanimated", "JSI", "Nitro Modules"],
  "State & data": ["Redux Toolkit", "RTK Query", "TanStack Query", "REST", "OpenAPI", "Axios"],
  "Auth & services": ["RBAC", "JWT / token refresh", "Cashfree", "Firebase (FCM)", "Sentry"],
  "Testing & tooling": ["Jest", "RN Testing Library", "GitHub Actions", "Git", "React DevTools Profiler"],
};

export const experience = [
  {
    role: "Software Engineer (React.js & React Native)",
    company: "Mindwave AI Solutions",
    period: "May 2024 – Present",
    place: "Hyderabad, India",
    projects: [
      {
        name: "MedicalShare",
        meta: "React Native · 300+ active users",
        points: [
          "Migrated a legacy bare RN codebase to Expo SDK 54 and standardized EAS builds, cutting store releases from 4 hours to under 25 minutes.",
          "Owned the Cashfree checkout: deep-link redirects, payment verification, failure states, transaction history and refunds.",
          "Moved Axios to RTK Query with automated cache invalidation; sustained 60 FPS list scrolling via profiling, memoized selectors and React.memo.",
          "Set up Sentry and EAS Update for OTA hotfixes, keeping ≥99.5% crash-free sessions.",
        ],
      },
      {
        name: "Musidy",
        meta: "React.js dashboards + React Native app",
        points: [
          "Built most of the admin and artist web dashboards and contributed to the mobile app, released on both stores.",
          "Architected a 4-tier RBAC system across web, Android and iOS: role-based navigation, protected routes, token refresh and session management.",
        ],
      },
      {
        name: "Estimate AI",
        meta: "React.js property-damage assessment platform",
        points: [
          "Built role-specific interfaces and reusable components for generating damage estimates and repair-cost reports.",
          "Implemented protected routes, RTK Query integrations and validated file uploads; ran client demos with a four-developer team.",
        ],
      },
    ],
  },
  {
    role: "React Native Intern",
    company: "Makeroot",
    period: "Apr 2024 – May 2024",
    place: "Remote",
    projects: [
      {
        name: "Brahma Varidi",
        meta: "Mobile MVP",
        points: [
          "Shipped the MVP as sole engineer in 4 weeks: navigation, REST authentication and offline persistence.",
          "Converted 20+ Figma designs into responsive screens with reusable components and form validation.",
        ],
      },
    ],
  },
];

export type Project = {
  title: string;
  tag: string;
  date: string;
  blurb: string;
  stack: string[];
  links: { label: string; href: string }[];
  install?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "rn-udpb",
    tag: "Open source · npm",
    date: "Jul 2026",
    blurb:
      "A UDP relay and discovery module for React Native. Native socket code is written in C++ with Nitro Modules (JSI) for iOS and Android, avoiding bridge serialization overhead, and exposed through strict TypeScript types and configurable packet-filtering APIs.",
    stack: ["C++", "JSI", "Nitro Modules", "TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/AbhiramNukala/rn-udpb" },
      { label: "npm", href: "https://www.npmjs.com/package/rn-udpb" },
    ],
    install: "npm i rn-udpb",
    featured: true,
  },
  {
    title: "Cosmos",
    tag: "Open source · Mastodon client",
    date: "Jun – Sep 2026",
    blurb:
      "A React Native Mastodon client with multi-feed timelines, full-text search and media playback. API services are generated from Mastodon's OpenAPI spec, with TanStack Query handling deduplication, optimistic updates and background sync.",
    stack: ["React Native", "TanStack Query", "OpenAPI"],
    links: [{ label: "Source", href: "https://codeberg.org/kekekuku/Cosmos" }],
  },
];

export const services = [
  {
    label: "Mobile Development",
    title: "React Native & Expo Apps",
    description: "End-to-end mobile applications for iOS and Android with single-codebase efficiency, native device integrations, store releases, and OTA updates.",
    deliverables: [
      "iOS + Android from a single TypeScript codebase",
      "Expo SDK 54, Hermes & New Architecture",
      "API integration, caching & offline state synchronization",
      "Payment gateway integration (Cashfree / Stripe)",
      "App Store & Google Play Store submission & release management",
      "Post-launch warranty & monitoring setup",
    ],
  },
  {
    label: "Web Engineering",
    title: "Production React.js Web Apps",
    description: "High-performance responsive web applications, enterprise admin portals, and customer-facing dashboards with robust auth and state architecture.",
    deliverables: [
      "Responsive, accessible UI in React.js & Tailwind CSS",
      "Multi-tier Role-Based Access Control (RBAC) & JWT auth",
      "RTK Query / TanStack Query cache management",
      "File uploads, report generation & data visualization",
      "Automated CI/CD pipeline & production deployment",
      "Post-launch warranty & documentation",
    ],
  },
  {
    label: "Systems & Audits",
    title: "Performance Tuning & Native C++ Modules",
    description: "Deep technical consulting for teams hitting React Native bottlenecks, memory leaks, slow list scrolling, or requiring zero-overhead C++ JSI bindings.",
    deliverables: [
      "Custom C++ Nitro Modules & JSI bindings for high-throughput I/O",
      "Hermes profiling, React DevTools memory leak audits",
      "60 FPS list scrolling & re-render memoization optimization",
      "Bare workflow to Expo migration & EAS build automation",
    ],
  },
];
