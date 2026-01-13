import React from 'react'

const PricingPlans = () => {
  return (
    <>
    <div className='px-[8%] lg:px-[12%] py-20 mt-0 md:mt-[17%]'>
  <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 title pt-8">
            <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700">
           our pricing plans
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2
              id="about-heading"
              className="text-4xl md:text-6xl font-semibold leading-tight text-black"
            >
            Desing your
              <span className="text-[var(--prim)]">space, Know</span>{" "}
             services
            </h2>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 h-full mt-5 ">
          <div className="w-full lg:w-1/2 ">
          <div className="pricing-wrap h-full rounded-2xl p-5 pt-20">
               <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-semibold leading-tight text-white"
            >
           Your dreams,
              <span className="text-[var(--prim)]">our mission, let's</span>{" "}
             make it happen.
            </h2>
          </div>
          </div>
              <div className="w-full lg:w-1/1 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5"></div>
              </div>
        </div>
    </div>
    </>
  )
}

export default PricingPlans