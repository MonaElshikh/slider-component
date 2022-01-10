
/* Slider class
    class constructor params
    - component       >     the slider desgin
    - slidesSources   >     slides imges array.
    - slidesContainer >     the container class name  that will add the slides to.
    - navContainer    >     the container class name  that will add nav bullets to.
    - currentIndex    >     the index that from which slider will start.
    - slidesCount     >     total number of slides.
*/
class Slider {
    constructor(component, slidesSources, slidesContainer, navContainer, currentIndex, slidesCount) {
        this.component = document.write(component);
        this.slidesSources = slidesSources;
        this.slidesContainer = document.querySelector(`.${slidesContainer}`);
        this.navContainer = document.querySelector(`.${navContainer}`);
        this.currentIndex = currentIndex;
        this.slidesCount = slidesCount;
    }
    /* Properties*/
    clearInterval;          // prop to clear interval for slideshow property
    isBullets = false;      // prop to set if nav style is bullets or numbers default:false
    isInfinit = false;      // prop to set the slides will infint loop or stop at the last index default:false.
    isSlideShow = false;    // prop to set if slideshow slides default:false;

    /*Functions*/
    //create the imgaes and nav lists 
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
            if (this.isBullets) { listItem.className = "slide-nav" } else { listItem.className = "slide-nav-nums"; listItem.innerHTML = i; }
            this.navContainer.append(listItem);
            i += 1;
        })
        //turn on slide show if  isSlideshow prop is true else turn it off.
        this.isSlideShow ? this.slideShow() : this.stopSlideShow();
    }
    //get the imgaes and bullets lists 
    get() {
        let sildesList = document.querySelectorAll(`.${this.slidesContainer.className} img`);
        let bulletsList = document.querySelectorAll(`.${this.navContainer.className} li`);
        return {
            sildesList, bulletsList
        }
    }
    load() {
        const { sildesList, bulletsList } = this.get();
        //clear Style & put onlcik to slide to stop slideshow if it is on.
        sildesList.forEach((slide) => { slide.classList.remove("active-slide"); slide.onclick = () => this.stopSlideShow() });
        bulletsList.forEach((item) => item.classList.remove("active-slide-nav"));
        //Set current slide style
        bulletsList[this.currentIndex - 1].classList.add("active-slide-nav");
        sildesList[this.currentIndex - 1].classList.add("active-slide");
    }
    check() {
        //clear style
        document.querySelector(".next-img").classList.remove("disable-next-img");
        document.querySelector(".prev-img").classList.remove("disable-prev-img");
        //check current index.
        if (!this.isInfinit) {
            if (this.currentIndex == this.slidesCount) document.querySelector(".next-img").classList.add("disable-next-img");
            else if (this.currentIndex == 1) document.querySelector(".prev-img").classList.add("disable-prev-img");
        }
    }
    next() {
        if (this.isInfinit) this.currentIndex == this.slidesCount ? this.currentIndex = 1 : this.currentIndex++;
        else {
            if (document.querySelector(".next-img").classList.contains("disable-next-img")) { return false; }
            else { this.currentIndex++; }
        }
        this.check();
        this.load();
    }
    prev() {
        if (this.isInfinit) { this.currentIndex == 1 ? this.currentIndex = this.slidesCount : this.currentIndex--; }
        else {
            if (document.querySelector(".prev-img").classList.contains("disable-prev-img")) { return false; }
            else { this.currentIndex--; }
        }
        this.check();
        this.load();
    }
    navigate() {
        const { bulletsList } = this.get();
        bulletsList.forEach((bullet) => {
            bullet.onclick = () => {
                this.currentIndex = parseInt(bullet.dataset.index);
                this.stopSlideShow();
                this.check();
                this.load();
            }
        })
    }
    slideShow() {
        this.isInfinit = true;
        this.clearInterval = setInterval(() => this.next(), 2000);
    }
    stopSlideShow() {
        if (this.clearInterval) {
            clearInterval(this.clearInterval);
            this.clearInterval = null;
        }
    }
}
//***************************************************************************************************************************/ 
let slidesSource = ['images/cat-01.jpg', 'images/cat-02.jpg', 'images/cat-03.jpg', 'images/cat-04.jpg', 'images/cat-05.jpg'];
let component = ` 
<div class="container" role="main">
    <div class="slider">
        <div class="prev">
            <img src="images/left-arrow.svg" alt="previous" class="prev-img" />
        </div>
        <div class="slides-list"></div>
        <div class="next">
            <img src="images/right-arrow.svg" alt="next" class="next-img" />
        </div>
        </div>
        <div class="slides-nav">
        <ul class="slides-nav-list"></ul>
    </div>
</div>`;
let slider = new Slider(component, slidesSource, "slides-list", "slides-nav-list", 1, slidesSource.length);
slider.isSlideShow = true;
slider.isInfinit = true;
let prevbtn = document.querySelector(".prev img");
let nextbtn = document.querySelector(".next img");
slider.create();
slider.check();
slider.load();
slider.navigate();
prevbtn.onclick = () => slider.prev();
nextbtn.onclick = () => slider.next();
document.addEventListener("click", (e) => { if (!slider.clearInterval && e.target.className == "container") { slider.slideShow(); } });