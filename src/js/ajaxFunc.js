export let ul;

function ajaxFunc() {
  const result = document.querySelector('.content');

  /* === retrieve data from server and build the contact list from JSON file === */

  window.addEventListener('load', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://demo.sibers.com/users');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 404) {
        console.log('Что-то пошло не так');
      } else {
        const users = xhr.response;
        // result.innerHTML = render(xhr.response);
        for (const user of users) {
          result.appendChild(createContactsDOM(user));
        }
      }
    });
  });


  /* === create dinamic li list contacts === */

  ul = document.querySelector('.list');
  function createContactsDOM(user) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const divHistory = document.createElement('div');
    const buttonHistory = document.createElement('button');

    buttonHistory.className = 'button';
    buttonHistory.textContent = 'Посмотреть историю аккаунта';
    divHistory.className = 'history';

    img.src = `${user.avatar}`;

    li.className = 'list__item';
    li.id = `${user.id}`;
    li.innerHTML = `<p><strong>Имя:</strong> ${user.name}</p>`;
    li.innerHTML += `<p><strong>Никнейм:</strong> ${user.username}</p>`;
    li.innerHTML += `<p><strong>Email:</strong> ${user.email}</p>`;
    li.innerHTML += `<p><strong>Адрес:</strong> ${user.address.streetA}</p>`;
    li.innerHTML += `<p><strong>Адрес2:</strong> ${user.address.streetB}</p>`;
    li.innerHTML += `<p><strong>Адрес3:</strong> ${user.address.streetC}</p>`;
    li.innerHTML += `<p><strong>Адрес4:</strong> ${user.address.streetD}</p>`;
    li.innerHTML += `<p><strong>Город:</strong> ${user.address.city}</p>`;
    li.innerHTML += `<p><strong>Cтрана:</strong> ${user.address.country}</p>`;
    li.innerHTML += `<p><strong>Индекс:</strong> ${user.address.zipcode}</p>`;

    for (const i in user.address.geo) {
      li.innerHTML += `<p><strong>${i}:</strong> ${user.address.geo[i]}</p>`;
    }

    li.innerHTML += `<p><strong>Телефон:</strong> ${user.phone}</p>`;
    li.innerHTML += `<p><strong>Cайт:</strong> ${user.website}</p>`;

    for (const i in user.company) {
      li.innerHTML += `<p> <strong>${i}:</strong> ${user.company[i]}</p>`;
    }

    for (let i = 0; i < user.posts.length; i++) {
      li.innerHTML += `<p><strong>Ключевые слова:</strong> ${user.posts[i].words}</p>`;
      li.innerHTML += `<p> ${user.posts[0].sentence}</p>`;
      li.innerHTML += `<p> ${user.posts[1].sentences}</p>`;
    }

    for (let j = 0; j < user.accountHistory.length; j++) {
      divHistory.innerHTML += `<p><strong>Сумма:</strong> ${user.accountHistory[j].amount}`;
      divHistory.innerHTML += `<p><strong>Дата:</strong> ${user.accountHistory[j].date}`;
      divHistory.innerHTML += `<p><strong>Бизнес:</strong> ${user.accountHistory[j].business}`;
      divHistory.innerHTML += `<p><strong>Название:</strong> ${user.accountHistory[j].name}`;
      divHistory.innerHTML += `<p><strong>Тип счета:</strong> ${user.accountHistory[j].type}`;
      divHistory.innerHTML += `<p><strong>Аккаунт:</strong> ${user.accountHistory[j].account}`;
    }


    const first = li.childNodes[0];
    li.insertBefore(img, first);
    li.appendChild(buttonHistory);
    li.appendChild(divHistory);
    ul.appendChild(li);


    /* === event click btn history === */

    buttonHistory.addEventListener('click', () => {
      divHistory.classList.toggle('show');
    });

    return ul;
  }


  let editingLi;

  /*= == event click on ul === */

  ul.onclick = function (e) {
    const target = e.target;
    if (target != ul) {
      if (target.className === 'edit-cancel') {
        finishLiEdit(editingLi.elem, false);
        return;
      }

      if (target.className === 'edit-ok') {
        finishLiEdit(editingLi.elem, true);
        return;
      }

      if (target.nodeName === 'LI') {
        if (editingLi) return;

        makeEditLi(target);
        return;
      }
      target = target.parentNode;
    }
  };

  /* === make edit our li list === */

  function makeEditLi(p) {
    editingLi = {
      elem: p,
      data: p.innerHTML,
    };

    p.classList.add('edit-li');

    const textArea = document.createElement('textarea');
    textArea.style.width = `${p.clientWidth}px`;
    textArea.style.height = `${p.clientHeight}px`;
    textArea.className = 'edit-area';

    textArea.value = p.innerHTML;
    p.innerHTML = '';
    p.appendChild(textArea);
    textArea.focus();

    p.insertAdjacentHTML('beforeEnd',
      '<div class="edit-controls"><button class="edit-ok">Oк</button><button class="edit-cancel">Отменить</button></div>');
  }


  /* === finish edit our li list === */

  function finishLiEdit(p, isOk) {
    if (isOk) {
      p.innerHTML = p.firstChild.value;
    } else {
      p.innerHTML = editingLi.data;
    }
    p.classList.remove('edit-li');
    editingLi = null;
  }
}

export {
  ajaxFunc,
};
