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
                document.getElementsByClassName("welcome")[0].style.display = "block";

                /*
                END OF PROCEDURE
                 */
                $(".welcomeName").fadeIn(1700, function () {
                    $(".welcomeFlair").fadeIn(1000, function () {
                        setTimeout(function () {
                            $(".welcome").fadeOut(1000, function () {

                                // $(".homeBar").click(function() {
                                //     $('html,body').animate({
                                //             scrollTop: $(".home").offset().top},
                                //         'slow');
                                // });

                                $(".all").fadeIn(1500, function () {
                                });
                            });
                        }, 1400);
                    });
                });
            }
        })();

    }, false);