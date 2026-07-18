import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Companies } from "@/collections/companies";
import { Designs } from "@/collections/designs";
import { Docs } from "@/collections/docs";
import { ExternalShareholders } from "@/collections/external-shareholders";
import { HRPublications } from "@/collections/hr-publications";
import { LEI } from "@/collections/lei";
import { Network } from "@/collections/network";
import { Persons } from "@/collections/persons";
import { Users } from "@/collections/users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [
    Docs,
    Users,
    Companies,
    ExternalShareholders,
    LEI,
    Persons,
    HRPublications,
    Network,
    Designs,
  ],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
    ],
  }),
  graphQL: { disable: true },
  i18n: {
    fallbackLanguage: "de",
    supportedLanguages: { de, en },
  },
  jobs: {
    autoRun: [
      {
        cron: "*/5 * * * *", // Check every 5 minutes
        queue: "default",
      },
    ],
  },
  plugins: [
    importExportPlugin({
      collections: [], // enables import/export for all collections
      debug: true,
      overrideExportCollection: ({ collection }) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: "Administration",
        },
      }),
      overrideImportCollection: ({ collection }) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: "Administration",
        },
      }),
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
