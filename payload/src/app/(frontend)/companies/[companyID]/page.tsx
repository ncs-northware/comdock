import { ArrowLeftRightIcon } from "lucide-react";
import { RichText } from "@/components/richtext";
import { Headline, Link } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { payload } from "@/lib/api";
import { CompanyNetwork } from "./network";
import { CompanyDocs, DesignsList, HRPublications } from "./publications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyID: string }>;
}) {
  const { companyID } = await params;
  const companyMetadata = await payload.findByID({
    collection: "companies",
    id: companyID,
    select: { companyName: true, headquarter: { city: true } },
  });
  return {
    title: `${companyMetadata.companyName}, ${companyMetadata.headquarter.city}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ companyID: string }>;
}) {
  const { companyID } = await params;
  const companyIDNum = Number.parseInt(companyID, 10);
  const company = await payload.findByID({
    collection: "companies",
    id: companyIDNum,
    select: {
      companyName: true,
      hrDept: true,
      hrNumber: true,
      hrCourt: true,
      headquarter: true,
      branches: true,
      corpObject: true,
      prevNames: true,
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
      childCompany: { equals: companyID },
    },
    sort: ["upto", "since"],
  });

  const hr = await payload.find({
    collection: "hr_publications",
    select: {
      company: true,
      title: true,
      summary: true,
      publicationDate: true,
    },
    where: {
      or: [
        { company: { equals: companyID } },
        { mentionedCompanies: { in: [companyID] } },
      ],
    },
    sort: "-publicationDate",
  });

  const docs = await payload.find({
    collection: "docs",
    where: { company: { equals: companyID } },
    select: {
      title: true,
      type: true,
      createdAt: true,
      documentCreatedAt: true,
      filename: true,
      url: true,
    },
  });

  const designs = await payload.find({
    collection: "designs",
    where: { company: { equals: companyID } },
    select: { type: true, wordmarkTitle: true, registrationDate: true },
  });

  return (
    <article>
      <div className="mb-8">
        <Headline level="h1">
          {company.companyName}, {company.headquarter.city}
        </Headline>
      </div>
      <div className="mb-8">
        <Headline level="h3">Firma</Headline>
        <p className="my-2">{company.companyName}</p>
        {company.prevNames ? (
          <div className="my-2 text-muted-foreground">
            {company.prevNames?.map((name) => (
              <div className="flex" key={name.id}>
                <ArrowLeftRightIcon className="me-2 w-3" />
                <span>{name.prevName}</span>
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
            {company.hrCourt} | {company.hrDept} {company.hrNumber}
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
      {company.corpObject ? (
        <div className="mb-8">
          <Headline level="h3">Unternehmensgegenstand</Headline>
          <RichText className="my-2 font-mono" data={company.corpObject} />
        </div>
      ) : (
        ""
      )}
      {network.totalDocs > 0 && (
        <CompanyNetwork companyName={company.companyName} network={network} />
      )}
      <div className="mb-8">
        <Headline level="h3">Veröffentlichungen</Headline>
        <Tabs className="w-full" defaultValue="hr">
          <TabsList className="w-full">
            <TabsTrigger value="hr">Handelsregister</TabsTrigger>
            <TabsTrigger value="docs">Dokumente</TabsTrigger>
            <TabsTrigger value="designs">
              Marken und Geschmacksmuster
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hr">
            <HRPublications companyID={companyIDNum} publications={hr} />
          </TabsContent>
          <TabsContent value="docs">
            <CompanyDocs docs={docs} />
          </TabsContent>
          <TabsContent value="designs">
            <DesignsList designs={designs} />
          </TabsContent>
        </Tabs>
      </div>
    </article>
  );
}
