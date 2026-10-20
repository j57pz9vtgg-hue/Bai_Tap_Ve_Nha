# Góc học tập của bé 🦕

Ứng dụng luyện tập dành cho học sinh tiểu học, với giao diện khám phá thế giới khủng long.

## Chạy ứng dụng

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```sh
npm ci
npm run dev
```

Vite chạy tại cổng 5173. Có thể chỉ định cổng bằng `npm run dev -- --port 5173`.

```sh
npm run build
npm run preview
```

## Chức năng

- Ba giao diện Khủng long / Vũ trụ / Vườn học tập, chuyển bằng bộ chọn dưới logo (trên điện thoại: mở menu). Giao diện được ghi nhớ riêng, dùng chung bài tập và kết quả. Vườn học tập có chế độ xem dạng lưới/danh sách và lối tắt vào tiến độ, cài đặt giao diện.

- Chọn lớp 1–5; tìm bài tập có hoặc không có dấu tiếng Việt.
- TIMO, ASMO: tất cả đề, đề vòng loại, đề Quốc gia, luyện theo chủ đề.
- Báo bài của trường: Toán, Tiếng Việt, ESL, Math, Science.
- Bài trắc nghiệm 15 phút, chuyển câu, tự nộp khi hết giờ, chấm điểm và xem lời giải.
- Lưu bài đang làm và kết quả gần nhất của mỗi bài bằng `localStorage`.
- Góc phụ huynh xem kết quả và hướng dẫn; menu thu gọn trên điện thoại.

## Xuất bản lên GitHub Pages

Mã trên môi trường phát triển không tự cập nhật website công khai. Cần đưa thay đổi lên nhánh `main` của kho GitHub.

Trong **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Workflow `.github/workflows/deploy-pages.yml` sẽ build và xuất bản khi nhánh `main` thay đổi hoặc khi chạy thủ công từ tab Actions.

Địa chỉ: `https://j57pz9vtgg-hue.github.io/Bai_Tap_Ve_Nha/`.

Workflow đặt `VITE_BASE_PATH=/Bai_Tap_Ve_Nha/` để hình ảnh, phông chữ và JavaScript hoạt động dưới đường dẫn kho mã. Phát triển cục bộ vẫn dùng `/`.

## Phạm vi dữ liệu

Các đề, bài tập và lời giải hiện tại là **dữ liệu luyện tập mẫu**, không phải đề thi TIMO/ASMO chính thức hoặc bài báo thực tế của trường. Dữ liệu bài tập nằm trong `src/data.ts`.

Ứng dụng hiện hoạt động hoàn toàn trên trình duyệt, chưa có đăng nhập, cơ sở dữ liệu, tải đề lên hoặc đồng bộ giữa các thiết bị. Xóa dữ liệu trình duyệt sẽ xóa bài đang làm và kết quả. Đồng hồ bài đang làm tiếp tục chạy khi đóng hộp thoại hoặc tải lại trang.

## Công nghệ

React 19, TypeScript, Vite, Lucide. Hình minh họa được tạo riêng theo mẫu thiết kế và tối ưu WebP. Phông chữ Baloo 2 và Be Vietnam Pro hỗ trợ tiếng Việt.

## Bố cục và bộ lọc

Menu trái gồm Tất cả đề, Đề vòng loại, Đề Quốc gia, Luyện theo chủ đề. Chọn lớp, chương trình (TIMO, ASMO, Báo bài của trường) và môn học trong thanh lọc phía trên danh sách. TIMO/ASMO hiện có bài Toán mẫu; các môn còn lại nằm trong chương trình Báo bài của trường. Xem tiến độ qua mục Phụ huynh.
