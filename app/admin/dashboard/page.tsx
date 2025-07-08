"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Video, Download, Eye, Settings, LogOut } from "lucide-react"
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { authService } from "@/services/auth.service"
import { apiClient } from "@/lib/api"
import { CustomFormData } from "@/lib/CustomFormData"
import { softwareService } from "@/services/software.service"
import { tracksService } from "@/services/tracks.service"
import { videosService } from "@/services/videos.service"
import { imagesService } from "@/services/images.service"
import { DialogClose } from "@radix-ui/react-dialog"

export default function AdminDashboard() {
  const statss = [
    { title: "Tổng bài viết", value: "156", icon: FileText, color: "text-blue-600" },
    { title: "Hình ảnh", value: "342", icon: ImageIcon, color: "text-green-600" },
    { title: "Video", value: "28", icon: Video, color: "text-purple-600" },
    { title: "Lượt truy cập", value: "12,543", icon: Eye, color: "text-orange-600" },
  ]

  const recentActivities = [
    { action: "Thêm bài viết mới", item: "Hội nghị tổng kết 2024", time: "2 giờ trước" },
    { action: "Cập nhật hình ảnh", item: "Album diễn tập", time: "4 giờ trước" },
    { action: "Phê duyệt văn bản", item: "Chỉ thị số 01/CT-F375", time: "6 giờ trước" },
    { action: "Thêm phần mềm", item: "Quản lý văn bản v2.1", time: "1 ngày trước" },
  ]
  const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("all")
    const [viewMode, setViewMode] = useState("grid")
    const [selectedDocType, setSelectedDocType] = useState<string>("image");
    const [images, setImage] = useState<any>([])
  
    // const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<any>([])
    const [categoryVideos, setCategoryVideos] = useState<any>([])
    const [categoryTracks, setCategoryTracks] = useState<any>([])
    const [categorySoftwares, setCategorySoftwares] = useState<any>([])
    const [platform, setPlatform] = useState<any>([])
    const [videos, setVideos] = useState<any>([])
    const [tracks, setTracks] = useState<any>([])
    const [softwares, setSoftwares] = useState<any>([])
  
    const mediaTypes = [
      { id: "all", name: "Tất cả" },
      { id: "image", name: "Hình ảnh" },
      { id: "video", name: "Video" },
      { id: "audio", name: "Audio" },
      { id: "software", name: "Phần mềm" },
    ]
  
  
  
    const stats = [
      { label: "Tổng file", value: "342", color: "text-blue-600" },
      { label: "Hình ảnh", value: "198", color: "text-green-600" },
      { label: "Video", value: "28", color: "text-purple-600" },
      { label: "Dung lượng", value: "2.3 GB", color: "text-orange-600" },
    ]
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileVideo, setSelectedFileVideo] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewUrlVideo, setPreviewUrlVideo] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [dataSave, setDataSave] = useState<any>({});
  
  
    // const [title, setTitle] = useState(""); m 
    // const [selectedthumbnail, setThumbnail] = useState<File | null>(null)
    // const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  
    const handleReset = () => {
      setDataSave({})
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    };
  
    const handleFileChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      setSelectedFileVideo(file);
      // const url = URL.createObjectURL(file);
      // setPreviewUrl(url);
    };
  
    useEffect(() => {
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);
   
    const handleRemoveFile = () => {
      setSelectedFile(null);
    };
    const handleRemoveFileVideo = () => {
      setSelectedFileVideo(null);
    };
    useEffect(() => {
      console.log("vao ne")
      fetchDataNews()
      fetchData()
      fetchDataSoftwares()
      fetchDataTracks()
      fetchDataVideos()
    }, [])
  
  
    const fetchData = async () => {
      const res = await imagesService.getCategories()
      const res2 = await softwareService.getPlatforms()
      const res3 = await videosService.getCategories()
      const res4 = await softwareService.getCategories()
      const res5 = await tracksService.getCategories()
      if (res.statusCode === 200) {
        setCategory(res.data)
      }
      if (res2.statusCode === 200) {
        setPlatform(res2.data)
      }
      if (res3.statusCode === 200) {
        setCategoryVideos(res3.data)
      }
      if (res4.statusCode === 200) {
        setCategorySoftwares(res4.data)
      }
      console.log(res5)
      if (res5.statusCode === 200) {
        setCategoryTracks(res5.data)
      }
    }
    const fetchDataNews = async () => {
      const res = await imagesService.getImages()
      if (res.statusCode === 200) {
        setImage(res.data)
      }
    };
  
    const fetchDataVideos = async () => {
      const res = await videosService.getVideos()
      if (res.statusCode === 200) {
        setVideos(res.data)
      }
    }
  
    const fetchDataTracks = async () => {
      const res = await tracksService.getTracks()
      if (res.statusCode === 200) {
        setTracks(res.data)
      }
    }
  
    const fetchDataSoftwares = async () => {
      const res = await softwareService.getSoftwares()
      if (res.statusCode === 200) {
        setSoftwares(res.data)
      }
    }
    const handleSubmit = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      console.log(selectedFile)
      const fileOK = { coverThumbnail: selectedFile, coverImage: selectedFile, coverVideo: selectedFileVideo, coverTrack: selectedFile, coverSoftware: selectedFile }
      
      const formData = CustomFormData({ ...dataSave, ...fileOK })
      
  
      try {
        // Gửi dữ liệu đến API backend
        const response = await apiClient.upload(selectedDocType === "image" ? "/images" : selectedDocType === "video" ? "/videos" : selectedDocType === "track" ? "/tracks" : selectedDocType === "software" ? "/softwares" : "/tracks", formData) as any;
        if (response.statusCode === 201) {
          if (selectedDocType === "image") {
            fetchDataNews()
            handleReset()
          }
          if (selectedDocType === "video") {
            fetchDataVideos()
            handleReset()
          }
          if (selectedDocType === "track") {
            fetchDataTracks()
            handleReset()
          }
          if (selectedDocType === "software") {
            fetchDataSoftwares()
            handleReset()
          }
  
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const resetForm = () => {
      setCategory(null)
      setCategoryVideos(null)
      setCategoryTracks(null)
      setCategorySoftwares(null)
      setSelectedFile(null);
    };
      const logoutUser = async()=>{
     const res = await authService.logout() as any
     if(res?.success){
      window.location.href = "/admin/login"
     }
  }
  const handleTypeClick = (value: string) => {
  setSelectedDocType(value);
};

useEffect(()=>{console.log(categoryTracks)},[categoryTracks])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển Admin</h1>
          <div className="flex items-center space-x-4">
            <button>
              <div
                onClick={(e) => {

                  window.location.href = "/admin/settings";

                }}
                className="w-full flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 mr-2" />
                Cài Đặt
              </div>
            </button>
            <button>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm("Bạn có chắc muốn đăng xuất?")) {
                    logoutUser()
                  }
                }}
                className="w-full flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </div>
            </button>

          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statss.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              

             <Dialog>
          <DialogTrigger asChild>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <Button onClick={() => handleTypeClick("image")} variant="outline" className="h-20 flex-col"  value="image">
                  <FileText className="h-6 w-6 mb-2" />
                  Thêm Hình Ảnh
                </Button>
                <Button onClick={() => handleTypeClick("video")} variant="outline" className="h-20 flex-col"  value="video">
                  <ImageIcon className="h-6 w-6 mb-2" />
                  Tải Video
                </Button>
                <Button onClick={() => handleTypeClick("audio")} variant="outline" className="h-20 flex-col"  value="audio">
                  <Video className="h-6 w-6 mb-2" />
                  Thêm Audio
                </Button>
                <Button onClick={() => handleTypeClick("software")} variant="outline" className="h-20 flex-col" value="software">

                  <Download className="h-6 w-6 mb-2" />
                  Quản lý file
                </Button>
              </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tải lên file</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Select file type */}
              <div className="hidden">
                {/* <label className="block text-sm font-medium mb-1">Loại thư viện</label> */}
                <Select onValueChange={setSelectedDocType} defaultValue="image" >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hoạt động" />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="image"></SelectItem>
                    <SelectItem value="video"></SelectItem>
                    <SelectItem value="audio"></SelectItem>
                    <SelectItem value="software"></SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                {selectedDocType === "image" && (

                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                      <Input placeholder="Nhập tiêu đề bảng tin"
                        defaultValue={dataSave?.title}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, title: e.target.value }
                        })} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                      <Select onValueChange={(e) => {
                        setDataSave((preValue: any) => {
                          return { ...preValue, category: e }
                        })
                      }} >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hoạt động" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectItem value="undefined">Không</SelectItem> */}

                          {category?.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category?.name}
                            </SelectItem>

                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Chọn thumbnail</label>
                      <Input
                        type="file"
                        accept={"image/*"
                        }
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="text-sm text-green-700">
                            ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                          </span>
                          <button
                            onClick={handleRemoveFile}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                          {previewUrl && (
                            <div className="mt-2">
                              <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Preview */}

                  </>

                )}
                {selectedDocType === "video" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                      <Input placeholder="Nhập tiêu đề video"
                        defaultValue={dataSave?.title}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, title: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mô tả</label>
                      <Input placeholder="Nhập mô tả"
                        defaultValue={dataSave?.description}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, description: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <Input placeholder="Nhập thoi lượng"
                        defaultValue={dataSave?.duration}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, duration: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                      <Select onValueChange={(e) => {
                        setDataSave((preValue: any) => {
                          return { ...preValue, category: e }
                        })
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hoạt động" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            categoryVideos?.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))
                          }

                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Chọn thumbnail</label>
                      <Input
                        type="file"
                        accept={"image/*"
                        }
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Preview */}
                    {selectedFile && (
                      <div className="mt-2 text-sm text-gray-700">
                        <span className="text-sm text-green-700">
                          ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                        </span>
                        <button
                          onClick={handleRemoveFile}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Xóa
                        </button>
                        {previewUrl && (
                          <div className="mt-2">
                            <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                          </div>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-1">Chọn video</label>
                      <Input
                        type="file"
                        accept={
                          (selectedDocType as any) === "image"
                            ? "image/*"
                            : selectedDocType === "video"
                              ? "video/*"
                              : selectedDocType === "audio"
                                ? "audio/*"
                                : ".exe,.msi,.dmg,.pkg,.deb,.rpm"
                        }
                        onChange={handleFileChangeVideo}
                      />
                      {selectedFileVideo && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="text-sm text-green-700">
                            ✓ File đã được tải lên: <strong>{selectedFileVideo.name}</strong>
                          </span>
                          <button
                            onClick={handleRemoveFileVideo}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                          {previewUrl && (
                            <div className="mt-2">
                              {(selectedDocType as any) === "image" && (
                                <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                              )}
                              {(selectedDocType as any) === "video" && (
                                <video src={previewUrl} controls className="max-h-40 rounded" />
                              )}
                              {(selectedDocType as any) === "audio" && (
                                <audio src={previewUrl} controls className="w-full" />
                              )}
                              {(selectedDocType as any) === "software" && (
                                <div className="text-sm text-gray-500">
                                  Không thể xem trước phần mềm
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {selectedDocType === "audio" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                      <Input placeholder="Nhập tiêu đề bảng tin"
                        defaultValue={dataSave?.title}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, title: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                      <Select onValueChange={(e) => {
                        setDataSave((preValue: any) => {
                          return { ...preValue, category: e }
                        })
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hoạt động" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            categoryTracks?.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))
                          }

                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tác giả</label>
                      <Input placeholder="Nhập tên tác giả"
                        defaultValue={dataSave?.artist}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, artist: e.target.value }
                        })} />
                    </div>
                     <div>
                      <label className="block text-sm font-medium mb-1">Ngày phát hành</label>
                      <Input placeholder="Nhập Ngày phát hành"
                        defaultValue={dataSave?.releaseDate}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, releaseDate: e.target.value }
                        })} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Mô tả</label>
                      <Input placeholder="Nhập mô tả"
                        defaultValue={dataSave?.description}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, description: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <Input placeholder="Nhập thời lượng"
                        defaultValue={dataSave?.duration}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, duration: e.target.value }
                        })} />
                    </div>
                    <div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Chọn âm thanh</label>
                        <Input
                          type="file"
                          accept={
                            (selectedDocType as any) === "image"
                              ? "image/*"
                              : (selectedDocType as any) === "video"
                                ? "video/*"
                                : selectedDocType === "audio"
                                  ? "audio/*"
                                  : ".exe,.msi,.dmg,.pkg,.deb,.rpm"
                          }
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Preview */}
                      {selectedFile && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="text-sm text-green-700">
                            ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                          </span>
                          <button
                            onClick={handleRemoveFile}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                          {previewUrl && (
                            <div className="mt-2">
                              {(selectedDocType as any) === "image" && (
                                <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                              )}
                              {(selectedDocType as any) === "video" && (
                                <video src={previewUrl} controls className="max-h-40 rounded" />
                              )}
                              {selectedDocType === "audio" && (
                                <audio src={previewUrl} controls className="w-full" />
                              )}
                              {(selectedDocType as any) === "software" && (
                                <div className="text-sm text-gray-500">
                                  Không thể xem trước phần mềm
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {selectedDocType === "software" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                      <Input placeholder="Nhập tiêu đề phần mềm"
                        defaultValue={dataSave?.name}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, name: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mô tả</label>
                      <Input placeholder="Nhập mô tả"
                        defaultValue={dataSave?.description}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, description: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Version</label>
                      <Input placeholder="Nhập mô tả"
                        defaultValue={dataSave?.version}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, version: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Size</label>
                      <Input placeholder="Nhập kích thước"
                        defaultValue={dataSave?.size}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, size: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Loại phần mềm</label>
                      <Select onValueChange={(e) => {
                        setDataSave((preValue: any) => {
                          return { ...preValue, category: e }
                        })
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hoạt động" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            categorySoftwares?.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))
                          }

                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Chọn phần mềm</label>
                        <Input
                          type="file"
                          accept={
                            (selectedDocType as any) === "image"
                              ? "image/*"
                              : (selectedDocType as any) === "video"
                                ? "video/*"
                                : (selectedDocType as any) === "audio"
                                  ? "audio/*"
                                  : ".exe,.msi,.dmg,.pkg,.deb,.rpm"
                          }
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Preview */}
                      {selectedFile && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="text-sm text-green-700">
                            ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                          </span>
                          <button
                            onClick={handleRemoveFile}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                          {previewUrl && (
                            <div className="mt-2">
                              {(selectedDocType as any) === "image" && (
                                <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                              )}
                              {(selectedDocType as any) === "video" && (
                                <video src={previewUrl} controls className="max-h-40 rounded" />
                              )}
                              {(selectedDocType as any) === "audio" && (
                                <audio src={previewUrl} controls className="w-full" />
                              )}
                              {selectedDocType === "software" && (
                                <div className="text-sm text-gray-500">
                                  Không thể xem trước phần mềm
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Đánh giá</label>
                      <Input placeholder="Nhập đánh giá"
                        defaultValue={dataSave?.rating}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, rating: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Hệ điều hành</label>
                      <Select onValueChange={(e) => {
                        setDataSave((preValue: any) => {
                          return { ...preValue, platform: e }
                        })
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hệ điều hành" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            platform.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))
                          }

                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              {/* Upload input */}
              <div className="text-end">
                <DialogClose asChild>

                  <Button type="button"  >
                    Hủy
                  </Button>
                </DialogClose>
                <DialogClose asChild>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-2">
                    Lưu
                  </Button>
                </DialogClose>
              </div>
            </form>


          </DialogContent>

        </Dialog>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
