"use client";
import React from "react";

export default function TermsAndConditions() {
  const terms = [
    {
      title: "Validity of BOQ",
      text: "The submitted Bill of Quantity (BOQ) is valid for 60 days from the date of issuance.",
    },
    {
      title: "Pricing Exclusions",
      text: "The prices mentioned in the BOQ are exclusive of VAT and AIT.",
    },
    {
      title: "Scope of Work Variability",
      text: "The scope of work may vary by ±10% due to the nature of tasks involving significant human effort, along with potential changes during construction. Any variations will be discussed and finalized with the Client.",
    },
    {
      title: "Payment Delays",
      text: "Delays in payment may result in the postponement or cancellation of the project. The period of delay will not be deducted from the project's agreed timeline.",
    },
    {
      title: "Execution According to Approved Drawings",
      text: "All on-site work will be carried out according to the Client-approved (signed) working drawings.",
    },
    {
      title: "Imported Materials",
      text: "The availability and price of imported items/materials are subject to market conditions and may change accordingly.",
    },
    {
      title: "Approval of Additional Work",
      text: "Any additional work, along with an updated BOQ and revised timeline, must be approved (by signature or email) by the Client, with confirmation of additional payment. Payments will be based on the work progress ratio.",
    },
    {
      title: "Scope Revisions",
      text: "Any changes to the scope of work may affect the cost and delivery period. Such changes must not delay payments for work already completed under this quotation.",
    },
    {
      title: "Force Majeure",
      text: "In the event of Force Majeure that makes it impossible to proceed with part or all of the work, we will promptly notify the Client in writing. Services will be postponed for a period equal to the Force Majeure event duration plus an additional period not exceeding one week to remobilize for the continuation of services.",
    },
    {
      title: "Dispute Resolution",
      text: "Any disputes or disagreements arising from this transaction or proposal shall be resolved amicably by both parties.",
    },
    {
      title: "Warranty",
      text: "The completed project includes a one-year hardware replacement guarantee and a two-year service warranty. The warranty period starts on the date of site handover.",
    },
    {
      title: "Special Note",
      text: "This quotation may be subject to change due to additions, reductions, design adjustments, or human errors. Any adjustments will be discussed and resolved in coordination with both parties.",
    },
  ];

  return (
    <section className="bg-ivory py-16 px-6 md:px-12 lg:px-24 font-sans text-zinc-800 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#111111]/5">

        {/* Page Header */}
        <div className="border-b border-[#111111]/10 pb-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-montagu font-bold text-[#111111] tracking-wide">
            Terms and Conditions
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Please read our project rules and regulations carefully
          </p>
        </div>

        {/* Content List Block */}
        <div className="space-y-8 text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
          {terms.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-[#111111] tracking-wide text-lg">
                {index + 1}. {item.title}
              </h3>
              <p className="pl-5 border-l-2 border-[#c35e00]/20 text-zinc-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
