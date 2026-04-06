import type { PaginatedDocs } from "payload";
import type { Company, ExternalShareholder, Person } from "@/payload-types";

export type NetworkType = PaginatedDocs<{
  id: number;
  type:
    | "Beteiligung"
    | "Komplement\u00E4r VH"
    | "Kommanditist TH"
    | "Gesellschafter"
    | "Gesch\u00E4ftsf\u00FChrer"
    | "CEO"
    | "COO"
    | "Einzelprokura"
    | "Gesamtprokura"
    | "Filialprokura"
    | "Andere Vertretungsbefugnis";
  since: string;
  upto?: string | null | undefined;
  relation?:
    | ({
        relationTo: "companies";
        value: string | Company;
      } | null)
    | ({
        relationTo: "external-shareholders";
        value: number | ExternalShareholder;
      } | null)
    | ({
        relationTo: "persons";
        value: number | Person;
      } | null)
    | undefined;
}>;
