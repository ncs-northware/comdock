import { BuildingIcon, RssIcon } from "lucide-react";
import { ListItem } from "@/components/list-item";
import { Headline } from "@/components/typography";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";
import { germanDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const personMetadata = await payload.findByID({
    collection: "persons",
    id,
    select: { firstName: true, sirName: true, city: true },
  });
  return {
    title: `${personMetadata.firstName} ${personMetadata.sirName}, ${personMetadata.city}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const person = await payload.findByID({
    collection: "persons",
    id,
    select: {
      firstName: true,
      sirName: true,
      city: true,
    },
  });

  const network = await payload.find({
    collection: "network",
    select: {
      childCompany: true,
      type: true,
      upto: true,
      since: true,
    },
    where: {
      and: [
        { "relation.relationTo": { equals: "persons" } },
        { "relation.value": { equals: id } },
      ],
    },
    populate: {
      companies: { companyName: true, id: true },
    },
  });

  const publications = await payload.find({
    collection: "hr_publications",
    select: {
      title: true,
      summary: true,
      publicationDate: true,
      company: true,
    },
    where: { mentionedPersons: { equals: id } },
    populate: { companies: { companyName: true } },
  });

  return (
    <article>
      <Breadcrumb className="my-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/persons">Personen</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {person.firstName} {person.sirName}, {person.city}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <Headline level="h1">
          {person.firstName} {person.sirName}, {person.city}
        </Headline>
      </div>
      {network.totalDocs === 0 && publications.totalDocs === 0 && (
        <Alert>
          <AlertDescription>
            Zu dieser Person wurden keine Daten gefunden.
          </AlertDescription>
        </Alert>
      )}
      {network.totalDocs > 0 && (
        <div className="mb-8">
          <Headline level="h3">Positionen</Headline>
          <ItemGroup className="my-4 gap-4">
            {network.docs.map(
              (item) =>
                typeof item.childCompany === "object" && (
                  <ListItem
                    description={`${item.type} ${item.upto !== null ? `(${germanDate(item.since)} bis ${germanDate(item.upto || "")})` : ""}`}
                    href={`/companies/${item.childCompany?.id ?? "#"}`}
                    icon={<BuildingIcon />}
                    key={item.id}
                    title={item.childCompany?.companyName || "Firma"}
                    variant={item.upto !== null ? "outline" : "muted"}
                  />
                )
            )}
          </ItemGroup>
        </div>
      )}
      {publications.totalDocs > 0 && (
        <div className="mb-8">
          <Headline level="h3">Erwähnungen</Headline>
          <ItemGroup className="my-4 gap-4">
            {publications.docs.map(
              (item) =>
                typeof item.company === "object" && (
                  <ListItem
                    href={`/hr_publications/${item.id}`}
                    icon={<RssIcon />}
                    key={item.id}
                    title={`${item.title}: ${item.summary}`}
                    topline={
                      <span>
                        {germanDate(item.publicationDate)} über{" "}
                        {item.company?.companyName}
                      </span>
                    }
                  />
                )
            )}
          </ItemGroup>
        </div>
      )}
    </article>
  );
}
