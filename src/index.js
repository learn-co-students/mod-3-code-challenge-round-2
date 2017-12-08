document.addEventListener("DOMContentLoaded", function(){
     function getBeers(){
           fetch('http://localhost:3000/beers')
             .then(res => res.json())
             .then(beers => beerLister(beers))
           }

    function beerLister(beers){
      let listArea = document.getElementById("list-group")


      beers.forEach(beer =>{
        let newLi = document.createElement("li")
        newLi.innerText = beer.name
        listArea.appendChild(newLi)

        newLi.addEventListener("click", (event) =>{
          let details = document.getElementById("beer-detail")
          console.log(beer)

          details.innerHTML =
          `<h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button id="edit-${beer.id}" class="btn btn-info">
            Save
          </button>`

          //here i understand that i need to have my save button recognize the id of the beer
          // in order to make a patch request to that specific beer description

          let button = document.getElementById(`edit-${beer.id}`)
          button.addEventListener("click", (event) => console.log("hi"))




        })
      })


    }








           getBeers()
})

// i have a small syntax error which is making me unable to uncomment it but i want to show a bit of the (time crunched) post request set up


          // function patchItUpHomie(){
          //   // i know that this needs to take in an {} to use in my body
          //   let headers =   {
          //       'Content-Type': 'application/json',
          //       'Accept': 'application/json'
          //     }
          //
          //   let body = {
          //     headers: headers
          //     method: "PATCH"
          //     body: JSON.stringify({description:"`${beer.description.value}`"})
          //   }
          //   // this needs to take in the input that was edited on the screen,
          //   //i know that these are key/value pairs for the body,
          //   //but i will keep going just to show you i know the format.
          //   //I think i will run out of time to make it work but i want to show that
          //   //i do know how it works.
          //
          //   fetch("http://localhost:3000/beers/:id", body)
          //     .then(response => response.json)
          //     .then(json => console.log(json))
