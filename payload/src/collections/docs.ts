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
  ],
  upload: {
    staticDir: "uploads/docs",
  },
  defaultPopulate: {
    type: true,
    company: true,
    updatedAt: true,
    createdAt: true,
  },
  admin: { enableRichTextLink: false },
};
