"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Shield, User, Calendar, Mail, Phone, Eye } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "recharts"
import { Textarea } from "@/components/ui/textarea"
import { usersService } from "@/services/users.service"
import { groupService } from "@/services/groups.service"
import { CustomFormData } from "@/lib/CustomFormData"


export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("user")
  // const [selectedStatus, setSelectedStatus] = useState("all")
  const [dataSave,setDataSave] = useState<any>({})
  const [roles,setRoles] = useState<any>([
   {
    id:"user",name:"Người dùng"
   },
   {
    id:"admin",name:"Quản trị viên"
   },
   {
    id:"btv",name:"Biên tập viên"
   }
  ])

  const statuses = [
    { id: "all", name: "Tất cả trạng thái" },
    { id: "active", name: "Hoạt động" },
    { id: "inactive", name: "Không hoạt động" },
    { id: "pending", name: "Chờ kích hoạt" },
  ]

  const [users,setUsers] = useState<any>([

   
  ])

  const [groups,setGroups] = useState<any>([

   
  ])

   const [types,setTypes] = useState<any>([
  { name: "Thiếu úy", id: "thieu_uy" },
  { name: "Trung úy", id: "trung_uy" },
  { name: "Thượng úy", id: "thuong_uy" },
  { name: "Đại úy", id: "dai_uy" },
  { name: "Thiếu tá", id: "thieu_ta" },
  { name: "Trung tá", id: "trung_ta" },
  { name: "Thượng tá", id: "thuong_ta" },
  { name: "Đại tá", id: "dai_ta" },
  { name: "Thiếu tướng", id: "thieu_tuong" },
  { name: "Trung tướng", id: "trung_tuong" },
  { name: "Thượng tướng", id: "thuong_tuong" },
  { name: "Đại tướng", id: "dai_tuong" }
]
)


  const [filteredUsers,setFilteredUsers] =  useState<any>([])
  // users.filter((user) => {
  //   const matchesSearch =
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesRole = selectedRole === "all" || user.role === selectedRole
  //   const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
  //   return matchesSearch && matchesRole && matchesStatus
  // })

  const stats = [
    { label: "Tổng người dùng", value: "25", color: "text-blue-600" },
    { label: "Đang hoạt động", value: "18", color: "text-green-600" },
    { label: "Quản trị viên", value: "3", color: "text-purple-600" },
    { label: "Chờ kích hoạt", value: "4", color: "text-orange-600" },
  ]
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      // 👉 Logic xoá ở đây — ví dụ API, xóa item, v.v.
      console.log("Đã xoá bài viết");

      // 👉 Thông báo
      if (Notification.permission === "granted") {
        new Notification("Đã xoá bài viết", {
          body: "Bài viết đã được xoá thành công.",
        });
      } else if (Notification.permission !== "denied") {
        // Yêu cầu quyền nếu chưa được cấp
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Đã xoá bài viết", {
              body: "Bài viết đã được xoá thành công.",
            });
          } else {
            alert("Đã xoá bài viết.");
          }
        });
      } else {
        alert("Đã xoá bài viết.");
      }
    }
  };

  const fetchData = async()=>{
    const res = await usersService.getUsers() as any
    const res2 = await groupService.getGroups() as any
    if(res.statusCode === 200){
      setUsers(res.data)
    }

    if(res2.statusCode === 200){
      setGroups(res2.data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    setFilteredUsers(
      users.filter((user:any) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })
    )
  },[users,searchTerm,selectedRole])

  const handleSubmit = async(e:any)=>{
    try{
      e.preventDefault()
      const formData = CustomFormData({...dataSave,coverAvatar:selectedFile,achievements:[]})
      const res = await usersService.createUser(formData)
      if(res.statusCode === 201){
        fetchData()
      }
    }catch{

    }
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
        <Dialog >
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Người dùng mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader >
              <DialogTitle>Thêm Người dùng mới</DialogTitle>
            </DialogHeader>

            <form className="overflow-y-auto flex-grow space-y-4 mt-4 pr-2" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tên Người Dùng(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Tên Người Dùng ..."
                  value={dataSave?.name}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, name: e.target.value })
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Email ..."
                   value={dataSave?.email}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, email: e.target.value })
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Chức Vụ(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Chức Vụ ..."
                  value={dataSave?.position}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, position: e.target.value })
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cấp bậc(*)</label>
                <Select onValueChange={(value)=>{
                  setDataSave({ ...dataSave, type: value })
                }}>
                  <SelectTrigger className="mt-1 w-full border rounded-md p-2">
                    <SelectValue placeholder="Chọn Cấp bậc..." />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((rank:any) => (
                      <SelectItem key={rank?.id} value={rank?.id}>
                        {rank?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">mail(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập mail ..."
                  value={dataSave?.email}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, email: e.target.value })
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">Số Điện Thoại(*)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="mt-1 w-full border rounded-md p-2"
                    placeholder="Nhập Số Điện Thoại ..."
                  />
                </div>
              </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username(*)</label>
                    <input
                      className="mt-1 w-full border rounded-md p-2"
                      placeholder="Nhập username ..."
                      value={dataSave?.username}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, username: e.target.value })
                  }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password(*)</label>
                    <input
                      className="mt-1 w-full border rounded-md p-2"
                      placeholder="Nhập password ..."
                      value={dataSave?.password}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, password: e.target.value })
                  }}
                    />
                  </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Thành Tích(*)</label>
                <Textarea
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Thành Tích ..."
                  rows={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kinh Nghiệm(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Kinh Nghiệm ..."
                  value={dataSave?.experience}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, experience: e.target.value })
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Học Vấn(*)</label>
                <input
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Nhập Học Vấn ..."
                  value={dataSave?.education}
                  onChange={(e) => {
                    setDataSave({ ...dataSave, education: e.target.value })
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="">Phòng</label>
                  <Select onValueChange={(value)=>{
                  setDataSave({ ...dataSave, group: value })
                }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="tin-trong-nuoc-va-quoc-te">Chỉ huy sư đoàn</SelectItem>
                      <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                      <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                      <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem> */}
                      {
                        groups.map((group:any) => {
                          return (
                            <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </Select>
                </div>
                    <div>
                  <label htmlFor="">Role</label>
                  <Select  onValueChange={(value)=>{
                  setDataSave({ ...dataSave, role: value })
                }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn role" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        roles.map((role:any) => {
                          return (
                            <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                          )
                        })
                      }
                      {/* <SelectItem value="tin-trong-nuoc-va-quoc-te">Chỉ huy sư đoàn</SelectItem>
                      <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                      <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                      <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar</label>
                  <div className="space-y-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />

                    {selectedFile && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <div>
                          <span className="text-sm text-green-700 block">
                            ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                          </span>
                          <button
                            onClick={handleRemoveFile}
                            className="text-red-500 text-sm hover:underline mt-1"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>

                  <Button type="button"  >
                    Hủy
                  </Button>
                </DialogClose>
                <DialogClose asChild>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Lưu
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <User className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role:any) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            {/* <div>
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user:any) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar || "/public/placeholder.svg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {user.phone}
                      </div>
                      <span>{user.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge
                        variant={
                          user.role === "admin"
                            ? "destructive"
                            : user.role === "editor"
                              ? "default"
                              : user.role === "author"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {/* {user.roleName}
                         */}
                         {
                          roles.find((role:any)=>role.id === user.role)?.name
                         }
                      </Badge>
                      <Badge
                        variant={user?.activity ? 'destructive':' secondary'}
                      >
                        {user.activity ? 'Đang hoạt động':'Không hoạt động'
}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Ngày tạo: {user.created_at}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
                        <DialogHeader >
                          <DialogTitle> Người dùng </DialogTitle>
                        </DialogHeader>

                        <form className="overflow-y-auto flex-grow space-y-4 mt-4 pr-2">

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tên Người Dùng(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Tên Người Dùng ..."
                              disabled />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Chức Vụ(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Chức Vụ ..."
                              disabled />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Cấp bậc(*)</label>
                            <Select disabled>
                              <SelectTrigger className="mt-1 w-full border rounded-md p-2">
                                <SelectValue placeholder="Chọn Cấp bậc..." />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "Thiếu úy", "Trung úy", "Thượng úy", "Đại úy",
                                  "Thiếu tá", "Trung tá", "Thượng tá", "Đại tá",
                                  "Thiếu tướng", "Trung tướng", "Thượng tướng", "Đại tướng"
                                ].map((rank) => (
                                  <SelectItem key={rank} value={rank}>
                                    {rank}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">mail(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập mail ..."
                              disabled />
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Số Điện Thoại(*)</label>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                className="mt-1 w-full border rounded-md p-2"
                                placeholder="Nhập Số Điện Thoại ..."
                                disabled />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Thành Tích(*)</label>
                            <Textarea
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Thành Tích ..."
                              rows={10}
                              disabled />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Kinh Nghiệm(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Kinh Nghiệm ..."
                              disabled />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Học Vấn(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Học Vấn ..."
                              disabled />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="">Phòng</label>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn Phòng" />
                                </SelectTrigger>
                                <SelectContent>
                                  {
                                    groups.map((group:any) => (
                                    <SelectItem key={group.id} value={group.id}>
                                      {group.name}
                                    </SelectItem>
                                  ))
                                  }
                                  {/* <SelectItem value="tin-trong-nuoc-va-quoc-te">Chỉ huy sư đoàn</SelectItem>
                                  <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                                  <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                                  <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem> */}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Avatar</label>
                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                  onChange={handleFileChange}
                                  disabled />

                                {selectedFile && (
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                                    {previewUrl && (
                                      <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <span className="text-sm text-green-700 block">
                                        ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                      </span>
                                      <button
                                        disabled
                                        onClick={handleRemoveFile}
                                        className="text-red-500 text-sm hover:underline mt-1"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
                        <DialogHeader >
                          <DialogTitle>Cập nhật người dùng </DialogTitle>
                        </DialogHeader>

                        <form className="overflow-y-auto flex-grow space-y-4 mt-4 pr-2">

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tên Người Dùng(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Tên Người Dùng ..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Chức Vụ(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Chức Vụ ..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Cấp bậc(*)</label>
                            <Select>
                              <SelectTrigger className="mt-1 w-full border rounded-md p-2">
                                <SelectValue placeholder="Chọn Cấp bậc..." />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "Thiếu úy", "Trung úy", "Thượng úy", "Đại úy",
                                  "Thiếu tá", "Trung tá", "Thượng tá", "Đại tá",
                                  "Thiếu tướng", "Trung tướng", "Thượng tướng", "Đại tướng"
                                ].map((rank) => (
                                  <SelectItem key={rank} value={rank}>
                                    {rank}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">mail(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập mail ..."
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Số Điện Thoại(*)</label>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                className="mt-1 w-full border rounded-md p-2"
                                placeholder="Nhập Số Điện Thoại ..."
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Thành Tích(*)</label>
                            <Textarea
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Thành Tích ..."
                              rows={10}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Kinh Nghiệm(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Kinh Nghiệm ..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Học Vấn(*)</label>
                            <input
                              className="mt-1 w-full border rounded-md p-2"
                              placeholder="Nhập Học Vấn ..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="">Phòng</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn Phòng" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tin-trong-nuoc-va-quoc-te">Chỉ huy sư đoàn</SelectItem>
                                  <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                                  <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                                  <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Avatar</label>
                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                  onChange={handleFileChange}
                                />

                                {selectedFile && (
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                                    {previewUrl && (
                                      <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <span className="text-sm text-green-700 block">
                                        ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                      </span>
                                      <button
                                        onClick={handleRemoveFile}
                                        className="text-red-500 text-sm hover:underline mt-1"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>

                              <Button type="button"  >
                                Hủy
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>

                              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Lưu
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
