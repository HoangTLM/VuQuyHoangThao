/**
 * MODULE: ÂM THANH NỀN & HIỆU ỨNG MỞ PHONG BÌ (MUSIC & ENVELOPE)
 */

let bgAudio = null;
let isPlaying = false;

function initMusicAndEnvelope() {
  const envelopeScreen = document.getElementById("envelope-screen");
  const openBtn = document.getElementById("btn-open-invitation");
  const musicBtn = document.getElementById("music-disc-btn");
  const musicDiscImg = document.getElementById("music-disc-img");

  const rawMusicUrl = window.WEDDING_CONFIG?.music?.url || "";
  const startTime = window.WEDDING_CONFIG?.music?.startTime || 10;

  if (rawMusicUrl) {
    const musicUrl = encodeURI(rawMusicUrl);
    bgAudio = new Audio(musicUrl);
    bgAudio.loop = true;
    bgAudio.preload = "auto";

    bgAudio.addEventListener("loadedmetadata", () => {
      if (bgAudio.currentTime < startTime) {
        bgAudio.currentTime = startTime;
      }
    });
  }

  function playMusic() {
    if (!bgAudio) return;
    try {
      if (bgAudio.currentTime < startTime) {
        bgAudio.currentTime = startTime;
      }
    } catch (e) {
      console.log("Could not set currentTime yet:", e);
    }

    bgAudio.play().then(() => {
      isPlaying = true;
      if (musicDiscImg) {
        musicDiscImg.classList.remove("spin-paused");
        musicDiscImg.classList.add("spin-slow");
      }
    }).catch(err => {
      console.log("Audio autoplay was prevented:", err);
    });
  }

  function toggleMusic() {
    if (!bgAudio) return;
    if (isPlaying) {
      bgAudio.pause();
      isPlaying = false;
      if (musicDiscImg) {
        musicDiscImg.classList.add("spin-paused");
      }
    } else {
      bgAudio.play();
      isPlaying = true;
      if (musicDiscImg) {
        musicDiscImg.classList.remove("spin-paused");
        musicDiscImg.classList.add("spin-slow");
      }
    }
  }

  // Sự kiện mở phong bì
  if (openBtn && envelopeScreen) {
    openBtn.addEventListener("click", () => {
      // 1. Phát nhạc khi có tương tác trực tiếp của người dùng
      playMusic();

      // 2. Kích hoạt hiệu ứng mở phong bì
      const envelopeBox = document.getElementById("envelope-box");
      if (envelopeBox) {
        envelopeBox.classList.add("opening");
      }

      setTimeout(() => {
        envelopeScreen.classList.add("opened");
        document.body.style.overflow = "auto";
        // Refresh AOS sau khi phong bì mở
        if (window.AOS) {
          window.AOS.refresh();
        }
      }, 700);
    });
  }

  // Sự kiện bấm nút đĩa than bật/tắt nhạc
  if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
  }
}

document.addEventListener("DOMContentLoaded", initMusicAndEnvelope);
