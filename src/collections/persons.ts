import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Persons: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { useAsTitle: "firstName" },
  fields: [
    { label: "Vorname", name: "firstName", required: true, type: "text" },
    { label: "Nachname", name: "sirName", required: true, type: "text" },
    { label: "Wohnort", name: "city", required: true, type: "text" },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Geburtsdatum",
      name: "birthday",
      type: "date",
    },
  ],
  labels: { plural: "Personen", singular: "Person" },
  slug: "persons",
};
