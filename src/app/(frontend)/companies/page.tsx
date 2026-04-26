import { BuildingIcon } from "lucide-react";
import { ListItem } from "@/components/list-item";
import { Headline, Link } from "@/components/typography";
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

export const metadata = { title: "Firmen" };

export default async function Page() {
  const companies = await payload.find({
    collection: "companies",
    select: {
      companyName: true,
      headquarter: { city: true },
      hrCourt: true,
      hrDept: true,
      hrNumber: true,
    },
    where: { hrStatus: { equals: "aktiv" } },
    sort: "companyName",
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
            <BreadcrumbPage>Firmen</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Headline level="h1">Firmen</Headline>
      {companies.totalDocs === 0 ? (
        <Alert className="my-4">
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup className="my-4 gap-4">
          {companies.docs.map((company) => (
            <ListItem
              description={`${company.hrCourt} | ${company.hrDept} ${company.hrNumber}`}
              href={`/companies/${company.id}`}
              icon={<BuildingIcon />}
              key={company.id}
              title={`${company.companyName}, ${company.headquarter.city}`}
            />
          ))}
        </ItemGroup>
      )}
      <Alert>
        <AlertDescription>
          <p>
            In dieser Ansicht werden nur aktive Firmen angezeigt.
            <br />
            Unter <Link href="/companies/removed">Entfernte Firmen</Link> finden
            Sie Firmen, die vormals mit einem Unternehmen des NCS Verbunds
            verbunden waren, sich in Liquidation befinden oder bereits gelöscht
            wurden.
          </p>
        </AlertDescription>
      </Alert>
    </article>
  );
}
