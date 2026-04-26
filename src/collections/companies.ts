import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Companies: CollectionConfig = {
  slug: "companies",
  fields: [
    { name: "id", type: "number", label: "ID", admin: { hidden: true } },
    { name: "companyName", type: "text", required: true, label: "Firmenname" },
    {
      name: "hrStatus",
      type: "select",
      options: ["aktiv", "gelöscht", "Liquidation", "Gesellschaft verlassen"],
      label: "Status",
      defaultValue: "aktiv",
    },
    {
      name: "hrDept",
      type: "select",
      options: ["HRA", "HRB"],
      label: "HR Abteilung",
      required: true,
    },
    {
      name: "hrNumber",
      type: "text",
      required: true,
      unique: true,
      label: "HR Nummer",
      access: {
        create: () => true,
        update: () => false,
        read: () => true,
      },
    },
    { name: "hrCourt", type: "text", required: true, label: "Amtsgericht" },
    {
      name: "headquarter",
      type: "group",
      fields: [
        { name: "street", type: "text", label: "Straße", required: true },
        {
          name: "zipcode",
          type: "text",
          label: "Postleitzahl",
          required: true,
        },
        { name: "city", type: "text", label: "Ort", required: true },
      ],
      label: "Hauptsitz",
    },
    {
      name: "branches",
      type: "array",
      labels: {
        singular: "Zweigniederlassung",
        plural: "Zweigniederlassungen",
      },
      fields: [
        { name: "street", type: "text", label: "Straße", required: true },
        {
          name: "zipcode",
          type: "text",
          label: "Postleitzahl",
          required: true,
        },
        { name: "city", type: "text", label: "Ort", required: true },
      ],
    },
    { name: "corpObject", type: "richText", label: "Unternehmensgegenstand" },
    { name: "capital", type: "number", label: "Stammkapital" },
    {
      name: "representRules",
      type: "richText",
      label: "Allgemeine Vertretungsregelung",
    },
    {
      name: "prevNames",
      type: "array",
      label: "Vorherige Namen",
      fields: [
        {
          name: "prevName",
          type: "text",
          label: "Vorheriger Firmenname",
          required: true,
        },
        {
          name: "nameUpto",
          type: "date",
          label: "Name bis",
          admin: { date: { displayFormat: "dd.MM.yyyy" } },
        },
      ],
    },
  ],
  admin: {
    useAsTitle: "companyName",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Use the new hr_number if provided, otherwise initialize as empty
        const hr = (data?.hrNumber ?? "") as string;

        // Extract only numeric digits from hr_number
        const sanitized = hr.toString().replace(/\D/g, "");

        if (sanitized && data) {
          data.id = sanitized;
        }

        return data;
      },
    ],
  },
  labels: {
    plural: "Firmen",
    singular: "Firma",
  },
  defaultSort: "companyName",
  defaultPopulate: {
    companyName: true,
    hrDept: true,
    hrNumber: true,
  },
};
