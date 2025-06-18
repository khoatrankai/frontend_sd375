import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, Phone, Mail } from "lucide-react"

export default function LeadershipPage() {
  const currentLeadership = [
    {
      name: "Đại tá Nguyễn Văn Minh",
      position: "Chỉ huy trưởng Sư đoàn",
      avatar: "/public/placeholder.svg?height=150&width=150",
      experience: "25 năm",
      education: "Thạc sĩ Quân sự, Học viện Phòng không - Không quân",
      achievements: ["Huân chương Bảo vệ Tổ quốc hạng Nhì", "Chiến sĩ thi đua toàn quốc"],
      phone: "777322",
      email: "chihuy.f375@mail.bqp",
    },
    {
      name: "Đại tá Trần Văn Hùng",
      position: "Chính ủy Sư đoàn",
      avatar: "/public/placeholder.svg?height=150&width=150",
      experience: "23 năm",
      education: "Thạc sĩ Chính trị, Học viện Chính trị",
      achievements: ["Huân chương Lao động hạng Nhì", "Đảng viên xuất sắc"],
      phone: "777323",
      email: "chinhuy.f375@mail.bqp",
    },
    {
      name: "Thượng tá Lê Văn Đức",
      position: "Phó Chỉ huy trưởng kiêm Tham mưu trưởng",
      avatar: "/public/placeholder.svg?height=150&width=150",
      experience: "20 năm",
      education: "Cử nhân Quân sự, Học viện Phòng không - Không quân",
      achievements: ["Huân chương Chiến công hạng Ba", "Sĩ quan trẻ tiêu biểu"],
      phone: "777324",
      email: "thamuu.f375@mail.bqp",
    },
    {
      name: "Thượng tá Phạm Văn Thành",
      position: "Phó Chính ủy",
      avatar: "/public/placeholder.svg?height=150&width=150",
      experience: "18 năm",
      education: "Cử nhân Chính trị, Học viện Chính trị",
      achievements: ["Bằng khen Thủ tướng Chính phủ", "Cán bộ chính trị xuất sắc"],
      phone: "777325",
      email: "phochinhuy.f375@mail.bqp",
    },
  ]

  const departments = [
    {
      name: "Phòng Tham mưu",
      head: "Thượng tá Hoàng Văn Nam",
      description: "Tham mưu tác chiến, huấn luyện và sẵn sàng chiến đấu",
      staff: 25,
    },
    {
      name: "Phòng Chính trị",
      head: "Thượng tá Vũ Văn Hải",
      description: "Công tác chính trị, tuyên truyền và giáo dục",
      staff: 20,
    },
    {
      name: "Phòng Hậu cần - Kỹ thuật",
      head: "Thượng tá Đỗ Văn Quang",
      description: "Bảo đảm hậu cần và kỹ thuật cho đơn vị",
      staff: 30,
    },
    {
      name: "Phòng Tổ chức cán bộ",
      head: "Trung tá Nguyễn Thị Lan",
      description: "Quản lý tổ chức và cán bộ",
      staff: 15,
    },
  ]

  const formerLeaders = [
    { period: "1965-1975", name: "Đại tá Lê Văn Cường", position: "Chỉ huy trưởng đầu tiên" },
    { period: "1975-1985", name: "Đại tá Phạm Văn Dũng", position: "Chỉ huy trưởng" },
    { period: "1985-2000", name: "Đại tá Hoàng Văn Thắng", position: "Chỉ huy trưởng" },
    { period: "2000-2015", name: "Đại tá Vũ Văn Hòa", position: "Chỉ huy trưởng" },
    { period: "2015-2020", name: "Đại tá Trần Văn Bình", position: "Chỉ huy trưởng" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Lãnh đạo - Chỉ huy</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ban chỉ huy và đội ngũ lãnh đạo của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Current Leadership */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Ban chỉ huy hiện tại</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentLeadership.map((leader, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={leader.avatar || "/public/placeholder.svg"}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-red-100"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                    <Badge variant="destructive" className="mb-3">
                      {leader.position}
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Kinh nghiệm:</span>
                        <span className="ml-2">{leader.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Học vấn:</span>
                        <span className="ml-2 text-xs">{leader.education}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Thành tích:</span>
                        <div className="mt-1 space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 pt-2 border-t">
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {leader.phone}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {leader.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          Các phòng ban trực thuộc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{dept.name}</span>
                  <Badge variant="secondary">{dept.staff} người</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Trưởng phòng:</span>
                    <span className="ml-2 text-blue-600">{dept.head}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{dept.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Former Leaders */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Các đời chỉ huy trưởng</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {formerLeaders.map((leader, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{leader.name}</h4>
                    <p className="text-sm text-gray-600">{leader.position}</p>
                  </div>
                  <Badge variant="outline">{leader.period}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Organization Chart */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Sơ đồ tổ chức</h2>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="bg-red-600 text-white p-4 rounded-lg inline-block mb-6">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold">Ban Chỉ huy Sư đoàn</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="font-semibold text-sm text-gray-800">{dept.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{dept.head}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
