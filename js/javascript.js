let pages = ["home"];
let curPage = 0;

window.addEventListener('load',
    function () {

        (function () {
            let redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
            if (redirect && redirect !== location.href) {
                let check = redirect.replace("http://victortreaba.com/", "");
                if (pages.indexOf(check) < 0) {
                    check = "not";
                    redirect = "404"
                }
                history.replaceState(null, "", redirect);
                document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                document.getElementsByClassName(check)[0].style.display = "block";

                curPage = pages.indexOf(check);
            }
            else {
                $(".home").fadeIn("slow", function () {
                });
            }
        })();
    }, false);