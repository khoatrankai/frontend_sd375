"use client"
import { Typography, Tag, Avatar, Divider, Breadcrumb, Space } from "antd"
import {
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TagOutlined,
  StarOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const { Title, Paragraph, Text } = Typography

interface ArticleDetailProps {
  article: any
}



export default function ArticleDetail({ article }: ArticleDetailProps) {
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: article.title,
//         text: article.excerpt,
//         url: window.location.href,
//       })
//     } else {
//       navigator.clipboard.writeText(window.location.href)
//     }
//   }
    const router= useRouter()
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item className="hover:underline cursor-pointer" onClick={()=>{
            router.push("/")
        }}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item className="hover:underline cursor-pointer" onClick={()=>{
            router.push("/chuyen-de")
        }}>Chuyên đề</Breadcrumb.Item>
        <Breadcrumb.Item className="hover:underline cursor-pointer" onClick={()=>{
            if(article.type === "cchc"){
                router.push("/chuyen-de/cchc")
            }else if(article.type === "tttt"){
                router.push("/chuyen-de/tuyen-truyen")
            }else if(article.type === "ttpl"){
                router.push("/chuyen-de/phap-luat")
            }else{
                router.push("/chuyen-de/khqs")
            }

        }}>{article.category?.name}</Breadcrumb.Item>
        <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
      </Breadcrumb>

      <article>
        {/* Header Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag icon={<TagOutlined />}>
            {article.type}
          </Tag>
          {article.featured && (
            <Tag icon={<StarOutlined />} color="gold">
              Nổi bật
            </Tag>
          )}
          {article.category && <Tag color="blue">{article?.category?.name}</Tag>}
        </div>

        <Title level={2} className="!mb-4">{article.title}</Title>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text strong>{article.author || "Không rõ tác giả"}</Text>
          </Space>
          <Space>
            <CalendarOutlined />
            <Text>{article.date}</Text>
          </Space>
          <Space>
            <ClockCircleOutlined />
            <Text>{article.readTime}</Text>
          </Space>
          <Space>
            <EyeOutlined />
            <Text>{article.views} lượt xem</Text>
          </Space>
        </div>

        {/* Nội dung chính */}
        <div className="mb-6">
          <div className="prose prose-lg max-w-none body-image-with-caption figcaption" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
        </div>

        {/* Tags */}
        <div className="mb-6">
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Text strong>Tags:</Text>
              {article.tags.map((tag:any, idx:any) => (
                <Tag key={idx} color="cyan">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Footer Share */}
        {/* <div className="flex justify-between items-center mt-4">
          <Text type="secondary">Cập nhật: {new Date(article.updated_at).toLocaleDateString()}</Text>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ShareAltOutlined />
            Chia sẻ
          </button>
        </div> */}
      </article>
    </div>
  )
}
