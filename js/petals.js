/**
 * MODULE: HIỆU ỨNG TRÁI TIM BAY LÃNG MẠN (FLOATING HEARTS CANVAS)
 * Tông màu: Xanh pastel, Xanh da trời & Xanh ngọc dịu êm
 */

function initFloatingHearts() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const TOTAL_HEARTS = Math.min(Math.floor(width / 32), 30);
  const hearts = [];

  // Bảng màu: Xanh da trời & Xanh pastel lãng mạn
  const heartColors = [
    "rgba(2, 132, 199, 0.85)",   // Xanh Sky 600 đậm nét
    "rgba(14, 165, 233, 0.85)",  // Xanh Sky 500 tươi sáng
    "rgba(56, 189, 248, 0.85)",  // Xanh Sky 400 trong trẻo
    "rgba(125, 211, 252, 0.9)",  // Xanh Sky 300 pastel
    "rgba(37, 99, 235, 0.75)",   // Xanh Blue 600 thanh lịch
    "rgba(186, 230, 253, 0.95)"  // Xanh băng tuyết dịu mát
  ];

  class FloatingHeart {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Khởi tạo rải đều khắp màn hình lúc đầu
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -25;
      this.size = Math.random() * 7 + 9; // Kích thước trái tim vừa vặn, tinh tế
      this.speedY = Math.random() * 1.3 + 0.9;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.rotation = (Math.random() - 0.5) * 45; // Nghiêng nhẹ tự nhiên
      this.rotationSpeed = (Math.random() - 0.5) * 1.2;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.swing = Math.random() * 2.2 + 0.8;
      this.swingSpeed = Math.random() * 0.025 + 0.015;
      this.swingAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y += this.speedY;
      this.swingAngle += this.swingSpeed;
      this.x += Math.sin(this.swingAngle) * this.swing + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;

      // Vẽ hình trái tim đối xứng hoàn hảo
      const d = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -d * 0.35);
      ctx.bezierCurveTo(-d * 0.55, -d * 0.9, -d, -d * 0.2, 0, d * 0.85);
      ctx.bezierCurveTo(d, -d * 0.2, d * 0.55, -d * 0.9, 0, -d * 0.35);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_HEARTS; i++) {
    hearts.push(new FloatingHeart());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].update();
      hearts[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener("DOMContentLoaded", initFloatingHearts);
