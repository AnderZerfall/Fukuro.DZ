'use strict'

// SCROLL ANIMATION PROVIDED BY ME
// {
//     let main = document.getElementById("main");             // get the scrolled main container
//     let sections = document.querySelectorAll(".section");   // get all sections within the container
//     sections[0].classList.add("visible");                   // the first section is always visible

//     function RevealSection() {

//         sections.forEach(section => {

//             let sectionTop = section.offsetTop;             // top border of the section
//             let sectionBottom = section.offsetTop + section.scrollHeight;   // bottom border of the section
//             let mainScroll = main.scrollTop + main.offsetTop;               // Scroll border (including the top margin of the main container)

//             if ((mainScroll >= sectionTop)                  // if the top border is under the scroll border
//                 && (mainScroll <= sectionBottom)) {         // while the bottom border is over it
                    
//                 function ChangeClass() {
//                     section.classList.add("visible")
//                 }
//                 ChangeClass();  
//                 // setTimeout(ChangeClass, 500);           // then show the block
//             }
//             else {
//                 section.classList.remove("visible");        // if it's not, then hide it
//             }
//         });
//     }

//     main.addEventListener('scroll', RevealSection);
// }
// BLOB ANIMATION

{
    let blob = document.getElementById("blob");
    let blobContainer = document.querySelector(".hero-section__logo-blob");
    let blobSection = document.querySelector(".hero-section");

    function MoveBlobByMouse(event) {

        // let cursorX = (event.clientX - blob.offsetWidth) / containerSize.left * 100 - 60;
        // let cursorY = (event.clientY - blob.offsetHeight) / containerSize.top * 100 - 100;
        let [cursorX, cursorY] = FindCursorPosition(event);
        
        blob.style.transition = "all 100ms ease";
        blob.style.transform = "translate(" + cursorX + "%," + cursorY + "%)";
    }
    function BlobReset() {
        blob.style.transition = "all 500ms ease";
        blob.style.transform = "translate(0)";
    }
    function FindCursorPosition(event) {
        let containerSize = blobContainer.getBoundingClientRect();
        let cursorX = (event.clientX - blob.offsetWidth) / containerSize.left * 100 - 60;
        let cursorY = (event.clientY - blob.offsetHeight) / containerSize.top * 100 - 100;

        return [cursorX, cursorY];
    }
    function ClickOnEye(event) {
        let [cursorX, cursorY] = FindCursorPosition(event);
        blob.style.transform = "translate("+ cursorX +"%," + cursorY + "%)" + " scaleY(0.2)";
        setTimeout(function() {
            blob.style.transform = "translate("+ cursorX +"%," + cursorY + "%)" + " scaleY(1)";
        }, 150); 
    }

    blobSection.addEventListener('mousemove', MoveBlobByMouse);
    blobSection.addEventListener('mouseleave', BlobReset);
    window.addEventListener('click', ClickOnEye);
}

// SLIDER ANIMATION

{
    let slides = document.querySelectorAll(".card");
    let slider = document.querySelector(".slider__container");
    let timebars = document.querySelectorAll(".card__timebar");
    let slidesNumber = slides.length - 1;
    let index = 0;
    let interval = 5000;

    function TimeBarAnimation(timebar) {
        let animation = [
            {width: "0%"},
            {width: "95%"}
        ];
        let animationSettings = {
            duration: interval,
            itarations: 1
        }

        timebar.animate(animation, animationSettings);
    }

    function ChangeSlides() {

        if (index > slidesNumber) {
           index = 0;
        }
        if ((index + 1) > timebars.length - 1) {
            TimeBarAnimation(timebars[0]);
        }
        else {
            TimeBarAnimation(timebars[index + 1]);
        }
        
        slides[index].style.zIndex = "-3";
        slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100 +"%)";

        for (let i = 1; i <= slidesNumber; i++) {
            if ((index + i) > slidesNumber) {
                for (let j = 0; j <= slidesNumber-1; j++) {
                    slides[j].style.zIndex = "1";
                    slides[j].style.transform = "translateX(" + (slidesNumber - index) * 120 +"%)";
                }
            }
            else {
                slides[index + i].style.zIndex = "1";
                slides[index + i].style.transform = "translateX(-" + (index + 1) * 100 +"%)";
            }
        }
        index++;
        return index;
    }

    TimeBarAnimation(timebars[0]);
    setInterval(ChangeSlides, interval);
   
}

// CASE SECTION SCROLL

{
    let section = document.querySelector(".cases-section__container");
    let caseWindow = document.querySelector(".case-window");
    let tips = document.querySelector(".cases-section__content-block");
    let prevPos = section.scrollTop;

    function HideTips(event) {
        event.preventDefault();

        console.log("gut");
        console.log(section.scrollTop);
        let currentPos = section.scrollTop;

        if (currentPos > prevPos) {
            tips.style.transform = "translateY(" + 100 + "%)";
            tips.style.opacity = 0;
            caseWindow.style.transform = "translateY(-" + 3 +"%)";
            // caseWindow.scrollTo(0,43);
        }
        else {
            tips.style.transform = "translateY(" + 0 + "%)";
            tips.style.opacity = 1;
            caseWindow.style.transform = "translateY(" + 0 +"%)";
        }
        prevPos = currentPos;
    }

    section.addEventListener('scroll', HideTips);
}

// CASE SECTION PORTFOLIO BLOCK

{
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let images = document.querySelectorAll(".case-window__img");
    let currentImage = 0;
    
    images[currentImage].style.display = "block";

    function OpenNext() {
        images[currentImage].style.display = "none";

        if (currentImage == images.length - 1) {
            currentImage = 0;
        }
        else {
            currentImage++;
        }
       
        images[currentImage].style.display = "block";
    }
    function OpenPrev() {
        images[currentImage].style.display = "none";

        if (currentImage == 0) {
            currentImage = images.length - 1;
        }
        else {
            currentImage--;
        }

        images[currentImage].style.display = "block";
    }

    next.addEventListener('click', OpenNext);
    prev.addEventListener('click', OpenPrev);
}


// FADE OUT TEXT ON THE TICKER
// {
//     let ticker = document.querySelector(".decorative-features__ticker");
//     let spans = document.querySelectorAll(".ticker__text");
//     let tickerSize = ticker.getBoundingClientRect();
//     let index = 0;

//     function FadeOut() {
//         if (index == spans.length - 1) {
//             index = 0;
//         }
//         console.log(spans[index].offsetLeft);
//         if (spans[index].offsetLeft < 100) {
//             spans[index].style.opacity = "0";
//         }
//         else {
//             spans[index].style.opacity = "1";
//         }
//         index++;
//     }
//     FadeOut();
//     setInterval(FadeOut, 100);
// }
// {
//     let spans = document.querySelectorAll(".ticker__text");
//     let index = 0;

//     let fadeOut = [
//         { opacity: "1"},
//         { opacity: "0"}
//     ];
//     let fadeOutSettings = {
//         duration: 500,
//         iterations: "infinite",
//     }

//     function FadeOut() {
//         if (index == spans.length - 1) {
//             index = 0;
//         }
//         if (index != 0) {
//             spans[index - 1].animate(fadeOut, fadeOutSettings);    
//         }   
//         else {
//             spans[spans.length - 1].animate(fadeOut, fadeOutSettings);
            
//         }
       
//         spans[index].animate(fadeOut, fadeOutSettings);
//         index++;
//     }
//     setInterval(FadeOut, 500);
// }