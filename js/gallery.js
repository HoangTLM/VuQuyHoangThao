/**
 * MODULE: TRÌNH XEM ẢNH CƯỚI LIGHTBOX (GALLERY LIGHTBOX VIEWER)
 */

let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(index) {
  currentImageIndex = index;
  const modal = document.getElementById("gallery-lightbox-modal");
  const modalImg = document.getElementById("lightbox-image");
  const modalCaption = document.getElementById("lightbox-caption");
  const modalCounter = document.getElementById("lightbox-counter");

  if (!modal || !modalImg) return;

  const currentItem = galleryImages[currentImageIndex];
  if (!currentItem) return;

  modalImg.src = currentItem.url;
  if (modalCaption) modalCaption.textContent = currentItem.caption || "";
  if (modalCounter) modalCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("gallery-lightbox-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.removeProperty("overflow");
}

function nextLightboxImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function prevLightboxImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentImageIndex);
}

function initGallery() {
  galleryImages = window.WEDDING_CONFIG?.gallery || [];
  const galleryContainer = document.getElementById("gallery-grid");

  if (galleryContainer && galleryImages.length > 0) {
    galleryContainer.innerHTML = galleryImages.map((img, idx) => `
      <div 
        class="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer aspect-[3/4] bg-neutral-100"
        data-aos="fade-up" 
        data-aos-delay="${(idx % 4) * 100}"
        onclick="openLightbox(${idx})"
      >
        <img 
          src="${img.url}" 
          alt="${img.caption || 'Ảnh cưới'}" 
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p class="text-white text-sm font-medium drop-shadow">${img.caption || ''}</p>
        </div>
        <div class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
          <i data-lucide="maximize-2" class="w-4 h-4 text-neutral-800"></i>
        </div>
      </div>
    `).join("");

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Gắn sự kiện bàn phím & swipe
  const modal = document.getElementById("gallery-lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", prevLightboxImage);
  if (nextBtn) nextBtn.addEventListener("click", nextLightboxImage);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.id === "lightbox-backdrop") {
        closeLightbox();
      }
    });

    // Hỗ trợ vuốt trên điện thoại
    let touchStartX = 0;
    let touchEndX = 0;
    modal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextLightboxImage(); // Vuốt sang trái -> xem ảnh tiếp
      } else if (touchEndX - touchStartX > 50) {
        prevLightboxImage(); // Vuốt sang phải -> xem ảnh trước
      }
    }, { passive: true });
  }

  document.addEventListener("keydown", (e) => {
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxImage();
    if (e.key === "ArrowLeft") prevLightboxImage();
  });
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

document.addEventListener("DOMContentLoaded", initGallery);
