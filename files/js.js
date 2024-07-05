'use strict'

// SCROLL ANIMATION PROVIDED BY ME
{
    let main = document.getElementById("main");             // get the scrolled main container
    let sections = document.querySelectorAll(".section");   // get all sections within the container
    sections[0].classList.add("visible");                   // the first section is always visible

    function RevealSection() {

        sections.forEach(section => {

            let sectionTop = section.offsetTop;             // top border of the section
            let sectionBottom = section.offsetTop + section.scrollHeight;   // bottom border of the section
            let mainScroll = main.scrollTop + main.offsetTop;               // Scroll border (including the top margin of the main container)

            if ((mainScroll >= sectionTop)                  // if the top border is under the scroll border
                && (mainScroll <= sectionBottom)) {         // while the bottom border is over it
                    
                function ChangeClass() {
                    section.classList.add("visible")
                }
                setTimeout(ChangeClass, 500);           // then show the block
            }
            else {
                section.classList.remove("visible");        // if it's not, then hide it
            }
        });
    }

    main.addEventListener('scroll', RevealSection);
}
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