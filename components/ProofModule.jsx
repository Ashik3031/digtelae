"use client";
export default function ProofModule() {
  return (
    <section className="bg-white border-t border-gray-200 flex items-center justify-center min-h-[60vh] py-24">
      <div className="text-center space-y-6">
        <h3 className="text-3xl md:text-5xl font-semibold">LIVE by Huge</h3>
        <p className="max-w-xl mx-auto text-lg opacity-80">
          Our proprietary platform that powers intelligent experiences for the
          world’s leading brands.
        </p>
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          {["logo1.svg", "logo2.svg", "logo3.svg"].map((src) => (
            <img key={src} src={`/logos/${src}`} alt="" className="h-10" />
          ))}
        </div>
      </div>
    </section>
  );
}
