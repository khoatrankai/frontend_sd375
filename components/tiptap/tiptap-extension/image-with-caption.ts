import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { ImageWithCaptionView } from "./image-with-caption-view"

export interface ImageWithCaptionOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageWithCaption: {
      setImageWithCaption: (options: { src: string; alt?: string; title?: string; caption?: string }) => ReturnType
    }
  }
}

export const ImageWithCaption = Node.create<ImageWithCaptionOptions>({
  name: "imageWithCaption",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? "inline" : "block"
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      caption: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-with-caption"]',
        getAttrs: (element) => {
          const img = element.querySelector("img")
          const caption = element.querySelector("figcaption")
          if(caption){
            caption.style.display = "flex";
            caption.style.flexDirection = "column"
            caption.style.alignItems = "center"

          }
          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            title: img?.getAttribute("title"),
            caption: caption?.textContent || null,
            width: img?.getAttribute("width"),
            height: img?.getAttribute("height"),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, caption, width, height } = HTMLAttributes

    const imgAttrs = {
      src,
      alt,
      title,
      width,
      height,
    }

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, { "data-type": "image-with-caption" }),
      ["img", mergeAttributes(imgAttrs)],
      caption ? ["figcaption", caption] : "",
    ]
  },

  addCommands() {
    return {
      setImageWithCaption:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageWithCaptionView)
  },
})
