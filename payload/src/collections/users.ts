import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    enableRichTextLink: false,
  },
  labels: { singular: "Benutzer", plural: "Benutzer" },
  auth: true,
  fields: [
    // TODO: Add more complex user management with name field and roles enum that controll access through predefined functions
    // Resources: https://github.com/payloadcms/access-control-demo and https://payloadcms.com/docs/access-control/overview
  ],
};
