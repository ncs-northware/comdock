import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access/roles";

export const Docs: CollectionConfig = {
  slug: "docs",
  labels: {
    plural: "Dokumente",
    singular: "Dokument",
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titel",
    },
    {
      name: "type",
      type: "select",
      options: [
        "Gesellschaftsvertrag",
        "Liste der Gesellschafter",
        "Aufsichtsratsliste",
        "Jahresabschluss / Bilanz",
        "Anmeldung HRA",
        "Eintragungsanzeige",
        "Weitere Unterlagen",
      ],
      label: "Typ",
    },
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
      label: "Firma",
    },
    {
      name: "document_createdAt",
      type: "date",
      label: "Dokument erstellt am",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
    },
  ],
  upload: {
    staticDir: "uploads/docs",
  },
  defaultPopulate: {
    type: true,
    url: true,
    filename: true,
    company: true,
    updatedAt: true,
    createdAt: true,
  },
  admin: { enableRichTextLink: false },
};
