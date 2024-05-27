const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnimation() {
    var tl=gsap.timeline();

    tl.from(".nav",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease:Expo.easeInOut
    })

        .to(".boundingelm",{
            y:0,
            duration: 2,
            delay:-1,
            ease:Expo.easeInOut,
            stagger: .2
        })
        .from(".homefooter",{
            y:-10,
            opacity:0,
            duration: 1.5,
            delay:-1,
            ease:Expo.easeInOut,
        })
}


var timeout;
function  circleSqueee(){

    // define default scale value
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale=gsap.utils.clamp(.5,1.7, dets.clientX-xprev);
        yscale=gsap.utils.clamp(.5,1.7, dets.clientY-yprev);
        
        xprev=dets.clientX;
        yprev=dets.clientY;

        circleMouseFollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        },100);
      })
}


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}


circleSqueee();
firstPageAnimation();
circleMouseFollower();

// teeno elm ko select karo, teeno element pe mouse move lagao, jab mousemove ho to ye pata karo ke, mouse kaha se kaha pe hai jiska matlab hai ke mouse ke x and y position pata karo aab moue ke x y position ke badle us image ko show karo and uss image ko move karo fir rotate karo jsise jaise mouse chale waise waise rotation bhe tez ho jai 

document.querySelectorAll(".elm").forEach(function(elm) {

    var rotate=0;
    var diffnew=0;

    elm.addEventListener("mouseleave", function(dets){
        gsap.to(elm.querySelector("img"),{
            opacity:0,
            duration: 0.5
        });
    });

    elm.addEventListener("mousemove", function(dets){

        var diff =dets.clientY-elm.getBoundingClientRect().top;
        diffnew=dets.clientX - rotate;
        rotate=dets.clientX;
        
        gsap.to(elm.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20, diffnew )

        })
    });
});