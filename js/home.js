window.addEventListener('load', function() {
});

function loadHome() {

    $(".topName").click(function () {
        let top = $(".firstInfo").offset().top - $('.topBar').height();
        $('html,body').animate({
            scrollTop: top
        }, Math.abs(top - (document.documentElement.scrollTop || document.body.scrollTop)));
    });

    $(".topHome").click(function () {
        let top = $(".firstInfo").offset().top - $('.topBar').height();
        $('html,body').animate({
                scrollTop: top
            }, Math.abs(top - (document.documentElement.scrollTop || document.body.scrollTop)));
    });

    $(".topExp").click(function () {
        let top = $(".secondInfo").offset().top - $('.topBar').height();
        $('html,body').animate({
                scrollTop: top
            }, Math.abs(top - (document.documentElement.scrollTop || document.body.scrollTop)));
    });

    $(".topAbout").click(function () {
        let top = getEnd();
        $('html,body').animate({
                scrollTop: top
            }, Math.abs(top - (document.documentElement.scrollTop || document.body.scrollTop)));
    });

    $(".topContact").click(function () {
        let top = getEnd() + $('.thirdInfo').height();
        $('html,body').animate({
                scrollTop: top
            }, Math.abs(top - (document.documentElement.scrollTop || document.body.scrollTop)));
    });
}