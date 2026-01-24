import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "@/collections/media";
import { Users } from "@/collections/users";
import { Companies } from "./collections/companies";
import { ExternalShareholders } from "./collections/external-shareholders";
import { HRPublications } from "./collections/hr-publications";
import { LEI } from "./collections/lei";
import { Network } from "./collections/network";
import { Persons } from "./collections/persons";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Media,
    Users,
    Companies,
    ExternalShareholders,
    LEI,
    Persons,
    HRPublications,
    Network,
  ],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: "de",
    supportedLanguages: { en, de },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [],
});
