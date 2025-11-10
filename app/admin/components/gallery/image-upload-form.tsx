"use client"

import { Plus, Upload } from "lucide-react"
import Image from "next/image"
import type { ChangeEvent } from "react"

interface FormData {
  categoryName: string
  imageFile: string | null
  imageType: "photo" | "video"
  imagePreview: string | null
}

interface ImageUploadFormProps {
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onAddImage: () => void
}

export default function ImageUploadForm({ formData, onFormDataChange, onAddImage }: ImageUploadFormProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxSize = formData.imageType === "video" ? 10 * 1024 * 1024 : 5 * 1024 * 1024 // 10MB for video, 5MB for photo
      if (file.size > maxSize) {
        alert(`File size exceeds ${formData.imageType === "video" ? "10MB" : "5MB"} limit`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        onFormDataChange({
          ...formData,
          imagePreview: reader.result as string,
          imageFile: reader.result as string,
        })
      }
      reader.onerror = () => {
        alert("Error reading file. Please try a smaller file.")
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-background border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Add Image</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Image Type</label>
          <select
            value={formData.imageType}
            onChange={(e) =>
              onFormDataChange({
                ...formData,
                imageType: e.target.value as "photo" | "video",
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">
            Upload {formData.imageType === "photo" ? "Image" : "Video"}
          </label>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0">
              {formData.imagePreview ? (
                formData.imageType === "photo" ? (
                  <Image
                    src={formData.imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Video</span>
                )
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept={formData.imageType === "photo" ? "image/*" : "video/*"}
                onChange={handleImageChange}
                className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">{formData.imageType === "photo" ? "Max 5MB" : "Max 10MB"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onAddImage}
          disabled={!formData.imageFile}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add {formData.imageType === "photo" ? "Image" : "Video"}
        </button>
      </div>
    </div>
  )
}
