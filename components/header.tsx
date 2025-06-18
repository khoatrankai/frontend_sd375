import { Shield, Star } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Shield className="h-12 w-12 text-yellow-400" />
          <div>
            <h1 className="text-2xl font-bold">SƯ ĐOÀN PHÒNG KHÔNG 375</h1>
            <p className="text-sm text-red-100">Cổng thông tin điện tử</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-yellow-400" />
          <span className="text-sm">Bảo vệ vững chắc vùng trời Tổ quốc</span>
        </div>
      </div>
    </header>
  )
}
