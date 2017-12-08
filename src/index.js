
let list_group = document.getElementById("list-group")
let beer_detail = document.getElementById("beer-detail")
fetch('http://localhost:3000/beers').then(res => res.json()).then(data => {
  data.forEach(item => {
    li = document.createElement('li')
    li.className = "list-group-item"
    li.id = item.id
    li.innerText = item.name
    list_group.appendChild(li)
    document.getElementById(li.id).addEventListener('click', function(event) {
      event.preventDefault()
      beer_detail.innerHTML = `
      <h1> ${item.name} </h1>
      <img id="image"></img>
      <h3> ${item.tagline} </h3>
      <textarea id="textarea"> ${item.description} </textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>
      `
      let image = document.getElementById("image")
      image.src = item.image_url
      document.getElementById("edit-beer").addEventListener('click', function(event){
        event.preventDefault()
        fetch(`http://localhost:3000/beers/${item.id}`, {
          method: 'PATCH',
          headers:  {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          body: JSON.stringify({"description": document.getElementById("textarea").value})
        })
      })
    })

  })


})
