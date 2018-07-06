import render from '../templates/content.hbs';

function func() {
  //const button = document.querySelector('.button');
  const result = document.querySelector('.content');

  window.addEventListener('load', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://demo.sibers.com/users');
    xhr.send();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 404) {
        console.log('Что-то пошло не так');
      } else {
        const users = JSON.parse(xhr.responseText);
        console.log(users);
        // result.innerHTML = render(xhr.response);
        for (const user of users) {
          result.appendChild(createUsers(user));
        }
      }
    });
  });

  function createUsers(user) {
    const li = document.createElement('li');
    li.className = 'users';
    li.textContent = `${user.name}`;
    return li;
  }
}

export {
  func,
};
