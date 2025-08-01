import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["jest.config.js", "jest.setup.js"],
  },
  {
    rules: {
      // Auto-fix unescaped entities
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            {
              char: '"',
              alternatives: ["&quot;", "&ldquo;", "&rdquo;"],
            },
            {
              char: "'",
              alternatives: ["&apos;", "&lsquo;", "&rsquo;"],
            },
            {
              char: ">",
              alternatives: ["&gt;"],
            },
            {
              char: "}",
              alternatives: ["&#125;"],
            },
          ],
        },
      ],
      // Auto-fix other common issues
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
