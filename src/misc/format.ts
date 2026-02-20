/**
 * Converte uma quantidade de minutos em uma string no formato "Xh Ym".
 *
 * @param minutes - Total de minutos a serem convertidos.
 * @returns Uma string representando horas e minutos, por exemplo:
 * "2h 5m", "1h 0m" ou "0h 45m".
 *
 * @example
 * ```ts
 * minutesToHourLabel(125); // retorna "2h 5m"
 * minutesToHourLabel(60);  // retorna "1h 0m"
 * minutesToHourLabel(5);   // retorna "0h 5m"
 * ```
 */
export function minutesToHourLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}
