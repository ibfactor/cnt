const images = ["bg.webp", "bg_2.gif", "bg_3.gif"];
const creds = ["https://www.tumblr.com/naucie/726979360707543040", "https://www.pinterest.com/pin/634233560009353472/", "https://www.pinterest.com/pin/pixel-art-landscape-with-water-plants-and-fish--15621929951309055/"];
const chosen = Math.floor(Math.random() * images.length);
document.body.style.backgroundImage = `url(${images[chosen]})`;
document.getElementById("so").href = creds[chosen];
document.getElementById("so").innerText = creds[chosen].split(".com")[0].split(".").pop();

var timeString = new Date().toLocaleTimeString(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
});
var dateString = new Date().toLocaleDateString("ur-PK-u-nu-arabext", {
  day: "numeric",
  month: "long",
  weekday: "long"
});

document.getElementById("time").innerText = timeString;
document.getElementById("date").innerText = dateString;

setInterval(() => {
	var timeString = new Date().toLocaleTimeString(undefined, {
	  hour: 'numeric',
	  minute: 'numeric',
	  hour12: true
	});

	var dateString = new Date().toLocaleDateString("ur-PK-u-nu-arabext", {
	  day: "numeric",
	  month: "long",
	  weekday: "long"
	});

	document.getElementById("time").innerText = timeString;
	document.getElementById("date").innerText = dateString;

}, 1000);

function saveSettings(x) {
	x.parentElement.style.display = "none";
	localStorage.setItem("se", x.previousElementSibling.value);
	document.querySelector("form").setAttribute("action", localStorage.getItem("se"));
}

function saveBM(x) {
	if (document.querySelector(`a[href="${x.previousElementSibling.value}"]`)) {
		document.querySelector(`a[href="${x.previousElementSibling.value}"]`).remove();
	}
	else {
		document.querySelector(`a[href="${x.previousElementSibling.value}"]`)
		document.querySelector(`section`).innerHTML = document.querySelector(`section`).innerHTML.split(`<a href="#"`)[0];
		document.querySelector(`section`).innerHTML += `<a href="${x.previousElementSibling.value}">${x.previousElementSibling.value.replaceAll('https://', '').split(".")[0]}</a>`;
		document.querySelector(`section`).innerHTML += ` <a href="#" style="border:0;" onclick="document.getElementById('modal_2').classList.toggle('active');">+</a>`;

	}
	localStorage.setItem("bm", document.querySelector("section").innerHTML.split(`<a href="#"`)[0]);
	document.querySelector(`section`).innerHTML = localStorage.getItem("bm").replaceAll("</a><a", "</a> <a") + ` <a href="#" style="border:0;" onclick="document.getElementById('modal_2').classList.toggle('active');">+</a>`;
}

if (localStorage.getItem("se")) {
	document.querySelector("form").setAttribute("action", localStorage.getItem("se"));
	document.querySelector("#se").value = localStorage.getItem("se");
}

if (!localStorage.getItem("bm")) {
	localStorage.setItem("bm", `<a href="https://gmail.com">gmail</a><a href="https://instagram.com">instagram</a><a href="https://reddit.com">reddit</a>`);
}
document.querySelector(`section`).innerHTML = localStorage.getItem("bm").replaceAll("</a><a", "</a> <a") + ` <a href="#" style="border:0;" onclick="document.getElementById('modal_2').classList.toggle('active');">+</a>`;


async function fetchFeed() {
	const f1 = await fetch("https://www.dawn.com/feeds/home");
	const f2 = await f1.text();

	window.doc = new DOMParser().parseFromString(f2, "text/xml");

	window.doc.querySelectorAll("item").forEach((i) => {
		document.getElementById("feed").innerHTML += `<a target="_blank" href="${i.querySelector("link").innerHTML}">${i.querySelector("title").innerHTML}</a>`;
	});
}

fetchFeed();

async function runWeather(lat, long) {
	const f1 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&current=temperature_2m,relative_humidity_2m,precipitation&forecast_days=1");
	const f2 = await f1.json();
	document.querySelector("main").innerHTML = 
		`
			${f2.current.temperature_2m}${f2.current_units.temperature_2m},
			${f2.current.relative_humidity_2m}${f2.current_units.relative_humidity_2m}
		`
	;
}


navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    runWeather(latitude, longitude);
  },
  error => console.error(error)
);
