
// Slider class
class Slider {
    constructor(currentIndex, slidesCount, slidesSources, slidesContainer, navContainer) {
        this.currentIndex = currentIndex;
        this.slidesCount = slidesCount;
        this.slidesSources = slidesSources;
        this.slidesContainer = document.querySelector(`.${slidesContainer}`);
        this.navContainer = document.querySelector(`.${navContainer}`);
    }
    create() {
        let i = 1;
        this.slidesSources.forEach((src) => {
            let img = document.createElement("img");
            img.setAttribute("src", src);
            img.setAttribute("alt", `slide#${i}`);
            img.setAttribute("class", "slide");
            this.slidesContainer.append(img);
            let listItem = document.createElement("li");
            listItem.setAttribute("data-index", i);
            listItem.className = "slide-nav";
            this.navContainer.append(listItem);
            i += 1;
        })
        let sildesList = document.querySelectorAll(`.${this.slidesContainer.className} img`);
        let bulletsList = document.querySelectorAll(`.${this.navContainer.className} li`);
        return {
            sildesList, bulletsList
        }
    }
    next() {
        this.currentIndex == this.slidesCount ? this.currentIndex = 1 : this.currentIndex += 1;
    }
    prev() {
        this.currentIndex == 1 ? this.currentIndex = this.slidesCount : this.currentIndex -= 1;
    }
}
//*************************************************************************************************************/ 
//getting data
let slidesSource = ['images/cat-01.jpg', 'images/cat-02.jpg', 'images/cat-03.jpg', 'images/cat-04.jpg', 'images/cat-05.jpg'];
let prevbtn = document.querySelector(".prev img");
let nextbtn = document.querySelector(".next img");
let slider = new Slider(1, slidesSource.length, slidesSource, "slides-list", "slides-nav-list");
let lists = slider.create();
const { sildesList, bulletsList } = lists;
//*************************************************************************************************************/ 
//Functions
function clearStyle() {
    sildesList.forEach((slide) => slide.classList.remove("active-slide"));
    bulletsList.forEach((item) => item.classList.remove("active-slide-nav"));
}
function checker() {
    clearStyle();
    bulletsList[slider.currentIndex - 1].classList.add("active-slide-nav");
    sildesList[slider.currentIndex - 1].classList.add("active-slide");
}
function navigate() {
    bulletsList.forEach((bullet) => {
        bullet.onclick = function () {
            slider.currentIndex = parseInt(this.dataset.index);
            checker();
        }
    })
}
//*************************************************************************************************************/ 
//Calling
checker();
navigate();
prevbtn.onclick = function () {
    slider.prev();
    checker();
}
nextbtn.onclick = function () {
    slider.next();
    checker();
}
//*************************************************************************************************************/
