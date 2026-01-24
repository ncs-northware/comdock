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
    { name: "summary", type: "text", label: "Zusammenfassung" },
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
};
