/**
 * ==============================================================================
 * THIỆP CƯỚI ONLINE - FILE CẤU HÌNH THÔNG TIN CHÍNH (CONFIG)
 * ==============================================================================
 * Dâu rể chỉ cần chỉnh sửa các thông tin trong file này để cập nhật toàn bộ website.
 * Hình ảnh có thể dùng đường dẫn nội bộ (assets/images/...) hoặc link ảnh online.
 */

window.WEDDING_CONFIG = {
  // 1. THÔNG TIN CẶP ĐÔI
  groom: {
    name: "Minh Hoàng",
    fullName: "Trần Lê Minh Hoàng",
    roleTitle: "Chú Rể",
    parents: "Ông Trần Văn Hưng & Bà Lê Thị Bảy",
    phone: "0901234567",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    description: "Một chàng trai đam mê công nghệ, luôn yêu thương, quan tâm và trân trọng từng khoảnh khắc được đồng hành cùng người bạn đời của mình.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },

  bride: {
    name: "Vi Thảo",
    fullName: "Trương Nguyễn Vi Thảo",
    roleTitle: "Cô Dâu",
    parents: "Ông Trương Cường & Bà Nguyễn Tường Vi",
    phone: "0987654321",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    description: "Một cô gái nhẹ nhàng, yêu nghệ thuật và nụ cười luôn rạng rỡ. Hạnh phúc lớn nhất là tìm được bờ vai bình yên để tựa vào mỗi ngày.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },

  // 2. THỜI GIAN VÀ ĐẾM NGƯỢC
  weddingDate: "2026-10-24T18:00:00", // Định dạng YYYY-MM-DDTHH:mm:ss dùng cho đồng hồ đếm ngược
  displayDate: {
    solar: "Thứ Bảy, ngày 24 tháng 10 năm 2026",
    lunar: "Ngày 15 tháng 09 năm Bính Ngọ (Âm lịch)",
    time: "Đón khách: 18:00 • Đãi tiệc: 19:00"
  },

  // 3. THÔNG ĐIỆP & LỜI NGỎ
  invitationMessage: "Tình yêu không phải là tìm một người hoàn hảo, mà là học cách nhìn một người không hoàn hảo theo cách hoàn hảo nhất. Chúng mình rất vinh hạnh và trân trọng kính mời bạn đến chung vui trong ngày trọng đại này!",
  quote: "“Hai tâm hồn, một ý nghĩ. Hai trái tim, chung một nhịp đập.”",

  // 4. CÁC SỰ KIỆN CƯỚI (EVENTS)
  events: [
    {
      id: "le-vu-quy",
      title: "LỄ VU QUY",
      time: "24/10/2026 (Đón khách: 18:00 • Đãi tiệc: 19:00)",
      lunarDate: "(Tức ngày 15/09 năm Bính Ngọ)",
      address: "Trung tâm Hội nghị - Tiệc cưới Diamond Place, 15A Hồ Văn Huê, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://maps.app.goo.gl/Tx76urfwevy978KQ6",
      calendarTitle: "Lễ Vu Quy - Vi Thảo & Minh Hoàng",
      calendarDesc: "Tham dự Lễ Vu Quy của Vi Thảo và Minh Hoàng",
      icon: "heart-handshake"
    }
  ],

  // 5. CÂU CHUYỆN TÌNH YÊU (LOVE STORY TIMELINE)
  story: [
    {
      year: "2021",
      date: "14/02/2021",
      title: "Lần Đầu Gặp Gỡ",
      content: "Một buổi chiều mưa bất chợt tại quán cà phê sách nhỏ ở trung tâm Sài Gòn. Ánh mắt chạm nhau và câu chuyện bắt đầu từ những điều giản dị nhất.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "2022",
      date: "25/12/2022",
      title: "Lời Tỏ Tình Dưới Đêm Giáng Sinh",
      content: "Dưới ánh đèn lung linh của cây thông Noel, chúng mình chính thức nắm tay nhau và trao nhau lời hứa cùng vượt qua mọi thử thách.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "2024",
      date: "15/08/2024",
      title: "Chuyến Du Lịch Đầu Tiên Cùng Nhau",
      content: "Chuyến đi Đà Lạt nhiều kỷ niệm, ngắm bình minh trên đồi chè và cùng mơ về một mái ấm bình yên trong tương lai.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "2025",
      date: "20/10/2025",
      title: "Lời Cầu Hôn Ngọt Ngào",
      content: "Bên bờ biển lúc hoàng hôn buông xuống, chàng trai quỳ gối trao chiếc nhẫn nhỏ cùng câu hỏi: 'Em đồng ý làm vợ anh nhé?'. Và câu trả lời là 'Em đồng ý!'.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 6. ALBUM ẢNH CƯỚI (GALLERY)
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "Khoảnh khắc hạnh phúc ngập tràn"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      caption: "Nụ cười rạng rỡ của đôi uyên ương"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      caption: "Nắm tay nhau đi qua năm tháng"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Nhẫn cưới - Lời hứa trọn đời"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      caption: "Hẹn ước cùng nhau già đi"
    },
    {
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
      caption: "Dưới vòm hoa tình yêu"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      caption: "Từng bước chân song hành"
    },
    {
      url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Ánh mắt trao trọn yêu thương"
    }
  ],

  // 7. DRESS CODE & LƯU Ý
  dressCode: {
    description: "Để những bức ảnh kỷ niệm thêm phần hài hòa và trang nhã, gia đình khuyến khích khách mời diện trang phục theo các gam màu:",
    colors: [
      { name: "Trắng", hex: "#FFFFFF", border: "#D1D5DB" },
      { name: "Be / Kem", hex: "#F5EBE0" },
      { name: "Hồng Pastel", hex: "#FAD2E1" },
      { name: "Nâu Nhạt", hex: "#CDB4DB" },
      { name: "Xanh Sage", hex: "#A3B18A" }
    ],
    notes: [
      "Khai tiệc đúng giờ vào lúc 19:00 để mọi nghi lễ diễn ra trọn vẹn nhất.",
      "Trung tâm có bãi giữ xe ô tô & xe máy rộng rãi tại tầng hầm (miễn phí vé).",
      "Nếu bạn có chế độ ăn kiêng hoặc ăn chay, vui lòng ghi chú ở phần Xác nhận tham dự (RSVP)."
    ]
  },

  // 8. MỪNG CƯỚI ONLINE (HỘP MỪNG CƯỚI & TÀI KHOẢN NGÂN HÀNG)
  bankAccounts: {
    groom: {
      title: "Mừng Cưới Chú Rể (Nhà Trai)",
      bankName: "Vietcombank",
      accountNumber: "1012345678",
      accountHolder: "NGUYEN MINH HOANG",
      branch: "Chi nhánh TP. Hồ Chí Minh",
      qrImage: "https://api.vietqr.io/image/970436-1012345678-compact2.jpg?accountName=NGUYEN%20MINH%20HOANG&amount=0"
    },
    bride: {
      title: "Mừng Cưới Cô Dâu (Nhà Gái)",
      bankName: "Techcombank",
      accountNumber: "19034567891011",
      accountHolder: "TRAN VI THAO",
      branch: "Chi nhánh Sài Gòn",
      qrImage: "https://api.vietqr.io/image/970407-19034567891011-compact2.jpg?accountName=TRAN%20VI%20THAO&amount=0"
    }
  },

  // 9. NHẠC NỀN (AUDIO)
  music: {
    url: "assets/audio/Yêu Em Hơn Mỗi Ngày  Andiez  Official MV - Andiez Official.mp3",
    title: "Yêu Em Hơn Mỗi Ngày - Andiez",
    startTime: 10 // Bắt đầu phát từ giây thứ 10
  },

  // 10. LỜI CHÚC MẪU BAN ĐẦU (GUESTBOOK SEED)
  initialWishes: [
    {
      name: "Anh Tuấn & Chị Ngọc",
      message: "Chúc hai em trăm năm hạnh phúc, đầu bạc răng long, sớm có tin vui nhé!",
      time: "2 giờ trước"
    },
    {
      name: "Nhóm Bạn Thân Đại Học",
      message: "Mừng ngày chú rể đẹp trai nhất nhóm đã tìm thấy một nửa tuyệt vời của đời mình! Chúc hai bạn mãi ngọt ngào như ngày đầu!",
      time: "5 giờ trước"
    },
    {
      name: "Bé Mai (Em họ)",
      message: "Chúc anh chị của em luôn yêu thương và cùng nhau xây đắp tổ ấm thật ấm áp và hạnh phúc ạ!",
      time: "1 ngày trước"
    }
  ]
};
