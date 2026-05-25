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
      name: "publicationDate",
      type: "date",
      label: "Veröffentlichungsdatum",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
      required: true,
    },
    {
      name: "publicationData",
      type: "array",
      fields: [
        {
          name: "row",
          type: "select",
          options: [
            "Firma",
            "Sitz, Niederlassung, Zweigniederlassung",
            "Gegenstand des Unternehmens",
            "Grund- oder Stammkapital",
            "Allgemeine Vertretungsregelung",
            "Inhaber, persönlich haftende Gesellschafter",
            "Geschäftsführer, Vorstand, Leitungsorgan",
            "sonstige Vertretungsberechtigte",
            "Prokura",
            "Rechtsform",
            "Beginn, Satzung, Gesellschaftsvertrag",
            "Sonstige Rechtsverhältnisse",
            "Kommanditisten, Mitglieder",
          ],
          label: "Spalte",
          required: true,
        },
        { name: "value", type: "richText", required: true, label: "Inhalt" },
        {
          name: "outdatedBy",
          type: "relationship",
          relationTo: "hr_publications",
          label: "Aufgehoben durch",
          hasMany: false,
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
      name: "docs",
      type: "upload",
      relationTo: "docs",
      label: "Verbundene Dokumente",
      hasMany: true,
    },
    {
      name: "mentionedCompanies",
      type: "relationship",
      relationTo: "companies",
      label: "Erwähnte Firmen",
      hasMany: true,
    },
    {
      name: "mentionedPersons",
      type: "relationship",
      relationTo: "persons",
      label: "Erwähnte Personen",
      hasMany: true,
    },
  ],
  labels: {
    singular: "HR Veröffentlichung",
    plural: "HR Veröffentlichungen",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    id: true,
    title: true,
    summary: true,
    publication_date: true,
    company: true,
  },
  admin: { group: "Veröffentlichungen und Beziehungen" },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const MAX = 150;

        // If summary already contains text, leave it unchanged.
        const hasValue = (value: unknown): value is string =>
          typeof value === "string" && value.trim().length > 0;

        if (hasValue(data.summary)) {
          return data;
        }

        // Shorten text to MAX characters and add ellipsis only when needed.
        const truncate = (value: string): string => {
          const normalized = value.replace(/\s+/g, " ").trim();
          if (normalized.length <= MAX) {
            return normalized;
          }
          return `${normalized.slice(0, MAX - 3).trimEnd()}...`;
        };

        // Normalize whitespace inside strings.
        const normalizeText = (value: string): string =>
          value.replace(/\s+/g, " ").trim();

        // Walk a nested rich text object and collect any text nodes.
        // This skips structural metadata and only returns actual written content.
        const walkObject = (
          objectNode: Record<string, unknown>,
          parts: string[]
        ): void => {
          if (typeof objectNode.text === "string") {
            parts.push(objectNode.text);
          }

          if (Array.isArray(objectNode.children)) {
            walk(objectNode.children, parts);
          }

          const root = objectNode.root;
          if (
            root &&
            typeof root === "object" &&
            !Array.isArray(root) &&
            Array.isArray((root as Record<string, unknown>).children)
          ) {
            walk((root as Record<string, unknown>).children, parts);
          }
        };

        // Recursively traverse arrays and rich text nodes.
        const walk = (node: unknown, parts: string[]): void => {
          if (node == null) {
            return;
          }
          if (typeof node === "string") {
            parts.push(node);
            return;
          }
          if (Array.isArray(node)) {
            for (const child of node) {
              walk(child, parts);
            }
            return;
          }
          if (typeof node === "object") {
            walkObject(node as Record<string, unknown>, parts);
          }
        };

        // Convert rich text data into a plain text string.
        const extractTextFromRichText = (value: unknown): string => {
          if (value == null) {
            return "";
          }
          if (typeof value === "string") {
            return normalizeText(value);
          }

          const parts: string[] = [];
          walk(value, parts);
          return parts.join(" ").replace(/\s+/g, " ").trim();
        };

        // Read the publicationData field from the document.
        const publicationData = Array.isArray(data.publicationData)
          ? data.publicationData
          : [];

        // Generate a string from used publicationData.rows
        if (publicationData.length > 0) {
          const rows = publicationData
            .map((item) =>
              typeof item === "object" && item !== null
                ? (item as Record<string, unknown>).row
                : undefined
            )
            .filter(
              (row): row is string =>
                typeof row === "string" && row.trim().length > 0
            );

          if (rows.length > 0) {
            const uniqueRows = Array.from(new Set(rows));
            data.summary = truncate(uniqueRows.join(", "));
            return data;
          }

          return data;
        }

        // If publicationData is null use the text from description
        const descriptionText = extractTextFromRichText(data.description);
        if (descriptionText) {
          data.summary = truncate(descriptionText);
        }

        return data;
      },
    ],
  },
};
