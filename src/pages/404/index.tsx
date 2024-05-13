import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <main className="mt-8 flex items-center justify-center">
      <div className="bg-opacitycolor w-[370px] border md:w-[580px]">
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-normal-font-color text-center text-[32px] font-bold">
              Oops...Can't Find The Page
            </h1>
            <p className="text-center text-sm tracking-widest">
              It's not your fault, it's us. The page you go is not available{" "}
              {""}
              <br className="hidden md:block" />
              or got erased by the server.
            </p>
          </div>
        </div>
        <button
          className="border-normal-font-color text-normal-font-color bg-ord-gradient flex h-[64px] w-full items-center justify-center border-t text-lg font-bold"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
