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

        let moving = false;
        let words = ["<Software></Developer>", "<Entrepreneur/>"];
        let index = 0;

        downOpacity(document.getElementById("pulse"), 1);

        function upOpacity(elem, opac) {
            elem.style.opacity = opac;
            if(moving) {
                elem.style.opacity = 1;
            } else {
                elem.style.opacity = opac;
            }
            if(opac > 1) {
                setTimeout(() => { downOpacity(elem, opac - 0.05) }, 16.67);
            } else {
                setTimeout(() => { upOpacity(elem, opac + 0.05) }, 16.67);
            }
        }

        function downOpacity(elem, opac) {
            if(moving) {
                elem.style.opacity = 1;
            } else {
                elem.style.opacity = opac;
            }
            if(opac > 0) {
                setTimeout(() => { downOpacity(elem, opac - 0.05) }, 16.67);
            } else {
                setTimeout(() => { upOpacity(elem, opac + 0.05) }, 16.67);
            }
        }

        writeWords(document.getElementById("writeText"), words[index]);

        function writeWords(elem, word) {
            index++;
            moving = true;
            console.log(word + " " + index);
            for(let i = 0; i < word.length; i ++) {
                setTimeout(() => {writeLetter(elem, word.charAt(i))}, 200 * i);
            }
            setTimeout(() => {moving = false}, word.length * 200);
            setTimeout(() => {deleteWords(elem)} , 200 * word.length + 3000);
        }

        function writeLetter(elem, letter) {
            elem.innerText += letter;
        }

        function deleteWords(elem) {
            moving = true;
            let size = elem.innerText.length;
            console.log(elem.innerText);
            console.log(elem.innerHTML);
            for(let i = 0; i < size; i ++) {
                setTimeout(() => { elem.innerText = elem.innerText.substr(0, elem.innerText.length - 1); }, 150 * i);
            }
            setTimeout(() => {moving = false}, (size) * 150);
            setTimeout(() => {
                if(index > words.length - 1) {
                    index = 0;
                }
                writeWords(document.getElementById("writeText"), words[index]);
                }, (size) * 150 + 1500);
        }

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