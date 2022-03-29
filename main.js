//#region EXAMPLE CODE
const cats = [
  { id: 1, name: 'Felix', age: 1 },
  { id: 2, name: 'Mittens', age: 4 },
  { id: 3, name: 'Bob', age: 3 },
  { id: 4, name: 'Mr. Snibbley', age: 300 },
  { id: 5, name: 'Shrek', age: 20 },
  { id: 6, name: 'Falcon', age: 9 },
  { id: 7, name: 'Ted', age: 3 }
]

// NOTE ForEach

// for (let i = 0; i < cats.length; i++) {
//   const cat = cats[i]
//   console.log(i, cat)
// }

// forEach iterates over an entire array without stopping, providing the value at that position (cat)
// cats.forEach((cat, i) => {
//   console.log(i, cat)
// })


//NOTE FILTER

// const shortNames = []

// for (let i = 0; i < cats.length; i++) {
//   const cat = cats[i]
//   // check the name
//   if (cat.length <= 5) {
//     // add to shortnames
//     shortNames.push(cat)
//   }
// }

// filter itterates over an array and creates a new array with only 'true' values
// const shortNames = cats.filter(cat => cat.length <= 5)
// console.log(shortNames)



// NOTE FIND
// function findCat(name) {
//   // let foundCat = {}
//   // for (let i = 0; i < cats.length; i++) {
//   //   const cat = cats[i]
//   //   if (cat.name === name) {
//   //     foundCat = cat
//   //     break
//   //   }
//   // }
//   // return foundCat

//   let foundCat = cats.find(cat => cat.name === name)
//   if (!foundCat) {
//     console.error('Cat NOT FOUND')
//   }
//   return foundCat
// }
// console.log()
//endregion

const allVillains = [
  { hat: false, name: "Lord Voldemort", facialHair: false, gender: "M", overFifty: true, hair: false, image: '../assets/images/Voldemort.jpg', guilty: false },
  { hat: false, name: "Cruella Deville", facialHair: false, gender: 'F', overFifty: true, hair: true, image: '../assets/images/cruella.png', guilty: false },

  { hat: true, name: "Darth Vader", facialHair: false, gender: "M", overFifty: false, hair: false, image: '../assets/images/vader.jpg', guilty: false },

  { hat: true, name: "wicked witch of the west", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/WickedWitchoftheWest.jpg', guilty: false },
  { hat: false, name: "Syndrome", facialHair: false, gender: "M", overFifty: false, hair: true, image: 'assets/images/syndrome.jpg', guilty: false },
  { hat: false, name: "Ursula", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/Ursula.jpg', guilty: false },
  { hat: false, name: "Joker", facialHair: false, gender: "M", overFifty: false, hair: true, image: '../assets/images/joker.jpg', guilty: false },
  { hat: false, name: "Thanos", facialHair: false, gender: "M", overFifty: true, hair: false, image: '../assets/images/thanos.png', guilty: false },
  { hat: true, name: "Jafar", facialHair: true, gender: "M", overFifty: false, hair: true, image: '../assets/images/jafar.jpg', guilty: false },
  { hat: true, name: "White Witch", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/whiteWitch.jpg', guilty: false },
  { hat: false, name: "Hades", facialHair: false, gender: "M", overFifty: true, hair: true, image: '../assets/images/hades.jpg', guilty: false },
  { hat: false, name: "Queen of Hearts", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/queenOfHearts.jpg', guilty: false }
]

let renderedVillains = []
let guesses = 0

function startGame() {
  // reset to all villains (break reference)
  renderedVillains = JSON.parse(JSON.stringify(allVillains))
  // choose a random villian and set them to guilty
  // random index from 0 - renderedVillians.length
  const index = Math.floor(Math.random() * (renderedVillains.length - 1))
  renderedVillains[index].guilty = true
  guesses = 0
  enableAllButtons()
  drawVillains()
}

/** removes disabled from all buttons */
function enableAllButtons() {
  let buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.disabled = false
  }
}



function drawVillains() {
  // add all html to template
  let template = ''
  // iterate over collection and add HTML for each item to template
  for (let i = 0; i < renderedVillains.length; i++) {
    const villain = renderedVillains[i]
    template += `
    <div class="col-3 p-2">
      <div class="bg-dark text-light rounded text-center villain-card" onclick="accuse('${villain.name}')">
        <img class="object-fit rounded-top" src="${villain.image}" alt="">
        <p><b>${villain.name}</b></p>
      </div>
    </div>
    `
  }
  document.getElementById('villains').innerHTML = template
  document.getElementById('guesses').innerText = guesses.toString()
}

function guess(attribute) {
  guesses++
  // get the guilty villian
  let compChoice = renderedVillains.find(v => v.guilty)

  // NOTE anytime you need to access a property of an object using a variable you must use bracket notation
  renderedVillains = renderedVillains.filter(v => v[attribute] === compChoice[attribute])
  // @ts-ignore
  document.getElementById(attribute).disabled = true
  drawVillains()
}


function accuse(name) {
  let compChoice = renderedVillains.find(v => v.guilty)
  if (compChoice.name == name) {
    // you win!
    toast('YOU WIN', 'success')
  } else {
    toast('WRONG!!! I MEAN THEY ARE BAD... BUT NOT THE ONE YOU WANT', 'error')
  }
}

/** Only Renders Villians with Hair */
// function hasHair() {
//   renderedVillains = renderedVillains.filter(v => v.hair === compChoice.hair)
//   drawVillains()
// }

// function hasNoHair() {
//   renderedVillains = renderedVillains.filter(v => !v.hair)
//   drawVillains()
// }


// function age() {
//   renderedVillains = renderedVillains.filter(v => v.overFifty === compChoice.overFifty)
//   drawVillains()
// }



function toast(title, display) {
  // @ts-ignore
  Swal.fire({
    title: title,
    icon: display,
    position: 'top-end',
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false
  })
}



// draws at end of script
startGame()
