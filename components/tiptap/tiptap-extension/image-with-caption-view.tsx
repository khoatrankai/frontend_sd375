"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import type { Node as ProseMirrorNode } from "@tiptap/pm/model"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit3, Check, X } from "lucide-react"

interface ImageWithCaptionViewProps {
  node: ProseMirrorNode
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
  editor: Editor
  selected: boolean
}

export const ImageWithCaptionView: React.FC<ImageWithCaptionViewProps> = ({
  node,
  updateAttributes,
  deleteNode,
  editor,
  selected,
}) => {
  const [isEditingCaption, setIsEditingCaption] = useState(false)
  const [captionValue, setCaptionValue] = useState(node.attrs.caption || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditingCaption && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingCaption])

  const handleSaveCaption = () => {
    updateAttributes({ caption: captionValue })
    setIsEditingCaption(false)
  }

  const handleCancelCaption = () => {
    setCaptionValue(node.attrs.caption || "")
    setIsEditingCaption(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSaveCaption()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancelCaption()
    }
  }

  return (
    <NodeViewWrapper className="image-with-caption-wrapper">
      <figure className={`relative group ${selected ? "ring-2 ring-blue-500" : ""}`} data-type="image-with-caption">
        {/* Image */}
        <div className="relative">
          <img
            src={node.attrs.src || "/placeholder.svg"}
            alt={node.attrs.alt}
            title={node.attrs.title}
            width={node.attrs.width}
            height={node.attrs.height}
            className="max-w-full h-auto rounded-lg"
            draggable={false}
          />

          {/* Controls overlay */}
          {selected && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={() => setIsEditingCaption(true)} className="h-8 w-8 p-0">
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={deleteNode} className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Caption */}
        <figcaption className="mt-2">
          {isEditingCaption ? (
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={captionValue}
                onChange={(e) => setCaptionValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập caption cho ảnh..."
                className="flex-1"
              />
              <Button size="sm" onClick={handleSaveCaption} className="h-8 w-8 p-0">
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelCaption} className="h-8 w-8 p-0 bg-transparent">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`text-sm text-gray-600 text-center italic cursor-pointer hover:bg-gray-100 p-1 rounded ${
                !node.attrs.caption ? "text-gray-400" : ""
              }`}
              onClick={() => setIsEditingCaption(true)}
            >
              {node.attrs.caption || "Click để thêm caption..."}
            </div>
          )}
        </figcaption>
      </figure>
    </NodeViewWrapper>
  )
}
