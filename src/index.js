import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';

import axiosPhoto from './axiosPhoto';

new SimpleLightbox('.some-element a', {
  /* options */
});
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputEl = document.querySelector('#search-form input');
const spanEl = document.querySelector('#search-form span');
const buttonEl = document.querySelector('#search-form button');
const divEl = document.querySelector('.gallery');
const bodyEl = document.querySelector('body');
console.log(bodyEl);
const formEl = document.querySelector('#search-form');
buttonEl.classList.add('disabled');
bodyEl.classList.add('body_class');
let valuesString = '';

const DEBOUNCE_DELAY = 300;
let namberPer_page = 40;
let namberPage = 1;
let dataTotal = 0;
let datatotalHits = 0;
let pageTotal = 0;

const articleElement = articls => {
  return articls
    .map(
      ({
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        popularity,
        backdrop_path,
        release_date,
        title,
        vote_average,
        vote_count,
      }) => {
        //if (articls.length === 1) {
        return `
         
    <div class="photo-card">
  <a class="gallery__item" href="${backdrop_path}">
  <img class="gallery__image" src="${poster_path}" alt="${original_title}" title="${title}" width="360" height="294"loading="lazy" />
 </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span> ${popularity} </span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${vote_average}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${release_date}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${vote_count}</span>
    </p>
  </div>
  
</div> `;
      }
    )
    .join('');
};

const onInput = event => {
  event.preventDefault();

  console.log(event.target.value.length);
  const valuelongth = event.target.value.length;
  valuesString = event.target.value;
  let element = '';
  for (let index = 0; index < valuelongth; index++) {
    element = element + ' ';
  }
  //console.log(event.target.value === element);

  if (valuesString === element) return (valuesString = '');
  else {
    // console.log(valuesString);
    buttonEl.classList.remove('disabled');
    buttonEl.textContent = 'Search';
    valuesString = valuesString.trim();
    // console.log(valuesString);
    namberPage = 1;
    // console.log(namberPage);
    // return valuesString;
  }
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
//inputEl.addEventListener('input', onInput);

const searchPhoto = async event => {
  try {
    event.preventDefault();
    //console.log(event.currentTarget.elements[0]);

    //const {
    //  elements: { searchQuery },
    //} = event.currentTarget;
    if (valuesString === '') {
      return alert(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }

    // console.log(valuesString);
    const res = await axiosPhoto(valuesString, namberPage, namberPer_page);
    //res =>
    //{
    console.log(res);
    const articls = res.data.results;
    console.log(articls);
    //dataTotal = res.data.total_results;
    //console.log(dataTotal);
    datatotalHits = res.data.total_results;
    console.log(datatotalHits);
    // if (dataTotal > datatotalHits) {
    //   pageTotal = Math.ceil(datatotalHits / namberPer_page);
    // } else {
    //   pageTotal = Math.ceil(dataTotal / namberPer_page);
    // }
    pageTotal = res.data.total_pages;
    console.log(pageTotal);
    if (datatotalHits === 0) {
      // divEl.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      //if (articls.status === 404) {
      //  divEl.innerHTML = '';
      //  Notiflix.Notify.failure(
      //    '"Sorry, there are no images matching your search query. Please try again."'
      //  );
      return;
    } else {
      if (namberPage === 1) {
        spanEl.classList.add('input_box');
        buttonEl.classList.add('btn_class');
        inputEl.classList.add('input_class');
        //divEl.innerHTML = '';
        Notiflix.Notify.info(`Hooray! We found ${datatotalHits} images.`);
        divEl.innerHTML = articleElement(articls);
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox', function () {});
      } else {
        // const divAddEl = document.querySelector('.photo-card');
        divEl.insertAdjacentHTML('beforeend', articleElement(articls));
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox', function () {});
      }
      if (pageTotal === namberPage) {
        buttonEl.classList.add('disabled');
        spanEl.classList.remove('input_box');
        buttonEl.classList.remove('btn_class');
        inputEl.classList.remove('input_class');
        buttonEl.textContent = 'submit';
        //buttonEl.textContent = 'Search';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        buttonEl.textContent = 'next page ?';
        let resM = pageTotal - namberPage;
        Notiflix.Notify.info(`You can also view ${resM} pages`);
        namberPage = namberPage + 1;
        // console.log(namberPage);
      }
    }
  } catch (error) {
    console.log(error.message);
    spanEl.classList.remove('input_box');
    inputEl.classList.remove('input_class');
    buttonEl.classList.remove('btn_class');
    divEl.innerHTML = '';
  }
};

formEl.addEventListener('submit', searchPhoto);

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {});
