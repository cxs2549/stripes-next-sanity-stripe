/* eslint-disable @next/next/no-img-element */
import React from "react"

const Hero = () => {
  return (
    <section className="relative">
      <img src="/hero/hero-md.png" alt="" className="w-full sm:hidden" />
      <img src="/hero/hero.png" alt="" className="w-full hidden sm:block lg:hidden" />
      <img src="/hero/hero-lg.png" alt="" className="w-full hidden lg:block" />
      <div className="max-w-7xl mx-auto absolute bottom-4 lg:bottom-8 xl:bottom-40 left-4 right-4 flex flex-col gap-2 md:gap-4 xl:left-0 xl:right-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase xl:text-6xl sm:max-w-xs xl:max-w-xl">
          Give the best with boost
        </h2>
        <p className=" md:text-lg sm:max-w-xs xl:max-w-lg">
          Gift the unmatched comfort of best-selling Boost shoes.
        </p>
        <div className="flex flex-col gap-2 justify-start items-start">
          <button className="button-50">
            <span>shop men</span>{" "}
            <span className="text-3xl -translate-y-0.5">&rarr;</span>
          </button>
          <button className="button-50">
            shop women <span className="text-3xl -translate-y-0.5">&rarr;</span>
          </button>
          <button className="button-50">
            shop kids <span className="text-3xl -translate-y-0.5 font-bold">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
