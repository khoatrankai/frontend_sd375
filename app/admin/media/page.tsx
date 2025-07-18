"use client"

import { useEffect, useMemo, useState } from "react"
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
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"



export default function AdminMediaPage() {
  const { datas: dataProfile } = useSelector(
    (state: RootState) => state.get_profile
  );
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




  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileVideo, setSelectedFileVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrlVideo, setPreviewUrlVideo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dataSave, setDataSave] = useState<any>({});

  const filterBySearch = (list: any[] | null | undefined, type: string) =>
    (list ?? []) // nếu list là null thì dùng []
      .filter((dt: any) =>
        (dt?.title ?? dt?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(item => ({ ...item, type }));


  type MediaType = "all" | "image" | "video" | "audio" | "software";

  // const [selectedType, setSelectedType] = useState<MediaType>("all");

  const dataMap: Record<Exclude<MediaType, "all">, any[]> = {
    image: images,
    video: videos,
    audio: tracks,
    software: softwares,
  };

  const filteredData = useMemo(() => {
    if (selectedType === "all") {
      const allItems = [
        ...filterBySearch(images, "image"),
        ...filterBySearch(videos, "video"),
        ...filterBySearch(tracks, "audio"),
        ...filterBySearch(softwares, "software"),
      ];

      const uniqueMap = new Map();
      allItems.forEach(item => {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item);
        }
      });

      return Array.from(uniqueMap.values());
    }

    return filterBySearch(dataMap[selectedType as Exclude<MediaType, "all">], selectedType);
  }, [images, videos, tracks, softwares, selectedType, searchTerm]);





  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Phân nhóm trang (2 trang mỗi cụm)
  const pagesPerGroup = 2;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  // Xác định các trang trong cụm hiện tại
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // Chuyển nhóm
  const handlePrevGroup = () => {
    const newPage = Math.max(1, startPage - pagesPerGroup);
    setCurrentPage(newPage);
  };

  const handleNextGroup = () => {
    const newPage = Math.min(totalPages, startPage + pagesPerGroup);
    setCurrentPage(newPage);
  };
  //end phân trang




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
      const response = await apiClient.upload(selectedDocType === "image" ? "/images" : selectedDocType === "video" ? "/videos" : selectedDocType === "track" ? "/tracks" : selectedDocType === "software" ? "/software" : "/tracks", formData) as any;
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
    // setCategory(null)
    // setCategoryVideos(null)
    // setCategoryTracks(null)
    // setCategorySoftwares(null)
    setSelectedFile(null);
    setPreviewUrl(null)
    setSelectedFileVideo(null)
    setTracks(null)
  };




  const stats = [
    {
      label: "Tổng file",
      value:
        (images?.length || 0) +
        (videos?.length || 0) +
        (tracks?.length || 0) +
        (softwares?.length || 0),
      color: "text-blue-600",
    },
    { label: "Hình ảnh", value: images?.length || 0, color: "text-green-600" },
    { label: "Video", value: videos?.length || 0, color: "text-purple-600" },
    { label: "Dung lượng", value: "375 GB", color: "text-orange-600" },
  ];

  useEffect(() => {
    fetchDataNews()
    fetchData()
    fetchDataSoftwares()
    fetchDataTracks()
    fetchDataVideos()
  }, [])
  useEffect(() => { console.log(categoryTracks) }, [categoryTracks])
  return (
    <div className="p-6 space-y-6 overflow-auto max-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý thư viện</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm} disabled={dataProfile?.role === "user"}>
              <Upload className="h-4 w-4 mr-2" />
              Tải lên file mới
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md overflow-y-auto max-h-[80vh]" >
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
                          {category?.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item?.name}
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
                            categoryTracks?.map((item: any) => {
                              console.log(item)
                              return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            }
                            )
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
                      <label className="block text-sm font-medium mb-1">Thiết bị khả dụng</label>
                      <Input placeholder="Nhập điều kiện thiết bị"
                        defaultValue={dataSave?.requirements}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, requirements: e.target.value }
                        })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nhà phát triển</label>
                      <Input placeholder="Nhập nhà phát triển"
                        defaultValue={dataSave?.developer}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, developer: e.target.value }
                        })} />
                    </div>
                     <div>
                      <label className="block text-sm font-medium mb-1">Giấy phép</label>
                      <Input placeholder="Nhập giấy phép"
                        defaultValue={dataSave?.license}
                        onChange={(e) => setDataSave((preValue: any) => {
                          return { ...preValue, license: e.target.value }
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
              <Select value={selectedType} onValueChange={(value)=>{
                setSelectedType(value)
                setCurrentPage(1)
              }}>
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
          <CardTitle>
            Thư viện media (
            {(images?.length || 0) + (videos?.length || 0) + (tracks?.length || 0) + (softwares?.length || 0)} file)
          </CardTitle>

        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {currenData?.map((file: any) => {
                const isImage = file.type === "image";
                const isVideo = file.type === "video";
                const isAudio = file.type === "audio";
                const isSoftware = file.type === "software";

                return (
                  <div key={`${file.type}-${file.id}`} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex justify-center relative">
                      <Image
                        src={file.thumbnail || "/public/placeholder.svg"}
                        alt={file.title || file.name}
                        width={450}
                        height={228}
                        className="object-cover"
                        preview={{
                          mask: (
                            <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                              <Eye className="text-xl mb-1" />
                            </div>
                          ),
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant="secondary">
                          {isImage && "Hình ảnh"}
                          {isVideo && "Video"}
                          {isAudio && "Audio"}
                          {isSoftware && "Phần mềm"}
                        </Badge>
                        {file?.category?.name && (
                          <Badge variant="default">{file?.category?.name}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium text-sm line-clamp-2 mb-2">{file.title || file.name}</h4>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Kích thước:</span>
                          <span>
                            {isImage || isSoftware ? file.size : file.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ngày tải:</span>
                          <span>{file.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            {isImage || isSoftware ? "Lượt tải" : isAudio ? "Lượt nghe" : "Lượt xem"}:
                          </span>
                          <span>
                            {isImage || isSoftware ? file.downloads : isAudio ? file.plays : file.views}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <Button variant="outline" size="sm" onClick={() => downloadFile(file.link)}>
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(file.id, file.type)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <div className="space-y-2">
              {currenData?.map((file: any) => 
                {
                  const isImage = file.type === "image";
                const isVideo = file.type === "video";
                const isAudio = file.type === "audio";
                const isSoftware = file.type === "software";
                return <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={file.thumbnail || "/public/placeholder.svg"}
                        alt={file.title ?? file?.name}
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
                        <h4 className="font-medium">{file.title ?? file?.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <Badge variant="outline">{isImage?'Hình ảnh':isAudio?'Audio':isSoftware?'Phần mềm':'Video'}</Badge>
                          {file?.category?.name && (
                            <Badge className=" top-2 right-2" variant="default">{file?.category?.name}</Badge>
                          )}
                          {/* <span>{file.size}</span> */}
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {file.date}
                          </div>
                          <span>{file?.views ?? file?.downloads} {file?.views ? 'lượt xem':'lượt tải'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">

                      <Button variant="outline" size="sm" onClick={() => {
                        downloadFile(file?.link ?? file?.thumbnail)
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
                }
              )}
              
            </div>
          )}
        </CardContent>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Trước
          </Button>

          {/* Nút ... lùi cụm */}
          {startPage > 1 && (
            <Button variant="outline" onClick={handlePrevGroup}>
              ...
            </Button>
          )}

          {/* Các trang trong nhóm hiện tại */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "font-bold" : ""}
              >
                {page}
              </Button>
            );
          })}

          {/* Nút ... tiến cụm */}
          {endPage < totalPages && (
            <Button variant="outline" onClick={handleNextGroup}>
              ...
            </Button>
          )}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Tiếp
          </Button>
        </div>
      </Card>
    </div>
  )
}

