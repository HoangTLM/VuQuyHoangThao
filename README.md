# 💍 THIỆP MỜI CƯỚI ONLINE (SINGLE PAGE WEDDING INVITATION)

Trang web thiệp cưới online dạng Single Page hiện đại, lãng mạn, tối ưu 100% cho thiết bị di động (Mobile-First) và **chạy trực tiếp trên GitHub Pages hoàn toàn miễn phí**.

---

## 🌟 TÍNH NĂNG NỔI BẬT

- 💌 **Hiệu ứng phong bì thư 3D:** Mở phong bì kèm tự động phát nhạc cưới du dương.
- 🎵 **Trình phát nhạc đĩa than nổi:** Cho phép bật/tắt nhạc dễ dàng khi lướt web.
- ✨ **Hiệu ứng cuộn mượt mà (AOS):** Từng khối thông tin xuất hiện uyển chuyển, ảnh trượt từ 2 bên.
- 🌸 **Cánh hoa hồng rơi (Canvas):** Hiệu ứng lãng mạn nhẹ nhàng 60fps, không tốn pin.
- ⏳ **Đồng hồ đếm ngược:** Đếm ngược ngày - giờ - phút - giây đến thời điểm khai tiệc.
- 🗺️ **Sự kiện & Bản đồ:** Tích hợp nút **Chỉ đường Google Maps** và nút **Thêm vào Google Calendar**.
- 📸 **Album ảnh cưới Lightbox:** Phóng to ảnh sắc nét, hỗ trợ vuốt chuyển ảnh trên điện thoại.
- ✉️ **Cá nhân hóa lời mời:** Nhập `?to=TenKhach` trên đường link để hiển thị tên khách mời trang trọng.
- 📝 **Sổ lưu bút & RSVP:** Khách xác nhận tham dự và gửi lời chúc phúc kèm pháo hoa chúc mừng.
- 🎁 **Mừng cưới online:** Tích hợp mã VietQR chuẩn ngân hàng + nút bấm sao chép số tài khoản 1-chạm.

---

## 🚀 HƯỚNG DẪN 3 BƯỚC ĐƯA LÊN GITHUB PAGES (MIỄN PHÍ 100%)

### Bước 1: Đẩy mã nguồn lên GitHub
1. Mở cửa sổ dòng lệnh tại thư mục dự án và khởi tạo Git:
   ```bash
   git init
   git add .
   git commit -m "Khoi tao thiep cuoi online"
   ```
2. Tạo 1 repository mới trên [GitHub.com](https://github.com) (chọn chế độ **Public**).
3. Đẩy code lên GitHub:
   ```bash
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git branch -M main
   git push -u origin main
   ```

### Bước 2: Bật tính năng GitHub Pages
1. Tại trang GitHub của repository, bấm vào mục **Settings** (ở thanh menu trên cùng).
2. Ở cột bên trái, chọn **Pages**.
3. Tại mục **Build and deployment**:
   - **Source:** Chọn `Deploy from a branch`.
   - **Branch:** Chọn `main`, thư mục để `/ (root)`.
   - Bấm nút **Save**.

### Bước 3: Nhận link thiệp cưới online
Chờ khoảng 30 - 60 giây, GitHub sẽ cấp cho bạn đường link website có dạng:
```text
https://<tai-khoan-cua-ban>.github.io/<ten-repo>/
```
👉 Bạn đã có thể gửi link này cho bạn bè và người thân ngay lập tức!

---

## 🎨 CÁCH TÙY BIẾN THÔNG TIN & HÌNH ẢNH

### 1. Thay đổi thông tin cá nhân (Tên, ngày cưới, ngân hàng, địa điểm)
Mở file **`js/config.js`** bằng Notepad hoặc VS Code. Toàn bộ thông tin được chú thích bằng tiếng Việt rất rõ ràng:
- `groom`: Tên chú rể, phụ mẫu, lời giới thiệu.
- `bride`: Tên cô dâu, phụ mẫu, lời giới thiệu.
- `weddingDate`: Định dạng thời gian đếm ngược (ví dụ: `2026-12-28T11:00:00`).
- `events`: Danh sách thời gian, địa điểm, link Google Maps các buổi lễ.
- `story`: Các cột mốc tình yêu.
- `bankAccounts`: Số tài khoản, tên ngân hàng, mã VietQR nhận mừng cưới.

### 2. Cách thay ảnh cưới bằng ảnh thật
Bạn chỉ cần thay thế các link ảnh trong `js/config.js` bằng ảnh của bạn, hoặc copy file ảnh vào thư mục `assets/images/`:
```text
assets/images/
├── cover.jpg          # Ảnh bìa màn hình đầu
├── groom.jpg          # Ảnh chân dung chú rể
├── bride.jpg          # Ảnh chân dung cô dâu
├── story/             # Ảnh các mốc kỷ niệm
└── gallery/           # Album ảnh cưới (01.jpg, 02.jpg...)
```

### 3. Cách tạo link gửi cho từng khách mời (Cá nhân hóa)
Chỉ cần thêm đuôi `?to=Tên_Khách` vào cuối đường link thiệp:
- Ví dụ: `https://ten-user.github.io/thiep-cuoi/?to=Anh+Minh+Hoang`
- Khi mở ra, trang web và phong bì sẽ tự động hiển thị: *"Trân trọng kính mời: Anh Minh Hoang"*.
