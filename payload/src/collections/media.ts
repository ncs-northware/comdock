import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    plural: "Medien",
    singular: "Datei",
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
    staticDir: "media",
  },
  defaultPopulate: {
    type: true,
    company: true,
    updatedAt: true,
    createdAt: true,
  },
  admin: { enableRichTextLink: false },
};
