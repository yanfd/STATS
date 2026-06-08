"use client";

import CodeInspectorEmptyElement from "../../node_modules/.pnpm/code-inspector-plugin@1.5.1/node_modules/code-inspector-plugin/dist/append-code-5678.js";

export function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <CodeInspectorEmptyElement />
      ) : null}
    </>
  );
}
