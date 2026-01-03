import Image from "next/image";
import service1 from "@/public/service-1.jpg";
import service2 from "@/public/service-2.jpg";
import service3 from "@/public/service-3.jpg";
import service4 from "@/public/service-4.jpg";
import service5 from "@/public/service-5.jpg";
import service6 from "@/public/service-6.jpg";

const Services = () => {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] pt-20 pb-60 service relative  ">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 title pt-8">
            <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700">
              Our Services
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2
              id="about-heading"
              className="text-4xl md:text-7xl font-semibold leading-tight text-black"
            >
              Explore our{" "}
              <span className="text-[var(--prim)]">
                comprehensive interior design
              </span>{" "}
              services
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
