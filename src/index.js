document.addEventListener('DOMContentLoaded', function(){
  console.log('%c HI', 'color: firebrick')
  addOptions()
  fetchImages()
  fetchBreeds()
  breedFilter().addEventListener('change', handleBreedFilter)
})

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
// selectors
function imagesContainer(){
  return document.getElementById('dog-image-container')
}

function breedsList(){
  return document.getElementById('dog-breeds')
}

function breedFilter(){
  return document.getElementById('breed-dropdown')
}

// fetches
function fetchImages(){
  fetch(imgUrl)
  .then(r => r.json())
  .then(data => {
    data.message.forEach(url => renderImg(url))
  })
}

function fetchBreeds(){
  fetch(breedUrl)
  .then(r => r.json())
  .then(data => {
    renderBreeds(data.message)
  })
}

// renderers and callbacks
function renderImg(url){
  let img = document.createElement('img')
  img.src = url
  imagesContainer().appendChild(img)
}

function renderBreeds(obj){
  breedsList().innerHTML = ""
  for(let breed in obj){
    filterBreed(breed)
    if(obj[breed].length > 0){
      renderSubBreed(breed, obj[breed])
    }
  }
}

function filterBreed(breed){
  let filter = breedFilter().dataset.filter
  if(filter && breed[0] === filter){
    renderBreedLi(breed)
  } else if(!filter){
    renderBreedLi(breed)
  }
}

function renderSubBreed(breed, subBreedArr){
  for(let i = 0; i < subBreedArr.length; i++){
    let subBreed = `${subBreedArr[i]} ${breed}`
    filterBreed(subBreed)
  }
}

function renderBreedLi(breed){
  let div = document.createElement('div')
  div.style.backgroundColor = randomColor()
  div.innerText = breed
  div.classList.add("breed-div")
  breedsList().appendChild(div)
  div.addEventListener('click', handleClick)
}

function handleClick(e){
  if(e.target.classList.contains("select")){
    e.target.classList.remove("select")
  }else{
    e.target.classList.add("select")
  }
}

function handleBreedFilter(e){
  e.target.dataset.filter = e.target.value
  fetchBreeds()
}

function addOptions(){
  for(let i = 97; i < 123; i++){
    let option = document.createElement('option')
    let letter = String.fromCharCode(i)
    option.value = option.innerText = letter
    breedFilter().appendChild(option)
  }
}

// function randomColor(){
//   const colors = ["aquamarine", "aliceblue", "lightgreen", "pink", "lightsalmon", "lightgoldenrodyellow", "lightskyblue", "lightseagreen"]
//   let index = Math.floor(Math.random()*colors.length)
//   return colors[index]
// }
