var todo = document.getElementById('todo');
var desc = document.getElementById('desc');
var myForm = document.getElementById('my-form');
var localStorageDataList = document.getElementById("localStorageData");

myForm.addEventListener('submit',addTodo);

// function addItem(e){
//     displayLocalStorageData();
// }

function addTodo(e) {
    e.preventDefault();
    // Get user input values
    const todos = todo.value;
    const descs = desc.value;
    axios.post('https://crudcrud.com/api/7cddbf9881bb449da9350e8b30c5b46b/todos',{
        Todo :todos,
        Description: descs,
        Done: false
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    displayData();

    todo.value = "";
    desc.value = "";
}

function displayData() {
    localStorageDataList.innerHTML = ""; // Clear previous data

    axios.get('https://crudcrud.com/api/7cddbf9881bb449da9350e8b30c5b46b/todos')
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].Done === false) showAllUsers(res.data[i]);
        }
        for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].Done === true) showAllUsers(res.data[i]);
        }
    })
    .catch(err => console.log(err))
}

window.addEventListener("DOMContentLoaded",()=>{
    localStorageDataList.innerHTML = ""; // Clear previous data

    axios.get('https://crudcrud.com/api/7cddbf9881bb449da9350e8b30c5b46b/todos')
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].Done == false) showAllUsers(res.data[i]);
        }
        for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].Done == true) showAllUsers(res.data[i]);
        }
    })
    .catch(err => console.log(err))
})

function showAllUsers(print){
    const listItem = document.createElement("li");
            const deleteItem = document.createElement("button");
            deleteItem.textContent = "Delete";
            deleteItem.addEventListener('click', () => deleteElement(print._id));
    
            // Add an Edit button
            const editItem = document.createElement("button");
            editItem.textContent = "Done";
            editItem.addEventListener('click', () => editElement(print._id, print));
    
            listItem.textContent = `Todo: ${print.Todo}, Description: ${print.Description}, Status: ${print.Done}`;
    
            localStorageDataList.appendChild(listItem);
            listItem.appendChild(editItem);
            listItem.appendChild(deleteItem);
}

function deleteElement(id){
    axios.delete(`https://crudcrud.com/api/7cddbf9881bb449da9350e8b30c5b46b/todos/${id}`)
    .then(res => console.log('Hogaya Delete'))
    .catch(err => console.log(err))

    displayData();
}


function editElement(id, print){
    axios.put(`https://crudcrud.com/api/7cddbf9881bb449da9350e8b30c5b46b/todos/${id}`,{
        Done: true
    })  
    .then(res => console.log('Hogaya Edit'))
    .catch(err => console.log(err))
        
    displayData(); // Refresh the displayed data
    }
