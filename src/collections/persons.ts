import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Persons: CollectionConfig = {
  slug: "persons",
  fields: [
    { name: "firstName", type: "text", required: true, label: "Vorname" },
    { name: "sirName", type: "text", required: true, label: "Nachname" },
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
  admin: { useAsTitle: "firstName"},
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { plural: "Personen", singular: "Person" },
};
