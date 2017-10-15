document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('getPost').addEventListener('click', makeVisible);

document.getElementById('addPost').addEventListener('submit', addPost);

// function with fetch to get info from text file
function getText() {
    fetch('test.txt')
        .then(response => response.text())
        .then((data) => {
            document.getElementById('output').innerHTML = data;
        })
}

// function with fetch for getting json with users from API
function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            let output = '<h1> Users </h1>';
            data.forEach(user => {
                output += `
                <div class="mb-3">
                    <ul class="list-group">
                          <li class="list-group-item">ID: ${user.id}</li>
                          <li class="list-group-item">Name: ${user.name}</li>
                          <li class="list-group-item">Nick Name: ${user.username}</li>
                    </ul>
                </div>                
            `;
            });
            document.getElementById('output').innerHTML = output;
        })
}

// function with fetch for getting json with posts from API
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            let postsList = '<h2> Posts </h2>';
            data.forEach(post => {
                postsList += `
              <div class="card mb-3">
                <div class="card-header text-center">
                  ${post.title}
                </div>
                <div class="card-block">                  
                  <div class="card-body">
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="card-link">User id: ${post.userId}</a>
                  </div>
                </div>
              </div> 
            `;
            });
            document.getElementById('output').innerHTML = postsList;
        });
}

// function with fetch for POST method
function addPost(e) {
    e.preventDefault();

    let title = document.getElementById('title').value,
        body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title: title, body: body})
        })
        .then((res) => {
            if (!res.ok) {
                throw res.statusText;
            }
            return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.error(err.message));
}

// make visible
function makeVisible(e) {
    let form = document.getElementById('addPost');
    form.classList.toggle('visible');

}