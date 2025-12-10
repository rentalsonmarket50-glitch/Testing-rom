'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface IReview {
  name: string;
  location: string;
  date: string;
  text: string;
  role?: string;
}

const reviews: IReview[] = [
  {
    name: 'Anita Desai',
    location: 'Mumbai',
    date: 'November 2025',
    text: 'Amazing experience! The property was exactly as described and the host was very helpful. Would definitely recommend to anyone looking for a great stay.',
    role: 'Traveler',
  },
  {
    name: 'Vikram Mehta',
    location: 'Delhi',
    date: 'October 2025',
    text: 'Great location, clean and comfortable. The host went above and beyond to make sure we had everything we needed. Would definitely book again!',
    role: 'Business Traveler',
  },
  {
    name: 'Priya Sharma',
    location: 'Bangalore',
    date: 'September 2025',
    text: 'Perfect stay for our family vacation. The property was spacious, well-maintained, and had all the amenities we needed. Highly recommended!',
    role: 'Family Traveler',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Pune',
    date: 'August 2025',
    text: 'Excellent service and beautiful property. The location was perfect and the host was very accommodating. Will definitely return!',
    role: 'Traveler',
  },
];

const AppGuestReviews: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  return (
    <section className="relative z-10 py-16 bg-[#8a6bff] overflow-hidden">
      <div className="container">
        {/* Title Section */}
        <div className="mb-12 pb-4 relative">
          <div className="absolute left-0 bottom-0 w-24 h-1 bg-white"></div>
          <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-2">
            What our guests say
          </h2>
          <p className="text-lg text-white">Real reviews from real travelers</p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-5 md:px-10">
          <div
            ref={scrollContainerRef}
            className="flex gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(50%-24px)] snap-center"
              >
                {/* Single Testimonial Card */}
                <div className="relative border-4 border-white rounded-[45px] bg-transparent text-center">
                  {/* Decorative Rounds */}
                  <div className="absolute -left-9 -top-9 w-32 h-24 bg-[#8a6bff] rounded-br-[50px] z-0">
                    <div className="absolute left-[88px] -top-1 w-12 h-1 bg-white rounded-full"></div>
                    <div className="absolute -left-1 top-[62px] w-1 h-12 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -right-9 -bottom-9 w-32 h-24 bg-[#8a6bff] rounded-tl-[50px] z-0">
                    <div className="absolute right-[88px] -bottom-1 w-12 h-1 bg-white rounded-full z-10"></div>
                    <div className="absolute -right-1 -bottom-[62px] w-1 h-12 bg-white rounded-full z-10"></div>
                  </div>

                  {/* Quote Icons */}
                  <div
                    className="absolute -left-9 -top-9 w-32 h-24 bg-[#8a6bff] z-0"
                    style={{
                      backgroundImage:
                        'url(https://cdn-icons-png.flaticon.com/512/4338/4338294.png)',
                      backgroundSize: '60%',
                      backgroundPosition: '34px 15px',
                      backgroundRepeat: 'no-repeat',
                      transform: 'rotate(180deg)',
                      filter: 'invert(1)',
                    }}
                  ></div>
                  <div
                    className="absolute -right-9 -bottom-9 w-32 h-24 bg-[#8a6bff] z-0"
                    style={{
                      backgroundImage:
                        'url(https://cdn-icons-png.flaticon.com/512/4338/4338294.png)',
                      backgroundSize: '60%',
                      backgroundPosition: '34px 19px',
                      backgroundRepeat: 'no-repeat',
                      filter: 'invert(1)',
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 px-12 pt-12 pb-8">
                    <p className="text-white text-sm md:text-base leading-6 mb-8">
                      {review.text}
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center justify-center gap-4 pb-12">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/8029/8029490.png"
                          alt="Video icon"
                          width={24}
                          height={24}
                          className="invert"
                        />
                      </div>
                      <div className="text-left">
                        <h6 className="text-white font-bold text-lg">{review.name}</h6>
                        <span className="text-white text-xs">
                          {review.role || review.location} · {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === index
                  ? 'w-8 bg-white'
                  : 'w-2.5 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default AppGuestReviews;
