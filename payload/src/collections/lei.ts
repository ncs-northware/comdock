import { authenticated, authenticatedOrPublished } from "@/access/roles";
import type { CollectionConfig } from "payload";

export const LEI: CollectionConfig = {
  slug: "lei",
  fields: [
    {
      name: "identifier",
      type: "text",
      required: true,
      unique: true,
      label: "Legal Entity Identifier",
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
      name: "lou",
      type: "select",
      options: [
        "Bloomberg Finance LP (5493001KJTIIGC8Y1R12)",
        "Bundesanzeiger Verlag GmbH (39120001KULK7200U106)",
        "WM Datenservice (5299000J2N45DDNE4Y28)",
      ],
      defaultValue: "WM Datenservice (5299000J2N45DDNE4Y28)",
      label: "Vergabestelle (LOU)",
    },
    {
      name: "lei_status",
      type: "select",
      options: [
        "ISSUED (ausgegeben)",
        "LAPSED (abgelaufen)",
        "INACTIVE",
        "PLANNED",
      ],
      defaultValue: "ISSUED (ausgegeben)",
      required: true,
      label: "LEI Status",
    },
    {
      name: "first_registration",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "dd.MM.YYYY hh:mm",
        },
      },
      label: "Erstvergabe",
      hooks: {
        beforeChange: [
          ({ operation, value }) => {
            if (operation === "create") {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "auto_renew",
      type: "checkbox",
      defaultValue: true,
      required: true,
      label: "Automatische Verlängerung",
      admin: {
        description:
          "Die letzte und nächste Verlängerung werden automatisch errechnet.",
      },
    },
    {
      name: "last_renewal",
      type: "date",
      label: "Letzte Aktualisierung",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "dd.MM.YYYY hh:mm",
        },
        description:
          "Nur bei Einträgen ohne automatische Verlängerung angeben.",
      },
    },
    {
      name: "lei_history",
      type: "array",
      label: "LEI Geschichte",
      fields: [
        {
          name: "date",
          type: "date",
          admin: { date: { pickerAppearance: "dayOnly" } },
          required: true,
          label: "Datum",
        },
        {
          name: "details",
          type: "richText",
          required: true,
          label: "Beschreibung",
        },
      ],
    },
  ],
  labels: {
    singular: "Legal Entity Identifier",
    plural: "Legal Entity Identifiers",
  },
  admin: { useAsTitle: "identifier" },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultSort: "identifier",
  versions: {
    drafts: { autosave: true, schedulePublish: true },
    maxPerDoc: 50,
  },
};
