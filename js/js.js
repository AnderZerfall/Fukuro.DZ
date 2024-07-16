'use strict'

document.addEventListener('DOMContentLoaded', () => {

    // PRELOADER

    const mainPreloader = document.querySelector('.preloader');

    window.onload = () => {
        setTimeout(function () {
            mainPreloader.style.display = 'none';
        }, 100);
    }

    
    // CUSTOM CURSOR

    {
        // cool stuff will be here (i promise)
        const cursor = document.getElementById('cursor');
        const buttons = document.querySelectorAll('.button');

        function MoveCursor(event) {
            cursor.style.visibility = 'visible';
            cursor.style.left = event.clientX - cursor.offsetWidth / 2 + 'px';
            cursor.style.top = event.clientY - cursor.offsetHeight / 2 + 'px';
        }
        function HootHoot(event) {
            MoveCursor(event);
            let hoot = document.createElement('p');
            hoot.classList.add('hoot');
            hoot.innerText = 'Hoot!';
            cursor.appendChild(hoot);
            setTimeout(function() {
                hoot.remove();
            }, 700);
        }

        window.addEventListener('mousemove', MoveCursor);
        window.addEventListener('click', HootHoot);
        
    }
    
    // BLOB ANIMATION

    {
        const blob = document.getElementById('blob');
        const blobContainer = document.querySelector('.hero-section__logo-blob');
        const blobSection = document.querySelector('.hero-section');

        function MoveBlobByMouse(event) {
            let [cursorX, cursorY] = FindCursorPosition(event);
            blob.style.transition = 'all 100ms ease';
            blob.style.transform = 'translate(' + cursorX + '%,' + cursorY + '%)';
        }

        function BlobReset() {
            blob.style.transition = 'all 500ms ease';
            blob.style.transform = 'translate(0)';
        }

        function FindCursorPosition(event) {
            let containerSize = blobContainer.getBoundingClientRect();
            let cursorX = (event.clientX - blob.offsetWidth) / containerSize.left * 100 - 60;
            let cursorY = (event.clientY - blob.offsetHeight) / containerSize.top * 100 - 100;

            return [cursorX, cursorY];
        }

        function ClickOnEye(event) {
            let [cursorX, cursorY] = FindCursorPosition(event);
            blob.style.transform = 'translate('+ cursorX +'%,' + cursorY + '%)' + ' scaleY(0.2)';
            setTimeout(function() {
                blob.style.transform = 'translate('+ cursorX +'%,' + cursorY + '%)' + ' scaleY(1)';
            }, 100); 
        }

        blobSection.addEventListener('mousemove', MoveBlobByMouse);
        blobSection.addEventListener('mouseleave', BlobReset);
        window.addEventListener('click', ClickOnEye);
    }

// SLIDER ANIMATION

    {
        const slides = document.querySelectorAll('.card');
        const timebars = document.querySelectorAll('.card__timebar');
        
        let slidesNumber = slides.length - 1;
        let index = 0;

        let interval = 7500;

        function TimeBarAnimation(timebar) {
            let animation = [
                {width: '0%'},
                {width: '95%'}          // 95% - the size of full timebar, including padding
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
        
            slides[index].style.zIndex = '-3';
            slides[index].style.transform = 'translateX(' + (slidesNumber - index) * 110 +'%)';

            for (let i = 1; i <= slidesNumber; i++) {
                if ((index + i) > slidesNumber) {
                    for (let j = 0; j <= (slidesNumber - 1); j++) {
                        slides[j].style.zIndex = '1';
                        slides[j].style.transform = 'translateX(' + (slidesNumber - index) * 110 + '%)';
                    }
                }   
                else {
                    slides[index + i].style.zIndex = '1';
                    slides[index + i].style.transform = 'translateX(-' + (index + 1) * 100 +'%)';
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
        const section = document.querySelector('.cases-section__container');
        let prevPos = section.scrollTop;

        function HideTips(event) {

            event.preventDefault();

            const caseWindow = document.querySelector('.case-window');
            const tips = document.querySelector('.cases-section__content-block');    

            let currentPos = section.scrollTop;

            if (currentPos > prevPos) {
                tips.classList.add('is-hidden');
                caseWindow.classList.add('is-shown');
            }
            else {
                tips.classList.remove('is-hidden');
                caseWindow.classList.remove('is-shown');
            }
            prevPos = currentPos;
        }

        section.addEventListener('scroll', HideTips);
    }

    // CASE SECTION PORTFOLIO BLOCK

    {
        const next = document.getElementById('next');
        const nextMobile = document.getElementById('next-2');
        const prev = document.getElementById('prev');
        const images = document.querySelectorAll('.case-window__img');
        const linkText = document.querySelector('.case-window__case-name');

        let currentImage = 0;

        function OpenNext(img, text) {
            img[currentImage].style.display = 'none';

            if (currentImage === img.length - 1) {
                currentImage = 0;
            }
            else {
                currentImage++;
            }

            img[currentImage].style.display = 'block';
            text.innerHTML = img[currentImage].alt;
        }

        function OpenPrev(img, text) {
            img[currentImage].style.display = 'none';

            if (currentImage === 0) {
                currentImage = img.length - 1;
            }
            else {
                currentImage--;
            }

            img[currentImage].style.display = 'block';
            text.innerHTML = img[currentImage].alt;
        }
        
        images[currentImage].style.display = 'block';
        linkText.innerHTML = images[currentImage].alt;

        next.addEventListener('click', OpenNext.bind(null, images, linkText));
        nextMobile.addEventListener('click', OpenNext.bind(null, images, linkText));
        prev.addEventListener('click', OpenPrev.bind(null, images, linkText));
    }
    
    // TIPS

    {
        const container = document.querySelector('.case-window__content');
        const tips = document.querySelector('.case-window__tip');
        
        function ShowTip(tip) {
            tip.classList.add('tip-is-shown');
        }
        function HideTip(tip) {
            tip.classList.remove('tip-is-shown');
        }
        function MoveTip(event) {
            let cursorX = event.clientX - tips.offsetWidth;
            let cursorY = event.clientY - tips.offsetHeight - 100;
            tips.style.left = cursorX + 'px';
            tips.style.top = cursorY + 'px';
        }

        container.addEventListener('mouseover', ShowTip.bind(null, tips));
        container.addEventListener('mouseleave', HideTip.bind(null, tips));
        container.addEventListener('mousemove', MoveTip);
    }

    // SKILLS ANIMATION. SHOW UTILITY PERCENTAGE

    {
        const container = document.querySelector('.skills__content');
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
                easing: 'ease-out',
                fill: 'forwards'
            }
            return [skillsAnimation, skillsAnimationSettings];
        }

        function ShowScorebar(bar) {
            let percentage = bar.querySelector('.skills__percentage').textContent;
            let [anim, set] = AnimateSkills('0%', percentage);

            bar.animate(anim, set);
            bar.classList.add('is-active');

            return true;
        }

        function HideScorebar(bar) {
            let percentage = bar.querySelector('.skills__percentage').textContent;
            let [anim, set] = AnimateSkills(percentage, '0%');

            bar.animate(anim, set);
            bar.classList.remove('is-active');

            return false;
        }

        function FindParent(child) {
            if (child.parentNode.className.includes('skills__skill-box') === true) {
                return child.parentNode.querySelector('.skills__utility');
            }
            else {
                return FindParent(child.parentNode);
            }
        }

        container.addEventListener('mousemove', (event) => {
            let skill = event.target;

            if (skill.className.includes('skills__skill-box') === true) {

                skill = skill.querySelector('.skills__utility');

                if (isAnimPlayed != true) {
                    isAnimPlayed = ShowScorebar(skill);
                }
            }
            else if (skill.className.includes('skills__content') === false) {

                skill = FindParent(skill);

                    if (isAnimPlayed != true) {
                        isAnimPlayed = ShowScorebar(skill);
                    }
            }
        });

        container.addEventListener('mouseout', (event) => {

            let skill = event.target;

            if (skill.className.includes('skills__skill-box') === true) {
                isAnimPlayed = HideScorebar(skill.querySelector('.skills__utility'));
            }
            else if (skill.className.includes('skills__content') === false) {
                skill = FindParent(skill);
                isAnimPlayed = HideScorebar(skill);
            }
        });
    }

    // SCROLL ANIMATION PROVIDED BY ME

    {
        const main = document.getElementById('main');             // get the scrolled main container
        const sections = document.querySelectorAll('.section');   // get all sections within the container
        let safezone = 10;

        sections[0].classList.add('visible');                   // the first section is always visible

        function RevealSection() {
            sections.forEach(section => {

                let sectionTop = section.offsetTop;             // top border of the section
                let sectionBottom = section.offsetTop + section.scrollHeight;   // bottom border of the section
                let mainScroll = main.scrollTop + main.offsetTop;               // Scroll border (including the top margin of the main container)
                
                if ((mainScroll + safezone >= sectionTop)                // if the top border is under the scroll border
                    && (mainScroll + safezone <= sectionBottom)) {         // while the bottom border is over it
                    
                    function ChangeClass() {
                        section.classList.add('visible');
                    }

                    ChangeClass();      // then show the block
                }
                else {
                    section.classList.remove('visible');        // if it's not, then hide it
                }
            });
        }

        main.addEventListener('scroll', RevealSection);
    }

    // MOBILE HEADER

    {
        const burger = document.querySelector('.header__burger');
        const links = document.querySelectorAll('.nav__link');

        burger.addEventListener('click', () => {
           
            let menu = document.querySelector('.nav');
            let bg = document.querySelector('.header__bg-on-mobile');

            if (menu.className.includes('is-active') === true) {
                menu.classList.remove('is-active');
                bg.classList.remove('is-active');
                burger.classList.remove('is-pressed');
            }
            else {
                menu.classList.add('is-active');
                bg.classList.add('is-active');
                burger.classList.add('is-pressed');
                
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        menu.classList.remove('is-active');
                        bg.classList.remove('is-active');
                        burger.classList.remove('is-pressed');
                    });
                })
            }
        });
    }


    // SEND CONTACT FORM : TO DO

    {

        // Currently, that's not possible for GitHub to send form data directly
        // so I'll just leave the code here for that time I'll be moving to
        // personal hosting

        // : FIX ME, PLS
        
        // const contactForm = document.querySelector('.form');

        // async function SendForm(event, form) {
        //     event.preventDefault();

        //     if(ValidateForm(form) === true) {

        //         let formData = new formData(form);

        //         let response = await fetch('/telegramform/php/send-message-to-telegram.php', {
        //             method: 'POST',
        //             body: formData,
        //             processData: false,
        //             contentType: false
        //         });

        //         if (response.ok) {
        //             let result = await response.json();
        //             alert(result.message);
        //             formPreview.innerHTML = '';
        //             form.reset();
        //         }
        //         else {
        //             alert('Error');
        //         }
        //     }
        // }

        // function EmailCheck(email) {
        //     let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        //     return re.test(email.toLowerCase());
        // }

        // function ValidateForm(form) {
        //     let fields = form.querySelectorAll('._req');
        //     let hasPassed = true;

        //     fields.forEach(field => {
        //         if (field.value === '') {
        //             hasPassed = false;
        //         }
        //         else if (field.className.includes('email') === true) {
        //             hasPassed = EmailCheck(field.value);
        //         }
        //     });

        //     if (hasPassed === false) {
        //         alert('form is empty');
        //     }
        // }


        // Pageclip.form(contactForm, {
        //     onSubmit: ValidateForm(form),
        //     onResponse: function (error, response) { },
        //     successTemplate: '<span>Thank you!</span>'
        // })

        // contactForm.addEventListener('submit', ValidateForm.bind(contactForm));
    }
});