import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  const quickLinks = [{name:"Quản lý văn bản",link:"http://quanlyvanban.bqp"},{name:"Hệ thông tin CĐ-ĐH QC",link:"http://htt.qcpkkq.bqp"},{name:"Hệ thông tin CĐ-ĐH F375",link:"https://192.168.1.120"},{name:"Mail QS",link:"https://mail.bqp"},{name:"Cổng TTĐT QC",link:"http://qcpkkq.bqp"}]
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span>Trạm CNTT F375</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span>777322</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span>banthongtin.f375@mail.bqp</span>
              </div>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">Liên kết nhanh</h3>
            <div className="space-y-2">
              {
                quickLinks.map((dt)=>{
                  return <a key={dt.name} href={dt.link} target="_blank" className="block hover:text-red-400 transition-colors">
                {dt.name}
              </a>
                })
              }
              
              
            </div>
          </div>

          {/* Thông tin website */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">Thông tin website</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <span>Cập nhật: {new Date().toLocaleDateString("vi-VN")}</span>
              </div>
              <p className="text-sm text-gray-300">© 2024 Sư đoàn phòng không 375. Mọi quyền được bảo lưu.</p>
              <p className="text-sm text-gray-300">Website được phát triển bởi Trạm CNTT F375</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Cổng thông tin điện tử Sư đoàn phòng không 375 - Bảo vệ vững chắc vùng trời Tổ quốc
          </p>
        </div>
      </div>
    </footer>
  )
}
