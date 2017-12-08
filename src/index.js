const beersURL = `http://localhost:3000/beers`
const beerURL = `http://localhost:3000/beers/${beer.id}`

const beersColumn = document.querySelector('col-md-4')
const beerDetailsColumn = document.querySelector('col-md-8')
const beersUL = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')

document.addEventListener('DOMContentLoaded', function () {


  function getBeers() {
    fetch(beersURL)
      .then(res => res.json())
      .then(json => listBeers(json))
  }

  function listBeers(json) {
    json.forEach(beer => {
      (console.log(beer.name))
      const newLi = document.createElement('li')
      beersUL.appendChild(newLi)
      newLi.id = `beer-${beer.id}`
      newLi.innerText = beer.name
      const beerLi = document.getElementById(`beer-${beer.id}`)

      beerLi.addEventListener('click', getBeerDetails)

      function getBeerDetails(beer) {
        const beerNameP = document.createElement('p')
        const beerTagline = document.createElement('p')
        const beerBrewDate = document.createElement('p')
        const beerDescription = document.createElement('p')

             beerNameP.innertext = `Name: ${beer.name}`
             beerTagline.innertext = `Tagline: ${beer.tagline}`
             beerBrewDate.innertext = `Brew Date: = ${beer.first_brewed}`
             beerDescription.innertext = `Description: ${beer.description}`

             beerDetail.appendChild(beerNameP)
             beerDetail.appendChild(beerTagline)
             beerDetail.appendChild(beerBrewDate)
             beerDetail.appendChild(beerDescription)

           }


      })
  }

    function updateBeer(beer) {
      fetch(beerURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({description: "your new description"})
      })
        .then(res => res.json())
        .then(json => persistDescription(json))
    }

    function persistDescription () {
      fetch(beerURL)
        .then(res => res.json())
        .then(json => listBeers(json))
    }


  getBeers();

})
