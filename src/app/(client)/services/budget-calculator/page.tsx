import { PageSections } from "@/components/cms/PageSections";
import BudgetCalculatorStep1 from "@/components/calculator/BudgetCalculatorStep1";
import { Suspense } from "react";
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
 const { type } = await searchParams;
 return <div className="mt-25"><h1 data-heading-tone="dark" className="sr-only">Interior budget calculator</h1><PageSections path="/services/budget-calculator" slots={[{ id: "section-0808fc405263", node: (<Suspense fallback={<p role="status">Loading calculator…</p>}><BudgetCalculatorStep1 key={type || "default"} /></Suspense>) }]} /></div>;
}
