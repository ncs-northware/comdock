import Link from "next/link";
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
        {germanDate(date)} über{" "}
        <Link
          className="underline-offset-2 hover:underline"
          href={`/companies/${company?.id}`}
        >
          {company?.company_name}
        </Link>
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
              href={`/hr/${item.id}`}
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
