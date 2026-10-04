/**
 * MODULE: ĐỒNG HỒ ĐẾM NGƯỢC THỜI GIAN THỰC (COUNTDOWN TIMER)
 */

function initCountdown() {
  const configDate = window.WEDDING_CONFIG?.weddingDate || "2026-12-28T11:00:00";
  const targetDate = new Date(configDate).getTime();

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  const countdownBanner = document.getElementById("cd-banner-text");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (countdownBanner) {
        countdownBanner.textContent = "🎉 Hôm nay là ngày hạnh phúc của chúng mình! 🎉";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", initCountdown);
