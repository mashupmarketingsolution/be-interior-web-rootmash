"use client";
import { CmsUpdatedDate } from "@/components/cms/PageSections";
import { CmsText, CmsSection } from "@/components/cms/Editable";
import React from "react";

export default function PrivacyPolicy() {
  const legalBasisItems = [
    "Fulfill a contract or legal duty,",
    "Safeguard your vital interests, or",
    "Pursue our legitimate business interests, provided your rights are not adversely impacted.",
  ];

  const userRights = [
    "Access, correct, or request deletion of your data,",
    "Object to or restrict data processing,",
    "Transfer your data, and",
    "Withdraw consent at any time.",
  ];

  return (
    <CmsSection section="section-ca3a3a105e62"><section className="bg-ivory py-16 px-6 md:px-12 lg:px-24 font-sans text-zinc-800 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#111111]/5">

        {/* Page Header */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8">
          <h1 data-heading-tone="dark" className="text-3xl md:text-4xl font-montagu font-bold text-[#111111] tracking-wide"><CmsText section="section-ca3a3a105e62" entryKey="heading-990338808132" fallback={"Privacy policy"} original={<>
            Privacy policy
          </>} /></h1>
          <p className="text-sm text-zinc-500 mt-2"><CmsText section="section-ca3a3a105e62" entryKey="text-0aefced44aee" fallback={"Last updated: "} />{<CmsUpdatedDate path="/privacy-policy" />}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base text-zinc-600 leading-relaxed font-normal">

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-4f3bdd333264" fallback={"Who we are"} original={<>Who we are</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-fd3c9af8de7e" fallback={"Our website address is:"} />{" "}
              <a
                href="https://beinterior.com.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c35e00] hover:text-[#a34e00] underline font-medium transition-colors"
              ><CmsText section="section-ca3a3a105e62" entryKey="text-1afd1f0f4bf1" fallback={"Https://beinterior.com.bd"} /></a>
              .
            </p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-723da42fece9" fallback={"Purpose of this notice"} original={<>Purpose of this notice</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-c899c866e83e" fallback={"Be Interior values the security and privacy of your data. This policy outlines how we collect, use, and protect your information as part of our commitment to transparency in compliance with the General Data Protection Regulation (GDPR)."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-9da865625f9e" fallback={"Data collection and usage"} original={<>Data collection and usage</>} /></h3>
            <p>
              <span className="font-semibold text-[#111111]"><CmsText section="section-ca3a3a105e62" entryKey="text-0bec00a0636b" fallback={"Data Controller:"} /></span><CmsText section="section-ca3a3a105e62" entryKey="text-502c065f1a40" fallback={" Be Interior, located in Dhaka, Bangladesh, is the Controller of the personal data you provide. We collect only essential personal data, including your name, address, email, phone number, payment information, and other relevant information. This data enables us to provide our services, process orders, and share our products or promotions with you."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-cdd12314ef00" fallback={"Purpose and legal basis of processing"} original={<>Purpose and legal basis of processing</>} /></h3>
            <p className="mb-3"><CmsText section="section-ca3a3a105e62" entryKey="text-9e109e35c7bd" fallback={"We collect your data to provide services, fulfill contracts, and communicate with you about our offerings. We only use personal data with your consent or when required to:"} /></p>
            <ul className="list-none pl-0 space-y-2 mb-3">
              {legalBasisItems.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#c35e00] rounded-full mr-3 mt-2 shrink-0"></span>
                  <span><CmsText section="section-ca3a3a105e62" fallback={item} /></span>
                </li>
              ))}
            </ul>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-449be7354f18" fallback={"You may object to this processing, though doing so may affect our ability to provide certain services to you."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-3fa639a13e97" fallback={"Data storage and security"} original={<>Data storage and security</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-de04a58fd878" fallback={"Be Interior stores data primarily in Bangladesh and Singapore. We may work with external organizations to provide certain services, which may involve data transfers outside Asia. In such cases, we ensure appropriate safeguards are in place to protect your data."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-6638aa5cad46" fallback={"Data retention"} original={<>Data retention</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-52a7999ec4d9" fallback={"We only retain data for as long as necessary; typically no longer than six years. We continually review stored data and remove anything that is no longer required. Payment card information is never stored."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-91221cbfcce7" fallback={"Sharing your personal data"} original={<>Sharing your personal data</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-76b43b31f1be" fallback={"We may share data with trusted third parties to fulfill contractual obligations or where required by law; a court, or regulatory body. Your information will not be transferred outside our organization without notifying you and explaining the security protections in place."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-2d64bf828200" fallback={"Marketing communication"} original={<>Marketing communication</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-554639d34598" fallback={"With your permission, we may use your name and email to inform you about future offers and products. You can opt out at any time via phone, email, or our website."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-7b61de1de540" fallback={"Cookies"} original={<>Cookies</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-1121b98c532b" fallback={"Our website uses cookies to enhance your browsing experience. Cookies help us analyze traffic and tailor website content to your preferences. You can choose to accept or decline cookies via browser settings."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-8dc2f30067e3" fallback={"Your rights"} original={<>Your rights</>} /></h3>
            <p className="mb-3"><CmsText section="section-ca3a3a105e62" entryKey="text-9d9893596d75" fallback={"Under GDPR, you have the right to:"} /></p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              {userRights.map((right, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#c35e00] rounded-full mr-3 mt-2 shrink-0"></span>
                  <span>{right}</span>
                </li>
              ))}
            </ul>
            <p className="p-4 bg-[#FAF5E9] rounded-lg border border-[#111111]/5"><CmsText section="section-ca3a3a105e62" entryKey="text-6d02077b7c71" fallback={"For any data-related inquiries, contact us at "} /><span className="font-medium text-[#111111]"><CmsText section="section-ca3a3a105e62" entryKey="text-3835a7b8cb36" fallback={"H-54, 2nd Floor, Bank Tower, Jia Soroni Titas Gas Road,Shonir Akhra, Dhaka, Bangladesh, 1236"} /></span>.
            </p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-ef462b9f1605" fallback={"External links"} original={<>External links</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-025355278068" fallback={"Our website may contain links to other sites. We are not responsible for the content or privacy practices of these external sites."} /></p>
          </div>

          <div>
            <h3 data-heading-tone="dark" className="font-bold text-[#111111] tracking-wide text-lg mb-2"><CmsText section="section-ca3a3a105e62" entryKey="heading-cd3b2a956514" fallback={"Policy updates"} original={<>Policy updates</>} /></h3>
            <p><CmsText section="section-ca3a3a105e62" entryKey="text-ba3238a5aa5f" fallback={"We may update this policy, and any changes will be posted on our website or communicated to you via email."} /></p>
          </div>

        </div>
      </div>
    </section></CmsSection>
  );
}
