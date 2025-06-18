"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
  })

  const contactInfo = [
    {
      icon: Building,
      label: "Đơn vị",
      value: "Sư đoàn phòng không 375",
      color: "text-red-600",
    },
    {
      icon: MapPin,
      label: "Địa chỉ",
      value: "Trạm CNTT F375",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      label: "Điện thoại",
      value: "777322",
      color: "text-green-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "banthongtin.f375@mail.bqp",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      label: "Giờ làm việc",
      value: "7:30 - 11:30, 13:30 - 17:00",
      color: "text-orange-600",
    },
  ]

  const departments = [
    {
      name: "Ban Thông tin",
      phone: "777322",
      email: "banthongtin.f375@mail.bqp",
      description: "Tiếp nhận thông tin, góp ý về website",
    },
    {
      name: "Phòng Chính trị",
      phone: "777323",
      email: "chinhtrif375@mail.bqp",
      description: "Công tác tuyên truyền, giáo dục",
    },
    {
      name: "Phòng Tham mưu",
      phone: "777324",
      email: "thamuu.f375@mail.bqp",
      description: "Tác chiến, huấn luyện",
    },
    {
      name: "Phòng HC-KT",
      phone: "777325",
      email: "hckt.f375@mail.bqp",
      description: "Hậu cần, kỹ thuật",
    },
  ]

  const categories = ["Góp ý về website", "Thông tin tuyên truyền", "Hợp tác truyền thông", "Khiếu nại, tố cáo", "Khác"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Cảm ơn bạn đã gửi góp ý! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Liên hệ - Góp ý</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chúng tôi luôn lắng nghe và trân trọng mọi ý kiến đóng góp từ bạn đọc
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-600" />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${info.color}`}>
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{info.label}</div>
                    <div className="text-sm text-gray-600">{info.value}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Các phòng ban
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">{dept.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{dept.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center text-green-600">
                      <Phone className="h-3 w-3 mr-1" />
                      {dept.phone}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Mail className="h-3 w-3 mr-1" />
                      {dept.email}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                Gửi góp ý
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại góp ý <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Chọn loại góp ý</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Nhập tiêu đề góp ý"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung góp ý chi tiết..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="text-red-500">*</span> Thông tin bắt buộc
                  </div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi góp ý
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Câu hỏi thường gặp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Thời gian phản hồi là bao lâu?</h4>
                  <p className="text-sm text-gray-600">
                    Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc kể từ khi nhận được góp ý.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Thông tin cá nhân có được bảo mật không?</h4>
                  <p className="text-sm text-gray-600">
                    Mọi thông tin cá nhân được bảo mật tuyệt đối và chỉ sử dụng để phản hồi góp ý của bạn.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Có thể gửi góp ý ẩn danh không?</h4>
                  <p className="text-sm text-gray-600">
                    Bạn có thể gửi góp ý ẩn danh, tuy nhiên việc cung cấp thông tin liên hệ sẽ giúp chúng tôi phản hồi
                    tốt hơn.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
