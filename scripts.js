let pages = document.querySelectorAll('.page');
let currentPageIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    
    const pages = document.querySelectorAll('.page');
    let startX, startY, endX, endY;

    document.addEventListener('touchstart', (event) => {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    });

    document.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;

        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);

        if (deltaX > deltaY) {
            if (endX > startX) {
                // Swipe right
                showPage('next');
            } else {
                // Swipe left
                showPage('prev');
            }
        }
    });

    let currentPageIndex = 0;

    document.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scroll down
            showPage('next');
        } else {
            // Scroll up
            showPage('prev');
        }
    });

    // Inisiasi countdown dan event listeners
    showPage('home');    
    startCountdown();
    setupEventListeners();

    // Menampilkan halaman utama dan workspace-container
    document.getElementById('pre-invitation').style.display = 'block';
    document.getElementById('workspace-container').style.display = 'none';
});

function openInvitation() {
    console.log("openInvitation called");

    // Sembunyikan halaman pembuka undangan
    document.getElementById('pre-invitation').classList.add('d-none');
    
    // Pastikan workspace-container ditampilkan
    document.getElementById('workspace-container').classList.remove('d-none');

    openFullscreen();
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
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

function showPage(pageId) {
    if (pageId === 'next') {
        currentPageIndex++;
        if (currentPageIndex >= pages.length) {
            currentPageIndex = 0;
        }
        pageId = pages[currentPageIndex].id;
    } else if (pageId === 'prev') {
        currentPageIndex--;
        if (currentPageIndex < 0) {
            currentPageIndex = pages.length - 1;
        }
        pageId = pages[currentPageIndex].id;
    }
    
    // Semua halaman disembunyikan dengan menambahkan class 'd-none'
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('d-none');
        page.classList.remove('slide-in-down', 'slide-out-up');
        document.getElementById('cashlessContainer').style.display = 'none';
        document.getElementById('kirimKadoContainer').style.display = 'none';
    });

    // Sembunyikan workspace-container jika pre-invitation aktif
    const preInvitationPage = document.getElementById('pre-invitation');
    const workspaceContainer = document.getElementById('workspace-container');
    if (preInvitationPage && !preInvitationPage.classList.contains('d-none')) {
        workspaceContainer.classList.add('d-none');
    } else {
        workspaceContainer.classList.remove('d-none');
    }
    
    // Tampilkan halaman yang dipilih dan tambahkan animasi
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('d-none');
        selectedPage.classList.add('slide-in-down');
    }

    // Sembunyikan cashlessContainer dan kirimKadoContainer dengan animasi
    const cashlessContainer = document.getElementById('cashlessContainer');
    const kirimKadoContainer = document.getElementById('kirimKadoContainer');

    if (cashlessContainer) {
        cashlessContainer.classList.remove('slide-in-down');
        cashlessContainer.classList.add('slide-out-up');
        setTimeout(() => cashlessContainer.style.display = 'none', 500); // Menunggu animasi selesai
    }

    if (kirimKadoContainer) {
        kirimKadoContainer.classList.remove('slide-in-down');
        kirimKadoContainer.classList.add('slide-out-up');
        setTimeout(() => kirimKadoContainer.style.display = 'none', 500); // Menunggu animasi selesai
    }

    document.getElementById('btnCashless').addEventListener('click', function() {
    const cashlessContainer = document.getElementById('cashlessContainer');
    const kirimKadoContainer = document.getElementById('kirimKadoContainer');

    kirimKadoContainer.style.display = 'none';
    kirimKadoContainer.classList.remove('slide-in-down');
    kirimKadoContainer.classList.add('slide-out-up');

    cashlessContainer.style.display = 'block';
    cashlessContainer.classList.remove('slide-out-up');
    cashlessContainer.classList.add('slide-in-down');
    });

    document.getElementById('btnKirimKado').addEventListener('click', function() {
    const cashlessContainer = document.getElementById('cashlessContainer');
    const kirimKadoContainer = document.getElementById('kirimKadoContainer');

    cashlessContainer.style.display = 'none';
    cashlessContainer.classList.remove('slide-in-down');
    cashlessContainer.classList.add('slide-out-up');

    kirimKadoContainer.style.display = 'block';
    kirimKadoContainer.classList.remove('slide-out-up');
    kirimKadoContainer.classList.add('slide-in-down');
    });


    // Hapus class 'active' dari semua tombol di navbar
    const navItems = document.querySelectorAll('.navbar-nav .nav-item .btn');
    navItems.forEach(btn => {
        btn.classList.remove('active');
    });

    // Tambahkan class 'active' ke tombol yang dipilih
    const activeBtn = document.querySelector(`.navbar-nav .nav-item .btn[onclick="showPage('${pageId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    // Update navbar menu item's active state
  const navbarMenuItems = document.querySelectorAll('.navbar-nav .nav-item');
  navbarMenuItems.forEach(item => {
    if (item.getAttribute('data-page-id') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
    });
    }

function startCountdown() {
    const countDownDate = new Date("September 22, 2024 08:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "Acara Dimulai!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }, 1000);
}
;

document.getElementById('btnCashless').addEventListener('click', function() {
    document.getElementById('cashlessContainer').style.display = 'block';
    document.getElementById('kirimKadoContainer').style.display = 'none';
});

document.getElementById('btnKirimKado').addEventListener('click', function() {
    document.getElementById('cashlessContainer').style.display = 'none';
    document.getElementById('kirimKadoContainer').style.display = 'block';
});
