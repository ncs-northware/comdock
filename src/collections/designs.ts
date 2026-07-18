import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access/roles";

export const Designs: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: "Veröffentlichungen und Beziehungen",
    useAsTitle: "wordmarkTitle",
  },
  fields: [
    {
      label: "Typ",
      name: "type",
      options: [
        "Wortmarke",
        "Wort-/Bildmarke",
        "Bildmarke",
        "Sonstige Marke",
        "Gebrauchsmuster",
        "Patent",
      ],
      required: true,
      type: "select",
    },
    {
      label: "Wortmarke/Titel",
      name: "wordmarkTitle",
      required: true,
      type: "text",
    },
    {
      hasMany: false,
      label: "Firma",
      name: "company",
      relationTo: "companies",
      required: true,
      type: "relationship",
    },
    {
      defaultValue: "Eingetragen und veröffentlicht",
      label: "Status der Eintragung",
      name: "itemStatus",
      options: [
        "Eingetragen und veröffentlicht",
        "Eintragung gelöscht",
        "Eintragung abgelaufen",
      ],
      required: true,
      type: "select",
    },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Eingetragen am",
      name: "registrationDate",
      required: true,
      type: "date",
    },
    { hasMany: true, label: "Farben", name: "colors", type: "text" },
    {
      label: "Wiener Klassifikation",
      name: "viennaClass",
      type: "richText",
    },
    {
      label: "Nizza Klassifikation",
      name: "niceClass",
      type: "richText",
    },
  ],
  labels: {
    plural: "Marken und Geschmacksmuster",
    singular: "Marke/Geschmacksmuster",
  },
  slug: "designs",
  upload: {
    filesRequiredOnCreate: false,
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    staticDir: "uploads/images",
  },
};
