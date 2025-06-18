import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, Award, Target } from "lucide-react"

export default function HistoryPage() {
  const milestones = [
    {
      year: "1965",
      title: "Thành lập Sư đoàn",
      description: "Sư đoàn phòng không 375 được thành lập với nhiệm vụ bảo vệ vùng trời quan trọng",
      highlight: true,
    },
    {
      year: "1965-1975",
      title: "Kháng chiến chống Mỹ",
      description: "Tham gia bảo vệ cầu Hàm Rồng, sân bay Vinh và các mục tiêu chiến lược",
      battles: ["Trận đánh tại cầu Hàm Rồng", "Bảo vệ sân bay Vinh", "Phòng thủ tuyến giao thông"],
    },
    {
      year: "1979",
      title: "Chiến tranh bảo vệ biên giới",
      description: "Đảm nhiệm bảo vệ vùng trời các tỉnh biên giới phía Bắc",
      battles: ["Cao Bằng", "Lạng Sơn", "Quảng Ninh"],
    },
    {
      year: "1980-2000",
      title: "Xây dựng và phát triển",
      description: "Hiện đại hóa trang bị, nâng cao trình độ cán bộ chiến sĩ",
    },
    {
      year: "2000-nay",
      title: "Hội nhập và phát triển",
      description: "Ứng dụng công nghệ cao, tham gia các hoạt động quốc tế",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Lịch sử chiến đấu BVVT</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hành trình 58 năm xây dựng, chiến đấu và trưởng thành của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-red-600"></div>

        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
              <Card className={`${milestone.highlight ? "ring-2 ring-red-500 bg-red-50" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <History className="h-5 w-5 text-red-600" />
                      <span>{milestone.title}</span>
                    </CardTitle>
                    <Badge variant={milestone.highlight ? "destructive" : "secondary"}>{milestone.year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{milestone.description}</p>
                  {milestone.battles && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-1 text-green-600" />
                        Các trận đánh tiêu biểu:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {milestone.battles.map((battle, idx) => (
                          <li key={idx}>{battle}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 mr-2 text-red-600" />
            Thành tích chiến đấu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">58</div>
              <div className="text-sm text-gray-600">Năm xây dựng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-sm text-gray-600">Trận đánh</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25</div>
              <div className="text-sm text-gray-600">Huân chương</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5000+</div>
              <div className="text-sm text-gray-600">Cán bộ chiến sĩ</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
