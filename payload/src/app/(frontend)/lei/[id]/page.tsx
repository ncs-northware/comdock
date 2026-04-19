import { BuildingIcon } from "lucide-react";
import {
  DescriptionElement,
  DescriptionList,
  DescriptionListRow,
  DescriptionTerm,
} from "@/components/description-list";
import { ListItem } from "@/components/list-item";
import { Headline, Link } from "@/components/typography";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";
import { germanDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const leiMetadata = await payload.findByID({
    collection: "lei",
    // biome-ignore lint/style/useConsistentObjectDefinitions: Payload SDK internal
    id: id,
    select: { id: true },
  });

  return { title: `LEI ${leiMetadata.id}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lei = await payload.findByID({
    collection: "lei",
    // biome-ignore lint/style/useConsistentObjectDefinitions: Payload SDK internal
    id: id,
    select: {
      company: true,
      firstRegistration: true,
      leiStatus: true,
      lou: true,
      autoRenew: true,
      lastRenewal: true,
    },
    populate: {
      companies: {
        companyName: true,
        hrCourt: true,
        hrDept: true,
        hrNumber: true,
        hrStatus: true,
        headquarter: true,
      },
    },
  });

  if (typeof lei.company === "object") {
    const companyId = lei.company.id;
    const leiNetwork = await payload.find({
      collection: "network",
      select: { childCompany: true, relation: true, type: true },
      populate: { companies: { companyName: true, id: true } },
      where: {
        and: [
          {
            or: [
              { childCompany: { equals: companyId } },
              { "relation.value": { equals: companyId } },
            ],
          },
          { leiParent: { equals: true } },
        ],
      },
    });

    const year = new Date().getFullYear();
    const auto_last_renewal = new Date(lei.firstRegistration);
    auto_last_renewal.setFullYear(year);
    const auto_next_renewal = new Date(lei.firstRegistration);
    auto_next_renewal.setFullYear(year + 1);

    return (
      <article>
        <Headline level="h1">Legal Entity Identifier {lei.id}</Headline>
        <div className="mb-8">
          <Headline level="h2">Legal Entity Identifier</Headline>
          <DescriptionList>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>LEI</DescriptionTerm>
              <DescriptionElement>{lei.id}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>LEI Status</DescriptionTerm>
              <DescriptionElement>{lei.leiStatus}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>LEI-Vergabestelle (LOU)</DescriptionTerm>
              <DescriptionElement>{lei.lou}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Erstvergabe</DescriptionTerm>
              <DescriptionElement>
                {germanDate(lei.firstRegistration)}
              </DescriptionElement>
            </DescriptionListRow>
            {lei.autoRenew === true && (
              <DescriptionListRow className="md:grid md:grid-cols-2">
                <DescriptionTerm>Letzte Verlängerung</DescriptionTerm>
                <DescriptionElement>
                  {germanDate(auto_last_renewal)}
                </DescriptionElement>
              </DescriptionListRow>
            )}
            {lei.autoRenew !== true && lei.lastRenewal !== null && (
              <DescriptionListRow className="md:grid md:grid-cols-2">
                <DescriptionTerm>Letzte Verlängerung</DescriptionTerm>
                <DescriptionElement>
                  {germanDate(lei.lastRenewal || "")}
                </DescriptionElement>
              </DescriptionListRow>
            )}
            {lei.autoRenew === true && (
              <DescriptionListRow className="md:grid md:grid-cols-2">
                <DescriptionTerm>Nächste Verlängerung</DescriptionTerm>
                <DescriptionElement>
                  {germanDate(auto_next_renewal)}
                </DescriptionElement>
              </DescriptionListRow>
            )}
          </DescriptionList>
        </div>
        <div className="mb-8">
          <Headline level="h2">Unternehmensdaten</Headline>
          <DescriptionList>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Firmenname</DescriptionTerm>
              <DescriptionElement>
                <Link href={`/companies/${lei.company.id}`}>
                  {lei.company.companyName}
                </Link>
              </DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Registergericht</DescriptionTerm>
              <DescriptionElement>{lei.company.hrCourt}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Registernummer</DescriptionTerm>
              <DescriptionElement>
                {lei.company.hrDept} {lei.company.hrNumber}
              </DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionElement>{lei.company.hrStatus}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>
                Juristischer Sitz / Hauptniederlassung
              </DescriptionTerm>
              <DescriptionElement>
                {lei.company.headquarter.street},{" "}
                {lei.company.headquarter.zipcode} {lei.company.headquarter.city}
              </DescriptionElement>
            </DescriptionListRow>
          </DescriptionList>
        </div>
        {leiNetwork.totalDocs > 0 && (
          <div className="mb-8">
            <Headline level="h2">Netzwerk</Headline>
            <ItemGroup className="my-4 gap-4">
              {leiNetwork.docs.map((item) => {
                if (
                  typeof item.childCompany === "object" &&
                  typeof item.relation?.value === "object" &&
                  item.relation.relationTo === "companies" &&
                  item.childCompany?.id === companyId
                ) {
                  return (
                    <ListItem
                      description={`Muttergesellschaft | ${item.type}`}
                      href={`/companies/${item.relation.value.id}`}
                      icon={<BuildingIcon />}
                      key={item.id}
                      title={item.relation.value.companyName}
                    />
                  );
                }
                if (
                  typeof item.childCompany === "object" &&
                  item.childCompany !== null &&
                  typeof item.relation?.value === "object" &&
                  item.relation.relationTo === "companies" &&
                  item.relation.value.id === companyId
                ) {
                  return (
                    <ListItem
                      description={`Tochtergesellschaft | ${item.type}`}
                      href={`/companies/${item.childCompany?.id}`}
                      icon={<BuildingIcon />}
                      key={item.id}
                      title={item.childCompany?.companyName}
                    />
                  );
                }
                return null;
              })}
            </ItemGroup>
          </div>
        )}
      </article>
    );
  }
}
