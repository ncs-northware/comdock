import { FileIcon } from "lucide-react";
import {
  DescriptionElement,
  DescriptionList,
  DescriptionListRow,
  DescriptionTerm,
} from "@/components/description-list";
import { ListItem } from "@/components/list-item";
import { RichText } from "@/components/richtext";
import { Headline, Link } from "@/components/typography";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";
import { germanDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pubMetadata = await payload.findByID({
    collection: "hr_publications",
    // biome-ignore lint/style/useConsistentObjectDefinitions: payload internal
    id: id,
    select: {
      title: true,
    },
  });
  return { title: `${pubMetadata.title}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const item = await payload.findByID({
    collection: "hr_publications",
    // biome-ignore lint/style/useConsistentObjectDefinitions: payload internals
    id: id,
    select: {
      title: true,
      summary: true,
      company: true,
      publication_date: true,
      publication_data: true,
      description: true,
      media: true,
    },
    depth: 1,
    populate: {
      media: {
        type: true,
        url: true,
        updatedAt: true,
      },
    },
  });
  return (
    <article>
      <Headline className="truncate" level="h1">
        {item.title}
      </Headline>
      <p className="truncate text-muted-foreground text-xl">{item.summary}</p>
      <div className="mt-4 mb-6 flex justify-between">
        {typeof item.company === "object" ? (
          <Link
            className="font-semibold"
            href={`/companies/${item.company?.id}`}
          >
            {item.company?.hr_dept} {item.company?.hr_number} /{" "}
            {item.company?.company_name}
          </Link>
        ) : (
          ""
        )}
        <span className="hidden text-right font-semibold text-primary sm:block">
          {germanDate(item.publication_date)}
        </span>
      </div>
      {item.publication_data && item.publication_data.length > 0 && (
        <div>
          <Headline level="h2">Gegliederte Informationen</Headline>
          <DescriptionList className="font-mono">
            {item.publication_data.map((data) => (
              <DescriptionListRow
                className="md:grid md:grid-cols-2"
                key={data.id}
              >
                <DescriptionTerm
                  className={
                    data.outdated_by !== null
                      ? "text-destructive line-through"
                      : ""
                  }
                >
                  {data.row}
                </DescriptionTerm>
                <DescriptionElement>
                  <RichText
                    className={
                      data.outdated_by !== null
                        ? "text-destructive line-through"
                        : ""
                    }
                    data={data.value}
                  />
                  {data.outdated_by !== null &&
                    typeof data.outdated_by === "object" && (
                      <Alert variant="destructive">
                        <AlertDescription className="inline-block">
                          Diese Information wurde duch die{" "}
                          <Link
                            className="text-destructive underline hover:no-underline"
                            href={`/hr_publications/${data.outdated_by.id}`}
                          >
                            Eintragung #{data.outdated_by.id}
                          </Link>{" "}
                          geändert.
                        </AlertDescription>
                      </Alert>
                    )}
                </DescriptionElement>
              </DescriptionListRow>
            ))}
          </DescriptionList>
        </div>
      )}
      {item.description && (
        <div className="mt-4 mb-6">
          <Headline level="h2">Weitere Informationen</Headline>
          <RichText className="my-6 font-mono" data={item.description} />
        </div>
      )}
      {item.media && item.media.length > 0 && (
        <div>
          <Headline level="h2">Dateien zu diesem Eintrag</Headline>
          <ItemGroup className="my-4">
            {item.media?.map((media) => {
              if (typeof media === "object") {
                return (
                  <ListItem
                    description={`Anlage zuletzt geändert am ${germanDate(media.updatedAt)}`}
                    href={media.url || "#"}
                    icon={<FileIcon />}
                    key={media.id}
                    title={media.type || "Unbenannte Datei"}
                  />
                );
              }
              return "";
            })}
          </ItemGroup>
        </div>
      )}
    </article>
  );
}
