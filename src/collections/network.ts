import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const Network: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    enableRichTextLink: false,
    group: "Veröffentlichungen und Beziehungen",
    useAsTitle: "type",
  },
  fields: [
    {
      label: "Firma",
      name: "childCompany",
      relationTo: "companies",
      type: "relationship",
    },
    { label: "LEI Muttergesellschaft", name: "leiParent", type: "checkbox" },
    {
      label: "Verbindungstyp",
      name: "type",
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
      type: "select",
    },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Beginn der Verbindung",
      name: "since",
      required: true,
      type: "date",
    },
    {
      admin: {
        date: { displayFormat: "dd.MM.yyyy", pickerAppearance: "dayOnly" },
      },
      label: "Ende der Verbindung",
      name: "upto",
      type: "date",
    },
    {
      admin: {
        description:
          "Verbindung zu einer anderen Firma, einer Person oder einem anderen Gesellschafter als Muttergesellschaft",
      },
      label: "Verbindung zu",
      name: "relation",
      relationTo: ["companies", "external-shareholders", "persons"],
      type: "relationship",
    },
  ],
  labels: {
    plural: "Netzwerk-Einträge",
    singular: "Netzwerk-Eintrag",
  },
  slug: "network",
};
