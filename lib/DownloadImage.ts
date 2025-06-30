export const downloadFile = async (_link: string, name?: string) => {
  const response = await fetch(_link, { mode: "cors" });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  // Lấy phần đuôi mở rộng từ URL (cả query param lẫn pathname)

  const extractExtensionTitle = (_url: string): string => {
    try {
      const urlObj = new URL(_url, window.location.origin);
      const idParam = urlObj.searchParams.get("id"); // e.g., 574c264f...png
      return idParam || ""
    } catch {
      return "";
    }
  };
  const extractExtension = (_url: string): string => {
    try {
      const urlObj = new URL(_url, window.location.origin);
      const idParam = urlObj.searchParams.get("id"); // e.g., 574c264f...png
      const filename = idParam || urlObj.pathname.split("/").pop() || "";
      const extMatch = filename.match(/\.[a-zA-Z0-9]+$/);
      return extMatch ? extMatch[0] : "";
    } catch {
      return "";
    }
  };

  const extension = extractExtension(_link);
  const title = extractExtensionTitle(_link);
  const defaultName = title + extension;

  const link = document.createElement("a");
  link.href = url;
  link.download = name ?? defaultName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
