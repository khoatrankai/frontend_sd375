export default function Banner() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Thi đua quyết thắng</h3>
          <p className="text-red-100">Xây dựng đơn vị vững mạnh toàn diện</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Sẵn sàng chiến đấu</h3>
          <p className="text-green-100">Bảo vệ vững chắc vùng trời Tổ quốc</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Đoàn kết - Kỷ luật</h3>
          <p className="text-blue-100">Truyền thống vẻ vang của đơn vị</p>
        </div>
      </div>
    </section>
  )
}
