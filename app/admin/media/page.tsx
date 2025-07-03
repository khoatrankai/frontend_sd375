"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Trash2, Download, Eye, Calendar, Grid3X3, List } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, } from "@/components/ui/dialog";
import { newsService } from "@/services/news.service"
import { imagesService } from "@/services/images.service"
import { apiClient } from "@/lib/api"
import { downloadFile } from "@/lib/DownloadImage"
import { videosService } from "@/services/videos.service"
import { tracksService } from "@/services/tracks.service"
import { softwareService } from "@/services/software.service"
import { CustomFormData } from "@/lib/CustomFormData"
import { Image } from "antd"



export default function AdminMediaPage() {
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
  const handleDelete = async (id: string, docType: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      // 👉 Logic xoá ở đây — ví dụ API, xóa item, v.v.
      if (docType === "image") {
        const res = await imagesService.deleteImage(id)
        fetchDataNews()
      }
      if (docType === "video") {
        const res = await videosService.deleteVideo(id)
        fetchDataVideos()
      }
      if (docType === "audio") {
        const res = await tracksService.deleteTrack(id)
        fetchDataTracks()
      }
      if (docType === "software") {
        const res = await softwareService.deleteSoftware(id)
        fetchDataSoftwares()
      }

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
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleRemoveFileVideo = () => {
    setSelectedFileVideo(null);
  };
  useEffect(() => {
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
    // const dataSave = {
    //   title: title,
    //   category: selectedCategory,
    //   description: description,
    //   thumbnail: selectedthumbnail,
    //   video: selectedvideo,
    //   track: selectedtrack,
    //   software: selectedsoftware,
    //   platform: selectedplatform,
    //   date: date,
    //   type: selectedType,
    //   fileOK: fileOK,
    // }

    const formData = CustomFormData({ ...dataSave, ...fileOK })
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("category", selectedCategory ?? "");
    //
    // const formData = CustomFormData({...dataSave,})
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("category", selectedCategory ?? "");
    // if (selectedthumbnail) {
    //   formData.append("coverImage", selectedthumbnail);
    // }

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






  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý thư viện</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm}>
              <Upload className="h-4 w-4 mr-2" />
              Tải lên file mới
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tải lên file</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Select file type */}
              <div>
                <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                <Select onValueChange={setSelectedDocType} defaultValue="image">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hoạt động" />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="image">Ảnh</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Âm thanh</SelectItem>
                    <SelectItem value="software">Phần mềm</SelectItem>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Tìm kiếm file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn hoạt động" />
                </SelectTrigger>
                <SelectContent>
                  {mediaTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Thư viện media ({images.length + videos.length + tracks.length + softwares.length} file)</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(selectedType === "all" || selectedType === "image") && images?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex justify-center">
                    <Image
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.name}
                      width={450}
                      height={228}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    {file?.category?.name && (
                      <Badge className="absolute top-2 right-2" variant="default">{file.category.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file.title}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{file.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ngày tải:</span>
                        <span>{file.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lượt tải:</span>
                        <span>{file.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">

                      <Button variant="outline" size="sm" onClick={() => {
                        downloadFile(`/public/videos?id=1b23f96b-4e6a-4c1b-8eff-e6a6d6fd8db0.mp4`)
                      }}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(file?.id, 'image')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "video") && videos?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex justify-center">
                    <Image
                      src={file?.thumbnail || "/public/placeholder.svg"}
                      alt={file?.title}
                      width={450}
                      height={228}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    {file?.category?.name && (
                      <Badge className="absolute top-2 right-2" variant="default">{file?.category?.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file?.title}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{file?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ngày tải:</span>
                        <span>{file?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lượt xem:</span>
                        <span>{file?.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">

                      <Button variant="outline" size="sm" onClick={() => {
                        downloadFile(file?.link)
                      }}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(file?.id, 'video')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "audio") && tracks?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex justify-center">
                    <Image
                      src={"/public/placeholder.svg"}
                      alt={file.title}
                      width={450}
                      height={228}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    {file?.category?.name && (
                      <Badge className="absolute top-2 right-2" variant="default">{file?.category?.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file?.title}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{file?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ngày tải:</span>
                        <span>{file?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lượt nghe:</span>
                        <span>{file?.plays}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">

                      <Button variant="outline" size="sm" onClick={() => {
                        downloadFile(file?.link)
                      }}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(file?.id, 'audio')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "software") && softwares?.filter((dt: any) => (dt?.name ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex justify-center">
                    <Image
                      src={"/public/placeholder.svg"}
                      alt={file.name}
                      width={450}
                      height={228}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    {file?.category?.name && (
                      <Badge className="absolute top-2 right-2" variant="default">{file?.category?.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file?.name}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{file?.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ngày tải:</span>
                        <span>{file?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lượt tải:</span>
                        <span>{file?.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">

                      <Button variant="outline" size="sm" onClick={() => {
                        downloadFile(file?.link)
                      }}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(file?.id, 'software')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {(selectedType === "all" || selectedType === "image") && images?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.title}
                      width={50}
                      height={50}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{file.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">Hình ảnh</Badge>
                        {/* <span>{file.size}</span> */}
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {file.date}
                        </div>
                        <span>{file?.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">

                    <Button variant="outline" size="sm" onClick={() => {
                      downloadFile(file?.thumbnail)
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(file?.id, 'image')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "video") && videos?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Image
                    
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.title}
                      width={50}
                      height={50}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{file.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">Video</Badge>
                        <span>{file?.duration}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {file.date}
                        </div>
                        <span>{file?.views} lượt tải</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">

                    <Button variant="outline" size="sm" onClick={() => {
                      downloadFile(file?.link)
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(file?.id, 'video')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "audio") && tracks?.filter((dt: any) => (dt?.title ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.title}
                      width={50}
                      height={50}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{file.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">Audio</Badge>
                        <span>{file?.duration}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {file.date}
                        </div>
                        <span>{file?.views} lượt nghe</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">

                    <Button variant="outline" size="sm" onClick={() => {
                      downloadFile(file?.link)
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(file?.id, 'audio')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {(selectedType === "all" || selectedType === "software") && softwares?.filter((dt: any) => (dt?.name ?? ""
              ).toLowerCase().includes(searchTerm.toLowerCase())).map((file: any) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file?.name}
                      width={50}
                      height={50}
                      className=" object-cover"
                      preview={{
                        mask: (
                          <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                            <Eye className="text-xl mb-1" />
                          </div>
                        ),
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{file?.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">Phần mềm</Badge>
                        <span>{file?.size}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {file.date}
                        </div>
                        <span>{file?.downloads} lượt tải</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">

                    <Button variant="outline" size="sm" onClick={() => {
                      downloadFile(file?.link)
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(file?.id, 'software')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

