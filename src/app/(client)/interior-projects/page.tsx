"use client";
import InteriorProjects from "@/components/interior-project/all-interior/InteriorProjects";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import InteriorProjectsSkeleton from "@/components/interior-project/skeleton/InteriorSkeleton";

const Allinteriorpage = () => {
  return (
    <div>
      <h1 className="sr-only">Home and Office Interior Projects</h1>
      <InteriorProjects />
    </div>
  );
};

export default Allinteriorpage;
