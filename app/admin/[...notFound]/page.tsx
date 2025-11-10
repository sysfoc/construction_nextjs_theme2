import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <section className='py-10 bg-background flex items-center justify-center'>
        <div>
          <Image src='/404.png' alt='404' width={400} height={400} />
          <div className='mt-6 text-center'>
            <h2 className='text-2xl font-bold'>Oops! Admin Page Not Found</h2>
          </div>
        </div>
      </section>
    </>
  );
}
