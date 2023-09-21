import playList from './playlist.js';

const time = document.querySelector (".time");
const dateString = document.querySelector (".date");
const greetingText = document.querySelector (".greeting");
const userName = document.querySelector (".name");
const prevSlideBtn = document.querySelector (".slide-prev");
const nextSlideBtn = document.querySelector (".slide-next");
const city = document.querySelector (".city");
const weatherIcon = document.querySelector (".weather-icon");
const temp = document.querySelector (".temperature");
const weatherDescription = document.querySelector (".weather-description");
const windSpeed = document.querySelector (".wind");
const humidity = document.querySelector (".humidity");
const weatherError = document.querySelector (".weather-error");
const quote = document.querySelector (".quote");
const changeQuote = document.querySelector (".change-quote");
const author = document.querySelector (".author");
const playBtn = document.querySelector (".play");
const nextSong = document.querySelector (".play-next");
const prevSong = document.querySelector (".play-prev");
const trackList = document.querySelector (".play-list");
const audio = new Audio ();
const body = document.body;
let audioIndex = 0;
let isPlay = false;
let randomInteger = getRandomInteger (1, 20);
let randomQuote = getRandomInteger (0, 14);
audio.src = playList[audioIndex].src;

function updateClock () {
    const date = new Date ();
    const hours = date.getHours () < 10 ? "0" + date.getHours () : date.getHours ();
    const minutes = date.getMinutes () < 10 ? "0" + date.getMinutes () : date.getMinutes ();
    const seconds = date.getSeconds () < 10 ? "0" + date.getSeconds () : date.getSeconds ();
    time.textContent = `${hours}:${minutes}:${seconds}`;
}

function showDate () {
    const date = new Date ();
    const options = {
        month: "long", day: "numeric", weekday: "long",
    };
    const currentDate = date.toLocaleDateString ("en-US", options);
    setTimeout (showDate, 1000);
    return currentDate;
}

function audioPlay () {
    if (isPlay === false) {
        audio.play ();
        isPlay = true;
        playBtn.classList.add ('pause');
    } else {
        console.error ("Ooops! Something went wrong with audio!");
    }
}

function audioPause () {
    if (isPlay === true) {
        audio.pause ();
        playBtn.classList.remove ('pause');
    } else {
        console.error ("Ooops! Something went wrong with audio!");
    }
}

function getTimeOfDay () {
    const date = new Date ();
    const hours = date.getHours ();
    if (hours > 3 && hours < 12) {
        return "morning";
    } else if (hours > 11 && hours < 18) {
        return "afternoon";
    } else if (hours > 17 && hours < 0) {
        return "evening";
    } else {
        return "night";
    }
}

function saveLocalStorage () {
    localStorage.setItem ("username", userName.value);
}

function getFromLS () {
    let username = localStorage.getItem ("username");
    if (username !== null && username !== undefined) {
        userName.value = username;
    }
}

function getRandomInteger (min, max) {
    return Math.floor (Math.random () * (max - min) + min);
}

function getQuote () {
    quote.innerText = "";
    const quotes = [{
        "text": "The best dreams happen when you are awake", "author": "Cherie Gilderbloom",
    }, {
        "text": "Accept who you are. Unless you are a serial killer", "author": "Ellen DeGeneres",
    }, {
        "text": "You can never be overdressed or overeducated", "author": "Oscar Wilde",
    }, {
        "text": "Success is not the key to happiness. Happiness is the key to success", "author": "Herman Cain",
    }, {
        "text": "We do not remember days, we remember moments", "author": "Cesare Pavese",
    }, {
        "text": "Never make fun of someone who speaks broken English. It means they know another language",
        "author": "H. Jackson Brown, Jr.",
    }, {
        "text": "Always forgive your enemies. Nothing annoys them more", "author": "Oscar Wilde",
    }, {
        "text": "Only two things are infinite — the universe and human stupidity, and I am not sure about the former",
        "author": "Albert Einstein",
    }, {
        "text": "Take the first step in faith. You don't have to see the whole staircase, just take the first step",
        "author": "Martin Luther King Jr",
    }, {
        "text": "The more you say, the less people remember", "author": "François Fénelon",
    }, {
        "text": "Success does not consist in never making mistakes but in never making the same one a second time",
        "author": "Bernard Show",
    }, {
        "text": "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change",
        "author": "Charles Darwin",
    }, {
        "text": "Love the life you live, and live the life you love", "author": "Bob Marley"
    }, {
        "text": "Never regret anything that made you smile", "author": "Mark Twain"
    }, {
        "text": "Music is the universal language of mankind", "author": "Henry Longfellow"
    },];
    let quota = quotes[randomQuote].text;
    let authorName = quotes[randomQuote].author;
    quote.innerText = quota;
    author.innerText = authorName;
}

function setImage () {
    let timeOfDay = getTimeOfDay ();
    let imageInteger = randomInteger < 10 ? "0" + randomInteger : randomInteger;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imageInteger}.jpg')`;
}

function nextSlide () {
    if (randomInteger > 19) {
        randomInteger = 0;
    }
    randomInteger++;
    setImage ();
}

function prevSlide () {
    if (randomInteger === 1) {
        randomInteger = 21;
    }
    randomInteger--;
    setImage ();
}

ymaps.ready (function () {
    let cityName = ymaps.geolocation.city;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6567cb27403fa051fdf1fab80e8b9252`;
    fetch (url)
        .then ((response) => response.json ())
        .then ((data) => {
            city.value = data.city.name;
            weatherError.innerText = "";
            weatherIcon.className = "weather-icon owf";
            weatherIcon.classList.add (`owf-${data.list[0].weather[0].id}`);
            temp.innerText = `${Math.round (data.list[0].main.temp)}°C`;
            weatherDescription.innerText = data.list[0].weather[0].description;
            windSpeed.innerText = `Wind speed: ${data.list[0].wind.speed.toFixed (1)} m/s`;
            humidity.innerText = `Humidity: ${data.list[0].main.humidity}%`;
        }).catch (() => {
        console.error ("Ooops! Something went wrong with weather!")
    });
});

city.addEventListener ("change", () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=6567cb27403fa051fdf1fab80e8b9252`;
    fetch (url)
        .then ((response) => response.json ())
        .then ((data) => {
            if (data.message === "city not found") {
                weatherError.innerText = "Error: Your city not found";
                temp.innerText = "";
                windSpeed.innerText = "";
                humidity.innerText = "";
                weatherDescription.innerText = "";
            }
            weatherError.innerText = "";
            weatherIcon.className = "weather-icon owf";
            weatherIcon.classList.add (`owf-${data.list[0].weather[0].id}`);
            temp.innerText = `${Math.round (data.list[0].main.temp)}°C`;
            weatherDescription.innerText = data.list[0].weather[0].description;
            windSpeed.innerText = `Wind speed: ${data.list[0].wind.speed.toFixed (1)} m/s`;
            humidity.innerText = `Humidity: ${data.list[0].main.humidity}%`;
        }).catch (() => {
        console.error ("Ooops! Something went wrong with weather!")
    });
});

window.addEventListener ("beforeunload", saveLocalStorage);
window.addEventListener ("load", getFromLS);
greetingText.innerText = `Good ${getTimeOfDay ()},`;
nextSlideBtn.addEventListener ("click", nextSlide);
prevSlideBtn.addEventListener ("click", prevSlide);
dateString.innerText = showDate ();
setInterval (setImage (), 1000);
setInterval (updateClock, 1000);
changeQuote.addEventListener ("click", () => {
    randomQuote++;
    if (randomQuote > 14) {
        randomQuote = 0;
    }
    getQuote ();
})
getQuote ();

playBtn.addEventListener ("click", () => {
    if (isPlay === true) {
        audioPause ();
        isPlay = false;
    } else {
        audioPlay ();
    }
    nextSong.addEventListener ("click", () => {
        audioIndex++;
        if (audioIndex <= 3) {
            audio.src = playList[audioIndex].src;
            isPlay = false;
            audioPlay ();
        } else {
            audioIndex = 0;
            audio.src = playList[audioIndex].src;
            isPlay = false;
            audioPlay ();
        }
    })
    prevSong.addEventListener ("click", () => {
        audioIndex--;
        if (audioIndex >= 0) {
            audio.src = playList[audioIndex].src;
            isPlay = false;
            audioPlay ();
        } else {
            audioIndex = 3;
            audio.src = playList[audioIndex].src;
            isPlay = false;
            audioPlay ();
        }
    })
})

playList.forEach (item => {
    const li = document.createElement ('li');
    li.classList.add ("play-item");
    li.textContent = item.title;
    trackList.append (li);
})

