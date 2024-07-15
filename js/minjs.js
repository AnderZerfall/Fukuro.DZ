'use strict'
document.addEventListener('DOMContentLoaded',()=>{const mainPreloader=document.querySelector('.preloader');window.onload=()=>{setTimeout(function(){mainPreloader.style.display='none'},100)}
{}
{const blob=document.getElementById('blob');const blobContainer=document.querySelector('.hero-section__logo-blob');const blobSection=document.querySelector('.hero-section');function MoveBlobByMouse(event){let[cursorX,cursorY]=FindCursorPosition(event);blob.style.transition='all 100ms ease';blob.style.transform='translate('+cursorX+'%,'+cursorY+'%)'}
function BlobReset(){blob.style.transition='all 500ms ease';blob.style.transform='translate(0)'}
function FindCursorPosition(event){let containerSize=blobContainer.getBoundingClientRect();let cursorX=(event.clientX-blob.offsetWidth)/containerSize.left*100-60;let cursorY=(event.clientY-blob.offsetHeight)/containerSize.top*100-100;return[cursorX,cursorY]}
function ClickOnEye(event){let[cursorX,cursorY]=FindCursorPosition(event);blob.style.transform='translate('+cursorX+'%,'+cursorY+'%)'+' scaleY(0.2)';setTimeout(function(){blob.style.transform='translate('+cursorX+'%,'+cursorY+'%)'+' scaleY(1)'},100)}
blobSection.addEventListener('mousemove',MoveBlobByMouse);blobSection.addEventListener('mouseleave',BlobReset);window.addEventListener('click',ClickOnEye)}
{const slides=document.querySelectorAll('.card');const timebars=document.querySelectorAll('.card__timebar');let slidesNumber=slides.length-1;let index=0;let interval=7500;function TimeBarAnimation(timebar){let animation=[{width:'0%'},{width:'95%'}];let animationSettings={duration:interval,itarations:1}
timebar.animate(animation,animationSettings)}
function ChangeSlides(){if(index>slidesNumber){index=0}
if((index+1)>timebars.length-1){TimeBarAnimation(timebars[0])}else{TimeBarAnimation(timebars[index+1])}
slides[index].style.zIndex='-3';slides[index].style.transform='translateX('+(slidesNumber-index)*110+'%)';for(let i=1;i<=slidesNumber;i++){if((index+i)>slidesNumber){for(let j=0;j<=(slidesNumber-1);j++){slides[j].style.zIndex='1';slides[j].style.transform='translateX('+(slidesNumber-index)*110+'%)'}}else{slides[index+i].style.zIndex='1';slides[index+i].style.transform='translateX(-'+(index+1)*100+'%)'}}
index++;return index}
TimeBarAnimation(timebars[0]);setInterval(ChangeSlides,interval)}
{const section=document.querySelector('.cases-section__container');let prevPos=section.scrollTop;function HideTips(event){event.preventDefault();const caseWindow=document.querySelector('.case-window');const tips=document.querySelector('.cases-section__content-block');let currentPos=section.scrollTop;if(currentPos>prevPos){tips.classList.add('is-hidden');caseWindow.classList.add('is-shown')}else{tips.classList.remove('is-hidden');caseWindow.classList.remove('is-shown')}
prevPos=currentPos}
section.addEventListener('scroll',HideTips)}
{const next=document.getElementById('next');const nextMobile=document.getElementById('next-2');const prev=document.getElementById('prev');const images=document.querySelectorAll('.case-window__img');const linkText=document.querySelector('.case-window__case-name');let currentImage=0;function OpenNext(img,text){img[currentImage].style.display='none';if(currentImage===img.length-1){currentImage=0}else{currentImage++}
img[currentImage].style.display='block';text.innerHTML=img[currentImage].alt}
function OpenPrev(img,text){img[currentImage].style.display='none';if(currentImage===0){currentImage=img.length-1}else{currentImage--}
img[currentImage].style.display='block';text.innerHTML=img[currentImage].alt}
images[currentImage].style.display='block';linkText.innerHTML=images[currentImage].alt;next.addEventListener('click',OpenNext.bind(null,images,linkText));nextMobile.addEventListener('click',OpenNext.bind(null,images,linkText));prev.addEventListener('click',OpenPrev.bind(null,images,linkText))}
{const container=document.querySelector('.case-window__content');const tips=document.querySelector('.case-window__tip');function ShowTip(tip){tip.classList.add('tip-is-shown')}
function HideTip(tip){tip.classList.remove('tip-is-shown')}
function MoveTip(event){let cursorX=event.pageX/window.innerWidth*100;let cursorY=event.pageY/window.innerHeight*100;tips.style.left=cursorX+'%';tips.style.top=cursorY+'%'}
container.addEventListener('mouseover',ShowTip.bind(null,tips));container.addEventListener('mouseleave',HideTip.bind(null,tips));container.addEventListener('mousemove',MoveTip)}
{const container=document.querySelector('.skills__content');let animationTime=500;let isAnimPlayed=!1;function AnimateSkills(startPoint,endPoint){let skillsAnimation=[{width:startPoint},{width:endPoint,}];let skillsAnimationSettings={duration:animationTime,iterations:1,easing:'ease-out',fill:'forwards'}
return[skillsAnimation,skillsAnimationSettings]}
function ShowScorebar(bar){let percentage=bar.querySelector('.skills__percentage').textContent;let[anim,set]=AnimateSkills('0%',percentage);bar.animate(anim,set);bar.classList.add('is-active');return!0}
function HideScorebar(bar){let percentage=bar.querySelector('.skills__percentage').textContent;let[anim,set]=AnimateSkills(percentage,'0%');bar.animate(anim,set);bar.classList.remove('is-active');return!1}
function FindParent(child){if(child.parentNode.className.includes('skills__skill-box')===!0){return child.parentNode.querySelector('.skills__utility')}else{return FindParent(child.parentNode)}}
container.addEventListener('mousemove',(event)=>{let skill=event.target;if(skill.className.includes('skills__skill-box')===!0){skill=skill.querySelector('.skills__utility');if(isAnimPlayed!=!0){isAnimPlayed=ShowScorebar(skill)}}else if(skill.className.includes('skills__content')===!1){skill=FindParent(skill);if(isAnimPlayed!=!0){isAnimPlayed=ShowScorebar(skill)}}});container.addEventListener('mouseout',(event)=>{let skill=event.target;if(skill.className.includes('skills__skill-box')===!0){isAnimPlayed=HideScorebar(skill.querySelector('.skills__utility'))}else if(skill.className.includes('skills__content')===!1){skill=FindParent(skill);isAnimPlayed=HideScorebar(skill)}})}
{const main=document.getElementById('main');const sections=document.querySelectorAll('.section');let safezone=10;sections[0].classList.add('visible');function RevealSection(){sections.forEach(section=>{let sectionTop=section.offsetTop;let sectionBottom=section.offsetTop+section.scrollHeight;let mainScroll=main.scrollTop+main.offsetTop;if((mainScroll+safezone>=sectionTop)&&(mainScroll+safezone<=sectionBottom)){function ChangeClass(){section.classList.add('visible')}
ChangeClass()}else{section.classList.remove('visible')}})}
main.addEventListener('scroll',RevealSection)}
{const burger=document.querySelector('.header__burger');const links=document.querySelectorAll('.nav__link');burger.addEventListener('click',()=>{let menu=document.querySelector('.nav');let bg=document.querySelector('.header__bg-on-mobile');if(menu.className.includes('is-active')===!0){menu.classList.remove('is-active');bg.classList.remove('is-active');burger.classList.remove('is-pressed')}else{menu.classList.add('is-active');bg.classList.add('is-active');burger.classList.add('is-pressed');links.forEach(link=>{link.addEventListener('click',()=>{menu.classList.remove('is-active');bg.classList.remove('is-active');burger.classList.remove('is-pressed')})})}})}
{}})