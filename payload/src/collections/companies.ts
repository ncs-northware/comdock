import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Companies: CollectionConfig = {
  slug: "companies",
  fields: [
    { name: "id", type: "text", label: "ID", admin: { hidden: true } },
    { name: "company_name", type: "text", required: true, label: "Firmenname" },
    {
      name: "hr_status",
      type: "select",
      options: ["aktiv", "gelöscht", "Liquidation", "Gesellschaft verlassen"],
      label: "Status",
      defaultValue: "aktiv",
    },
    {
      name: "hr_dept",
      type: "select",
      options: ["HRA", "HRB"],
      label: "HR Abteilung",
      required: true,
    },
    {
      name: "hr_number",
      type: "text",
      required: true,
      unique: true,
      label: "HR Nummer",
    },
    { name: "hr_court", type: "text", required: true, label: "Amtsgericht" },
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
    { name: "corp_object", type: "richText", label: "Unternehmensgegenstand" },
    { name: "capital", type: "number", label: "Stammkapital" },
    {
      name: "represent_rules",
      type: "richText",
      label: "Allgemeine Vertretungsregelung",
    },
    {
      name: "prev_names",
      type: "array",
      label: "Vorherige Namen",
      fields: [
        {
          name: "prev_name",
          type: "text",
          label: "Vorheriger Firmenname",
          required: true,
        },
        {
          name: "name_upto",
          type: "date",
          label: "Name bis",
          admin: { date: { displayFormat: "dd.MM.yyyy" } },
        },
      ],
    },
  ],
  admin: {
    useAsTitle: "company_name",
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
        const hr = (data?.hr_number ?? "") as string;

        // Normalize: remove whitespace, lowercase and keep only a-z and 0-9
        const sanitized = hr
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9]/g, "");

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
  defaultSort: "company_name",
  defaultPopulate: {
    company_name: true,
    hr_dept: true,
    hr_number: true,
  },
};
