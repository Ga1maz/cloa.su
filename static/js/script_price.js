fetch("/static/header.html")
    .then(respose => respose.text())
    .then(data => document.querySelector("header").innerHTML = data);

fetch("/static/footer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("footer").innerHTML = data;
        // Remove all SVG elements from the footer
        const svgElements = document.querySelectorAll("footer svg");
        svgElements.forEach(svg => svg.remove());
    });


const tabsPrice = document.getElementById('tabsPrice');
const listItem = tabsPrice.querySelectorAll('.tab-button');
const fivemTab = document.getElementById('fivemTab');
const minecraftTab = document.getElementById('minecraftTab');
const enterpriseTab = document.getElementById('enterpriseTab');
const fivemTabButton = document.getElementById('fivemTabButton');
const minecraftTabButton = document.getElementById('minecraftTabButton');
const enterpriseTabButton = document.getElementById('enterpriseTabButton');
fivemTabButton.addEventListener('click', () => {
    fivemTabButton.classList.add('active-tab');
    minecraftTabButton.classList.remove('active-tab');
    enterpriseTabButton.classList.remove('active-tab');
    fivemTab.style.display = 'grid';
    minecraftTab.style.display = 'none';
    enterpriseTab.style.display = 'none';
    fivemTabButton.classList.add('bg-black');
    fivemTabButton.classList.remove('bg-white/5');
    minecraftTabButton.classList.remove('bg-black');
    minecraftTabButton.classList.add('bg-white/5');
    enterpriseTabButton.classList.remove('bg-black');
    enterpriseTabButton.classList.add('bg-white/5');
});
minecraftTabButton.addEventListener('click', () => {
    fivemTabButton.classList.remove('active-tab');
    minecraftTabButton.classList.add('active-tab');
    enterpriseTabButton.classList.remove('active-tab');
    fivemTab.style.display = 'none';
    minecraftTab.style.display = 'grid';
    enterpriseTab.style.display = 'none';
    fivemTabButton.classList.remove('bg-black');
    fivemTabButton.classList.add('bg-white/5');
    minecraftTabButton.classList.remove('bg-white/5');
    minecraftTabButton.classList.add('bg-black');
    enterpriseTabButton.classList.remove('bg-black');
    enterpriseTabButton.classList.add('bg-white/5');
});
enterpriseTabButton.addEventListener('click', () => {
    fivemTabButton.classList.remove('active-tab');
    minecraftTabButton.classList.remove('active-tab');
    enterpriseTabButton.classList.add('active-tab');
    fivemTab.style.display = 'none';
    minecraftTab.style.display = 'none';
    enterpriseTab.style.display = 'grid';
    fivemTabButton.classList.remove('bg-black');
    fivemTabButton.classList.add('bg-white/5');
    minecraftTabButton.classList.remove('bg-black');
    minecraftTabButton.classList.add('bg-white/5');
    enterpriseTabButton.classList.add('bg-black');
    enterpriseTabButton.classList.remove('bg-white/5');
});