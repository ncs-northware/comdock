import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "@/payload-types";

export const sdk = new PayloadSDK<Config>({
  baseURL: process.env.API_ENDPOINT || "",
});

export const companies = await sdk.find({
  collection: "companies",
  select: {
    company_name: true,
    branches: true,
    hr_court: true,
    hr_dept: true,
    hr_number: true,
  },
  limit: 5,
  page: 1,
  sort: "company_name",
});

export type CompaniesType = typeof companies;
