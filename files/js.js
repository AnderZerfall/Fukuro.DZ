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
//                 setTimeout(ChangeClass, 500);           // then show the block
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
    let slidesNumber = slides.length - 1;
    let slider = document.querySelector(".slider__container");
    let index = 0;

    slides[0].style.opacity = "1";

    function InitializeSlides() {
        let cloneFirst = slides[0].cloneNode(true);
        let cloneLast = slides[slidesNumber].cloneNode(true);

        slider.appendChild(cloneFirst);
        slider.insertBefore(cloneLast, slides[0]);
    }
    InitializeSlides();

    function ChangeSlides() {
      
        // if (index > slidesNumber) {
        //    index = 0;
        // }
        // console.log("MOVE: [" + index + "] :" + (slidesNumber - index));
        // slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100 +"%)";

        // for (let i = 1; i <= slidesNumber; i++) {
        //     if ((index + i) > slidesNumber) {
        //         slides[0].style.transform = "translateX(" + (slidesNumber - index) * 120 +"%)";
        //     }
        //     else {
        //         slides[index + i].style.transform = "translateX(-" + (index + 1) * 100 +"%)";
        //     }
        // }
        // for (let i = index; i <= slidesNumber; i++) {
        //     if (i != slidesNumber) {
        //         slides[i + 1].style.transform = "translateX(-" + (index + 1) * 100 +"%)";
        //     }
        //     else {
        //         slides[0].style.transform = "translateX(" + (slidesNumber - index) * 120 +"%)";
        //     }
        // }

        index++;
        // slider.style.transform = "translateX(-" + (25 * (index + 1)) + "%)";
    }


    // console.log(index);
    // if (index === slidesNumber) {
    //     slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100 +"%)";
    //     index = 0;
    //     for (var i = index; i <= slidesNumber; i++) {
    //         slides[i].style.transform = "translateX(-" + index * 100 +"%)";
    //     }
    // }
    // else {
    //     slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100 +"%)";
    //     for (var i = index + 1; i <= slidesNumber; i++) {
    //         slides[i].style.transform = "translateX(-" + (index + 1) * 100 +"%)";
    //     }
    //     index++;
    // }

    // function ChangeSlides() {
    //     if (index == slidesNumber) {
    //         slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100 + "%)";
           
    //         index = 0;
    //         slides[index].style.transform = "translateX(0)";
          
    //     }
    //     else {
    //         slides[index].style.transform = "translateX(" + (slidesNumber - index) * 100  + "%)";
    //         slides[index+1].style.transform = "translateX(-" + (index+1) * 100 + "%)" ;

            
    //         index++;
    //     }
       
    //     console.log(index);
    // }
    setInterval(ChangeSlides, 2000);
}