/**
 * MODULE: XÁC NHẬN THAM DỰ (RSVP) & SỔ LƯU BÚT LỜI CHÚC (GUESTBOOK)
 */

function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg class="w-5 h-5 text-sky-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#bae6fd', '#3b82f6']
    });
  }
}

function initRsvpAndGuestbook() {
  // 1. Xử lý Form RSVP
  const rsvpForm = document.getElementById("rsvp-form");
  if (rsvpForm) {
    // Tự động điền tên nếu có param URL ?to=
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to");
    const nameInput = document.getElementById("rsvp-name");
    if (guestParam && nameInput) {
      nameInput.value = guestParam;
    }

    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("rsvp-name")?.value || "",
        phone: document.getElementById("rsvp-phone")?.value || "",
        side: document.querySelector('input[name="side"]:checked')?.value || "Bạn Cô Dâu & Chú Rể",
        attending: document.querySelector('input[name="attending"]:checked')?.value || "Có tham dự",
        guestsCount: document.getElementById("rsvp-count")?.value || "1",
        note: document.getElementById("rsvp-note")?.value || "",
        time: new Date().toLocaleString("vi-VN")
      };

      // Lưu trữ cục bộ
      const existingRsvps = JSON.parse(localStorage.getItem("wedding_rsvp_list") || "[]");
      existingRsvps.unshift(formData);
      localStorage.setItem("wedding_rsvp_list", JSON.stringify(existingRsvps));

      triggerConfetti();
      showToast("Cảm ơn bạn! Thông tin tham dự đã được gửi đến dâu rể.");
      rsvpForm.reset();
    });
  }

  // 2. Xử lý Sổ Lưu Bút Lời Chúc (Guestbook)
  const wishForm = document.getElementById("wish-form");
  const wishesListContainer = document.getElementById("wishes-list");

  function getWishes() {
    const saved = localStorage.getItem("wedding_wishes_list");
    if (saved) {
      return JSON.parse(saved);
    }
    return window.WEDDING_CONFIG?.initialWishes || [];
  }

  function renderWishes() {
    if (!wishesListContainer) return;
    const wishes = getWishes();

    wishesListContainer.innerHTML = wishes.map((item) => `
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-sky-100/80 shadow-sm transition hover:shadow-md">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 text-sky-900 font-bold flex items-center justify-center text-sm shadow-inner">
              ${item.name.charAt(0).toUpperCase()}
            </div>
            <span class="font-semibold text-neutral-800 text-sm md:text-base">${item.name}</span>
          </div>
          <span class="text-xs text-neutral-400">${item.time || 'Vừa xong'}</span>
        </div>
        <p class="text-neutral-600 text-sm leading-relaxed pl-11">${item.message}</p>
      </div>
    `).join("");
  }

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("wish-name")?.value.trim();
      const message = document.getElementById("wish-message")?.value.trim();

      if (!name || !message) return;

      const newWish = {
        name: name,
        message: message,
        time: "Vừa xong"
      };

      const wishes = getWishes();
      wishes.unshift(newWish);
      localStorage.setItem("wedding_wishes_list", JSON.stringify(wishes));

      renderWishes();
      triggerConfetti();
      showToast("Đã gửi lời chúc phúc thành công!");
      wishForm.reset();
    });
  }

  renderWishes();
}

window.showToast = showToast;
document.addEventListener("DOMContentLoaded", initRsvpAndGuestbook);
