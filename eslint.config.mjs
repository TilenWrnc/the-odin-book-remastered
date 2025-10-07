import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Allow legacy-style extends (from Next.js config)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1️⃣ Ignore built and generated files
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "prisma/generated/**",
    ],
  },

  // 2️⃣ Extend Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 3️⃣ Custom rules for your project
  {
    rules: {
      // 💬 Disable noisy rules
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",

      // ⚠️ Make unused vars only a warning (and ignore `_`-prefixed ones)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // 🚫 Disable `{}` ban for Prisma and Clerk types
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            "{}": false,
          },
        },
      ],

      // 🧩 Optional relaxations for Next.js projects
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
