//STEPS
// X 1 - Run the command npm install -g json-server in the command line from this directory
// X 2 - Run json-server --watch db.json
// X add dom event listener

///beers handling
// x fetch beers
// x display beers as a list
// x add event listener to beer to display beer details
// x create comment form
// x allow user to post comment
// INCOMPLETE display comment

function getBeers(beerURL){
  return fetch(beerURL)
  .then(res => res.json())
  //.then(console.log)
}

function displayBeers(beers, leftDiv){
  beers.forEach(function(beer){
    let beerLi = document.createElement('li')
    beerLi.innerText = beer.name
    leftDiv.appendChild(beerLi)
    //displayBeerDetails(beer, rightDiv)
  })
}

function displayBeerDetails(beer, rightDiv){
  let tagline = document.createElement('p')
  tagline.innerText = beer.tagline
  rightDiv.appendChild(tagline)
}

//find a beer
function findBeer(beers, beerName){
  beers.forEach(function(beer){
    if (beer.name === beerName){
      displayBeerDetails(beer, beerDetails)
    }
  })
}

function postForm(commentURL, content){
let options =
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify( {description: content})
  }
return fetch(commentURL, options)
  .then(res => res.json())
  .then(console.log)
}

//incomplete
function displayNewDescription(beer,div){
}

////////////////////////////////
 document.addEventListener("DOMContentLoaded", function(event) {
   const beersURL = 'http://localhost:3000/beers'
   const beerURL = 'http://localhost:3000/beers/1'
   let beersList = document.querySelector("#list-group")
   let beerDetails = document.querySelector("#beer-detail")

   // create comments form
   let commentForm = document.createElement('form')
   let content = document.createElement('input')
   content.type = 'textarea'
   content.placeholder = 'your review here'
   let submit = document.createElement('input')
   submit.type = 'submit'
   commentForm.append(submit, content)
   beerDetails.appendChild(commentForm)

   //render beers json & display beer
   let beers = getBeers(beersURL)

   //display beers
   beers.then(beers => displayBeers(beers,beersList))


   //add event listener to beers FAIL
   beersList.addEventListener('click', function(event){
     let clickedBeer = event.target.innerText
     //find a beer (failing)
     //beers.then(res => res.find(function(beer){
       //return beer.name == clickedBeer;
      //})

      let beer = beers
        .then(res => findBeer(res, clickedBeer))

        //.then(beer => console.log(beer.name))
    })


    //add event listener to comments form
    commentForm.addEventListener('submit',function(event){
      event.preventDefault();
      let content = event.target.children[1].value
      postForm(beerURL, content)
    })

 })
