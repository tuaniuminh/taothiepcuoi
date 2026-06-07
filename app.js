/* ==========================================================================
   E-WEDDING APPLICATION CORE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA STATE & STORAGE
    let rsvpData = JSON.parse(localStorage.getItem('wedding_rsvps')) || [
        {
            id: 'mock-1',
            name: 'Nguyễn Minh Hoàng & Gia đình',
            status: 'attending',
            count: 3,
            wishes: 'Chúc hai cháu trăm năm hạnh phúc, đầu bạc răng long! Sớm sinh quý tử nhé.',
            time: '16:45 07/06/2026'
        },
        {
            id: 'mock-2',
            name: 'Trần Thị Thu Thảo (Bạn cấp 3)',
            status: 'attending',
            count: 1,
            wishes: 'Siêu vui khi nhận được thiệp của Thư! Chúc hai bạn mãi mãi hạnh phúc ngọt ngào như ngày đầu nhé.',
            time: '18:12 07/06/2026'
        },
        {
            id: 'mock-3',
            name: 'Phạm Hồng Nam',
            status: 'absent',
            count: 0,
            wishes: 'Tiếc quá hôm đó mình có lịch công tác nước ngoài không về kịp. Chúc hai bạn đám cưới thật trọn vẹn và viên mãn nha!',
            time: '09:30 08/06/2026'
        }
    ];

    // Save initial mock data if none exists
    if (!localStorage.getItem('wedding_rsvps')) {
        localStorage.setItem('wedding_rsvps', JSON.stringify(rsvpData));
    }

    // 2. DOM ELEMENT SELECTORS
    // Tabs & views
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const viewWrapper = document.querySelector('.invitation-view-wrapper');
    
    // Card Flip
    const invitationCard = document.getElementById('invitation-card');
    const btnOpenCard = document.getElementById('btn-open-card-action');
    const btnCloseCard = document.getElementById('btn-close-card-action');
    const cardRsvpTrigger = document.getElementById('card-rsvp-trigger-btn');
    const cardMapBtn = document.getElementById('card-map-btn');

    // Live inputs
    const inputGroomName = document.getElementById('input-groom-name');
    const inputBrideName = document.getElementById('input-bride-name');
    const inputGroomFather = document.getElementById('input-groom-father');
    const inputGroomMother = document.getElementById('input-groom-mother');
    const inputBrideFather = document.getElementById('input-bride-father');
    const inputBrideMother = document.getElementById('input-bride-mother');
    const inputDate = document.getElementById('input-date');
    const inputTime = document.getElementById('input-time');
    const inputLocation = document.getElementById('input-location');
    const inputQuote = document.getElementById('input-quote');
    const selectFontTitle = document.getElementById('select-font-title');
    const selectFontBody = document.getElementById('select-font-body');
    const uploadCoupleImg = document.getElementById('upload-couple-img');
    const fileNameIndicator = document.getElementById('file-name-indicator');
    const decorToggleBtns = document.querySelectorAll('.decor-toggle-btn');

    // Expanded Content: Story inputs
    const inputStoryT1 = document.getElementById('input-story-t1');
    const inputStoryD1 = document.getElementById('input-story-d1');
    const inputStoryC1 = document.getElementById('input-story-c1');
    const inputStoryT2 = document.getElementById('input-story-t2');
    const inputStoryD2 = document.getElementById('input-story-d2');
    const inputStoryC2 = document.getElementById('input-story-c2');
    const inputStoryT3 = document.getElementById('input-story-t3');
    const inputStoryD3 = document.getElementById('input-story-d3');
    const inputStoryC3 = document.getElementById('input-story-c3');

    // Expanded Content: Gifting inputs
    const inputGroomBank = document.getElementById('input-groom-bank');
    const inputGroomAcc = document.getElementById('input-groom-acc');
    const inputGroomHolder = document.getElementById('input-groom-holder');
    const inputBrideBank = document.getElementById('input-bride-bank');
    const inputBrideAcc = document.getElementById('input-bride-acc');
    const inputBrideHolder = document.getElementById('input-bride-holder');

    // Expanded Content: Card story elements to sync
    const cardStoryT1 = document.getElementById('card-story-t1');
    const cardStoryD1 = document.getElementById('card-story-d1');
    const cardStoryC1 = document.getElementById('card-story-c1');
    const cardStoryT2 = document.getElementById('card-story-t2');
    const cardStoryD2 = document.getElementById('card-story-d2');
    const cardStoryC2 = document.getElementById('card-story-c2');
    const cardStoryT3 = document.getElementById('card-story-t3');
    const cardStoryD3 = document.getElementById('card-story-d3');
    const cardStoryC3 = document.getElementById('card-story-c3');

    // Expanded Content: Card bank elements to sync
    const cardGroomBankName = document.getElementById('card-groom-bank-name');
    const cardGroomAccNum = document.getElementById('card-groom-acc-num');
    const cardGroomAccHolder = document.getElementById('card-groom-acc-holder');
    const cardBrideBankName = document.getElementById('card-bride-bank-name');
    const cardBrideAccNum = document.getElementById('card-bride-acc-num');
    const cardBrideAccHolder = document.getElementById('card-bride-acc-holder');

    // QR Modal Selectors
    const qrModal = document.getElementById('qr-modal');
    const closeQrModalBtn = document.getElementById('close-qr-modal-btn');
    const closeQrModalActionBtn = document.getElementById('close-qr-modal-action-btn');
    const qrModalTitle = document.getElementById('qr-modal-title');
    const qrModalBank = document.getElementById('qr-modal-bank');
    const qrModalAcc = document.getElementById('qr-modal-acc');
    const qrModalHolder = document.getElementById('qr-modal-holder');
    const qrCodeImg = document.getElementById('qr-code-img');

    // Card text elements to sync
    const cardFrontGroom = document.getElementById('card-front-groom');
    const cardFrontBride = document.getElementById('card-front-bride');
    const cardFrontDate = document.getElementById('card-front-date');
    const cardBackGroom = document.getElementById('card-back-groom');
    const cardBackBride = document.getElementById('card-back-bride');
    const cardParentGroomFather = document.getElementById('card-parent-groom-father');
    const cardParentGroomMother = document.getElementById('card-parent-groom-mother');
    const cardParentBrideFather = document.getElementById('card-parent-bride-father');
    const cardParentBrideMother = document.getElementById('card-parent-bride-mother');
    const cardBackDate = document.getElementById('card-back-date');
    const cardBackTime = document.getElementById('card-back-time');
    const cardBackLocation = document.getElementById('card-back-location');
    const cardBackQuote = document.getElementById('card-back-quote');
    const cardCoupleImg = document.getElementById('card-couple-img');

    // Themes selection
    const themeOptions = document.querySelectorAll('.theme-card-option');

    // Music
    const bgMusic = document.getElementById('bg-music');
    const musicIndicatorBtn = document.getElementById('music-indicator-btn');
    const sidebarPlayBtn = document.getElementById('sidebar-play-btn');
    const trackItems = document.querySelectorAll('.track-item');

    // RSVP Modals & forms
    const rsvpModal = document.getElementById('rsvp-modal');
    const closeRsvpModalBtn = document.getElementById('close-rsvp-modal-btn');
    const rsvpForm = document.getElementById('rsvp-simulator-form');
    const rsvpStatusRadio = document.getElementsByName('rsvp-status');
    const rsvpCountWrapper = document.getElementById('rsvp-count-wrapper');
    const simulateRsvpBtn = document.getElementById('simulate-rsvp-btn');

    // Dashboard Modal
    const dashboardModal = document.getElementById('dashboard-modal');
    const openDashboardBtn = document.getElementById('open-dashboard-btn');
    const closeDashboardModalBtn = document.getElementById('close-dashboard-modal-btn');
    const closeDashboardModalActionBtn = document.getElementById('close-dashboard-modal-action-btn');
    const clearRsvpDataBtn = document.getElementById('clear-rsvp-data-btn');
    const rsvpListBody = document.getElementById('rsvp-list-body');
    const statTotalAttending = document.getElementById('stat-total-attending');
    const statTotalAbsent = document.getElementById('stat-total-absent');
    const statTotalResponses = document.getElementById('stat-total-responses');

    // Actions
    const downloadCardBtn = document.getElementById('download-card-btn');
    const getShareLinkBtn = document.getElementById('get-share-link-btn');
    const toastContainer = document.getElementById('toast-container');

    // 3. LAUNCH FLOATING ROSE PETALS ANIMATION
    const petalsContainer = document.getElementById('petals-container');
    const petalColors = ['#fbc7d4', '#ffccd5', '#ffb3c1', '#ffe5ec', '#fff0f3'];

    function createPetal() {
        if (document.querySelectorAll('.petal').length > 25) return; // limit active count for performance
        
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random dimensions
        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Random position, delay, speed
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        const duration = Math.random() * 5 + 5;
        petal.style.animationDuration = `${duration}s, ${Math.random() * 2 + 2}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        
        petalsContainer.appendChild(petal);
        
        // Clean up petal after animation
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Spawn petals periodically
    setInterval(createPetal, 600);

    // 4. TAB NAVIGATION SIDEBAR
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            
            // Deactivate all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Activate target
            button.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // 5. RESPONSIVE PREVIEW VIEW TOGGLES (Mobile vs Desktop)
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedView = button.getAttribute('data-view');
            
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (selectedView === 'mobile') {
                viewWrapper.className = 'invitation-view-wrapper view-mobile';
            } else {
                viewWrapper.className = 'invitation-view-wrapper view-desktop';
            }
        });
    });

    // 6. CARD FLIPPING INTERACTIONS (3D)
    // Click card container to flip (except on interactive buttons inside)
    invitationCard.addEventListener('click', (e) => {
        // Prevent flip if clicking on buttons or links inside the card
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.portrait-frame') || e.target.closest('.back-scroll-container::-webkit-scrollbar')) {
            return;
        }
        invitationCard.classList.toggle('flipped');
    });

    // Open/Close buttons triggers
    btnOpenCard.addEventListener('click', (e) => {
        e.stopPropagation();
        invitationCard.classList.add('flipped');
    });

    btnCloseCard.addEventListener('click', (e) => {
        e.stopPropagation();
        invitationCard.classList.remove('flipped');
    });

    // 7. REAL-TIME INPUT SYNCING & UTILITIES
    function formatVietnameseDate(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        
        const year = parts[0];
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        
        // Find day of week
        const dateObj = new Date(year, month - 1, day);
        const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayOfWeek = weekdays[dateObj.getDay()];
        
        return {
            long: `${dayOfWeek}, Ngày ${day} Tháng ${month}, ${year}`,
            badgeDay: day,
            badgeMonthYear: `THÁNG ${month} ${year}`
        };
    }

    function syncInputsToCard() {
        // Names
        const groomShort = inputGroomName.value.split(' ').pop();
        const brideShort = inputBrideName.value.split(' ').pop();
        
        cardFrontGroom.textContent = groomShort || 'Anh Quân';
        cardFrontBride.textContent = brideShort || 'Minh Thư';
        
        cardBackGroom.textContent = inputGroomName.value || 'Nguyễn Anh Quân';
        cardBackBride.textContent = inputBrideName.value || 'Phan Minh Thư';
        
        // Parents
        cardParentGroomFather.textContent = inputGroomFather.value || 'Nguyễn Văn Hùng';
        cardParentGroomMother.textContent = inputGroomMother.value || 'Lê Thị Mai';
        cardParentBrideFather.textContent = inputBrideFather.value || 'Phan Thanh Hải';
        cardParentBrideMother.textContent = inputBrideMother.value || 'Trần Thị Lan';
        
        // Date & Time
        const dateData = formatVietnameseDate(inputDate.value);
        if (dateData) {
            cardFrontDate.innerHTML = `
                <span class="day">${dateData.badgeDay}</span>
                <span class="month-year">${dateData.badgeMonthYear}</span>
            `;
            cardBackDate.textContent = dateData.long;
        }
        
        cardBackTime.textContent = inputTime.value || '11:00';
        
        // Location & Quote
        cardBackLocation.textContent = inputLocation.value || 'Khách Sạn Palace, 120 Nguyễn Huệ, Quận 1, TP. HCM';
        cardBackQuote.textContent = inputQuote.value ? `"${inputQuote.value.replace(/"/g, '')}"` : '';

        // Sync story items
        if (cardStoryT1) {
            cardStoryT1.textContent = inputStoryT1.value || 'Lần đầu gặp gỡ';
            cardStoryD1.textContent = inputStoryD1.value || '14/02/2021';
            cardStoryC1.textContent = inputStoryC1.value || '';
            
            cardStoryT2.textContent = inputStoryT2.value || 'Lời tỏ tình ngọt ngào';
            cardStoryD2.textContent = inputStoryD2.value || '24/12/2021';
            cardStoryC2.textContent = inputStoryC2.value || '';
            
            cardStoryT3.textContent = inputStoryT3.value || 'Ngày chung đôi';
            cardStoryD3.textContent = inputStoryD3.value || '18/10/2026';
            cardStoryC3.textContent = inputStoryC3.value || '';
        }

        // Sync gifting items
        if (cardGroomBankName) {
            cardGroomBankName.textContent = inputGroomBank.value || 'Vietcombank';
            cardGroomAccNum.textContent = inputGroomAcc.value || '1023456789';
            cardGroomAccHolder.textContent = inputGroomHolder.value || 'NGUYEN ANH QUAN';
            
            cardBrideBankName.textContent = inputBrideBank.value || 'Techcombank';
            cardBrideAccNum.textContent = inputBrideAcc.value || '1903456789123';
            cardBrideAccHolder.textContent = inputBrideHolder.value || 'PHAN MINH THU';
        }
    }

    // Input event listeners
    const inputFields = [
        inputGroomName, inputBrideName, inputGroomFather, inputGroomMother,
        inputBrideFather, inputBrideMother, inputDate, inputTime, inputLocation, inputQuote,
        inputStoryT1, inputStoryD1, inputStoryC1,
        inputStoryT2, inputStoryD2, inputStoryC2,
        inputStoryT3, inputStoryD3, inputStoryC3,
        inputGroomBank, inputGroomAcc, inputGroomHolder,
        inputBrideBank, inputBrideAcc, inputBrideHolder
    ];

    inputFields.forEach(input => {
        if (input) input.addEventListener('input', syncInputsToCard);
    });

    // Run initial sync
    syncInputsToCard();

    // 8. TYPOGRAPHY & FONT CLASS HANDLERS
    selectFontTitle.addEventListener('change', () => {
        // Remove existing font classes from title elements
        const fontClasses = ['font-greatvibes', 'font-alexbrush', 'font-dancing', 'font-charm'];
        
        // Front cover names
        fontClasses.forEach(cls => cardFrontGroom.parentElement.classList.remove(cls));
        cardFrontGroom.parentElement.classList.add(selectFontTitle.value);

        // Back cover names
        fontClasses.forEach(cls => cardBackGroom.parentElement.classList.remove(cls));
        cardBackGroom.parentElement.classList.add(selectFontTitle.value);
    });

    selectFontBody.addEventListener('change', () => {
        const bodyFontClasses = ['font-montserrat', 'font-quicksand', 'font-playfair'];
        
        // Back side container font
        bodyFontClasses.forEach(cls => cardBackGroom.closest('.card-back').querySelector('.card-content-inner').classList.remove(cls));
        cardBackGroom.closest('.card-back').querySelector('.card-content-inner').classList.add(selectFontBody.value);
    });

    // Decorative items toggle inside invitation card
    decorToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const targetDecor = btn.getAttribute('data-decor');
            
            const decorRings = document.querySelector('.id-decor-rings');
            const decorHearts = document.querySelector('.id-decor-hearts');
            const decorSparkles = document.querySelector('.id-decor-sparkles');
            
            if (targetDecor === 'decor-rings') {
                decorRings.classList.toggle('hidden', !btn.classList.contains('active'));
            } else if (targetDecor === 'decor-hearts') {
                decorHearts.classList.toggle('hidden', !btn.classList.contains('active'));
            } else if (targetDecor === 'decor-sparkles') {
                decorSparkles.classList.toggle('hidden', !btn.classList.contains('active'));
            }
        });
    });

    // 9. PHOTO UPLOADER (READ FILE AS URL)
    uploadCoupleImg.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameIndicator.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                cardCoupleImg.src = event.target.result;
                showToast('Tải ảnh cưới lên thành công!');
            };
            reader.readAsDataURL(file);
        }
    });

    // 10. THEME SWITCHING ENGINE
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedTheme = option.getAttribute('data-theme');
            
            // Highlight option
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Change theme on card
            const themes = ['theme-floral', 'theme-classic', 'theme-modern', 'theme-traditional'];
            themes.forEach(theme => invitationCard.classList.remove(theme));
            invitationCard.classList.add(selectedTheme);
            
            showToast(`Đã áp dụng chủ đề: ${option.querySelector('.theme-name').textContent}`);
        });
    });

    // Initialize with default theme
    invitationCard.classList.add('theme-floral');

    // 11. AUDIO / MUSIC CONTROL ENGINE
    let isMusicPlaying = false;

    function playMusic() {
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
                musicIndicatorBtn.classList.add('playing');
                sidebarPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Tạm dừng Nhạc nền';
                sidebarPlayBtn.classList.remove('btn-secondary');
                sidebarPlayBtn.classList.add('btn-outline');
            })
            .catch(err => {
                console.log("Audio play failed: ", err);
                showToast('Hãy click vào màn hình để bắt đầu phát nhạc');
            });
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicIndicatorBtn.classList.remove('playing');
        sidebarPlayBtn.innerHTML = '<i class="fas fa-play"></i> Nghe thử Nhạc nền';
        sidebarPlayBtn.classList.remove('btn-outline');
        sidebarPlayBtn.classList.add('btn-secondary');
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    musicIndicatorBtn.addEventListener('click', toggleMusic);
    sidebarPlayBtn.addEventListener('click', toggleMusic);

    // Track Selection
    trackItems.forEach(item => {
        item.addEventListener('click', () => {
            trackItems.forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            
            const trackUrl = item.getAttribute('data-track-url');
            
            // Change audio source
            bgMusic.src = trackUrl;
            
            // If already playing or user selected it, auto-play
            playMusic();
            showToast(`Đang phát: ${item.querySelector('.track-title').textContent}`);
        });
    });

    // 12. TOAST NOTIFICATION UTILITY
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'error' : ''}`;
        
        let icon = '<i class="fas fa-check-circle"></i>';
        if (type === 'error') {
            icon = '<i class="fas fa-exclamation-circle"></i>';
        }
        
        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        // Remove toast after animation
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    }

    // 13. RSVP INTERACTION & MANAGEMENT MODALS
    // Opening RSVP Form
    cardRsvpTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openRsvpModal();
    });

    simulateRsvpBtn.addEventListener('click', openRsvpModal);

    function openRsvpModal() {
        rsvpModal.style.display = 'flex';
        rsvpForm.reset();
        rsvpCountWrapper.style.display = 'block'; // Reset visibility of guest count
    }

    // Closing RSVP Form
    closeRsvpModalBtn.addEventListener('click', () => {
        rsvpModal.style.display = 'none';
    });

    // Check status radio button to hide/show guest count selector
    rsvpStatusRadio.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'absent') {
                rsvpCountWrapper.style.display = 'none';
            } else {
                rsvpCountWrapper.style.display = 'block';
            }
        });
    });

    // Submitting RSVP
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const guestName = document.getElementById('rsvp-guest-name').value;
        const statusVal = document.querySelector('input[name="rsvp-status"]:checked').value;
        const countVal = statusVal === 'attending' ? parseInt(document.getElementById('rsvp-guest-count').value, 10) : 0;
        const wishesText = document.getElementById('rsvp-wishes').value;
        
        // Time Stamp
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        
        // Create new RSVP Entry
        const newRsvp = {
            id: 'rsvp-' + Date.now(),
            name: guestName,
            status: statusVal,
            count: countVal,
            wishes: wishesText || 'Chúc mừng hạnh phúc cô dâu chú rể!',
            time: timeStr
        };

        // Add to state and save
        rsvpData.unshift(newRsvp);
        localStorage.setItem('wedding_rsvps', JSON.stringify(rsvpData));
        
        // Close modal and show success toast
        rsvpModal.style.display = 'none';
        
        const successMsg = statusVal === 'attending' 
            ? `Cảm ơn ${guestName}! Phản hồi xác nhận tham dự (${countVal} người) đã được gửi tới cặp đôi.`
            : `Cảm ơn ${guestName}! Phản hồi của bạn đã được ghi nhận.`;
            
        showToast(successMsg);
        
        // Refresh Dashboard if open
        renderRsvpDashboard();
        renderGuestbook(); // Refresh Guestbook feed on card back!
    });

    // 14. ADMIN DASHBOARD OPERATIONS
    openDashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardModal.style.display = 'flex';
        renderRsvpDashboard();
    });

    closeDashboardModalBtn.addEventListener('click', () => {
        dashboardModal.style.display = 'none';
    });

    closeDashboardModalActionBtn.addEventListener('click', () => {
        dashboardModal.style.display = 'none';
    });

    // Close modals on clicking outside of content
    window.addEventListener('click', (e) => {
        if (e.target === rsvpModal) {
            rsvpModal.style.display = 'none';
        }
        if (e.target === dashboardModal) {
            dashboardModal.style.display = 'none';
        }
    });

    // Render RSVP Database to Admin Panel
    function renderRsvpDashboard() {
        rsvpListBody.innerHTML = '';
        
        if (rsvpData.length === 0) {
            rsvpListBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
                        Chưa có phản hồi nào trong cơ sở dữ liệu.
                    </td>
                </tr>
            `;
            statTotalAttending.textContent = '0';
            statTotalAbsent.textContent = '0';
            statTotalResponses.textContent = '0';
            return;
        }

        let totalAttendingGuests = 0;
        let totalAbsent = 0;
        
        rsvpData.forEach(item => {
            if (item.status === 'attending') {
                totalAttendingGuests += item.count;
            } else {
                totalAbsent++;
            }
            
            const tr = document.createElement('tr');
            
            const statusBadge = item.status === 'attending' 
                ? '<span class="badge-status attending"><i class="fas fa-check"></i> Tham gia</span>'
                : '<span class="badge-status absent"><i class="fas fa-times"></i> Không tham gia</span>';
                
            const countText = item.status === 'attending' ? `${item.count} người` : '-';
            
            tr.innerHTML = `
                <td>
                    <div style="font-weight: 600; color: #222;">${item.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${item.time}</div>
                </td>
                <td>${statusBadge}</td>
                <td><strong>${countText}</strong></td>
                <td><div style="max-width: 320px; white-space: normal; word-break: break-word; font-style: italic;">"${item.wishes}"</div></td>
                <td style="text-align: center;">
                    <button class="btn-delete-row" data-id="${item.id}" title="Xóa dòng này">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            
            rsvpListBody.appendChild(tr);
        });

        // Update calculations
        statTotalAttending.textContent = totalAttendingGuests;
        statTotalAbsent.textContent = totalAbsent;
        statTotalResponses.textContent = rsvpData.length;

        // Hook up delete buttons
        document.querySelectorAll('.btn-delete-row').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = btn.getAttribute('data-id');
                deleteRsvpRow(idToDelete);
            });
        });
    }

    // Delete single RSVP entry
    function deleteRsvpRow(id) {
        if (confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
            rsvpData = rsvpData.filter(item => item.id !== id);
            localStorage.setItem('wedding_rsvps', JSON.stringify(rsvpData));
            showToast('Đã xóa phản hồi khỏi danh sách.', 'info');
            renderRsvpDashboard();
            renderGuestbook();
        }
    }

    // Clear all RSVP entries
    clearRsvpDataBtn.addEventListener('click', () => {
        if (confirm('CẢNH BÁO: Hành động này sẽ xóa toàn bộ phản hồi hiện tại trong cơ sở dữ liệu. Bạn có chắc chắn muốn tiếp tục?')) {
            rsvpData = [];
            localStorage.setItem('wedding_rsvps', JSON.stringify(rsvpData));
            showToast('Đã dọn dẹp sạch toàn bộ dữ liệu RSVP.', 'info');
            renderRsvpDashboard();
            renderGuestbook();
        }
    });

    // 15. COPY SHARE LINK LOGIC
    getShareLinkBtn.addEventListener('click', () => {
        const simulatedUrl = `${window.location.origin}${window.location.pathname}?invite=true&groom=${encodeURIComponent(inputGroomName.value)}&bride=${encodeURIComponent(inputBrideName.value)}`;
        
        navigator.clipboard.writeText(simulatedUrl)
            .then(() => {
                showToast('Đã sao chép Link thiệp cưới online thành công! Bạn có thể gửi cho người thân.');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                showToast('Lỗi khi sao chép link, vui lòng thử lại.', 'error');
            });
    });

    // 16. CANVAS RENDERING & DOWNLOAD ENGINE
    downloadCardBtn.addEventListener('click', () => {
        // Create canvas element dynamically
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Define canvas sizing (Portrait Wedding Card Aspect Ratio)
        canvas.width = 800;
        canvas.height = 1200;
        
        showToast('Đang khởi tạo tệp tin ảnh cưới chất lượng cao...');
        
        // Determine active theme colors for drawing
        const activeTheme = Array.from(invitationCard.classList).find(cls => cls.startsWith('theme-'));
        let bgGradient, borderCol, textCol, titleFontSpec, bodyFontSpec, secondaryCol;
        
        if (activeTheme === 'theme-classic') {
            bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#581845');
            bgGradient.addColorStop(1, '#1a0614');
            borderCol = '#d4af37';
            textCol = '#ffe680';
            secondaryCol = '#ffffff';
            titleFontSpec = 'italic 75px "Playfair Display", Georgia, serif';
            bodyFontSpec = '500 24px "Montserrat", sans-serif';
        } else if (activeTheme === 'theme-modern') {
            bgGradient = '#fafafa';
            borderCol = '#e2e2e2';
            textCol = '#222222';
            secondaryCol = '#555555';
            titleFontSpec = 'italic 65px "Playfair Display", Georgia, serif';
            bodyFontSpec = '22px "Montserrat", sans-serif';
        } else if (activeTheme === 'theme-traditional') {
            bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#d32f2f');
            bgGradient.addColorStop(1, '#800a0a');
            borderCol = '#ffd700';
            textCol = '#ffe680';
            secondaryCol = '#ffffff';
            titleFontSpec = 'bold 70px "Charm", cursive, serif';
            bodyFontSpec = '24px "Charm", cursive, serif';
        } else { // default: theme-floral
            bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#fef6f8');
            bgGradient.addColorStop(1, '#f1f0ff');
            borderCol = '#e3c099';
            textCol = '#4a2828';
            secondaryCol = '#6b645e';
            titleFontSpec = 'italic 72px "Playfair Display", Georgia, serif';
            bodyFontSpec = '500 22px "Montserrat", sans-serif';
        }
        
        // Start Drawing
        // 1. Fill background
        if (typeof bgGradient === 'string') {
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // 2. Draw border frame
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 6;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        
        if (activeTheme === 'theme-floral') {
            // Draw secondary double line border
            ctx.strokeStyle = 'rgba(227, 192, 153, 0.4)';
            ctx.lineWidth = 2;
            ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);
        } else if (activeTheme === 'theme-classic' || activeTheme === 'theme-traditional') {
            // Draw gold inner corners
            ctx.strokeStyle = borderCol;
            ctx.lineWidth = 3;
            ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);
        }
        
        // 3. Write details
        ctx.textAlign = 'center';
        
        // HEADER: Save the Date
        ctx.fillStyle = borderCol;
        ctx.font = 'bold 24px "Montserrat", sans-serif';
        ctx.fillText('SAVE THE DATE', canvas.width / 2, 120);
        
        // Short line under header
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 40, 140);
        ctx.lineTo(canvas.width / 2 + 40, 140);
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // INVITATION LABEL
        ctx.fillStyle = secondaryCol;
        ctx.font = bodyFontSpec;
        ctx.fillText('Trân trọng kính mời quý khách tới dự', canvas.width / 2, 220);
        
        ctx.fillStyle = textCol;
        ctx.font = activeTheme === 'theme-traditional' ? 'bold 64px "Charm"' : 'bold 54px "Playfair Display"';
        ctx.fillText('LỄ THÀNH HÔN', canvas.width / 2, 290);
        
        // Groom Name
        ctx.fillStyle = borderCol;
        ctx.font = titleFontSpec;
        ctx.fillText(inputGroomName.value || 'Nguyễn Anh Quân', canvas.width / 2, 430);
        
        // Ampersand
        ctx.fillStyle = textCol;
        ctx.font = 'italic 40px "Playfair Display"';
        ctx.fillText('&', canvas.width / 2, 490);
        
        // Bride Name
        ctx.fillStyle = borderCol;
        ctx.font = titleFontSpec;
        ctx.fillText(inputBrideName.value || 'Phan Minh Thư', canvas.width / 2, 570);
        
        // Quote
        ctx.fillStyle = secondaryCol;
        ctx.font = 'italic 20px Georgia, serif';
        const quoteText = inputQuote.value ? `"${inputQuote.value.replace(/"/g, '')}"` : '';
        // Wrap quote text simple simulation
        if (quoteText.length > 50) {
            const midIndex = quoteText.indexOf(' ', Math.floor(quoteText.length / 2));
            const firstLine = quoteText.substring(0, midIndex);
            const secondLine = quoteText.substring(midIndex + 1);
            ctx.fillText(firstLine, canvas.width / 2, 670);
            ctx.fillText(secondLine, canvas.width / 2, 700);
        } else {
            ctx.fillText(quoteText, canvas.width / 2, 680);
        }
        
        // Separator Ring / Hearts
        ctx.font = '36px "Font Awesome 6 Free"';
        ctx.fillStyle = borderCol;
        ctx.fillText('♥  ♥  ♥', canvas.width / 2, 790);

        // Date Display
        ctx.fillStyle = textCol;
        ctx.font = 'bold 36px "Montserrat", sans-serif';
        const dateData = formatVietnameseDate(inputDate.value);
        const displayDate = dateData ? dateData.long : 'Chủ Nhật, Ngày 18 Tháng 10, 2026';
        ctx.fillText(displayDate, canvas.width / 2, 870);
        
        ctx.font = 'bold 44px "Montserrat", sans-serif';
        ctx.fillText(inputTime.value || '11:00 AM', canvas.width / 2, 940);
        
        // Location Display
        ctx.fillStyle = secondaryCol;
        ctx.font = 'bold 20px "Montserrat", sans-serif';
        ctx.fillText('ĐỊA ĐIỂM TIỆC CƯỚI', canvas.width / 2, 1020);
        
        ctx.fillStyle = textCol;
        ctx.font = '22px "Montserrat", sans-serif';
        const locationText = inputLocation.value || 'Khách Sạn Palace, 120 Nguyễn Huệ, Quận 1, TP. HCM';
        if (locationText.length > 45) {
            const midIndex = locationText.indexOf(' ', Math.floor(locationText.length / 2));
            const firstLine = locationText.substring(0, midIndex);
            const secondLine = locationText.substring(midIndex + 1);
            ctx.fillText(firstLine, canvas.width / 2, 1065);
            ctx.fillText(secondLine, canvas.width / 2, 1095);
        } else {
            ctx.fillText(locationText, canvas.width / 2, 1080);
        }
        
        // Export file and download
        const downloadImage = () => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `thiep-cuoi-${inputGroomName.value || 'wedding'}.png`;
            link.href = dataUrl;
            link.click();
            showToast('Tải ảnh thiệp cưới chất lượng cao thành công!');
        };
        
        // Add a minor timeout to ensure fonts rendering before downloading
        setTimeout(downloadImage, 800);
    });

    // 17. MOBILE MENU SIMPLE INTERACTION
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#faf9f6';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid #ddd';
        });
    }

    // ==========================================================================
    // 18. NEW MODULES LOGIC: COUNTDOWN, GUESTBOOK, QR MODAL
    // ==========================================================================

    // A) Dynamic Countdown Timer
    let countdownInterval;

    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);

        const daysSpan = document.getElementById('days');
        const hoursSpan = document.getElementById('hours');
        const minutesSpan = document.getElementById('minutes');
        const secondsSpan = document.getElementById('seconds');
        const timerWidget = document.getElementById('countdown-timer-widget');
        const completedMsg = document.getElementById('countdown-completed-msg');

        function updateTimer() {
            const targetDateStr = inputDate.value;
            const targetTimeStr = inputTime.value || '00:00';
            
            if (!targetDateStr) return;
            
            const targetDateTime = new Date(`${targetDateStr}T${targetTimeStr}`);
            const now = new Date();
            const difference = targetDateTime - now;

            if (difference <= 0) {
                // Event has passed
                if (timerWidget) timerWidget.classList.add('hidden');
                if (completedMsg) completedMsg.classList.remove('hidden');
                clearInterval(countdownInterval);
                return;
            }

            if (timerWidget) timerWidget.classList.remove('hidden');
            if (completedMsg) completedMsg.classList.add('hidden');

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
            if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
            if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
            if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');
        }

        // Run immediately and start loop
        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    // Monitor date & time changes to restart countdown
    inputDate.addEventListener('change', startCountdown);
    inputTime.addEventListener('change', startCountdown);
    
    // Start countdown initially
    startCountdown();

    // B) Render Guestbook Wishes
    const guestbookScroller = document.getElementById('guestbook-scroller');

    function renderGuestbook() {
        if (!guestbookScroller) return;
        guestbookScroller.innerHTML = '';

        // Filter and get entries with wishes
        const entriesWithWishes = rsvpData.filter(item => item.wishes && item.wishes.trim() !== '');

        if (entriesWithWishes.length === 0) {
            guestbookScroller.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 20px;">
                    Chưa có lời chúc nào. Hãy gửi lời chúc qua form RSVP!
                </div>
            `;
            return;
        }

        entriesWithWishes.forEach(item => {
            const initial = item.name ? item.name.trim().charAt(0).toUpperCase() : 'G';
            
            const card = document.createElement('div');
            card.className = 'guestbook-card';
            
            card.innerHTML = `
                <div class="guestbook-avatar">${initial}</div>
                <div class="guestbook-card-content">
                    <span class="guest-name">${item.name}</span>
                    <p class="guest-wishes">"${item.wishes}"</p>
                    <span class="guest-time">${item.time}</span>
                </div>
            `;
            
            guestbookScroller.appendChild(card);
        });
    }

    // Run initial guestbook render
    renderGuestbook();

    // C) QR Code Modals Trigger
    const showQrButtons = document.querySelectorAll('.btn-show-qr');

    showQrButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card from flipping
            const side = btn.getAttribute('data-side');
            
            let bank, acc, holder, title;
            if (side === 'groom') {
                title = 'Mừng Cưới Chú Rể';
                bank = inputGroomBank.value || 'Vietcombank';
                acc = inputGroomAcc.value || '1023456789';
                holder = inputGroomHolder.value || 'NGUYEN ANH QUAN';
            } else {
                title = 'Mừng Cưới Cô Dâu';
                bank = inputBrideBank.value || 'Techcombank';
                acc = inputBrideAcc.value || '1903456789123';
                holder = inputBrideHolder.value || 'PHAN MINH THU';
            }

            // Set modal texts
            qrModalTitle.textContent = title;
            qrModalBank.textContent = bank;
            qrModalAcc.textContent = acc;
            qrModalHolder.textContent = holder;

            // Generate clean dynamic QR image using QRServer API (URL-encoded transfer message)
            const qrData = `Ngan hang: ${bank}\nSTK: ${acc}\nTen: ${holder}\nMung cuoi happy wedding!`;
            qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

            // Show Modal
            qrModal.style.display = 'flex';
        });
    });

    // Close QR Modal triggers
    if (closeQrModalBtn) {
        closeQrModalBtn.addEventListener('click', () => {
            qrModal.style.display = 'none';
        });
    }
    if (closeQrModalActionBtn) {
        closeQrModalActionBtn.addEventListener('click', () => {
            qrModal.style.display = 'none';
        });
    }
    
    // Add QR Modal to global click-outside-to-close listener
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.style.display = 'none';
        }
    });
});
