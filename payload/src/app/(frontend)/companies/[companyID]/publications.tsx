import { FileIcon, RssIcon, TagIcon } from "lucide-react";
import type { PaginatedDocs } from "payload";
import type { ReactNode } from "react";
import { ListItem } from "@/components/list-item";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { germanDate } from "@/lib/utils";
import type { Company } from "@/payload-types";

type HRPublications = PaginatedDocs<{
  id: number;
  company?: ((string | null) | Company) | undefined;
  title: string;
  summary?: string | null | undefined;
  publication_date: string;
}>;

export function HRPublications({
  publications,
  companyID,
}: {
  publications: HRPublications;
  companyID: string;
}) {
  function generateTopline(
    date: string,
    company?: string | Company | null
  ): ReactNode {
    if (typeof company !== "object") {
      return <span>{germanDate(date)}</span>;
    }

    if (company?.id === companyID) {
      return <span>{germanDate(date)}</span>;
    }

    return (
      <span>
        {germanDate(date)} über {company?.company_name}
      </span>
    );
  }
  return (
    <div>
      {publications.totalDocs === 0 ? (
        <Alert>
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup className="gap-4">
          {publications.docs.map((item) => (
            <ListItem
              href={`/hr_publications/${item.id}`}
              icon={<RssIcon />}
              key={item.id}
              title={`${item.title}: ${item.summary}`}
              topline={generateTopline(item.publication_date, item.company)}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}

type CompanyDocs = PaginatedDocs<{
  id: number;
  title?: string | null;
  type?: string | null;
  document_createdAt?: string | null;
  createdAt: string;
  url?: string | null;
}>;

export function CompanyDocs({ docs }: { docs: CompanyDocs }) {
  return (
    <div>
      {docs.totalDocs === 0 ? (
        <Alert>
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup>
          {docs.docs.map((document) => (
            <ListItem
              description={
                typeof document.document_createdAt === "string"
                  ? `Erstellt am ${germanDate(document.document_createdAt)}`
                  : `Hochgeladen am ${germanDate(document.createdAt)}`
              }
              href={document.url || "#"}
              icon={<FileIcon />}
              key={document.id}
              title={document.title || document.type || "Unbenannte Datei"}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}

type DesignsList = PaginatedDocs<{
  id: number;
  type: string;
  wordmark_title: string;
  registration_date: string;
}>;

export function DesignsList({ designs }: { designs: DesignsList }) {
  return (
    <div>
      {designs.totalDocs === 0 ? (
        <Alert>
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup>
          {designs.docs.map((design) => (
            <ListItem
              href={`/designs/${design.id}`}
              icon={<TagIcon />}
              key={design.id}
              title={`${design.type}: ${design.wordmark_title}`}
              topline={`${germanDate(design.registration_date)}`}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
