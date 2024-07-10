document.addEventListener('DOMContentLoaded', () => {
    const URL_PREFIX = 'http://localhost:3000/dogs';
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    let currentDogId = null;
  
    // Fetch and display dogs in the table
    const fetchDogs = () => {
      fetch(URL_PREFIX)
        .then(response => response.json())
        .then(dogs => {
          displayDogs(dogs);
        });
    };
  
    const displayDogs = (dogs) => {
      tableBody.innerHTML = '';
      dogs.forEach(dog => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button>Edit</button></td>
        `;
        tr.querySelector('button').addEventListener('click', () => populateForm(dog));
        tableBody.appendChild(tr);
      });
    };
  
    const populateForm = (dog) => {
      currentDogId = dog.id;
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
    };
  
    dogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
      };
      updateDog(currentDogId, updatedDog);
    });
  
    const updateDog = (id, updatedDog) => {
      fetch(`${URL_PREFIX}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
      })
        .then(response => response.json())
        .then(() => {
          fetchDogs();
        });
    };
  
    // Initial fetch of all dogs
    fetchDogs();
  });
  