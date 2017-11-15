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
                let numLeaves = 60;
                let numSnow = 0;
                let curLeaves = 0;
                let curSnow = 0;

                let didScroll = false;

                function scrolled() {
                    didScroll = true;
                    window.removeEventListener("scroll", scrolled);
                }

                window.addEventListener("scroll", scrolled);

                setInterval(function() {
                    if(didScroll) {
                        didScroll = false;
                        let cur = (document.documentElement.scrollTop || document.body.scrollTop);
                        let loc = cur / ((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight) * 100;
                        if (loc < 25) {
                            numLeaves = 50;
                            numSnow = 0;
                        } else if (loc < 50) {
                            numLeaves = 100;
                            numSnow = 20;
                        } else if (loc < 75) {
                            numLeaves = 20;
                            numSnow = 100;
                        } else {
                            numLeaves = 35;
                            numSnow = 15;
                        }
                        console.log('You scrolled');
                        window.addEventListener("scroll", scrolled);
                    }
                }, 750);

                /*
                                PROCEDURE TO CONTROL BACKGROUND ANIMATIONS
                                 */

                let height = document.documentElement.clientHeight;

                let width = Math.max(
                    document.documentElement.clientWidth,
                    document.body.scrollWidth,
                    document.documentElement.scrollWidth,
                    document.body.offsetWidth,
                    document.documentElement.offsetWidth
                );

                window.addEventListener("resize", function () {
                    height = document.documentElement.clientHeight;


                    width = Math.max(
                        document.documentElement.clientWidth,
                        document.body.scrollWidth,
                        document.documentElement.scrollWidth,
                        document.body.offsetWidth,
                        document.documentElement.offsetWidth
                    );
                });

                let dir = [];
                let speed = [];
                let grav = [];
                let wind = [];
                let rot = [];
                let delta = [];

                function createChild(parent, childName) {

                    let bound = parent.getBoundingClientRect();
                    let startX = ((Math.random() * (bound.right - bound.left)) + bound.left) + "px";
                    let startY = ((Math.random() * (bound.bottom - bound.top)) + bound.top) + "px";

                    let newChild = document.createElement("div");

                    newChild.style.top = startY;
                    newChild.style.left = startX;
                    newChild.style.transform = randomRotate();
                    let z = newChild.style.transform.split(" ")[2].replace("rotateZ(", "").replace("deg)", "");
                    grav.push(Math.random() / 6 + 0.3);
                    speed.push(Math.random() / 6 + 1);
                    if (childName === "leaf") {
                        wind.push(Math.random() / 4 + 0.5);
                        newChild.className = childName + Math.floor(Math.random() * 2);
                        let random = Math.random() * 15;
                        newChild.style.width = (60 - random) + "px";
                        newChild.style.height = (60 - random) + "px";
                    } else {
                        wind.push(0.2);
                        newChild.className = childName + Math.floor(Math.random());
                        let random = Math.random() * 5;
                        newChild.style.width = (10 - random) + "px";
                        newChild.style.height = (10 - random) + "px";
                    }
                    rot.push(Math.random() / 4 + 0.4);
                    delta.push(Math.random() * 40 - 20);
                    if (z < 90) {
                        dir.push(-1);
                    } else {
                        dir.push(1);
                    }

                    document.getElementsByClassName("container")[0].appendChild(newChild);
                    $(newChild).fadeIn("slow");
                }

                function randomRotate() {
                    let x = Math.random() * 10;
                    let y = Math.random() * 30 - 15;
                    let z = Math.random() * 180;
                    return "rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(" + z + "deg)";
                }

                //Animates the children of a given parent to fall
                function animate(parent) {
                    if (curLeaves < numLeaves) {
                        //&& ((curLeaves + curSnow)< (numLeaves + numSnow))
                        for (let i = 0; i < (numLeaves - curLeaves); i++) {
                            setTimeout(function () {
                                createChild(document.getElementsByClassName("tree")[0], "leaf");
                            }, 300 * i);
                            curLeaves++;
                        }
                    }

                    if (curSnow < numSnow) {
                        // && ((curLeaves + curSnow) < (numLeaves + numSnow))
                        for (let i = 0; i < (numSnow - curSnow); i++) {
                            setTimeout(function () {
                                createChild(document.getElementsByClassName("sky")[0], "snowflake");
                            }, 200 * i);
                            curSnow++;
                        }
                    }

                    for (let i = 0; i < parent.children.length; i++) {
                        let child = parent.children[i];
                        let z = child.style.transform.split(" ")[2].replace("rotateZ(", "").replace("deg)", "");
                        let dx = speed[i];
                        let dy = Math.random() * 2 * Math.abs(Math.cos(z * Math.PI / 180));
                        if (child.className.indexOf("leaf") >= 0) {
                            child.style.top = (child.style.top.replace("px", "") - (0.2 * Math.sin(z / 180 * Math.PI)) + grav[i] + "px");
                        } else {
                            child.style.top = (child.style.top.replace("px", "") - 0 + grav[i] + "px");
                        }
                        child.style.left = (child.style.left.replace("px", "") - 0 - (0.1 * Math.sin(z / 180 * Math.PI)) + (dir[i] * speed[i] * 1.5) + wind[i]) + "px";

                        if ((child.style.top.replace("px", "") - 0 + dy) > height || (child.style.left.replace("px", "") - 0 + dx) > width || (child.style.left.replace("px", "") - 0 + dx) < -100) {
                            parent.removeChild(child);
                            dir.splice(i, 1);
                            speed.splice(i, 1);
                            wind.splice(i, 1);
                            grav.splice(i, 1);
                            rot.splice(i, 1);
                            delta.splice(i, 1);
                            if (child.className.indexOf("leaf") >= 0) {
                                curLeaves--;
                            } else {
                                curSnow--;
                            }
                            i--;
                        } else {
                            if (z >= 92 && dir[i] === -1) {
                                if (speed[i] > 0) {
                                    speed[i] -= speed[i] / 50;
                                }
                            } else if (z >= 100 && dir[i] === 1) {
                                if (speed[i] < 1.1) {
                                    speed[i] += 0.02;
                                }
                            } else if (z <= 80 && dir[i] === -1) {
                                if (speed[i] < 1.1) {
                                    speed[i] += 0.03;
                                }
                            } else if (z <= 88 && dir[i] === 1) {
                                if (speed[i] > 0) {
                                    speed[i] -= speed[i] / 50;
                                }
                            }

                            if (z <= 92 && z >= 88) {
                                speed[i] = 1 + (Math.random() / 4);
                            }

                            if ((z <= 140 && dir[i] === -1 && speed[i] > 0.22) || (z >= 20 && dir[i] === 1 && speed[i] > 0.22)) {
                                z = z - (dir[i] * rot[i]);
                            }

                            if (z >= 110 && speed[i] <= 0.2 && dir[i] === -1) {
                                dir[i] = 1;
                            } else if (z < 70 && speed[i] <= 0.2 && dir[i] === 1) {
                                dir[i] = -1;
                            }

                            let x = child.style.transform.split(" ")[0].replace("rotateX(", "").replace("deg)", "");
                            if (x > 0 + delta[i] && dir[i] === -1) {
                                x = x - Math.random() / 2;
                            } else if (x < 40 + delta[i] && dir[i] === 1) {
                                x = x - 0 + Math.random() / 2;
                            }

                            let y = child.style.transform.split(" ")[1].replace("rotateY(", "").replace("deg)", "");
                            if (y > 0 + delta[i] && dir[i] === -1) {
                                y = y - Math.random() / 2;
                            } else if (y < 40 + delta[i] && dir[i] === 1) {
                                y = y - 0 + Math.random() / 2;
                            }

                            child.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(" + z + "deg)";
                        }
                    }
                }

                setInterval(function () {
                    animate(document.getElementsByClassName("container")[0]);
                }, 10);

                /*
                END OF PROCEDURE
                 */
                $(".welcomeName").fadeIn(1700, function () {
                    $(".welcomeFlair").fadeIn(1000, function () {
                        setTimeout(function () {
                            $(".welcome").fadeOut(1000, function () {

                                $(".homeBar").click(function() {
                                    $('html,body').animate({
                                            scrollTop: $(".home").offset().top},
                                        'slow');
                                });

                                $(".aboutBar").click(function() {
                                    $('html,body').animate({
                                            scrollTop: $(".about").offset().top},
                                        'slow');
                                });

                                $(".experienceBar").click(function() {
                                    $('html,body').animate({
                                            scrollTop: $(".exp").offset().top},
                                        'slow');
                                });

                                $(".contactBar").click(function() {
                                    $('html,body').animate({
                                            scrollTop: $(".contact").offset().top},
                                        'slow');
                                });

                                let press = false;

                                document.getElementsByClassName("hoverHide")[0].addEventListener("click", function() {
                                    document.getElementsByClassName("hoverHide")[0].style.pointerEvents = "none";
                                    if(!press) {
                                        document.getElementsByClassName("hoverHide")[0].style.boxShadow = "inset #0f0f0f 0 0 0.7vw 0.2vw";
                                        $(".home, .contact, .exp, .about").css({
                                            opacity: 1.0,
                                            visibility: "visible"
                                        }).animate({opacity: 0}, 1000, function () {
                                            document.getElementsByClassName("hoverHide")[0].style.pointerEvents = "auto";
                                        });
                                    } else {
                                        document.getElementsByClassName("hoverHide")[0].style.boxShadow = "";
                                        $(".home, .contact, .exp, .about").css({
                                            opacity: 0,
                                            visibility: "visible"
                                        }).animate({opacity: 1}, 1000, function () {
                                            document.getElementsByClassName("hoverHide")[0].style.pointerEvents = "auto";
                                        })
                                    }
                                    press = !press;
                                });

                                $(".all").fadeIn(1500, function () {
                                });
                            });
                        }, 1400);
                    });
                });
            }
        })();

    }, false);