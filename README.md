# Sư đoàn phòng không 375 - Website

Cổng thông tin điện tử chính thức của Sư đoàn phòng không 375

## 🚀 Tính năng

- **Trang chủ**: Slideshow, tin tức nổi bật, hình ảnh, phần mềm mới
- **Giới thiệu**: Lịch sử, phần thưởng, lãnh đạo, liên hệ
- **Tin tức**: Trong nước, quốc tế, quân sự, hoạt động sư đoàn
- **Thư viện**: Hình ảnh, video, audio, phần mềm
- **Chuyên đề**: CCHC, tuyên truyền, pháp luật, KHQS
- **Văn bản**: Quản lý và tìm kiếm văn bản
- **Admin**: Hệ thống quản trị hoàn chỉnh

## 🛠️ Công nghệ

- **Framework**: Next.js 14 (App Router)
- **UI**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Authentication**: JWT
- **Database**: PostgreSQL (có thể thay đổi)

## 📦 Cài đặt

1. **Clone repository**
\`\`\`bash
git clone <repository-url>
cd su-doan-375-website
\`\`\`

2. **Cài đặt dependencies**
\`\`\`bash
npm install
# hoặc
yarn install
\`\`\`

3. **Cấu hình môi trường**
\`\`\`bash
cp .env.example .env.local
# Chỉnh sửa các biến môi trường trong .env.local
\`\`\`

4. **Chạy development server**
\`\`\`bash
npm run dev
# hoặc
yarn dev
\`\`\`

5. **Mở trình duyệt**
\`\`\`
http://localhost:3000
\`\`\`

## 🔐 Admin

- **URL**: `/admin/login`
- **Tài khoản**: `admin`
- **Mật khẩu**: `admin123`

## 📁 Cấu trúc thư mục

\`\`\`
├── app/                    # Next.js App Router
│   ├── admin/             # Trang quản trị
│   ├── api/               # API routes
│   ├── gioi-thieu/        # Trang giới thiệu
│   ├── tin-tuc/           # Trang tin tức
│   ├── thu-vien/          # Trang thư viện
│   ├── chuyen-de/         # Trang chuyên đề
│   └── van-ban-tai-lieu/  # Trang văn bản
├── components/            # React components
├── lib/                   # Utilities
├── services/              # API services
├── hooks/                 # Custom hooks
└── types/                 # TypeScript types
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t su-doan-375 .
docker run -p 3000:3000 su-doan-375
\`\`\`

### Manual
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code style
- `npm run type-check` - Kiểm tra TypeScript

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Thông tin user
- `POST /api/auth/logout` - Đăng xuất

### Content Management
- `GET /api/posts` - Danh sách bài viết
- `GET /api/media` - Danh sách media
- `GET /api/documents` - Danh sách văn bản
- `GET /api/users` - Danh sách người dùng

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Copyright © 2024 Sư đoàn phòng không 375. All rights reserved.

## 📞 Liên hệ

- **Điện thoại**: 777322
- **Email**: banthongtin.f375@mail.bqp
- **Địa chỉ**: Trạm CNTT F375
#   f r o n t e n d _ s d 3 7 5  
 #   f r o n t e n d _ s d 3 7 5  
 