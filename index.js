let listOfUsers = []; //Global Variable
let listWithoutDelete = []; //Global Variable
let currentId = [];
/* Function to fetch all users */
const fetchUsers = () => {
  document.getElementById("listUsers").innerHTML = ""; // remove the list of users before to append the new one
  //Check the status of the response
  fetch("https://jsonplaceholder.typicode.com/users").then(response => {
    if (response.status !== 200) { // I got some error
      console.log("error");
    }
    //convert data
    response.json().then(users => {
      listOfUsers = users; //sign the list of users to Global Variavel
      listWithoutDelete = users;
      //Append the result in the html
      users.map(user => {
        let userItem = document.createElement('li'); //create the element
        userItem.innerHTML = `
          <div class="card">
            <ul>
              <li>Name: <span class="name">${user.name}</span></li>
              <li>UserName: <span class="name">${user.username}</span></li>
              <li>Email: <span class="name">${user.email}</span></li>
              <li><button onclick="deleteUser(this.id)" type="submit" id=${user.id} class="btn btn-primary">Delete</button><li>
            </ul>
          </div>
        `;
        document.getElementById("listUsers").appendChild(userItem); //select html element -->    
      });
    })
  }).catch(error => { // catch the error
    console.log(error)
  })
}

/* Function submitForm to add a new user*/
const submitForm = () => {
  //Grab the values from the form
  let nameUser = document.getElementById("name").value;
  let userName = document.getElementById("username").value;
  let Email = document.getElementById("email").value;

  if (nameUser === "" || userName === "" || Email === "") {
    alert("The form required ")
  } else {
    //Create a new object user
    let newUser = {
      name: nameUser,
      username: userName,
      email: Email
    }

    // add a new user to the users list
    let addNewUser = [newUser, ...listWithoutDelete]
    document.getElementById("listUsers").innerHTML = ""; // Clean the itens to the list

    addNewUser.map(user => { // create a new list in the HTML with a new user
      let userItem = document.createElement('li'); //create the element
      userItem.innerHTML = `
          <div class="card">
            <ul>
              <li>Name: <span class="name">${user.name}</span></li>
              <li>UserName: <span class="name">${user.username}</span></li>
              <li>Email: <span class="name">${user.email}</span></li>
              <li><button onclick="deleteUser(this.id)" type="submit" id=${listWithoutDelete[0].id - 1} class="btn btn-primary">Delete</button></li>
            </ul>
          </div>
        `;
      document.getElementById("listUsers").appendChild(userItem); //select html element -->    
    });

    listWithoutDelete = addNewUser; // update the global variable with the last version of the user list.   
  }
}

/*add event click to new users function*/
document.getElementById("submit").addEventListener("click", (element) => {
  element.preventDefault();
  submitForm();
})

/* Function to fetch a especific user*/
const filterUsers = id => {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
    if (res.status !== 200) {
      console.log("error");
    }
    if (res.status === 404) {
      alert("Please enter a number between 1-10")
    }
    res.json().then(user => { // append the data to HTML
      document.getElementById("listUsers").innerHTML = ""; // remove the list of users before to append the new one
      let userItem = document.createElement('li'); //create the element
      userItem.innerHTML = `<div class="card"><ul><li>Name: <span class="name">${user.name}</span></li><li>UserName: <span class="name">${user.username}</span></li><li>Email: <span class="name">${user.email}</span></li><li><button onclick="deleteUser(this.id) type="submit" id=${user.id} class="btn btn-primary">Delete</button></li></ul></card>`;
      document.getElementById("listUsers").appendChild(userItem); //select html element -->  
    })
  }).catch(err => {
    console.log(err);
  })
}

/*Add event click to filter users*/
document.getElementById("filter").addEventListener("click", (e) => {
  e.preventDefault();
  let idUser = document.getElementById("idOfuser").value;
  if (idUser === "") { //validation
    alert("The input can not be empty. Please try again");
  }
  if (idUser > 10 || idUser < 1) {
    alert("Please enter a number between 1-10")
  } else {
    filterUsers(idUser);
  }
})

/*Delete user function*/
const deleteUser = (id) => {
  console.log(`deleting user with id of ${id}...`);
  currentId.push(listOfUsers[id - 1]);
  document.getElementById("listUsers").innerHTML = ""; // remove the list of users before to append the new one
  let newList = listWithoutDelete.filter(user => {
    return parseInt(user.id) !== parseInt(id);
  });
  newList.map(user => {
    let userItem = document.createElement('li'); //create the element
    userItem.innerHTML = `<div class="card"><ul><li>Name: <span class="name">${user.name}</span></li><li>UserName: <span class="name">${user.username}</span></li><li>Email: <span class="name">${user.email}</span></li><li><button onclick="deleteUser(this.id)" type="submit" id=${user.id} class="btn btn-primary">Delete</button></li></ul></card>`;
    document.getElementById("listUsers").appendChild(userItem); //select html element -->    
  });
  listWithoutDelete = newList;
}

/*Undo List*/
const undoList = () => {
  if (currentId.length === 0) {
    alert("You need to delete a user first")
  } else {
    document.getElementById("listUsers").innerHTML = ""; // remove the list of users before to append the new one
    let deletedUser = listOfUsers.filter(user => {
      return parseInt(user.id) === parseInt(currentId.at(-1).id);
    })
    let undoArr = [...deletedUser, ...listWithoutDelete];
    undoArr.map(user => {
      let userItem = document.createElement('li'); //create the element
      userItem.innerHTML = `<div class="card"><ul><li>Name: <span class="name">${user.name}</span></li><li>UserName: <span class="name">${user.username}</span></li><li>Email: <span class="name">${user.email}</span></li><li><button onclick="deleteUser(this.id)" type="submit" id=${user.id} class="btn btn-primary">Delete</button></li></ul></card>`;
      document.getElementById("listUsers").appendChild(userItem); //select html element -->    
    });
    currentId.pop();
    listWithoutDelete = undoArr;
  }

}

fetchUsers()
