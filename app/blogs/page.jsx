"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAlarm } from "react-icons/io";

const page = () => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await fetch("/api/blog/all", {
        method: "GET",
      });
      const data = await res.json();
      setFormData(data.blogs);
    };
    getAllBlogs();
  }, []);
  return (
    <section className='mx-4 my-10 sm:mx-8'>
      <h2 className='mt-5 text-center text-3xl font-bold'>Blog Section</h2>
      <div className='mt-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {formData.map((blog, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:-translate-y-3 hover:scale-95 dark:border dark:border-gray-700 bg-white dark:bg-gray-800'
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div>
                  <img
                    src={blog.image}
                    alt='blog-image'
                    width={500}
                    height={300}
                    className='size-full'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-bold hover:text-red-600 hover:underline'>
                    {blog.title}
                  </h3>
                  <div className='mt-2 flex items-center justify-between'>
                    <div className='hidden md:block'>
                      <span className='text-sm'>{blog.blogWriter}</span>
                    </div>
                    <div>
                      <span className='flex items-center gap-2 text-sm'>
                        <IoMdAlarm fontSize={18} />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
