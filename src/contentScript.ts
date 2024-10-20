function extractReviews(): { rating: number; comment: string }[] {
  const reviewElements = document.querySelectorAll('.ba-bc-Xb');
  return Array.from(reviewElements).map((element) => {
    const ratingElement = element.querySelector('.rsw-stars');
    const rating = ratingElement ? parseInt(ratingElement.getAttribute('title')!.split(' ')[0]) : 0;
    const commentElement = element.querySelector('.ba-bc-Yb-d');
    const comment = commentElement ? commentElement.textContent!.trim() : '';
    return { rating, comment };
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getReviews') {
    const reviews = extractReviews();
    sendResponse({ reviews });
  }
});

export {};