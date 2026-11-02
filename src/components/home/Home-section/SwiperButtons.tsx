import { CmsSection } from "@/components/cms/Editable";
import { useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SwiperButtons() {
  const swiper = useSwiper();

  return (
    <CmsSection section="section-3bab070b0012"><div className="absolute inset-0 flex items-center justify-between px-4 z-10 pointer-events-none">
      <button
        onClick={() => swiper.slidePrev()}
        className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-[#e46e00] transition duration-300"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-[#e46e00] transition duration-300"
      >
        <ChevronRight size={24} />
      </button>
    </div></CmsSection>
  );
}
