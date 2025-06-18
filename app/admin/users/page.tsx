"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Shield, User, Calendar, Mail, Phone } from "lucide-react"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const roles = [
    { id: "all", name: "Tất cả vai trò" },
    { id: "admin", name: "Quản trị viên" },
    { id: "editor", name: "Biên tập viên" },
    { id: "author", name: "Tác giả" },
    { id: "viewer", name: "Người xem" },
  ]

  const statuses = [
    { id: "all", name: "Tất cả trạng thái" },
    { id: "active", name: "Hoạt động" },
    { id: "inactive", name: "Không hoạt động" },
    { id: "pending", name: "Chờ kích hoạt" },
  ]

  const users = [
    {
      id: 1,
      name: "Đại tá Nguyễn Văn A",
      email: "chihuy.f375@mail.bqp",
      phone: "777322",
      role: "admin",
      roleName: "Quản trị viên",
      status: "active",
      statusName: "Hoạt động",
      unit: "Chỉ huy sư đoàn",
      lastLogin: "15/12/2024",
      avatar: "/public/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Trung tá Trần Văn B",
      email: "chinhtrif375@mail.bqp",
      phone: "777323",
      role: "editor",
      roleName: "Biên tập viên",
      status: "active",
      statusName: "Hoạt động",
      unit: "Phòng Chính trị",
      lastLogin: "14/12/2024",
      avatar: "/public/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Thiếu tá Lê Văn C",
      email: "thamuu.f375@mail.bqp",
      phone: "777324",
      role: "author",
      roleName: "Tác giả",
      status: "active",
      statusName: "Hoạt động",
      unit: "Phòng Tham mưu",
      lastLogin: "13/12/2024",
      avatar: "/public/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Đại úy Phạm Văn D",
      email: "hckt.f375@mail.bqp",
      phone: "777325",
      role: "author",
      roleName: "Tác giả",
      status: "inactive",
      statusName: "Không hoạt động",
      unit: "Phòng HC-KT",
      lastLogin: "10/12/2024",
      avatar: "/public/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Thiếu tá Hoàng Văn E",
      email: "tcbc.f375@mail.bqp",
      phone: "777326",
      role: "viewer",
      roleName: "Người xem",
      status: "pending",
      statusName: "Chờ kích hoạt",
      unit: "Phòng TC-BC",
      lastLogin: "Chưa đăng nhập",
      avatar: "/public/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = [
    { label: "Tổng người dùng", value: "25", color: "text-blue-600" },
    { label: "Đang hoạt động", value: "18", color: "text-green-600" },
    { label: "Quản trị viên", value: "3", color: "text-purple-600" },
    { label: "Chờ kích hoạt", value: "4", color: "text-orange-600" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Thêm người dùng mới
        </Button>
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
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
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
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
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
            {filteredUsers.map((user) => (
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
                        {user.roleName}
                      </Badge>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {user.statusName}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Đăng nhập: {user.lastLogin}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
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
