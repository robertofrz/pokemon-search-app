const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", validateUserInput);

function validateUserInput() {
  let input = document.getElementById("search-input").value;

  const genderMap = {
    "♀": "-f",
    "♂": "-m",
  };

  let genderSuffix = "";

  if (input.endsWith("♀") || input.endsWith("♂")) {
    genderSuffix = genderMap[input.slice(-1)];
    input = input.slice(0, -1).trim();
  }

  const validInput = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  document.getElementById("search-input").value = "";

  return fetchData(validInput + genderSuffix);
}

async function fetchData(pokemon) {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`
    );

    if (response.status === 500) {
      alert("Internal Server Error");
    } else if (response.status === 404) {
      alert("Pokémon Not Found");
    }

    const data = await response.json();
    displayData(data);
  } catch (err) {
    console.error("Error: ", err);
  }
}

function displayData(data) {
  const name = document.getElementById("pokemon-name");
  const id = document.getElementById("pokemon-id");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const sprite = document.getElementById("sprite");
  const typesDisplay = document.getElementById("types");
  const hp = document.getElementById("hp");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const specialAttack = document.getElementById("special-attack");
  const specialDefense = document.getElementById("special-defense");
  const speed = document.getElementById("speed");

  typesDisplay.innerHTML = "";

  name.innerHTML = data.name.toUpperCase();
  id.innerHTML = `#${data.id}`;
  weight.innerHTML = `Weight: ${data.weight}`;
  height.innerHTML = `Height: ${data.height}`;
  sprite.src = data.sprites.front_default;
  sprite.style.display = "block";
  hp.innerHTML = data.stats[0].base_stat;
  attack.innerHTML = data.stats[1].base_stat;
  defense.innerHTML = data.stats[2].base_stat;
  specialAttack.innerHTML = data.stats[3].base_stat;
  specialDefense.innerHTML = data.stats[4].base_stat;
  speed.innerHTML = data.stats[5].base_stat;

  const newSprite = sprite.cloneNode(true);
  sprite.parentNode.replaceChild(newSprite, sprite);

  newSprite.addEventListener("click", () => {
    newSprite.src =
      newSprite.src === data.sprites.front_default
        ? data.sprites.back_default
        : data.sprites.front_default;
  });

  if (data.types.length === 1) {
    const type = document.createElement("p");
    type.classList.add("type");
    type.innerHTML = data.types[0].type.name.toUpperCase();
    typesDisplay.appendChild(type);
  } else {
    const type1 = document.createElement("p");
    const type2 = document.createElement("p");
    type1.classList.add("type");
    type2.classList.add("type");
    type1.innerHTML = data.types[0].type.name.toUpperCase();
    type2.innerHTML = data.types[1].type.name.toUpperCase();
    typesDisplay.appendChild(type1);
    typesDisplay.appendChild(type2);
  }
}
