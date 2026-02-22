import { BuildingIcon, RssIcon } from "lucide-react";
import { ListItem } from "@/components/list-item";
import { Headline } from "@/components/typography";
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
    // biome-ignore lint/style/useConsistentObjectDefinitions: Payload SDK internal
    id: id,
    select: { first_name: true, sir_name: true, city: true },
  });
  return {
    title: `${personMetadata.first_name} ${personMetadata.sir_name}, ${personMetadata.city}`,
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
    // biome-ignore lint/style/useConsistentObjectDefinitions: Payload SDK internals
    id: id,
    select: {
      first_name: true,
      sir_name: true,
      city: true,
    },
  });

  const network = await payload.find({
    collection: "network",
    select: {
      child_company: true,
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
      companies: { company_name: true, id: true },
    },
  });

  const publications = await payload.find({
    collection: "hr_publications",
    select: {
      title: true,
      summary: true,
      publication_date: true,
      company: true,
    },
    where: { mentioned_persons: { equals: id } },
    populate: { companies: { company_name: true } },
  });

  return (
    <article>
      <div className="mb-8">
        <Headline level="h1">
          {person.first_name} {person.sir_name}, {person.city}
        </Headline>
      </div>
      <div className="mb-8">
        <Headline level="h3">Positionen</Headline>
        <ItemGroup className="my-4 gap-4">
          {network.docs.map(
            (item) =>
              typeof item.child_company === "object" && (
                <ListItem
                  description={`${item.type} ${item.upto !== null ? `(${germanDate(item.since)} bis ${germanDate(item.upto || "")})` : ""}`}
                  href={`/companies/${item.child_company?.id ?? "#"}`}
                  icon={<BuildingIcon />}
                  key={item.id}
                  title={item.child_company?.company_name || "Firma"}
                  variant={item.upto !== null ? "outline" : "muted"}
                />
              )
          )}
        </ItemGroup>
      </div>
      <div className="mb-8">
        <Headline level="h3">Erwähnungen</Headline>
        <ItemGroup className="my-4 gap-4">
          {publications.docs.map(
            (item) =>
              typeof item.company === "object" && (
                <ListItem
                  href={`/hr/${item.id}`}
                  icon={<RssIcon />}
                  key={item.id}
                  title={`${item.title}: ${item.summary}`}
                  topline={
                    <span>
                      {germanDate(item.publication_date)} über{" "}
                      {item.company?.company_name}
                    </span>
                  }
                />
              )
          )}
        </ItemGroup>
      </div>
    </article>
  );
}
