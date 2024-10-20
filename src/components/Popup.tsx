import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
  rating: number;
  comment: string;
}

function Popup() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab.url?.includes('chrome.google.com/webstore/detail')) {
        chrome.tabs.sendMessage(currentTab.id!, { action: 'getReviews' }, (response) => {
          setReviews(response.reviews);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="w-96 p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Review Analysis</h1>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border-b pb-2">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No reviews found or not on a Chrome Web Store page.</p>
      )}
    </div>
  );
}

export default Popup;