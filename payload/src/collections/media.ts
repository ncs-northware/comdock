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
      name: "alt",
      type: "text",
      label: "Alternativtext",
    },
  ],
  upload: {
    staticDir: "media",
  },
};
