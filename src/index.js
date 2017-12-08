document.addEventListener("DOMContentLoaded", function(){

function getData() {
  fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(data => displayData(data))
  }

  function displayData(data) {
    let list_group = document.getElementById('list-group')
    data.forEach( (element) => {
      let li = document.createElement('li')
      li.innerText = element.name
      list_group.appendChild(li)

      li.addEventListener("click", (event) => {
        let beer_detail = document.getElementById('beer-detail')
        beer_detail.innerHTML = `<h1>${element.name}</h1><h3>${element.tagline}</h3>`
        let image = document.createElement('img')
        image.src = element.image_url
        beer_detail.appendChild(image)

        let form = document.createElement('textarea')
        beer_detail.appendChild(form)

        let button = document.createElement('button')
        button.type = "submit"
        button.value = "submit"
        button.id = "submit"
        button.type = "submit"
        beer_detail.appendChild(button)
        //
        // let comments = document.createElement('ul')
        // beer_detail.appendChild(comments)

        button.addEventListener("click", (event) => {
          let value = form.value
          let fetch_request = element.id
          let fetch_url = `http://localhost:3000/beers/${fetch_request}`
          /////LISTING THESE OUT BECAUSE PATCH NOT WORKING //////
          // let id = element.id
          // console.log(id)
          // let name = element.name
          // let tagline = element.tagline
          // let first_brewed = element.first_brewed
          // let image_url = element.image_url
          // let food_pairing = element.food_pairing
          // let brewers_tips = element.brewers_tips
          // let contributer_by = element.contributer_by

          let object = {
            method: 'PATCH', //PATCH not working so tried with PUT, but cannot update routes, etc. for put
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({description: value})
            // body: JSON.stringify({description: value, name: name, id: id, tagline: tagline, first_brewed: first_brewed, image_url: image_url, food_pairing: food_pairing, brewers_tips: brewers_tips, contributer_by: contributer_by})
            }

            fetch(fetch_url, object)
            // console.log(fetch_url)
            // console.log(object)
              .then(result => result.json())
              .then(info => console.log(info))

          })

        })


      })
    }
    getData()
  })
