import { Card, Stack, Text } from "@sanity/ui";
import type { ObjectInputProps } from "sanity";
import { urlFor } from "../lib/image";
export function CurrentImageInput(props: ObjectInputProps) {
  const value = props.value as { image?: { asset?: { _ref: string } }; fallbackUrl?: string; alt?: string } | undefined;
  const src = value?.image?.asset ? urlFor(value.image).width(600).url() : value?.fallbackUrl;
  return <Stack space={3}>
    {src && <Card padding={2} radius={2} border><Stack space={2}><Text size={1} muted>Current image</Text>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt={value?.alt || "Current website image"} style={{ display: "block", maxWidth: "100%", maxHeight: 220, objectFit: "contain" }} /></Stack></Card>}
    {props.renderDefault(props)}
  </Stack>;
}
