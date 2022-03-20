import '../pages/index.scss'

const searchForm = document.querySelector(".search__form");
const popup = document.querySelector(".popup");

const popupOpenButton = document.querySelector(".add-card__button");
const popupCloseButton = popup.querySelector(".popup__close-button");
const popupForm = popup.querySelector('.popup__container');
const popupRadio = popup.querySelectorAll(".popup__radio-item");
const popupName = popup.querySelector(".popup__input-text_type_name");
const popupLink = popup.querySelector(".popup__input-text_type_link");
const popupDescription = popup.querySelector(".popup__input-text_type_description");
const popupOldPrice = popup.querySelector(".popup__input-text_type_old-price");
const popupNewPrice = popup.querySelector(".popup__input-text_type_new-price");
const popupStars = popup.querySelectorAll(".popup__star");
const popupRatingRadio = popup.querySelector(".popup__rating-radio");

const templateCard = document.querySelector("#template-card").content.querySelector(".card");
const cards = document.querySelector(".cards");
const cardLink = cards.querySelectorAll(".card__link");


const dropdownCategoryButton = document.querySelector(".search__category");
const dropdownCategoryItems = document.querySelector(".search__category-dropdown");
const dropdownCategoryArrow = dropdownCategoryButton.querySelector(".search__select-icon");

const dropdownSortButton = document.querySelector(".search__sort")
const dropdownSortItems = document.querySelector(".search__sort-dropdown");
const dropdownSortArrow = dropdownSortButton.querySelector(".search__select-icon");

const faqItemList = document.querySelectorAll(".faq__item");

function clearStarRating(stars) {
  stars.forEach((item) => {
    item.classList.remove("popup__star_type_active");
    item.classList.remove("popup__star_type_half");
  })
}

function setStarRating(rating, stars) {
  clearStarRating(stars);
  stars.forEach((item, index) => {
    if (index < Math.floor(rating / 2)) {
      item.classList.add("popup__star_type_active");
    } else if (rating % 2 == 1 && index == Math.floor(rating / 2)) {
      item.classList.add("popup__star_type_half");
    }
  })
}

function createCard(radio, name, link, description, oldPrice, newPrice, rating) {
  const cardElement = templateCard.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");
  const cardBadge = cardElement.querySelector(".card__badge");
  const cardDescription = cardElement.querySelector(".card__description");
  const cardOldPrice = cardElement.querySelector(".card__old-price");
  const cardNewPrice = cardElement.querySelector(".card__new-price");
  const cardSale = cardElement.querySelector(".card__sale");
  const cardContainer = cardElement.querySelector(".card__link");
  const cardStar = cardElement.querySelectorAll(".card__star");
  cardImage.src = link.value;
  cardImage.alt = name.value;
  cardName.textContent = name.value;
  radio.forEach((item) => {
    if (item.checked) {
      cardBadge.classList.add("card__badge_type_" + item.id);
      cardBadge.textContent = item.value;
    }
  });
  cardDescription.textContent = description.value;
  if (newPrice.value) {
    cardNewPrice.textContent = "$" + newPrice.value;
    if (oldPrice.value) {
      cardOldPrice.textContent = "$" + oldPrice.value;
      cardOldPrice.classList.add("card__old-price_active");
      cardSale.textContent = "-" + Math.round(parseInt(newPrice.value) / parseInt(oldPrice.value) * 100) + "%";
      cardSale.classList.add("card__sale_active");
    }
  }
  cardStar.forEach((item, index) => {
    if (index < Math.floor(rating / 2)) {
      item.classList.add("card__star_type_active");
    } else if (rating % 2 == 1 && index == Math.floor(rating / 2)) {
      item.classList.add("card__star_type_half");
    }
  })

  cardContainer.addEventListener('mouseenter', () => {
    cardContainer.querySelector(".card__close").classList.add("card__close_opened");
  })
  cardContainer.addEventListener('mouseleave', () => {
    cardContainer.querySelector(".card__close").classList.remove("card__close_opened");
  })

  return cardElement;
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

function openPopup(popup) {
  popup.classList.add("popup__opened");
}

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
})

popupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const popupRatingItem = Array.from(popup.querySelectorAll(".popup__rating-item"));
  const popupRatingValue = popupRatingItem.find((item) => item.checked).value;
  const cardElement = createCard(popupRadio, popupName, popupLink, popupDescription, popupOldPrice, popupNewPrice, popupRatingValue);
  const cardFirst = cards.querySelector(".card");
  popupRatingItem[0].checked = true;
  clearStarRating(popupStars);
  popupName.value = '';
  popupLink.value = '';
  popupDescription.value = '';
  popupOldPrice.value = '';
  popupNewPrice.value = '';
  cards.insertBefore(cardElement, cardFirst);
  closePopup(popup)
})

popupRatingRadio.addEventListener('click', () => {
  const popupRatingItem = Array.from(popup.querySelectorAll(".popup__rating-item"));
  const popupRatingValue = popupRatingItem.find((item) => item.checked).value;
  setStarRating(popupRatingValue, popupStars);
})

popupOpenButton.addEventListener('click', () => {
  openPopup(popup);
})

popupCloseButton.addEventListener('click', () => {
  closePopup(popup);
})

dropdownCategoryButton.addEventListener('click', () => {
  dropdownCategoryArrow.classList.toggle("search__select-icon_active")
  dropdownCategoryItems.classList.toggle("dropdown__items_opened");
})

document.addEventListener('click', (evt) => {
  let withinItems = evt.composedPath().includes(dropdownCategoryItems);
  let withinButton = evt.composedPath().includes(dropdownCategoryButton);
  if (!withinItems && !withinButton) {
    dropdownCategoryArrow.classList.remove("search__select-icon_active")
    dropdownCategoryItems.classList.remove("dropdown__items_opened");
  }
  withinItems = evt.composedPath().includes(dropdownSortItems);
  withinButton = evt.composedPath().includes(dropdownSortButton);
  if (!withinItems && !withinButton) {
    dropdownSortArrow.classList.remove("search__select-icon_active")
    dropdownSortItems.classList.remove("dropdown__items_opened");
  }
})

dropdownSortButton.addEventListener('click', () => {
  dropdownSortArrow.classList.toggle("search__select-icon_active")
  dropdownSortItems.classList.toggle("dropdown__items_opened");
})
cardLink.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.querySelector(".card__close").classList.add("card__close_opened");
  })
  item.addEventListener('mouseleave', () => {
    item.querySelector(".card__close").classList.remove("card__close_opened");
  })
})

faqItemList.forEach((item) => {
  const faqButton = item.querySelector(".faq__button");
  const faqContent = item.querySelector(".faq__content");
  faqButton.addEventListener('click', () => {
    faqButton.classList.toggle("faq__button_active");
    faqContent.classList.toggle("faq__content_active");
  })
})