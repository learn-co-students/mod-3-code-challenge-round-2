function getBeers() {
  fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(json => initialFunction(json))
}


  function initialFunction(json) {
    beerDetailDiv = document.getElementById("beer-detail")
    let beerList = document.getElementById("list-group")
    let list = document.createElement("li")

    json.forEach(beer => {
      beerDetails = beer.description
      beerId = beer.id
      console.log(beerId)
      name = beer.name


      list.innerHTML += `<li id=${beerId}>${name}</li>`

      beerList.appendChild(list)
      list.addEventListener("click", function(){
        console.log(beer.id)
      })


      // beerList.setAttribute("type", "button")

    })
  }


getBeers()
