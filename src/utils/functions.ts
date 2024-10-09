export const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);

export const tooltipFormatter = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);
