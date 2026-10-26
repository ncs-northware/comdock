export function germanDate(dateString: string | number | Date) {
  // Renders the given dateString to German format TT.MM.YYYY
  const formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as const;
  const date = new Date(dateString).toLocaleDateString("de-DE", formatOptions);
  return date;
}
