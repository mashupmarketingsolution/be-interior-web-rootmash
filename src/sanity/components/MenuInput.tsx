import { useState } from "react";
import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { set, type ArrayOfObjectsInputProps, type BooleanInputProps } from "sanity";
import { getDefaultMenu } from "../../lib/site-settings";

export function MenuVisibilityInput(props: BooleanInputProps) {
  return props.renderDefault({ ...props, value: props.value !== false });
}

export function MenuInput(props: ArrayOfObjectsInputProps) {
  const [confirm, setConfirm] = useState(false);
  return <Stack space={3}>
    <Text size={1} muted>To remove an item temporarily, turn off “Show in menu” instead of deleting it. Its name and link will be kept.</Text>
    <Button text="Restore default menu" mode="ghost" disabled={props.readOnly} onClick={() => setConfirm(true)} />
    {confirm && <Card padding={3} radius={2} tone="caution">
      <Stack space={3}>
        <Text size={1}>Replace the menu list with the original menu? Logo, favicon, colours and the header button will stay unchanged. Publish afterwards to apply.</Text>
        <Flex gap={2}>
          <Button text="Restore menu" tone="caution" onClick={() => { props.onChange(set(getDefaultMenu())); setConfirm(false); }} />
          <Button text="Cancel" mode="ghost" onClick={() => setConfirm(false)} />
        </Flex>
      </Stack>
    </Card>}
    {props.renderDefault(props)}
  </Stack>;
}
