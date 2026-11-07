import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center font-extralight text-slate-300 text-xs dark:text-slate-500">
      <p>
        Dies ist eine ausdrücklich nicht-amtliche Webseite zu Übungszwecken.
        Jegliche Daten sind frei erfunden.{" "}
        <Link
          className="hover:underline"
          href="https://github.com/northware-it/comdock/blob/main/README.md"
        >
          Mehr Infos in der README-Datei
        </Link>
      </p>
      <p>
        © {year}{" "}
        <Link href="https://github.com/northware-it">Northware IT</Link> and{" "}
        <Link href="https://github.com/onissen">onissen</Link>
      </p>
    </footer>
  );
}
