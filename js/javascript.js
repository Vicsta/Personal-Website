let pages = ["home", "not"];
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
            } else {
                $(".home").fadeIn("slow", function () {
                });
            }
        })();

        window.onpopstate = function () {
            let toPage = location.href;
            let ext = toPage.replace("http://victortreaba.com/", "");
            if (ext === "") {
                ext = "home";
            }
            if (ext === "404") {
                ext = "not";
            }
            loadPage(pages.indexOf(ext));
        };

        loadHome();

        let objs = {};

        window.addEventListener("scroll", function() {
            let cur = (document.documentElement.scrollLeft || document.body.scrollLeft);
            for(let i = 0; i < document.body.children.length; i++) {
                let child = document.body.children[i];
                if(getComputedStyle(child).position === "fixed") {
                    if(objs[i] === undefined) {
                        let left = getComputedStyle(child).left;
                        left = parseInt(left.substring(0, left.length - 2));
                        objs[i] = left;
                    }
                    child.style.left = (objs[i] - cur) + "px";
                }
            }
        });

    }, false);




function loadPage(x) {
    disable();
    $("." + pages[curPage]).fadeOut("slow", function () {
        let $win = $(window);
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
        $("." + pages[x]).fadeIn("slow", function () {
            curPage = x;
            enable();
        });
    });
}

function disable() {
    // $('.topBar').css("pointer-events", "none");//disabled buttons
}

function enable() {
    // $('.topBar').css("pointer-events", "auto");//enabled buttons
}