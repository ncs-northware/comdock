import { BuildingIcon } from "lucide-react";
import Link from "next/link";
import { ListItem } from "@/components/list-item";
import { Headline } from "@/components/typography";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";

export const metadata = { title: "Entfernte Firmen" };

export default async function Page() {
  const companies = await payload.find({
    collection: "companies",
    select: {
      company_name: true,
      headquarter: { city: true },
      hr_court: true,
      hr_dept: true,
      hr_number: true,
    },
    where: { hr_status: { not_equals: "aktiv" } },
    sort: "company_name",
  });
  return (
    <div>
      <Headline level="h1">Entfernte Firmen</Headline>
      <Alert>
        <AlertDescription>
          <p>
            In dieser Anscht werden Firmen angezeigt, die vormals mit einem
            Unternehmen des NCS Verbunds verbunden waren, sich in Liquidation
            befinden oder bereits gelöscht wurden. <br />
            Unter{" "}
            <Link className="font-medium text-primary" href="/companies">
              Firmen
            </Link>{" "}
            finden Sie die aktuell aktiven Firmen.
          </p>
        </AlertDescription>
      </Alert>
      {companies.totalDocs === 0 ? (
        <Alert className="my-5">
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup>
          {companies.docs.map((company) => (
            <ListItem
              description={`${company.hr_court} | ${company.hr_dept} ${company.hr_number}`}
              href={`/companies/${company.id}`}
              icon={<BuildingIcon />}
              key={company.id}
              title={`${company.company_name}, ${company.headquarter.city}`}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
