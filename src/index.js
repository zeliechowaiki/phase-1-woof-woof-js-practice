let currentDog;
const dogButton = document.getElementById('dog-button');
const filterButton = document.getElementById('good-dog-filter');

function init () {
    dogBar = document.querySelector('#dog-bar');
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogs => {
        dogs.map(dog => createDogNameSpan(dog));
        allDogs = dogs;
    });
}
init();

function createDogNameSpan(dog){
    const dogSpan = document.createElement('span');

    dogSpan.textContent = dog.name;
    dogBar.appendChild(dogSpan);

    dogSpan.addEventListener('click', () => {
        currentDog = dog;
        document.getElementById('dog-image').src = dog.image;
        document.getElementById('dog-h2').textContent = dog.name;
        dogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        dogButton.classList.remove('hidden');
    })
}

dogButton.addEventListener('click', () => {
    currentDog.isGoodDog = !currentDog.isGoodDog;
    dogButton.textContent = currentDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    updateDog(currentDog);
});

function updateDog(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(dog => console.log(dog))
    .catch(error => console.log(error));
}

filterButton.addEventListener('click', function () {
    if (filterButton.textContent.includes('OFF')) {
        let goodDogs = filterGoodDogs(allDogs);
        dogBar.innerHTML = '';
        goodDogs.map(dog => createDogNameSpan(dog));
        filterButton.textContent = 'Filter good dogs: ON';
    }
    else {
        dogBar.innerHTML = '';
        allDogs.map(dog => createDogNameSpan(dog));
        filterButton.textContent = 'Filter good dogs: OFF';
    }
})

function filterGoodDogs (dogs) {
    return dogs.filter( el => el.isGoodDog);
}