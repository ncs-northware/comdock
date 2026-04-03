import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Designs: CollectionConfig = {
  slug: "designs",
  labels: {
    plural: "Marken und Geschmacksmuster",
    singular: "Marke/Geschmacksmuster",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  upload: {
    staticDir: "uploads/images",
    filesRequiredOnCreate: false,
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        "Wortmarke",
        "Wort-/Bildmarke",
        "Bildmarke",
        "Sonstige Marke",
        "Gebrauchsmuster",
        "Patent",
      ],
      required: true,
      label: "Typ",
    },
    {
      name: "wordmark_title",
      type: "text",
      label: "Wortmarke/Titel",
      required: true,
    },
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
      hasMany: false,
      required: true,
      label: "Firma",
    },
    {
      name: "item_status",
      type: "select",
      options: [
        "Eingetragen und veröffentlicht",
        "Eintragung gelöscht",
        "Eintragung abgelaufen",
      ],
      label: "Status der Eintragung",
      defaultValue: "Eingetragen und veröffentlicht",
    },
    {
      name: "registration_date",
      type: "date",
      label: "Eingetragen am",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
    },
    { name: "colors", type: "text", label: "Farben", hasMany: true },
    {
      name: "vienna_class",
      type: "richText",
      label: "Wiener Klassifikation",
    },
    {
      name: "nice_class",
      type: "richText",
      label: "Nizza Klassifikation",
    },
  ],
  admin: { useAsTitle: "wordmark_title" },
  // defaultSort
  // defaultPopulate
};
