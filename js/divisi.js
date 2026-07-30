/* =====================================================
   DIVISI PAGE
===================================================== */

const Divisi = {

    cards: [],
    keyword: "",

    init() {

        this.cards = document.querySelectorAll(".divisi-card");

        this.search();

    },

    search() {

        const input = document.getElementById("searchDivisi");

        if (!input) return;

        input.addEventListener("input", (e) => {

            this.keyword = e.target.value.toLowerCase();

            this.filter();

        });

    },

    filter() {

        this.cards.forEach(card => {

            const nama =
                card.querySelector("h3").textContent.toLowerCase();

            const deskripsi =
                card.querySelector("p").textContent.toLowerCase();

            if (
                nama.includes(this.keyword) ||
                deskripsi.includes(this.keyword)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }

};
