import { useState } from "react";
import { useDocumentOperation, type DocumentActionComponent } from "sanity";
import defaults from "../../content/default-content.json";

export const RestoreContentAction: DocumentActionComponent = props => {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [open, setOpen] = useState(false);
  const id = props.id.replace(/^drafts\./, "");
  const original = [...defaults.sections, ...defaults.pages].find(d => d._id === id);
  if (!original) return null;
  return {
    label: props.type === "sitePage" ? "আগের section-এর ক্রম ফিরিয়ে আনুন" : "এই অংশের আগের লেখা ও ছবি ফিরিয়ে আনুন",
    disabled: !!patch.disabled,
    onHandle: () => setOpen(true),
    dialog: open ? { type: "confirm", tone: "caution", message: "আগের তথ্য draft হিসেবে ফিরিয়ে আনবেন? আগে Preview দেখে তারপর Publish করুন। অন্য section, logo ও যোগাযোগের তথ্য বদলাবে না।", onCancel: () => setOpen(false), onConfirm: () => {
      if (props.type === "sitePage") patch.execute([{ set: { sections: "sections" in original ? original.sections : [] } }]);
      else { const d = original as unknown as Record<string, unknown>; const fields = Object.fromEntries(["texts", "images", "links", "lists", "slides", "slideDelay"].filter(k => d[k] !== undefined).map(k => [k, d[k]])); patch.execute([{ set: fields }]); }
      setOpen(false);
    } } : undefined,
  };
};
