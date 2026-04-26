"use client";

import { BuildingIcon, HandshakeIcon, UserRoundIcon } from "lucide-react";
import type { PaginatedDocs } from "payload";
import { useState } from "react";
import { NetworkItem } from "@/components/network-item";
import { Headline } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { germanDate } from "@/lib/utils";
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
        value: number | Company;
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

export function CompanyNetwork({
  network,
  companyName,
}: {
  network: NetworkType;
  companyName: string;
}) {
  const [ShowFullNetwork, setShowFullNetwark] = useState(false);
  const initalNum = 4;
  const numToShow = ShowFullNetwork ? network.totalDocs : initalNum;
  return (
    <div className="mb-8">
      <Headline level="h3">Netzwerk</Headline>

      <div className="my-2">
        <NetworkItem
          icon={<BuildingIcon />}
          title={companyName}
          variant="parent"
        />

        <div className="my-4 grid grid-cols-2 gap-4">
          {/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Network is complex */}
          {network.docs.slice(0, numToShow).map((item) => {
            if (item.relation?.relationTo === "companies") {
              return (
                <NetworkItem
                  description={`${item.type} ${item.upto !== null ? ` | ${germanDate(item.since)} bis ${germanDate(item.upto || "")}` : ""}`}
                  href={`/companies/${
                    typeof item.relation?.value === "object"
                      ? (item.relation?.value?.id ?? "")
                      : (item.relation?.value ?? "")
                  }`}
                  icon={<BuildingIcon />}
                  key={item.id}
                  title={
                    typeof item.relation?.value === "object"
                      ? (item.relation?.value?.companyName ?? "")
                      : (item.relation?.value ?? "")
                  }
                  variant={item.upto === null ? "current" : "former"}
                />
              );
            }
            if (item.relation?.relationTo === "persons") {
              return (
                <NetworkItem
                  description={`${item.type} ${item.upto !== null ? ` | ${germanDate(item.since)} bis ${germanDate(item.upto || "")}` : ""}`}
                  href={`/persons/${
                    typeof item.relation?.value === "object"
                      ? (item.relation?.value?.id ?? "")
                      : (item.relation?.value ?? "")
                  }`}
                  icon={<UserRoundIcon />}
                  key={item.id}
                  title={
                    typeof item.relation?.value === "object"
                      ? [
                          item.relation?.value?.firstName,
                          item.relation?.value?.sirName,
                        ]
                          .filter(Boolean)
                          .join(" ")
                      : (item.relation?.value.toString() ?? "")
                  }
                  variant={item.upto === null ? "current" : "former"}
                />
              );
            }
            return (
              <NetworkItem
                description={`${item.type} ${item.upto !== null ? ` | ${germanDate(item.since)} bis ${germanDate(item.upto || "")}` : ""}`}
                href={
                  typeof item.relation?.value === "object"
                    ? (item.relation?.value?.url ?? "")
                    : (item.relation?.value.toString() ?? "")
                }
                icon={<HandshakeIcon />}
                key={item.id}
                title={
                  typeof item.relation?.value === "object"
                    ? (item.relation?.value?.companyName ?? "")
                    : (item.relation?.value.toString() ?? "")
                }
                variant={item.upto === null ? "current" : "former"}
              />
            );
          })}
        </div>
        {network.totalDocs > initalNum && (
          <Button
            className="w-full"
            onClick={() => setShowFullNetwark(!ShowFullNetwork)}
            size="sm"
            variant="outline"
          >
            {ShowFullNetwork ? "Netzwerk einklappen" : "Netzwerk ausklappen"}
          </Button>
        )}
      </div>
    </div>
  );
}
