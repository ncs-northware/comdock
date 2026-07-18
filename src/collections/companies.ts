import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Companies: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "companyName",
  },
  defaultPopulate: {
    companyName: true,
    hrDept: true,
    hrNumber: true,
  },
  defaultSort: "companyName",
  fields: [
    { admin: { hidden: true }, label: "ID", name: "id", type: "number" },
    { label: "Firmenname", name: "companyName", required: true, type: "text" },
    {
      defaultValue: "aktiv",
      label: "Status",
      name: "hrStatus",
      options: ["aktiv", "gelöscht", "Liquidation", "Gesellschaft verlassen"],
      type: "select",
    },
    {
      label: "HR Abteilung",
      name: "hrDept",
      options: ["HRA", "HRB"],
      required: true,
      type: "select",
    },
    {
      access: {
        create: () => true,
        read: () => true,
        update: () => false,
      },
      label: "HR Nummer",
      name: "hrNumber",
      required: true,
      type: "text",
      unique: true,
    },
    { label: "Amtsgericht", name: "hrCourt", required: true, type: "text" },
    {
      fields: [
        { label: "Straße", name: "street", required: true, type: "text" },
        {
          label: "Postleitzahl",
          name: "zipcode",
          required: true,
          type: "text",
        },
        { label: "Ort", name: "city", required: true, type: "text" },
      ],
      label: "Hauptsitz",
      name: "headquarter",
      type: "group",
    },
    {
      fields: [
        { label: "Straße", name: "street", required: true, type: "text" },
        {
          label: "Postleitzahl",
          name: "zipcode",
          required: true,
          type: "text",
        },
        { label: "Ort", name: "city", required: true, type: "text" },
      ],
      labels: {
        plural: "Zweigniederlassungen",
        singular: "Zweigniederlassung",
      },
      name: "branches",
      type: "array",
    },
    { label: "Unternehmensgegenstand", name: "corpObject", type: "richText" },
    { label: "Stammkapital", name: "capital", type: "number" },
    {
      label: "Allgemeine Vertretungsregelung",
      name: "representRules",
      type: "richText",
    },
    {
      fields: [
        {
          label: "Vorheriger Firmenname",
          name: "prevName",
          required: true,
          type: "text",
        },
        {
          admin: { date: { displayFormat: "dd.MM.yyyy" } },
          label: "Name bis",
          name: "nameUpto",
          type: "date",
        },
      ],
      label: "Vorherige Namen",
      name: "prevNames",
      type: "array",
    },
  ],
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
  slug: "companies",
};
