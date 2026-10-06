import BudgetCalculatorStep1 from "@/components/calculator/BudgetCalculatorStep1";
import { Suspense } from "react";
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
 const { type } = await searchParams;
 return <div className="mt-25"><h1 className="sr-only">Interior Budget Calculator</h1><Suspense fallback={<p role="status">Loading calculator…</p>}><BudgetCalculatorStep1 key={type || "default"} /></Suspense></div>;
}
