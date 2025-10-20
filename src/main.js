import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';


const form = document.getElementById('search-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Упс',
      message: 'Введи ключове слово перед пошуком.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  setLoading(true);

  getImagesByQuery(query)
    .then(data => {
      const hits = data?.hits ?? [];

      if (hits.length === 0) {
        iziToast.info({
          title: 'Нічого не знайдено',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(hits);

      iziToast.success({
        title: 'Готово',
        message: `Знайдено: ${data.totalHits}. Показано: ${hits.length}.`,
        position: 'topRight',
        timeout: 2200,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Помилка',
        message: 'Проблема з мережею або API. Спробуй пізніше.',
        position: 'topRight',
      });
    })
    .finally(() => setLoading(false));
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) showLoader();
  else hideLoader();
}



