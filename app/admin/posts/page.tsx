"use client"

import { use, useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, Filter } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Label } from "recharts"
import { DialogClose } from "@/components/ui/dialog";
import { newsService } from "@/services/news.service"
import { apiClient } from "@/lib/api"
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
// import RichTextEditor from "@/components/editor/TipTap"


export default function AdminPostsPage() {
  const { datas: dataProfile } = useSelector(
    (state: RootState) => state.get_profile
  );
  const types = [{name:"Trong nước",id:"trong_nuoc"},{name:"Quốc tế",id:"quoc_te"},{name:"Quân sự",id:"quan_su"},{name:"Hoạt động sư đoàn",id:"hoat_dong_su_doan"}]
  const [searchTerm, setSearchTerm] = useState("")
  const refBtn = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>("trong_nuoc");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | undefined>(undefined);
  const [selectedFilterType, setSelectedFilterType] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<any>([])
  const [filteredNews, setFilteredNews] = useState<any>([])


  const [selectedActivity, setSelectedActivity] = useState<string | undefined>(undefined);
  const [selectedFilterActivity, setSelectedFilterActivity] = useState<string | undefined>(undefined);
  const [categoriesActivity, setcategoriesActivity] = useState<any>([])

  const [Region, setRegion] = useState<any>([])
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [selectedFilterRegion, setSelectedFilterRegion] = useState<string | undefined>(undefined);

  const [News, setNews] = useState<any>([])
  const [selectedNews, setSelectedNews] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const fileName = News.image?.split('/').pop();

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNew = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

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



  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    // Tạo đối tượng FormData để dễ dàng truyền file cùng các trường text
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", selectedType ?? "trong_nuoc");
    formData.append("author", author);
    formData.append("excerpt", excerpt);
    formData.append("region", selectedRegion ?? "");
    formData.append("category", selectedCategory ?? "");
    formData.append("categoryActivity", selectedActivity ?? "");
    formData.append("featured", isFeatured.toString()); // Nếu dùng checkbox
    if (selectedFile) {
      formData.append("coverImage", selectedFile);
    }

    try {
      // Gửi dữ liệu đến API backend
      const response = await apiClient.upload('/news', formData)

      if (!response) {
        throw new Error("Lỗi khi lưu dữ liệu.");
      }
      fetchDataNews()

      // Xử lý sau khi lưu thành công: reset form hoặc thông báo cho người dùng
      console.log("Đã lưu thành công!");
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchData()
    fetchDataActivity()
    fetchDataRegion()
    fetchDataNews()
  }, [])
  const fetchData = async () => {
    const res = await newsService.getCategories()
    if (res.statusCode === 200) {
      setCategories(res.data)
    }
  }
  const fetchDataRegion = async () => {
    const res = await newsService.getRegion()
    if (res.statusCode === 200) {
      setRegion(res.data)
    }
  }
  const fetchDataNews = async () => {
    const res = await newsService.getNews()
    if (res.statusCode === 200) {
      setNews(res.data)
    }
  }
  const fetchDataActivity = async () => {
    const res = await newsService.getcategoriesActivity()
    if (res.statusCode === 200) {
      setcategoriesActivity(res.data)
    }
  }


  const stats = [
    { label: "Tổng bảng tin", value: News.length, color: "text-blue-600" },
    { label: "HĐ quân sự", value: News.filter((news:any) => news.type === "quan_su").length, color: "text-green-600" },
    { label: "HĐ ngoài nước", value: News.filter((news:any) => news.type === "quoc_te").length, color: "text-yellow-600" },
    { label: "HĐ sư đoàn", value: News.filter((news:any) => news.type === "hoat_dong_su_doan").length, color: "text-red-600" },
  ]
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa dòng này?");
    if (confirmDelete) {
      try {
        await newsService.deletePost(id);
        await fetchDataNews();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file); // ✅ tạo preview URL
      setPreviewUrl(url);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };


  const [open, setOpen] = useState(false);
  const handleFocusUpdate = (post: any) => {
    setSelectedFile(null)
    setPreviewUrl(post?.image);
    setSelectedType(post?.type);
    setTitle(post.title)
    setExcerpt(post.excerpt)
    setSelectedActivity(post?.categoryActivity?.id ?? undefined)
    setSelectedCategory(post?.category?.id ?? undefined)
    setSelectedRegion(post?.region?.id ?? undefined)
    setIsFeatured(post?.featured)
    // setSelectedFile(post?.image);
  }
  const handleSubmitUp = async (e: React.ChangeEvent<any>, id: string) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", selectedType ?? "trong_nuoc");
    formData.append("excerpt", excerpt);
    formData.append("author", author);
    formData.append("region", selectedRegion as string);
    formData.append("category", selectedCategory as string);
    formData.append("categoryActivity", selectedActivity as string);
    formData.append("featured", isFeatured.toString());
    if (selectedFile) {
      formData.append("coverImage", selectedFile ?? undefined);
    }

    try {
      const response = await apiClient.uploadPatch(`/news/${id}`, formData)

      if (!response) {
        throw new Error("Lỗi khi cập nhật dữ liệu.");
      }

      console.log("Đã cập nhật thành công!");
      fetchDataNews()
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setSelectedRegion(undefined);
    setSelectedCategory(undefined);
    setSelectedActivity(undefined);
    setIsFeatured(false);
    setSelectedFile(null);
  };


  useEffect(() => {
    setFilteredNews(News.filter((post: any) => {
      const matchesSearch =
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch && 
        (selectedFilterActivity === "all" || selectedFilterActivity === post?.categoryActivity?.nametag || !selectedFilterActivity) &&
        (selectedFilterCategory === "all" || selectedFilterCategory === post?.category?.nametag || !selectedFilterCategory) &&
        (selectedFilterRegion === "all" || selectedFilterRegion === post?.region?.nametag || !selectedFilterRegion) && (selectedFilterType === "all" || selectedFilterType === post?.type || !selectedFilterType)
    }))
  }, [News, selectedFilterActivity, selectedFilterCategory, selectedFilterRegion, searchTerm,selectedFilterType])


  return (
    <div className="p-6 space-y-6 overflow-auto max-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý bảng tin</h1>
        <Dialog >
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm} disabled={dataProfile?.role === "user"}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm bảng tin mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
            <DialogHeader >
              <DialogTitle>Thêm bảng tin mới</DialogTitle>
            </DialogHeader>
            <div className=" space-y-4 mt-4 ">
              <form className="space-y-4" onSubmit={handleSubmit}>
                

                
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                  <Input placeholder="Nhập tiêu đề bảng tin"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
                   
                  <div>
                    <label htmlFor="">Hình ảnh</label>

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
                <div className={`grid  ${(selectedType === "trong_nuoc" || !selectedType)?'grid-cols-1':'grid-cols-2'} gap-4`}>
                   <div>
                    <label htmlFor="">Loại tin tức</label>
                    <Select
                      value={selectedType?.toString()}
                      onValueChange={(value) => {
                        setSelectedActivity(undefined)
                        setSelectedRegion(undefined)
                        setSelectedCategory(undefined)
                        setSelectedType(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {/*  */}

                        {types?.map((region: any) => (
                          <SelectItem key={region.id} value={region?.id}>
                            {region?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                    <div hidden={selectedType !== "quoc_te"}>
                    <label htmlFor="">Hoạt động ngoài nước</label>
                    <Select
                      value={selectedRegion}
                      onValueChange={(value) => {
                        setSelectedRegion(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {Region?.map((region: any) => (
                          <SelectItem key={region.id} value={region?.id}>
                            {region?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div hidden={selectedType !== "quan_su"}>
                    <label htmlFor="">Hoạt động quân sự</label>

                    <Select
                      value={selectedCategory}
                      onValueChange={(value) => {
                        setSelectedCategory(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {categories.map((category: any) => (

                          <SelectItem key={category.id} value={category?.id}>
                            {category?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div hidden={selectedType !== "hoat_dong_su_doan"}>
                    <label htmlFor="">Hoạt động sư đoàn</label>

                    <Select
                      value={selectedActivity}
                      onValueChange={(value) => {
                        setSelectedActivity(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {categoriesActivity.map((CategoryActivity: any) => (

                          <SelectItem key={CategoryActivity?.id} value={CategoryActivity?.id}>
                            {CategoryActivity?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>


                </div>
                <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700">Đơn vị đăng tải(*)</label>
                  <Input placeholder="Nhập đơn vị đăng tải"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />
                </div>
               <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    className="rounded"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Gắn bảng tin nổi bật
                  </label>
                </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                  {/* <textarea
                    className="mt-1 w-full border rounded-md p-2"
                    rows={10}
                    placeholder="Nhập nội dung bảng tin"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  /> */}
                  {/* <RichTextEditor content="" onChange={()=>{}}/> */}
                  <SimpleEditor content="Thêm nội dung vào đây" onChange={(e) => setExcerpt(e)} />
                </div>
                <DialogFooter className="flex-shrink-0 mt-4">
                  <DialogClose asChild>
                    <Button type="button" className="mr-2">
                      Hủy
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>

                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Lưu bảng tin
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </div>

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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Bộ lọc và tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Tìm kiếm bảng tin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedFilterType} onValueChange={(value)=>{
                setSelectedFilterType(value)
                setSelectedFilterCategory(undefined)
                setSelectedFilterActivity(undefined)
                setSelectedFilterRegion(undefined)
                setCurrentPage(1)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Loại tin" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((category: any) => (
                    <SelectItem key={category.id} value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]" hidden={selectedFilterType !== "quan_su"}>
              <Select value={selectedFilterCategory} onValueChange={setSelectedFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="HĐ Quân Sự" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category?.nametag}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]" hidden={selectedFilterType !== "quoc_te"}>
              <Select value={selectedFilterRegion} onValueChange={setSelectedFilterRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="HĐ Ngoài Nước" />
                </SelectTrigger>
                <SelectContent>
                  {Region.map((region: any) => (
                    <SelectItem key={region?.id} value={region?.nametag}>
                      {region?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]" hidden={selectedFilterType !== "hoat_dong_su_doan"}>
              <Select value={selectedFilterActivity} onValueChange={setSelectedFilterActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="HĐ Sư Đoàn" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesActivity.map((item: any) => (
                    <SelectItem key={item.id} value={item.nametag}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="flex-1 min-w-[200px]">
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div> */}
          </div>

        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bảng tin ({filteredNews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentNew.map((post: any) => (
              <div key={post?.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{post?.title}</h3>
                    {post.featured && <Badge variant="destructive">Nổi bật</Badge>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {post?.category?.name && (
                      <Badge variant="outline">{post?.category?.name}</Badge>
                    )}

                    {post?.region?.name && (
                      <Badge variant="destructive">{post?.region?.name}</Badge>
                    )}

                    {post?.categoryActivity?.name && (
                      <Badge variant="default">{post?.categoryActivity?.name}</Badge>
                    )}

                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <Dialog o> */}

                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Xem bảng tin</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4">
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
 <div>
                            <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                            <Input placeholder="Nhập tiêu đề bảng tin" disabled
                              value={post.title}

                            />
                          </div>
                            <div>
                              <label htmlFor="">Hình ảnh</label>

                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                  onChange={handleFileChange}
                                  disabled
                                />

                                {/* {selectedFile && (
                                 
                                )} */}
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
                                      ✓ File đã được tải lên: <strong>{selectedFile?.name}</strong>
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
                              </div>
                            </div>
                          </div>
                         
                         

                          <div className={`grid ${(selectedType === "trong_nuoc" || !selectedType)?'grid-cols-1':'grid-cols-2'} gap-4`}>
                            <div>
                    <label htmlFor="">Loại tin tức</label>
                    <Select
                      value={post?.type}
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {/*  */}

                        {types?.map((region: any) => (
                          <SelectItem key={region.id} value={region?.id}>
                            {region?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                            <div hidden={!(post?.type === "quoc_te")}>
                              <label>Hoạt động ngoài nước</label>
                              <Select value={post?.region ? post.region.id : "undefined"} disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  
                                  {post?.region && (
                                    <SelectItem value={post.region.id}>{post?.region?.name}</SelectItem>
                                  )}

                                </SelectContent>
                              </Select>
                            </div>
                             <div hidden={!(post?.type === "quan_su")}>
                              <label>Hoạt động quân sự</label>
                              <Select value={post?.category ? post.category.id : "undefined"} disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  

                                  {post?.category && (
                                    <SelectItem value={post.category.id}>{post?.category?.name}</SelectItem>
                                  )}

                                </SelectContent>
                              </Select>
                            </div>

                            <div hidden={!(post?.type === "hoat_dong_su_doan")}>
                              <label>Hoạt động sư đoàn</label>
                              <Select value={post?.categoryActivity ? post.categoryActivity.id : "undefined"} disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  

                                  {post?.categoryActivity && (
                                    <SelectItem value={post.categoryActivity.id}>{post?.categoryActivity?.name}</SelectItem>
                                  )}

                                </SelectContent>
                              </Select>
                            </div>
                         
                          </div>

                         <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Đơn vị đăng tải(*)</label>
                            <Input placeholder="Nhập đơn vị đăng tải"
                              value={post?.author}
                              disabled />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="featured" className="rounded" disabled
                              checked={post.featured} />
                            <label htmlFor="featured" className="text-sm text-gray-700">
                              Gắn bảng tin nổi bật
                            </label>
                          </div>
                         </div>
 <div>
                            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                            {/* <textarea
                              className="mt-1 w-full border rounded-md p-2"
                              rows={10}
                              placeholder="Nhập nội dung bảng tin"
                              value={post.excerpt}
                              disabled /> */}
                            {/* <div className="body-image-with-caption figcaption"> */}
                            <div className="body-image-with-caption figcaption" dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                            {/* </div> */}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>

                              <Button type="button" >
                                Hủy
                              </Button>
                            </DialogClose>

                          </DialogFooter>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>


                  <Dialog onOpenChange={(open) => {
                    if (open) handleFocusUpdate(post);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm"  disabled={dataProfile?.role === "user"}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
                      <DialogHeader >
                        <DialogTitle>Cập nhật bảng tin</DialogTitle>
                      </DialogHeader>
                      <div className=" space-y-4 mt-4 ">
                        <form className="space-y-4" onSubmit={(e) => handleSubmitUp(e, post.id)}>
                        

                        

                         

                          <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                  <Input placeholder="Nhập tiêu đề bảng tin"
                    defaultValue={post?.title}
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
                   
                  <div>
                              <label htmlFor="">Hình ảnh</label>

                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                  onChange={handleFileChange}
                                />

                                {/* {selectedFile && ( */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                                  {previewUrl && (
                                    <img
                                      src={previewUrl ?? ""}
                                      alt="Preview"
                                      className="w-24 h-24 object-cover rounded"
                                    />
                                  )}
                                  {
                                    selectedFile &&
                                    <div>
                                      <span className="text-sm text-green-700 block">
                                        ✓ File đã được tải lên: <strong>{selectedFile?.name}</strong>
                                      </span>
                                      <button
                                        onClick={handleRemoveFile}
                                        className="text-red-500 text-sm hover:underline mt-1"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  }

                                </div>
                                {/* )} */}
                              </div>
                            </div>
                </div>
                <div className={`grid  ${(selectedType === "trong_nuoc" || !selectedType)?'grid-cols-1':'grid-cols-2'} gap-4`}>
                   <div>
                    <label htmlFor="">Loại tin tức</label>
                    <Select
                      defaultValue={post?.type}
                      onValueChange={(value) => {
                        setSelectedActivity(undefined)
                        setSelectedRegion(undefined)
                        setSelectedCategory(undefined)
                        setSelectedType(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {/*  */}

                        {types?.map((region: any) => (
                          <SelectItem key={region.id} value={region?.id}>
                            {region?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                    <div hidden={selectedType !== "quoc_te"}>
                    <label htmlFor="">Hoạt động ngoài nước</label>
                    <Select
                      defaultValue={post?.region?.id}
                      onValueChange={(value) => {
                        setSelectedRegion(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {Region?.map((region: any) => (
                          <SelectItem key={region.id} value={region?.id}>
                            {region?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div hidden={selectedType !== "quan_su"}>
                    <label htmlFor="">Hoạt động quân sự</label>

                    <Select
                      defaultValue={post?.category?.id}
                      onValueChange={(value) => {
                        setSelectedCategory(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {categories.map((category: any) => (

                          <SelectItem key={category.id} value={category?.id}>
                            {category?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div hidden={selectedType !== "hoat_dong_su_doan"}>
                    <label htmlFor="">Hoạt động sư đoàn</label>

                    <Select
                      value={post?.categoryActivity?.id}
                      onValueChange={(value) => {
                        setSelectedActivity(value === "undefined" ? undefined : value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        

                        {categoriesActivity.map((CategoryActivity: any) => (

                          <SelectItem key={CategoryActivity?.id} value={CategoryActivity?.id}>
                            {CategoryActivity?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>


                </div>
                <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Đơn vị đăng tải(*)</label>
                  <Input placeholder="Nhập đơn vị đăng tải"
                    defaultValue={post?.author ?? ""}
                    onChange={(e) => setAuthor(e.target.value)} />
                </div>
               <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    className="rounded"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Gắn bảng tin nổi bật
                  </label>
                </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                  {/* <textarea
                    className="mt-1 w-full border rounded-md p-2"
                    rows={10}
                    placeholder="Nhập nội dung bảng tin"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  /> */}
                  {/* <RichTextEditor content="" onChange={()=>{}}/> */}
                  <SimpleEditor content={post?.excerpt ?? ""} onChange={(e) => setExcerpt(e)} />
                </div>
                          <DialogFooter className="flex-shrink-0 mt-4">
                            <DialogClose asChild>
                              <Button type="button" className="mr-2">
                                Hủy
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>

                              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Lưu bảng tin
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>

                      </div>

                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(post.id)}
                    disabled={dataProfile?.role === "user"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>
              </div>
            ))}
          </div>
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
    </div >
  )
}
