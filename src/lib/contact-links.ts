export function whatsappNumber(value?: string) {
  const digits = String(value || "").replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(digits)) return "88" + digits;
  if (/^8801[3-9]\d{8}$/.test(digits)) return digits;
  return "8801618995918";
}
