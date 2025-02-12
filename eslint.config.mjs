import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused vars check
      "@typescript-eslint/no-explicit-any": "off", // Allow any type usage
      "@typescript-eslint/no-non-null-assertion": "off", // Disable non-null assertion errors
      "react/no-unescaped-entities": "off", // Disable unescaped entities warning
      "react-hooks/exhaustive-deps": "warn" // Relax exhaustive-deps warning in useEffect
    }
  }
];

export default eslintConfig;
