import { readFileSync } from "fs";
import type { NextConfig } from "next";
import { join } from "path";

// Read package.json to get version
const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8")
);

const nextConfig: NextConfig = {
  env: {
    APP_VERSION: packageJson.version,
  },
};

export default nextConfig;
