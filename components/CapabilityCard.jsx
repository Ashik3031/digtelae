"use client";
import Image from "next/image";

export default function CapabilityCard({
  id,
  title,
  number,
  imgSrc,
  imgAlt,
  copy,
}) {
  return (
    <section
      id={id}
      className="card bg-white min-h-screen flex flex-col items-center justify-center py-24"
    >
      <div className="max-w-6xl w-full px-4 grid gap-10 text-center">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={1600}
          height={900}
          className="mx-auto object-contain select-none will-change-transform"
          priority={false}
          loading="lazy"
        />
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          {copy}
        </p>
      </div>
    </section>
  );
}
