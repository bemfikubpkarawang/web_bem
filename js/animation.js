/* =====================================================
   ANIMATION
===================================================== */

const Animation = {

    init() {

        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 600,
                once: true,
                offset: 80
            });
        }

        this.reveal();

    },

    reveal() {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show", "active");

                }

            });

        }, {
            threshold: 0.15
        });

        document.querySelectorAll(".reveal").forEach(item => {

            observer.observe(item);

        });

    }

};

/*==========================
BACK TO TOP
==========================*/

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}