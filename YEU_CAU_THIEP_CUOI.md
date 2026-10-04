# TÀI LIỆU YÊU CẦU DỰ ÁN: WEBSITE THIỆP CƯỚI ONLINE (SINGLE PAGE APPLICATION)

- **Tên dự án:** Website Thiệp Cưới Online (Online Wedding Invitation)
- **Hình thức:** Single Page Web (Trang đơn cuộn mượt / Cuộn từng trang)
- **Mục tiêu:** Cung cấp giải pháp thiệp mời hiện đại, tiện lợi thay thế/bổ trợ thiệp giấy; tối ưu hiển thị trên thiết bị di động (Mobile First), cá nhân hóa tên khách mời, quản lý xác nhận tham dự (RSVP) và nhận lời chúc/tiền mừng tiện lợi.

---

## 1. Mục Tiêu & Đối Tượng Sử Dụng

### 1.1. Mục tiêu
- **Trải nghiệm khách mời:** Nhận thiệp nhanh chóng qua link (Zalo/Facebook), xem đầy đủ thông tin sự kiện, hình ảnh, chỉ đường và gửi lời chúc/RSVP dễ dàng.
- **Tiện ích cho dâu rể:** Nắm bắt chính xác số lượng khách tham dự, thu thập lời chúc, tiết kiệm chi phí in ấn và thời gian gửi thiệp.

### 1.2. Đối tượng người dùng
- **Khách mời:** 80 - 90% truy cập qua điện thoại thông minh (smartphone) từ các ứng dụng Zalo, Messenger, SMS.
- **Cô dâu & Chú rể (Admin):** Xem danh sách khách đăng ký tham dự, thống kê số lượng và lời chúc.

---

## 2. Kiến Trúc & Cấu Trúc Nội Dung Trang Web (Single Page Sections)

Trang web được thiết kế theo dạng Single Page cuộn dọc (hoặc chia slide vuốt dọc trên mobile), gồm các phân đoạn (Sections) chính:

```
[1. Hero & Phong bì mở đầu]
        ↓
[2. Thông tin Cô Dâu & Chú Rể]
        ↓
[3. Câu chuyện tình yêu (Love Story)]
        ↓
[4. Đồng hồ đếm ngược (Countdown)]
        ↓
[5. Sự kiện & Thời gian, Địa điểm (Lễ & Tiệc)]
        ↓
[6. Album ảnh cưới (Gallery)]
        ↓
[7. Dresscode & Lưu ý sự kiện]
        ↓
[8. Xác nhận tham dự (RSVP Form)]
        ↓
[9. Sổ lưu bút (Gửi lời chúc online)]
        ↓
[10. Mừng cưới online (QR Code / Số tài khoản)]
        ↓
[11. Lời cảm ơn & Footer]
```

---

## 3. Đặc Tả Chi Tiết Từng Phân Đoạn (Sections)

### Section 1: Hero & Hiệu Ứng Mở Thiệp
- **Hiệu ứng phong bì (Interactive Envelope):** Khi khách mở link, hiển thị phong bì hoạt họa kèm nút "Mở Thiệp" (giúp kích hoạt phát nhạc nền mượt mà, vượt qua chính sách chặn Autoplay của trình duyệt di động).
- **Banner chính:**
  - Ảnh đại diện cặp đôi (Full màn hình).
  - Tên Chú Rể & Cô Dâu (Typography nghệ thuật / Calligraphy).
  - Lời mời cá nhân hóa: Lấy từ URL param (Ví dụ: `?to=Anh+Hoang` -> hiển thị: *"Trân trọng kính mời: Anh Hoàng"*).
  - Ngày cưới chính thức.
- **Nhạc nền (Background Music):**
  - Nút bật/tắt nhạc cố định ở góc màn hình (Floating music player).
  - Bài hát lãng mạn định dạng nhẹ (.mp3).

### Section 2: Giới Thiệu Cô Dâu & Chú Rể (Bride & Groom)
- Ảnh chân dung chú rể kèm họ tên, thông tin gia đình (Nhà Trai: Ông/Bà, Con thứ/trưởng).
- Ảnh chân dung cô dâu kèm họ tên, thông tin gia đình (Nhà Gái: Ông/Bà, Con thứ/út).
- Đoạn trích dẫn (Quote) ngắn về tình yêu hoặc lời nhắn nhủ từ hai người.

### Section 3: Câu Chuyện Tình Yêu (Love Story / Timeline)
- Dạng timeline dọc các cột mốc ý nghĩa:
  - Ngày đầu gặp gỡ / Ngày chính thức yêu nhau.
  - Chuyến du lịch đáng nhớ đầu tiên.
  - Ngày cầu hôn (Lời đồng ý).
  - Ngày về chung một nhà.
- Mỗi mốc có ảnh nhỏ + thời gian + mô tả ngắn.

### Section 4: Đồng Hồ Đếm Ngược (Countdown Timer)
- Bộ đếm thời gian thực đếm ngược tới thời điểm diễn ra đám cưới:
  - Hiển thị: **Ngày - Giờ - Phút - Giây**.
  - Hiệu ứng nhảy số mượt mà.

### Section 5: Thông Tin Sự Kiện & Địa Điểm (Events & Location)
Tách rõ ràng các buổi lễ (ví dụ: Lễ Vu Quy, Lễ Thành Hôn, Tiệc Cưới Nhà Hàng):
- **Thời gian:** Giờ đón khách, giờ làm lễ, ngày dương lịch và ngày âm lịch.
- **Địa điểm:** Tên địa điểm, địa chỉ cụ thể (Tư gia hoặc Tên sảnh Trung tâm tiệc cưới).
- **Hành động tương tác:**
  - Nút **"Chỉ đường Google Maps"**: Mở trực tiếp ứng dụng Google Maps dẫn đường đến tọa độ chính xác.
  - Nút **"Thêm vào Lịch" (Add to Calendar)**: Hỗ trợ Google Calendar / Apple Calendar (.ics) để khách lưu nhắc nhở trước ngày cưới.

### Section 6: Album & Hệ Thống Hình Ảnh Của Cô Dâu & Chú Rể (Photos & Gallery)
Trang web được thiết kế các vị trí tối ưu để tôn vinh toàn bộ hình ảnh đẹp nhất của hai bạn:

- **1. Ảnh Bìa Chính (Hero Cover Photo):**
  - Ảnh cưới khổ lớn (chân dung hoặc toàn cảnh) làm nền màn hình chào đầu tiên với tông màu lãng mạn, sắc nét.
- **2. Ảnh Chân Dung Riêng (Bride & Groom Portraits):**
  - Khung ảnh nghệ thuật riêng cho Chú Rể và Cô Dâu (viền tròn hoặc bo góc lượn sóng mềm mại, kèm hiệu ứng hover/zoom nhẹ).
- **3. Ảnh Cột Mốc Kỷ Niệm (Love Story Photos):**
  - Ảnh đời thường, ảnh kỷ niệm những chuyến đi chơi, ảnh khoảnh khắc cầu hôn gắn liền với từng giai đoạn tình yêu.
- **4. Album Ảnh Cưới Pre-Wedding (Main Gallery):**
  - Trưng bày bộ sưu tập 10 - 24 ảnh cưới đẹp nhất (ảnh studio, ảnh ngoại cảnh, ảnh áo dài truyền thống).
  - Trình bày dạng lưới nghệ thuật (Masonry Grid hoặc Polaroid style).
  - **Lightbox Viewer:** Khách bấm vào xem ảnh kích thước đầy đủ (Full HD), vuốt qua lại mượt mà trên màn hình điện thoại.
- **5. Ảnh Địa Điểm & Không Gian Cưới:**
  - Ảnh rạp cưới hoặc sảnh trung tâm tiệc cưới giúp khách mời dễ dàng nhận diện khi đến nơi.
- **6. Quản lý thay ảnh dễ dàng (Asset Management):**
  - Toàn bộ ảnh sẽ được tổ chức trong thư mục quy chuẩn:
    ```text
    /assets/images/
    ├── cover.jpg          # Ảnh bìa mở đầu
    ├── groom.jpg          # Ảnh chân dung chú rể
    ├── bride.jpg          # Ảnh chân dung cô dâu
    ├── story/             # Ảnh các mốc kỷ niệm (story1.jpg, story2.jpg...)
    ├── gallery/           # Album ảnh cưới (01.jpg, 02.jpg, ... 15.jpg)
    └── qr/                # Mã QR tài khoản nhận mừng cưới
    ```
    *(Hai bạn chỉ cần đổi ảnh vào thư mục này với tên tương ứng là website sẽ tự động cập nhật ngay lập tức mà không cần chỉnh sửa code).*

### Section 7: Dresscode & Quy Định Sự Kiện (Event Guide)
- Bảng màu trang phục gợi ý (Dresscode Palette) với các mã màu trực quan (ví dụ: Trắng, Be, Pastel, Đen,...).
- Một số lưu ý nhỏ: Chỗ đỗ xe ô tô/xe máy, lưu ý về trẻ nhỏ hoặc thời gian khai tiệc đúng giờ.

### Section 8: Xác Nhận Tham Dự (RSVP Form)
Biểu mẫu cho khách xác nhận để dâu rể chốt số lượng mâm cỗ:
- **Các trường thông tin:**
  - Họ và tên (Tự động điền nếu có tham số URL `?to=...`).
  - Số điện thoại.
  - Khách của: [ ] Nhà Trai / [ ] Nhà Gái.
  - Trạng thái tham dự: [ ] Chắc chắn tham dự / [ ] Rất tiếc không thể đến / [ ] Chưa chắc chắn.
  - Số người đi cùng (Đi 1 mình / Đi cùng người thương / +1, +2 người...).
  - Lời nhắn thêm (chế độ ăn chay, ghi chú...).
- **Xử lý dữ liệu:** Lưu tự động vào Google Sheets hoặc gửi thông báo qua Telegram Bot / Email / Database.

### Section 9: Sổ Lưu Bút & Lời Chúc (Guestbook)
- Khách mời nhập tên và gửi lời chúc phúc đến cô dâu chú rể.
- Danh sách lời chúc hiển thị dạng danh sách / thẻ cuộn trượt sinh động, kèm ngày giờ gửi.

### Section 10: Mừng Cưới Online (Gift Registry / Lucky Money)
Dành cho bạn bè, khách mời ở xa hoặc muốn mừng cưới không dùng tiền mặt:
- Thẻ thông tin Nhà Trai & Nhà Gái riêng biệt:
  - Mã VietQR chuẩn ngân hàng (tự động nhận diện ngân hàng + số tài khoản khi quét app).
  - Tên chủ tài khoản, Tên ngân hàng, Số tài khoản.
  - Nút **"Sao chép số tài khoản"** (One-click Copy to clipboard).
  - Hỗ trợ ví MoMo (tùy chọn).

### Section 11: Lời Cảm Ơn & Footer
- Lời cảm ơn chân thành từ gia đình hai bên.
- Nút chia sẻ trang web (Share Facebook, Zalo, Copy Link).

---

## 4. Yêu Cầu Kỹ Thuật & Hiệu Năng (Technical Non-Functional Requirements)

### 4.1. Hệ thống Hiệu ứng Cuộn Trang (Scroll Animations & Interactions)
Nhằm mang lại trải nghiệm cảm xúc, sinh động và lãng mạn như một cuốn nhật ký câu chuyện tình yêu khi người xem cuộn từ trên xuống dưới, hệ thống cần tích hợp các hiệu ứng cuộn:

- **1. Hiệu ứng xuất hiện theo nhịp cuộn (Scroll-triggered Reveals):**
  - **Fade In Up (Trồi nhẹ từ dưới lên):** Áp dụng cho tiêu đề các phần, đoạn văn bản mô tả, form RSVP và danh sách lời chúc.
  - **Slide In (Trượt đối xứng từ hai bên):** 
    - Thẻ chú rể trượt nhẹ từ bên trái vào, thẻ cô dâu trượt nhẹ từ bên phải vào.
    - Cột mốc câu chuyện tình yêu (Love Story Timeline) trượt so le xen kẽ (trái - phải) khi cuộn đến từng mốc thời gian.
  - **Zoom In / Scale-up nhẹ:** Áp dụng cho ảnh đại diện, ảnh album cưới, khung nhẫn cưới và đồng hồ đếm ngược (phóng nhẹ từ 0.95 -> 1.0) khi vào khung nhìn (viewport).

- **2. Hiệu ứng chiều sâu Parallax (Parallax Scrolling):**
  - Ảnh nền (Background Cover) và các họa tiết hoa lá trang trí chuyển động với vận tốc chậm hơn vận tốc cuộn chuột/ngón tay, tạo chiều sâu thị giác (3D Depth) sang trọng.

- **3. Hiệu ứng thẻ xếp chồng (Stacking Cards - tùy chọn):**
  - Khi cuộn qua danh sách sự kiện (Lễ Vu Quy -> Lễ Thành Hôn -> Tiệc Cưới), các thẻ thông tin có thể trượt và ghim nhẹ xếp lớp chồng lên nhau rất hiện đại.

- **4. Hiệu ứng chuyển động hạt lơ lửng (Floating Particle / Falling Petals):**
  - Cánh hoa hồng/hoa đào rơi nhẹ nhàng, lá bay hoặc đốm sáng lung linh (sparkles) trôi theo màn hình khi lướt web.
  - Có công tắc bật/tắt nhẹ nhàng để người dùng không bị rối mắt nếu muốn.

- **5. Thanh chỉ báo cuộn (Scroll Progress Bar):**
  - Một thanh màu pastel mảnh chạy tinh tế ở mép trên cùng màn hình biểu thị tiến độ xem thiệp.

- **6. Tối ưu kỹ thuật cho Animation cuộn (Performance & Smoothness):**
  - Sử dụng thư viện nhẹ và mượt: **AOS (Animate On Scroll)**, **GSAP / ScrollTrigger** hoặc **Framer Motion** (nếu dùng React).
  - Ưu tiên animation bằng phần cứng GPU (chỉ can thiệp `transform: translate3d/scale` và `opacity`) để cuộn không bị giật/lag (60fps) trên điện thoại cấu hình tầm trung.
  - Hỗ trợ `prefers-reduced-motion` đối với người dùng không thích hiệu ứng chuyển động mạnh.

### 4.2. Hiệu năng & Tốc độ tải trang
- Dung lượng ảnh cần được nén định dạng thế hệ mới (`.webp` / `.avif`) để tải nhanh trong vòng 1-2 giây qua mạng 4G/5G.
- Lazy Loading cho hình ảnh bên dưới màn hình.
- Thẻ OpenGraph (OG Meta Tags) đầy đủ: Khi gửi link qua Zalo/Facebook, hiển thị thumbnail đẹp mắt, tiêu đề "Thiệp cưới [Tên Chú Rể] & [Tên Cô Dâu]", mô tả ngắn gọn.

### 4.3. Cá nhân hóa đường dẫn (URL Parameters)
- Hỗ trợ link mời dạng: `https://ten-mien.com/?to=Anh+Minh+Hoang`
- Tự động thay thế câu chào: *"Kính gửi: Anh Minh Hoàng"*, tạo cảm giác trân trọng và chuyên nghiệp.

---

## 5. Đề Xuất Công Nghệ Lựa Chọn (Tech Stack Proposals)

Tùy vào nhu cầu quản trị và độ phức tạp, có 2 hướng triển khai phổ biến:

### Hướng 1: Tối Giản, Chi Phí Thấp / Miễn Phí Host (Khuyên dùng nếu tự làm)
- **Frontend:** HTML5, CSS3/TailwindCSS, JavaScript (Vanilla hoặc Vue/React/Next.js/Astro/Vite).
- **Backend cho RSVP & Lời Chúc:** Google Apps Script kết nối trực tiếp **Google Sheets** (hoàn toàn miễn phí, dâu rể xem danh sách trực tiếp trên Google Sheets trên điện thoại).
- **Hosting:** Vercel / Netlify / GitHub Pages / Cloudflare Pages (Miễn phí, tốc độ CDN cực nhanh).
- **Tên miền:** Tên miền riêng ngắn gọn (ví dụ: `hoangvalan.info` hoặc `hoanglan.iwedding.info`).

### Hướng 2: Hệ Thống Đầy Đủ Kèm Dashboard Quản Trị
- **Frontend:** Next.js (React) + TailwindCSS + Shadcn/ui.
- **Backend / Database:** Supabase / Firebase / NodeJS + PostgreSQL (Quản lý RSVP, duyệt lời chúc).
- **Admin Panel:** Trang `/admin` có đăng nhập cho dâu rể xem biểu đồ khách mời, lọc khách tham dự, xuất file Excel.

---

## 6. Lộ Trình Triển Khai (Roadmap Dự Kiến)

| Giai đoạn | Công việc chính | Kết quả |
| :--- | :--- | :--- |
| **Giai đoạn 1** | Thu thập nội dung, hình ảnh, bài hát cưới, thông tin ngân hàng | Thư mục asset & nội dung đầy đủ |
| **Giai đoạn 2** | Thiết kế giao diện (UI Design) & chọn bảng màu, font chữ | Bản demo giao diện |
| **Giai đoạn 3** | Lập trình Frontend các Section & Tích hợp hiệu ứng âm thanh/mở thiệp | Trang web chạy thử nghiệm |
| **Giai đoạn 4** | Kết nối Form RSVP & Sổ lưu bút (Google Sheets hoặc Backend) | Nhận dữ liệu thực tế kiểm thử |
| **Giai đoạn 5** | Cấu hình SEO/Social Card (Zalo, FB Preview), mua tên miền & Publish | Website chính thức hoạt động |
