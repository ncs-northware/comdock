import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access/roles";

export const LEI: CollectionConfig = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { useAsTitle: "id" },
  defaultPopulate: {
    company: true,
    id: true,
  },
  defaultSort: "id",
  fields: [
    {
      access: {
        create: () => true,
        read: () => true,
        update: () => false,
      },
      label: "Legal Entity Identifier",
      name: "id",
      required: true,
      type: "text",
      unique: true,
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
      defaultValue: "WM Datenservice (5299000J2N45DDNE4Y28)",
      label: "Vergabestelle (LOU)",
      name: "lou",
      options: [
        "Bloomberg Finance LP (5493001KJTIIGC8Y1R12)",
        "Bundesanzeiger Verlag GmbH (39120001KULK7200U106)",
        "WM Datenservice (5299000J2N45DDNE4Y28)",
      ],
      type: "select",
    },
    {
      defaultValue: "ISSUED (ausgegeben)",
      label: "LEI Status",
      name: "leiStatus",
      options: [
        "ISSUED (ausgegeben)",
        "LAPSED (abgelaufen)",
        "INACTIVE",
        "PLANNED",
      ],
      required: true,
      type: "select",
    },
    {
      admin: {
        date: {
          displayFormat: "dd.MM.yyyy hh:mm",
          pickerAppearance: "dayAndTime",
        },
      },
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
      label: "Erstvergabe",
      name: "firstRegistration",
      required: true,
      type: "date",
    },
    {
      admin: {
        description:
          "Die letzte und nächste Verlängerung werden automatisch errechnet.",
      },
      defaultValue: true,
      label: "Automatische Verlängerung",
      name: "autoRenew",
      required: true,
      type: "checkbox",
    },
    {
      admin: {
        condition: (data) => {
          if (data.auto_renew === false) {
            return true;
          }
          return false;
        },
        date: {
          displayFormat: "dd.MM.yyyy hh:mm",
          pickerAppearance: "dayAndTime",
        },
        description:
          "Nur bei Einträgen ohne automatische Verlängerung angeben.",
      },
      label: "Letzte Aktualisierung",
      name: "lastRenewal",
      type: "date",
    },
  ],
  labels: {
    plural: "Legal Entity Identifiers",
    singular: "Legal Entity Identifier",
  },
  slug: "lei",
};
