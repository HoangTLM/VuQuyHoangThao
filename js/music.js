/**
 * MODULE: ÂM THANH NỀN & HIỆU ỨNG MỞ PHONG BÌ (MUSIC & ENVELOPE)
 */

let bgAudio = null;
let isPlaying = false;
let hasSeekedToStart = false;

function initMusicAndEnvelope() {
  const envelopeScreen = document.getElementById("envelope-screen");
  const openBtn = document.getElementById("btn-open-invitation");
  const musicBtn = document.getElementById("music-disc-btn");
  const musicDiscImg = document.getElementById("music-disc-img");

  const rawMusicUrl = window.WEDDING_CONFIG?.music?.url || "";
  const startTime = window.WEDDING_CONFIG?.music?.startTime || 10;

  function doSeek() {
    if (hasSeekedToStart || !bgAudio) return;
    try {
      if (bgAudio.readyState >= 1) { // HAVE_METADATA trở lên mới seek được trên web server
        bgAudio.currentTime = startTime;
        if (Math.abs(bgAudio.currentTime - startTime) <= 1) {
          hasSeekedToStart = true;
        }
      }
    } catch (e) {
      console.warn("Seek error:", e);
    }
  }

  if (rawMusicUrl) {
    const musicUrl = encodeURI(rawMusicUrl);
    bgAudio = new Audio(musicUrl);
    bgAudio.loop = true;
    bgAudio.preload = "auto";

    // Bắt các sự kiện khi audio đã tải xong metadata và có thể seek
    bgAudio.addEventListener("loadedmetadata", doSeek);
    bgAudio.addEventListener("canplay", doSeek);
    bgAudio.addEventListener("playing", doSeek);

    // Chặn bắt ngay nhịp phát đầu tiên: nếu phát từ 0s thì lập tức tua tới giây thứ 10
    bgAudio.addEventListener("timeupdate", () => {
      if (!hasSeekedToStart && startTime > 0) {
        if (bgAudio.currentTime < startTime - 0.3) {
          try {
            bgAudio.currentTime = startTime;
            hasSeekedToStart = true;
          } catch (e) {}
        } else {
          hasSeekedToStart = true;
        }
      }
    });
  }

  function playMusic() {
    if (!bgAudio) return;
    doSeek();

    bgAudio.play().then(() => {
      isPlaying = true;
      doSeek();
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
