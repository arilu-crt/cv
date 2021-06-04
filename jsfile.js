const theApiKey = config.MY_API_KEY

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        document.querySelector("nav").classList.toggle("nav--bg", entries[0].intersectionRatio < 0.25);
    }, {
        threshold: 0.25
    });
    observer.observe(document.querySelector("#head"));
});

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#nav-list')
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

}
navSlide();

const changeColor = document.querySelectorAll('.changeColor');
const btnChangeColor = document.getElementById('btnChangeColor');
btnChangeColor.addEventListener('click', () => {
    for (let i = 0; i < changeColor.length; i++) {
        changeColor.item(i).classList.toggle('theChange')

    }


})

/* function changeHeadingBg(color){
    document.getElementById("heading").style.background = color;
} */


let sprak = [{
    lang: 'Fransk',
    level: 'morsmål'
},
{
    lang: 'Spansk',
    level: 'morsmål'
},
{
    lang: 'Engelsk',
    level: 'flytende'
},
{
    lang: 'Norsk',
    level: 'nivå B2'
}
]



ul = document.createElement('ul');

document.getElementById('sprak').append(ul);

sprak.forEach(function (sp) {
    let li = document.createElement('li');
    ul.appendChild(li);

    li.innerHTML += sp.lang + ': ' + sp.level;

});

document.querySelectorAll('.accordeon-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordeon = button.previousElementSibling;
        button.classList.toggle('accordeon-button-active');
        if (button.classList.contains('accordeon-button-active')) {
            accordeon.style.maxHeight = accordeon.scrollHeight + 'px'
        } else {
            accordeon.style.maxHeight = '52px'
        }
    })
})

const btnYesDare = document.getElementById('yesDare');
const btnNoDare = document.getElementById('noDare');
const pDareYes = document.getElementById('pDareYes');
const pDareNo = document.getElementById('pDareNo');

btnYesDare.addEventListener('click', () => {
    console.log('yes')
    pDareYes.classList.toggle('showP')
    pDareNo.classList.remove('showP')

})

btnNoDare.addEventListener('click', () => {
    console.log('no')
    pDareNo.classList.toggle('showP')
    pDareYes.classList.remove('showP')

})




let weather = {
    apiKey: theApiKey,
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        ).then(response => response.json())
            .then(data => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, speed);
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = "Vind: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
    document.querySelector(".search-bar").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            weather.search();
        }
    })
    weather.fetchWeather("Oslo")
})

