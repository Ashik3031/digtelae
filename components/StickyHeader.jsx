"use client";
export default function StickyHeader() {
  return (
    <div className="wwd-sticky absolute top-0 left-0 w-full h-screen flex items-center pointer-events-none bg-white z-10">
      <h2 className="pl-4 md:pl-16 text-[clamp(3rem,8vw,8rem)] font-black leading-none text-left">
        <span data-headline>AI transformation</span>
        <sup
          data-number
          className="text-gray-400 ml-2 align-super text-[0.4em]"
        >
          01
        </sup>
      </h2>
    </div>
  );
}
