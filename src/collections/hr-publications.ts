import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const HRPublications: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { group: "Veröffentlichungen und Beziehungen" },
  defaultPopulate: {
    company: true,
    id: true,
    publication_date: true,
    summary: true,
    title: true,
  },
  fields: [
    {
      label: "Firma",
      name: "company",
      relationTo: "companies",
      type: "relationship",
    },
    { label: "Titel", name: "title", required: true, type: "text" },
    {
      admin: {
        description:
          "Wenn dieses Feld leer ist, wird es automatisch befüllt. Für automatische Änderung Feld leeren.",
      },
      label: "Zusammenfassung",
      name: "summary",
      type: "text",
    },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Veröffentlichungsdatum",
      name: "publicationDate",
      required: true,
      type: "date",
    },
    {
      fields: [
        {
          label: "Spalte",
          name: "row",
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
          required: true,
          type: "select",
        },
        { label: "Inhalt", name: "value", required: true, type: "richText" },
        {
          admin: { allowCreate: false },
          filterOptions: {
            id: { not_equals: "{ID}" },
          },
          hasMany: false,
          label: "Aufgehoben durch",
          name: "outdatedBy",
          relationTo: "hr_publications",
          type: "relationship",
        },
      ],
      label: "Gliederungsdaten",
      minRows: 1,
      name: "publicationData",
      type: "array",
    },
    { label: "Beschreibung", name: "description", type: "richText" },
    {
      hasMany: true,
      label: "Verbundene Dokumente",
      name: "docs",
      relationTo: "docs",
      type: "upload",
    },
    {
      hasMany: true,
      label: "Erwähnte Firmen",
      name: "mentionedCompanies",
      relationTo: "companies",
      type: "relationship",
    },
    {
      hasMany: true,
      label: "Erwähnte Personen",
      name: "mentionedPersons",
      relationTo: "persons",
      type: "relationship",
    },
  ],
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

          if (
            objectNode.root &&
            typeof objectNode.root === "object" &&
            !Array.isArray(objectNode.root) &&
            Array.isArray((objectNode.root as Record<string, unknown>).children)
          ) {
            walk((objectNode.root as Record<string, unknown>).children, parts);
          }
        };

        // Recursively traverse arrays and rich text nodes.
        const walk = (node: unknown, parts: string[]): void => {
          if (node === null) {
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
          if (value === null) {
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
  labels: {
    plural: "HR Veröffentlichungen",
    singular: "HR Veröffentlichung",
  },
  slug: "hr_publications",
};
