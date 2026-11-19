// Dynamically calculated engineering experience from May 2024 to present
export function calculateExperience(startDate = new Date(2024, 4, 1)) {
  const now = new Date();
  const diffMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());
  const years = (diffMonths / 12).toFixed(1);
  const formatted = years.endsWith(".0") ? `${parseInt(years, 10)}` : years;
  return {
    months: diffMonths,
    yearsNumber: diffMonths / 12,
    yearsText: `${formatted} years`,
    yearsPlus: `${formatted}+ years`,
  };
}

export const exp = calculateExperience();

export const personal = {
  name: "Nukala Abhiram",
  title: "Software Engineer — React.js & React Native",
  location: "Hyd, IN",
  email: "abhiram.reddy122002@gmail.com",
  github: "https://github.com/AbhiramNukala",
  linkedin: "https://www.linkedin.com/in/nukala-abhiram-0a1828255",
  npm: "https://www.npmjs.com/~thedummyuser",
  summary: `Software Engineer with ${exp.yearsPlus} of experience building production React.js web applications and React Native iOS/Android apps in TypeScript. Delivered admin dashboards, role-based access control, mobile payments, and store releases. Comfortable across the stack from UI and state management to native modules; published an open-source C++/JSI Nitro Module for React Native.`,
};

export const links = {
  email: personal.email,
  github: personal.github,
  linkedin: personal.linkedin,
  npm: personal.npm,
};

export const skills = {
  Languages: ["TypeScript", "JavaScript (ES6+)", "C++", "SQL", "Java"],
  Mobile: [
    "React Native (New Architecture, Hermes)",
    "Expo (EAS Build/Submit/Update)",
    "React Navigation",
    "Reanimated",
    "Deep Linking",
    "JSI",
    "Nitro Modules",
  ],
  Web: [
    "React.js",
    "React Router",
    "Material UI",
    "Tailwind CSS",
    "Formik",
    "Yup",
    "HTML5",
    "CSS3",
    "spring mcp",
  ],
  "State & Data": [
    "Redux Toolkit",
    "RTK Query",
    "TanStack Query",
    "REST APIs",
    "OpenAPI",
    "Axios",
  ],
  "Auth & Services": [
    "Role-Based Access Control (RBAC)",
    "JWT/Token Refresh",
    "Cashfree Payment Gateway",
    "Firebase (FCM)",
    "Sentry",
  ],
  "Testing & Tooling": [
    "Jest",
    "React Native Testing Library",
    "GitHub Actions (CI/CD)",
    "Git",
    "React DevTools Profiler",
  ],
};

export const experience = [
  {
    company: "Mindwave AI Solutions",
    role: "Software Engineer (React.js & React Native)",
    period: "May 2024 – Present",
    place: "Hyderabad, India",
    projects: [
      {
        name: "Estimate AI",
        meta: "React.js property-damage assessment platform",
        tech: ["React.js", "RTK Query", "REST APIs", "Access Control"],
        points: [
          "Built role-specific interfaces and reusable components for a web app that generates property-damage estimates and repair-cost reports.",
          "Implemented protected routes and client-side access control; integrated REST APIs with RTK Query and shipped file uploads with validation and error handling.",
          "Ran client demos and turned feedback into scoped tasks while working with a four-developer frontend/backend team.",
        ],
      },
      {
        name: "Musidy",
        meta: "React.js dashboards and React Native app",
        tech: ["React.js", "React Native", "4-tier RBAC", "JWT Refresh", "Navigation"],
        points: [
          "Built most of the admin and artist web dashboards and contributed to the mobile app, released on both app stores.",
          "Architected a 4-tier RBAC system across web, Android, and iOS with role-based navigation, protected routes, token refresh, and session management, enabling business-account onboarding and blocking unauthorized route access.",
        ],
      },
      {
        name: "MedicalShare",
        meta: "React Native app (300+ active users)",
        tech: [
          "React Native",
          "Expo SDK 54",
          "React Navigation",
          "EAS Build",
          "RTK Query",
          "React.memo",
          "Cashfree",
          "Sentry",
          "Jest",
        ],
        points: [
          "Migrated the legacy bare React Native codebase to Expo SDK 54 and React Navigation; standardized EAS cloud builds, cutting store release time from 4 hours to under 25 minutes.",
          "Moved the data layer from Axios to RTK Query with automated cache invalidation, reducing redundant API calls.",
          "Profiled renders with React DevTools and applied memoized selectors and React.memo to sustain 60 FPS list scrolling.",
          "Owned the Cashfree checkout integration: deep-link redirects, payment verification, failure states, transaction history, and refund screens; coordinated webhook handling with backend developers.",
          "Set up Sentry and EAS Update for OTA hotfixes, maintaining ≥99.5% crash-free sessions; wrote Jest tests run in GitHub Actions.",
        ],
      },
    ],
  },
  {
    company: "Makeroot",
    role: "React Native Intern",
    period: "Apr 2024 – May 2024",
    place: "Remote",
    projects: [
      {
        name: "Brahma Varidi",
        meta: "Mobile MVP",
        tech: ["React Native", "REST Auth", "Offline Storage", "Figma Conversion"],
        points: [
          "Shipped the Brahma Varidi mobile MVP as the sole engineer in 4 weeks, covering navigation, REST authentication, and offline data persistence.",
          "Converted 20+ Figma designs into responsive React Native screens with reusable components and form validation.",
        ],
      },
    ],
  },
];

export const projects = [
  {
    title: "rn-udpb",
    subtitle: "C++/JSI Nitro Module",
    tag: "Open source · npm package",
    date: "Jul 2026",
    blurb:
      "Published an open-source React Native UDP relay and discovery module to npm, implementing native socket code in C++ with Nitro Modules (JSI) for iOS and Android, avoiding bridge serialization overhead. Exposed the native layer through strict TypeScript definitions and configurable packet-filtering APIs; documented installation and usage and automated npm releases.",
    stack: ["C++", "JSI", "Nitro Modules", "TypeScript", "React Native"],
    links: [
      { label: "GitHub", href: "https://github.com/AbhiramNukala/rn-udpb" },
      { label: "npm", href: "https://www.npmjs.com/package/rn-udpb" },
    ],
    install: "npm i rn-udpb",
  },
  {
    title: "Cosmos",
    subtitle: "Open-Source Mastodon Client",
    tag: "Open source · Mastodon client",
    date: "Jun – Sep 2026",
    blurb:
      "Built a React Native Mastodon client with multi-feed timelines, full-text search, and media playback. Generated type-safe API services from Mastodon's OpenAPI spec, replacing hand-written request code; used TanStack Query for deduplication, optimistic updates, and background sync.",
    stack: ["React Native", "TanStack Query", "OpenAPI", "TypeScript"],
    links: [{ label: "Codeberg", href: "https://codeberg.org/kekekuku/Cosmos" }],
  },
];
