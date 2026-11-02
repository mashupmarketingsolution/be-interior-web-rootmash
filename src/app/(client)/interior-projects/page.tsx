"use client";
import { PageSections } from "@/components/cms/PageSections";

import InteriorProjects from "@/components/interior-project/all-interior/InteriorProjects";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import InteriorProjectsSkeleton from "@/components/interior-project/skeleton/InteriorSkeleton";

const Allinteriorpage = () => {
  return (
    <div>
      <h1 data-heading-tone="dark" className="sr-only">Home and office interior projects</h1>
      <PageSections path="/interior-projects" slots={[{ id: "section-31892f5d6fc3", node: (<InteriorProjects />) }]} />
    </div>
  );
};

export default Allinteriorpage;
