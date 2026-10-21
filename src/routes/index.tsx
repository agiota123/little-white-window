import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tela Branca" },
      { name: "description", content: "Uma tela branca simples." },
      { property: "og:title", content: "Tela Branca" },
      { property: "og:description", content: "Uma tela branca simples." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <div className="min-h-screen bg-background" />,
});
