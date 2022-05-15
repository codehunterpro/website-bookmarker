const showModal = document.getElementById('show-modal');
const modal = document.getElementById('modal-container');
const modalForm = document.querySelector('.modal-form');
const overlay = document.querySelector('.overlay');
const closeModal = document.getElementById('close-modal');
const websiteNameEl = document.getElementById('website-name');
const websiteURLel = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-container');
const submitBtn = document.querySelector('button');
const closebookmark = document.querySelectorAll('i');

// Store data in lacal Storage
let bookmarks = [];

// Show form
function showForm() {
  modal.hidden = false;
  overlay.hidden = false;
  websiteNameEl.focus();
}
//hide form
function hideForm() {
  modal.hidden = true;
  overlay.hidden = true;
}

// urlValidation
function urlValidation(name, url) {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  const regex = new RegExp(expression);
  if (!name || !url) {
    alert('Please be sure both fields are fill-up');
    return false;
  }
  if (!url.match(regex)) {
    alert('be sure filled a valid URL :)');
    return false;
  }

  return true;
}

//fetching bookmark object
function fetchBookmark() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
}

// update bookmarkDOM
function bookmarkDOM() {
  bookmarks.forEach(data => {
    const html = `   <div class="item">
    <i
      class="fa-solid fa-circle-xmark"
      title="delete this bookmark"
    ></i>
    <img
      src="https://www.google.com/s2/u/0/favicons?domain=${data.url}"
      alt=""
    />
    <a href="${data.url}" target="_blank">${data.name}</a>
  </div>`;
    bookmarkContainer.insertAdjacentHTML('afterbegin', html);
  });
}

// delete bookmark function
function deleteBookmark(e) {
  const icon = e.target.closest('i');
  if (!icon) return;
  const item = icon.parentElement.children[2].textContent;
  if (!item) return;
  console.log(item);

  const Index = bookmarks.findIndex(arr => arr.name == item);
  console.log(Index);
  bookmarks.splice(Index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmark();
  window.location.reload();
}

//get value from form
function getValue(e) {
  e.preventDefault();
  const webName = websiteNameEl.value;
  let webURL = websiteURLel.value;
  if (!webURL.includes('https://', 'http://')) {
    webURL = `https://${webURL}`;
  }

  if (!urlValidation(webName, webURL)) {
    return false;
  }

  const bookmark = {
    name: webName,
    url: webURL,
  };

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  websiteNameEl.value = websiteURLel.value = '';
  hideForm();
  window.location.reload();
}

showModal.addEventListener('click', showForm);
closeModal.addEventListener('click', hideForm);
overlay.addEventListener('click', hideForm);
modalForm.addEventListener('submit', getValue);
bookmarkContainer.addEventListener('click', deleteBookmark);
// onload
fetchBookmark();
bookmarkDOM();
