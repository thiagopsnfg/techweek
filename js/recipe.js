window.onload = () => {
  getRecipeDetails(getRecipeId());
};

const getRecipeId = () => {
  recipe = localStorage.getItem("recipe");

  console.log('Recipe: ', JSON.parse(recipe).id.split('-')[0]);
  return JSON.parse(recipe).id.split('-')[0];
}

const getRecipeDetails = (id) => {
  const myHeaders = new Headers({
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "Authorization": "Token token=4ecfd71f20ddf4011acd349edandroid",
  });
  
  const config = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(`http://api.tudogostoso.com.br/api/recipes/${id}.json`, config)
  .then(response => response.json())
  .then((response) => {
    createPage(response);
  })
  .catch(error => console.log(error));
}

const createPage = (recipe) => {
  const section = document.querySelector("section");
  
  while (section.hasChildNodes()) {
    section.removeChild(section.lastChild);
  }

  let showRecipeBox = createShowRecipeBox(recipe);
  let listIngredients = createListIngredients(recipe);

  section.appendChild(showRecipeBox);
  section.appendChild(listIngredients);
}

const createShowRecipeBox = (recipe) => {
  const showRecipeBox = document.createElement("div"); 
  showRecipeBox.className = "show-recipe-box";

  const h1 = document.createElement("h1"); 
  const title = document.createTextNode(recipe.title);
  h1.appendChild(title);
  showRecipeBox.appendChild(h1);

  const img = document.createElement("img");
  img.setAttribute('src', recipe.image_url); 
  showRecipeBox.appendChild(img);

  const info = document.createElement("div"); 
  info.className = "info";

  const boxPreparo = document.createElement("div"); 
  boxPreparo.className = "box-preparo";
  info.appendChild(boxPreparo);

  const boxRendimento = document.createElement("div"); 
  boxRendimento.className = "box-rendimento";
  info.appendChild(boxRendimento);

  showRecipeBox.appendChild(info);

  return showRecipeBox;
}

const createListIngredients = (recipe) => {
//   <div class="list-ingredients">
//   <h2>SELECIONE OS INGREDIENTES QUE VC JÁ POSSUI:</h2>
//   <span></span>
//   <ul>
//     <li>
//       <input type="checkbox">500g de açúcar mascavo </input>
//     </li>
//     <li>
//       <input type="checkbox">2 xícaras (chá) de água</input>
//     </li>
//     <li>
//       <input type="checkbox">4 ovos (claras separadas)</input>
//     </li>
//     <li>
//       <input type="checkbox">1/2 colher (chá) de canela em pó</input>
//     </li>
//   </ul>
//   <progress value="22" max="100"></progress>
//   <h3>você possui 15% dos ingredientes</h3>
//   <span></span>

//   <button>Imprimir lista de ingredientes</button>
// </div>

const listIngredients = document.createElement("div"); 
listIngredients.className = "list-ingredients";

const h2 = document.createElement("h2"); 
const title = document.createTextNode("SELECIONE OS INGREDIENTES QUE VC JÁ POSSUI:");
h2.appendChild(title);
listIngredients.appendChild(h2);

const span = document.createElement("span");
listIngredients.appendChild(span);

const ul = document.createElement("ul"); 

recipe.ingredient_lists[0].members


}
