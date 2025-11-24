/* ========================================
   JOKI HAL - MAIN JAVASCRIPT
   ======================================== */

// Initialize when document is ready
$(document).ready(function() {
    initializeSliders();
    initializeForm();
    initializeSmoothScroll();
});

/* ========================================
   INITIALIZE SLIDERS
   ======================================== */
function initializeSliders() {
    // TimeTable Slider
    $('.timetable-slider').slick({
        dots: true,
        infinite: true,
        speed: CONFIG.SLIDER_SPEED,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: CONFIG.SLIDER_AUTOPLAY_SPEED,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true
                }
            }
        ]
    });

    // Testimonial Slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: CONFIG.SLIDER_SPEED,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: CONFIG.SLIDER_AUTOPLAY_SPEED + 1000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true
                }
            }
        ]
    });
}

/* ========================================
   SHOW FORM FUNCTION
   ======================================== */
function showForm(type) {
    const typeNames = JOKI_TYPES;
    
    document.getElementById('formTitle').textContent = `Form Pemesanan - ${typeNames[type]}`;
    document.getElementById('jenisJoki').value = type;
    
    const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    orderModal.hide();
    
    const formModal = new bootstrap.Modal(document.getElementById('formModal'));
    formModal.show();
}

/* ========================================
   INITIALIZE FORM
   ======================================== */
function initializeForm() {
    document.getElementById('orderForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button dan tampilkan loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        // Validasi URL Apps Script
        if (CONFIG.SCRIPT_URL === 'GANTI_DENGAN_URL_APPS_SCRIPT_ANDA') {
            showAlert('❌ Error: URL Apps Script belum diatur! Silakan update file js/config.js', 'danger');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }
        
        const formData = {
            jenisJoki: document.getElementById('jenisJoki').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            username: document.getElementById('username').value,
            namaMember: document.getElementById('namaMember').value,
            tanggal: document.getElementById('tanggal').value,
            sesi: document.getElementById('sesi').value,
            jumlahTiket: document.getElementById('jumlahTiket').value,
            timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
            secret: CONFIG.SECRET_TOKEN
        };
        
        try {
            const response = await fetch(CONFIG.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            });
            
            // Karena mode no-cors, kita tidak bisa baca response
            // Tapi jika tidak error, berarti berhasil
            showAlert('✅ Pesanan berhasil dikirim! Kami akan segera menghubungi Anda melalui email/WhatsApp.', 'success');
            
            // Reset form
            document.getElementById('orderForm').reset();
            
            // Tutup modal
            setTimeout(() => {
                const formModal = bootstrap.Modal.getInstance(document.getElementById('formModal'));
                formModal.hide();
            }, 1500);
            
        } catch (error) {
            console.error('Error:', error);
            showAlert('❌ Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.', 'danger');
        } finally {
            // Enable button kembali
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

/* ========================================
   SHOW ALERT FUNCTION
   ======================================== */
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.hasAttribute('data-bs-toggle')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}