import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Companies: CollectionConfig = {
  slug: "companies",
  fields: [
    { name: "company_name", type: "text", required: true, label: "Firmenname" },
    {
      name: "status",
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
    // main_branch
    // branches
    { name: "corp_object", type: "richText", label: "Unternehmensgegenstand" },
    { name: "capital", type: "number", label: "Stammkapital" },
    {
      name: "represent_rules",
      type: "text",
      label: "Allgemeine Vertretungsregelung",
    },
    { name: "legal_form", type: "text", label: "Vollständige Rechtsform" },
    // furtherNames
    // networkChildren
    // networkParents
    // hr_pubs
    // docs
    // pubsMentioned
    // lei
  ],
  admin: {
    useAsTitle: "company_name",
    // description: ''
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
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
  // hooks
  versions: {
    drafts: { autosave: true, schedulePublish: true },
    maxPerDoc: 50,
  },
};
