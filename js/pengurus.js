/* =====================================================
   PENGURUS PAGE
===================================================== */

const PengurusPage = {

    init() {

        this.renderLeader();

        this.renderDivision("PSDM", "psdmContainer");

        this.renderDivision("SOSPOL", "sospolContainer");

        this.renderDivision("MINBA", "minbaContainer");

        this.renderDivision("KOMINFO", "kominfoContainer");

    },

    createCard(item) {

        const nama = item.nama && item.nama.trim() !== ""
            ? item.nama
            : "Belum Diisi";

        return `

            <div class="pengurus-card">

                <div class="pengurus-photo">

                    <img
                        src="${BASE_PATH}${item.foto}"
                        alt="${nama}"
                        loading="lazy"
                        onerror="this.src='${BASE_PATH}assets/images/pengurus/default.png'">

                </div>

                <div class="pengurus-info">

                    <h3>${nama}</h3>

                    <span class="member-position">

                        ${item.jabatan}

                    </span>

                    <p class="member-division">

                        ${item.divisi}

                    </p>

                </div>

            </div>

        `;

    },

    renderLeader() {

        const container = document.getElementById("leaderContainer");

        if (!container) return;

        const data = getPengurus().filter(item =>

            item.jabatan === "Ketua" ||
            item.jabatan === "Wakil Ketua" ||
            item.jabatan === "Sekretaris" ||
            item.jabatan === "Bendahara"

        );

        container.innerHTML = data.map(item =>

            this.createCard(item)

        ).join("");

    },

    renderDivision(divisi, containerId) {

        const container = document.getElementById(containerId);

        if (!container) return;

        const data = getPengurus().filter(item =>

            item.divisi === divisi

        );

        container.innerHTML = data.map(item =>

            this.createCard(item)

        ).join("");

    }

};

/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await loadAllData();

    if (typeof BEMApp !== "undefined") {

        BEMApp.renderFooter();

    }

    PengurusPage.init();

});