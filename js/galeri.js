/* =====================================================
   GALERI
===================================================== */

let galleryData = [];
let filteredGallery = [];
let currentPage = 1;
let currentCategory = "all";
let currentSearch = "";

const ITEMS_PER_PAGE = 6;

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await initializeGallery();

});

async function initializeGallery() {

    try {

        await loadAllData();

        galleryData = getGaleri() || [];

        filteredGallery = [...galleryData];

        updateStatistics();

        setupFilter();

        setupSearch();

        setupLoadMore();

        renderGallery();

    } catch (error) {

        console.error("Gagal memuat galeri:", error);

    }

}

/* =====================================================
   RENDER
===================================================== */

function renderGallery() {

    const container = document.getElementById("galleryContainer");

    const counter = document.getElementById("galleryCount");

    const empty = document.getElementById("galleryEmpty");

    if (!container) return;

    const limit = currentPage * ITEMS_PER_PAGE;

    const data = filteredGallery.slice(0, limit);

    container.innerHTML = "";

    if (filteredGallery.length === 0) {

        empty.style.display = "flex";

        counter.textContent = "0 Dokumentasi";

        updateLoadMore();

        return;

    }

    empty.style.display = "none";

    counter.textContent = `${filteredGallery.length} Dokumentasi`;

    data.forEach(item => {

        container.innerHTML += createGalleryCard(item);

    });

    bindGalleryClick();

    initGallerySlideshow();

    updateLoadMore();

}

/* =====================================================
   CARD
===================================================== */

function createGalleryCard(item) {

    const images = Array.isArray(item.gambar)
        ? item.gambar
        : [item.gambar];

    return `

        <div class="gallery-card">

            <div class="gallery-image">

                <img
                    class="gallery-slide"
                    src="../${item.thumbnail}"
                    data-thumb="../${item.thumbnail}"
                    data-images='${JSON.stringify(images.map(img => "../" + img))}'
                    alt="${item.judul}">

                <div class="gallery-overlay">

                    <span class="gallery-category">
                        ${item.kategori}
                    </span>

                    <h3>
                        ${item.judul}
                    </h3>

                    <p>
                        ${formatDate(item.tanggal)}
                    </p>

                </div>

            </div>

        </div>

    `;

}

/* =====================================================
   STATISTIK
===================================================== */

function updateStatistics() {

    const totalGallery = document.getElementById("totalGallery");

    const totalCategory = document.getElementById("totalCategory");

    const totalYear = document.getElementById("totalYear");

    if (totalGallery) {

        totalGallery.textContent = galleryData.length;

    }

    const categories = [

        ...new Set(

            galleryData.map(item => item.kategori).filter(Boolean)

        )

    ];

    if (totalCategory) {

        totalCategory.textContent = categories.length;

    }

    const years = [

        ...new Set(

            galleryData.map(item =>

                new Date(item.tanggal).getFullYear()

            )

        )

    ];

    if (totalYear) {

        totalYear.textContent = years.length;

    }

}

/* =====================================================
   LOAD MORE
===================================================== */

function updateLoadMore() {

    const button = document.getElementById("loadMoreGallery");

    if (!button) return;

    if (

        currentPage * ITEMS_PER_PAGE >=

        filteredGallery.length

    ) {

        button.style.display = "none";

    } else {

        button.style.display = "inline-flex";

    }

}

/* =====================================================
   FILTER & SEARCH LOGIC
===================================================== */

function filterData() {

    filteredGallery = galleryData.filter(item => {

        const matchesCategory = (currentCategory === "all" || currentCategory === "")

            ? true

            : item.kategori && item.kategori.toLowerCase() === currentCategory.toLowerCase();

        const query = currentSearch.toLowerCase().trim();

        const matchesSearch = !query ||

            (item.judul && item.judul.toLowerCase().includes(query)) ||

            (item.kategori && item.kategori.toLowerCase().includes(query)) ||

            (item.deskripsi && item.deskripsi.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;

    });

    currentPage = 1;

    renderGallery();

}

/* =====================================================
   SEARCH SETUP
===================================================== */

function setupSearch() {

    const input = document.getElementById("gallerySearch");

    if (!input) return;

    input.addEventListener("input", function () {

        currentSearch = this.value;

        filterData();

    });

}

/* =====================================================
   FILTER SETUP
===================================================== */

function setupFilter() {

    const wrapper = document.querySelector(".gallery-filter-group");

    if (!wrapper) return;

    const categories = [

        ...new Set(

            galleryData.map(item => item.kategori).filter(Boolean)

        )

    ];

    wrapper.innerHTML = `

        <button
            class="gallery-filter-btn ${currentCategory === 'all' ? 'active' : ''}"
            data-filter="all">

            Semua

        </button>

    `;

    categories.forEach(category => {

        const isActive = currentCategory.toLowerCase() === category.toLowerCase() ? 'active' : '';

        wrapper.innerHTML += `

            <button
                class="gallery-filter-btn ${isActive}"
                data-filter="${category}">

                ${category}

            </button>

        `;

    });

    const buttons = wrapper.querySelectorAll(".gallery-filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>

                btn.classList.remove("active")

            );

            button.classList.add("active");

            currentCategory = button.dataset.filter || "all";

            filterData();

        });

    });

}

/* =====================================================
   LOAD MORE SETUP
===================================================== */

function setupLoadMore() {

    const button = document.getElementById("loadMoreGallery");

    if (!button) return;

    button.addEventListener("click", () => {

        currentPage++;

        renderGallery();

    });

}

/* =====================================================
   LIGHTBOX
===================================================== */

let currentImageIndex = 0;

function bindGalleryClick() {

    const cards = document.querySelectorAll(".gallery-card img");

    cards.forEach((img, index) => {

        img.addEventListener("click", () => {

            currentImageIndex = index;

            openLightbox(index);

        });

    });

}

function openLightbox(index) {

    const modal = document.getElementById("galleryLightbox");

    const image = document.getElementById("lightboxImage");

    const caption = document.getElementById("lightboxCaption");

    if (!modal || !image) return;

    const data = filteredGallery.slice(
        0,
        currentPage * ITEMS_PER_PAGE
    );

    const item = data[index];

    if (!item) return;

    image.src = "../" + item.gambar;
    image.alt = item.judul;

    if (caption) {

        caption.innerHTML = `

            <h3>${item.judul}</h3>

            <p>${formatDate(item.tanggal)}</p>

        `;

    }

    modal.classList.add("active");

}

function closeLightbox() {

    const modal = document.getElementById("galleryLightbox");

    if (!modal) return;

    modal.classList.remove("active");

}

function nextImage() {

    const data = filteredGallery.slice(
        0,
        currentPage * ITEMS_PER_PAGE
    );

    currentImageIndex++;

    if (currentImageIndex >= data.length) {

        currentImageIndex = 0;

    }

    openLightbox(currentImageIndex);

}

function prevImage() {

    const data = filteredGallery.slice(
        0,
        currentPage * ITEMS_PER_PAGE
    );

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex = data.length - 1;

    }

    openLightbox(currentImageIndex);

}

/* =====================================================
   FORMAT TANGGAL
===================================================== */

function formatDate(date) {

    return new Date(date).toLocaleDateString("id-ID", {

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}

/* =====================================================
   EVENT LIGHTBOX
===================================================== */

document.addEventListener("click", (e) => {

    if (e.target.id === "closeLightbox") {

        closeLightbox();

    }

    if (e.target.closest("#closeLightbox")) {

        closeLightbox();

    }

    if (e.target.id === "nextImage") {

        nextImage();

    }

    if (e.target.closest("#nextImage")) {

        nextImage();

    }

    if (e.target.id === "prevImage") {

        prevImage();

    }

    if (e.target.closest("#prevImage")) {

        prevImage();

    }

    if (e.target.id === "galleryLightbox") {

        closeLightbox();

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeLightbox();

    }

    if (e.key === "ArrowRight") {

        nextImage();

    }

    if (e.key === "ArrowLeft") {

        prevImage();

    }

});

function initGallerySlideshow() {

    document.querySelectorAll(".gallery-slide").forEach(img => {

        const images = JSON.parse(img.dataset.images || "[]");

        if (images.length <= 1) return;

        let index = 0;
        let timer = null;

        const card = img.closest(".gallery-image");

        card.addEventListener("mouseenter", () => {

            if (timer) return;

            timer = setInterval(() => {

                index = (index + 1) % images.length;

                img.style.opacity = 0;

                setTimeout(() => {

                    img.src = images[index];

                    img.style.opacity = 1;

                }, 180);

            }, 1200);

        });

        card.addEventListener("mouseleave", () => {

            clearInterval(timer);
            timer = null;

            index = 0;

            img.style.opacity = 0;

            setTimeout(() => {

                img.src = img.dataset.thumb;
                img.style.opacity = 1;

            }, 180);

        });

    });

}