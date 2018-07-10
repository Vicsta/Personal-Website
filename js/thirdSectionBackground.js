window.addEventListener('load', function() {

    let parent = $("#thirdBack");

    let num = 0;
    let blue = "#5C6BC0"; // blue
    let green = "#8BC34A"; // green
    let red = "#F44336"; // red
    let yellow = "#FFB74D"; // yellow

    for(let start = Math.random() * 7 - 4; start < 100; start += Math.random() * 4 + 3) {
        let size = Math.random() * 3 + 5;

        let wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        let square = document.createElement("div");
        square.className = "square1";
        square.style.width = square.style.height = size + "vw";
        square.style.left = start + "vw";
        square.style.bottom = "0";
        square.style.zIndex = parseInt(size) + "";

        num++;

        switch(num) {
            case 1: square.style.borderColor = blue; break;
            case 2: square.style.borderColor = green; break;
            case 3: square.style.borderColor = red; break;
            case 4: square.style.borderColor = yellow; break;
        }
        square.style.opacity = 0.1 + "";

        wrapper.append(square);

        let sizeAcc = 0;

        for(let i = size - 1; i >= 1; i --) {
            let behind = document.createElement("div");
            behind.className = "testSq";
            behind.style.width = behind.style.height = i + "vw";
            behind.style.left = (start + (size - i)/2) + "vw";
            behind.style.bottom= (0.5 * (size - i)) + "vw";
            behind.style.zIndex = parseInt(i) + "";
            switch(num) {
                case 1: behind.style.background = blue; break;
                case 2: behind.style.background = green; break;
                case 3: behind.style.background = red; break;
                case 4: behind.style.background = yellow; break;
            }

            behind.style.opacity = 0.1 + "";

            wrapper.append(behind);
        }

        if(num === 4) {
            num = 0;
        }

        start += size;
        parent.append(wrapper);
        setTimeout(() => { up(wrapper, randomMaxHeight(), 0, randomMaxSpeed()) }, 500);
    }

    function randomMaxSpeed() {
        return Math.random() * 20 + 20;
    }

    function randomMaxHeight() {
        return Math.random() * 200 + 300;
    }

    let height = parent.height();

    function down(elem, finalPos, speed, maxSpeed) {
        let bot = elem.firstChild.style.bottom;
        bot = parseFloat(bot.substr(0, bot.length - 2));

        let ratio = bot / (finalPos / 2);
        if(ratio > 1) {
            ratio = 2 - ratio;
        }

        if(ratio < 0.02) {
            ratio = 0.02;
        }

        let unshiftRatio = ratio;

        speed = maxSpeed * ratio;

        let size = elem.firstChild.style.height;
        size = parseFloat(size.substr(0, size.length - 2));

        for(let i = 0; i < elem.children.length; i++) {
            if(i === 0) {
                elem.children[i].style.bottom = bot - speed + "px";
            } else {
                elem.children[i].style.bottom = "calc(" + (bot - speed + (Math.pow(unshiftRatio, 1) * i * 40)) + "px + " + (0.5 * i) + "vw)";
            }

        }

        if(bot > 0) {
            setTimeout(() => { down(elem, finalPos, 0, maxSpeed) }, 16.67);
        } else {
            setTimeout(() => { up(elem, randomMaxHeight(), speed, randomMaxSpeed()) }, 16.67);
        }
    }

    function up(elem, finalPos, speed, maxSpeed) {
        let bot = elem.firstChild.style.bottom;
        bot = parseFloat(bot.substr(0, bot.length - 2));

        let ratio = bot / (finalPos / 2);
        if(ratio > 1) {
            ratio = 2 - ratio;
        }

        let unshiftRatio = ratio;

        if(ratio < 0.02) {
            ratio = 0.02;
        }

        speed = maxSpeed * ratio;

        for(let i = 0; i < elem.children.length; i++) {
            if(i === 0) {
                elem.children[i].style.bottom = bot + speed - (Math.pow(unshiftRatio, 1) * i * 20) + "px";
            } else {
                elem.children[i].style.bottom = "calc(" + (bot + speed - (Math.pow(unshiftRatio, 1) * i * 40)) + "px + " + (0.5 * i) + "vw)";
            }
        }

        if(bot < finalPos) {
            setTimeout(() => { up(elem, finalPos, speed, maxSpeed) }, 16.67);
        } else {
            setTimeout(() => { down(elem, finalPos, 0, maxSpeed) }, 16.67);
        }
    }

    let focused = false;
    window.addEventListener('scroll', function() {
        if(document.getElementsByClassName("fourthInfo")[0].getBoundingClientRect().top <= 65 + $(".fourthInfo").height()) {
            if(focused) {
                focused = false;
                document.getElementById("thirdBack").style.position = "absolute";
                document.getElementById("thirdBack").style.bottom = "0";
                document.getElementById("thirdBack").style.top = "";
            } else {
                document.getElementById("thirdBack").style.bottom = "0";
                document.getElementById("thirdBack").style.top = "";
            }
        } else if(document.getElementsByClassName("thirdInfo")[0].getBoundingClientRect().top <= 65) {
            if(!focused) {
                focused = true;
                document.getElementById("thirdBack").style.position = "fixed";
                document.getElementById("thirdBack").style.bottom = "";
                document.getElementById("thirdBack").style.top = "65px";
            }
        } else if(document.getElementsByClassName("thirdInfo")[0].getBoundingClientRect().top > 0) {
            if(focused) {
                focused = false;
                document.getElementById("thirdBack").style.position = "absolute";
                document.getElementById("thirdBack").style.bottom = "";
                document.getElementById("thirdBack").style.top = "0";
            } else {
                document.getElementById("thirdBack").style.bottom = "";
                document.getElementById("thirdBack").style.top = "0";
            }
        }

    });
});