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
                section.classList.add("visible");           // then show the block
            }
            else {
                section.classList.remove("visible");        // if it's not, then hide it
            }
        });
    }

    main.addEventListener('scroll', RevealSection);
}