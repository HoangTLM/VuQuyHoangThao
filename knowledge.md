# 🧠 KNOWLEDGE BASE - THIỆP CƯỚI ONLINE (LỄ VU QUY VI THẢO & MINH HOÀNG)

> File này dùng làm tài liệu ngữ cảnh nhanh (Context / Knowledge Base) cho các phiên làm việc (session) tiếp theo. Chỉ cần đọc file này là nắm được toàn bộ kiến trúc, dữ liệu, quy ước thiết kế và trạng thái hiện tại của dự án.

---

## 1. Tổng Quan Dự Án
- **Mục đích:** Website Thiệp Mời Cưới Online dạng Single Page Application (SPA).
- **Repository:** `https://github.com/HoangTLM/VuQuyHoangThao`
- **Live URL (GitHub Pages):** `https://hoangtlm.github.io/VuQuyHoangThao/`
- **Admin URL (Ẩn cho Dâu Rể):** `https://hoangtlm.github.io/VuQuyHoangThao/?admin=1` *(Mã PIN: `241026`)*
- **Sự kiện chính:** **Lễ Vu Quy** của Cô dâu **Trương Nguyễn Vi Thảo** & Chú rể **Trần Lê Minh Hoàng**.
- **Thời gian sự kiện:** Thứ Bảy, ngày **24/10/2026** (Đón khách: `18:00` • Đãi tiệc: `19:00`) — Tức ngày `15/09 năm Bính Ngọ` (Âm lịch).
- **Địa điểm:** Trung tâm Hội nghị - Tiệc cưới **Diamond Place**, 15A Hồ Văn Huê, Phường 9, Phú Nhuận, TP. Hồ Chí Minh.
- **Tech Stack:**
  - Thuần **HTML5 + CSS3 + Vanilla JavaScript** (Không dùng bundler/build step, chạy trực tiếp và host miễn phí trên **GitHub Pages**).
  - **Tailwind CSS** (nhúng qua CDN).
  - **Firebase Cloud Firestore** (`thiepcuoi-e5dca`, nhúng qua Firebase Compat CDN `10.14.1`).
  - **AOS (Animate On Scroll):** Hiệu ứng cuộn trang mượt mà.
  - **Lucide Icons:** Bộ icon vector nhẹ.
  - **Canvas Confetti:** Hiệu ứng bắn pháo giấy khi gửi RSVP / Lời chúc.

---

## 2. Cấu Trúc Thư Mục & Vai Trò Từng File

```text
VuQuyHoangThao/
├── index.html                  # Giao diện chính của toàn bộ trang thiệp cưới + Modal Admin ẩn
├── README.md                   # Hướng dẫn sử dụng & deploy GitHub Pages
├── YEU_CAU_THIEP_CUOI.md       # Tài liệu đặc tả yêu cầu ban đầu
├── knowledge.md                # Tài liệu ngữ cảnh dự án (file này)
├── css/
│   ├── style.css               # Biến màu chủ đạo Light Blue, font chữ, layout, chống tràn ngang mobile
│   └── animations.css          # Keyframes: đĩa nhạc xoay, nhịp tim, trôi nổi, mở phong bì, zoom modal
├── js/
│   ├── config.js               # Nơi lưu trữ TOÀN BỘ dữ liệu cấu hình + firebaseConfig + adminPin
│   ├── main.js                 # Đổ dữ liệu vào DOM, cá nhân hóa URL, tạo link mời (đơn lẻ & hàng loạt)
│   ├── music.js                # Xử lý mở phong bì 3D & phát nhạc nền (tự động tua tới giây thứ 10)
│   ├── countdown.js            # Đồng hồ đếm ngược thời gian thực tới 2026-10-24T18:00:00
│   ├── gallery.js              # Render lưới 32 ảnh cưới & Lightbox phóng to (hỗ trợ phím & vuốt mobile)
│   ├── rsvp.js                 # Kết nối Firestore lưu/xóa RSVP & Sổ lưu bút realtime + Bảng Quản trị Admin
│   └── petals.js               # Hiệu ứng trái tim bay tông xanh pastel trên HTML5 Canvas (#petals-canvas)
└── assets/
    ├── audio/                  # Nhạc nền: "Yêu Em Hơn Mỗi Ngày - Andiez.mp3"
    └── images/                 # Ảnh cưới gốc, ảnh trao nhẫn, thư mục con gallery/ và XuyenViet/
```

---

## 3. Luồng Hoạt Động & Các Module Chính

### 3.1. Quản lý dữ liệu tập trung (`js/config.js`)
Mọi thông tin hiển thị trên web đều được đọc từ biến toàn cục `window.WEDDING_CONFIG`:
- `groom` & `bride`: Tên ngắn, họ tên đầy đủ, tên bố mẹ, ảnh đại diện (`avatar`), vị trí căn ảnh (`avatarPosition`), mô tả.
- `heroBackground`: Ảnh bìa chính (`assets/images/background.jpg`).
- `weddingDate`: Mốc đếm ngược (`2026-10-24T18:00:00`) và `displayDate` (ngày Dương, ngày Âm, giờ đón khách/đãi tiệc).
- `events`: Danh sách sự kiện (Hiện tại cấu hình 1 sự kiện duy nhất là **LỄ VU QUY** tại Diamond Place).
- `story`: 3 cột mốc tình yêu:
  1. `14/02/2021`: Chính thức trở thành người yêu.
  2. `28/04 - 02/05/2026`: Lần đầu đi xuyên Việt cùng nhau (ảnh trong `assets/images/XuyenViet/`).
  3. `20/09/2026`: Ngày Đính Hôn (`assets/images/traonhan.jpg`).
- `gallery`: Mảng 32 bức ảnh cưới kèm chú thích (`caption`).
- `dressCode`: 5 màu gợi ý (Trắng, Be/Kem, Hồng Pastel, Nâu Nhạt, Xanh Sage) và 3 lưu ý sự kiện.
- `music`: File nhạc MP3 và cấu hình `startTime: 10` (bắt đầu phát từ giây thứ 10).
- `initialWishes`: Đã để mảng rỗng `[]` (chỉ hiển thị lời chúc thực tế từ Firebase Firestore).
- `firebaseConfig`: Cấu hình kết nối project `thiepcuoi-e5dca` trên Cloud Firestore.
- `adminPin`: Mã PIN mở khóa bảng Quản trị (`"241026"`).

### 3.2. Cá nhân hóa tên khách mời & Công cụ tạo link đơn lẻ / hàng loạt (`js/main.js`)
- **Đọc tham số URL:** Hỗ trợ các query param `?to=`, `?guest=`, `?u=`, hoặc `?k=` (ví dụ: `?to=Anh+Nam`).
- Khi có tham số trên URL, trang web tự động cập nhật:
  1. Nhãn trên phong bì mở đầu (`#envelope-guest-name`): *"Kính gửi: [Tên khách]"*.
  2. Nhãn trên Hero Banner (`#personalized-guest-name`): *"Trân trọng kính mời: [Tên khách]"*.
  3. Điền sẵn vào ô Họ và Tên trong form RSVP (`#rsvp-name`) và form Lời chúc (`#wish-name`).
- **Tab Tạo Link Gửi Khách (`#admin-linkgen-panel` bên trong Bảng Quản Trị Admin):**
  - **Khối 1 (Tạo nhanh 1 khách):** Nhập tên 1 khách -> Tạo link riêng & mẫu lời mời gửi Zalo/Messenger.
  - **Khối 2 (Tạo link hàng loạt - Bulk Generator):** Dán danh sách nhiều khách từ Excel/Google Sheets (mỗi dòng 1 tên, tự động lọc số thứ tự đầu dòng) -> tạo danh sách link hàng loạt:
    - Từng dòng có nút `Copy Link`, `Copy Lời Mời`, `Xem` và **tự động đổi màu xanh lá (`✓ Đã Copy`)** khi đã bấm để dâu rể theo dõi tiến độ gửi thiệp.
    - Hỗ trợ **Copy toàn bộ danh sách** hoặc **Xuất file Excel (`.csv`)** gồm đầy đủ cột *STT, Tên Khách Mời, Link Thiệp Riêng, Mẫu Tin Nhắn*.

### 3.3. Hiệu ứng Phong bì & Nhạc nền (`js/music.js`)
- Khi người dùng mới vào trang, màn hình `#envelope-screen` che toàn bộ trang.
- Khi bấm nút **"Mở Thiệp Mời"** (`#btn-open-invitation`):
  - Phong bì trượt mở lên trên (`#envelope-screen.opened`).
  - Kích hoạt phát nhạc nền (vượt qua cơ chế chặn Autoplay của trình duyệt di động).
  - Hàm `doSeek()` kết hợp lắng nghe `loadedmetadata`, `canplay`, `playing`, `timeupdate` đảm bảo nhạc luôn bắt đầu phát từ **giây thứ 10** (`startTime: 10`) kể cả trên web server public.
  - Nút đĩa than nổi góc dưới bên trái (`#music-disc-btn`) xoay tròn và cho phép bật/tắt nhạc bất kỳ lúc nào.

### 3.4. Album Ảnh & Lightbox (`js/gallery.js`)
- Hiển thị lưới 2 cột trên mobile, 4 cột trên desktop (`#gallery-grid`).
- Bấm vào ảnh mở `#gallery-lightbox-modal` xem ảnh lớn kèm bộ đếm `i / 32` và `caption`.
- Hỗ trợ phím `ArrowLeft`, `ArrowRight`, `Escape` trên máy tính và thao tác **vuốt ngang (touch swipe)** trên điện thoại.

### 3.5. RSVP, Sổ Lưu Bút Realtime & Bảng Quản Trị Firebase (`js/rsvp.js`)
- **Cloud Firestore (`thiepcuoi-e5dca`):** Nhúng qua Firebase Compat CDN (`firebase-app-compat.js` & `firebase-firestore-compat.js`) để giữ nguyên cấu trúc web tĩnh trên GitHub Pages.
- **Form RSVP (`#rsvp-form`):** Lưu vào Collection `rsvps` trên Firestore (kèm dự phòng `localStorage`), bắn pháo hoa `triggerConfetti()` và hiện `showToast()`.
- **Form Lời chúc (`#wish-form`):** Lưu vào Collection `wishes` trên Firestore, lắng nghe thời gian thực qua `onSnapshot` để hiển thị lời chúc mới ngay lập tức trên `#wishes-list`.
- **Bảng Quản Trị Dâu Rể (`#admin-modal` - Ẩn hoàn toàn khỏi giao diện khách mời):**
  - **Cách mở:**
    1. Truy cập đường dẫn có đuôi **`?admin=1`** (hoặc `?admin` / `#admin`).
    2. Hoặc **chạm 3 lần liên tiếp** vào dòng bản quyền `© 2026 Thiệp Cưới Online • Thiết kế bởi HoangTLM` ở dưới cùng trang (Footer).
  - **Mã PIN:** Mặc định `241026` (cấu hình tại `js/config.js`).
  - **Chức năng trong Admin:**
    - 4 thẻ thống kê thời gian thực: Tổng khách sẽ đến (cộng dồn số người đi cùng), Lượt xác nhận đến, Phân bổ Nhà Gái / Nhà Trai, Tổng lời chúc.
    - **Tab 1 (`Danh Sách RSVP`):** Xem danh sách, lọc theo trạng thái / Nhà Gái / Nhà Trai, xóa từng phản hồi (`deleteRsvpItem`).
    - **Tab 2 (`Sổ Lưu Bút Lời Chúc`):** Xem danh sách lời chúc, xóa lời chúc (`deleteWishItem`).
    - **Tab 3 (`💌 Tạo Link Gửi Khách`):** Tạo link cá nhân hóa đơn lẻ và hàng loạt.
    - **Nút Xuất Excel (CSV):** Xuất toàn bộ danh sách RSVP và Lời chúc ra file `.csv` chuẩn tiếng Việt (UTF-8 BOM).

---

## 4. Các Quy Ước Thiết Kế & Lưu Ý Quan Trọng (Đã Tinh Chỉnh Qua Các Session)

1. **Thứ tự tên Cô Dâu - Chú Rể (Lễ Vu Quy):**
   - Vì đây là thiệp **Lễ Vu Quy** (nhà gái), tên **Cô Dâu (Vi Thảo)** được đặt **trước** tên **Chú Rể (Minh Hoàng)** ở tất cả các vị trí chính (Tiêu đề trang, Phong bì, Hero Banner, phần Giới thiệu Đôi Uyên Ương, chọn khách Nhà Gái mặc định ở RSVP, Footer).
2. **Ngôn ngữ hiển thị 100% Tiếng Việt:**
   - Toàn bộ tiêu đề phụ và nhãn giao diện đều dùng tiếng Việt trang trọng (không trộn lẫn các tiêu đề tiếng Anh như *Save the Date*, *The Bride & Groom*, *Love Story*...).
3. **Tông màu chủ đạo (Light Blue Pastel):**
   - Nền chính: `#f0f7fd`, điểm nhấn: `sky-600` (`#0284c7`), `sky-400` (`#38bdf8`).
   - Hiệu ứng hạt rơi trên canvas (`js/petals.js`) vẽ **trái tim bay màu xanh pastel / sky blue** (không dùng cánh hoa màu hồng/đỏ).
4. **Tối ưu hiển thị & Chống lỗi lệch màn hình Mobile:**
   - Tên Cô Dâu & Chú Rể dùng `flex-col sm:flex-row`: hiển thị **3 dòng trên điện thoại** (Cô dâu / `&` / Chú rể) và **1 dòng trên máy tính** để không bị rớt chữ lẻ.
   - Nội dung chữ ở Hero Banner được đặt ở đáy (`justify-end`) để **không che khuôn mặt cô dâu chú rể** trên ảnh nền.
   - Ảnh đại diện tròn được canh `object-position` riêng (`center 20%` cho cô dâu, `center top` cho chú rể) để không bị cắt phần đầu.
   - Mọi hiệu ứng AOS đều dùng `fade-up` hoặc `zoom-in` với `once: true`.
   - **Xử lý triệt để lỗi đứng/khựng scroll trên iOS Safari khi dừng ngón tay:** 
     + Tách biệt: không đặt `scroll-behavior: smooth` trên root `html` ở màn hình mobile (chỉ bật trên desktop `min-width: 768px`), dùng JS cuộn mượt riêng khi bấm nút anchor.
     + Không dùng `-webkit-overflow-scrolling: touch` trên `body` và không dùng `overflow-x: clip` trên `section`.
     + Mở khóa body scroll bằng `removeProperty("overflow")` (tuyệt đối không gán `body.style.overflow = "auto"` inline vì gây kẹt dual-scroller trên Safari).
     + Ẩn hoàn toàn `#envelope-screen` (`display: none`, `visibility: hidden`) sau khi mở để giải phóng GPU và hit-testing.
     + Canvas trái tim `#petals-canvas` hạ `z-index: 1` kèm `touch-action: none; pointer-events: none` để không đè lên lớp chạm lướt.
     + Lắng nghe sự kiện `scroll` với `{ passive: true }` và `requestAnimationFrame` giúp duy trì 120Hz mượt mà.
5. **Phần Mừng Cưới Online (QR Ngân Hàng):**
   - Dữ liệu `bankAccounts` trong `js/config.js` và logic render `#bank-accounts-container` trong `js/main.js` vẫn được giữ sẵn, nhưng thẻ HTML hiển thị trong `index.html` đã được **lược bỏ có chủ đích**. Nếu sau này cần bật lại chỉ cần thêm `<div id="bank-accounts-container"></div>` vào `index.html`.
6. **Bảo mật Firebase trên GitHub Pages:**
   - Đã tích hợp `escapeHtml()` chống XSS, giới hạn độ dài ký tự (`maxlength` + `.slice()`), `checkCooldown()` chống spam bấm liên tục (10 giây/lần), và `deleteFirestoreDocWithFallback()` hỗ trợ xóa qua cả SDK và REST API.
   - Firestore Security Rules trên `thiepcuoi-e5dca` cấu hình `allow read, delete: if true;`, `allow update: if false;` và kiểm tra kiểu dữ liệu/độ dài trường khi `create`.
