import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog.model";
import { connectDB } from "@/lib/mongodb";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export async function PATCH(req, { params }) {
  await connectDB();
  const { slug } = params;
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const metaTitle = formData.get("metaTitle");
  const metaDescription = formData.get("metaDescription");
  const writer = formData.get("blogWriter");
  const image = formData.get("image");

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    let imagePath = blog.image;
    if (image && typeof image === "object" && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());
      if (blog.image && blog.image !== "") {
        const oldPath = path.join(process.cwd(), "public", blog.image);
        try {
          await unlink(oldPath);
        } catch (err) {
          return NextResponse.json({ message: err.message }, { status: 500 });
        }
      }
      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "blog", filename);
      await writeFile(fullPath, buffer);

      imagePath = `/blog/${filename}`;
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        metaTitle,
        metaDescription,
        blogWriter: writer,
        image: imagePath,
      },
      { new: true }
    );

    return NextResponse.json({ blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
