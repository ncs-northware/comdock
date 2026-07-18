import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  admin: {
    enableRichTextLink: false,
    group: "Administration",
    useAsTitle: "email",
  },
  auth: {
    lockTime: 60_000,
    maxLoginAttempts: 5,
  },
  fields: [
    // TODO: Add more complex user management with name field and roles enum that controll access through predefined functions
    // Resources: https://github.com/payloadcms/access-control-demo and https://payloadcms.com/docs/access-control/overview
  ],
  labels: { plural: "Benutzer", singular: "Benutzer" },
  slug: "users",
};
