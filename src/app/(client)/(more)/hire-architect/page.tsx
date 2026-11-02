import ArchitectInterior from "@/components/hire-architect/architect-interior/ArchitectInterior";
import CustomizedService from "@/components/hire-architect/customizedservice/CustomizedService";
import HireForm from "@/components/hire-architect/hireform/HireForm";
import React from "react";

const HireArchitect = () => {
  return (
    <div className="mt-24">
      <h1 data-heading-tone="dark" className="sr-only">Hire an architect in Dhaka</h1>
      <HireForm />
      <ArchitectInterior />
    </div>
  );
};

export default HireArchitect;
