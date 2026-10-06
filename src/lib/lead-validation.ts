export interface LeadInput { name: string; email: string; phone: string; projectInfo: string; eventId?: string }
export function validateLead(value: unknown): { data: LeadInput } | { error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Please provide your project details." };
  const body = value as Record<string, unknown>;
  for (const key of ["name", "email", "phone", "projectInfo"]) {
    if (typeof body[key] !== "string") return { error: "Please complete all required fields." };
  }
  const name = (body.name as string).trim();
  const email = (body.email as string).trim().toLowerCase();
  const phone = (body.phone as string).replace(/[-\s()]/g, "");
  const projectInfo = (body.projectInfo as string).trim();
  if (!name || name.length > 120) return { error: "Enter a name of up to 120 characters." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!/^(?:\+88|88)?01[3-9]\d{8}$/.test(phone)) return { error: "Enter a valid Bangladesh mobile number." };
  if (!projectInfo || projectInfo.length > 10000) return { error: "Enter project details of up to 10,000 characters." };
  if (body.eventId !== undefined && (typeof body.eventId !== "string" || !/^[a-f0-9-]{36}$/i.test(body.eventId))) return { error: "Invalid submission reference. Please refresh and try again." };
  return { data: { name, email, phone: phone.replace(/^(?:\+88|88)/, ""), projectInfo, eventId: body.eventId as string | undefined } };
}
