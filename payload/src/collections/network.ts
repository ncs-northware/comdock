import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Network: CollectionConfig = {
  slug: "network",
  fields: [
    {
      name: "childCompany",
      type: "relationship",
      relationTo: "companies",
      label: "Firma",
    },
    { name: "leiParent", type: "checkbox", label: "LEI Muttergesellschaft" },
    {
      name: "type",
      type: "select",
      options: [
        "Beteiligung",
        "Komplementär VH",
        "Kommanditist TH",
        "Gesellschafter",
        "Geschäftsführer",
        "CEO",
        "COO",
        "Einzelprokura",
        "Gesamtprokura",
        "Filialprokura",
        "Andere Vertretungsbefugnis",
      ],
      required: true,
      label: "Verbindungstyp",
    },
    {
      name: "since",
      type: "date",
      required: true,
      label: "Beginn der Verbindung",
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "upto",
      type: "date",
      label: "Ende der Verbindung",
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "relation",
      type: "relationship",
      relationTo: ["companies", "external-shareholders", "persons"],
      label: "Verbindung zu",
      admin: {
        description:
          "Verbindung zu einer anderen Firma, einer Person oder einem anderen Gesellschafter als Muttergesellschaft",
      },
    },
  ],
  admin: { useAsTitle: "type", enableRichTextLink: false, group: "Veröffentlichungen und Beziehungen" },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  labels: {
    singular: "Netzwerk-Eintrag",
    plural: "Netzwerk-Einträge",
  },
};
