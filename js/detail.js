/* =====================================================
   DETAIL PAGE
===================================================== */

function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function renderNotFound() {

    document.getElementById("divisionName").textContent =
        "Data Tidak Ditemukan";

    document.getElementById("divisionDescription").textContent =
        "Divisi yang Anda cari tidak tersedia.";

    document.getElementById("divisionLeader").textContent = "-";

    document.getElementById("divisionMember").textContent = "-";

    document.getElementById("divisionVision").textContent = "-";

    document.getElementById("divisionMission").innerHTML = "";

    document.getElementById("divisionTask").innerHTML = "";

    if (document.getElementById("programContainer")) {
        document.getElementById("programContainer").innerHTML = "";
    }

    document.getElementById("memberContainer").innerHTML = "";
}

function loadDetailDivisi() {

    const id = Number(getUrlParameter("id"));

    if (!id) {
        renderNotFound();
        return;
    }

    if (!DATA.divisiDetail) {
        console.error("divisi-detail.json belum dimuat");
        return;
    }

    const data = getById(DATA.divisiDetail, id);

    if (!data) {
        renderNotFound();
        return;
    }

    document.title = `${data.singkatan} | BEM FIK`;

    document.getElementById("divisionName").textContent =
        data.nama;

    document.getElementById("divisionDescription").textContent =
        data.deskripsi;

    document.getElementById("divisionImage").src =
        BASE_PATH + data.gambar.replace("../", "");

    document.getElementById("divisionImage").alt =
        data.nama;

    document.getElementById("divisionLeader").textContent =
        data.ketua;

    document.getElementById("divisionMember").textContent =
        `${data.jumlahAnggota} Orang`;

    document.getElementById("divisionVision").textContent =
        data.visi;

    /* ===========================
       MISI
    =========================== */

    const missionContainer =
        document.getElementById("divisionMission");

    missionContainer.innerHTML = "";

    data.misi.forEach(misi => {

        missionContainer.innerHTML += `
            <li>

                <i class="ri-check-line"></i>

                <span>${misi}</span>

            </li>
        `;

    });

        /* ===========================
       TUGAS
    =========================== */

    const taskContainer =
        document.getElementById("divisionTask");

    taskContainer.innerHTML = "";

    data.tugas.forEach(tugas => {

        taskContainer.innerHTML += `
            <div class="task-card">

                <div class="task-icon">

                    <i class="ri-checkbox-circle-line"></i>

                </div>

                <p>${tugas}</p>

            </div>
        `;

    });

    /* ===========================
       PROGRAM KERJA
    =========================== */

    const programContainer =
        document.getElementById("programContainer");

    if (programContainer) {

        programContainer.innerHTML = "";

        data.programKerja.forEach(program => {

            programContainer.innerHTML += `
                <div class="program-card">

                    <h3>${program.nama}</h3>

                    <p>${program.deskripsi}</p>

                </div>
            `;

        });

    }

    /* ===========================
       PENGURUS
    =========================== */

    const memberContainer =
        document.getElementById("memberContainer");

    memberContainer.innerHTML = "";

    data.pengurus.forEach(member => {

        memberContainer.innerHTML += `
            <div class="member-card">

                <div class="member-avatar">

                    <i class="ri-user-3-line"></i>

                </div>

                <div class="member-content">

                    <h3>${member.nama}</h3>

                    <span>${member.jabatan}</span>

                </div>

            </div>
        `;

    });
}

/* =====================================================
   DETAIL INFORMASI
===================================================== */

function loadDetailInformasi() {

    const slug = getUrlParameter("slug");

    if (!slug) return;

    const informasi = getInformasi();

    if (!informasi) {

        console.error("informasi.json belum dimuat");

        return;

    }

    const data = informasi.find(item => item.slug === slug);

    if (!data) {

        console.error("Informasi tidak ditemukan");

        return;

    }

    document.title = `${data.judul} | BEM FIK`;

    document.getElementById("infoTitle").textContent =
        data.judul;

    document.getElementById("infoCategory").textContent =
        data.kategori;

    document.getElementById("infoDate").textContent =
        new Date(data.tanggal).toLocaleDateString("id-ID", {

            day: "numeric",
            month: "long",
            year: "numeric"

        });

    document.getElementById("infoAuthor").textContent =
        data.penulis;

    document.getElementById("infoImage").src =
        BASE_PATH + data.thumbnail;

    document.getElementById("infoImage").alt =
        data.judul;

    document.getElementById("infoContent").innerHTML = `

        <p>

            ${data.deskripsi}

        </p>

    `;

    renderTags(data.tags);

    renderGallery(data.gambar);

    renderRelated(data.id);

}

function renderTags(tags){

    const container =
        document.getElementById("tagContainer");

    if(!container) return;

    container.innerHTML="";

    tags.forEach(tag=>{

        container.innerHTML+=`

        <span class="tag">

            #${tag}

        </span>

        `;

    });

}

function renderGallery(images){

    const container =
        document.getElementById("galleryContainer");

    if(!container) return;

    container.innerHTML="";

    images.forEach(img=>{

        container.innerHTML+=`

        <div class="gallery-item">

            <img src="${BASE_PATH+img}">

        </div>

        `;

    });

}

/* =====================================================
   DETAIL PROGRAM KERJA
===================================================== */

function renderProkerNotFound() {

    const title = document.getElementById("programTitle");
    const division = document.getElementById("programDivision");
    const summary = document.getElementById("programSummary");

    if (title) title.textContent = "Program Tidak Ditemukan";
    if (division) division.textContent = "-";
    if (summary) summary.textContent = "Program kerja yang Anda cari tidak tersedia atau ID tidak valid.";

}

function loadDetailProgram() {

    const id = getUrlParameter("id");

    if (!id) {
        renderProkerNotFound();
        return;
    }

    const data = getById(DATA.proker, id);

    if (!data) {
        renderProkerNotFound();
        return;
    }

    /* ---- Document title ---- */
    document.title = `${data.nama} | BEM FIK`;

    /* ---- Breadcrumb ---- */
    const breadcrumb = document.getElementById("breadcrumbCurrent");
    if (breadcrumb) breadcrumb.textContent = data.nama;

    /* ---- Hero section ---- */
    const programTitle    = document.getElementById("programTitle");
    const programDivision = document.getElementById("programDivision");
    const programSummary  = document.getElementById("programSummary");

    if (programTitle)    programTitle.textContent    = data.nama;
    if (programDivision) programDivision.textContent = `${data.divisi} • ${data.kategori}`;
    if (programSummary)  programSummary.textContent  = data.deskripsi;

    /* ---- Meta info ---- */
    const programDivisi   = document.getElementById("programDivisi");
    const programTimeline = document.getElementById("programTimeline");
    const programStatus   = document.getElementById("programStatus");

    if (programDivisi)   programDivisi.textContent   = data.divisi;
    if (programTimeline) programTimeline.textContent = data.periode;
    if (programStatus) {
        const label = data.statusLabel || data.status || "Direncanakan";
        const cls   = {
            berjalan:    "status-berjalan",
            selesai:     "status-selesai",
            direncanakan: "status-direncanakan"
        }[data.status] || "status-direncanakan";
        programStatus.innerHTML = `<span class="program-status-badge ${cls}">${label}</span>`;
    }

    /* ---- Tujuan ---- */
    const programGoal = document.getElementById("programGoal");
    if (programGoal) {
        programGoal.textContent = data.tujuan ||
            "Belum ada informasi tujuan untuk program ini.";
    }

    /* ---- Deskripsi Lengkap ---- */
    const programDescription = document.getElementById("programDescription");
    if (programDescription) {
        programDescription.textContent = data.deskripsi_lengkap || data.deskripsi;
    }

    /* ---- Sasaran ---- */
    const programTarget = document.getElementById("programTarget");
    if (programTarget) {
        if (Array.isArray(data.sasaran) && data.sasaran.length > 0) {
            programTarget.innerHTML = data.sasaran.map(s => `
                <li>
                    <i class="ri-check-double-line"></i>
                    <span>${s}</span>
                </li>
            `).join("");
        } else {
            programTarget.innerHTML = `<li>Informasi sasaran belum tersedia.</li>`;
        }
    }

    /* ---- Output ---- */
    const programOutput = document.getElementById("programOutput");
    if (programOutput) {
        if (Array.isArray(data.output) && data.output.length > 0) {
            programOutput.innerHTML = data.output.map(o => `
                <li>
                    <i class="ri-checkbox-circle-line"></i>
                    <span>${o}</span>
                </li>
            `).join("");
        } else {
            programOutput.innerHTML = `<li>Informasi output belum tersedia.</li>`;
        }
    }

    /* ---- Galeri ---- */
    const programGallery = document.getElementById("programGallery");
    if (programGallery) {
        if (Array.isArray(data.galeri) && data.galeri.length > 0) {
            programGallery.innerHTML = data.galeri.map(img => `
                <div class="gallery-item">
                    <img src="${BASE_PATH}${img}" alt="Dokumentasi ${data.nama}" loading="lazy">
                </div>
            `).join("");
        } else {
            programGallery.innerHTML = `
                <div class="gallery-empty">
                    <i class="ri-image-2-line"></i>
                    <p>Dokumentasi belum tersedia.</p>
                </div>
            `;
        }
    }

    /* ---- Program Terkait ---- */
    const relatedContainer = document.getElementById("relatedPrograms");
    if (relatedContainer && DATA.proker) {
        const related = DATA.proker
            .filter(p => p.divisi === data.divisi && p.id !== data.id)
            .slice(0, 3);

        if (related.length > 0) {
            const getStatusClass = (status) => {
                switch ((status || "").toLowerCase()) {
                    case "berjalan":    return "status-berjalan";
                    case "selesai":     return "status-selesai";
                    default:            return "status-direncanakan";
                }
            };
            relatedContainer.innerHTML = related.map(p => `
                <a href="proker-detail.html?id=${p.id}" class="program-card">
                    <div class="program-card-header">
                        <div class="program-card-icon">
                            <i class="${p.icon}"></i>
                        </div>
                        <div class="program-card-badges">
                            <span class="program-tag">${p.divisi}</span>
                            <span class="program-status-badge ${getStatusClass(p.status)}">${p.statusLabel || p.status}</span>
                        </div>
                    </div>
                    <div class="program-card-body">
                        <h3 class="program-title">${p.nama}</h3>
                        <p class="program-summary">${p.deskripsi}</p>
                    </div>
                    <div class="program-meta">
                        <span><i class="ri-calendar-line"></i> ${p.periode}</span>
                    </div>
                </a>
            `).join("");
        } else {
            relatedContainer.innerHTML = `<p class="empty-state">Tidak ada program lain dari divisi ini.</p>`;
        }
    }

}

/* =====================================================
   INIT
===================================================== */

async function initDetail() {

    try {

        await loadAllData();

        const page = window.location.pathname
            .split("/")
            .pop();

        switch (page) {

            case "divisi-detail.html":
                loadDetailDivisi();
                break;

            case "proker-detail.html":
                if (typeof loadDetailProgram === "function") {
                    loadDetailProgram();
                }
                break;

            case "informasi-detail.html":
                if (typeof loadDetailInformasi === "function") {
                    loadDetailInformasi();
                }
                break;

        }

    }

    catch (error) {

        console.error(error);

        renderNotFound();

    }

}

/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initDetail();

});
