"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Globe, Shield, Bell, Database, Save } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Sư đoàn phòng không 375",
    siteDescription: "Cổng thông tin điện tử chính thức của Sư đoàn phòng không 375",
    contactEmail: "banthongtin.f375@mail.bqp",
    contactPhone: "777322",
    address: "Trạm CNTT F375",
    enableComments: true,
    enableRegistration: false,
    enableNotifications: true,
    maintenanceMode: false,
    maxFileSize: "50",
    allowedFileTypes: "jpg,png,pdf,doc,docx,mp4,mp3",
    backupFrequency: "daily",
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    alert("Cài đặt đã được lưu thành công!")
  }

  return (
    <div className="p-6 space-y-6 overflow-auto max-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Cài đặt hệ thống</h1>
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          <Save className="h-4 w-4 mr-2" />
          Lưu cài đặt
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Cài đặt chung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên website</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Số điện thoại</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange("address", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Mô tả website</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Cài đặt bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép bình luận</Label>
                  <p className="text-sm text-gray-500">Người dùng có thể bình luận trên bài viết</p>
                </div>
                <Switch
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => handleSettingChange("enableComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép đăng ký</Label>
                  <p className="text-sm text-gray-500">Người dùng mới có thể tự đăng ký tài khoản</p>
                </div>
                <Switch
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => handleSettingChange("enableRegistration", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ bảo trì</Label>
                  <p className="text-sm text-gray-500">Tạm thời đóng website để bảo trì</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bật thông báo</Label>
                  <p className="text-sm text-gray-500">Hiển thị thông báo trên website</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua Email</Label>
                  <p className="text-sm text-gray-500">Gửi thông báo qua email cho admin</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua SMS</Label>
                  <p className="text-sm text-gray-500">Gửi thông báo qua SMS cho admin</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Cài đặt Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Kích thước file tối đa (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowedFileTypes">Định dạng file cho phép</Label>
                  <Input
                    id="allowedFileTypes"
                    value={settings.allowedFileTypes}
                    onChange={(e) => handleSettingChange("allowedFileTypes", e.target.value)}
                    placeholder="jpg,png,pdf,doc,docx"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hướng dẫn</Label>
                <p className="text-sm text-gray-500">
                  Nhập các định dạng file được phép tải lên, cách nhau bởi dấu phẩy. Ví dụ: jpg,png,pdf,doc,docx,mp4,mp3
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Cài đặt sao lưu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Tần suất sao lưu</Label>
                <select
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="daily">Hàng ngày</option>
                  <option value="weekly">Hàng tuần</option>
                  <option value="monthly">Hàng tháng</option>
                  <option value="manual">Thủ công</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline">Tạo bản sao lưu ngay</Button>
                <Button variant="outline">Khôi phục từ bản sao lưu</Button>
              </div>
              <div className="space-y-2">
                <Label>Thông tin sao lưu gần nhất</Label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Thời gian:</strong> 15/12/2024 - 02:00 AM
                  </p>
                  <p className="text-sm">
                    <strong>Kích thước:</strong> 245.7 MB
                  </p>
                  <p className="text-sm">
                    <strong>Trạng thái:</strong> <span className="text-green-600">Thành công</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
