import { FC } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface IReview {
  name: string;
  location: string;
  date: string;
  text: string;
  rating: number;
}

const reviews: IReview[] = [
  {
    name: 'Anita Desai',
    location: 'Mumbai',
    date: 'November 2025',
    text: 'Amazing experience! The property was exactly as described and the host was very helpful. Would definitely recommend to anyone looking for a great stay.',
    rating: 5,
  },
  {
    name: 'Vikram Mehta',
    location: 'Delhi',
    date: 'October 2025',
    text: 'Great location, clean and comfortable. The host went above and beyond to make sure we had everything we needed. Would definitely book again!',
    rating: 5,
  },
];

const AppGuestReviews: FC = () => {
  return (
    <section className="my-16 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What our guests say
          </h2>
          <p className="text-lg text-gray-600">Real reviews from real travelers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">
                    {review.location} · {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppGuestReviews;

