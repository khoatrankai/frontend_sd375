import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Medal, Trophy } from "lucide-react"

export default function AwardsPage() {
  const awards = [
    {
      id: 1,
      name: "Danh hiệu Đơn vị Anh hùng Lực lượng vũ trang nhân dân",
      year: "1980",
      description: "Được trao tặng vì những thành tích xuất sắc trong chiến đấu bảo vệ Tổ quốc",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      level: "Cao nhất",
    },
    {
      id: 2,
      name: "Huân chương Quân công hạng Nhất",
      year: "1975",
      description: "Ghi nhận công lao to lớn trong kháng chiến chống Mỹ cứu nước",
      icon: Medal,
      color: "text-red-600",
      bgColor: "bg-red-50",
      level: "Hạng Nhất",
    },
    {
      id: 3,
      name: "Huân chương Bảo vệ Tổ quốc hạng Nhất",
      year: "2015",
      description: "Thành tích xuất sắc trong nhiệm vụ bảo vệ vùng trời Tổ quốc",
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      level: "Hạng Nhất",
    },
    {
      id: 4,
      name: "Huân chương Chiến công hạng Nhì",
      year: "1979",
      description: "Chiến công trong cuộc chiến tranh bảo vệ biên giới phía Bắc",
      icon: Star,
      color: "text-green-600",
      bgColor: "bg-green-50",
      level: "Hạng Nhì",
    },
    {
      id: 5,
      name: "Cờ thi đua của Chính phủ",
      year: "2020",
      description: "Đơn vị dẫn đầu trong phong trào thi đua yêu nước",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      level: "Xuất sắc",
    },
    {
      id: 6,
      name: "Bằng khen của Thủ tướng Chính phủ",
      year: "2022",
      description: "Thành tích trong công tác phòng chống dịch COVID-19",
      icon: Medal,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      level: "Đặc biệt",
    },
  ]

  const statistics = [
    { label: "Tổng số phần thưởng", value: "45+", icon: Trophy },
    { label: "Huân chương Nhà nước", value: "12", icon: Medal },
    { label: "Bằng khen các cấp", value: "28", icon: Award },
    { label: "Danh hiệu tập thể", value: "5", icon: Star },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Các phần thưởng cao quý</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Những phần thưởng, danh hiệu cao quý mà Sư đoàn phòng không 375 đã được Đảng, Nhà nước và nhân dân trao tặng
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statistics.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <Card
            key={award.id}
            className={`hover:shadow-xl transition-all duration-300 ${award.bgColor} border-l-4 border-l-current ${award.color}`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${award.bgColor}`}>
                  <award.icon className={`h-6 w-6 ${award.color}`} />
                </div>
                <Badge variant="outline" className={award.color}>
                  {award.level}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{award.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Năm nhận:</span>
                  <Badge variant="secondary">{award.year}</Badge>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">{award.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline of Major Awards */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
            Dòng thời gian các phần thưởng quan trọng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="space-y-6">
              {awards.slice(0, 4).map((award, index) => (
                <div key={award.id} className="relative flex items-start space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${award.bgColor} border-2 border-white shadow-md`}
                  >
                    <award.icon className={`h-4 w-4 ${award.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{award.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {award.year}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <CardContent className="p-8 text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-4">Tiếp tục phấn đấu vì những vinh quang mới</h3>
          <p className="text-red-100 max-w-2xl mx-auto">
            Với truyền thống vẻ vang và những thành tích đã đạt được, Sư đoàn phòng không 375 tiếp tục phấn đấu để xứng
            đáng với sự tin tưởng của Đảng, Nhà nước và nhân dân.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
