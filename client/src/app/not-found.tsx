import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="mb-3 text-4xl font-bold">404</h1>
      <p className="mb-6 text-lg text-gray-500">Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c69a3f] px-6 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:bg-[#e3c885]"
      >
        Back to Home
      </Link>
    </section>
  );
}
