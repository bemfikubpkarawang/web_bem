/* =====================================================
   APP.JS
   BEM Fakultas Ilmu Komputer
===================================================== */

const BEMApp = {

    init() {
        this.renderHeader();
        this.renderFooter();

        if (document.getElementById("heroTitle")) {
            this.renderHero();
        }

        if (document.getElementById("statMahasiswa") || document.getElementById("divisionCount") || document.getElementById("statDivisi")) {
            this.renderStatistic();
        }

        if (document.getElementById("aboutTitle")) {
            this.renderProfil();
        }

        if (document.getElementById("visiMisiContainer")) {
            this.renderVisiMisi();
        }

        if (document.getElementById("divisionContainer")) {
            this.renderDivisi();
        }

        if (document.getElementById("managementContainer")) {
            this.renderPengurus();
        }

        if (document.getElementById("programContainer")) {
            this.renderProgram();
        }

        if (document.getElementById("programGrid")) {
            this.renderProgramList();
        }

        if (document.getElementById("informationContainer")) {
            this.renderInformasi();
        }

        if (document.getElementById("galleryContainer")) {
            this.renderGaleri();
        }

        if (document.getElementById("contactEmail")) {
            this.renderKontak();
        }

        this.activeMenu();
        this.mobileMenu();
        this.stickyHeader();
        this.backToTop();
        this.currentYear();

    },

    /* ==========================================
       HEADER
    ========================================== */

    renderHeader() {

        const header = document.getElementById("header");

        if (!header) return;

        header.innerHTML = `
    <nav class="navbar">

        <div class="container">

            <a href="${BASE_PATH}index.html" class="logo">

                <img src="${BASE_PATH}assets/logo/logo.png" alt="Logo" onerror="this.src='${BASE_PATH}assets/logo/logo.png'">

                <div>

                    <h2>BEM FIK</h2>

                    <span>Fakultas Ilmu Komputer</span>

                </div>

            </a>

            <button
                id="menuToggle"
                class="menu-toggle">

                <i class="ri-menu-line"></i>

            </button>

            <ul
                id="navMenu"
                class="nav-menu">

                <li><a class="nav-link" href="${BASE_PATH}index.html">Beranda</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/tentang.html">Tentang</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/divisi.html">Divisi</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/proker.html">Program Kerja</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/informasi.html">Informasi</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/galeri.html">Galeri</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/aspirasi.html">Aspirasi</a></li>
                <li><a class="nav-link" href="${BASE_PATH}pages/kontak.html">Kontak</a></li>

            </ul>

        </div>

    </nav>
    `;

    this.activeMenu();
    },

    /* ==========================================
       FOOTER
    ========================================== */

    renderFooter() {

        const footer = document.getElementById("footer");

        if (!footer) return;

        footer.className = "footer";
        footer.innerHTML = `
        <div class="container">

            <div class="footer-grid">

                <div class="footer-brand">

                    <a href="${BASE_PATH}index.html" class="logo">

                        <img src="${BASE_PATH}assets/logo/logo.png" alt="Logo BEM" onerror="this.src='${BASE_PATH}assets/logo/logo.png'">

                        <div>

                            <h3>BEM FIK</h3>

                            <span>Fakultas Ilmu Komputer</span>

                        </div>

                    </a>

                    <p>

                        Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer sebagai wadah aspirasi, kolaborasi, inovasi, dan pengembangan potensi mahasiswa.

                    </p>

                </div>

                <div>

                    <h3 class="footer-title">
                        Navigasi
                    </h3>

                    <ul class="footer-links">

                        <li><a href="${BASE_PATH}index.html">Beranda</a></li>

                        <li><a href="${BASE_PATH}pages/tentang.html">Tentang</a></li>

                        <li><a href="${BASE_PATH}pages/pengurus.html">Pengurus</a></li>

                        <li><a href="${BASE_PATH}pages/divisi.html">Divisi</a></li>

                        <li><a href="${BASE_PATH}pages/proker.html">Program Kerja</a></li>

                        <li><a href="${BASE_PATH}pages/informasi.html">Informasi</a></li>

                        <li><a href="${BASE_PATH}pages/galeri.html">Galeri</a></li>

                        <li><a href="${BASE_PATH}pages/kontak.html">Kontak</a></li>

                    </ul>

                </div>

                <div>

                    <h3 class="footer-title">

                        Kontak

                    </h3>

                    <ul class="footer-contact">

                        <h3>

                            Hubungi Kami

                        </h3>

                        <p>

                            Email : bemfik@ubpkarawang.ac.id

                        </p>

                        <p>

                            Fakultas Ilmu Komputer<br>
                            Universitas Buana Perjuangan Karawang

                        </p>

                    </ul>

                </div>

            </div>

            <div class="footer-bottom">

                <p>

                    © <span id="year"></span> BEM Fakultas Ilmu Komputer. All Rights Reserved.

                </p>

            </div>

        </div>
        `;

    },

    /* ==========================================
       HERO
    ========================================== */

    renderHero() {

        const profil = getProfil();

        if (!profil) return;

        const title = document.getElementById("heroTitle");
        const desc = document.getElementById("heroDescription");
        const image = document.getElementById("heroImage");

        if (title && profil.hero?.judul) {

            title.textContent = profil.hero.judul;

        }

        if (desc && profil.hero?.subjudul) {

            desc.textContent = profil.hero.subjudul;

        }

        if (image && profil.heroImage) {

            image.src = BASE_PATH + profil.heroImage;

            image.alt = profil.hero.judul || "Hero";

        }

    },

    /* ==========================================
       STATISTIC
    ========================================== */

    renderStatistic() {

        const profil = getProfil();
        const divisi = getDivisi();
        const proker = getProgramKerja();
        const pengurus = getPengurus();

        const totalMahasiswa = profil?.statistik?.mahasiswa || 1500;
        const totalDivisi = divisi?.length || profil?.statistik?.divisi || 4;
        const totalProker = proker?.length || profil?.statistik?.programKerja || 22;
        const totalPengurus = pengurus?.length || profil?.statistik?.pengurus || 21;

        // Homepage Stats
        this.animateNumber("statMahasiswa", totalMahasiswa);
        this.animateNumber("statDivisi", totalDivisi);
        this.animateNumber("statProgram", totalProker);
        this.animateNumber("statPengurus", totalPengurus);

        // Divisi Page Stats
        this.animateNumber("divisionCount", totalDivisi);
        this.animateNumber("memberCount", totalPengurus);
        this.animateNumber("programCount", totalProker);

    },

    animateNumber(id, target) {

        const element = document.getElementById(id);

        if (!element) return;

        const targetVal = Number(target) || 0;

        if (targetVal <= 0) return;

        element.textContent = targetVal.toLocaleString("id-ID");

        let value = 0;

        const step = Math.max(1, Math.ceil(targetVal / 40));

        const timer = setInterval(() => {

            value += step;

            if (value >= targetVal) {

                value = targetVal;

                clearInterval(timer);

            }

            element.textContent = value.toLocaleString("id-ID");

        }, 20);

    },

    /* ==========================================
       PROFIL
    ========================================== */

    renderProfil() {

        const profil = getProfil();

        if (!profil) return;

        const aboutTitle = document.getElementById("aboutTitle");
        const aboutDescription = document.getElementById("aboutDescription");
        const footerDescription = document.getElementById("footerDescription");

        if (aboutTitle)
            aboutTitle.textContent = profil.nama;

        if (aboutDescription)
            aboutDescription.textContent = profil.deskripsi;

        if (footerDescription)
            footerDescription.textContent = profil.deskripsi;

    },

    /* ==========================================
       VISI MISI
    ========================================== */

    renderVisiMisi() {

        const data = getVisiMisi();

        const container = document.getElementById("visiMisiContainer");

        if (!container || !data) return;

        container.innerHTML = `

<div class="vision-card">

    <div class="vision-icon">
        <i class="ri-eye-line"></i>
    </div>

    <h3>${data.visi.judul}</h3>

    <p>${data.visi.isi}</p>

</div>

<div class="vision-card">

    <div class="vision-icon">
        <i class="ri-target-line"></i>
    </div>

    <h3>Misi</h3>

    <ul class="mission-list">

${data.misi.map(item => `

        <li>
            <i class="ri-checkbox-circle-fill"></i>
            <span>${item.isi}</span>
        </li>

`).join("")}

    </ul>

</div>

`;

    },

    /* ==========================================
       DIVISI
    ========================================== */

    renderDivisi() {

        const data = getDivisi() || DATA.divisiDetail;

        const container = document.getElementById("divisionContainer");

        if (!container || !data) return;

        container.innerHTML = data.slice(0, 8).map(item => {

            const iconClass = item.icon ? item.icon : "ri-group-line";

            return `

        <div class="division-card">

            <div class="division-icon">
                <img
                    src="${BASE_PATH}${item.logo}"
                    alt="${item.nama}"
                    loading="lazy"
                >
            </div>

            <h3>${item.nama}</h3>

            <p>${item.deskripsi.length > 100 ? item.deskripsi.substring(0, 100) + '...' : item.deskripsi}</p>

            <a
                class="division-link"
                href="${BASE_PATH}pages/divisi-detail.html?id=${item.id}"
            >
                Selengkapnya <i class="ri-arrow-right-line"></i>
            </a>

        </div>

    `;

        }).join("");

    },

    /* ==========================================
       PENGURUS
    ========================================== */

    renderPengurus() {

        const data = getPengurus();

        const container = document.getElementById("managementContainer");

        if (!container || !data) return;

        const tampil = data.filter(item =>

            item.jabatan === "Ketua" ||
            item.jabatan === "Wakil Ketua" ||
            item.jabatan === "Sekretaris" ||
            item.jabatan === "Bendahara"

        );

        container.innerHTML = tampil.map(item => `

        <div class="management-card">

            <div class="management-image">

                <img
                    src="${BASE_PATH}${item.foto}"
                    alt="${item.jabatan}"
                    onerror="this.src='${BASE_PATH}assets/images/pengurus/default.png'"
                >

            </div>

            <div class="management-content">

                <h3>${item.nama || "Belum Diisi"}</h3>

                <span class="management-position">${item.jabatan}</span>

                <p class="management-division">${item.divisi}</p>

            </div>

        </div>

    `).join("");

    },

    /* ==========================================
       PROGRAM KERJA — FEATURED ON HOMEPAGE
    ========================================== */

    renderProgram() {

        const data = getProgramKerja();

        const container = document.getElementById("programContainer");

        if (!container || !data) return;

        container.innerHTML = data.slice(0, 3).map(item => {

            let statusClass = "status-coming";
            let statusLabel = item.statusLabel || "Direncanakan";

            if (item.status === "berjalan") {
                statusClass = "status-running";
                statusLabel = "Berjalan";
            } else if (item.status === "selesai") {
                statusClass = "status-finished";
                statusLabel = "Selesai";
            }

            const imgPath = item.gambar ? (BASE_PATH + item.gambar) : `${BASE_PATH}assets/images/proker/default.jpg`;

            return `
            <div class="program-card">

                <div class="program-image">

                    <img src="${imgPath}" alt="${item.nama}" onerror="this.src='https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80'">

                    <span class="program-category">${item.divisi}</span>

                    <span class="program-status ${statusClass}">${statusLabel}</span>

                </div>

                <div class="program-content">

                    <div class="program-date">
                        <i class="ri-calendar-line"></i> ${item.periode}
                    </div>

                    <h3>${item.nama}</h3>

                    <p>${item.deskripsi.length > 110 ? item.deskripsi.substring(0, 110) + '...' : item.deskripsi}</p>

                    <div class="program-footer">

                        <span class="program-division">
                            <i class="ri-price-tag-3-line"></i> ${item.kategori}
                        </span>

                        <a href="${BASE_PATH}pages/proker-detail.html?id=${item.id}" class="program-link">
                            Detail <i class="ri-arrow-right-line"></i>
                        </a>

                    </div>

                </div>

            </div>
            `;

        }).join("");

    },

    /* ==========================================
       PROGRAM KERJA — HALAMAN PROKER
    ========================================== */

    renderProgramList() {

        const allData = getProgramKerja();

        const grid = document.getElementById("programGrid");
        const emptyMsg = document.getElementById("programEmpty");
        const searchInput = document.getElementById("searchProgram");
        const divisionSelect = document.getElementById("divisionFilter");
        const statusSelect = document.getElementById("statusFilter");

        if (!grid || !allData) return;

        /* ---- Isi stats ---- */
        const totalEl = document.getElementById("totalProgram");
        const ongoingEl = document.getElementById("ongoingProgram");
        const doneEl = document.getElementById("doneProgram");
        const divisionEl = document.getElementById("divisionInvolved");

        if (totalEl) totalEl.textContent = allData.length;
        if (ongoingEl) ongoingEl.textContent = allData.filter(p => p.status === "berjalan").length;
        if (doneEl) doneEl.textContent = allData.filter(p => p.status === "selesai").length;
        if (divisionEl) {
            const unique = [...new Set(allData.map(p => p.divisi))];
            divisionEl.textContent = unique.length;
        }

        /* ---- Render helper ---- */
        const getStatusClass = (status) => {
            switch ((status || "").toLowerCase()) {
                case "berjalan": return "status-berjalan";
                case "selesai": return "status-selesai";
                case "direncanakan": return "status-direncanakan";
                default: return "status-direncanakan";
            }
        };

        const getStatusLabel = (item) => {
            if (item.statusLabel) return item.statusLabel;
            switch ((item.status || "").toLowerCase()) {
                case "berjalan": return "Berjalan";
                case "selesai": return "Selesai";
                default: return "Direncanakan";
            }
        };

        const renderCard = (item) => `
            <a href="proker-detail.html?id=${item.id}"
               class="program-card"
               data-division="${item.divisi}"
               data-status="${item.status}">

                <div class="program-card-header">
                    <div class="program-card-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="program-card-badges">
                        <span class="program-tag">${item.divisi}</span>
                        <span class="program-status-badge ${getStatusClass(item.status)}">${getStatusLabel(item)}</span>
                    </div>
                </div>

                <div class="program-card-body">
                    <h3 class="program-title">${item.nama}</h3>
                    <p class="program-summary">${item.deskripsi}</p>
                </div>

                <div class="program-meta">
                    <span><i class="ri-calendar-line"></i> ${item.periode}</span>
                    <span class="program-kategori"><i class="ri-price-tag-3-line"></i> ${item.kategori}</span>
                </div>

            </a>
        `;

        /* ---- Filter & render ---- */
        const applyFilter = () => {

            const keyword = (searchInput ? searchInput.value : "").toLowerCase().trim();
            const division = (divisionSelect ? divisionSelect.value : "");
            const status = (statusSelect ? statusSelect.value : "");

            const filtered = allData.filter(item => {

                const matchKeyword = !keyword ||
                    item.nama.toLowerCase().includes(keyword) ||
                    item.deskripsi.toLowerCase().includes(keyword) ||
                    item.divisi.toLowerCase().includes(keyword);

                const matchDivision = !division ||
                    item.divisi === division;

                const matchStatus = !status ||
                    item.status === status;

                return matchKeyword && matchDivision && matchStatus;

            });

            if (filtered.length === 0) {
                grid.innerHTML = "";
                if (emptyMsg) emptyMsg.style.display = "block";
            } else {
                grid.innerHTML = filtered.map(renderCard).join("");
                if (emptyMsg) emptyMsg.style.display = "none";
            }

        };

        /* ---- Event listeners ---- */
        if (searchInput) searchInput.addEventListener("input", applyFilter);
        if (divisionSelect) divisionSelect.addEventListener("change", applyFilter);
        if (statusSelect) statusSelect.addEventListener("change", applyFilter);

        /* ---- Initial render ---- */
        applyFilter();

    },

    /* ==========================================
       INFORMASI
    ========================================== */

    renderInformasi() {

        const data = getInformasi();

        const container = document.getElementById("informationContainer");

        if (!container || !data) return;

        container.innerHTML = data.slice(0, 3).map(item => `

        <article class="information-card">

            <div class="information-image">
                <img src="${BASE_PATH}${item.gambar}" alt="${item.judul}" onerror="this.src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80'">
                <span class="information-category">${item.kategori || 'Berita'}</span>
            </div>

            <div class="information-content">

                <div class="information-meta">
                    <span><i class="ri-calendar-line"></i> ${item.tanggal}</span>
                    <span><i class="ri-user-line"></i> ${item.penulis || 'Admin BEM'}</span>
                </div>

                <h3>${item.judul}</h3>

                <p>${item.ringkasan.length > 110 ? item.ringkasan.substring(0, 110) + '...' : item.ringkasan}</p>

                <div class="information-footer">
                    <a href="${BASE_PATH}pages/informasi-detail.html?slug=${item.slug}" class="information-link">
                        Baca Selengkapnya <i class="ri-arrow-right-line"></i>
                    </a>
                </div>

            </div>

        </article>

        `).join("");

    },

    /* ==========================================
       GALERI
    ========================================== */

    renderGaleri() {

        const data = getGaleri();

        const container = document.getElementById("galleryContainer");

        if (!container || !data) return;

        container.innerHTML = data.slice(0, 6).map(item => `

<div class="gallery-item">

    <img src="${BASE_PATH}${item.gambar}" alt="${item.judul}">

</div>

        `).join("");

    },

    /* ==========================================
    KONTAK
    ========================================== */

    renderKontak() {

        const data = getKontak();

        if (!data) return;

        const address = document.getElementById("contactAddress");
        const email = document.getElementById("contactEmail");
        const phone = document.getElementById("contactPhone");
        const instagram = document.getElementById("contactInstagram");
        const mapFrame = document.getElementById("contactMapFrame");

        if (address) {
            address.textContent = data.alamat;
        }

        if (email) {
            email.innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
        }

        if (phone) {

            const waNumber = data.telepon.replace(/^0/, "62");

            phone.innerHTML = `<a href="https://wa.me/${waNumber}" target="_blank">${data.telepon}</a>`;

        }

        if (instagram) {

            const username = data.instagram.split("/").filter(Boolean).pop();

            instagram.innerHTML = `<a href="${data.instagram}" target="_blank">@${username}</a>`;

        }

        if (mapFrame && data.maps) {
            mapFrame.src = data.maps;
        }

    },

    /* ==========================================
       ACTIVE MENU
    ========================================== */

    activeMenu() {

        const current = window.location.pathname.split("/").pop() || "index.html";

        document.querySelectorAll(".nav-link").forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            link.classList.remove("active");

            if (href.includes(current)) {

                link.classList.add("active");

            }

        });

    },

    /* ==========================================
       MOBILE MENU
    ========================================== */

  mobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) return;

    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function (e) {

        e.stopPropagation();

        navMenu.classList.toggle("show");

        document.body.classList.toggle("menu-open");

        if (icon) {

            icon.className = navMenu.classList.contains("show")
                ? "ri-close-line"
                : "ri-menu-line";

        }

    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            document.body.classList.remove("menu-open");

            if (icon) {

                icon.className = "ri-menu-line";

            }

        });

    });

    document.addEventListener("click", function (e) {

        if (

            !navMenu.contains(e.target) &&

            !menuToggle.contains(e.target)

        ) {

            navMenu.classList.remove("show");

            document.body.classList.remove("menu-open");

            if (icon) {

                icon.className = "ri-menu-line";

            }

        }

    });

},

    /* ==========================================
       STICKY HEADER
    ========================================== */

    stickyHeader() {

        const navbar = document.querySelector(".navbar");

        if (!navbar) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 60) {

                navbar.classList.add("sticky");

            } else {

                navbar.classList.remove("sticky");

            }

        });

    },

    /* ==========================================
       BACK TO TOP
    ========================================== */

    backToTop() {

        const btn = document.getElementById("backToTop");

        if (!btn) return;

        window.addEventListener("scroll", () => {

            btn.classList.toggle("show", window.scrollY > 300);

        });

        btn.onclick = () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        };

    },

    /* ==========================================
       CURRENT YEAR
    ========================================== */

    currentYear() {

        const year = document.getElementById("year");

        if (year) {

            year.textContent = new Date().getFullYear();

        }

    },
};

/* ==========================================
   START APP
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await loadAllData();

    BEMApp.init();

    if (typeof Animation !== "undefined") {
        Animation.init();
    }

});