const typeColor = {
  bug: "#83C300",
  dragon: "#006FC9",
  electric: "#FBD100",
  fairy: "#FB89EB",
  fighting: "#E0306A",
  fire: "#FF9741",
  flying: "#89AAE3",
  grass: "#38BF4B",
  ground: "#E87236",
  ghost: "#4C6AB2",
  ice: "#4CD1C0",
  normal: "#919AA2",
  poison: "#B567CE",
  psychic: "#FF6675",
  rock: "#C8B686",
  water: "#3692DC",
  dark: "#5B5466",
  steel: "#5A8EA2",
};
const typeRGBColor = {
  bug: "131, 195, 0",
  dragon: "0, 111, 201",
  electric: "251, 209, 0",
  fairy: "251, 137, 235",
  fighting: "224, 48, 106",
  fire: "255, 151, 65",
  flying: "137, 170, 227",
  ground: "232, 114, 54",
  ghost: "76, 106, 178",
  ice: "76, 209, 192",
  normal: "145, 154, 162",
  poison: "181, 103, 206",
  psychic: "255, 102, 117",
  rock: "200, 182, 134",
  water: "54, 146, 220",
  dark: "91, 84, 102",
  steel: "90, 142, 162",
  grass: "56, 191, 75",
};

const fetchPokemon = () => {
  const promises = [];
  //898 max
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
    //return promise die in de array wordt gestoken
  }
  //results van de return promise array door promise.all wordt alles in 1x geladen ipv allemaal apart
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      id: result.id,
      name: result.name.toUpperCase(),
      image: result.sprites.other["official-artwork"].front_default,
      maintype: result.types[0].type.name,
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id,
      themeColor: typeColor[result.types[0].type.name],
    }));
    displayPokemon(pokemon);
  });
};

const pokedex = document.getElementById("pokedex");
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokemon) =>
        `
          <div class="card filterDiv ${pokemon.maintype}" onclick="modalDetail(this);" id="${pokemon.id}" style="background: radial-gradient(circle at 50% -15%, ${pokemon.themeColor} 40%, #ffffff 40%)"> 
                <img src=${pokemon.image} />
                <h2 class="poke-name">${pokemon.name}</h2>
                <div class="types">
                <span>${pokemon.type}</span>
                </div>
                <div class="card-subtitle"><img height="40px" width="40px" src="https://dupontachille.github.io/img/type/${pokemon.maintype}_Type_Icon.svg"></img> 
                </div>
            </div> 
      `
    )
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};

// const fetchTypes = () => {
//   const promises = [];
//   for (let i = 1; i <= 18; i++) {
//     const url = `https://pokeapi.co/api/v2/type/${i}`;
//     promises.push(fetch(url).then((res) => res.json()));
//     //return promise die in de array wordt gestoken
//   }
//   //results van de return promise array door promise.all wordt alles in 1x geladen ipv allemaal apart
//   Promise.all(promises).then((results) => {
//     const type = results.map((result) => ({
//       name: result.name,
//     }));
//     displayType(type);
//   });
// };

// const dropdowncontent = document.getElementById("dropdown-content");
// const displayType = (type) => {
//   console.log(type);
//   const pokemonfilterHTMLString = type
//     .map(
//       (type) =>
//         `
//         <a id="${type.name}" class="${type.name}" href="#"><img src="/img/type/${type.name}_Type_Icon.svg" Height="auto" Width="30px"></img><p> ${type.name} </p> </a>
//         `
//     )
//     .join("");
//   dropdowncontent.innerHTML = pokemonfilterHTMLString;

//   let types = document.getElementsByClassName(type.name);
//   console.log(types)

// };

// search li item W3Schools manier
function searchSpecificPokemon() {
  var input, filter, div, li, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("pokedex");
  pokename = div.getElementsByClassName("card");
  for (i = 0; i < pokename.length; i++) {
    h2 = pokename[i].getElementsByClassName("poke-name")[0];
    txtValue = h2.textContent || h2.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      pokename[i].style.display = "";
    } else {
      pokename[i].style.display = "none";
    }
  }
}

var modal = document.getElementById("myModal");
function modalDetail(singlepoke) {
  modal.style.display = "block";

  fetch(`https://pokeapi.co/api/v2/pokemon/${singlepoke.id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      displaySinglePokemon(data);
    });
}

const modalcontent = document.getElementById("modal-content");
function displaySinglePokemon(pokemon) {
  // const array1 = pokemon.types;
  // array1.forEach((pokemon) => console.log(pokemon.type.name));

  // Array.from(pokemon.types).forEach((e, i) => console.log(e.type.name));

  const pokemonHTMLString = `
        <span class="c-modal__close">&times;</span>
          <div class="c-modal__header item">
            <h2>${pokemon.name.toUpperCase()}  #${pokemon.id}</h2>
            
          </div>
          <div class="c-modal__img item">
          
            <img src="${
              pokemon.sprites.other["official-artwork"].front_default
            }"> </img>
          </div>
          <div class="c-modal__text item">
            <ul>
            <li class="c-modal__text-title">Weight</li>
            <li class="c-modal__text-subtitle">${pokemon.weight} kg</li>

            <li class="c-modal__text-title">Height</li>
            <li class="c-modal__text-subtitle">${pokemon.height} m</li>

            <li class="c-modal__text-title">Types</li> 
            <li class="c-modal__text-type u-background-color-${
              pokemon.types[0].type.name
            }"> ${pokemon.types[0].type.name}</li>
            </ul>
          </div>

          <div class="c-modal__stat item">
          <canvas id="myChart"></canvas>
      </div>

      `;
  modalcontent.innerHTML = pokemonHTMLString;
  //modal
  var span = document.getElementsByClassName("c-modal__close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //Chart.js

  console.log(`${typeRGBColor[pokemon.types[0].type.name]}`);

  const data = {
    labels: [
      "HP",
      "Special Attack",
      "Defense",
      "Speed",
      "Attack",
      "Special Defense",
    ],
    datasets: [
      {
        data: [
          `${pokemon.stats[0].base_stat}`,
          `${pokemon.stats[3].base_stat}`,
          `${pokemon.stats[2].base_stat}`,
          `${pokemon.stats[5].base_stat}`,
          `${pokemon.stats[1].base_stat}`,
          `${pokemon.stats[4].base_stat}`,
        ],
        label: "Stats",
        fill: true,
        backgroundColor: `rgba(${
          typeRGBColor[pokemon.types[0].type.name]
        }, 0.2)`,
        borderColor: `rgb(${typeRGBColor[pokemon.types[0].type.name]})`,
        pointBackgroundColor: `rgb(${
          typeRGBColor[pokemon.types[0].type.name]
        })`,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: `rgb(${
          typeRGBColor[pokemon.types[0].type.name]
        })`,
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

fetchPokemon();
searchSpecificPokemon();
fetchTypes();
