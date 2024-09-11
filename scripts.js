let currentPageIndex = 0;
let scrollPosition = 0;

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  // Dapatkan elemen dengan ID 'fadeDownElement'
  var fadeDownElement = document.getElementById('fadeDownElement');

  // Tambahkan event listener untuk mendeteksi akhir animasi
  fadeDownElement.addEventListener('animationend', function(event) {
      // Periksa jika animasi yang selesai adalah 'fade-in-down1'
      if (event.animationName === 'fade-in-down1') {
          // Hapus kelas 'fade-in-down1'
          fadeDownElement.classList.remove('fade-in-down1');
      }
  });
  
  let startX, startY, endX, endY;

  document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  });

  document.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);

    if (deltaX > deltaY) {
      if (endX > startX) {
        // Swipe right
        scrollPage("next");
      } else {
        // Swipe left
        scrollPage("prev");
      }
    }
  });

  document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      // Scroll down
      scrollPage("next");
    } else {
      // Scroll up
      scrollPage("prev");
    }
  });

  // Loading screen disembunyikan setelah halaman sepenuhnya dimuat
  const loadingScreen = document.getElementById("loading-screen");
  
  // Menunggu semua konten halaman dimuat sepenuhnya
  window.onload = () => {
    loadingScreen.style.display = "none";
  };

  // Inisiasi countdown dan event listeners
  scrollPage("home");
  startCountdown();

  // Attach event listeners for cashless and kirim kado buttons
  document.getElementById("btnCashless").addEventListener("click", function () {
    document.getElementById("cashlessContainer").style.display = "block";
    document.getElementById("kirimKadoContainer").style.display = "none";
  });

  document.getElementById("btnKirimKado").addEventListener("click", function () {
    document.getElementById("cashlessContainer").style.display = "none";
    document.getElementById("kirimKadoContainer").style.display = "block";
  });

  // Setup other event listeners
  setupEventListeners();

  // Menampilkan halaman utama dan workspace-container
  document.getElementById("pre-invitation").style.display = "block";
  document.getElementById("workspace-container").style.display = "none";
});

// Get the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("tamu");

// Update the guest name element
const guestNameElement = document.getElementById("tamu-name");
if (guestName) {
  guestNameElement.textContent = guestName;
} else {
  guestNameElement.textContent = "[Nama Tamu]";
}

function openInvitation() {
  console.log("openInvitation called");

  // Sembunyikan halaman pembuka undangan
  document.getElementById("pre-invitation").classList.add("d-none");

  // Pastikan workspace-container ditampilkan
  document.getElementById("workspace-container").classList.remove("d-none");

  openFullscreen();

const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");

const music = new Audio("audio/theme.mp3");
let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-volume-up");
  } else {
    music.play();
    musicIcon.classList.remove("fa-volume-up");
    musicIcon.classList.add("fa-pause");
  }
  isPlaying = !isPlaying;
});

music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.play();
});

const context = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = context.createGain();
gainNode.gain.setValueAtTime(0, context.currentTime);
gainNode.connect(context.destination);

music.addEventListener("canplaythrough", () => {
  gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 1);
  music.play();
  musicIcon.classList.remove("fa-volume-up");
  musicIcon.classList.add("fa-pause");
  isPlaying = true;
});
}


function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }
}

function requestFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE11
  }
}

function scrollPage(pageId) {
    if (pageId === "next") {
      scrollPosition += window.innerHeight;
    } else if (pageId === "prev") {
      scrollPosition -= window.innerHeight;
    }
  
    if (scrollPosition < 0) {
      scrollPosition = 0;
    } else if (scrollPosition > document.body.scrollHeight - window.innerHeight) {
      scrollPosition = document
  }
  

  window.scrollTo(0, scrollPosition);

// Fungsi untuk menggulir ke halaman yang dituju
  const page = document.getElementById(pageId);
  if (page) {
    page.scrollIntoView({ behavior: 'smooth' });
  }
}

// Tambahkan event listener pada setiap tombol menu
const navItems = document.querySelectorAll('.navbar-nav .nav-item');
navItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const pageId = item.getAttribute('data-page-id');
    const activeNavItem = document.querySelector('.navbar-nav .nav-item.active');

if (activeNavItem) {
  activeNavItem.classList.remove('active');
}
    item.classList.add('active');
  });
});

  // Semua halaman disembunyikan dengan menambahkan class 'd-none'
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("slide-in-down", "slide-out-up");
    document.getElementById("cashlessContainer").style.display = "none";
    document.getElementById("kirimKadoContainer").style.display = "none";
  });

  // Sembunyikan workspace-container jika pre-invitation aktif
  const preInvitationPage = document.getElementById("pre-invitation");
  const workspaceContainer = document.getElementById("workspace-container");
  if (preInvitationPage && !preInvitationPage.classList.contains("d-none")) {
    workspaceContainer.classList.add("d-none");
  } else {
    workspaceContainer.classList.remove("d-none");
  }

  // Tampilkan halaman yang dipilih dan tambahkan animasi
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add("slide-in-down");
  }

  // Update navbar menu item's active state
const navbarMenuItems = document.querySelectorAll(".navbar-nav .nav-item");
navbarMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarMenuItems.forEach((menuItem) => {
      menuItem.classList.remove("active");
    });
    item.classList.add("active");
  });
});

function startCountdown() {
  const countDownDate = new Date("September 22, 2024 10:00:00").getTime();

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "Acara Dimulai!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);
}
