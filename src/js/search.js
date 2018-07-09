import { ul } from './addRow';

function search() {
  const input = document.querySelector('.search__filter');
  input.addEventListener('input', () => {
    const { value } = input;

    for (const user of ul.children) {
      if (user.textContent.includes(value)) {
        user.classList.remove('hidden');
      } else {
        user.classList.add('hidden');
      }
    }
  });
}

export {
  search,
};
