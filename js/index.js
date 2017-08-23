window.onload = () => {  
  const myForm = document.getElementById("search");
  myForm.addEventListener("submit", search);
  const recipes = localStorage.getItem("recipes");
  if(recipes !== ""){
    createRecipes(JSON.parse(recipes));
  }
};

const createRecipes = (recipes) => {
  const section = document.querySelector("section");
  
  while (section.hasChildNodes()) {
    section.removeChild(section.lastChild);
  }

  recipes.forEach(recipe => {
    const recipeDiv = document.createElement("div"); 
    recipeDiv.className = "recipe";
  
    const link = document.createElement("a");
    link.setAttribute('href', "/recipe.html");
    link.id = recipe.id;
    
    link.onclick= function (event) {
      const list = localStorage.getItem("recipes");
      const recipes = JSON.parse(list);
      
      const r = recipes.filter( recipe => {
         return recipe.id === link.id;
      });
      
      localStorage.setItem("recipe", JSON.stringify(r[0]));
    };

    const img = document.createElement("img");
    img.setAttribute('src', recipe.image_url); 
    link.appendChild(img);

    const recipeContainer = document.createElement("div"); 
    recipeContainer.className = "recipe-container";

    const h4 = document.createElement("h4"); 
    const span = document.createElement("span");
    const categorie = document.createTextNode(recipe.category_name);
    span.appendChild(categorie);
    h4.appendChild(span);
    recipeContainer.appendChild(h4);

    const h3 = document.createElement("h3"); 
    const title = document.createTextNode(recipe.title);
    h3.appendChild(title);
    recipeContainer.appendChild(h3);

    link.appendChild(recipeContainer);
    
    recipeDiv.appendChild(link);
    section.appendChild(recipeDiv);    
  });
}

const search = (event) => {
 event.preventDefault(); 
 
 const term = event.target.getElementsByClassName("search-term")[0].value;

 const myHeaders = new Headers({
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
  "Authorization": "Token token=4ecfd71f20ddf4011acd349edandroid",
 });

const config = {
  method: 'GET',
  headers: myHeaders,
 };
 
 fetch(`http://api.tudogostoso.com.br/api/search/${term}/p${1}.json`, config)
 .then(response => response.json())
 .then((response) => {
   localStorage.setItem("recipes", JSON.stringify(response.items));
   createRecipes(response.items);
 })
 .catch(error => console.log(error));
}


