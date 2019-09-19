document.addEventListener('DOMContentLoaded', function(){
  console.log('%c HI', 'color: firebrick')
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  // fetch dogImage data ON LOAD of page
  fetchDogImages(imgUrl)
  // fetch breed data ON LOAD of page
  fetchBreeds(breedUrl)
  // add listener to breed dropdown select ON LOAD of page
  document.getElementById('breed-dropdown').addEventListener('change', handleBreedFilter)
})

let allBreeds

// fetch dog image data
const fetchDogImages = (url) => {
  fetch(url)
  .then(r => r.json())
  .then(data => renderDogs(data.message))
}

// fetch dog breed data
const fetchBreeds = (url) => {
  fetch(url)
  .then(r => r.json())
  .then(data => renderBreedsArr(data.message))
}

// interate through fetched dog img data
const renderDogs = (dogArr) => {
  dogArr.forEach(imgUrl => {
    renderDogImg(imgUrl)
  })
}

// render individual dog image to DOM
const renderDogImg = (imgUrl) => {
  let img = document.createElement('IMG')
  img.src = imgUrl
  const dogImgContainer = document.getElementById('dog-image-container')
  dogImgContainer.appendChild(img)
}

// take breeds data and parse through to create single breed array
const renderBreedsArr = (hash) => {
  // create hash out of keys
  let breedsKeys = Object.keys(hash)
  // holding array
  let breedsArr = []
  for(let i = 0; i < breedsKeys.length; i++){
    // if breed does not contain sub-breeds (aka array is empty), push key into holding array
    if(hash[breedsKeys[i]].length === 0){
      breedsArr.push(breedsKeys[i])
    // if breed does have sub-breeds, iterate through sub-breed array, interpolate breed and sub-breed and push into holding array
    } else {
      hash[breedsKeys[i]].forEach(subBreed => {
        breedsArr.push(`${subBreed} ${breedsKeys[i]}`)
      })
    }
  }
  // store array of all breeds to global variable, note: if this step is skipped then the filter will not work as it depends on the globally stored array!
  allBreeds = breedsArr
  renderBreeds(allBreeds)
}

// iterate through breeds array and call method to render each breed to DOM
const renderBreeds = (breedsArr) => {
  breedsArr.forEach(breed => renderBreed(breed))
}

// render single breed to DOM
const renderBreed = (breed) => {
  let li = document.createElement('li')
  li.innerText = breed
  let breedsContainer = document.getElementById('dog-breeds')
  breedsContainer.appendChild(li)
  // add listener to toggle color

  li.addEventListener('click', handleColorToggle)
}

// logic to toggle text color change
const handleColorToggle = (e) => {
  debugger
  e.target.style.color = e.target.style.color === "" ? "green" : "" // this is a ternary operator, look it up!
}

// breed dropdown handler for event listener that was initialized for breed dropdown
const handleBreedFilter = (e) => {
  // grab oldUl, create newUl, and replace oldUl with newUl on body
  let oldUl = document.getElementById('dog-breeds')
  let newUl = document.createElement('ul')
  let body = document.querySelector('body')
  body.replaceChild(newUl, oldUl)
  // set newUl id, could've been done earlier but logically this made sense to me
  newUl.id = "dog-breeds"
  // filterBreeds function returns an array of breeds which is passed to renderBreeds to render to DOM
  renderBreeds(filterBreeds())
}

// logic to filter breeds
const filterBreeds = () => {
  const breedDropdown = document.getElementById('breed-dropdown')
  // show all breeds
  if(breedDropdown.value === "show-all"){
    return allBreeds
  } else {
  // filter breed by letter
  return allBreeds.filter(breed => breed[0] === breedDropdown.value)
  }
}
