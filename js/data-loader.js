/* =====================================================
   DATA LOADER
   BEM Fakultas Ilmu Komputer
===================================================== */

/* =====================================================
   BASE PATH
===================================================== */

const BASE_PATH = window.location.pathname.includes("/pages/")
    ? "../"
    : "";

const DATA_PATH = `${BASE_PATH}data/`;

/* =====================================================
   DATA STORE
===================================================== */

const DATA = {

    profil: null,

    visimisi: null,

    divisi: null,

    divisiDetail: null,

    pengurus: null,

    proker: null,

    informasi: null,

    galeri: null,

    kontak: null

};

/* =====================================================
   FETCH JSON
===================================================== */

async function fetchJSON(file) {

    try {

        const response = await fetch(DATA_PATH + file);

        if (!response.ok) {

            throw new Error(`Gagal mengambil ${file}`);

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}

/* =====================================================
   LOAD ALL DATA
===================================================== */

async function loadAllData() {

const [

    profil,

    visimisi,

    divisi,

    divisiDetail,

    pengurus,

    proker,

    informasi,

    galeri,

    kontak

] = await Promise.all([

fetchJSON("profil.json"),

fetchJSON("visimisi.json"),

fetchJSON("divisi.json"),

fetchJSON("divisi-detail.json"),

fetchJSON("pengurus.json"),

fetchJSON("proker.json"),

fetchJSON("informasi.json"),

fetchJSON("galeri.json"),

fetchJSON("kontak.json")

    ]);

    DATA.profil = profil;

    DATA.visimisi = visimisi;

    DATA.divisi = divisi;

    DATA.divisiDetail = divisiDetail;

    DATA.pengurus = pengurus;

    DATA.proker = proker;

    DATA.informasi = informasi;

    DATA.galeri = galeri;

    DATA.kontak = kontak;

    console.log("Semua data berhasil dimuat.");

}

/* =====================================================
   GETTER
===================================================== */

function getProfil() {

    return DATA.profil;

}

function getVisiMisi() {

    return DATA.visimisi;

}

function getDivisi() {

    return DATA.divisi;

}

function getPengurus() {

    return DATA.pengurus;

}

function getProgramKerja() {

    return DATA.proker;

}

function getInformasi() {

    return DATA.informasi;

}

function getGaleri() {

    return DATA.galeri;

}

function getKontak() {

    return DATA.kontak;

}

/* =====================================================
   HELPER
===================================================== */

function getById(data, id) {

    if (!Array.isArray(data)) return null;

    return data.find(item => String(item.id) === String(id));

}

function getBySlug(data, slug) {

    if (!Array.isArray(data)) return null;

    return data.find(item => item.slug === slug);

}

function getFirstImage(data) {

    if (!data) return "";

    if (Array.isArray(data)) {

        return data.length ? data[0] : "";

    }

    return data;

}

function isArray(data) {

    return Array.isArray(data);

}

/* =====================================================
   FILTER
===================================================== */

function getPengurusByDivisi(divisi) {

    if (!DATA.pengurus) return [];

    return DATA.pengurus.filter(item =>

        item.divisi === divisi

    );

}

function getProgramByDivisi(divisi) {

    if (!DATA.proker) return [];

    return DATA.proker.filter(item =>

        item.divisi === divisi

    );

}

/* =====================================================
   IMAGE FALLBACK HANDLER
===================================================== */
window.handleImageError = function(img) {
    if (!img) return;
    const fallbackSrc = `${BASE_PATH}assets/images/no-image.png`;
    // Prevent infinite loop if fallback image is missing as well
    if (img.getAttribute("data-fallback-tried") === "true") {
        img.onerror = null;
        return;
    }
    img.setAttribute("data-fallback-tried", "true");
    img.onerror = null;
    img.src = fallbackSrc;
};

// Global listener for image loading errors across dynamically rendered images
document.addEventListener("error", function(event) {
    if (event.target && event.target.tagName === "IMG") {
        window.handleImageError(event.target);
    }
}, true);