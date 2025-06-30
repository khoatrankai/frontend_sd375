import axios from 'axios';
import React from 'react';

// Định nghĩa interface cho các props của component
interface ImageDownloaderAdvancedProps {
  imageUrl: string; // URL của ảnh
  imageName: string; // Tên gợi ý khi tải file xuống
}

const ImageDownloaderAdvanced: React.FC<ImageDownloaderAdvancedProps> = ({ imageUrl, imageName }) => {
  const handleDownload = async () => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'blob',
      withCredentials: true, // nếu server yêu cầu
    });

    const blobUrl = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);

    alert(`Đã tải xuống ảnh: ${imageName}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      alert(`Không thể tải ảnh: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
      alert('Không thể tải ảnh. Lỗi không xác định.');
    }
  }
};

  return (
    <div>
      <p>download</p>
      <button onClick={handleDownload}>
        Tải ảnh "{imageName}" xuống
      </button>
      <p>
        {/* Hiển thị ảnh xem trước */}
        <img src={imageUrl} alt={imageName} style={{ maxWidth: '300px', marginTop: '20px' }} />
      </p>
    </div>
  );
};

export default ImageDownloaderAdvanced;

// Cách sử dụng trong một file TSX khác (ví dụ: pages/index.tsx):
// import ImageDownloaderAdvanced from '../components/ImageDownloaderAdvanced'; // Giả sử component nằm trong thư mục components
//
// export default function HomePage() {
//   return (
//     <div>
//       <h1>Tải ảnh nâng cao</h1>
//       <ImageDownloaderAdvanced imageUrl="https://picsum.photos/id/237/800/600" imageName="my-advanced-image.jpg" />
//       <ImageDownloaderAdvanced imageUrl="https://example.com/non-existent-image.jpg" imageName="error-test.jpg" />
//     </div>
//   );
// }