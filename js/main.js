/**
 * MAIN LOGIC & DATA INJECTION
 */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // 1. CÁ NHÂN HÓA LỜI MỜI TỪ URL PARAMETER (?to=, ?guest=, ?u=, ?k=)
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to") || urlParams.get("guest") || urlParams.get("u") || urlParams.get("k");
  const guestDisplayEl = document.getElementById("personalized-guest-name");
  const envelopeGuestEl = document.getElementById("envelope-guest-name");

  if (guestParam) {
    const formattedName = decodeURIComponent(guestParam).replace(/\+/g, " ").trim();
    if (guestDisplayEl) {
      guestDisplayEl.textContent = `Trân trọng kính mời: ${formattedName}`;
      guestDisplayEl.classList.remove("hidden");
    }
    if (envelopeGuestEl) {
      envelopeGuestEl.textContent = `Kính gửi: ${formattedName}`;
    }
  }

  // 2. NẠP THÔNG TIN CẶP ĐÔI
  setText("bride-name-hero", cfg.bride.name);
  setText("groom-name-hero", cfg.groom.name);
  setText("envelope-bride-name", cfg.bride.name);
  setText("envelope-groom-name", cfg.groom.name);
  setText("groom-fullname", cfg.groom.fullName);
  setText("groom-parents", cfg.groom.parents);
  setText("groom-desc", cfg.groom.description);
  setImage("groom-avatar", cfg.groom.avatar);

  setText("bride-fullname", cfg.bride.fullName);
  setText("bride-parents", cfg.bride.parents);
  setText("bride-desc", cfg.bride.description);
  setImage("bride-avatar", cfg.bride.avatar);
  if (cfg.heroBackground) {
    setImage("hero-background-img", cfg.heroBackground);
  }

  setText("wedding-date-solar", cfg.displayDate.solar);
  setText("wedding-date-lunar", cfg.displayDate.lunar);
  setText("wedding-quote", cfg.quote);
  setText("invitation-message", cfg.invitationMessage);

  // 3. NẠP CÂU CHUYỆN TÌNH YÊU (LOVE STORY TIMELINE)
  const storyContainer = document.getElementById("love-story-timeline");
  if (storyContainer && cfg.story) {
    storyContainer.innerHTML = cfg.story.map((item, idx) => {
      const isEven = idx % 2 === 0;
      return `
        <div class="relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}" 
             data-aos="${isEven ? 'fade-left' : 'fade-right'}" data-aos-duration="900">
          
          <!-- Nội dung -->
          <div class="w-full md:w-5/12 ${isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'} mb-6 md:mb-0">
            <span class="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full mb-2 tracking-wider">
              ${item.year} • ${item.date}
            </span>
            <h4 class="text-xl font-bold text-neutral-800 font-serif-title mb-2">${item.title}</h4>
            <p class="text-neutral-600 text-sm leading-relaxed">${item.content}</p>
          </div>

          <!-- Điểm mốc giữa dòng thời gian -->
          <div class="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white shadow-lg z-10 border-4 border-white">
            <i data-lucide="heart" class="w-4 h-4 fill-current"></i>
          </div>

          <!-- Hình ảnh kỷ niệm -->
          <div class="w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}">
            <div class="overflow-hidden rounded-2xl shadow-lg aspect-video md:aspect-[4/3] group bg-neutral-100 border border-sky-100">
              <img src="${item.image}" alt="${item.title}" loading="lazy" 
                   class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 4. NẠP CÁC SỰ KIỆN CƯỚI (EVENTS)
  const eventsContainer = document.getElementById("events-container");
  if (eventsContainer && cfg.events) {
    if (cfg.events.length === 1) {
      eventsContainer.className = "max-w-xl mx-auto";
    }
    eventsContainer.innerHTML = cfg.events.map((ev, idx) => `
      <div class="wedding-card rounded-3xl p-6 md:p-8 flex flex-col justify-between" 
           data-aos="fade-up" data-aos-delay="${idx * 150}">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-sky-100/80 text-sky-800 flex items-center justify-center mb-5 mx-auto">
            <i data-lucide="${ev.icon || 'calendar'}" class="w-7 h-7"></i>
          </div>
          <h3 class="text-xl font-bold text-center text-neutral-800 font-serif-title mb-3 tracking-wide">${ev.title}</h3>
          
          <div class="text-center my-4 space-y-1">
            <p class="text-lg font-bold text-sky-700">${ev.time}</p>
            <p class="text-xs text-neutral-500 italic">${ev.lunarDate}</p>
          </div>

          <p class="text-center text-sm text-neutral-600 mb-6 leading-relaxed flex items-start justify-center gap-1.5">
            <i data-lucide="map-pin" class="w-4 h-4 text-sky-600 shrink-0 mt-0.5"></i>
            <span>${ev.address}</span>
          </p>
        </div>

        <div class="flex gap-3 pt-4 border-t border-sky-100">
          <a href="${ev.mapUrl}" target="_blank" rel="noopener noreferrer" 
             class="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-sm transition">
            <i data-lucide="navigation" class="w-3.5 h-3.5"></i>
            Chỉ Đường
          </a>
          <button onclick="handleAddToCalendar('${ev.calendarTitle}', '${ev.calendarDesc}', '${ev.address}')" 
                  class="flex-1 py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition">
            <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
            Thêm Vào Lịch
          </button>
        </div>
      </div>
    `).join("");
  }

  // 5. NẠP DRESS CODE
  const dressCodeColorsContainer = document.getElementById("dresscode-palette");
  if (dressCodeColorsContainer && cfg.dressCode?.colors) {
    dressCodeColorsContainer.innerHTML = cfg.dressCode.colors.map(c => `
      <div class="flex flex-col items-center gap-2" data-aos="zoom-in">
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md border-2 ${c.border ? 'border-neutral-300' : 'border-white'}" 
             style="background-color: ${c.hex};"></div>
        <span class="text-xs font-medium text-neutral-700">${c.name}</span>
      </div>
    `).join("");
  }

  const dressNotesContainer = document.getElementById("dresscode-notes");
  if (dressNotesContainer && cfg.dressCode?.notes) {
    dressNotesContainer.innerHTML = cfg.dressCode.notes.map(note => `
      <li class="flex items-start gap-2 text-sm text-neutral-600">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-600 shrink-0 mt-0.5"></i>
        <span>${note}</span>
      </li>
    `).join("");
  }

  // 6. NẠP THÔNG TIN MỪNG CƯỚI (BANK & QR)
  const bankContainer = document.getElementById("bank-accounts-container");
  if (bankContainer && cfg.bankAccounts) {
    const groomB = cfg.bankAccounts.groom;
    const brideB = cfg.bankAccounts.bride;

    bankContainer.innerHTML = [groomB, brideB].map((acc, idx) => `
      <div class="wedding-card rounded-3xl p-6 md:p-8 flex flex-col items-center text-center" 
           data-aos="${idx === 0 ? 'fade-right' : 'fade-left'}">
        <div class="w-12 h-12 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
          <i data-lucide="gift" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-neutral-800 text-base md:text-lg mb-1">${acc.title}</h4>
        <p class="text-xs text-neutral-500 mb-4">${acc.bankName} - ${acc.branch}</p>

        <!-- Mã QR -->
        <div class="p-3 bg-white rounded-2xl shadow-inner border border-neutral-200 mb-4">
          <img src="${acc.qrImage}" alt="Mã QR ${acc.title}" class="w-48 h-48 md:w-52 md:h-52 object-contain rounded-lg" loading="lazy" />
        </div>

        <div class="w-full bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 mb-4">
          <p class="text-xs text-neutral-500 mb-0.5">Chủ tài khoản:</p>
          <p class="font-bold text-neutral-800 text-sm tracking-wide mb-2">${acc.accountHolder}</p>
          <p class="text-xs text-neutral-500 mb-0.5">Số tài khoản:</p>
          <p class="font-mono font-bold text-sky-800 text-base tracking-wider">${acc.accountNumber}</p>
        </div>

        <button onclick="copyToClipboard('${acc.accountNumber}')" 
                class="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition">
          <i data-lucide="copy" class="w-4 h-4"></i>
          Sao Chép Số Tài Khoản
        </button>
      </div>
    `).join("");
  }

  // 7. THANH TIẾN TRÌNH CUỘN TRANG (SCROLL PROGRESS BAR)
  const progressBar = document.getElementById("scroll-progress-bar");
  window.addEventListener("scroll", () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // 8. KHỞI TẠO AOS & ICONS
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false, // Cho phép animation lặp lại mỗi khi cuộn tới
      mirror: true, // Kích hoạt animation khi cuộn ngược từ dưới lên
      offset: 80
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Helper Functions
function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}

function copyToClipboard(text, customMsg) {
  navigator.clipboard.writeText(text).then(() => {
    window.showToast?.(customMsg || `Đã sao chép: ${text}`);
  }).catch(() => {
    window.showToast?.("Không thể sao chép tự động, vui lòng chọn và copy thủ công.");
  });
}

function handleAddToCalendar(title, desc, location) {
  const start = "20261024T110000Z";
  const end = "20261024T143000Z";
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
  window.open(googleCalendarUrl, "_blank");
}

// CÔNG CỤ TẠO LINK MỜI CÁ NHÂN HÓA (DÀNH CHO DÂU RỂ)
function openLinkGenerator() {
  const modal = document.getElementById("link-generator-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    const input = document.getElementById("gen-guest-name");
    if (input) setTimeout(() => input.focus(), 100);
  }
}

function closeLinkGenerator() {
  const modal = document.getElementById("link-generator-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function generatePersonalizedLink() {
  const input = document.getElementById("gen-guest-name");
  const name = input?.value?.trim() || "";
  const resultContainer = document.getElementById("gen-result-container");
  const linkOutput = document.getElementById("gen-link-output");
  const msgOutput = document.getElementById("gen-message-output");

  if (!name) {
    window.showToast?.("Vui lòng nhập tên khách mời (ví dụ: Anh Nam, Bạn Linh)!");
    return;
  }

  // Lấy baseUrl hiện tại (loại bỏ params cũ)
  const baseUrl = window.location.origin + window.location.pathname;
  const encodedName = encodeURIComponent(name);
  const fullLink = `${baseUrl}?to=${encodedName}`;
  const messageText = `Trân trọng kính mời ${name} đến chung vui trong ngày Lễ Vu Quy của Vi Thảo & Minh Hoàng. Xem thiệp mời online tại: ${fullLink}`;

  if (linkOutput) linkOutput.value = fullLink;
  if (msgOutput) msgOutput.value = messageText;
  if (resultContainer) resultContainer.classList.remove("hidden");

  copyToClipboard(fullLink, `Đã tạo & sao chép link mời: "${name}"`);
}

function copyGeneratedMessage() {
  const msgOutput = document.getElementById("gen-message-output");
  if (msgOutput && msgOutput.value) {
    copyToClipboard(msgOutput.value, "Đã sao chép tin nhắn kèm link mời!");
  }
}

function testGeneratedLink() {
  const linkOutput = document.getElementById("gen-link-output");
  if (linkOutput && linkOutput.value) {
    window.open(linkOutput.value, "_blank");
  }
}

window.copyToClipboard = copyToClipboard;
window.handleAddToCalendar = handleAddToCalendar;
window.openLinkGenerator = openLinkGenerator;
window.closeLinkGenerator = closeLinkGenerator;
window.generatePersonalizedLink = generatePersonalizedLink;
window.copyGeneratedMessage = copyGeneratedMessage;
window.testGeneratedLink = testGeneratedLink;
