"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { historyService } from "@/services/histories.service"
import { Shield, Award, Users, History, Phone, Mail,Star, Medal, Trophy } from "lucide-react"
import { useEffect, useState } from "react"

export default function IntroductionPage() {
  const [histories,setHistories] = useState<any>([])

  const fetchData = async()=>{
    const res = await historyService.getHistories()
    if(res.statusCode === 200){
      setHistories(res.data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Giới thiệu Sư đoàn phòng không 375</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Đơn vị anh hùng với truyền thống vẻ vang trong sự nghiệp bảo vệ Tổ quốc, luôn sẵn sàng chiến đấu bảo vệ vững
          chắc vùng trời thiêng liêng của dân tộc.
        </p>
      </div>

      {/* Giới thiệu chung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-6 w-6 mr-2 text-red-600" />
            Giới thiệu về Sư đoàn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img
                src="/logo.jpg"
                alt="Sư đoàn phòng không 375"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Sư đoàn 375 là một đơn vị quan trọng thuộc Quân chủng Phòng không - Không quân của Quân đội nhân dân Việt Nam. Sư đoàn có bề dày lịch sử và truyền thống vẻ vang, đặc biệt trong cuộc kháng chiến chống Mỹ cứu nước.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{(new Date()).getFullYear() - 1968}</p>
                  <p className="text-sm text-gray-600">Năm thành lập</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">10</p>
                  <p className="text-sm text-gray-600">Đơn vị trực thuộc</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lịch sử chiến đấu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-6 w-6 mr-2 text-blue-600" />
            Lịch sử chiến đấu BVVT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {
              histories?.map((dt:any)=>{
                if(dt?.highlight){
                  return <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="font-bold text-lg">{dt?.year}: {dt?.title}</h3>
                  <p className="text-gray-700">
                    {dt?.description}
                  </p>
                </div>
                }
                return <div className="border-l-4 border-blue-600 pl-4">
                   <h3 className="font-bold text-lg">{dt?.year}: {dt?.title}</h3>
                  <p className="text-gray-700">
                    {dt?.description}
                  </p>
                </div>
              })
            }
            
            
            {/* <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold text-lg">1980 - nay: Thời kỳ hòa bình</h3>
              <p className="text-gray-700">
                Tiếp tục hiện đại hóa, nâng cao năng lực sẵn sàng chiến đấu, tham gia tích cực các hoạt động xây dựng và
                bảo vệ Tổ quốc.
              </p>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Phần thưởng cao quý */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Các phần thưởng cao quý
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Award className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-bold">Huân chương Quân công hạng Nhất</h4>
              <p className="text-sm text-gray-600">Năm 1975</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Award className="h-12 w-12 text-red-600 mx-auto mb-2" />
              <h4 className="font-bold">Danh hiệu Đơn vị Anh hùng</h4>
              <p className="text-sm text-gray-600">Năm 1980</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h4 className="font-bold">Huân chương Bảo vệ Tổ quốc hạng Nhất</h4>
              <p className="text-sm text-gray-600">Năm 2015</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lãnh đạo chỉ huy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-purple-600" />
            Lãnh đạo - Chỉ huy Sư đoàn qua các thời kỳ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Lãnh đạo hiện tại</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Đại tá Nguyễn Văn A</p>
                    <p className="text-sm text-gray-600">Chỉ huy trưởng Sư đoàn</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Đại tá Trần Văn B</p>
                    <p className="text-sm text-gray-600">Chính ủy Sư đoàn</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Các thời kỳ trước</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1965-1975:</span>
                  <span>Đại tá Lê Văn C</span>
                </div>
                <div className="flex justify-between">
                  <span>1975-1985:</span>
                  <span>Đại tá Phạm Văn D</span>
                </div>
                <div className="flex justify-between">
                  <span>1985-2000:</span>
                  <span>Đại tá Hoàng Văn E</span>
                </div>
                <div className="flex justify-between">
                  <span>2000-2015:</span>
                  <span>Đại tá Vũ Văn F</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liên hệ - Góp ý */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-6 w-6 mr-2 text-green-600" />
            Liên hệ - Góp ý
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold">Thông tin liên hệ</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>Điện thoại: 777322</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>Email: banthongtin.f375@mail.bqp</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Gửi góp ý</h4>
              <form className="space-y-3">
                <input type="text" placeholder="Họ và tên" className="w-full p-2 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <textarea placeholder="Nội dung góp ý" rows={3} className="w-full p-2 border rounded" />
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Gửi góp ý
                </button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
