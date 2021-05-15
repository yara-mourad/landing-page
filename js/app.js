/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*
 Define Global Variables 
*/
//select all sections
    const sections = document.querySelectorAll('section');
//create document fragment
    const fragment = document.createDocumentFragment();
//select unordered list
    const parentList = document.getElementById('navbar__list');
//scroll to top 
    const button = document.getElementById('btn');
/*
 * End Global Variables
 * Start Helper Functions
*/

/*
 * End Helper Functions
 * Begin Main Functions
*/
// build the nav
    for (let section of sections) {
        //get data-nav value
        const sectionData = section.getAttribute('data-nav');
        //get id value
        const sectionId = section.getAttribute('id');
        //create list item
        const listItem = document.createElement('li');
        //create link
        const link = document.createElement('a');
        link.textContent = sectionData;
        link.href = `#${sectionId}`;
        link.className = "menu__link";
        //append anchor element as a child
        listItem.appendChild(link);
        //scroll to clicked section smoothly
        link.addEventListener ('click', function (event) {
            event.preventDefault();
            section.scrollIntoView({behavior:'smooth'});
        })
        fragment.appendChild(listItem);
    }

//append fragment to unordered list 
    parentList.appendChild(fragment);

//create menu icon for responsive design
    const respoMenu = document.createElement('li')
    respoMenu.innerHTML = `<a href="javascript:void(0);" class="icon" onclick="toggleResponsive()">
    <i class="fa fa-ellipsis-v"></i></i>
    </a>`
    parentList.appendChild(respoMenu)

//add responsive class for responsive nav menu
    function toggleResponsive () {
        const parentList = document.getElementById('navbar__list');
        if (parentList.className === "navbar__list") {
            parentList.className += " responsive";
        } else {
            parentList.className = "navbar__list";
        }
    }    

// //distinguish the active section while scrolling    
    function toggleActiveState () {
        for (let section of sections) {
            //to detect the section in viewport
            const getPosition = section.getBoundingClientRect();
            //when intersection is between 0 and 300
            if (getPosition.top > 0 && getPosition.top < 300) {
                const sectionNav = section.getAttribute('data-nav');
            //add the active class for the intersection Then remove it from other sections  
                sections.forEach(function (section){
                    section.classList.remove('your-active-class')
                })
                section.classList.add('your-active-class')
            //loop over all links 
                const allLinks = document.querySelectorAll('a');
                for (let aLink of allLinks) {
            //check equality of link's text and data nav value
                    if (aLink.innerText === sectionNav) {
            //add the active class to the active link and remove it from others
                        allLinks.forEach(function(remoLink){
                            remoLink.classList.remove('active__link')
                        })
                        aLink.classList.add('active__link')
                    }
                }
            }    
        }
    }

//show the button after scroll to 50
    function showBtn () {
        if (document.documentElement.scrollTop > 50) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }

//when button is click 
    function scrollToTop () {
        window.scrollTo(0, 0)
    }
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add class 'active' to section when near top of viewport
    window.addEventListener('scroll', toggleActiveState); 

//when page is scrolled
    window.onscroll = function () {showBtn()};



