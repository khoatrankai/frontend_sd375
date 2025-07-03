"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, Phone, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { usersService } from "@/services/users.service"
import { groupService } from "@/services/groups.service"
import { historyService } from "@/services/histories.service"
import { Image } from "antd"
export const userTypes = [
  { name: "Thiếu úy", value: "thieu_uy" },
  { name: "Trung úy", value: "trung_uy" },
  { name: "Đại úy", value: "dai_uy" },
  { name: "Thiếu tá", value: "thieu_ta" },
  { name: "Trung tá", value: "trung_ta" },
  { name: "Đại tá", value: "dai_ta" },
  { name: "Thiếu tướng", value: "thieu_tuong" },
  { name: "Trung tướng", value: "trung_tuong" },
  { name: "Đại tướng", value: "dai_tuong" },
]

export default function LeadershipPage() {
  const [currentLeadership,setCurrentLeadership] = useState<any>([
   
  ])

  const [departments,setDepartments] = useState<any>([

    
  ])

  const [formerLeaders,setFormerLeaders] = useState<any>([

   
  ])

  

  const fetchData = async()=>{
    const res = await usersService.getUsers() as any
    const res2 = await groupService.getGroups() as any
    const res3 = await historyService.getLeaders() as any
    if(res.statusCode === 200){
      setCurrentLeadership(res.data)
    }

    if(res2.statusCode === 200){
      setDepartments(res2.data)
    }

 if(res3.statusCode === 200){
      setFormerLeaders(res3.data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {currentLeadership.map((leader:any, index:number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-start space-x-4">
                  {/* <div className="relative flex-1 h-full">
                    <Image
                      width={100}
                      height={100}
                      src={leader?.avatar || "/public/placeholder.svg"}
                      alt={leader?.name}
                      className="w-full h-48 rounded-sm object-cover border-4 border-red-100"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  </div> */}
                  <div className="flex-1 min-h-60">
                    <Image
                      src={leader?.avatar || "/public/placeholder.svg"}
                      alt={leader?.name}
                      className="!min-w-full !min-h-full rounded-sm"
                    />
                  </div>
                   
                  {/* <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{userTypes.find((dt)=> dt.value === leader?.type)?.name} {leader?.name}</h3>
                    <Badge variant="destructive" className="mb-3">
                      {leader?.position}
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Kinh nghiệm:</span>
                        <span className="ml-2">{leader?.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Học vấn:</span>
                        <span className="ml-2 text-xs">{leader?.education}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Thành tích:</span>
                        <div className="mt-1 space-y-1">
                          {leader?.achievements?.map((achievement:any, idx:number) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 pt-2 border-t">
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {leader?.phone}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {leader?.email}
                        </div>
                      </div>
                    </div>
                  </div> */}
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
          {departments?.map((dept:any, index:number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{dept?.name}</span>
                  <Badge variant="secondary">{dept?.users?.length} người</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 m-3">
                  <div>
                    <span className="font-medium text-gray-600">Trưởng phòng:</span>
                    <span className="ml-2 text-blue-600">{userTypes.find((dt)=> dt.value === dept?.head?.type)?.name} {dept?.head?.name}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{dept?.description}</p>
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
              {formerLeaders.map((leader:any, index:number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Đại tá {leader?.name}</h4>
                    <p className="text-sm text-gray-600">{leader?.position}</p>
                  </div>
                  <Badge variant="outline">{leader?.period}</Badge>
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
                {departments.map((dept:any, index:number) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="font-semibold text-sm text-gray-800">{dept?.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{userTypes.find((dt)=> dt.value === dept?.head?.type)?.name} {dept?.head?.name}</div>
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
