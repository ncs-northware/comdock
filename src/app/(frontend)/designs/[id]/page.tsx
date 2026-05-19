import Image from "next/image";
import {
  DescriptionElement,
  DescriptionList,
  DescriptionListRow,
  DescriptionTerm,
} from "@/components/description-list";
import { RichText } from "@/components/richtext";
import { Headline, Link } from "@/components/typography";
import { payload } from "@/lib/api";
import { germanDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const designMetadata = await payload.findByID({
    collection: "designs",
    id,
    select: { type: true, wordmarkTitle: true },
  });

  return { title: `${designMetadata.type}: ${designMetadata.wordmarkTitle}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const design = await payload.findByID({
    collection: "designs",
    id,
    select: {
      type: true,
      wordmarkTitle: true,
      url: true,
      filename: true,
      height: true,
      width: true,
      itemStatus: true,
      niceClass: true,
      viennaClass: true,
      colors: true,
      company: true,
      registrationDate: true,
    },
  });

  return (
    <article>
      <Headline className="truncate" level="h1">
        {design.type}: {design.wordmarkTitle}
      </Headline>
      <div className="my-8">
        {typeof design.url === "string" && (
          <Image
            alt={`Grafik ${design.wordmarkTitle}`}
            className="mx-auto rounded-lg bg-muted object-cover"
            height={Math.min(300, design.height || 0)}
            src={design.url}
            width={design.width || 0}
          />
        )}
      </div>
      <DescriptionList>
        <DescriptionListRow className="md:grid md:grid-cols-2">
          <DescriptionTerm>Art</DescriptionTerm>
          <DescriptionElement>{design.type}</DescriptionElement>
        </DescriptionListRow>
        <DescriptionListRow className="md:grid md:grid-cols-2">
          <DescriptionTerm>Wortmarke/Titel</DescriptionTerm>
          <DescriptionElement>{design.wordmarkTitle}</DescriptionElement>
        </DescriptionListRow>
        {typeof design.company === "object" && (
          <DescriptionListRow className="md:grid md:grid-cols-2">
            <DescriptionTerm>Inhaber</DescriptionTerm>
            <DescriptionElement>
              <Link href={`/companies/${design.company.id}`}>
                {design.company.companyName}
              </Link>
            </DescriptionElement>
          </DescriptionListRow>
        )}
        <DescriptionListRow className="md:grid md:grid-cols-2">
          <DescriptionTerm>Datum der Eintragung</DescriptionTerm>
          <DescriptionElement>
            {germanDate(design.registrationDate)}
          </DescriptionElement>
        </DescriptionListRow>
        <DescriptionListRow className="md:grid md:grid-cols-2">
          <DescriptionTerm>Status der Marke</DescriptionTerm>
          <DescriptionElement>{design.itemStatus}</DescriptionElement>
        </DescriptionListRow>
        {design.niceClass && (
          <DescriptionListRow className="md:grid md:grid-cols-2">
            <DescriptionTerm>Nizza-Klassifikation</DescriptionTerm>
            <DescriptionElement>
              <RichText data={design.niceClass} />
            </DescriptionElement>
          </DescriptionListRow>
        )}
        {design.viennaClass && (
          <DescriptionListRow className="md:grid md:grid-cols-2">
            <DescriptionTerm>Wiener Klassifikation</DescriptionTerm>
            <DescriptionElement>
              <RichText data={design.viennaClass} />
            </DescriptionElement>
          </DescriptionListRow>
        )}
        {design.colors && design.colors.length > 0 && (
          <DescriptionListRow className="md:grid md:grid-cols-2">
            <DescriptionTerm>Farben</DescriptionTerm>
            <DescriptionElement>
              <ul className="list-inside list-disc">
                {design.colors?.map((color) => (
                  <li key={color}>{color}</li>
                ))}
              </ul>
            </DescriptionElement>
          </DescriptionListRow>
        )}
      </DescriptionList>
    </article>
  );
}
