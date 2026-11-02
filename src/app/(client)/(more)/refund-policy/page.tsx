"use client";
import { CmsText, CmsSection } from "@/components/cms/Editable";
import React from "react";

export default function CancellationsAndRefunds() {
  const paymentMethods = [
    "Bank Transfers",
    "Cheque",
    "Cash",
    "Internet Banking",
    "Mobile Financial Services",
  ];

  return (
    <CmsSection section="section-fcf319c9ba82"><section className="bg-ivory py-16 px-6 md:px-12 lg:px-24 font-sans text-zinc-800 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#111111]/5">

        {/* Page Header */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8">
          <h1 data-heading-tone="dark" className="text-3xl md:text-4xl font-montagu font-bold text-[#111111] tracking-wide"><CmsText section="section-fcf319c9ba82" entryKey="heading-4cda083e5a2a" fallback={"Cancellations & refunds"} original={<>
            Cancellations & refunds
          </>} /></h1>
          <p className="text-sm text-zinc-500 mt-2"><CmsText section="section-fcf319c9ba82" entryKey="text-1173fec8946a" fallback={"Be Interior Project Guidelines & Policies"} /></p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base text-zinc-600 leading-relaxed font-normal">

          {/* Intro Paragraphs */}
          <div className="space-y-4">
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-c7de3bf026d3" fallback={"If you decide to cancel your project with Be Interior, you will not be charged for services that have not commenced or been processed at the time of your cancellation request. However, Be Interior cannot offer any refunds for services that have already been paid for, processed, initiated, or completed."} /></p>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-165a8ad8ef11" fallback={"During the tentative BOQ (Bill of Quantities) phase, any item or service can be modified, replaced, or removed before placing your Purchase Order and receiving an invoice. Once a purchase order has been placed and an invoice raised, modifications, replacements, or cancellations of any items will no longer be possible. Please don't worry; your Project Representative will review and confirm each item with you before raising an invoice."} /></p>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-0a9e5bf7cc7c" fallback={"For feedback or grievances, please get in touch with us at"} />{" "}
              <a
                href="mailto:beinteriorbd@gmail.com"
                className="text-[#c35e00] hover:text-[#a34e00] underline font-medium transition-colors"
              ><CmsText section="section-fcf319c9ba82" entryKey="text-7abab1ceb2b9" fallback={"Beinteriorbd@gmail.com"} /></a><CmsText section="section-fcf319c9ba82" entryKey="text-35d4cd492cff" fallback={". We value the opportunity to improve our services by understanding your needs and concerns."} /></p>
          </div>

          {/* Section: Returns */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-7f183f5d7198" fallback={"Returns"} original={<>
              Returns
            </>} /></h3>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-1e12fa9835c7" fallback={"Since our services (interior/furniture) come with a 2-year warranty, Be Interior does not offer returns."} /></p>
          </div>

          {/* Section: Price Revisions */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-257fbe7e4c99" fallback={"Price revisions"} original={<>
              Price revisions
            </>} /></h3>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-da37b2ce4bc3" fallback={"In cases where specific project requirements change, the service cost may also change accordingly."} /></p>
          </div>

          {/* Section: Delays */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-c64495e2b372" fallback={"Delays"} original={<>
              Delays
            </>} /></h3>
            <div className="space-y-2">
              <p><CmsText section="section-fcf319c9ba82" entryKey="text-a14139f5022e" fallback={"Delays in payment at any stage of the project may result in delays in project completion. Changes to project requirements may also lead to extended timelines."} /></p>
              <p><CmsText section="section-fcf319c9ba82" entryKey="text-543dc59224cc" fallback={"Be Interior cannot assume liability for delays caused by payment or requirement changes."} /></p>
            </div>
          </div>

          {/* Section: Payment Methods */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-2044f0dd7a38" fallback={"Payment methods"} original={<>
              Payment methods
            </>} /></h3>
            <p className="mb-3"><CmsText section="section-fcf319c9ba82" entryKey="text-fc366fd4eabc" fallback={"Be Interior accepts the following payment options for full interior design solutions:"} /></p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              {paymentMethods.map((method, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#c35e00] rounded-full mr-3 shrink-0"></span>
                  <span className="font-medium text-zinc-800">{method}</span>
                </li>
              ))}
            </ul>
            <p className="p-4 bg-[#FAF5E9] rounded-lg border border-[#111111]/5 text-xs text-zinc-500 italic"><CmsText section="section-fcf319c9ba82" entryKey="text-c710bb622759" fallback={"For payment details, please consult your Project Manager. Note that VAT will be applicable on all purchases."} /></p>
          </div>

          {/* Section: Invoices */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-74853dd13b22" fallback={"Invoices"} original={<>
              Invoices
            </>} /></h3>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-5f52a456748c" fallback={"An invoice is valid only for the period stated on it. If payment is not made within this period, the invoice will expire, and a new invoice must be generated."} /></p>
          </div>

          {/* Section: EMIs */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-ebe8b7404a76" fallback={"Emis"} original={<>
              Emis
            </>} /></h3>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-f07e841f2c0a" fallback={"Be Interior is in the process of setting up an EMI system, which will be available soon."} /></p>
          </div>

          {/* Section: Online Transactions */}
          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-fcf319c9ba82" entryKey="heading-24795ce3a2bc" fallback={"Online transactions"} original={<>
              Online transactions
            </>} /></h3>
            <p><CmsText section="section-fcf319c9ba82" entryKey="text-a6842fd9df66" fallback={"Be Interior is committed to safeguarding your financial privacy and ensuring secure transactions. Our online transaction system will be introduced shortly."} /></p>
            <p className="mt-2"><CmsText section="section-fcf319c9ba82" entryKey="text-f17d2fbde321" fallback={"For further information, please visit our website at"} />{" "}
              <a
                href="https://beinterior.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c35e00] hover:text-[#a34e00] underline font-medium transition-colors"
              ><CmsText section="section-fcf319c9ba82" entryKey="text-dc57aef0b6d8" fallback={"Beinterior.com.bd"} /></a>
              .
            </p>
          </div>

        </div>
      </div>
    </section></CmsSection>
  );
}
