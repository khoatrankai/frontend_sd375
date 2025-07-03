"use client"
import { Typography, Tag, Avatar, Divider, Card, Row, Col, Breadcrumb, Space, Button, Carousel } from "antd"
import {
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ShareAltOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import { News, NewsType } from "@/types/news"

const { Title, Paragraph, Text } = Typography

interface NewsDetailProps {
  news: News
  relatedNews?: News[]
}

const getNewsTypeColor = (type: NewsType): string => {
  const colors = {
    [NewsType.TRONG_NUOC]: "blue",
    [NewsType.QUOC_TE]: "green",
    [NewsType.KINH_TE]: "orange",
    [NewsType.THE_THAO]: "red",
    [NewsType.GIAI_TRI]: "purple",
  }
  return colors[type] || "default"
}

const getNewsTypeLabel = (type: NewsType): string => {
  const labels = {
    [NewsType.TRONG_NUOC]: "Trong nước",
    [NewsType.QUOC_TE]: "Quốc tế",
    [NewsType.KINH_TE]: "Kinh tế",
    [NewsType.THE_THAO]: "Thể thao",
    [NewsType.GIAI_TRI]: "Giải trí",
  }
  return labels[type] || type
}

export default function NewsDetail({ news, relatedNews = [] }: NewsDetailProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>{news.category?.name}</Breadcrumb.Item>
        <Breadcrumb.Item className="text-gray-500 truncate max-w-xs">{news.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]}>
        {/* Main Content */}
        <Col xs={24} lg={24}>
          <article className="bg-white">
            {/* Article Header */}
            <header className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag color={getNewsTypeColor(news.type)} icon={<TagOutlined />}>
                  {getNewsTypeLabel(news.type)}
                </Tag>
                {news.featured && <Tag color="gold">Nổi bật</Tag>}
                {news.category && <Tag color="blue">{news.category.name}</Tag>}
                {news.region && (
                  <Tag color="green" icon={<EnvironmentOutlined />}>
                    {news.region.name}
                  </Tag>
                )}
              </div>

              <Title level={1} className="!mb-4 !text-2xl md:!text-3xl lg:!text-4xl">
                {news.title}
              </Title>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Text strong>{news.author}</Text>
                </Space>
                <Space>
                  <CalendarOutlined />
                  <Text>{news.date}</Text>
                </Space>
                <Space>
                  <ClockCircleOutlined />
                  <Text>{news.time}</Text>
                </Space>
                <Space>
                  <EyeOutlined />
                  <Text>{news.views.toLocaleString()} lượt xem</Text>
                </Space>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-wrap gap-2 mb-6">
                <Button icon={<ShareAltOutlined />} onClick={handleShare} className="flex items-center">
                  Chia sẻ
                </Button>
                <Button icon={<HeartOutlined />} className="flex items-center">
                  Thích
                </Button>
                <Button icon={<HeartOutlined />} className="flex items-center">
                  Lưu
                </Button>
              </div> */}
            </header>

            {/* Featured Image */}
            {news.image && (
              <div className="mb-6">
                <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Image Slides */}
            {news.slides && news.slides.length > 0 && (
              <div className="mb-6">
                <Carousel autoplay className="rounded-lg overflow-hidden">
                  {news.slides.map((slide:any, index:number) => (
                    <div key={index}>
                      <div className="relative w-full h-64 md:h-96">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title || `Slide ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {slide.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                            <Text className="text-white font-medium">{slide.title}</Text>
                            {slide.description && <div className="text-sm text-gray-200 mt-1">{slide.description}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <Paragraph className="text-lg leading-relaxed text-gray-700 mb-6 font-medium">{news.excerpt}</Paragraph>

              {/* Sample content - in real app, this would be the full article content */}
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </Paragraph>

                <Paragraph>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </Paragraph>

                <Paragraph>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </Paragraph>
              </div>
            </div>

            <Divider />

            {/* Article Footer */}
            <div className="flex flex-wrap justify-between items-center pt-4">
              <div className="flex flex-wrap gap-2">
                <Text type="secondary">Danh mục:</Text>
                {news.category && <Tag color="blue">{news.category.name}</Tag>}
                {news.categoryActivity && <Tag color="cyan">{news.categoryActivity.name}</Tag>}
              </div>

              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <Button type="primary" icon={<ShareAltOutlined />} onClick={handleShare}>
                  Chia sẻ bài viết
                </Button>
              </div>
            </div>
          </article>
        </Col>

        {/* Sidebar */}
    
      </Row>
    </div>
  )
}
