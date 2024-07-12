'use strict'

document.addEventListener('DOMContentLoaded', () => {

    // PRELOADER

    const mainPreloader = document.querySelector(".preloader");

    window.onload = () => {
        setTimeout(function () {
            mainPreloader.style.display = "none";
        }, 100);
    }

    // CUSTOM CURSOR

    {
        // cool stuff will be here (i promise)
    }
    
    // BLOB ANIMATION

    {
        const blob = document.getElementById("blob");
        const blobContainer = document.querySelector(".hero-section__logo-blob");
        const blobSection = document.querySelector(".hero-section");

        function MoveBlobByMouse(event) {
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
            }, 100); 
        }

        blobSection.addEventListener('mousemove', MoveBlobByMouse);
        blobSection.addEventListener('mouseleave', BlobReset);
        window.addEventListener('click', ClickOnEye);
    }

// SLIDER ANIMATION

    {
        const slides = document.querySelectorAll(".card");
        const timebars = document.querySelectorAll(".card__timebar");
        
        let slidesNumber = slides.length - 1;
        let index = 0;

        let interval = 5000;

        function TimeBarAnimation(timebar) {
            let animation = [
                {width: "0%"},
                {width: "95%"}          // 95% - the size of full timebar, including padding
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
            slides[index].style.transform = "translateX(" + (slidesNumber - index) * 115 +"%)";

            for (let i = 1; i <= slidesNumber; i++) {
                if ((index + i) > slidesNumber) {
                    for (let j = 0; j <= (slidesNumber - 1); j++) {
                        slides[j].style.zIndex = "1";
                        slides[j].style.transform = "translateX(" + (slidesNumber - index) * 115 +"%)";
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
        const section = document.querySelector(".cases-section__container");
        const caseWindow = document.querySelector(".case-window");
        const tips = document.querySelector(".cases-section__content-block");

        let prevPos = section.scrollTop;

        function HideTips(event) {

            event.preventDefault();

            let currentPos = section.scrollTop;

            if (currentPos > prevPos) {
                tips.classList.add("is-hidden");
                caseWindow.classList.add("is-shown");
            }
            else {
                tips.classList.remove("is-hidden");
                caseWindow.classList.remove("is-shown");
            }
            prevPos = currentPos;
        }

        section.addEventListener('scroll', HideTips);
    }

    // CASE SECTION PORTFOLIO BLOCK

    {
        const next = document.getElementById('next');
        const prev = document.getElementById('prev');
        const images = document.querySelectorAll(".case-window__img");
        const linkText = document.querySelector(".case-window__case-name");

        let currentImage = 0;

        images[currentImage].style.display = "block";
        linkText.innerHTML = images[currentImage].alt;

        function OpenNext() {
            images[currentImage].style.display = "none";

            if (currentImage === images.length - 1) {
                currentImage = 0;
            }
            else {
                currentImage++;
            }

            images[currentImage].style.display = "block";
            linkText.innerHTML = images[currentImage].alt;
        }

        function OpenPrev() {
            images[currentImage].style.display = "none";

            if (currentImage === 0) {
                currentImage = images.length - 1;
            }
            else {
                currentImage--;
            }

            images[currentImage].style.display = "block";
            linkText.innerHTML = images[currentImage].alt;
        }

        next.addEventListener('click', OpenNext);
        prev.addEventListener('click', OpenPrev);
    }

    // SKILLS ANIMATION. SHOW UTILITY PERCENTAGE

    {
        const container = document.querySelector(".skills__content");
        let animationTime = 500;
        let isAnimPlayed = false;

        function AnimateSkills(startPoint, endPoint) {
            let skillsAnimation = [
                { width: startPoint
                },
                { width: endPoint,
                }
            ];
            let skillsAnimationSettings = {
                duration: animationTime,
                iterations: 1,
                easing: "ease-out",
                fill: "forwards"
            }
            return [skillsAnimation, skillsAnimationSettings];
        }

        function ShowScorebar(bar) {
            let percentage = bar.querySelector(".skills__percentage").textContent;
            let [anim, set] = AnimateSkills("0%", percentage);

            bar.animate(anim, set);
            bar.classList.add("is-active");

            return true;
        }

        function HideScorebar(bar) {
            let percentage = bar.querySelector(".skills__percentage").textContent;
            let [anim, set] = AnimateSkills(percentage, "0%");

            bar.animate(anim, set);
            bar.classList.remove("is-active");

            return false;
        }

        function FindParent(child) {
            if (child.parentNode.className === "skills__skill-box") {
                return child.parentNode.querySelector(".skills__utility");
            }
            else {
                return FindParent(child.parentNode);
            }
        }

        container.addEventListener('mousemove', (event) => {
            let skill = event.target;

            if (skill.className === "skills__skill-box") {

                skill = skill.querySelector(".skills__utility");

                if (isAnimPlayed != true) {
                    isAnimPlayed = ShowScorebar(skill);
                }
            }
            else if (skill.className != "skills__content") {

                skill = FindParent(skill);

                    if (isAnimPlayed != true) {
                        isAnimPlayed = ShowScorebar(skill);
                    }
            }
        });

        container.addEventListener('mouseout', (event) => {

            let skill = event.target;

            if (skill.className === "skills__skill-box") {
                isAnimPlayed = HideScorebar(skill.querySelector(".skills__utility"));
            }
            else if (skill.className != "skills__content") {
                skill = FindParent(skill);
                isAnimPlayed = HideScorebar(skill);
            }
        });
    }

    // SCROLL ANIMATION PROVIDED BY ME

    {
        const main = document.getElementById("main");             // get the scrolled main container
        const sections = document.querySelectorAll(".section");   // get all sections within the container
        let safezone = 10;

        sections[0].classList.add("visible");                   // the first section is always visible

        function RevealSection() {
            sections.forEach(section => {

                let sectionTop = section.offsetTop;             // top border of the section
                let sectionBottom = section.offsetTop + section.scrollHeight;   // bottom border of the section
                let mainScroll = main.scrollTop + main.offsetTop;               // Scroll border (including the top margin of the main container)
                
                if ((mainScroll + safezone >= sectionTop)                // if the top border is under the scroll border
                    && (mainScroll + safezone <= sectionBottom)) {         // while the bottom border is over it
                    
                    function ChangeClass() {
                        console.log("class changed");
                        section.classList.add("visible")
                    }

                    ChangeClass();      // then show the block
                }
                else {
                    section.classList.remove("visible");        // if it's not, then hide it
                }
            });
        }

        main.addEventListener('scroll', RevealSection);
    }

});