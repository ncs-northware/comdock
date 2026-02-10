import { ArrowLeftRightIcon } from "lucide-react";
import { RichText } from "@/components/richtext";
import { Headline, Link } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { payload } from "@/lib/api";
import { CompanyNetwork } from "./network";
import { HRPublications } from "./publications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyID: string }>;
}) {
  const { companyID } = await params;
  const companyMetadata = await payload.findByID({
    collection: "companies",
    id: companyID,
    select: { company_name: true },
  });
  return { title: companyMetadata.company_name };
}

export default async function Page({
  params,
}: {
  params: Promise<{ companyID: string }>;
}) {
  const { companyID } = await params;

  const company = await payload.findByID({
    collection: "companies",
    id: companyID,
    select: {
      company_name: true,
      hr_dept: true,
      hr_number: true,
      hr_court: true,
      headquarter: true,
      branches: true,
      corp_object: true,
      prev_names: true,
    },
  });

  const lei = await payload.find({
    collection: "lei",
    select: {
      id: true,
    },
    where: {
      company: {
        equals: companyID,
      },
    },
  });

  const network = await payload.find({
    collection: "network",
    depth: 1,
    select: {
      type: true,
      since: true,
      upto: true,
      relation: true,
    },
    where: {
      child_company: { equals: companyID },
    },
    sort: ["upto", "since"],
  });

  const hr = await payload.find({
    collection: "hr_publications",
    select: {
      company: true,
      title: true,
      summary: true,
      publication_date: true,
    },
    where: {
      or: [
        { company: { equals: companyID } },
        { mentioned_companies: { in: [companyID] } },
      ],
    },
    sort: "-publication_date",
  });

  return (
    <article>
      <div className="mb-8">
        <Headline level="h1">
          {company.company_name}, {company.headquarter.city}
        </Headline>
      </div>
      <div className="mb-8">
        <Headline level="h3">Firma</Headline>
        <p className="my-2">{company.company_name}</p>
        {company.prev_names ? (
          <div className="my-2 text-muted-foreground">
            {company.prev_names?.map((name) => (
              <div className="flex" key={name.id}>
                <ArrowLeftRightIcon className="me-2 w-3" />
                <span>{name.prev_name}</span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-8">
        <Headline level="h3">Register</Headline>
        <p className="my-2">
          <Badge className="me-2">HR</Badge>
          <span>
            {company.hr_court} | {company.hr_dept} {company.hr_number}
          </span>
        </p>
        {lei.totalDocs > 0 &&
          lei.docs.map((identifier) => (
            <p className="my-2" key={identifier.id}>
              <Badge className="me-2">LEI</Badge>
              <Link href={`/lei/${identifier.id}`}>{identifier.id}</Link>
            </p>
          ))}
      </div>
      <div className="mb-8">
        <Headline level="h3">
          Sitz, Niederlassung, Zweigniederlassungen
        </Headline>
        <p className="my-2">
          <Badge className="me-2">Hauptsitz</Badge>
          <span>
            {company.headquarter.street}, {company.headquarter.zipcode}{" "}
            {company.headquarter.city}
          </span>
        </p>
        {company.branches?.map((branch) => (
          <p className="my-2" key={branch.id}>
            <Badge className="me-2">Zweigniederlassung</Badge>
            <span>
              {branch.street}, {branch.zipcode} {branch.city}
            </span>
          </p>
        ))}
      </div>
      {company.corp_object ? (
        <div className="mb-8">
          <Headline level="h3">Unternehmensgegenstand</Headline>
          <RichText className="my-2" data={company.corp_object} />
        </div>
      ) : (
        ""
      )}
      {network.totalDocs > 0 && (
        <CompanyNetwork companyName={company.company_name} network={network} />
      )}
      <div className="mb-8">
        <Headline level="h3">Veröffentlichungen</Headline>
        <Tabs className="w-full" defaultValue="hr">
          <TabsList className="w-full">
            <TabsTrigger value="hr">Handelsregister</TabsTrigger>
            <TabsTrigger value="docs">Dokumente</TabsTrigger>
          </TabsList>
          <TabsContent value="hr">
            <HRPublications companyID={companyID} publications={hr} />
          </TabsContent>
          <TabsContent value="docs">Dokumente</TabsContent>
        </Tabs>
      </div>
    </article>
  );
}
