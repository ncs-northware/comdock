import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const TrademarksAndDesigns: CollectionConfig = {
  slug: "trademarks-designs",
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
      name: "wordmark-title",
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
      name: "submission_date",
      type: "date",
      label: "Datum der Einreichung",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
    },
    {
      name: "registration_date",
      type: "date",
      label: "Datum der Eintragung",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
      },
    },
    {
      name: "auto_renew",
      type: "checkbox",
      defaultValue: true,
      label: "Automatische Verlängerung",
      admin: { description: "Die Eintragung wird automatisch verlängert" },
    },
    {
      name: "expiry_date",
      type: "date",
      label: "Ablaufdatum",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
        description:
          "Nur bei Einträgen ohne automatische Verlängerung angeben.",
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
  admin: { useAsTitle: "wordmark-title" },
  // defaultSort
  // defaultPopulate
};
