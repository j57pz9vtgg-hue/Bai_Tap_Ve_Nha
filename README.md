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

- Mật khẩu vào ứng dụng: khóa giao diện cơ bản theo lựa chọn dùng GitHub Pages. Cấu hình chứa salt và bản băm PBKDF2-SHA256 trong `src/accessConfig.ts`. Phiên đăng nhập lưu trong `sessionStorage`.
- **Ghi nhớ đăng nhập** lưu mật khẩu đã xác nhận dưới dạng mã hóa trong IndexedDB, cùng khóa trình duyệt không thể xuất. Khi đăng xuất hoặc quay lại màn hình đăng nhập, mật khẩu được điền sẵn dưới dạng dấu chấm; người dùng vẫn phải bấm **Đăng nhập**. Chọn ghi nhớ không tự đăng nhập. **Đăng xuất** kết thúc phiên nhưng giữ mật khẩu đã nhớ, dữ liệu bài làm và mật khẩu phụ huynh; **bỏ tích** để xóa mật khẩu đã nhớ. Mật khẩu trống/sai không được lưu. Cấu hình truy cập thay đổi sẽ làm mất hiệu lực mật khẩu đã nhớ cũ.
- Mật khẩu phụ huynh: phụ huynh tự thiết lập sau khi vào ứng dụng, tối thiểu 6 ký tự, bắt buộc khác mật khẩu đăng nhập. Đổi mật khẩu cần mật khẩu phụ huynh hiện tại. Salt/bản băm lưu riêng ở `homework-parent-password:v1` trên trình duyệt này.
- Điểm số, đáp án và lời giải chỉ được hiển thị sau khi nhập đúng mật khẩu phụ huynh. Mỗi lần mở lại kết quả phải nhập lại. Thẻ đề chỉ thông báo kết quả đã lưu.
- Đây là khóa thao tác ở phía trình duyệt, không phải xác thực máy chủ. GitHub Pages vẫn phục vụ tệp tĩnh; mã nguồn và dữ liệu lưu cục bộ có thể được xem bằng công cụ phát triển. Chủ đề, bài làm, kết quả và khóa phụ huynh có thể đồng bộ bằng tài khoản Firebase được cấu hình; phải kết nối thành công trước khi coi dữ liệu đã lưu trực tuyến.

Để đổi mật khẩu truy cập dùng chung, đọc mật khẩu từ đầu vào chuẩn, không ghi mật khẩu vào kho mã. Ví dụ trong Bash:

```sh
read -rs -p "Mật khẩu đăng nhập mới: " app_password
printf '%s' "$app_password" | npm run configure-access
unset app_password
```

Khi chuyển từ bản ghi nhớ tự đăng nhập cũ sang bản điền sẵn mật khẩu mới, nhập mật khẩu và chọn Ghi nhớ một lần để lưu lại. Từ đó, đăng xuất vẫn giữ mật khẩu được điền sẵn.

Sau đó build và xuất bản lại. Khi cấu hình thay đổi, phiên đăng nhập cũ hết hiệu lực. Mật khẩu phụ huynh không thay đổi theo cấu hình này.

## Chức năng

- Chọn lớp 1–5, chương trình TIMO/ASMO hoặc Báo bài của trường, môn học, nội dung luyện tập. Banner và bộ lọc cố định khi cuộn.
- Đề vòng loại TIMO lớp 2 hiện có Đề số 1, gồm 25 câu và đáp án/lời giải do chủ ứng dụng cung cấp. Các câu tạm ở nhóm Chưa có chủ đề.
- Báo bài của trường có Toán, Tiếng Việt, ESL, Math và Science.
- Mỗi bài có 15 phút; tự lưu câu trả lời, tiếp tục bài đang làm và tự nộp khi hết giờ.
- Trang làm đề giới hạn chiều ngang A4. Hộp kết quả gọn hơn. Phần xem lại có hai cột câu hỏi/lời giải trên máy tính và xếp dọc trên điện thoại; không còn các ghi chú cuối đề đã bỏ.
- Kết quả lưu cả câu trả lời và bản lưu nội dung câu hỏi để xem đúng bài cũ; không tạo sẵn các điểm minh họa.

## Dữ liệu

Đã nhập **Đề số 1 – Vòng loại TIMO lớp 2**, gồm 25 câu song ngữ, lựa chọn, hình đề bài và 25 đáp án/lời giải do chủ ứng dụng cung cấp. Dữ liệu nguồn nằm ở `src/content/timo-grade2-qualifier1.ts`. Hình vẽ được tái tạo bằng SVG trong `src/QuestionIllustration.tsx`; các chú thích lời giải chỉ hiển thị sau mật khẩu phụ huynh.

Theo yêu cầu mới nhất, 5 chủ đề và toàn bộ ví dụ cũ đã bị xóa. Tất cả 25 câu tạm nằm trong **Chưa có chủ đề**, chờ chủ ứng dụng gửi lại danh mục chủ đề mới. Không tự phục hồi các chủ đề cũ.

Chỉ ghi nhận đề, đáp án và lời giải do chủ ứng dụng gửi. Không tự giải, suy luận hay điền đáp án thiếu. Câu chưa được cung cấp đáp án dùng `correct: null`; bài thiếu đáp án không được chấm điểm. Xem quy tắc bắt buộc trong `AGENTS.md`.

Giữ khóa `dino-homework:v1`. Dấu `homework-real-content-reset:v1` chỉ xóa dữ liệu minh họa cũ một lần; không xóa các bài thật đã lưu, mật khẩu hoặc giao diện. Xóa dữ liệu trình duyệt sẽ xóa kết quả và mật khẩu phụ huynh.

## GitHub Pages

Website: https://j57pz9vtgg-hue.github.io/Bai_Tap_Ve_Nha/

Workflow `.github/workflows/deploy-pages.yml` build/xuất bản khi `main` thay đổi, kiểm tra trang công khai cùng hình ảnh và phông chữ. Build đặt `VITE_BASE_PATH=/Bai_Tap_Ve_Nha/`. Phát triển cục bộ dùng `/`.

React 19, TypeScript, Vite, Lucide, hình WebP, Baloo 2 và Be Vietnam Pro lưu cục bộ.


## Đồng bộ Firebase

Dự án hiện dùng `goc-hoc-tap-cua-be-19a0b`, tài khoản Email/Password `gochoctapcuabe01@gmail.com`, UID `7Ek9VDZPrSYFuJNlwVpGgDk481l2`. Cấu hình web ở `src/cloud/firebaseConfig.ts` là thông tin công khai, không phải khóa quản trị. Không đưa mật khẩu, service account hay private key vào mã nguồn.

1. Mở ứng dụng trên máy đang có dữ liệu và đăng nhập như trước. Ứng dụng thử kết nối Firebase bằng mật khẩu vừa nhập.
2. Nếu mật khẩu Firebase khác mật khẩu vào ứng dụng, bấm biểu tượng đám mây → nhập **mật khẩu tài khoản đồng bộ** một lần → Kết nối đồng bộ. Không cần đăng nhập Google. Firebase SDK giữ phiên trên trình duyệt đó; cần kết nối lại khi ngắt kết nối, xóa dữ liệu trình duyệt hoặc phiên không còn hợp lệ.
3. Đợi trạng thái **Đã đồng bộ** trước khi mở trên máy khác. Máy mới dùng cùng tài khoản và sẽ nhận chủ đề, bài mẫu đã gắn, câu đã chọn, lớp học, kết quả, bài đang làm và khóa phụ huynh.

Website vẫn ở GitHub Pages. Không dùng Firebase Hosting hoặc Analytics. `firestore.rules` khớp quy tắc chủ ứng dụng đã xuất bản: chỉ UID được cấu hình có quyền truy cập vùng `/users/{UID}/...` của chính mình. Nếu đổi tài khoản, phải đổi cả UID trong cấu hình và Rules; không xóa dữ liệu cũ để xử lý lỗi đăng nhập.

Dữ liệu lưu theo từng bản ghi `/users/{UID}/records/{recordId}`. Chủ đề dùng mã nguồn câu hỏi làm tham chiếu; bài làm và kết quả giữ nguyên snapshot câu hỏi, câu trả lời và thời hạn. Transaction đọc phiên bản mới nhất trước khi ghi, ghép thay đổi độc lập và báo xung đột khi hai máy sửa cùng giá trị. Xóa chủ đề tạo dấu xóa để máy khác không khôi phục lại bản cũ. Khi đang mở bài, đáp án vừa nhập ở máy khác trong cùng lượt làm được cập nhật mà không đổi thời hạn.

Dữ liệu cục bộ vẫn tồn tại. Có bản dự phòng IndexedDB trước lần đồng bộ đầu tiên; nút **Tải bản sao dữ liệu trên máy** xuất dữ liệu hiện tại, không chứa mật khẩu đăng nhập hoặc token Firebase. Khi đang mở ứng dụng và mất mạng, thao tác được lưu trên máy rồi thử đồng bộ lại khi kết nối trở lại. Chưa có chế độ PWA để bảo đảm tải ứng dụng/màn hình chưa mở khi hoàn toàn ngoại tuyến.

Các thao tác độc lập được ghép tự động. Nếu có xung đột, mở biểu tượng đám mây và chọn **Giữ bản trên máy này** hoặc **Dùng bản trực tuyến** cho riêng bản ghi bị xung đột; có thể tải bản sao trước khi chọn. Chỉ trạng thái **Đã đồng bộ** mới xác nhận hàng đợi hiện tại đã được xử lý. Lỗi mạng, quyền, hạn mức, dữ liệu hỏng hoặc bản ghi lớn hơn 850 KB được báo rõ, không âm thầm cắt dữ liệu. Giao diện và mật khẩu đăng nhập ứng dụng đã nhớ vẫn là tùy chọn riêng của thiết bị.

Kiểm tra tự động: `npm run test:sync` chạy các trường hợp ghép câu/đáp án, xóa, xung đột, giữ nguyên snapshot/thời hạn và đủ350 câu nguồn. Bộ giả lập Firebase chính thức cần tải công cụ từ `storage.googleapis.com`; không coi kiểm thử mô phỏng transport là kiểm chứng đăng nhập hay Rules trên Firebase thật.
