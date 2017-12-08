document.addEventListener("DOMContentLoaded", function() {

function getBeers(){
  fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(beers => displayBeers(beers))
}

function displayBeers(beers){
  let ul = document.getElementById('list-group')

  beers.forEach(beer => {
    let newLi = document.createElement('li')
    newLi.id = `beer-${beer.id}`
    newLi.innerText = beer.name
    newLi.class = "list-group-item"
    newLi.addEventListener("click", (event) => {
      let beerDetail = document.getElementById("beer-detail")
      beerDetail.innerHTML = ""
      let info = document.createElement("li")
      info.innerHTML = `
      <h1>${beer.name}</h1>
      <img src=${beer.image_url}></img>
      <h3>${beer.tagline}</h3>
      <textarea id="beer-script">${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>
      `
      beerDetail.appendChild(info)
      let editBeer = document.getElementById('edit-beer')
      let description = document.getElementById("beer-script")
      description.innerText = description.value
      editBeer.addEventListener("click", (event) => {
        fetch(`http://localhost:3000/beers/${beer.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({description: description.value})
        })

      })
    })
    ul.appendChild(newLi)


  })
}
  getBeers()

})
