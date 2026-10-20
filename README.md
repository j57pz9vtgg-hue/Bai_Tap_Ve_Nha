# Góc học tập của bé

Ứng dụng luyện tập với một giao diện pixel duy nhất: thế giới đảo bay, thanh lọc 4 mục và lưới đề bài đánh số. Các giao diện Khủng long, Vũ trụ, Vườn học tập đã được gỡ bỏ.

## Chạy ứng dụng

Node.js 20.19+ hoặc 22.12+.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Chức năng

- Chọn lớp 1–5, chương trình TIMO/ASMO hoặc Báo bài của trường, môn học, nội dung luyện tập.
- TIMO/ASMO hiện có 15 bài vòng loại và 15 bài Quốc gia mẫu, cùng 3 chủ đề. Các bài số học có số liệu thay đổi theo lớp và số đề.
- Báo bài của trường có Toán, Tiếng Việt, ESL, Math và Science.
- Mỗi bài có 15 phút, lưu câu trả lời đang làm, tự nộp khi hết giờ, chấm điểm và xem lời giải.
- Thẻ bài hiển thị kết quả và thời gian thực tế; có Xem kết quả, Làm lại hoặc Tiếp tục.
- Kết quả mới lưu cả câu trả lời và nội dung câu hỏi để xem lại chính xác sau này.
- Góc phụ huynh xem kết quả và hướng dẫn.

## Dữ liệu

Nội dung hiện là **bài luyện tập mẫu**, không phải đề thi chính thức hoặc bài báo thực tế của trường. Không tạo sẵn kết quả minh họa cho bé. Dữ liệu nằm trong `src/data.ts`.

Giữ nguyên khóa lưu trữ `dino-homework:v1` để bảo toàn kết quả và bài đang làm từ các giao diện trước. Các kết quả cũ không có thời gian hoặc câu trả lời chi tiết sẽ hiển thị “—” và thông báo phù hợp. Dữ liệu được lưu bằng `localStorage` trên trình duyệt này, chưa có tài khoản hoặc đồng bộ thiết bị. Xóa dữ liệu trình duyệt sẽ xóa kết quả.

## GitHub Pages

Website: https://j57pz9vtgg-hue.github.io/Bai_Tap_Ve_Nha/

Workflow `.github/workflows/deploy-pages.yml` build và xuất bản khi `main` thay đổi, sau đó kiểm tra trang công khai và các hình pixel. Build đặt `VITE_BASE_PATH=/Bai_Tap_Ve_Nha/` để chạy đúng dưới đường dẫn kho mã. Phát triển cục bộ dùng `/`.

React 19, TypeScript, Vite, Lucide, hình pixel WebP, phông chữ Baloo 2 và Be Vietnam Pro lưu cục bộ.
