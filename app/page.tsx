import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3 className="text-center">Prueba Técnica Stiven</h3>
        <p className="text-center sm:text-left">Home Page</p>
        <Link href="/pages/listado" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Página de publicaciones
        </Link>
      </main>
    </div>
  );
}
