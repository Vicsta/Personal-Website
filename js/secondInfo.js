let cardHeight = 150;
let cardWidth = 120;

window.addEventListener("load", function() {

    let height = ((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
    // Vertical offset of the screen due to the topBar
    let verticalOffset = document.getElementsByClassName("topBar")[0].getBoundingClientRect().bottom;
    let absTop = document.getElementsByClassName("firstInfo")[0].getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
    // Absolute position in pixels of the section preceding the scroll into section

    let focused = false;

    let cards = [];
    let arr = $(".secondInfo").children(".card");
    for(let i = 0; i < arr.length; i ++) {
        let obj = {};
        let child = arr[i];
        child.style.zIndex = arr.length - i;
        obj["date"] = child.children[0];
        obj["title"] = child.children[1];
        obj["desc"] = child.children[2];
        obj["pic"] = child.children[3];

        obj["left"] = (300 * (i + 1)) + 200;

        cards.push(obj);
    }

    let speed = 1;

    let infoHeight = getComputedStyle(document.getElementsByClassName("secondInfo")[0]).height;
    infoHeight = parseInt(infoHeight.substr(0, infoHeight.length - 2));

    let screenM = getComputedStyle(document.getElementsByClassName("secondInfo")[0]).width;
    screenM = parseInt(screenM.substr(0, screenM.length - 2))/2;
    let end = (1.2*cards[cards.length - 1]["left"] + 1.2*absTop*speed - 0.2*screenM - 105/2)/(1.2*speed);
    getEnd = function() { return end + infoHeight };
    document.getElementsByClassName("thirdInfo")[0].style.marginTop = (end - absTop + infoHeight + verticalOffset) + "px";
    console.log("COMPUTED END IS " + end);

    /*
        newLoc - width/2 == 0

        scrolled = (VAR - absTop)

        newLoc = (cards[i]["left"] - (scrolled * speed))
        newLoc = cards[cards.length - 1]["left"] - ((VAR - absTop) * speed)
        newLoc = cards[cards.length - 1]["left"] - (speed*VAR - absTop*speed)
        newLoc = cards[cards.length - 1]["left"] - speed*VAR + absTop*speed

        width = (screenMid - newLoc) * 0.4 + 105
        width = ((screenM - newLoc) * 0.4) + 105
        width = 0.4*screeM - 0.4*newLoc + 105
        width = 0.4*screeM - 0.4*newLoc + 105

        newLoc - (0.4*screeM - 0.4*newLoc + 105)/2 == 0
        newLoc - 0.2*screeM + 0.2*newLoc - 105/2 == 0
        1.2*newLoc - 0.2*screeM - 105/2 == 0

        1.2*(cards[cards.length - 1]["left"] - speed*VAR + absTop*speed) - 0.2*screeM - 105/2 == 0;
        1.2*speed*VAR = 1.2*(cards[cards.length - 1]["left"] + absTop*speed) - 0.2*screeM - 105/2;
        VAR = (1.2*(cards[cards.length - 1]["left"] + absTop*speed) - 0.2*screeM - 105/2) / (1.2 * speed)

     */

    window.addEventListener("resize", function () {
        verticalOffset = document.getElementsByClassName("topBar")[0].getBoundingClientRect().bottom;
        absTop = document.getElementsByClassName("firstInfo")[0].getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
        infoHeight = getComputedStyle(document.getElementsByClassName("secondInfo")[0]).height;
        infoHeight = parseInt(infoHeight.substr(0, infoHeight.length - 2));
        end = (1.2*cards[cards.length - 1]["left"] + 1.2*absTop*speed - 0.2*screenM - 105/2)/(1.2*speed);
        getEnd = function() { return end + infoHeight };
        document.getElementsByClassName("thirdInfo")[0].style.marginTop = (end - absTop + infoHeight + verticalOffset) + "px";
        setCards((document.documentElement.scrollTop || document.body.scrollTop));
        scrollFunc();
    });

    setCards((document.documentElement.scrollTop || document.body.scrollTop));
    scrollFunc();

    function setCards(cur) {
        if(cur > end) {
            cur = end;
        } else if(cur < absTop) {
            cur = absTop;
        }

        let scrolled = cur - absTop;

        let screenMid = getComputedStyle(document.getElementsByClassName("secondInfo")[0]).width;
        screenMid = parseInt(screenMid.substr(0, screenMid.length - 2))/2;

        let arr = $(".secondInfo").children(".card");
        for(let i = 0; i < arr.length; i ++) {
            let child = arr[i];

            let newLoc = (cards[i]["left"] - (scrolled * speed));

            if(newLoc > screenMid) {
                newLoc = screenMid;
            }

            let width = (screenMid - newLoc) * 0.4 + cardWidth;

            /*

            (cards[i]["left"] - (scrolled * speed)) - ((screenMid - newLoc) * 0.4 + 105)/2

             */

            // if(i === cards.length - 1 && newLoc - ((screenMid - newLoc) * 0.4 + 105)/2 <= 0) {
            //     console.log("changing end to " + cur);
            //     end = cur;
            // }

            if(i % 2 === 0) {
                child.style.left = newLoc - width/2 + "px";
            } else {
                child.style.right = newLoc - width/2 + "px";
            }

            if(newLoc < screenMid/2) {
                child.style.transform = "rotate(0)"
            } else {
                child.style.transform = "rotate(" + ((newLoc - screenMid/2)/(screenMid/2) * ((i % 2 === 0) ? -45 : 45)) + "deg)";
            }

            // 700 start position minus the original position of left offset by how far we've scrolled. Returns 0 when not scrolled

            child.style.width = width + "px";
            child.style.padding = width/15 + "px " + width/10 + "px";
            child.style.fontSize = width / 19 + "px";
            child.children[1].style.marginBottom = width/35 + "px";
            child.children[3].children[0].style.bottom = width/15 + "px";
            if(i === 1) {
                child.children[2].children[1].style.paddingLeft = width/15 + "px";
            }
            // child.style.borderWidth = (width / 70) + "px";
            child.style.borderRadius = width / 40 + "px";
            child.style.height = width * (cardHeight/ cardWidth) + "px";
            child.style.top = (infoHeight)/2 - (width * (cardHeight/ cardWidth))/2 + "px"
        }
    }

    window.addEventListener("scroll", scrollFunc);
    window.addEventListener("scroll", borders);

    function borders() {
        let arr = $(".secondInfo").children(".circle");
        /*
            TOP = absTop - verticalOffset
            BOT = end
            CUR = (document.documentElement.scrollTop || document.body.scrollTop)
         */
        let TOP = absTop - verticalOffset;
        let BOT = end;
        let CUR = (document.documentElement.scrollTop || document.body.scrollTop);
        for(let i = 0; i < arr.length; i ++) {
            if(CUR >= end) {
                arr[i].style.borderRadius = 0;
            } else {
                arr[i].style.borderRadius = 60 * (((BOT - TOP) - (CUR - TOP)) / (BOT - TOP)) + "%";
            }
        }
    }

    function scrollFunc() {
        // Relative location of the top of the scroll into section
        // Location of the scroll bar
        let cur = (document.documentElement.scrollTop || document.body.scrollTop);
        // console.log(cur);
        if(cur < (absTop - verticalOffset)) {
            if(focused) {
                setCards(cur);
                document.getElementsByClassName("secondInfo")[0].style.position = "";
                document.getElementsByClassName("secondInfo")[0].style.top = "";
                document.getElementsByClassName("secondInfo")[0].style.left = "";
                focused = false;
            }
        } else if(cur > end) {
            focused = false;
            document.getElementsByClassName("secondInfo")[0].style.position = "fixed";
            document.getElementsByClassName("secondInfo")[0].style.top = verticalOffset - (cur - end) + "px";
            setCards(cur);

        } else if(absTop <= verticalOffset || cur >= (absTop - verticalOffset)) {
            if(!focused) {
                document.getElementsByClassName("secondInfo")[0].style.position = "fixed";
                document.getElementsByClassName("secondInfo")[0].style.top = verticalOffset + "px";
                document.getElementsByClassName("secondInfo")[0].style.left = "0";
                focused = true;
            }
            setCards(cur);

        }
    }

});

function getEnd(){}