import { LocalizedText } from "@/components/Language";
import { PageSections } from "@/components/cms/PageSections";
import ArchitectInterior from "@/components/hire-architect/architect-interior/ArchitectInterior";
import CustomizedService from "@/components/hire-architect/customizedservice/CustomizedService";
import HireForm from "@/components/hire-architect/hireform/HireForm";
import React from "react";

const HireArchitect = () => {
  return (
    <div className="mt-24">
      <h1 data-heading-tone="dark" className="sr-only"><LocalizedText>{"Hire an architect in Dhaka"}</LocalizedText></h1>
      <PageSections path="/hire-architect" slots={[{ id: "section-39bbb4c8a8d9", node: (<HireForm />) },
{ id: "section-e7c2c0e3c691", node: (<ArchitectInterior />) }]} />
    </div>
  );
};

export default HireArchitect;
