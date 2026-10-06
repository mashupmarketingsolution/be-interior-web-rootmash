"use client";
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
    <section className="bg-ivory py-16 px-6 md:px-12 lg:px-24 font-sans text-zinc-800 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#111111]/5">

        {/* Page Header */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-montagu font-bold text-[#111111] tracking-wide">
            Cancellations & Refunds
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Be Interior Project Guidelines & Policies
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base text-zinc-600 leading-relaxed font-normal">

          {/* Intro Paragraphs */}
          <div className="space-y-4">
            <p>
              If you decide to cancel your project with Be Interior, you will
              not be charged for services that have not commenced or been
              processed at the time of your cancellation request. However, Be
              Interior cannot offer any refunds for services that have already
              been paid for, processed, initiated, or completed.
            </p>
            <p>
              During the tentative BOQ (Bill of Quantities) phase, any item or
              service can be modified, replaced, or removed before placing your
              Purchase Order and receiving an invoice. Once a purchase order has
              been placed and an invoice raised, modifications, replacements, or
              cancellations of any items will no longer be possible. Please
              don&apos;t worry; your Project Representative will review and confirm
              each item with you before raising an invoice.
            </p>
            <p>
              For feedback or grievances, please get in touch with us at{" "}
              <a
                href="mailto:beinteriorbd@gmail.com"
                className="text-[#c35e00] hover:text-[#a34e00] underline font-medium transition-colors"
              >
                beinteriorbd@gmail.com
              </a>
              . We value the opportunity to improve our services by
              understanding your needs and concerns.
            </p>
          </div>

          {/* Section: Returns */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Returns
            </h3>
            <p>
              Since our services (interior/furniture) come with a 2-year
              warranty, Be Interior does not offer returns.
            </p>
          </div>

          {/* Section: Price Revisions */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Price Revisions
            </h3>
            <p>
              In cases where specific project requirements change, the service
              cost may also change accordingly.
            </p>
          </div>

          {/* Section: Delays */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Delays
            </h3>
            <div className="space-y-2">
              <p>
                Delays in payment at any stage of the project may result in delays
                in project completion. Changes to project requirements may also
                lead to extended timelines.
              </p>
              <p>
                Be Interior cannot assume liability for delays caused by payment
                or requirement changes.
              </p>
            </div>
          </div>

          {/* Section: Payment Methods */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Payment Methods
            </h3>
            <p className="mb-3">
              Be Interior accepts the following payment options for full
              interior design solutions:
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              {paymentMethods.map((method, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#c35e00] rounded-full mr-3 shrink-0"></span>
                  <span className="font-medium text-zinc-800">{method}</span>
                </li>
              ))}
            </ul>
            <p className="p-4 bg-[#FAF5E9] rounded-lg border border-[#111111]/5 text-xs text-zinc-500 italic">
              For payment details, please consult your Project Manager. Note
              that VAT will be applicable on all purchases.
            </p>
          </div>

          {/* Section: Invoices */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Invoices
            </h3>
            <p>
              An invoice is valid only for the period stated on it. If payment
              is not made within this period, the invoice will expire, and a new
              invoice must be generated.
            </p>
          </div>

          {/* Section: EMIs */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              EMIs
            </h3>
            <p>
              Be Interior is in the process of setting up an EMI system, which
              will be available soon.
            </p>
          </div>

          {/* Section: Online Transactions */}
          <div>
            <h3 className="font-bold text-[#111111] tracking-wide text-lg mb-2">
              Online Transactions
            </h3>
            <p>
              Be Interior is committed to safeguarding your financial privacy
              and ensuring secure transactions. Our online transaction system
              will be introduced shortly.
            </p>
            <p className="mt-2">
              For further information, please visit our website at{" "}
              <a
                href="https://beinterior.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c35e00] hover:text-[#a34e00] underline font-medium transition-colors"
              >
                beinterior.com.bd
              </a>
              .
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
