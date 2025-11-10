import { ChevronsRight } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <section className="relative -mt-20 sm:-mt-10 bg-[url('/Team/team.png')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
        <div className='absolute inset-0 bg-[#161D39]/80'></div>
        <div className='relative z-10 text-center text-white px-4'>
          <h1 className='text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg'>
            404
          </h1>
          <p className='text-lg font-light text-gray-200'>
            Home <ChevronsRight className='inline-block w-4 h-4 text-primary' />{" "}
            <span>404 - Not Found</span>
          </p>
        </div>
      </section>
      <section className='my-20 flex items-center justify-center'>
        <div>
          <Image src='/404.png' alt='404' width={500} height={500} />
          <div className='mt-6 text-center'>
            <h2 className='text-2xl font-bold'>Oops! Page Not Found</h2>
            <div className='flex items-center justify-center'>
              <button className='mt-2 bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-3 text-sm rounded-full font-semibold transition-colors duration-200'>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
