import { BuildingIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { ListItem } from "@/components/list-item";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";

export async function CompaniesList() {
  const companies = await payload.find({
    collection: "companies",
    select: {
      company_name: true,
      hr_court: true,
      hr_dept: true,
      hr_number: true,
      headquarter: { city: true },
    },
    where: { hr_status: { equals: "aktiv" } },
    limit: 5,
    sort: "company_name",
  });

  return (
    <div>
      {companies.totalDocs === 0 ? (
        <Alert className="my-4">
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <div>
          <ItemGroup className="my-4 gap-4">
            {companies.docs.map((company) => (
              <ListItem
                description={`${company.hr_court} | ${company.hr_dept} ${company.hr_number}`}
                href={`companies/${company.id}`}
                icon={<BuildingIcon />}
                key={company.id}
                title={`${company.company_name}, ${company.headquarter.city}`}
              />
            ))}
          </ItemGroup>
          <div className="flex justify-center">
            <Button asChild className="mx-auto">
              <Link href="/companies">Mehr Firmen</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function PersonsList() {
  const persons = await payload.find({
    collection: "persons",
    limit: 5,
    select: {
      first_name: true,
      sir_name: true,
      city: true,
    },
    sort: ["sir_name", "firstName"],
  });

  return (
    <div>
      {persons.totalDocs === 0 ? (
        <Alert className="my-4">
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <div>
          <ItemGroup className="my-4 gap-4">
            {persons.docs.map((person) => (
              <ListItem
                description={person.city}
                href={`persons/${person.id}`}
                icon={<UserRoundIcon />}
                key={person.id}
                title={`${person.first_name} ${person.sir_name}`}
              />
            ))}
          </ItemGroup>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/persons">Mehr Personen</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
