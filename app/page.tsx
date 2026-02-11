import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center font-sans">
      <Image
        src="/landingpage1.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/10" aria-hidden />
      <main className="relative z-10 flex w-full max-w-xl items-center justify-center px-6 py-24">
        <div className="w-full rounded-2xl bg-white/5 px-8 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-14">
          <Image
            src="/car_logo.png"
            alt="BidaWash"
            width={800}
            height={400}
            className="mx-auto h-auto w-[28rem] sm:w-[36rem]"
          />
          <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)]">
            Faster. Cleaner. Better.
          </p>
          <p className="mt-6 max-w-md mx-auto text-lg font-medium leading-8 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)]">
            An automated car wash experience built for the modern Filipino driver.
          </p>
          <p className="mt-4 text-base font-semibold uppercase tracking-wider text-zinc-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)]">
            Coming Soon to Manila at Select Locations.
          </p>
          <a
            href="#"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Get Notified
          </a>
        </div>
      </main>
    </div>
  );
}
