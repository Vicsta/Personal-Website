window.addEventListener('load', function() {
    let num = 10;
    let parent = $(".secondInfo");

    let maxSize = parent.width()/num;
    let minLeft = -maxSize;
    let maxLeft = parent.width() + maxSize;
    let minTop = -maxSize;
    let maxTop = parent.height() ;//+ maxSize/2;

    let blue = "#5C6BC0"; // blue
    let green = "#8BC34A"; // green
    let red = "#F44336"; // red
    let yellow = "#FFB74D"; // yellow

    let circles = 0;

    for(let left = minLeft + (Math.random() * maxSize); left < maxLeft; left += 1.5*maxSize + (Math.random() * maxSize)) {
        for (let top = minTop + (Math.random() * maxSize); top < maxTop; top += 1.5*maxSize + (Math.random() * maxSize)) {
            let size = (Math.random() * (maxSize*2/3)) + maxSize/3;
            let circle = document.createElement("div");
            circle.className = "circle";
            circle.style.left = left + (maxSize - size)/2 + "px";
            circle.style.top = top + (maxSize - size)/2 + "px";
            circle.style.width = circle.style.height = size + "px";

            circle.style.borderWidth = (Math.random() * 3) + 2 + "px";

            circles++;
            switch(circles) {
                case 1: circle.style.borderColor = blue; break;
                case 2: circle.style.borderColor = green; break;
                case 3: circle.style.borderColor = red; break;
                case 4: circle.style.borderColor = yellow; circles = 0; break;
            }

            circle.style.opacity = (Math.random() * .5) + .1;

            parent.append(circle);
            let speed = 0.02 + (Math.random() * 0.01);
            if(size > maxSize/2) {
                speed = 0.01 + (Math.random() * 0.01);
            }
            shrink(circle, speed, size);
        }
    }

    function shrink(elem, percent, maxGrow) {
        let d = elem.style.width;
        d = parseFloat(d.substr(0, d.length - 2));
        let left = elem.style.left;
        left = parseFloat(left.substr(0, left.length - 2));
        let top = elem.style.top;
        top = parseFloat(top.substr(0, top.length - 2));

        let newSize = (1 - percent) * d;
        elem.style.width = elem.style.height = newSize + "px";

        let xOffset = left - (maxSize - d)/2;
        let yOffset = top - (maxSize - d)/2;

        elem.style.left = xOffset + (maxSize - newSize)/2 + "px";
        elem.style.top = yOffset + (maxSize - newSize)/2 + "px";
        if(d > 30) {
            setTimeout(() => {shrink(elem, percent, maxGrow)}, 16.67);
        } else {
            setTimeout(() => {grow(elem, percent, maxGrow)}, 16.67);
        }
    }

    function grow(elem, percent, maxGrow) {
        let d = elem.style.width;
        d = parseFloat(d.substr(0, d.length - 2));
        let left = elem.style.left;
        left = parseFloat(left.substr(0, left.length - 2));
        let top = elem.style.top;
        top = parseFloat(top.substr(0, top.length - 2));

        let newSize = (1 + percent) * d;
        elem.style.width = elem.style.height = newSize + "px";

        let xOffset = left - (maxSize - d)/2;
        let yOffset = top - (maxSize - d)/2;

        elem.style.left = xOffset + (maxSize - newSize)/2 + "px";
        elem.style.top = yOffset + (maxSize - newSize)/2 + "px";
        if(d > maxGrow) {
            setTimeout(() => {shrink(elem, percent, maxGrow)}, 16.67);
        } else {
            setTimeout(() => {grow(elem, percent, maxGrow)}, 16.67);
        }
    }

});