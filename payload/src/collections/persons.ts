import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Persons: CollectionConfig = {
  slug: "persons",
  fields: [
    { name: "first_name", type: "text", required: true, label: "Vorname" },
    { name: "sir_name", type: "text", required: true, label: "Nachname" },
    { name: "city", type: "text", required: true, label: "Wohnort" },
    {
      name: "birthday",
      type: "date",
      label: "Geburtsdatum",
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
    },
  ],
  admin: { useAsTitle: "first_name" },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { plural: "Personen", singular: "Person" },
};
