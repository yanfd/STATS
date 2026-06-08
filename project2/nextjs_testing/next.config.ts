import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
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
