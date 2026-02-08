import { UserRoundIcon } from "lucide-react";
import { ListItem } from "@/components/list-item";
import { Headline } from "@/components/typography";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { payload } from "@/lib/api";

export const metadata = { title: "Personen" };

export default async function Page() {
  const persons = await payload.find({
    collection: "persons",
    select: {
      first_name: true,
      sir_name: true,
      city: true,
    },
    sort: ["sir_name", "first_name"],
  });
  return (
    <div>
      <Headline level="h1">Personen</Headline>
      {persons.totalDocs === 0 ? (
        <Alert className="my-4">
          <AlertDescription>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertDescription>
        </Alert>
      ) : (
        <ItemGroup className="my-4 gap-4">
          {persons.docs.map((person) => (
            <ListItem
              description={person.city}
              href={`/persons/${person.id}`}
              icon={<UserRoundIcon />}
              key={person.id}
              title={`${person.first_name} ${person.sir_name}`}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
