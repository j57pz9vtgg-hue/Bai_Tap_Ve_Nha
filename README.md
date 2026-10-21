# Góc học tập của bé

Ứng dụng luyện tập với Pixel và 6 giao diện mới: Công viên khủng long, Đảo khủng long 3D, Nhà khám phá khủng long, Robot, Vũ trụ, Thỏ con. Nút bảng màu trên trang chính mở lựa chọn giao diện; phần Góc phụ huynh chỉ có thiết lập/đổi mật khẩu.

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

## Mật khẩu

- Mật khẩu vào ứng dụng: khóa giao diện cơ bản theo lựa chọn dùng GitHub Pages. Cấu hình chỉ chứa salt và bản băm PBKDF2-SHA256 trong `src/accessConfig.ts`, không chứa mật khẩu rõ. Phiên truy cập lưu trong `sessionStorage`; Đăng xuất khóa lại ứng dụng và giữ dữ liệu bài làm.
- Mật khẩu phụ huynh: phụ huynh tự thiết lập sau khi vào ứng dụng, tối thiểu 6 ký tự, bắt buộc khác mật khẩu đăng nhập. Đổi mật khẩu cần mật khẩu phụ huynh hiện tại. Salt/bản băm lưu riêng ở `homework-parent-password:v1` trên trình duyệt này.
- Điểm số, đáp án và lời giải chỉ được hiển thị sau khi nhập đúng mật khẩu phụ huynh. Mỗi lần mở lại kết quả phải nhập lại. Thẻ đề chỉ thông báo kết quả đã lưu.
- Đây là khóa thao tác ở phía trình duyệt, không phải xác thực máy chủ. GitHub Pages vẫn phục vụ tệp tĩnh; mã nguồn và dữ liệu lưu cục bộ có thể được xem bằng công cụ phát triển. Mật khẩu phụ huynh và kết quả chưa đồng bộ giữa thiết bị.

Để đổi mật khẩu truy cập dùng chung, đọc mật khẩu từ đầu vào chuẩn, không ghi mật khẩu vào kho mã. Ví dụ trong Bash:

```sh
read -rs -p "Mật khẩu đăng nhập mới: " app_password
printf '%s' "$app_password" | npm run configure-access
unset app_password
```

Sau đó build và xuất bản lại. Khi cấu hình thay đổi, phiên đăng nhập cũ hết hiệu lực. Mật khẩu phụ huynh không thay đổi theo cấu hình này.

## Chức năng

- Chọn lớp 1–5, chương trình TIMO/ASMO hoặc Báo bài của trường, môn học, nội dung luyện tập. Banner và bộ lọc cố định khi cuộn.
- Danh mục hiện trống: đã xóa toàn bộ đề, câu hỏi, đáp án và bài giải minh họa. Chỉ thêm tài liệu thật do chủ ứng dụng cung cấp.
- Báo bài của trường có Toán, Tiếng Việt, ESL, Math và Science.
- Mỗi bài có 15 phút; tự lưu câu trả lời, tiếp tục bài đang làm và tự nộp khi hết giờ.
- Trang làm đề giới hạn chiều ngang A4. Hộp kết quả gọn hơn. Phần xem lại có hai cột câu hỏi/lời giải trên máy tính và xếp dọc trên điện thoại; không còn các ghi chú cuối đề đã bỏ.
- Kết quả lưu cả câu trả lời và bản lưu nội dung câu hỏi để xem đúng bài cũ; không tạo sẵn các điểm minh họa.

## Dữ liệu

Chỉ ghi nhận đề, đáp án và lời giải do chủ ứng dụng gửi. Không tự giải, suy luận hay điền đáp án thiếu. Câu chưa được cung cấp đáp án dùng `correct: null`; bài thiếu đáp án không được chấm điểm. Xem quy tắc bắt buộc trong `AGENTS.md`. Danh mục dữ liệu ở `src/data.ts` hiện trống.

Giữ khóa `dino-homework:v1`. Lần đầu mở bản cập nhật bỏ nội dung mẫu, ứng dụng xóa kết quả và bài làm thử cũ một lần bằng dấu `homework-real-content-reset:v1`, giữ lớp đã chọn, mật khẩu và giao diện. Xóa dữ liệu trình duyệt sẽ xóa kết quả và mật khẩu phụ huynh.

## GitHub Pages

Website: https://j57pz9vtgg-hue.github.io/Bai_Tap_Ve_Nha/

Workflow `.github/workflows/deploy-pages.yml` build/xuất bản khi `main` thay đổi, kiểm tra trang công khai cùng hình ảnh và phông chữ. Build đặt `VITE_BASE_PATH=/Bai_Tap_Ve_Nha/`. Phát triển cục bộ dùng `/`.

React 19, TypeScript, Vite, Lucide, hình WebP, Baloo 2 và Be Vietnam Pro lưu cục bộ.
