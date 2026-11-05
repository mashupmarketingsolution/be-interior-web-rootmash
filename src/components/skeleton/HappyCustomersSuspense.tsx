"use client"
import { LocalizedText } from "@/components/Language";
import React from "react";
const roomsAccessoryTypes = [
  {
    packageType: "essential",
    packageItems: [
      {
        room: "Master Bedroom",
        furniture: {
          slogan: "Dream in style with our personalized bedroom essentials",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Pelmet",
            "Wall-paper (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish (matte)",
          "White ceiling (basic designs)",
          "Wall Paper",
          "T5 light",
          "standard mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Child Bedroom",
        furniture: {
          slogan:
            "Where imagination meets functionality: Kid-friendly furniture they will love!",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Unit",
            "Pelmet",
            "Wall-paper (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish (matte)",
          "White ceiling (basic designs)",
          "Wall Paper",
          "T5 light",
          "standard mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Guest Bedroom",
        furniture: {
          slogan: "Stylish and functional: Your guests deserve the best",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Unit",
            "Pelmet",
          ],
        },
        accessories: [
          "Board with HPL laminate finish (matte)",
          "White ceiling (basic designs)",
          "T5 light",
          "standard mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Drawing Room",
        furniture: {
          slogan: "The heart of your home, beautifully furnished",
          items: [
            "Book Shelves",
            "Decorative Shelves",
            "False Ceiling",
            "TV Unit with Back Panel",
            "Pelmet",
            "Shoe Rack",
            "Wall paper/ Skim/Texture Paint (single wall)",
            "Decor, Art-work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish (matte)",
          "White ceiling (basic designs)",
          "T5 light",
          "metal Channel",
          "Wall Paper",
          "SS soft-close hinges",
          "SS drawer channel",
        ],
      },
      {
        room: "Family Living",
        furniture: {
          slogan:
            "Cozy, functional, and stylish: Furniture for unforgettable family moments",
          items: [
            "Book Shelves",
            "False Ceiling",
            "Wall Panel",
            "Pelmet",
            "Wall paper/ Skim/Texture Paint (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish (Matte)",
          "White ceiling (basic designs)",
          "White board paneling",
          "Wall Paper",
          "T5 light",
          "SS soft-close hinges",
          "standard hardware",
        ],
      },
      {
        room: "Dining Room",
        furniture: {
          slogan: "Dine in luxury: Furniture that complements every meal",
          items: [
            "Dining wagon",
            "False Ceiling",
            "Dining Basin",
            "Basin Cabinet With paneling",
            "Pelmet",
            "Fridge Cabinet",
            "Skim/Texture Paint (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish (Matte)",
          "White ceiling (basic designs)",
          "textured Paint",
          "Glass Door & Shelves",
          "Marble top",
          "T5 light",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Kitchen",
        furniture: {
          slogan:
            "Smart designs, smarter kitchens: Organize your culinary haven",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
          ],
        },
        accessories: [
          "HPL Laminate finish (glossy)",
          "PVC board",
          "Glass Door & Shelves",
          "profile handle",
          "profile edging",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Open Kitchen",
        furniture: {
          slogan: "Style meets function: Furniture for seamless open kitchens",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
            "Breakfast Table",
          ],
        },
        accessories: [
          "HPL Laminate finish (glossy)",
          "White ceiling (basic designs)",
          "Marble top",
          "Glass Shelves",
          "profile handle",
          "profile edging",
          "SS soft-close hinges",
          "SS drawer channel",
          "standard hardware",
        ],
      },
      {
        room: "Toilet",
        furniture: {
          slogan: "Start and end your day in a perfectly furnished retreat",
          items: ["Shower Encloser", "Basin Cabinet", "Mirror (Basic)"],
        },
        accessories: [
          "HPL Laminate finish (Matte)",
          "PVC Board",
          "10mm glass",
          "standard quality accessories",
          "SS soft-close hinges",
          "Sliding /hinged door (tempered)",
          "Mirror",
          "standard hardware",
        ],
      },
      {
        room: "Prayer Space",
        furniture: {
          slogan: "Serenity starts here: Furniture for your sacred space",
          items: [
            "Wall Panel",
            "False Ceiling",
            "Low Height cabinet",
            "Wall-paper (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish (Matte)",
          "White ceiling (basic designs)",
          "White board paneling",
          "T5 light",
          "Wall Paper",
          "SS soft-close hinges",
          "standard hardware",
        ],
      },
    ],
  },
  {
    packageType: "premium",
    packageItems: [
      {
        room: "Master Bedroom",
        furniture: {
          slogan:
            "Your sanctuary, redefined: Elegant furniture for the ultimate retreat",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Bed Back",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Polish)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Design ceiling",
          "Wall Paper",
          "T5 light",
          "Spot light",
          "metal Channel",
          "mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Child Bedroom",
        furniture: {
          slogan: "Crafting spaces for dreams to grow and memories to flourish",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Bed Back",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Polish)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Design ceiling",
          "Wall Paper",
          "T5 light",
          "Spot light",
          "metal Channel",
          "mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Guest Bedroom",
        furniture: {
          slogan:
            "Welcoming comfort: Furniture that makes every guest feel at home",
          items: [
            "Dress Cabinet",
            "False Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Polish)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Design ceiling",
          "Wall Paper",
          "T5 light",
          "Spot light",
          "mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Drawing Room",
        furniture: {
          slogan:
            "Showcase your style with a drawing room that speaks elegance",
          items: [
            "Book Shelves",
            "Decorative Shelves",
            "False Ceiling",
            "Decorative Ceiling",
            "TV Unit with Back Panel",
            "Wall Panel",
            "Pelmet",
            "Shoe Rack",
            "Wall paper/ Skim/Texture Paint (single wall)",
            "Existing Door Color (Polish)",
            "Decor, Art-work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Design ceiling",
          "T5 light",
          "Spot light",
          "metal Channel",
          "Glass Shelves",
          "Wall Paper",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Family Living",
        furniture: {
          slogan: "Gather, relax, and enjoy in a living room tailored for you",
          items: [
            "Book Shelves",
            "Decorative Shelves",
            "False Ceiling",
            "TV Unit with Back Panel",
            "Wall Panel",
            "Pelmet",
            "Wall paper/ Skim/Texture Paint (single wall)",
            "Existing Door Color (Polish)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Design ceiling",
          "White board paneling",
          "Wall Paper",
          "Glass Shelves",
          "T5 light",
          "Spot light",
          "SS soft-close hinges",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Dining Room",
        furniture: {
          slogan:
            "Set the table for style and comfort with our dining solutions",
          items: [
            "Dining wagon",
            "Decorative Ceiling",
            "False Ceiling",
            "Dining Basin",
            "Basin Cabinet With paneling",
            "Pelmet",
            "Fridge Cabinet",
            "Skim/Texture Paint (single wall)",
            "Existing Door Color (Polish)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Design ceiling",
          "White board paneling",
          "textured Paint",
          "Glass Door & Shelves",
          "T5 light",
          "Spot light",
          "Marble top",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Kitchen",
        furniture: {
          slogan:
            "Cook, store, and impress with furniture built for modern kitchens",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
            "Modifying Door",
            "Existing Door Color (Polish)",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "PVC board",
          "Glass Door & Shelves",
          "Profile glass",
          "profile handle",
          "profile edging",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Open Kitchen",
        furniture: {
          slogan: "Where culinary art meets aesthetic design",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
            "Breakfast Table",
            "False Ceiling",
            "Indoor Green",
            "Feature light (Basic)",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Design ceiling",
          "Marble top",
          "Glass Shelves",
          "Profile glass",
          "profile handle",
          "profile edging",
          "T5 light",
          "Spot light",
          "SS soft-close hinges",
          "SS drawer channel",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Toilet",
        furniture: {
          slogan:
            "Luxury meets utility: Furniture that transforms your bathroom space",
          items: [
            "Shower Encloser",
            "Basin Cabinet",
            "Mirror",
            "Basin (Basic)",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "PVC Board",
          "T5 light",
          "Spot light",
          "10mm glass",
          "standard quality accessories",
          "SS soft-close hinges",
          "Sliding /hinged door (tempered)",
          "Mirror",
          "Heigh Quality hardware",
        ],
      },
      {
        room: "Prayer Space",
        furniture: {
          slogan: "Create a corner of calm with furniture that inspires peace",
          items: [
            "Wall Panel",
            "False Ceiling",
            "Low Height Cabinet",
            "Wall-paper (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Design ceiling",
          "Islamic theme paneling",
          "Wall Paper",
          "Glass Shelves",
          "SS soft-close hinges",
          "Heigh Quality hardware",
        ],
      },
    ],
  },
  {
    packageType: "luxury",
    packageItems: [
      {
        room: "Master Bedroom",
        furniture: {
          slogan: "Transform your sleep space into a luxurious escape",
          items: [
            "Door Cabinetry & Shelves",
            "False Ceiling",
            "Decorative Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Bed Back",
            "Wall Panel",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Lacquer)",
            "Decor, Art-work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Luxury ceiling",
          "",
          "T5 light",
          "Spot light",
          "Profile light",
          "metal Channel",
          "mirror",
          "Artificial Leather",
          "Heigh Quality Foam",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
          "moisture-resistant",
        ],
      },
      {
        room: "Child Bedroom",
        furniture: {
          slogan:
            "Furniture designed to spark creativity and joy for your little ones",
          items: [
            "Door Cabinetry & Shelves",
            "False Ceiling",
            "Decorative Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Bed Back",
            "Wall Panel",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Lacquer)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Luxury ceiling",
          "Wall Paper",
          "T5 light",
          "Spot light",
          "Profile light",
          "metal Channel",
          "mirror",
          "Artificial Leather",
          "Heigh Quality Foam",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
          "moisture-resistant",
        ],
      },
      {
        room: "Guest Bedroom",
        furniture: {
          slogan: "Create a lasting impression with our guest-ready designs",
          items: [
            "Door Cabinetry & Shelves",
            "False Ceiling",
            "Decorative Ceiling",
            "Study Unit",
            "Bed",
            "Bed Side Table",
            "Dressing Table",
            "Bed Back",
            "Pelmet",
            "Wall-paper (single wall)",
            "Existing Door Color (Lacquer)",
            "Indoor Green",
          ],
        },
        accessories: [
          "Board with HPL laminate finish",
          "Luxury ceiling",
          "Wall Paper",
          "T5 light",
          "Spot light",
          "Profile light",
          "metal Channel",
          "mirror",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
          "moisture-resistant",
        ],
      },
      {
        room: "Drawing Room",
        furniture: {
          slogan:
            "Set the stage for unforgettable gatherings with exquisite designs",
          items: [
            "Book Shelves",
            "Decorative Shelves",
            "False Ceiling",
            "Decorative Ceiling",
            "TV Unit with Back Panel",
            "Wall Panel",
            "Pelmet",
            "Shoe Rack",
            "Wall-paper (single wall)",
            "Existing Door Color (Lacquer)",
            "Decor, Art-work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Luxury ceiling",
          "Design paneling",
          "Wall Paper",
          "Glass Shelves",
          "T5 light",
          "Spot light",
          "Profile light",
          "metal Channel",
          "mirror sheet",
          "SS soft-close hinges",
          "Branded hardware",
        ],
      },
      {
        room: "Family Living",
        furniture: {
          slogan:
            "Turn your family space into the perfect hub of comfort and style",
          items: [
            "Book Shelves",
            "Decorative Shelves",
            "False Ceiling",
            "TV Unit with Back Panel",
            "Wall Panel",
            "Pelmet",
            "Divan",
            "Wall paper/ Skim/Texture Paint (single wall)",
            "Existing Door Color (Lacquer)",
            "Decor, Art work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Luxury ceiling",
          "Design paneling",
          "Wall Paper",
          "Glass Shelves",
          "T5 light",
          "Spot light",
          "Profile light",
          "Artificial Leather",
          "Heigh Quality Foam",
          "SS soft-close hinges",
          "Branded hardware",
        ],
      },
      {
        room: "Dining Room",
        furniture: {
          slogan: "Because great conversations deserve great spaces",
          items: [
            "Dining wagon",
            "Consul Table",
            "Decorative Ceiling",
            "False Ceiling",
            "Dining Basin",
            "Basin Cabinet With paneling",
            "Pelmet",
            "Fridge Cabinet",
            "Skim/Texture Paint (single wall)",
            "Existing Door Color (Lacquer)",
            "Decor, Art-work & Painting",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Luxury ceiling",
          "Design paneling",
          "textured Paint",
          "Profile Glass",
          "T5 light",
          "Spot light",
          "Profile light",
          "Marble top",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
        ],
      },
      {
        room: "Kitchen",
        furniture: {
          slogan: "Innovative kitchen solutions to match your lifestyle",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
            "Modifying Door",
            "Fridge Cabinet",
            "Existing Door Color (Lacquer)",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "PVC board",
          "Glass Door & Shelves",
          "Profile glass",
          "profile handle",
          "profile edging",
          "T5 light",
          "Profile light",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
        ],
      },
      {
        room: "Open Kitchen",
        furniture: {
          slogan:
            "Expand your kitchens charm with thoughtfully crafted furniture",
          items: [
            "Kitchen Upper Cabinet",
            "Kitchen Middle Cabinet",
            "Kitchen Lower Cabinet",
            "Breakfast Table",
            "False Ceiling",
            "Indoor Green",
            "Feature light",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Luxury ceiling",
          "sunstone top",
          "Glass Shelves",
          "Profile glass",
          "profile handle",
          "profile edging",
          "T5 light",
          "Spot light",
          "Profile light",
          "SS soft-close hinges",
          "SS drawer channel",
          "Branded hardware",
        ],
      },
      {
        room: "Toilet",
        furniture: {
          slogan: "Elegant storage solutions for a clutter-free washroom",
          items: ["Shower Encloser", "Basin Cabinet", "Mirror", "Basin"],
        },
        accessories: [
          "HPL Laminate finish",
          "PVC Board",
          "10mm glass",
          "Heigh quality accessories",
          "SS soft-close hinges",
          "Sliding /hinged door (tempered)",
          "Mirror",
          "basin (premium)",
        ],
      },
      {
        room: "Prayer Space",
        furniture: {
          slogan: "Crafted for your moments of devotion and reflection",
          items: [
            "Wall Panel",
            "False Ceiling",
            "Low Height Cabinet",
            "Decorative Ceiling",
            "Wall-paper (single wall)",
            "Indoor Green",
          ],
        },
        accessories: [
          "HPL Laminate finish",
          "Luxury ceiling",
          "Islamic theme paneling",
          "Wall Paper",
          "Glass Shelves",
          "T5 light",
          "Spot light",
          "Profile light",
          "SS soft-close hinges",
          "Branded hardware",
        ],
      },
    ],
  },
];
const HappyCustomersSuspense = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-16 px-4 p-10 bg-ivory animate-pulse">
   
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-[#111111] tracking-wide font-bold ">
        <LocalizedText>{"Trusted by visionaries"}</LocalizedText></h2>

    
      <div className="w-full max-w-7xl mt-8">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-[20px] lg:gap-[30px] mt-10 h-100 w-full">
          
          
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
            
          </div>

          
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden md:flex">
           
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
            
          </div>

        
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden lg:flex">
           
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default HappyCustomersSuspense;