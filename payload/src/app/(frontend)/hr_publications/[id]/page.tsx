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
    id,
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
    id,
    select: {
      title: true,
      summary: true,
      company: true,
      publicationDate: true,
      publicationData: true,
      description: true,
      docs: true,
    },
    depth: 1,
    populate: {
      docs: {
        title: true,
        type: true,
        documentCreatedAt: true,
        createdAt: true,
        url: true,
        filename: true,
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
            {item.company?.hrDept} {item.company?.hrNumber} /{" "}
            {item.company?.companyName}
          </Link>
        ) : (
          ""
        )}
        <span className="hidden text-right font-semibold text-primary sm:block">
          {germanDate(item.publicationDate)}
        </span>
      </div>
      {item.publicationData && item.publicationData.length > 0 && (
        <div>
          <Headline level="h3">Gegliederte Informationen</Headline>
          <DescriptionList className="font-mono">
            {item.publicationData.map((data) => (
              <DescriptionListRow
                className="md:grid md:grid-cols-2"
                key={data.id}
              >
                <DescriptionTerm
                  className={
                    data.outdatedBy !== null
                      ? "text-destructive line-through"
                      : ""
                  }
                >
                  {data.row}
                </DescriptionTerm>
                <DescriptionElement>
                  <RichText
                    className={
                      data.outdatedBy !== null
                        ? "text-destructive line-through"
                        : ""
                    }
                    data={data.value}
                  />
                  {data.outdatedBy !== null &&
                    typeof data.outdatedBy === "object" && (
                      <Alert variant="destructive">
                        <AlertDescription className="inline-block">
                          Diese Information wurde duch die{" "}
                          <Link
                            className="text-destructive underline hover:no-underline"
                            href={`/hr_publications/${data.outdatedBy.id}`}
                          >
                            Eintragung #{data.outdatedBy.id}
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
          <Headline level="h3">Weitere Informationen</Headline>
          <RichText className="my-6 font-mono" data={item.description} />
        </div>
      )}
      {item.docs && item.docs.length > 0 && (
        <div>
          <Headline level="h3">Dateien zu diesem Eintrag</Headline>
          <ItemGroup className="my-4 gap-4">
            {item.docs?.map((document) => {
              if (typeof document === "object") {
                return (
                  <ListItem
                    description={
                      typeof document.documentCreatedAt === "string"
                        ? `Erstellt am ${germanDate(document.documentCreatedAt)}`
                        : `Hochgeladen am ${document.createdAt}`
                    }
                    href={document.url || "#"}
                    icon={<FileIcon />}
                    key={document.id}
                    title={
                      document.title || document.type || "Unbenannte Datei"
                    }
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
