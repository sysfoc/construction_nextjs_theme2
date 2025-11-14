"use client";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const getAllBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/blog/all", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data)
    setLoading(false);
    setFormData(data.blogs);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/blog/delete/${id}`, {
        method: "DELETE",
      });
      getAllBlogs();
      setFormData(formData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResults = searchTerm
    ? formData.filter((item) => {
        const lowerSearch = searchTerm.toLowerCase();
        const createdAtMatch = item?.createdAt
          ? new Date(item.createdAt)
              .toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .toLowerCase()
              .includes(lowerSearch)
          : false;
        return (
          item?._id?.toLowerCase()?.includes(lowerSearch) ||
          item?.title?.toLowerCase()?.includes(lowerSearch) ||
          item?.slug?.toLowerCase()?.includes(lowerSearch) ||
          item?.blogWriter?.toLowerCase()?.includes(lowerSearch) ||
          createdAtMatch
        );
      })
    : formData;
  return (
    <section className='h-full p-5 bg-background'>
      <div>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-2xl font-semibold'>Blogs</h2>
          <div className='flex gap-2 items-center'>
            <TextInput
              id='search'
              type='search'
              placeholder='Search'
              className='w-[300px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href={"/admin/blogs/add"}>
              <Button
                size='md'
                className='bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white rounded-md'
              >
                Add Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='overflow-x-auto bg-black'>
        <Table className="!bg-transparent dark:!bg-transparent">
          <TableHead>
            <TableRow>
              <TableHeadCell className='!bg-[#182641] text-white'>
                Title
              </TableHeadCell>
              <TableHeadCell className='!bg-[#182641] text-white'>
                Slug
              </TableHeadCell>
              <TableHeadCell className='!bg-[#182641] text-white'>
                Author
              </TableHeadCell>
              <TableHeadCell className='!bg-[#182641] text-white'>
                Date
              </TableHeadCell>
              <TableHeadCell className='!bg-[#182641] text-white'>
                Action
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {(filteredResults.length > 0 &&
              filteredResults.map((item) => (
                <TableRow key={item._id} className="">
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell>{item.blogWriter}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className='flex gap-2'>
                    <Link href={`/admin/blogs/edit/${item.slug}`}>
                      <Button
                        size='sm'
                        className='bg-[#182641] hover:!bg-[#182641]/90 text-white rounded-md'
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size='sm'
                      onClick={() => handleDelete(item._id)}
                      className='bg-red-500 hover:!bg-red-600 text-white rounded-md'
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))) || (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  No Blogs found, Try created one
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
