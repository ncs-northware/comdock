import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const ExternalShareholders: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { enableRichTextLink: false, useAsTitle: "companyName" },
  fields: [
    { label: "Firmenname", name: "companyName", required: true, type: "text" },
    {
      label: "Register",
      name: "registry",
      options: ["HRA", "HRB", "GnR", "Behörde", "ANDERE"],
      required: true,
      type: "select",
    },
    {
      label: "Registernummer",
      name: "registryNumber",
      required: true,
      type: "text",
      unique: true,
    },
    { label: "Amtsgericht", name: "registryCourt", type: "text" },
    { label: "URL", name: "url", type: "text" },
  ],
  labels: {
    plural: "Externe Gesellschafter",
    singular: "Externer Gesellschafter",
  },
  slug: "external-shareholders",
};
