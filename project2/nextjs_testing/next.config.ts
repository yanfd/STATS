import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { codeInspectorPlugin } from "code-inspector-plugin";

const projectDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectDir,
  ...(process.env.NODE_ENV === "development"
    ? {
        turbopack: {
          rules: codeInspectorPlugin({
            bundler: "turbopack",
            showSwitch: true,
            exclude: ["src/app/layout.tsx"],
          }),
        },
      }
    : {}),
};

export default nextConfig;
