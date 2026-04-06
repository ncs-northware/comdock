import { Headline } from "@/components/typography";
import { CompaniesList, PersonsList } from "./lists";

export default async function HomePage() {
  return (
    <div>
      <div>
        <Headline level="h1">Herzlich willkommen</Headline>
        <p className="text-justify leading-7">
          COMDOCK ist eine Plattform, die Ihnen Zugang zu Informationen über die
          Unternehmen der NCS Group bietet. Sie können die Unternehmensdaten,
          das Unternehmensnetzwerk und offizielle Bekanntmachungen und Dokumente
          einsehen. Die NCS Group veröffentlich über COMDOCK alle nötigen
          Informationen im Unternehmensregister, im Register des Deutschen
          Patent- und Markenamtes und in einigen anderen Registern.
        </p>
      </div>
      <div className="grid gap-4 py-8 md:grid-cols-2">
        <div>
          <Headline level="h2">Firmen</Headline>
          <CompaniesList />
        </div>
        <div>
          <Headline level="h2">Personen</Headline>
          <PersonsList />
        </div>
      </div>
      <div />
    </div>
  );
}
