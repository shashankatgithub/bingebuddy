/**
 * SwipeHandler.js
 */

/**
 * Handle the swipe right gesture.
 * @param {Object} cardData - The data of the card being swiped.
 */

import { addToAlreadyWatched, addToDislikes, addToLikes, addToWatchlist } from "@/src/state/userSlice";

export const handleSwipeRight = (cardData, dispatch) => {
  console.log("Swiped right on card:", cardData["title"]);
  dispatch(addToLikes(cardData));
};

/**
 * Handle the swipe left gesture.
 * @param {Object} cardData - The data of the card being swiped.
 */
export const handleSwipeLeft = (cardData, dispatch) => {
  console.log("Swiped left on card:", cardData["title"]);
  dispatch(addToDislikes(cardData));
};

/**
 * Handle the swipe up gesture.
 * @param {Object} cardData - The data of the card being swiped.
 */
export const handleSwipeUp = (cardData, dispatch) => {
  console.log("Swiped up on card:", cardData["title"]);
  dispatch(addToAlreadyWatched(cardData));
};
