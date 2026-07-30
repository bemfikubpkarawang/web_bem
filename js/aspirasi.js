/* =====================================================
   ASPIRASI
===================================================== */

const Aspirasi = {

    init() {

        this.bindCopyEmail();

    },

    bindCopyEmail() {

        const button = document.getElementById("copyEmail");

        if (!button) return;

        button.addEventListener("click", async () => {

            const email = button.dataset.email;

            try {

                await navigator.clipboard.writeText(email);

                alert("Email berhasil disalin.");

            } catch {

                alert("Gagal menyalin email.");

            }

        });

    }

};

