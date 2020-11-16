let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(json=>addCard(json))

  const form = document.getElementsByClassName("add-toy-form")[0]
  form.addEventListener("submit", addNewToy)

});

function addNewToy(e){
    e.preventDefault()
    const userData = {name: e.target.name.value, image: e.target.image.value}
    const configObj={
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
  
      body: JSON.stringify(userData)
       
    }
  
    fetch("http://localhost:3000/toys",configObj).then(resp=>resp.json()).then(json=>{console.log(json)})
  }

function addCard(json){
  const collectionDiv = document.getElementById("toy-collection")
  for (const toy of json) {
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card")
    const h2 = document.createElement("h2")
    h2.innerHTML = toy.name
    const img = document.createElement("img")
    img.src = toy.image
    img.classList.add("toy-avatar")
    const p = document.createElement("p")
    p.innerHTML = toy.likes + "likes"
    const button = document.createElement("button")
    button.classList.add("like-btn") 
    button.innerHTML = "like <3"
    
    children = [h2, img, p, button]
    appendChildren(cardDiv,children) 
    collectionDiv.appendChild(cardDiv)

    button.addEventListener("click", (e)=>{
      addLike(e, toy)
    })
  }
}

function appendChildren(parent, children){
  for(child of children){
    parent.appendChild(child)
  }
}

function addLike(e, toy){
  const userData = {likes: toy.likes + 1 }

  const configObj = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(userData)

  }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj).then(resp=>resp.json()).then(json=>console.log(toy.likes))

 }

