"use client";
import { Image as ImageIcon, Video, Trash2 } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  categoryId: string;
  src: string;
  type: "photo" | "video";
}

interface ImageGridProps {
  images: GalleryImage[];
  onDeleteImage: (id: string) => void;
}

export default function ImageGrid({ images, onDeleteImage }: ImageGridProps) {
  return (
    <div className="bg-background border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">
        Images ({images.length})
      </h3>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative group rounded-lg overflow-hidden border border-gray-200"
            >
              {image.type === "photo" ? (
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt="Gallery"
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <video
                  src={image.src}
                  className="w-full h-40 object-cover bg-black"
                />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => onDeleteImage(image._id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                {image.type === "photo" ? (
                  <ImageIcon className="w-4 h-4" />
                ) : (
                  <Video className="w-4 h-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No images in this category
        </p>
      )}
    </div>
  );
}
