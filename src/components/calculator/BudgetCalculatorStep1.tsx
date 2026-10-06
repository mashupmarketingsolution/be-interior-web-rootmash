"use client";
import { leadErrorMessage } from "@/axios/axios";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiCheckCircle,
  FiCheck,
  FiPlusCircle,
  FiMinusCircle,
} from "react-icons/fi";
import officeEssential from "@/logo/HomePage/Gemini_Generated_Image_office3.png";
import officePremium from "@/logo/HomePage/Gemini_Generated_Image_office4.png";
import officeLuxury from "@/logo/HomePage/Gemini_Generated_Image_office5.png";
import slideOne from "@/logo/HomePage/Gemini_Generated_Image_home1.png";
import { FaCrown, FaRegStar } from "react-icons/fa";
import { LuGem } from "react-icons/lu";
import { DivergencesProvider } from "sanity";
import { preconnect } from "react-dom";

import {
  createLeadApi,
  officePackageItemsApi,
  packageItemsApi,
} from "@/axios/axios";

import { trackLead } from "@/components/Analytics/dataLayer";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// --- Data Arrays ---
const options3BHK = [
  { id: "2bhk", label: "2BHK (2 bedrooms, 1 drawing, 1 kitchen)" },
  { id: "3bhk", label: "3BHK (3 bedrooms, 1 drawing, 1 kitchen)" },
  { id: "4bhk", label: "4BHK (4 bedrooms, 1 drawing, 1 kitchen)" },
];

const options4BHK = [
  ...options3BHK,
  { id: "5bhk", label: "5BHK (5 bedrooms, 1 drawing, 1 kitchen)" },
];

const flatSizes = [
  { id: "1200-1349", label: "1200-1349", subOptions: options3BHK },
  { id: "1350-1499", label: "1350-1499", subOptions: options3BHK },
  { id: "1500-1649", label: "1500-1649", subOptions: options3BHK },
  { id: "1650-1799", label: "1650-1799", subOptions: options3BHK },
  { id: "1800-1949", label: "1800-1949", subOptions: options3BHK },
  { id: "1950-2099", label: "1950-2099", subOptions: options3BHK },
  { id: "2100-2249", label: "2100-2249", subOptions: options4BHK },
  { id: "2250-2399", label: "2250-2399", subOptions: options4BHK },
  { id: "2400-2549", label: "2400-2549", subOptions: options4BHK },
  { id: "2550-2699", label: "2550-2699", subOptions: options4BHK },
  { id: "2700+", label: "2700+", subOptions: options4BHK },
];

// Step 2 Data (Categorized for Logic)

const bedroomTypes = ["Master Bedroom", "Child Bedroom", "Guest Bedroom"];
const otherRooms = [
  "Drawing Room",
  "Family Living",
  "Dining Room",
  "Kitchen",
  "Open Kitchen",
  "Toilet",
  "Prayer Space",
];
const allRoomOptions = [...bedroomTypes, ...otherRooms];

const officeSpaceOptions = [
  "Reception",
  "Workstation Area",
  "MD/CEO Room",
  "Manager Cabin",
  "Meeting Room",
  "Conference Room",
  "Pantry",
  "Waiting/Lounge",
  "Storage",
  "Prayer Space",
  "Server/IT Room",

];

export interface PackageItem {
  name: string;
  price: string;
  slogan: string;
  furniture: string[];
  accessories: string[];
}
export interface PackageResult {
  packagename: string;
  packageitems: PackageItem[];
}

export interface PackageType {
  ms: number;
  query: string;
  result: PackageResult[];
  syncTags: string[];
}
export interface OfficePackageItem {
  name: string;
  price: number;
}

export interface OfficePackageResult {
  packagename: string;
  ratePerSft: number;
  description?: string;
  inclusions?: string[];
  exclusions?: string[];
  addOns?: OfficePackageItem[];
}

export interface OfficePackageType {
  ms: number;
  query: string;
  result: OfficePackageResult[];
  syncTags: string[];
}
const fetchPackageItems = async () => {
  try {
    const res = await packageItemsApi();
    if (res.status !== 200) {
      throw new Error("Status Code Error");
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error Package Api Fetch", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

interface Formtype {
  name: string;
  phone: string;
  email: string;
}

type FormErrors = Partial<Formtype>;
type ProjectType = "" | "home" | "office";
const BudgetCalculator = () => {
  const searchParams = useSearchParams();
  const [projectType, setProjectType] = useState<ProjectType>(() => { const type = searchParams.get("type"); return type === "home" || type === "office" ? type : ""; });
  const { data, isLoading, isError , error } = useQuery<PackageType>({
    queryKey: ["package-type"],
    queryFn: fetchPackageItems,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Package Data", data?.result);
  }
const {
  data: officePackageData,
  isLoading: officePackageLoading,
  isError: officePackageError,
} = useQuery<OfficePackageType>({
  queryKey: ["office-package-type"],
  queryFn: async () => {
    const res = await officePackageItemsApi();

    if (res.status !== 200) {
      throw new Error("Office package fetch failed");
    }

    return res.data;
  },
});

  const fetchResult = data?.result || [];

  const essentialpackageItems = fetchResult.filter((item) => {
    if (item.packagename === "essential") {
      return item.packageitems;
    }
  });
  if (process.env.NODE_ENV === "development") {
    console.log("essentialpackageItem", essentialpackageItems);
  }
  const luxurypackageItems = fetchResult.filter((item) => {
    if (item.packagename === "luxury") {
      return item.packageitems;
    }
  });
  if (process.env.NODE_ENV === "development") {
    console.log("luxurypackageItem", luxurypackageItems);
  }
  const premiumPackageItems = fetchResult.filter((item) => {
    if (item.packagename === "premium") {
      return item.packageitems;
    }
  });
  if (process.env.NODE_ENV === "development") {
    console.log("premiumPackageItem", premiumPackageItems);
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [openAccordion, setOpenAccordion] = useState("");
  const [customArea, setCustomArea] = useState("");

  const [officeArea, setOfficeArea] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [selectedOfficeSpaces, setSelectedOfficeSpaces] = useState<
    Record<string, number>
  >({});
  const [officeScope, setOfficeScope] = useState("");
  const [targetBudget, setTargetBudget] = useState("");
  const [customOfficeSpace, setCustomOfficeSpace] = useState("");
const [officeSpaceDropdownOpen, setOfficeSpaceDropdownOpen] = useState(false);
const officeSpaceDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>(
    {},
  );



const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
const roomDropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      roomDropdownRef.current &&
      !roomDropdownRef.current.contains(event.target as Node)
    ) {
      setRoomDropdownOpen(false);
    }
    if (
  officeSpaceDropdownRef.current &&
  !officeSpaceDropdownRef.current.contains(event.target as Node)
) {
  setOfficeSpaceDropdownOpen(false);
}
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);

  // Step 3
  const [selectedPackage, setSelectedPackage] = useState("");
  // Step 4
  const [formData, setFormData] = useState<Formtype>({
    name: "",
    phone: "",
    email: "",
  });
  const [formError, setFormError] = useState<FormErrors>({});
  // --- Helpers ---
  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setErrorModal(true);
    setTimeout(() => setErrorModal(false), 3000);
  };

  const getTotalBedrooms = () => {
    return bedroomTypes.reduce(
      (sum, room) => sum + (selectedRooms[room] || 0),
      0,
    );
  };

  const maxBedrooms = parseInt(selectedBHK) || 0;
  const selectedOfficePackage = officePackageData?.result?.find(
    (pkg) => pkg.packagename === selectedPackage,
  );

 const officeScopeMultiplier =
  officeScope === "Interior Work Only"
    ? 0.65
    : officeScope === "Furniture Only"
      ? 0.4
      : officeScope === "Complete Interior + Furniture"
        ? 1
        : 0;

const officeEstimatedCost =
  projectType === "office" && selectedOfficePackage
    ? Number(officeArea) *
      selectedOfficePackage.ratePerSft *
      officeScopeMultiplier
    : 0;
  // --- Handlers ---
  const handleNext = () => {
    if (currentStep === 1) {
    if (projectType === "home") {
      if (!Number.isFinite(Number(selectedSize)) || Number(selectedSize) <= 0 || !selectedBHK) {
        return triggerError(
          "Please enter your flat size and select a BHK type.",
        );
      }

      if (Object.keys(selectedRooms).length === 0) {
        return triggerError("Please select at least one room to design.");
      }
    }

    if (projectType === "office") {
      if (!Number.isFinite(Number(officeArea)) || Number(officeArea) <= 0) {
        return triggerError("Please enter your office size.");
      }

      if (!Number.isInteger(Number(employeeCount)) || Number(employeeCount) <= 0) {
        return triggerError("Please enter the number of employees.");
      }

      if (Object.keys(selectedOfficeSpaces).length === 0) {
        return triggerError("Please select at least one office space.");
      }
    }
  } else if (currentStep === 2) {
  if (projectType === "office" && !officeScope) {
    return triggerError("Please select what you need for your office.");
  }

  if (!selectedPackage) {
    return triggerError("Please select a package.");
  }
}

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setCurrentStep((prev) => prev + 1);
  };



  const handlePrev = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setCurrentStep((prev) => prev - 1);
  };
const resetCalculator = () => {
  setRoomDropdownOpen(false);
  setOfficeSpaceDropdownOpen(false);
  setCurrentStep(1);
  setSelectedSize("");
  setSelectedBHK("");
  setOpenAccordion("");
  setCustomArea("");

  setOfficeArea("");
  setEmployeeCount("");
  setSelectedOfficeSpaces({});
  setOfficeScope("");
  setTargetBudget("");
  setCustomOfficeSpace("");

  setSelectedRooms({});
  setSelectedPackage("");

  setFormData({
    name: "",
    phone: "",
    email: "",
  });

  setSubmitError("");
  setFormError({});
  setIsSubmitted(false);
  setErrorModal(false);
  setErrorMsg("");

  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
};
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError[name as keyof Formtype]) {
      setFormError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const tempErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!formData.name.trim()) {
      tempErrors.name = "Name is Required";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ""))) {
      tempErrors.phone = "Valid BD phone number required (e.g. 017xxxxxxxx)";
    }

    setFormError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (submittingRef.current || !validateForm()) return;
  submittingRef.current = true;
  setSubmitting(true);
  setSubmitError("");
  try {
    if (validateForm()) {
      const totalRooms = Object.values(selectedRooms).reduce(
        (sum, qty) => sum + qty,
        0,
      );

      const roomSummary = Object.entries(selectedRooms)
        .map(([room, qty]) => `${room} x${qty}`)
        .join(", ");
        const estimatedCost =
          selectedPackage === "essential"
            ? essentialTotalPrice
            : selectedPackage === "premium"
              ? premiumTotalPrice
              : selectedPackage === "luxury"
                ? luxuryTotalPrice
                : 0;


const projectInfo =
  projectType === "office"
    ? [
        "Project Type: Office Interior",
        `Area: ${officeArea} sft`,
        `Employees: ${employeeCount}`,
        `Spaces: ${Object.entries(selectedOfficeSpaces)
          .map(([space, qty]) => `${space} x${qty}`)
          .join(", ")}`,
        `Scope: ${officeScope}`,
        `Package: ${
          selectedPackage.charAt(0).toUpperCase() +
          selectedPackage.slice(1)
        }`,
        `Target Budget: ${targetBudget || "Not decided yet"}`,
        `Estimated Cost: ${
          officeEstimatedCost > 0
            ? `${officeEstimatedCost.toLocaleString("en-IN")} Tk`
            : "Rate not configured yet"
        }`,
        "Source: Budget Calculator",
      ].join("\n")
    : [
        "Project Type: Home Interior",
        `Area: ${selectedSize} sft`,
        `BHK: ${selectedBHK.toUpperCase()}`,
        `Rooms: ${roomSummary}`,
        `Total Rooms: ${totalRooms}`,
        `Package: ${
          selectedPackage.charAt(0).toUpperCase() +
          selectedPackage.slice(1)
        }`,
        `Estimated Cost: ${
          estimatedCost > 0
            ? `${estimatedCost.toLocaleString("en-IN")} Tk`
            : "Depends on requirement"
        }`,
        "Source: Budget Calculator",
      ].join("\n");
      const response = await createLeadApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectInfo,
      });

      trackLead("budget_calculator", response.data.eventId);
      setIsSubmitted(true);
      setCurrentStep(4);

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
        if (process.env.NODE_ENV === "development") {
          console.log("Form Submitted successfully");
        }
      }
    } catch (err: unknown) {
      setSubmitError(leadErrorMessage(err));
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  // --- Step 2 Room Logic ---
  const toggleRoomCheckbox = (room: string) => {
    const isBedroom = bedroomTypes.includes(room);
    const currentQty = selectedRooms[room] || 0;

    if (currentQty > 0) {
      const newRooms = { ...selectedRooms };
      delete newRooms[room];
      setSelectedRooms(newRooms);
    } else {
      if (isBedroom) {
        if (getTotalBedrooms() >= maxBedrooms) {
          return triggerError(
            `You can only select up to ${maxBedrooms} bedrooms based on your ${selectedBHK.toUpperCase()} selection.`,
          );
        }
      }
      setSelectedRooms({ ...selectedRooms, [room]: 1 });
    }
  };

  const incrementRoom = (e: React.MouseEvent, room: string) => {
    e.stopPropagation();
    const isBedroom = bedroomTypes.includes(room);
    const currentQty = selectedRooms[room] || 0;

    if (isBedroom) {
      if (getTotalBedrooms() >= maxBedrooms) {
        return triggerError(
          `Maximum limit reached! You can't add more than ${maxBedrooms} bedrooms.`,
        );
      }
    } else if (room === "Toilet") {
      // NEW LOGIC: Allow up to 4 toilets
      if (currentQty >= 4) {
        return triggerError("You can only add up to 4 toilets.");
      }
    } else {
      // All other rooms are limited to 1
      if (currentQty >= 1) return;
    }

    setSelectedRooms({
      ...selectedRooms,
      [room]: currentQty + 1,
    });
  };

  const decrementRoom = (e: React.MouseEvent, room: string) => {
    e.stopPropagation();
    const currentQty = selectedRooms[room] || 0;
    if (currentQty > 1) {
      setSelectedRooms({ ...selectedRooms, [room]: currentQty - 1 });
    } else if (currentQty === 1) {
      const newRooms = { ...selectedRooms };
      delete newRooms[room];
      setSelectedRooms(newRooms);
    }
  };

  // --- Render Steps Functions ---
  const renderProjectTypeSelector = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <p className="text-sm font-semibold tracking-widest uppercase text-[#C87A31] mb-2">
        Budget Calculator
      </p>

      <h2 className="text-2xl md:text-4xl font-bold text-[#111111]">
        What would you like to design?
      </h2>

      <p className="text-zinc-500 mt-3">
        Choose your project type to get a more relevant preliminary estimate.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <button
        type="button"
        onClick={() => {
          setProjectType("home");
          setCurrentStep(1);
        }}
        className="group bg-white border-2 border-[#C87A31]/40 md:border-transparent md:hover:border-[#C87A31] rounded-2xl p-5 md:p-7 text-left shadow-md md:shadow-sm md:hover:shadow-lg transition-all active:scale-[0.98]"
      >
        <div className="text-4xl mb-4">🏠</div>

        <h3 className="text-xl font-bold text-[#111111] mb-2">
          Home Interior
        </h3>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Estimate your flat interior based on size, BHK, rooms and package.
        </p>
        <div className="mt-5 md:hidden flex items-center justify-between rounded-xl bg-[#C87A31] px-4 py-3 text-white font-semibold text-sm">
        <span>Start Home Estimate</span>
        <span>→</span>
      </div>
      </button>

      <button
        type="button"
        onClick={() => {
          setProjectType("office");
          setCurrentStep(1);
        }}

        className="group bg-white border-2 border-[#C87A31]/40 md:border-transparent md:hover:border-[#C87A31] rounded-2xl p-5 md:p-7 text-left shadow-md md:shadow-sm md:hover:shadow-lg transition-all active:scale-[0.98]"
      >
        <div className="text-4xl mb-4">🏢</div>

        <h3 className="text-xl font-bold text-[#111111] mb-2">
          Office Interior
        </h3>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Estimate your office interior based on area, employees, spaces and package.
        </p>
        <div className="mt-5 md:hidden flex items-center justify-between rounded-xl bg-[#C87A31] px-4 py-3 text-white font-semibold text-sm">
        <span>Start Office Estimate</span>
        <span>→</span>
      </div>
      </button>
    </div>
  </div>
);
const renderHomeStep1 = () => (
  <div className="w-full max-w-4xl mx-auto space-y-8">
    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-2">
        Flat Size (sft)
      </label>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
        <input
                  aria-label="Enter exact flat size, e.g. 1450"
                  type="number"
          min="300"
          placeholder="Enter exact flat size, e.g. 1450"
          value={customArea}
          onChange={(e) => {
            setCustomArea(e.target.value);
            setSelectedSize(e.target.value);
          }}
          className="w-full px-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#C87A31] outline-none"
        />

        <select
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setCustomArea(e.target.value);
          }}
          className="w-full px-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#C87A31] outline-none"
        >
          <option value="">Quick Select</option>
          <option value="800">800 sft</option>
          <option value="1000">1000 sft</option>
          <option value="1200">1200 sft</option>
          <option value="1500">1500 sft</option>
          <option value="1800">1800 sft</option>
          <option value="2200">2200 sft</option>
          <option value="2700">2700 sft</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-2">
        BHK Type
      </label>

      <select
        value={selectedBHK}
        onChange={(e) => setSelectedBHK(e.target.value)}
        className="w-full px-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#C87A31] outline-none"
      >
        <option value="">Select BHK</option>
        <option value="1bhk">1 BHK</option>
        <option value="2bhk">2 BHK</option>
        <option value="3bhk">3 BHK</option>
        <option value="4bhk">4 BHK</option>
        <option value="5bhk">5 BHK</option>
        <option value="6bhk">6+ BHK</option>
      </select>
    </div>

<div>
  <label className="block text-sm font-semibold text-zinc-700 mb-3">
    Rooms to Design
  </label>

 <div ref={roomDropdownRef} className="relative" onKeyDown={(event) => { if (event.key === "Escape") { setRoomDropdownOpen(false); roomDropdownRef.current?.querySelector("button")?.focus(); } }}>
    <button
      type="button"
      aria-expanded={roomDropdownOpen}
      aria-controls="calculator-rooms"
      onClick={() => setRoomDropdownOpen((prev) => !prev)}
      className="w-full bg-white border-2 border-transparent focus:border-[#C87A31] rounded-xl px-4 py-4 flex items-center justify-between text-left"
    >
      <span className="text-[#111111] font-medium">
        {Object.keys(selectedRooms).length > 0
          ? `${Object.keys(selectedRooms).length} room type(s) selected`
          : "Select rooms"}
      </span>

      <FiChevronDown
        className={`transition-transform ${
          roomDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {roomDropdownOpen && (
      <div id="calculator-rooms" className="mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-sm p-3 max-h-72 overflow-y-auto">
        {allRoomOptions.map((room) => {
          const selected = selectedRooms[room] || 0;

          return (
            <button
              key={room}
              aria-pressed={selected > 0}
              type="button"
              onClick={() => toggleRoomCheckbox(room)}
              className="w-full flex items-center justify-between px-3 py-3 hover:bg-[#FAF5E9] rounded-lg transition-colors"
            >
              <span className="text-sm font-medium text-[#111111]">
                {room}
              </span>

              <span
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  selected
                    ? "bg-[#C87A31] border-[#C87A31] text-white"
                    : "border-zinc-300"
                }`}
              >
                {selected ? <FiCheck size={13} /> : null}
              </span>
            </button>
          );
        })}
      </div>
    )}
  </div>

  {Object.keys(selectedRooms).length > 0 && (
    <div className="flex flex-wrap gap-2 mt-3">
      {Object.entries(selectedRooms).map(([room, qty]) => (
        <span
          key={room}
          className="inline-flex items-center gap-1.5 bg-white border border-[#C87A31]/20 text-[#111111] text-xs font-medium px-3 py-1.5 rounded-full"
        >
          {room}
          {qty > 1 ? ` ×${qty}` : ""}
        </span>
      ))}
    </div>
  )}
</div>
  </div>
);
const renderOfficeStep1 = () => (
  <div className="w-full max-w-4xl mx-auto space-y-8">
    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-2">
        Office Size (sft)
      </label>

      <input
                  aria-label="Enter office size, e.g. 2200"
                  type="number"
        min="200"
        placeholder="Enter office size, e.g. 2200"
        value={officeArea}
        onChange={(e) => setOfficeArea(e.target.value)}
        className="w-full px-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#C87A31] outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-2">
        Number of Employees
      </label>

      <input
                  aria-label="Enter employee count, e.g. 30"
                  type="number"
        min="1"
        placeholder="Enter employee count, e.g. 30"
        value={employeeCount}
        onChange={(e) => setEmployeeCount(e.target.value)}
        className="w-full px-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#C87A31] outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-3">
        Spaces Required
      </label>

      <div ref={officeSpaceDropdownRef} className="relative" onKeyDown={(event) => { if (event.key === "Escape") { setOfficeSpaceDropdownOpen(false); officeSpaceDropdownRef.current?.querySelector("button")?.focus(); } }}>
        <button
          type="button"
          onClick={() =>
            setOfficeSpaceDropdownOpen((prev) => !prev)
          }
          aria-expanded={officeSpaceDropdownOpen}
          aria-controls="calculator-office-spaces"
          className="w-full bg-white border-2 border-transparent focus:border-[#C87A31] rounded-xl px-4 py-4 flex items-center justify-between text-left"
        >
          <span className="text-[#111111] font-medium">
            {Object.keys(selectedOfficeSpaces).length > 0
              ? `${Object.keys(selectedOfficeSpaces).length} space type(s) selected`
              : "Select office spaces"}
          </span>

          <FiChevronDown
            className={`transition-transform ${
              officeSpaceDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {officeSpaceDropdownOpen && (
          <div id="calculator-office-spaces" className="mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-sm p-3 max-h-72 overflow-y-auto">
            {officeSpaceOptions.map((space) => {
              const qty = selectedOfficeSpaces[space] || 0;

              return (
                <button
                  key={space}
                  aria-pressed={qty > 0}
                  type="button"
                  onClick={() => {
                    if (qty > 0) {
                      const updated = { ...selectedOfficeSpaces };
                      delete updated[space];
                      setSelectedOfficeSpaces(updated);
                    } else {
                      setSelectedOfficeSpaces({
                        ...selectedOfficeSpaces,
                        [space]: 1,
                      });
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 hover:bg-[#FAF5E9] rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-[#111111]">
                    {space}
                  </span>

                  <span
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      qty > 0
                        ? "bg-[#C87A31] border-[#C87A31] text-white"
                        : "border-zinc-300"
                    }`}
                  >
                    {qty > 0 ? <FiCheck size={13} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>

    <div className="rounded-2xl bg-white p-4 border border-zinc-200">
      <label className="block text-sm font-semibold text-zinc-700 mb-2">
        Add Custom Space
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
                  aria-label="e.g. Training Room"
                  type="text"
          placeholder="e.g. Training Room"
          value={customOfficeSpace}
          onChange={(e) => setCustomOfficeSpace(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#C87A31] outline-none"
        />

        <button
          type="button"
          onClick={() => {
            const value = customOfficeSpace.trim();

            if (!value) return;

            setSelectedOfficeSpaces({
              ...selectedOfficeSpaces,
              [value]: 1,
            });

            setCustomOfficeSpace("");
          }}
          className="px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#C87A31] text-white font-semibold transition-colors"
        >
          Add
        </button>
      </div>
    </div>

    {Object.keys(selectedOfficeSpaces).length > 0 && (
      <div className="flex flex-wrap gap-2">
        {Object.entries(selectedOfficeSpaces).map(([space, qty]) => (
          <span
            key={space}
            className="inline-flex items-center gap-1.5 bg-white border border-[#C87A31]/20 text-[#111111] text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {space}
            {qty > 1 ? ` ×${qty}` : ""}
          </span>
        ))}
      </div>
    )}
  </div>
);

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
      {flatSizes.map((size) => {
        const isSelected = selectedSize === size.id;
        const isOpen = openAccordion === size.id;
        return (
          <div key={size.id} className="flex flex-col">
            <div
              onClick={() => {
                setSelectedSize(size.id);
                setOpenAccordion(isOpen ? "" : size.id);
                if (selectedSize !== size.id) setSelectedBHK("");
              }}
              className={`relative flex items-center justify-between px-5 py-4 bg-white rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? "border-2 border-[#C87A31] shadow-[0_10px_20px_rgba(200,122,49,0.15)] transform scale-[1.02]" : "border-[2px] border-transparent opacity-95 hover:shadow-md"}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-[#C87A31]" : "border-gray-300"}`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C87A31]" />
                    )}
                  </div>
                  <span
                    className={`font-semibold md:text-lg ${isSelected ? "text-[#111111]" : "text-gray-700"}`}
                  >
                    {size.label}
                  </span>
                </div>
                {isSelected && selectedBHK && !isOpen && (
                  <div className="ml-8 mt-1 flex items-center gap-1.5 text-xs font-medium text-[#C87A31]">
                    <FiCheckCircle />
                    <span>{selectedBHK.toUpperCase()} Selected</span>
                  </div>
                )}
              </div>
              <FiChevronDown
                className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C87A31]" : "text-gray-400"}`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col gap-2 p-4 ml-2 bg-[#111111] rounded-xl border border-[#C87A31]/30">
                {size.subOptions.map((bhk) => (
                  <label
                    key={bhk.id}
                    className="flex items-start gap-3 cursor-pointer p-2 hover:bg-white/10 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBHK(bhk.id);
                      setOpenAccordion("");
                    }}
                  >
                    <div
                      className={`w-4 h-4 mt-1 rounded-full border flex items-center justify-center shrink-0 ${selectedBHK === bhk.id ? "border-[#C87A31] bg-[#C87A31]" : "border-white/40"}`}
                    >
                      {selectedBHK === bhk.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${selectedBHK === bhk.id ? "text-[#C87A31] font-semibold" : "text-white/90"}`}
                    >
                      {bhk.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
      {allRoomOptions.map((room, idx) => {
        const qty = selectedRooms[room] || 0;
        const isSelected = qty > 0;
        const isBedroom = bedroomTypes.includes(room);
        const isToilet = room === "Toilet";

        const canIncrement = isBedroom || isToilet;

        return (
          <div
            key={idx}
            onClick={() => toggleRoomCheckbox(room)}
            className={`flex items-center justify-between px-5 py-4 bg-white rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? "border-[2px] border-[#C87A31] shadow-md" : "border-2 border-white/50 hover:border-[#111111]/20"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-[#C87A31] border-[#C87A31]" : "border-gray-300"}`}
              >
                {isSelected && <FiCheck className="text-white text-sm" />}
              </div>
              <span
                className={`font-medium ${isSelected ? "text-[#C87A31]" : "text-gray-700"}`}
              >
                {room}
              </span>
            </div>

            {isSelected && (
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => decrementRoom(e, room)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiMinusCircle className="text-xl" />
                </button>
                <span className="font-semibold text-lg text-[#111111] w-4 text-center">
                  {qty}
                </span>
                {canIncrement ? (
                  <button
                    onClick={(e) => incrementRoom(e, room)}
                    className="text-[#C87A31] hover:text-[#a06227] transition-colors"
                  >
                    <FiPlusCircle className="text-xl" />
                  </button>
                ) : (
                  <button
                    className="text-gray-200 cursor-not-allowed"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiPlusCircle className="text-xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep3 = () => {
    const packages = [
      {
        id: "essential",
        name: "Essential",
        img: officeEssential,
        icon: <FaRegStar className="text-white text-2xl opacity-90" />,
        headerBg: "from-[#ff6b8b] to-[#ff8e53]",

        features: [
          "Functional 2D Layout",
          "3D Interior Design",
          "Standard Materials & Accessories",
          "Complete Execution",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        img: officePremium,
        icon: <LuGem className="text-white text-2xl opacity-90" />,
        headerBg: "from-[#20b2aa] to-[#48d1cc]",
        features: [
      "Functional 2D Layout",
      "High-end 3D Design",
      "High Grade Materials & Accessories",
      "Complete Execution",
    ],
        isFeatured: true,
      },
      {
        id: "luxury",
        name: "Luxury",
        img: officeLuxury,
        icon: <FaCrown className="text-white text-2xl opacity-90" />,
        headerBg: "from-[#ff9f43] to-[#ffbe76]",
        features: [
          "Functional 2D Layout",
          "Luxury 3D Design",
          "Premium Materials & Branded Accessories",
          "Designer Finish & Complete Execution",
        ],
      },
      {
        id: "custom",
        name: "Custom",
        img: slideOne,
        icon: <FiPlusCircle className="text-white text-2xl opacity-90" />,
        headerBg: "from-[#2d3436] to-[#000000]",
        desc: "Design a package that fits you best",
        features: [
          "Fully Personalized Layout",
          "Custom 3D Interior Design",
          "Flexible Material Selection",
          "Tailored With Our Design Team",
        ],
      },
    ];

    return (
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-poppins">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch justify-center w-full max-w-7xl px-2 lg:px-0">
          {packages.map((pkg, index) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <button
                type="button"
                aria-label={`${pkg.name} package`}
                aria-pressed={isSelected}
                key={index}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C87A31] cursor-pointer w-full bg-white rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-2 overflow-hidden transition-all duration-500 flex flex-col group relative
             ${pkg.isFeatured ? "lg:shadow-[0_25px_60px_rgba(54,88,86,0.15)] z-10" : "hover:-translate-y-2 z-0"}
              ${isSelected ? "border-[#C87A31] ring-4 ring-[#C87A31]/20 shadow-2xl" : "border-zinc-100 hover:border-zinc-300"}
            `}
              >
                <div
                  className={`relative bg-gradient-to-br ${pkg.headerBg} pt-8 pb-14 px-6 text-white flex justify-between items-center overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                  <div className="z-10">
                    <h3 className="text-xl sm:text-2xl font-black tracking-wide font-montagu mb-1">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="z-10 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                    {pkg.icon}
                  </div>
                </div>

                <div className="px-6 -mt-8 relative z-20">
                  <div className="w-full aspect-[16/8] relative rounded-2xl overflow-hidden bg-zinc-100 shadow-md border-2 border-white">
                    <Image
                      src={pkg.img || "/img.jpg"}
                      alt={`${pkg.name} package`}
                      fill
                      sizes="(max-w-768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={pkg.isFeatured}
                    />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  {pkg.desc && (
                    <p className="text-xs font-semibold text-zinc-500 mb-4 text-center">
                      {pkg.desc}
                    </p>
                  )}
                  <ul className="space-y-3.5 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-zinc-600 text-sm font-medium"
                      >
                        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-[10px] text-amber-600 font-bold">
                          ✓
                        </span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto w-full text-center py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isSelected ? "bg-[#C87A31] text-white shadow-md" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"}`}
                  >
                    {isSelected ? "Selected" : "Select Package"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };
const renderOfficePackageStep = () => {
  const packageOrder = ["essential", "premium", "luxury"];

const officePackages = [...(officePackageData?.result || [])].sort(
  (a, b) =>
    packageOrder.indexOf(a.packagename) -
    packageOrder.indexOf(b.packagename),
);

  if (officePackageLoading) {
    return (
      <div className="text-center py-12 text-zinc-500">
        Loading office packages...
      </div>
    );
  }

  if (officePackageError) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load office packages.
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-6">
  <p className="text-sm font-semibold text-zinc-700 mb-3">
    What do you need?
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {[
      "Interior Work Only",
      "Furniture Only",
      "Complete Interior + Furniture",
    ].map((scope) => {
      const isSelected = officeScope === scope;

      return (
        <button
          key={scope}
          type="button"
          onClick={() => setOfficeScope(scope)}
          className={`px-4 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
            isSelected
              ? "border-[#C87A31] bg-[#FFF8F0] text-[#111111]"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
          }`}
        >
          {scope}
        </button>
      );
    })}
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {officePackages.map((pkg) => {
          const isSelected = selectedPackage === pkg.packagename;

          return (
            <button
              key={pkg.packagename}
              type="button"
              onClick={() => setSelectedPackage(pkg.packagename)}
              className={`text-left bg-white rounded-2xl border-2 p-5 transition-all shadow-sm ${
                isSelected
                  ? "border-[#C87A31] ring-4 ring-[#C87A31]/10"
                  : "border-zinc-100 hover:border-zinc-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C87A31] font-semibold">
                    Office Package
                  </p>

                  <h3 className="text-xl font-bold text-[#111111] capitalize mt-1">
                    {pkg.packagename}
                  </h3>
                </div>

                {isSelected && (
                  <span className="w-7 h-7 rounded-full bg-[#C87A31] text-white flex items-center justify-center">
                    <FiCheck size={15} />
                  </span>
                )}
              </div>



              {pkg.description && (
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                  {pkg.description}
                </p>
              )}

              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {pkg.inclusions.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-600"
                    >
                      <span className="text-[#C87A31]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div
                className={`mt-4 w-full text-center py-2.5 rounded-full text-sm font-bold ${
                  isSelected
                    ? "bg-[#C87A31] text-white"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {isSelected ? "Selected" : "Select Package"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

  const renderStep4 = () => {
    return (
      <div
        className={`flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm`}
      >
        <div className="w-full relative md:w-1/2 flex items-center justify-center bg-[#FAF5E9] rounded-2xl p-8 min-h-[300px]">
          <Image
            src={officePremium}
            alt="img"
            fill
            quality={100}
            className="object-cover rounded-lg"
          />
        </div>
        <form
          className="w-full md:w-1/2 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {submitError && <p role="alert" className="p-4 rounded-xl bg-red-50 text-red-800">{submitError}</p>}
          <p className="text-center text-gray-500 font-medium mb-2">
            Your free quote is just a few clicks away!
          </p>
          <div className="rounded-2xl bg-[#FAF5E9] border border-[#C87A31]/20 p-4 mb-2">
            <p className="text-xs uppercase tracking-widest text-[#C87A31] font-semibold mb-2">
              Your Selection
            </p>

           <p className="text-sm md:text-base font-semibold text-[#111111] leading-relaxed">
            {projectType === "home" ? (
              <>
                {selectedSize} sft · {selectedBHK.toUpperCase()} ·{" "}
                {Object.values(selectedRooms).reduce((sum, qty) => sum + qty, 0)} Rooms ·{" "}
                {selectedPackage
                  ? selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
                  : ""}
              </>
            ) : (
              <>
                {officeArea} sft · {employeeCount} Employees ·{" "}
                {Object.keys(selectedOfficeSpaces).length} Space Types ·{" "}
                {officeScope} ·{" "}
                {selectedPackage
                  ? selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
                  : ""}
              </>
            )}
          </p>

          </div>
          {projectType === "office" && (
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold text-zinc-700 mb-2">
              Target Budget <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>

            <select
              value={targetBudget}
              onChange={(e) => setTargetBudget(e.target.value)}
              className="w-full px-4 py-3.5 bg-white text-zinc-800 rounded-xl border-2 border-black focus:border-[#C87A31] outline-none"
            >
              <option value="">Not decided yet</option>
              <option value="Under 10 Lakh">Under ৳10 Lakh</option>
              <option value="10-20 Lakh">৳10–20 Lakh</option>
              <option value="20-40 Lakh">৳20–40 Lakh</option>
              <option value="40-70 Lakh">৳40–70 Lakh</option>
              <option value="70 Lakh+">৳70 Lakh+</option>
            </select>
          </div>
        )}
          {[
            { name: "name", type: "text", placeholder: "Name" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "email", type: "email", placeholder: "E-mail" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col w-full">
              <input
                  aria-label={field.placeholder}
                  type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof Formtype]}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 bg-white text-zinc-800 rounded-xl  outline-primary/80 transition-all placeholder:text-zinc-400 font-medium text-sm sm:text-base border-2 ${
                  formError[field.name as keyof Formtype]
                    ? "border-red-500 bg-red-50/5 focus:bg-white"
                    : "border-black focus:border-primary/40"
                }`}
              />
              {formError[field.name as keyof Formtype] && (
                <span className="text-red-400 text-xs mt-1.5 ml-1 font-medium">
                  {formError[field.name as keyof Formtype]}
                </span>
              )}
            </div>
          ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-full bg-white border-2 border-[#111111]/10 hover:border-[#C87A31] text-[#111111] font-bold py-4 rounded-xl transition-all duration-300"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#111111] hover:bg-[#C87A31] text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md"
            >
              {submitting ? "Sending…" : "Get My Estimate →"}
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-2">
            By submitting this form, you agree to the Privacy Policy & Terms and
            conditions.
          </p>
        </form>
      </div>
    );
  };
  const getTargetBudgetRange = (budget: string) => {
  if (!budget) return null;

  if (budget === "Under 10 Lakh") {
    return { min: 0, max: 1000000 };
  }

  if (budget === "10-20 Lakh") {
    return { min: 1000000, max: 2000000 };
  }

  if (budget === "20-40 Lakh") {
    return { min: 2000000, max: 4000000 };
  }

  if (budget === "40-70 Lakh") {
    return { min: 4000000, max: 7000000 };
  }

  if (budget === "70 Lakh+") {
    return { min: 7000000, max: Infinity };
  }

  return null;
};


const renderOfficeResult = () => {
  const targetBudgetRange = getTargetBudgetRange(targetBudget);

let budgetComparisonMessage = "";

if (targetBudgetRange && officeEstimatedCost > 0) {
  if (officeEstimatedCost < targetBudgetRange.min) {
    budgetComparisonMessage =
      "Your preliminary estimate is below your target budget range.";
  } else if (officeEstimatedCost > targetBudgetRange.max) {
    budgetComparisonMessage =
      "Your preliminary estimate is above your target budget range. We can help adjust scope, materials or furniture to better align with your budget.";
  } else {
    budgetComparisonMessage =
      "Your preliminary estimate is within your target budget range.";
  }
}
  const packageName = selectedPackage
    ? selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
    : "Office Package";

  const spacesSummary = Object.entries(selectedOfficeSpaces)
    .map(([space, qty]) => `${space}${qty > 1 ? ` ×${qty}` : ""}`)
    .join(", ");

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C87A31] mb-2">
          Preliminary Office Estimate
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-[#111111]">
          {packageName}
        </h2>
        <div className="flex flex-wrap gap-2 mt-4 mb-4">


          <span className="inline-flex items-center rounded-full bg-[#FAF5E9] px-3 py-1.5 text-xs font-semibold text-[#111111]">
            Scope: {officeScope}
          </span>

        </div>
        <p className="text-sm text-zinc-500 mb-1">
          Scope-adjusted preliminary estimate
        </p>
        <p className="text-3xl md:text-4xl font-bold text-[#C87A31] mt-3">
          {officeEstimatedCost > 0
            ? `৳${officeEstimatedCost.toLocaleString("en-IN")}`
            : "Rate not configured yet"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#FAF5E9] rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Office Area
          </p>
          <p className="font-semibold text-[#111111]">
            {officeArea} sft
          </p>
        </div>

        <div className="bg-[#FAF5E9] rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Employees
          </p>
          <p className="font-semibold text-[#111111]">
            {employeeCount}
          </p>
        </div>

        <div className="bg-[#FAF5E9] rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Scope
          </p>
          <p className="font-semibold text-[#111111]">
            {officeScope}
          </p>
        </div>

        <div className="bg-[#FAF5E9] rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
            Target Budget
          </p>
          <p className="font-semibold text-[#111111]">
            {targetBudget || "Not decided yet"}
          </p>
        </div>
        {budgetComparisonMessage && (
          <div className="md:col-span-2 rounded-xl border border-[#C87A31]/20 bg-[#FFF8F0] p-4">
            <p className="text-sm font-semibold text-[#111111]">
              {budgetComparisonMessage}
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#FAF5E9] rounded-xl p-4 mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Selected Spaces
        </p>

        <p className="text-sm text-[#111111] leading-relaxed">
          {spacesSummary || "No spaces selected"}
        </p>
      </div>

      <div className="border-t border-zinc-200 pt-5">
        <p className="text-sm text-zinc-500 leading-relaxed">
          This is a preliminary planning estimate. Final quotation may vary
          based on final measurements, materials, furniture, MEP requirements,
          site conditions and approved scope of work.
        </p>
      </div>
    </div>
  );
};
  const renderStep5 = () => {
    return (
      <div className="overflow-y-auto flex flex-col gap-8 items-center justify-start max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] h-[60vh] min-h-125 border border-[#111111]/5 custom-scrollbar">
        {selectedPackage === "essential" ? (
          <div className="w-full space-y-6">
            {essentialpackageItems.length > 0 &&
              essentialpackageItems.map((packageTypes) => {
                return (
                  <div key={packageTypes.packagename} className="w-full">
                    {packageTypes.packagename === "essential" &&
                      packageTypes.packageitems.map((items) => {
                        const selectedItems = items.name in selectedRooms;
                        return (
                          <div key={items.name} className="w-full">
                            {selectedItems === true && (
                              <div className="bg-[#FAF5E9]/40 border border-[#111111]/10 rounded-2xl p-6 md:p-8 mb-6 transition-all hover:bg-[#FAF5E9]/80 hover:shadow-md">
                                {/* Room Header */}
                                <div className="border-b border-[#111111]/10 pb-4 mb-6">
                                  <h3 className="text-2xl md:text-3xl font-montagu font-bold text-[#111111] mb-1">
                                    {items.name}{" "}
                                    <span>
                                      <span>{`(${selectedRooms[items.name]})`}</span>
                                    </span>
                                  </h3>
                                  <p className="text-sm text-zinc-500 italic">
                                    &quot;{items.slogan}&quot;
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  {/* Furnitures Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2 inline-block">
                                      Furnitures
                                    </p>
                                    <ul className="space-y-2">
                                      {items.furniture?.map((item, id) => (
                                        <li
                                          key={id}
                                          className="flex items-start gap-2 text-sm text-zinc-700"
                                        >
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></span>
                                          <span className="leading-relaxed">
                                            {item}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Accessories Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-4 border-b border-[#111111]/20 pb-2 inline-block">
                                      Accessories
                                    </p>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                      {items.accessories?.join(", ")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        ) : selectedPackage === "premium" ? (
          <div className="w-full space-y-6">
            {premiumPackageItems.length > 0 &&
              premiumPackageItems.map((packageTypes) => {
                return (
                  <div key={packageTypes.packagename} className="w-full">
                    {packageTypes.packagename === "premium" &&
                      packageTypes.packageitems.map((items) => {
                        const selectedItems = items.name in selectedRooms;
                        return (
                          <div key={items.name} className="w-full">
                            {selectedItems === true && (
                              <div className="bg-[#FAF5E9]/40 border border-[#111111]/10 rounded-2xl p-6 md:p-8 mb-6 transition-all hover:bg-[#FAF5E9]/80 hover:shadow-md">
                                {/* Room Header */}
                                <div className="border-b border-[#111111]/10 pb-4 mb-6">
                                  <h3 className="text-2xl md:text-3xl font-montagu font-bold text-[#111111] mb-1">
                                    {items.name}{" "}
                                    <span>
                                      <span>{`(${selectedRooms[items.name]})`}</span>
                                    </span>
                                  </h3>
                                  <p className="text-sm text-zinc-500 italic">
                                    &quot;{items.slogan}&quot;
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  {/* Furnitures Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2 inline-block">
                                      Furnitures
                                    </p>
                                    <ul className="space-y-2">
                                      {items.furniture.map((item, id) => (
                                        <li
                                          key={id}
                                          className="flex items-start gap-2 text-sm text-zinc-700"
                                        >
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></span>
                                          <span className="leading-relaxed">
                                            {item}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Accessories Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-4 border-b border-[#111111]/20 pb-2 inline-block">
                                      Accessories
                                    </p>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                      {items.accessories?.join(", ")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        ) : selectedPackage === "luxury" ? (
          <div className="w-full space-y-6">
            {luxurypackageItems.length > 0 &&
              luxurypackageItems.map((packageTypes) => {
                return (
                  <div key={packageTypes.packagename} className="w-full">
                    {packageTypes.packagename === "luxury" &&
                      packageTypes.packageitems.map((items) => {
                        const selectedItems = items.name in selectedRooms;
                        return (
                          <div key={items.name} className="w-full">
                            {selectedItems === true && (
                              <div className="bg-[#FAF5E9]/40 border border-[#111111]/10 rounded-2xl p-6 md:p-8 mb-6 transition-all hover:bg-[#FAF5E9]/80 hover:shadow-md">
                                {/* Room Header */}
                                <div className="border-b border-[#111111]/10 pb-4 mb-6">
                                  <h3 className="text-2xl md:text-3xl font-montagu font-bold text-[#111111] mb-1">
                                    {items.name}{" "}
                                    <span>
                                      <span>{`(${selectedRooms[items.name]})`}</span>
                                    </span>
                                  </h3>
                                  <p className="text-sm text-zinc-500 italic">
                                    &quot;{items.slogan}&quot;
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  {/* Furnitures Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2 inline-block">
                                      Furnitures
                                    </p>
                                    <ul className="space-y-2">
                                      {items?.furniture.map((item, id) => (
                                        <li
                                          key={id}
                                          className="flex items-start gap-2 text-sm text-zinc-700"
                                        >
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></span>
                                          <span className="leading-relaxed">
                                            {item}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Accessories Section */}
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-4 border-b border-[#111111]/20 pb-2 inline-block">
                                      Accessories
                                    </p>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                      {items.accessories?.join(", ")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 text-center my-8">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Badge */}
              <span className="px-4 py-1.5 bg-[#FAF5E9] text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/10 inline-block">
                Tailored For You
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-montagu font-bold text-[#111111]">
                Custom Design Package
              </h2>

              {/* Description */}
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                This package is crafted completely from scratch based on your
                budget, specific requirements, and unique aesthetic choices.
                Tell us what you need, and our experts will tailor the ideal
                solution to transform your space.
              </p>

              {/* Divider */}
              <div className="h-px w-16 bg-[#c35e00]/30 mx-auto my-6" />

              {/* Slogan / Note */}
              <p className="text-base font-medium text-[#111111] italic font-serif">
                &quot;Depends entirely on your requirements and budget range.&quot;
              </p>
            </div>
          </div>
        )}
        {/* Global CSS for Custom Scrollbar */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c35e00;
          border-radius: 10px;
        }
      `,
          }}
        />
      </div>
    );
  };

  let essentialTotalPrice = 0;

  if (
    essentialpackageItems &&
    essentialpackageItems.length > 0 &&
    essentialpackageItems[0].packageitems
  ) {
    essentialTotalPrice = essentialpackageItems[0].packageitems.reduce(
      (total, currentItem) => {
        const quantity = selectedRooms[currentItem.name] || 0;

        const itemTotalPrice = Number(currentItem.price || 0) * quantity;

        return total + itemTotalPrice;
      },
      0,
    );
  }

  let premiumTotalPrice = 0;
  if (
    premiumPackageItems &&
    premiumPackageItems.length > 0 &&
    premiumPackageItems[0].packageitems
  ) {
    premiumTotalPrice = premiumPackageItems[0].packageitems.reduce(
      (total, currentItem) => {
        const quantity = selectedRooms[currentItem.name] || 0;
        const itemTotalPrice = Number(currentItem.price || 0) * quantity;
        return total + itemTotalPrice;
      },
      0,
    );
  }

  let luxuryTotalPrice = 0;
  if (
    luxurypackageItems &&
    luxurypackageItems.length > 0 &&
    luxurypackageItems[0].packageitems
  ) {
    luxuryTotalPrice = luxurypackageItems[0].packageitems.reduce(
      (total, currentItem) => {
        const quantity = selectedRooms[currentItem.name] || 0;
        const itemTotalPrice = Number(currentItem.price || 0) * quantity;
        return total + itemTotalPrice;
      },
      0,
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-zinc-300 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-primary font-medium animate-pulse">
          Loading Calculator...
        </p>
      </div>
    );
  }

   if (isError) {
    return (
      <div className="min-h-screen bg-[#F0F4EC] flex items-center justify-center font-sans">
        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl max-w-md text-center shadow-sm">
          <p className="text-red-500 font-medium">
            Failed to load calculator: {error?.message}
          </p>
        </div>
      </div>
    );
  }
if (!projectType) {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#FFFFF0] to-[#EFEADA] px-4 py-12">
      {renderProjectTypeSelector()}
    </div>
  );
}
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-ivory font-poppins">
      <div className="relative w-full h-auto min-h-150 max-w-6xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#111111]/10 flex flex-col">
        {/* Error Modal */}
        {errorModal && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md ">
            <div className="flex items-center gap-3 px-6 py-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg">
              <span className="text-red-500 text-xl"></span>
              <p className="text-red-700 font-medium text-sm">{errorMsg}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white border-b border-zinc-200">
          <span className="font-semibold text-zinc-800">{projectType === "home" ? "Home Interior" : "Office Interior"}</span>
          <button type="button" disabled={submitting} onClick={() => { resetCalculator(); setProjectType(""); }} className="text-sm font-semibold text-[#a34e00] underline underline-offset-4 rounded focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50">
            Start over / Change project type
          </button>
        </div>
        {/* Dynamic Header Section */}
        <div className="text-center py-10 relative overflow-hidden flex flex-col justify-center min-h-[180px] bg-[#111111]">
          {currentStep === 1 && (
            <>
              <Image
                src={slideOne}
                alt="Background"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-black/70 z-0" />
            </>
          )}

          <div className="relative z-10 px-4 w-full border ">
            <p className="text-[#C87A31] font-semibold text-sm md:text-base mb-3 tracking-widest uppercase">
              Step: {currentStep}/4
            </p>

          {currentStep === 1 && (
              <h2 className="text-[#FFFFF0] text-2xl md:text-4xl font-bold tracking-wide">
                Tell Us About Your{" "}
                <span className="text-[#C87A31]">
                  {projectType === "office" ? "Office" : "Home"}
                </span>
              </h2>
            )}
            {currentStep === 2 && (
              <h2 className="text-[#FFFFF0] text-2xl md:text-4xl font-bold tracking-wide">
                Pick The <span className="text-[#C87A31]">Package</span> That
                Suits You Best
              </h2>
            )}
            {currentStep === 3 && (
              <h2 className="text-[#FFFFF0] text-2xl md:text-3xl font-bold tracking-wide">
                <span className="text-white">We are excited</span> to be part of
                your Dream interior Journey!
              </h2>
            )}
           {currentStep === 4 && (
                <div className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mt-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <p className="text-sm font-medium text-zinc-500 mb-1">
                        {projectType === "office"
                          ? "Your Office Estimate Is Ready"
                          : "Your Estimate Is Ready"}
                      </p>

                      <h2 className="text-2xl font-semibold text-zinc-800 mb-2 capitalize">
                        {selectedPackage} Package
                      </h2>

                      <p className="text-3xl font-bold text-primary">
                        {projectType === "office"
                          ? officeEstimatedCost > 0
                            ? `৳${officeEstimatedCost.toLocaleString("en-IN")}`
                            : "Rate not configured yet"
                          : selectedPackage === "essential"
                            ? `${essentialTotalPrice.toLocaleString("en-IN")} Tk`
                            : selectedPackage === "premium"
                              ? `${premiumTotalPrice.toLocaleString("en-IN")} Tk`
                              : selectedPackage === "luxury"
                                ? `${luxuryTotalPrice.toLocaleString("en-IN")} Tk`
                                : "Depends on Your requirement"}
                      </p>

                      <p className="text-sm text-zinc-500 mt-2">
                        {projectType === "office"
                          ? "Preliminary office interior planning estimate"
                          : "Preliminary estimate based on your selected rooms and package. Final quotation may vary based on measurements, materials, design details and site conditions."}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                      <a
                        href="tel:01618995918"
                        className="px-6 py-2.5 bg-primary hover:bg-[#a34e00] text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto text-center"
                      >
                        Call Now
                      </a>

                      <button

                        onClick={resetCalculator}
                        className="px-6 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto"
                      >
                        Calculate Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Dynamic Body Section */}
        <div className="bg-linear-to-b from-[#FFFFF0] to-[#EFEADA] p-6 md:p-12 grow">

          {currentStep === 1 &&
          (projectType === "home" ? renderHomeStep1() : renderOfficeStep1())}
         {currentStep === 2 &&
          (projectType === "home"
            ? renderStep3()
            : renderOfficePackageStep())}
          {currentStep === 3 && renderStep4()}
          {currentStep === 4 &&
      (projectType === "home" ? renderStep5() : renderOfficeResult())}
        </div>

        {/* Footer Buttons Section */}
        {currentStep < 3 && (
          <div className="bg-[#FFFFF0] p-6 flex justify-center gap-4 border-t border-[#111111]/5">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="px-8 py-3.5 rounded-full font-semibold border-2 border-[#111111] text-[#111111] hover:bg-gray-100 transition-all"
              >
                ← Prev
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C87A31] text-white font-semibold py-3.5 px-14 rounded-full transition-all duration-300 shadow-xl"
            >
              <span>Next</span>
              <FiChevronDown className="-rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;
