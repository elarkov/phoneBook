function save() {
  /*= == sava data in the Local Storage === */

  const btnSave = document.querySelector('.btn__save');
  const storage = localStorage;
  const objSelectedContacts = {};

  btnSave.addEventListener('click', () => {
    console.log('done');
    const liArray = document.querySelectorAll('.list li');
    for (let i = 0; i < liArray.length; i++) {
      objSelectedContacts[i] = liArray[i].getAttribute('id');
    }

    storage.data = JSON.stringify(objSelectedContacts);
    alert('Сохранено');
  });

  window.addEventListener('load', () => {
    if (localStorage.data) {
      const data = JSON.parse(storage.data || {});
      storage.data = data;
    }
  });
}

export {
  save,
};
