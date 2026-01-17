import { ListItem } from "@/components/list-item";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { sdk } from "@/lib/sdk";

export async function CompaniesList() {
  const companies = await sdk.find({
    collection: "companies",
    limit: 5,
    page: 1,
  });
  console.log("Companies", companies.docs);

  return (
    <ItemGroup>
      {companies.docs === undefined ? (
        <Alert>
          <AlertTitle>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </AlertTitle>
        </Alert>
      ) : (
        companies.docs.map((company) => (
          <ListItem
            description={`${company.hr_court} | ${company.hr_dept} ${company.hr_number}`}
            href="#"
            key={company.hr_number}
            title={`${company.company_name}, Sitz`}
          />
        ))
      )}
    </ItemGroup>
  );
}
