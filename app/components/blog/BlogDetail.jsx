"use client";
import {
  Alert,
  Avatar,
  Button,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoMdAlarm } from "react-icons/io";

const BlogDetail = ({ blog }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    slug: params.slug,
    fname: "",
    lname: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/blog/comment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setFormData({
          slug: params.slug,
          fname: "",
          lname: "",
          email: "",
          comment: "",
        });
        window.location.reload();
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <section className='mx-4 my-5 sm:mx-16'>
      <div className='grid grid-cols-1 items-center gap-x-10 gap-y-5 py-5 md:grid-cols-2'>
        <div className='overflow-hidden rounded-lg'>
          <img
            src={blog.image || "/banner.webp"}
            alt={`${blog.title}-img`}
            width={500}
            height={300}
            className='size-full'
          />
        </div>
        <div>
          <div className='flex flex-row items-center gap-3'>
            <Button className='bg-red-600 hover:!bg-red-700' size='sm'>
              Construction
            </Button>
            <div className='flex items-center gap-2'>
              <IoMdAlarm fontSize={18} />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <h1 className='mt-3 text-2xl font-bold sm:mt-5 sm:text-4xl'>
            {blog.title}
          </h1>
          <div className='mt-5 flex items-center gap-10'>
            <div className='flex items-center gap-3'>
              <Avatar size={"sm"} rounded />
              <span>{blog.blogWriter}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 w-full md:w-3/4'>
        <div
          className='dynamic-content prose dark:prose-invert flex flex-col gap-y-3'
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className='bg-white dark:bg-gray-800 p-5 mt-8'>
          <h2 className='text-2xl font-bold'>Comments</h2>
          <div>
            <form onSubmit={handleFormData}>
              {error && (
                <Alert color='failure'>
                  <span>
                    <span className='font-medium'>Error! </span>
                    {errorMessage}
                  </span>
                </Alert>
              )}
              <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='flex flex-col'>
                  <Label htmlFor='fname'>First Name:</Label>
                  <TextInput
                    type='text'
                    id='fname'
                    placeholder='First Name'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col'>
                  <Label htmlFor='lname'>Last Name:</Label>
                  <TextInput
                    type='text'
                    id='lname'
                    placeholder='Last Name'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-2 flex flex-col'>
                  <Label htmlFor='email'>Email:</Label>
                  <TextInput
                    type='email'
                    id='email'
                    placeholder='Email Address'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-2 flex flex-col'>
                  <Label htmlFor='comment'>Add Comment:</Label>
                  <Textarea
                    rows={10}
                    id='comment'
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Button
                  type='submit'
                  disabled={loading}
                  size={"md"}
                  className=' mt-5 bg-red-600 hover:!bg-red-700'
                >
                  Add Comment
                </Button>
              </div>
            </form>
          </div>
          <div>
            {!loading &&
              blog?.comments?.map((comment, index) => (
                <div
                  key={index}
                  className='mt-5 border border-gray-300 p-5 dark:border-gray-600'
                >
                  <div className='flex items-center gap-2'>
                    <Avatar size={"md"} rounded />
                    <div className='flex flex-col gap-1'>
                      <span>
                        {comment?.fname} {comment?.lname}
                      </span>
                      <span className='text-sm'>{comment?.email}</span>
                    </div>
                  </div>
                  <p className='mt-3'>{comment?.comment}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
