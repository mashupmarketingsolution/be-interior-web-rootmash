import { PageSections } from "@/components/cms/PageSections";
import ContactForm from "@/components/contact/contactform/ContactForm";
import Location from "@/components/contact/location/Location";
import Contact from "@/components/contact/ContactUs/Contact";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ContactUs = () => {
  return (
    <div className="mt-24">
      <h1 data-heading-tone="dark" className="sr-only">Contact BE Interior</h1>
      <PageSections path="/contact" slots={[{ id: "section-08e64b4ac0a4", node: (<Contact />) },
{ id: "section-b6bcd931a809", node: (<Location />) },
{ id: "section-63787ee750fd", node: (<ContactForm />) }]} />
    </div>
  );
};

export default ContactUs;
