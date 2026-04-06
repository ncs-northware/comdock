import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const ExternalShareholders: CollectionConfig = {
  slug: "external-shareholders",
  fields: [
    { name: "company_name", type: "text", required: true, label: "Firmenname" },
    {
      name: "registry",
      type: "select",
      options: ["HRA", "HRB", "GnR", "Behörde", "ANDERE"],
      required: true,
      label: "Register",
    },
    {
      name: "registry_number",
      type: "text",
      required: true,
      unique: true,
      label: "Registernummer",
    },
    { name: "registry_court", type: "text", label: "Amtsgericht" },
    { name: "url", type: "text", label: "URL" },
  ],
  admin: { useAsTitle: "company_name", enableRichTextLink: false },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  labels: {
    plural: "Externe Gesellschafter",
    singular: "Externer Gesellschafter",
  },
};
