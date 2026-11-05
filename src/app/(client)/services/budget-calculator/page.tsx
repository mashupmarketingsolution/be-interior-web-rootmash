import { LocalizedText } from "@/components/Language";
import { PageSections } from "@/components/cms/PageSections";
import BudgetCalculatorStep1 from "@/components/calculator/BudgetCalculatorStep1";
import { Suspense } from "react";
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
 const { type } = await searchParams;
 return <div className="mt-25"><h1 data-heading-tone="dark" className="sr-only"><LocalizedText>{"Interior budget calculator"}</LocalizedText></h1><PageSections path="/services/budget-calculator" slots={[{ id: "section-0808fc405263", node: (<Suspense fallback={<p role="status"><LocalizedText>{"Loading calculator…"}</LocalizedText></p>}><BudgetCalculatorStep1 key={type || "default"} /></Suspense>) }]} /></div>;
}
