"use client"

import type React from "react"
import { useRef } from "react"
import { useCurrentEditor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

interface ImageUploadButtonWithCaptionProps {
  text?: string
}

export const ImageUploadButtonWithCaption: React.FC<ImageUploadButtonWithCaptionProps> = ({ text = "Thêm ảnh" }) => {
  const { editor } = useCurrentEditor()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    // Create a FileReader to convert file to base64 or handle upload
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string

      // Insert image with caption
      editor
        .chain()
        .focus()
        .setImageWithCaption({
          src,
          alt: file.name,
          caption: "", // Empty caption initially
        })
        .run()
    }
    reader.readAsDataURL(file)

    // Reset input
    event.target.value = ""
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        className="flex items-center gap-2 bg-transparent"
      >
        <ImageIcon className="h-4 w-4" />
        {text}
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </>
  )
}
