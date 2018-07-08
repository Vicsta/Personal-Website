window.addEventListener('load', function() {
    let num = 10;
    let parent = $(".firstInfo");
    let size = parent.width()/num;
    let edit = parent.height()/size;
    edit = Math.round(edit);
    parent.height(edit * size);

    let blue = "#5C6BC0"; // blue
    let green = "#8BC34A"; // green
    let red = "#F44336"; // red
    let yellow = "#FFB74D"; // yellow

    let circles = 0;

    for(let j = 0; j < edit; j++) {
        for (let i = 0; i < num; i++) {
            if(Math.random() > 0.4) {
                circles++;
                let circle = document.createElement("div");
                circle.className = "circle";
                circle.style.left = (i * size) + "px";
                circle.style.top = (j * size + 65) + "px";
                circle.style.width = circle.style.height = size + "px";

                circle.style.borderWidth = (Math.random() * 3) + 2 + "px";

                switch(circles) {
                    case 1: circle.style.borderColor = blue; break;
                    case 2: circle.style.borderColor = green; break;
                    case 3: circle.style.borderColor = red; break;
                    case 4: circle.style.borderColor = yellow; circles = 0; break;
                }
                parent.append(circle);
            }
        }
    }

    window.addEventListener('mousemove', resizeCircles);
    window.addEventListener('scroll', resizeCircles);

    let lastX = 0;
    let lastY = 0;
    function resizeCircles() {
        let arr = parent.children(".circle");
        let scroll = (document.documentElement.scrollTop || document.body.scrollTop);
        if(event.clientX) {
            lastX = event.clientX;
            lastY = event.clientY;
        }
        for(let i = 0; i < arr.length; i++) {
            let d = arr[i].style.width;
            d = parseFloat(d.substr(0, d.length - 2));
            let x1 = arr[i].style.left;
            x1 = parseFloat(x1.substr(0, x1.length - 2)) + d / 2;
            let y1 = arr[i].style.top;
            y1 = parseFloat(y1.substr(0, y1.length - 2)) + d / 2;
            let ratio = ((dist(x1, y1, lastX, lastY - 65 + scroll)) / parent.width());
            if(ratio > 1) {
                ratio = 1;
            } else if(ratio < 0.1) {
                ratio = 0.1;
            }
            let newSize = ratio * size;
            arr[i].style.width = arr[i].style.height = newSize + "px";

            let xOffset = Math.round((x1 - d / 2) / size);
            let yOffset = Math.round((y1 - 65 - d / 2) / size);

            arr[i].style.left = (xOffset * size) + (size - newSize)/2 + "px";
            arr[i].style.top = (yOffset * size) + 65 + (size - newSize)/2 + "px";
        }
    }

    function dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
});