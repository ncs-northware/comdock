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
    limit: 5,
    select: {
      companyName: true,
      headquarter: { city: true },
      hrCourt: true,
      hrDept: true,
      hrNumber: true,
    },
    sort: "company_name",
    where: { hrStatus: { equals: "aktiv" } },
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
                description={`${company.hrCourt} | ${company.hrDept} ${company.hrNumber}`}
                href={`companies/${company.id}`}
                icon={<BuildingIcon />}
                key={company.id}
                title={`${company.companyName}, ${company.headquarter.city}`}
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
      city: true,
      firstName: true,
      sirName: true,
    },
    sort: ["sirName", "firstName"],
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
                title={`${person.firstName} ${person.sirName}`}
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
