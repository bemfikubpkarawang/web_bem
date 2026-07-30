/* =====================================================
   INFORMASI PAGE
===================================================== */

let informasiData = [];
let filteredData = [];

let currentPage = 1;
const itemsPerPage = 6;

let activeCategory = "";
let keyword = "";

const featuredContainer = document.getElementById("featuredContainer");
const informationContainer = document.getElementById("informationContainer");
const paginationContainer = document.getElementById("pagination");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", initInformasi);

async function initInformasi() {

    try {

    await loadAllData();

    const data = getInformasi();

    if (!data) {

        console.error("Data informasi tidak ditemukan.");

        return;

    }

    informasiData = data
        .filter(item => item.status === "publish")
        .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

        filteredData = [...informasiData];

        bindEvents();

        renderAll();

    } catch (err) {

        console.error(err);

    }

}

/* =====================================================
   EVENTS
===================================================== */

function bindEvents() {

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            keyword = this.value
                .trim()
                .toLowerCase();

            currentPage = 1;

            filterData();

        });

    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            activeCategory = button.dataset.category;

            currentPage = 1;

            filterData();

        });

    });

}

/* =====================================================
   FILTER
===================================================== */

function filterData() {

    filteredData = informasiData.filter(item => {

        const matchKeyword =

            item.judul.toLowerCase().includes(keyword) ||

            item.ringkasan.toLowerCase().includes(keyword) ||

            item.deskripsi.toLowerCase().includes(keyword);

        const matchCategory =

            activeCategory === "" ||

            item.kategori === activeCategory;

        return matchKeyword && matchCategory;

    });

    renderAll();

}

/* =====================================================
   RENDER
===================================================== */

function renderAll() {

    renderFeatured();

    renderInformation();

    renderPagination();

}

/* =====================================================
   FEATURED NEWS
===================================================== */

function renderFeatured() {

    if (!featuredContainer) return;

    if (filteredData.length === 0) {

        featuredContainer.innerHTML = `
            <div class="empty-state">

                <h3>Tidak ada informasi ditemukan</h3>

            </div>
        `;

        return;

    }

    const item = filteredData[0];

    featuredContainer.innerHTML = `

        <div class="featured-card">

            <div class="featured-image">

                <img
                    src="../${item.thumbnail}"
                    alt="${item.judul}">

            </div>

            <div class="featured-content">

                <span class="featured-category">

                    ${item.kategori}

                </span>

                <h2>

                    ${item.judul}

                </h2>

                <div class="featured-meta">

                    <span>

                        <i class="ri-calendar-line"></i>

                        ${formatDate(item.tanggal)}

                    </span>

                    <span>

                        <i class="ri-user-line"></i>

                        ${item.penulis}

                    </span>

                </div>

                <p>

                    ${item.ringkasan}

                </p>

                <a
                    href="informasi-detail.html?slug=${item.slug}"
                    class="btn btn-primary">

                    Baca Selengkapnya

                </a>

            </div>

        </div>

    `;

}

/* =====================================================
   GRID INFORMASI
===================================================== */

function renderInformation() {

    if (!informationContainer) return;

    informationContainer.innerHTML = "";

    if (filteredData.length === 0) {

        informationContainer.innerHTML = `

            <div class="empty-state">

                <h3>

                    Informasi tidak ditemukan

                </h3>

                <p>

                    Coba gunakan kata kunci lain.

                </p>

            </div>

        `;

        return;

    }

    const start = (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    const pageData = filteredData.slice(start, end);

    pageData.forEach(item => {

        informationContainer.innerHTML += `

            <article
                class="news-card">

                <div class="news-image">

                    <img
                        src="../${item.thumbnail}"
                        alt="${item.judul}">

                    <span class="news-category">

                        ${item.kategori}

                    </span>

                </div>

                <div class="news-content">

                    <div class="news-meta">

                        <span>

                            <i class="ri-calendar-line"></i>

                            ${formatDate(item.tanggal)}

                        </span>

                    </div>

                    <h3>

                        ${item.judul}

                    </h3>

                    <p>

                        ${item.ringkasan}

                    </p>

                    <a
                        href="informasi-detail.html?slug=${item.slug}"
                        class="news-link">

                        Baca Selengkapnya

                        <i class="ri-arrow-right-line"></i>

                    </a>

                </div>

            </article>

        `;

    });

}

/* =====================================================
   PAGINATION
===================================================== */

function renderPagination() {

    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (totalPages <= 1) return;

    paginationContainer.innerHTML += `

        <button
            class="page-btn"
            ${currentPage === 1 ? "disabled" : ""}
            onclick="changePage(${currentPage - 1})">

            <i class="ri-arrow-left-s-line"></i>

        </button>

    `;

    for (let i = 1; i <= totalPages; i++) {

        paginationContainer.innerHTML += `

            <button
                class="page-btn ${i === currentPage ? "active" : ""}"
                onclick="changePage(${i})">

                ${i}

            </button>

        `;

    }

    paginationContainer.innerHTML += `

        <button
            class="page-btn"
            ${currentPage === totalPages ? "disabled" : ""}
            onclick="changePage(${currentPage + 1})">

            <i class="ri-arrow-right-s-line"></i>

        </button>

    `;

}

/* =====================================================
   CHANGE PAGE
===================================================== */

function changePage(page) {

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;

    renderInformation();

    renderPagination();

    window.scrollTo({

        top: 550,

        behavior: "smooth"

    });

}

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const options = {

        day: "numeric",
        month: "long",
        year: "numeric"

    };

    return new Date(dateString)
        .toLocaleDateString("id-ID", options);

}

/* =====================================================
   AOS
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 800,
        once: true

    });

}