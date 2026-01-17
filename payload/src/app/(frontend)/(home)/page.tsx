import { Headline } from "@/components/typography";
import { CompaniesList } from "./companies-list";

export default async function HomePage() {
  return (
    <div>
      <div>
        <Headline level="h1">Herzlich willkommen</Headline>
        <p className="leading-7">
          COMDOCK ist eine Plattform, die Ihnen Zugang zu Informationen über die
          Unternehmen der NCS Group bietet. Sie können die Unternehmensdaten,
          das Unternehmensnetzwerk und offizielle Bekanntmachungen und Dokumente
          einsehen. Die NCS Group veröffentlich über COMDOCK alle nötigen
          Informationen im Unternehmensregister, im Register des Deutschen
          Patent- und Markenamtes und in einigen anderen Registern.
        </p>
      </div>
      <div>
        <CompaniesList />
      </div>
    </div>
  );
}
