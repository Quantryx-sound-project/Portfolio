// Hamburger menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

menu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        menu.classList.remove('open');
        hamburger.classList.remove('open');
    }
});

document.querySelectorAll('a[data-scroll]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const scrollTarget = parseInt(this.getAttribute('data-scroll'));
        window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
        });
        menu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.add('sticky');
});

// Smooth scroll function
function scrollToPosition(targetPosition) {
    const start = window.scrollY;
    const distance = targetPosition - start;
    const duration = 500;
    let startTime;

    function animation(currentTime) {
        startTime ??= currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const ease = progress < 0.5
            ? 4 * progress ** 3
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Rotating images
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    document.querySelector('.midground').style.transform = `translate(-50%, -50%) rotate(${scrollPosition * -0.4}deg)`;
    document.querySelector('.foreground').style.transform = `translate(-50%, -50%) rotate(${scrollPosition * 0.6}deg)`;

    if (scrollPosition > 250) {
        document.querySelector('.midground').classList.add('hidden');
        document.querySelector('.foreground').classList.add('hidden');
    } else {
        document.querySelector('.midground').classList.remove('hidden');
        document.querySelector('.foreground').classList.remove('hidden');
    }
});

// Sidebar animations
const sidebars = [
    { selector: '.sidebar', showAbove: 250, hideAbove: 1800 },
    { selector: '.sidebar-2', showAbove: 450, hideAbove: 1600 },
    { selector: '.sidebar-3', showAbove: 650, hideAbove: 1400 },
    { selector: '.sidebar-left-1', showAbove: 350, hideAbove: 1700 },
    { selector: '.sidebar-left-2', showAbove: 550, hideAbove: 1500 }
];

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    sidebars.forEach(({ selector, showAbove, hideAbove }) => {
        const sidebar = document.querySelector(selector);

        if (scrollPosition > showAbove) {
            sidebar.classList.add('visible');
        } else {
            sidebar.classList.remove('visible');
        }

        if (scrollPosition > hideAbove) {
            sidebar.classList.remove('visible');
        }
    });
});

// Icon animations
const icons = document.querySelectorAll('.icon');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    icons.forEach(icon => {
        const triggerPoint = icon.getAttribute('data-trigger');
        if (scrollPosition > triggerPoint) {
            icon.classList.add('animate');
        } else {
            icon.classList.remove('animate');
        }
    });
});

// Modal
function openModal(imageSrc, title, link) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalLink = document.getElementById('modalLink');
    const modalOverlay = document.getElementById('modalOverlay');

    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalLink.href = link;

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');

    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

document.querySelectorAll('.banner .slider .item img').forEach((image) => {
    image.addEventListener('click', (e) => {
        const imageSrc = e.target.src;
        const title = e.target.getAttribute('data-title');
        const link = e.target.getAttribute('data-link');

        openModal(imageSrc, title, link);
    });
});

document.getElementById('modalOverlay').addEventListener('click', closeModal);

// Random video generator
const videos = [
    "videa/abstract cube0001-0250 copy.mp4",
    "videa/abstract cube20001-0250 copy.mp4",
    "videa/abstract cube30001-0250 copy.mp4",
    "videa/video4.mp4",
    "videa/video5.mp4",
    "videa/video6.mp4",
    "videa/video7.mp4",
    "videa/video8.mp4",
    "videa/video9.mp4",
    "videa/video10.mp4",
    "videa/video11.mp4"
];

const textpole = [
    "Do not click this again",
    "This button definitely don't generate random animations",
    "You can click on artworks in upper section and listen to them on spotify",
    "It might generate the same thing multiple times... yea it's random",
    "Did you kow it's random?",
    "Okay stop",
    "Go back to watching reels",
    "Yea anyway, it's random",
    "Okay",
    "Did i mention that it's random?",
    "Yes it's random",
    "Okay",
    "The end!",
    "I'm too lazy to writte here more",
];

const videoPlayer = document.getElementById("videoPlayer");
const changeVideoBtn = document.getElementById("changeVideoBtn");
const buttonText = document.querySelector(".button-text");

let currentIndex = 0;
let playedIndexes=[];
changeVideoBtn.addEventListener("click", () => {
    changeVideoBtn.classList.add("rotated");

    setTimeout(() => {
        changeVideoBtn.classList.remove("rotated");
    }, 500);

    if (playedIndexes.length === videos.length) {
        playedIndexes = [];//porovnavame ci sa uz taketo cislo vygenerovalo
    }
    let randomIndex;
    do{//generuj nahodne cislo kym nevygenerujes take ktore este nebolo pouzite
        randomIndex = Math.floor(Math.random() * videos.length);
    } while (playedIndexes.includes(randomIndex));

    //playedIndexes = [...playedIndexes, randomIndex];
    playedIndexes.push(randomIndex);//pripise sa hodnota indexu
    //co bol vygenerovany do zoznamu

    const newVideoSrc = videos[randomIndex];
    videoPlayer.src = newVideoSrc;
    videoPlayer.play();

    const newText = textpole[currentIndex];
    buttonText.textContent = newText;
    currentIndex++;
});



