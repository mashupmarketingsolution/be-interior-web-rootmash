import { defineField } from "sanity";

export function banglaString(name: string, title: string, group?: string) {
  return defineField({ name: name + "Bn", title: title + " (Bangla)", type: "string", group });
}

export function banglaText(name: string, title: string) {
  return defineField({ name: name + "Bn", title: title + " (Bangla)", type: "text", rows: 3 });
}

export function banglaList(name: string, title: string) {
  return defineField({ name: name + "Bn", title: title + " (Bangla)", type: "array", of: [{ type: "string" }] });
}
