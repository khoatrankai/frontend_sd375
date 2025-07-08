"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api"
import { awardService } from "@/services/awards.service"
import { historyService } from "@/services/histories.service"
import { reportService } from "@/services/report.service"
import { usersService } from "@/services/users.service"
import { Button, Input } from "antd"
import { Shield, Award, Users, History, Phone, Mail,Star, Medal, Trophy, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
// import { toast } from "sonner"
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
export default function IntroductionPage() {
    const [histories,setHistories] = useState<any>([])
    const [awards,setAwards] = useState<any>([])
    const [users,setUsers] = useState<any>([])
    const [historyLeader,setHistoryLeader] = useState<any>([])
    const [report, setReport] = useState<any>([])
    const [catagory, setCategory] = useState<any>([])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [selectedReport, setSelectedReport] = useState<string | undefined>(undefined);
  
    const fetchData = async () => {
      const res = await reportService.getCategories() as any
      const res2 = await reportService.getReports() as any
      if (res.statusCode === 200) {
        setCategory(res.data)
      }
      if (res2.statusCode === 200) {
        setReport(res2.data)
      }
      const res3 = await historyService.getHistories()
    if(res3.statusCode === 200){
      setHistories(res3.data)
    }
     const res4 = await awardService.getAwards()
        if (res4.statusCode === 200) {
          setAwards(res4.data)
        }
        const res5 = await usersService.getUsers() as any
        if (res5.statusCode === 200) {
          setUsers(res5.data)
        }
         const res6 = await historyService.getLeaders() as any
        if (res6.statusCode === 200) {
          setHistoryLeader(res6.data)
        }
    }
    
  
    const handleSubmit = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
  
  
      const data = { name, email, phone, subject, message, category: selectedReport }
      // console.log(selectedReport)?
  
      try {
        // Gửi dữ liệu đến API backend
        const response = await apiClient.post('/reports', data)
  
        if (!response) {
          throw new Error("Lỗi khi lưu dữ liệu.");
        }
        fetchData()
        toast.success("Góp ý của bạn đã được gửi thành công!");
        resetForm()
  
        // Xử lý sau khi lưu thành công: reset form hoặc thông báo cho người dùng
        console.log("Đã Gửi thành công!");
      } catch (error) {
        console.error(error);
      }
    };
    const resetForm = () => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSelectedReport('');
  
    };

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
                  return <div className="border-l-4 border-red-600 pl-4" key={dt?.id}>
                  <h3 className="font-bold text-lg">{dt?.year}: {dt?.title}</h3>
                  <p className="text-gray-700">
                    {dt?.description}
                  </p>
                </div>
                }
                  return <div className="border-l-4 border-blue-600 pl-4"  key={dt?.id}>
                   <h3 className="font-bold text-lg">{dt?.year}: {dt?.title}</h3>
                  <p className="text-gray-700">
                    {dt?.description}
                  </p>
                </div>
              })
            }
            
            
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
            
              {
                awards?.map((dt:any) =>{
                  return <div className="text-center p-4 border rounded-lg"  key={dt?.id}>
                    <Award className="h-12 w-12 mx-auto mb-2" style={{color:dt?.color}} />
                    <h4 className="font-bold">{dt?.name}</h4>
                    <p className="text-sm text-gray-600">Năm {dt?.year}</p>
                  </div>
                })
              }
              
           
            
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
                {
                  users?.map((dt:any) =>{
                    return <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded"  key={dt?.id}>
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    {
                      dt?.avatar ? <img src={dt?.avatar} alt="" className="w-12 h-12 rounded-full" /> : <Users className="h-6 w-6 text-white" />
                    }
                    
                  </div>
                  <div>
                    <p className="font-medium">{userTypes.find(dtt => dtt.value === dt?.type)?.name} {dt?.name}</p>
                    <p className="text-sm text-gray-600">{dt?.position}</p>
                  </div>
                </div>
                  })
                }
                
                
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Các thời kỳ trước</h4>
              <div className="space-y-2 text-sm">
                {
                  historyLeader?.map((dt:any)=>{
                    return <div className="flex justify-between" key={dt?.id}>
                        <span>{dt?.period}:</span>
                        <span>Đại tá {dt?.name}</span>
                      </div>
                    
                  })
                }
                
                
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
         <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại góp ý <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={selectedReport}
                      onChange={(e) => { setSelectedReport(e.target.value) }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Chọn loại góp ý</option>
                      {catagory.map((rep: any) => (
                        <option key={rep.id} value={rep?.id}>
                          {rep.name}
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
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập nội dung góp ý chi tiết..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="text-red-500">*</span> Thông tin bắt buộc
                  </div>
                 <Button htmlType="submit" type="primary" className="bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi góp ý
                  </Button>
                </div>
              </form>
        </CardContent>
      </Card>
    </div>
  )
}
