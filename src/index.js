document.addEventListener('DOMContentLoaded', function(){
  const beersURL = 'http://localhost:3000/beers'

  function getBeers() {
    fetch(beersURL).then(res => res.json()).then(json => showBeers(json))
  }
  getBeers()

  let beerList = document.getElementById('list-group')
  let beerDetails = document.getElementById('beer-detail')

  function showBeers(json) {
    // console.log(json);
    json.forEach(function(beer) {
      // console.log(beer);
      let listE = document.createElement('li')
      listE.addEventListener('click', function(){showDetails(beer)});
      listE.innerHTML = `<li>${beer.name}</li>`
      listE.setAttribute('class', 'list-group-item')
      beerList.appendChild(listE)
    })
  }

  function showDetails(beer) {
    console.log(beer);
    let h1 = document.createElement('h1')
    h1.innerHTML = beer.name
    let img = document.createElement('img')
    img.setAttribute('src', `${beer.image_url}`)
    let h3 = document.createElement('h3')
    h3.innerHTML = beer.tagline
    let textarea = document.createElement('textarea')
    textarea.innerHTML = beer.description
    let button = document.createElement('button')
    button.setAttribute('id', 'edit-beer')
    button.setAttribute('class', 'btn btn-info')
    button.addEventListener('submit', function(){saveDetails(textarea, beer)});
    button.innerHTML = "Save"
    beerDetails.appendChild(h1)
    beerDetails.appendChild(img)
    beerDetails.appendChild(h3)
    beerDetails.appendChild(textarea)
    beerDetails.appendChild(button)
  }

  function saveDetails(textarea, beer) {
    // console.log(textarea.value);
    let text = textarea.value
    let beerIDurl = `http://localhost:3000/beers/${beer.id}`
    fetch(beerIDurl, {
      method: 'PATCH',
      body: JSON.stringify({description: text}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }





})
