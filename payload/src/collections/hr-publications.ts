import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const HRPublications: CollectionConfig = {
  slug: "hr_publications",
  fields: [
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
      label: "Firma",
    },
    { name: "title", type: "text", required: true, label: "Titel" },
    {
      name: "summary",
      type: "text",
      label: "Zusammenfassung",
      admin: {
        description:
          "Wenn dieses Feld leer ist, wird es automatisch befüllt. Für automatische Änderung Feld leeren.",
      },
    },
    {
      name: "publication_date",
      type: "date",
      label: "Veröffentlichungsdatum",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
      required: true,
    },
    {
      name: "publication_data",
      type: "array",
      fields: [
        {
          name: "row",
          type: "select",
          options: [
            "2a) Firma",
            "2b) Sitz, Niederlassung, Zweigniederlassung",
            "2c) Gegenstand des Unternehmens",
            "3) Grund- oder Stammkapital",
            "4a) Allgemeine Vertretungsregelung",
            "4b.1) Inhaber, persönlich haftende Gesellschafter",
            "4b.2) Geschäftsführer, Vorstand, Leitungsorgan",
            "4b.3) sonstige Vertretungsberechtigte",
            "5) Prokura",
            "6a.1) Rechtsform",
            "6a.2) Beginn, Satzung, Gesellschaftsvertrag",
            "6b) Sonstige Rechtsverhältnisse",
            "6c) Kommanditisten, Mitglieder",
          ],
          label: "Spalte",
          required: true,
        },
        { name: "value", type: "richText", required: true, label: "Inhalt" },
        {
          name: "outdated_publication",
          type: "relationship",
          relationTo: "hr_publications",
          label: "Aufgehobene Publikationen",
          hasMany: true,
          filterOptions: {
            id: { not_equals: "{ID}" },
          },
          admin: { allowCreate: false },
        },
      ],
      label: "Gliederungsdaten",
      minRows: 1,
    },
    { name: "description", type: "richText", label: "Beschreibung" },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      label: "Verbundene Dokumente",
      hasMany: true,
    },
    {
      name: "mentioned_companies",
      type: "relationship",
      relationTo: "companies",
      label: "Erwähnte Firmen",
      hasMany: true,
    },
  ],
  labels: {
    singular: "HR Veröffentlichung",
    plural: "HR Veröffentlichungen",
  },
  admin: { useAsTitle: "title" },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const MAX = 150;
        if (typeof data.summary === "string" && data.summary.trim()) {
          return data;
        }

        const truncate = (s: string) => {
          if (s.length <= MAX) {
            return `${s}...`;
          }
          return `${s.slice(0, MAX - 3)}...`;
        };

        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: its a complex task
        // biome-ignore lint/suspicious/noExplicitAny: The type of node is too complex
        const walkNode = (node: any, parts: string[]): void => {
          if (node == null) {
            return;
          }
          if (typeof node === "string") {
            parts.push(node);
            return;
          }
          if (Array.isArray(node)) {
            for (const child of node) {
              walkNode(child, parts);
            }
            return;
          }
          if (typeof node === "object") {
            if (typeof node.text === "string") {
              parts.push(node.text);
              return;
            }
            if (Array.isArray(node.children) && node.children.length) {
              walkNode(node.children, parts);
              return;
            }
            if (node.root && Array.isArray(node.root.children)) {
              walkNode(node.root.children, parts);
              return;
            }
            for (const child of Object.values(node)) {
              walkNode(child, parts);
            }
          }
        };

        const extractTextFromRichText = (val: string): string => {
          if (val == null) {
            return "";
          }
          if (typeof val === "string") {
            return val.replace(/\s+/g, " ").trim();
          }
          const parts: string[] = [];
          walkNode(val, parts);
          return parts.join(" ").replace(/\s+/g, " ").trim();
        };

        if (
          Array.isArray(data.publication_data) &&
          data.publication_data.length > 0
        ) {
          const used = data.publication_data
            // biome-ignore lint/suspicious/noExplicitAny: unclear type of property r
            .map((r: any) => r?.row)
            .filter(Boolean)
            .map((opt: string) => {
              const idx = opt.indexOf(") ");
              return idx !== -1 ? opt.slice(idx + 2).trim() : opt.trim();
            });
          const unique = Array.from(new Set(used));
          data.summary = truncate(unique.join(", "));
          return data;
        }

        const descText = extractTextFromRichText(data.description);
        if (descText) {
          data.summary = truncate(descText);
        }

        return data;
      },
    ],
  },
};
