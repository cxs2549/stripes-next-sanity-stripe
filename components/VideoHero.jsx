import React from "react"

const VideoHero = () => {
  return (
    <div className="relative">
      <video
        src="/hero/hero-vid.mp4"
        
        
        
        className="md:hidden"
      ></video>
      <video
        src="/hero/hero-vid-sm.mp4"
       
        className="hidden md:block lg:hidden"
      ></video>
      <video
        src="/hero/hero-vid-lg.mp4"
       
        className="hidden lg:block xl:hidden"
      ></video>
      <video
        src="/hero/hero-vid-xl.mp4"
       
        className="hidden xl:block"
      ></video>
      <div className="max-w-7xl mx-auto  relative">
        <div className="absolute bottom-16 lg:bottom-4 xl:bottom-20 left-4 flex flex-col gap-4 xl:left-0 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase xl:text-6xl sm:max-w-xs xl:max-w-xl">
            Last chance to save
          </h2>
          <p>
            Ends today—enjoy $60 off orders of $175 or more with code SAVINGS.
          </p>
          <button className="button-51 max-w-fit">
            shop now{" "}
            <span className="text-3xl -translate-y-0.5 font-bold">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoHero
