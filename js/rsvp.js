/**
 * MODULE: XÁC NHẬN THAM DỰ (RSVP), SỔ LƯU BÚT (GUESTBOOK) & QUẢN TRỊ FIREBASE
 * Kết nối trực tiếp Cloud Firestore + Dự phòng LocalStorage + Bảo mật chống XSS/Spam
 */

let db = null;
let isFirebaseReady = false;
let firestoreWishes = [];
let adminRsvpsData = [];
let adminWishesData = [];
let currentAdminTab = "rsvp";
let unsubscribeAdminRsvps = null;
let unsubscribeAdminWishes = null;

// ============================================================================
// 1. TIỆN ÍCH BẢO MẬT & GIAO DIỆN (XSS ESCAPE, TOAST, CONFETTI)
// ============================================================================

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
    <span>${escapeHtml(message)}</span>
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
      colors: ["#0284c7", "#38bdf8", "#7dd3fc", "#bae6fd", "#3b82f6"]
    });
  }
}

function checkCooldown(key, seconds = 10) {
  const lastTime = Number(sessionStorage.getItem(key) || 0);
  const now = Date.now();
  if (now - lastTime < seconds * 1000) {
    const waitSec = Math.ceil((seconds * 1000 - (now - lastTime)) / 1000);
    showToast(`Vui lòng đợi ${waitSec} giây trước khi gửi tiếp nhé!`);
    return false;
  }
  sessionStorage.setItem(key, String(now));
  return true;
}

// ============================================================================
// 2. KHỞI TẠO FIREBASE CLOUD FIRESTORE
// ============================================================================

function initFirebase() {
  try {
    const fbConfig = window.WEDDING_CONFIG?.firebaseConfig;
    if (!fbConfig || !fbConfig.apiKey || !fbConfig.projectId || typeof firebase === "undefined") {
      console.warn("Firebase SDK hoặc firebaseConfig chưa sẵn sàng, sử dụng LocalStorage.");
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(fbConfig);
    }
    db = firebase.firestore();
    isFirebaseReady = true;
    return true;
  } catch (err) {
    console.error("Lỗi khởi tạo Firebase:", err);
    isFirebaseReady = false;
    return false;
  }
}

// ============================================================================
// 3. XỬ LÝ FORM RSVP & SỔ LƯU BÚT LỜI CHÚC
// ============================================================================

function initRsvpAndGuestbook() {
  initFirebase();

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to") || urlParams.get("guest") || urlParams.get("u") || urlParams.get("k");
  const prefilledName = guestParam ? decodeURIComponent(guestParam).replace(/\+/g, " ").trim() : "";

  // Mở nhanh modal Admin nếu trên URL có ?admin=1
  if (urlParams.get("admin") === "1") {
    setTimeout(() => openAdminModal(), 500);
  }

  // --------------------------------------------------------------------------
  // 3.1. Xử lý Form Xác Nhận Tham Dự (RSVP)
  // --------------------------------------------------------------------------
  const rsvpForm = document.getElementById("rsvp-form");
  const nameInput = document.getElementById("rsvp-name");
  const wishNameInput = document.getElementById("wish-name");

  if (prefilledName) {
    if (nameInput) nameInput.value = prefilledName;
    if (wishNameInput) wishNameInput.value = prefilledName;
  }

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const rawName = (document.getElementById("rsvp-name")?.value || "").trim().slice(0, 100);
      const rawPhone = (document.getElementById("rsvp-phone")?.value || "").trim().slice(0, 20);
      const rawSide = document.querySelector('input[name="side"]:checked')?.value || "Nhà Gái (Cô Dâu)";
      const rawAttending = document.querySelector('input[name="attending"]:checked')?.value || "Chắc chắn tham dự";
      const rawCount = document.getElementById("rsvp-count")?.value || "1";
      const rawNote = (document.getElementById("rsvp-note")?.value || "").trim().slice(0, 500);

      if (!rawName) {
        showToast("Vui lòng nhập Họ và Tên của bạn!");
        return;
      }

      if (!checkCooldown("cooldown_rsvp_submit", 10)) return;

      const submitBtn = document.getElementById("rsvp-submit-btn");
      const submitText = document.getElementById("rsvp-submit-text");
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = "Đang gửi xác nhận...";

      const nowStr = new Date().toLocaleString("vi-VN");
      const formData = {
        name: rawName,
        phone: rawPhone,
        side: rawSide,
        attending: rawAttending,
        guestsCount: Number(rawCount) || 1,
        note: rawNote,
        time: nowStr
      };

      // Lưu dự phòng vào LocalStorage
      try {
        const existingRsvps = JSON.parse(localStorage.getItem("wedding_rsvp_list") || "[]");
        existingRsvps.unshift(formData);
        localStorage.setItem("wedding_rsvp_list", JSON.stringify(existingRsvps));
      } catch (err) {}

      // Lưu lên Firebase Cloud Firestore
      if (isFirebaseReady && db) {
        try {
          await db.collection("rsvps").add({
            ...formData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (err) {
          console.error("Lỗi lưu RSVP lên Firestore:", err);
        }
      }

      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = "Gửi Xác Nhận Tham Dự";

      triggerConfetti();
      showToast("Cảm ơn bạn! Thông tin xác nhận tham dự đã được gửi đến dâu rể.");
      rsvpForm.reset();
      if (prefilledName && nameInput) nameInput.value = prefilledName;
    });
  }

  // --------------------------------------------------------------------------
  // 3.2. Xử lý Sổ Lưu Bút Lời Chúc (Guestbook) Realtime với Firestore
  // --------------------------------------------------------------------------
  const wishForm = document.getElementById("wish-form");
  const wishesListContainer = document.getElementById("wishes-list");

  function getLocalWishes() {
    try {
      const saved = localStorage.getItem("wedding_wishes_list");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  }

  function renderWishes() {
    if (!wishesListContainer) return;

    const combined = isFirebaseReady ? firestoreWishes : getLocalWishes();

    if (combined.length === 0) {
      wishesListContainer.innerHTML = `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-sky-100/80 text-center text-neutral-500 text-sm italic">
          Hãy là người đầu tiên gửi lời chúc phúc ngọt ngào đến Vi Thảo & Minh Hoàng nhé! 💕
        </div>
      `;
      return;
    }

    wishesListContainer.innerHTML = combined
      .map((item) => {
        const safeName = escapeHtml(item.name || "Khách mời");
        const safeMsg = escapeHtml(item.message || "");
        const safeTime = escapeHtml(item.time || "Vừa xong");
        const firstChar = (item.name || "K").trim().charAt(0).toUpperCase();

        return `
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-sky-100/80 shadow-sm transition hover:shadow-md">
          <div class="flex items-center justify-between mb-2 gap-2">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 text-sky-900 font-bold flex items-center justify-center text-sm shadow-inner shrink-0">
                ${escapeHtml(firstChar)}
              </div>
              <span class="font-semibold text-neutral-800 text-sm md:text-base truncate">${safeName}</span>
            </div>
            <span class="text-xs text-neutral-400 shrink-0">${safeTime}</span>
          </div>
          <p class="text-neutral-600 text-sm leading-relaxed pl-11 break-words">${safeMsg}</p>
        </div>
      `;
      })
      .join("");
  }

  // Lắng nghe dữ liệu lời chúc thời gian thực từ Cloud Firestore
  if (isFirebaseReady && db) {
    try {
      localStorage.removeItem("wedding_wishes_list");
    } catch (e) {}
    db.collection("wishes")
      .orderBy("createdAt", "desc")
      .limit(100)
      .onSnapshot(
        (snapshot) => {
          firestoreWishes = snapshot.docs.map((doc) => {
            const d = doc.data();
            return {
              id: doc.id,
              name: d.name || "Khách mời",
              message: d.message || "",
              time: d.time || "Vừa xong"
            };
          });
          renderWishes();
        },
        (err) => {
          console.warn("Không thể lắng nghe collection wishes (kiểm tra Firestore Rules):", err);
          renderWishes();
        }
      );
  } else {
    renderWishes();
  }

  if (wishForm) {
    wishForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const rawName = (document.getElementById("wish-name")?.value || "").trim().slice(0, 100);
      const rawMessage = (document.getElementById("wish-message")?.value || "").trim().slice(0, 1000);

      if (!rawName || !rawMessage) return;
      if (!checkCooldown("cooldown_wish_submit", 10)) return;

      const submitBtn = document.getElementById("wish-submit-btn");
      const submitText = document.getElementById("wish-submit-text");
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = "Đang gửi lời chúc...";

      const nowStr = new Date().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      const newWish = {
        name: rawName,
        message: rawMessage,
        time: nowStr
      };

      // Lưu dự phòng vào LocalStorage
      try {
        const localWishes = getLocalWishes();
        const baseList = localWishes.length > 0 ? localWishes : [...(window.WEDDING_CONFIG?.initialWishes || [])];
        baseList.unshift(newWish);
        localStorage.setItem("wedding_wishes_list", JSON.stringify(baseList));
      } catch (err) {}

      // Lưu lên Cloud Firestore
      if (isFirebaseReady && db) {
        try {
          await db.collection("wishes").add({
            ...newWish,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (err) {
          console.error("Lỗi lưu lời chúc lên Firestore:", err);
          // Nếu Firestore chưa mở rule, hiển thị tạm vào mảng hiện tại
          firestoreWishes.unshift(newWish);
          renderWishes();
        }
      } else {
        renderWishes();
      }

      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = "Gửi Lời Chúc Phúc";

      triggerConfetti();
      showToast("Đã gửi lời chúc phúc thành công! Cảm ơn bạn rất nhiều.");
      wishForm.reset();
      if (prefilledName && wishNameInput) wishNameInput.value = prefilledName;
    });
  }
}

// ============================================================================
// 4. BẢNG QUẢN TRỊ KHÁCH MỜI & LỜI CHÚC (ADMIN MODAL CHO DÂU RỂ)
// ============================================================================

function openAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  const isUnlocked = sessionStorage.getItem("wedding_admin_unlocked") === "true";
  if (isUnlocked) {
    showAdminDashboard();
  } else {
    const input = document.getElementById("admin-pin-input");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
    }
  }
}

function closeAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function verifyAdminPin() {
  const input = document.getElementById("admin-pin-input");
  const enteredPin = (input?.value || "").trim();
  const correctPin = String(window.WEDDING_CONFIG?.adminPin || "241026");

  if (enteredPin === correctPin) {
    sessionStorage.setItem("wedding_admin_unlocked", "true");
    showAdminDashboard();
  } else {
    showToast("Mã PIN chưa chính xác!");
  }
}

function showAdminDashboard() {
  const pinScreen = document.getElementById("admin-pin-screen");
  const dashScreen = document.getElementById("admin-dashboard-screen");
  if (pinScreen) pinScreen.classList.add("hidden");
  if (dashScreen) {
    dashScreen.classList.remove("hidden");
    dashScreen.classList.add("flex");
  }
  subscribeAdminData();
}

function subscribeAdminData() {
  const badge = document.getElementById("admin-firebase-badge");

  if (isFirebaseReady && db) {
    if (badge) {
      badge.textContent = "● Cloud Firestore";
      badge.className = "text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700";
    }

    if (!unsubscribeAdminRsvps) {
      unsubscribeAdminRsvps = db
        .collection("rsvps")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snap) => {
            adminRsvpsData = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            updateAdminStats();
            renderAdminRsvpList();
          },
          (err) => {
            console.warn("Lỗi đọc rsvps từ Firestore:", err);
            adminRsvpsData = JSON.parse(localStorage.getItem("wedding_rsvp_list") || "[]");
            updateAdminStats();
            renderAdminRsvpList();
          }
        );
    }

    if (!unsubscribeAdminWishes) {
      unsubscribeAdminWishes = db
        .collection("wishes")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snap) => {
            adminWishesData = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            updateAdminStats();
            renderAdminWishesList();
          },
          (err) => {
            console.warn("Lỗi đọc wishes từ Firestore:", err);
            adminWishesData = JSON.parse(localStorage.getItem("wedding_wishes_list") || "[]");
            updateAdminStats();
            renderAdminWishesList();
          }
        );
    }
  } else {
    if (badge) {
      badge.textContent = "● Lưu Cục Bộ (Local)";
      badge.className = "text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700";
    }
    adminRsvpsData = JSON.parse(localStorage.getItem("wedding_rsvp_list") || "[]");
    adminWishesData = JSON.parse(localStorage.getItem("wedding_wishes_list") || "[]");
    updateAdminStats();
    renderAdminRsvpList();
    renderAdminWishesList();
  }
}

function updateAdminStats() {
  let totalGuestsAttending = 0;
  let attendingResponses = 0;
  let brideGuests = 0;
  let groomGuests = 0;

  adminRsvpsData.forEach((item) => {
    const isAttending = String(item.attending || "").includes("Chắc chắn");
    const count = Number(item.guestsCount) || 1;
    if (isAttending) {
      attendingResponses++;
      totalGuestsAttending += count;
      if (String(item.side || "").includes("Nhà Gái")) {
        brideGuests += count;
      } else {
        groomGuests += count;
      }
    }
  });

  const elTotalGuests = document.getElementById("stat-total-guests");
  const elAttendingCount = document.getElementById("stat-attending-count");
  const elSideSplit = document.getElementById("stat-side-split");
  const elTotalWishes = document.getElementById("stat-total-wishes");

  if (elTotalGuests) elTotalGuests.textContent = `${totalGuestsAttending} người`;
  if (elAttendingCount) elAttendingCount.textContent = `${attendingResponses} / ${adminRsvpsData.length}`;
  if (elSideSplit) elSideSplit.textContent = `${brideGuests} Gái • ${groomGuests} Trai`;
  if (elTotalWishes) elTotalWishes.textContent = String(adminWishesData.length);
}

function switchAdminTab(tab) {
  currentAdminTab = tab;
  const btnRsvp = document.getElementById("tab-btn-rsvp");
  const btnWishes = document.getElementById("tab-btn-wishes");
  const listRsvp = document.getElementById("admin-rsvp-list");
  const listWishes = document.getElementById("admin-wishes-list");
  const filterSelect = document.getElementById("admin-rsvp-filter");

  if (tab === "rsvp") {
    btnRsvp.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-sky-700 shadow-sm transition";
    btnWishes.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-800 transition";
    listRsvp?.classList.remove("hidden");
    listWishes?.classList.add("hidden");
    filterSelect?.classList.remove("hidden");
  } else {
    btnWishes.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-sky-700 shadow-sm transition";
    btnRsvp.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-800 transition";
    listWishes?.classList.remove("hidden");
    listRsvp?.classList.add("hidden");
    filterSelect?.classList.add("hidden");
  }
}

function renderAdminRsvpList() {
  const container = document.getElementById("admin-rsvp-list");
  if (!container) return;

  const filter = document.getElementById("admin-rsvp-filter")?.value || "all";
  const filtered = adminRsvpsData.filter((item) => {
    const isAttending = String(item.attending || "").includes("Chắc chắn");
    const isBride = String(item.side || "").includes("Nhà Gái");
    if (filter === "attending") return isAttending;
    if (filter === "not-attending") return !isAttending;
    if (filter === "bride") return isBride;
    if (filter === "groom") return !isBride;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-neutral-400 text-xs">
        Chưa có dữ liệu xác nhận tham dự nào trong mục này.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((item) => {
      const isAttending = String(item.attending || "").includes("Chắc chắn");
      const badgeClass = isAttending
        ? "bg-emerald-100 text-emerald-800"
        : "bg-neutral-100 text-neutral-600";
      const sideBadgeClass = String(item.side || "").includes("Nhà Gái")
        ? "bg-pink-50 text-pink-700 border-pink-200"
        : "bg-sky-50 text-sky-700 border-sky-200";

      return `
      <div class="p-3.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-sm text-neutral-800">${escapeHtml(item.name)}</span>
            <span class="px-2 py-0.5 rounded-full border text-[11px] font-medium ${sideBadgeClass}">
              ${escapeHtml(item.side)}
            </span>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeClass}">
              ${escapeHtml(item.attending)} (${Number(item.guestsCount) || 1} người)
            </span>
          </div>
          <div class="text-neutral-500 flex flex-wrap gap-x-4 gap-y-1">
            ${item.phone ? `<span>📞 SĐT: <strong>${escapeHtml(item.phone)}</strong></span>` : ""}
            <span>🕒 ${escapeHtml(item.time || "")}</span>
          </div>
          ${item.note ? `<p class="text-neutral-700 bg-white px-2.5 py-1.5 rounded-lg border border-neutral-200/60 mt-1">💬 Ghi chú: ${escapeHtml(item.note)}</p>` : ""}
        </div>
      </div>
    `;
    })
    .join("");
}

function renderAdminWishesList() {
  const container = document.getElementById("admin-wishes-list");
  if (!container) return;

  if (adminWishesData.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-neutral-400 text-xs">
        Chưa có lời chúc nào được gửi lên Cloud Firestore.
      </div>
    `;
    return;
  }

  container.innerHTML = adminWishesData
    .map(
      (item) => `
      <div class="p-3.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 space-y-1 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-sm text-neutral-800">${escapeHtml(item.name)}</span>
          <span class="text-neutral-400">${escapeHtml(item.time || "")}</span>
        </div>
        <p class="text-neutral-600 leading-relaxed">${escapeHtml(item.message)}</p>
      </div>
    `
    )
    .join("");
}

function exportRsvpToCsv() {
  if (adminRsvpsData.length === 0 && adminWishesData.length === 0) {
    showToast("Chưa có dữ liệu để xuất file!");
    return;
  }

  const escapeCsvCell = (val) => {
    const str = String(val ?? "").replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = ["STT", "Họ và Tên", "Số Điện Thoại", "Khách Nhà", "Trạng Thái Tham Dự", "Số Lượng Người", "Ghi Chú", "Thời Gian Gửi"];
  const rows = adminRsvpsData.map((item, idx) => [
    idx + 1,
    item.name || "",
    item.phone || "",
    item.side || "",
    item.attending || "",
    item.guestsCount || 1,
    item.note || "",
    item.time || ""
  ]);

  let csvContent = "\uFEFF"; // BOM UTF-8 để mở bằng Excel hiển thị chuẩn tiếng Việt
  csvContent += "DANH SÁCH XÁC NHẬN THAM DỰ (RSVP) - LỄ VU QUY VI THẢO & MINH HOÀNG\n";
  csvContent += headers.map(escapeCsvCell).join(",") + "\n";
  rows.forEach((row) => {
    csvContent += row.map(escapeCsvCell).join(",") + "\n";
  });

  if (adminWishesData.length > 0) {
    csvContent += "\nSỔ LƯU BÚT LỜI CHÚC\n";
    csvContent += ["STT", "Người Gửi", "Lời Chúc", "Thời Gian"].map(escapeCsvCell).join(",") + "\n";
    adminWishesData.forEach((w, idx) => {
      csvContent += [idx + 1, w.name || "", w.message || "", w.time || ""].map(escapeCsvCell).join(",") + "\n";
    });
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Danh_Sach_Khach_Moi_RSVP_ViThao_MinhHoang.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Đã tải xuống file Excel (CSV) thành công!");
}

window.showToast = showToast;
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.verifyAdminPin = verifyAdminPin;
window.switchAdminTab = switchAdminTab;
window.renderAdminRsvpList = renderAdminRsvpList;
window.exportRsvpToCsv = exportRsvpToCsv;

document.addEventListener("DOMContentLoaded", initRsvpAndGuestbook);
