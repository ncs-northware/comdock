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
      first_registration: true,
      lei_status: true,
      lou: true,
      auto_renew: true,
      last_renewal: true,
    },
    populate: {
      companies: {
        company_name: true,
        hr_court: true,
        hr_dept: true,
        hr_number: true,
        hr_status: true,
        headquarter: true,
      },
    },
  });

  if (typeof lei.company === "object") {
    const companyId = lei.company.id;
    const leiNetwork = await payload.find({
      collection: "network",
      select: { child_company: true, relation: true, type: true },
      populate: { companies: { company_name: true, id: true } },
      where: {
        and: [
          {
            or: [
              { child_company: { equals: companyId } },
              { "relation.value": { equals: companyId } },
            ],
          },
          { leiParent: { equals: true } },
        ],
      },
    });

    const year = new Date().getFullYear();
    const auto_last_renewal = new Date(lei.first_registration);
    auto_last_renewal.setFullYear(year);
    const auto_next_renewal = new Date(lei.first_registration);
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
              <DescriptionElement>{lei.lei_status}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>LEI-Vergabestelle (LOU)</DescriptionTerm>
              <DescriptionElement>{lei.lou}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Erstvergabe</DescriptionTerm>
              <DescriptionElement>
                {germanDate(lei.first_registration)}
              </DescriptionElement>
            </DescriptionListRow>
            {lei.auto_renew === true && (
              <DescriptionListRow className="md:grid md:grid-cols-2">
                <DescriptionTerm>Letzte Verlängerung</DescriptionTerm>
                <DescriptionElement>
                  {germanDate(auto_last_renewal)}
                </DescriptionElement>
              </DescriptionListRow>
            )}
            {lei.auto_renew !== true && lei.last_renewal !== null && (
              <DescriptionListRow className="md:grid md:grid-cols-2">
                <DescriptionTerm>Letzte Verlängerung</DescriptionTerm>
                <DescriptionElement>
                  {germanDate(lei.last_renewal || "")}
                </DescriptionElement>
              </DescriptionListRow>
            )}
            {lei.auto_renew === true && (
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
                  {lei.company.company_name}
                </Link>
              </DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Registergericht</DescriptionTerm>
              <DescriptionElement>{lei.company.hr_court}</DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Registernummer</DescriptionTerm>
              <DescriptionElement>
                {lei.company.hr_dept} {lei.company.hr_number}
              </DescriptionElement>
            </DescriptionListRow>
            <DescriptionListRow className="md:grid md:grid-cols-2">
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionElement>{lei.company.hr_status}</DescriptionElement>
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
                  typeof item.child_company === "object" &&
                  typeof item.relation?.value === "object" &&
                  item.relation.relationTo === "companies" &&
                  item.child_company?.id === companyId
                ) {
                  return (
                    <ListItem
                      description={`Muttergesellschaft | ${item.type}`}
                      href={`/companies/${item.relation.value.id}`}
                      icon={<BuildingIcon />}
                      key={item.id}
                      title={item.relation.value.company_name}
                    />
                  );
                }
                if (
                  typeof item.child_company === "object" &&
                  item.child_company !== null &&
                  typeof item.relation?.value === "object" &&
                  item.relation.relationTo === "companies" &&
                  item.relation.value.id === companyId
                ) {
                  return (
                    <ListItem
                      description={`Tochtergesellschaft | ${item.type}`}
                      href={`/companies/${item.child_company?.id}`}
                      icon={<BuildingIcon />}
                      key={item.id}
                      title={item.child_company?.company_name}
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
