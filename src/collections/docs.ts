import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access/roles";

export const Docs: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    enableRichTextLink: false,
    group: "Veröffentlichungen und Beziehungen",
  },
  defaultPopulate: {
    company: true,
    createdAt: true,
    filename: true,
    type: true,
    updatedAt: true,
    url: true,
  },
  fields: [
    {
      label: "Titel",
      name: "title",
      type: "text",
    },
    {
      label: "Typ",
      name: "type",
      options: [
        "Gesellschaftsvertrag",
        "Liste der Gesellschafter",
        "Aufsichtsratsliste",
        "Jahresabschluss / Bilanz",
        "Anmeldung HRA",
        "Eintragungsanzeige",
        "Weitere Unterlagen",
      ],
      type: "select",
    },
    {
      label: "Firma",
      name: "company",
      relationTo: "companies",
      type: "relationship",
    },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Dokument erstellt am",
      name: "documentCreatedAt",
      type: "date",
    },
  ],
  labels: {
    plural: "Dokumente",
    singular: "Dokument",
  },
  slug: "docs",
  upload: {
    staticDir: "uploads/docs",
  },
};
