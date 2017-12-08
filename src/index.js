fetch("http://localhost:3000/beers")
.then(res=>res.json())
.then(json =>showGroup(json))



function showGroup(json){
  //Finding the elements

  showGroup_ul = document.getElementById('list-group')
  console.log(showGroup_ul)

  //iterating over elements and creating the list
  json.forEach((group)=>{
    console.log(group.name)
    let li_item = document.createElement('li')
    li_item.id = group.id
    li_item.innerText= group.name
    li_item.className="list-group-item"
    showGroup_ul.appendChild(li_item)
    li_item.addEventListener("click",()=>showDetails(group))
    })
}

//Shows beer Details
function showDetails(beer){
  showDetails_div = document.getElementById("beer-detail")
  showDetails_div.innerHTML = `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="beer_description">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
`
  //adding Event Listener to button
  button = document.getElementById('edit-beer')
  button.addEventListener("click",()=>saveBeer(beer.id))
}

// Saving description changes to database
function saveBeer(beer){
  description = document.getElementById('beer_description')
  console.log(description.value)
  fetch(`http://localhost:3000/beers/${beer}`,{method:"PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: description.value})
  })
  .then(res=>res.json())
  .then(json => showDetails(json))
}
