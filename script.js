//Hämtar datan från API
async function getData(url) {
  let response = await fetch(url);
  let responseBody = await response.json();
  if (responseBody.results == undefined) {
    return responseBody;
  } else return responseBody.results;
}
//Render manipulerar den vänstra listan med karaktärer
async function render(callback, evt) {
  let list = await callback(fetchUrl);
  //Denna IF körs ifall listan redan är full och raderar alla element
  if (ul.childElementCount > 0) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
  //Denna skriver ut listan med karaktärer
  for (i = 0; i < list.length; i++) {
    let listItem = document.createElement("li");
    let person = list[i];
    let namn = person.name;
    listItem.classList.add("char-list-item");
    listItem.classList.add(i);
    listItem.innerHTML = namn;
    ul.appendChild(listItem);
    console.log(ul);
  }
}
//Här hämtas data till details-boxen
async function getInfo(evt) {
  let list = await getData(fetchUrl);
  let clickedItemClass = evt.target.classList[1];

  for (i = 0; i < list.length; i++) {
    if (clickedItemClass == i) {
      let person = list[i];
      let name = person.name;
      let height = person.height;
      let mass = person.mass;
      let hairColor = person.hair_color;
      let skinColor = person.skin_color;
      let eyeColor = person.eye_color;
      let birth = person.birth_year;
      let gender = person.gender;

      let h3 = document.querySelector(".person h3");
      h3.innerHTML = name;
      let personParagraf = document.querySelector(".person p");

      personParagraf.innerHTML =
        "Height: " +
        height +
        "cm" +
        "<br>Mass: " +
        mass +
        "kg" +
        "<br>Hair Color: " +
        hairColor +
        "<br>Skin Color: " +
        skinColor +
        "<br>Eye Color: " +
        eyeColor +
        "<br>Birth: " +
        birth +
        "<br>Gender: " +
        gender;

      //planet
      let planet = person.homeworld;

      let planetInfo = await getData(planet);

      let planetH3 = document.querySelector(".planet h3");
      let planetP = document.querySelector(".planet p");
      let planetName = planetInfo.name;
      let rotation = "Rotation period: " + planetInfo.rotation_period + " h";
      let orbit = "Orbital period: " + planetInfo.orbital_period + " days";
      let diameter = "Diameter: " + planetInfo.diameter + " km";
      let climate = "Climate: " + planetInfo.climate;
      let gravity = "Gravity: " + planetInfo.gravity;
      let terrain = "Terrain: " + planetInfo.terrain;

      planetH3.innerHTML = planetName;
      planetP.innerHTML =
        rotation +
        "<br>" +
        orbit +
        "<br>" +
        diameter +
        "<br>" +
        climate +
        "<br>" +
        gravity +
        "<br>" +
        terrain;
      console.log(planetInfo);
      break;
    }
  }
  changeColor(evt);
}
//Bläddra mellan sidor
async function switchPage(evt) {
  let currentPage = parseInt(evt.currentTarget.innerText[0]);
  let clickedItem = evt.target.classList[1];

  if (clickedItem == "previous" && currentPage > 1) {
    currentPage -= 1;
  } else if (clickedItem == "next" && currentPage < 8) {
    currentPage += 1;
  }
  fetchUrl = "https://swapi.dev/api/people/?page=" + currentPage;
  pageNumber.innerHTML = currentPage;
  render(getData);
}
//Uppdaterar aktivt li-element
function changeColor(event) {
  let active;
  let allListItems = document.querySelectorAll(".char-list-item");
  for (i = 0; i < allListItems.length; i++) {
    if (allListItems[i].classList[2] == "activeLi") {
      active = document.querySelector(
        "body > div > section > div > section.content-box.characters > section > ul > li.char-list-item.\\3" +
          i
      );
      let update = active.innerHTML.replace("       ➤", "");
      active.innerHTML = update;
      active.classList.remove("activeLi");
      break;
    }
  }
  event.target.classList.add("activeLi");
  event.target.innerHTML += "       ➤";
}

let pageNumber = document.getElementById("page-no");
let ul = document.querySelector("ul.char-list");
let pageArrows = document.querySelector("div.side-count");
let personDetails = document.querySelector("section.person");
let fetchUrl = "https://swapi.dev/api/people/?page=1";
render(getData);
ul.addEventListener("click", getInfo);
pageArrows.addEventListener("click", switchPage);
