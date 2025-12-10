import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// components
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppFooter from '@/components/atoms/AppFooter';
import AppMap from '@/components/atoms/AppMap';
// icons
import { StarIcon } from '@heroicons/react/24/solid';
import {
  HeartIcon,
  ShareIcon,
  WifiIcon,
  TvIcon,
  HomeIcon,
  LockClosedIcon,
  FireIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// Mock data - future me API se aayega
const getListingData = (id: string) => {
  return {
    id: id,
    title: 'Centrally located private room with a park view',
    location: 'Room in Chandigarh, India',
    rating: 4.97,
    reviews: 240,
    isGuestFavourite: true,
    host: {
      name: 'Paramjit',
      avatar: '/assets/hero.jpg',
      isSuperhost: true,
      hostingSince: '2 years hosting',
      rating: 4.9,
      hostReviews: 577,
      responseTime: 'within an hour',
    },
    price: 2397,
    images: [
      '/assets/search/1379331e-593a-4c1e-af51-222808c85a11.webp',
      '/assets/search/013c9377-349f-418b-8d4c-15f923234a5f.webp',
      '/assets/search/2dd686bc-0195-40db-a37f-8b02476415b7.webp',
      '/assets/search/44cb0de7-fa62-49e2-b4b8-68aed14373cb.webp',
      '/assets/search/97bc37a6-9a1b-4bb2-8564-771319b246fb.webp',
    ],
    description:
      'This centrally located private room offers a comfortable stay with a beautiful park view. The room features modern amenities, a comfortable king-size bed, and easy access to the city center. Perfect for solo travelers or couples looking for a peaceful yet convenient location.',
    features: [
      { icon: 'keypad', text: 'Self check-in', subtext: '95% 5-star rating' },
      { icon: 'location', text: 'Great location', subtext: '95% 5-star rating' },
      { icon: 'cancel', text: 'Free cancellation', subtext: 'Before Dec 10' },
    ],
    bedroom: {
      image: '/assets/search/1379331e-593a-4c1e-af51-222808c85a11.webp',
      name: 'Bedroom',
      beds: '1 king bed',
    },
    amenities: [
      { icon: LockClosedIcon, text: 'Lock on bedroom door' },
      { icon: HomeIcon, text: 'Garden view' },
      { icon: WifiIcon, text: 'Free Wi-Fi' },
      { icon: HomeIcon, text: 'Kitchen' },
      { icon: TvIcon, text: 'TV' },
      { icon: ShieldCheckIcon, text: 'Smoke alarm' },
      { icon: FireIcon, text: 'Heating' },
      { icon: HomeIcon, text: 'Washer' },
    ],
    totalAmenities: 43,
    coordinates: {
      lat: 30.7333,
      long: 76.7794,
    },
    neighborhood:
      'Chandigarh is known for its well-planned architecture and beautiful gardens. This location is close to major attractions, shopping centers, and restaurants. The area is safe, clean, and perfect for both short and long stays.',
    houseRules: [
      'Check-in: After 3:00 PM',
      'Checkout: 11:00 AM',
      'Self check-in with keypad',
      'No smoking',
      'No pets',
      'No parties or events',
    ],
    healthSafety: [
      'Carbon monoxide alarm',
      'Smoke alarm',
      'Security camera/recording device',
      'No contact check-in',
    ],
    cancellationPolicy:
      'Free cancellation for 48 hours. After that, cancel before 3:00 PM on Dec 10 for a partial refund.',
    reviewBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 5.0,
      location: 5.0,
      checkin: 5.0,
      value: 4.9,
    },
    sampleReviews: [
      {
        name: 'Sarah',
        avatar: '/assets/hero.jpg',
        date: 'December 2023',
        rating: 5,
        text: 'Great location and very clean room. The host was very responsive and helpful. Would definitely stay again!',
      },
      {
        name: 'Michael',
        avatar: '/assets/hero.jpg',
        date: 'November 2023',
        rating: 5,
        text: 'Perfect stay! The room was exactly as described and the park view was beautiful. Highly recommend!',
      },
    ],
  };
};

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkIn, setCheckIn] = useState('Dec 12, 2025');
  const [checkOut, setCheckOut] = useState('Dec 17, 2025');
  const [guests, setGuests] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!id) return null;

  const listing = getListingData(id as string);
  const nights = 5; // Calculate based on dates
  const totalPrice = listing.price * nights;
  const serviceFee = Math.round(totalPrice * 0.14);
  const cleaningFee = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + serviceFee + cleaningFee;

  return (
    <div className="min-h-screen bg-white">
      <AppHead />
      <AppHeader />

      {/* Image Gallery */}
      <div className="mt-[86px] px-4 md:px-8 lg:px-16 py-6">
        <div className="grid grid-cols-4 gap-2 h-[400px] md:h-[600px]">
          {/* Main Image */}
          <div className="col-span-4 md:col-span-2 row-span-2 relative rounded-l-2xl overflow-hidden">
            <Image
              src={listing.images[selectedImage]}
              alt={listing.title}
              fill
              style={{ objectFit: 'cover' }}
              className="cursor-pointer"
              onClick={() => {
                // Open full gallery
              }}
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
            >
              <HeartIcon
                className={`h-6 w-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                }`}
              />
            </button>
            <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-10">
              <ShareIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Thumbnail Images */}
          {listing.images.slice(1, 5).map((img, index) => (
            <div
              key={index}
              className="relative rounded-r-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(index + 1)}
            >
              <Image
                src={img}
                alt={`${listing.title} ${index + 2}`}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:opacity-80 transition-opacity"
              />
            </div>
          ))}

          {/* Show all photos button */}
          <button className="absolute bottom-6 right-6 px-4 py-2 bg-white rounded-lg shadow-lg font-medium text-sm hover:bg-gray-50 z-10">
            Show all {listing.images.length} photos
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Title and Location */}
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{listing.title}</h1>
              <p className="text-base text-gray-600">{listing.location}</p>
            </div>

            {/* Guest Favourite Badge */}
            {listing.isGuestFavourite && (
              <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-semibold text-gray-900">Guest favourite</div>
                  <div className="text-sm text-gray-600">
                    One of the most loved homes on Airbnb, according to guests
                  </div>
                </div>
              </div>
            )}

            {/* Rating and Host Info */}
            <div className="flex items-center justify-between border-b pb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-black" />
                  <span className="font-semibold">{listing.rating}</span>
                  <span className="text-gray-600">({listing.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={listing.host.avatar}
                      alt={listing.host.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Hosted by {listing.host.name}</div>
                    <div className="text-sm text-gray-600">
                      {listing.host.hostingSince}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
              {listing.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-2xl">
                    {feature.icon === 'keypad' && '🔑'}
                    {feature.icon === 'location' && '📍'}
                    {feature.icon === 'cancel' && '✓'}
                  </div>
                  <div>
                    <div className="font-semibold">{feature.text}</div>
                    <div className="text-sm text-gray-600">{feature.subtext}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-b pb-6">
              <p className="text-base text-gray-700 leading-relaxed">
                {listing.description}
              </p>
              <button className="mt-2 font-semibold underline">Show more</button>
            </div>

            {/* Where you'll sleep */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Where you&apos;ll sleep</h2>
              <div className="border rounded-xl p-4 max-w-xs">
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={listing.bedroom.image}
                    alt={listing.bedroom.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="font-semibold">{listing.bedroom.name}</div>
                <div className="text-sm text-gray-600">{listing.bedroom.beds}</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {(showAllAmenities
                  ? listing.amenities
                  : listing.amenities.slice(0, 8)
                ).map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-gray-700" />
                      <span className="text-base">{amenity.text}</span>
                    </div>
                  );
                })}
              </div>
              {!showAllAmenities && (
                <button
                  onClick={() => setShowAllAmenities(true)}
                  className="mt-4 font-semibold underline"
                >
                  Show all {listing.totalAmenities} amenities
                </button>
              )}
            </div>

            {/* Calendar */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">5 nights in Chandigarh</h2>
              <div className="text-sm text-gray-600">
                Calendar view would go here (Dec 10 - Dec 15 highlighted)
              </div>
            </div>

            {/* Reviews */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-6 w-6 text-black" />
                  <span className="text-2xl font-semibold">{listing.rating}</span>
                  <span className="text-gray-600">({listing.reviews} reviews)</span>
                </div>
                {listing.isGuestFavourite && (
                  <div className="px-3 py-1 bg-amber-100 rounded-full text-sm font-semibold">
                    Guest favourite
                  </div>
                )}
              </div>

              {/* Review Breakdown */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(listing.reviewBreakdown).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {(showAllReviews
                  ? listing.sampleReviews
                  : listing.sampleReviews.slice(0, 2)
                ).map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-gray-600">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-black fill-black' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                    <button className="mt-2 font-semibold underline">Show more</button>
                  </div>
                ))}
              </div>
              {!showAllReviews && (
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="mt-4 font-semibold underline"
                >
                  Show all {listing.reviews} reviews
                </button>
              )}
            </div>

            {/* Map */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Where you&apos;ll be</h2>
              <div className="h-96 rounded-xl overflow-hidden">
                <AppMap
                  center={{
                    lat: listing.coordinates?.lat,
                    long: listing.coordinates?.long,
                  }}
                />
              </div>
              <p className="mt-4 text-base font-semibold">Chandigarh, India</p>
            </div>

            {/* Neighborhood */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Neighbourhood highlights</h2>
              <p className="text-base text-gray-700 leading-relaxed">
                {listing.neighborhood}
              </p>
              <button className="mt-2 font-semibold underline">Show more</button>
            </div>

            {/* Host */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{listing.host.name}</span>
                    {listing.host.isSuperhost && (
                      <span className="px-2 py-1 bg-amber-100 rounded text-xs font-semibold">
                        Superhost
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <StarIcon className="h-4 w-4 text-black" />
                    <span className="font-semibold">{listing.host.rating}</span>
                    <span className="text-gray-600">
                      ({listing.host.hostReviews} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Response time: {listing.host.responseTime}
                  </div>
                  <button className="px-6 py-3 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50">
                    Message {listing.host.name}
                  </button>
                </div>
              </div>
            </div>

            {/* Things to know */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Things to know</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">House rules</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {listing.houseRules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                  <button className="mt-3 font-semibold underline text-sm">
                    Show more
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Health & safety</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {listing.healthSafety.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <button className="mt-3 font-semibold underline text-sm">
                    Show more
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Cancellation policy</h3>
                  <p className="text-sm text-gray-700">{listing.cancellationPolicy}</p>
                  <button className="mt-3 font-semibold underline text-sm">
                    Show more
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:sticky lg:top-[86px] lg:h-[calc(100vh-86px)]">
            <div className="border rounded-2xl p-6 shadow-lg lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-semibold">
                    ₹{finalTotal.toLocaleString('en-IN')}{' '}
                    <span className="text-base font-normal">total</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <StarIcon className="h-4 w-4 text-black" />
                    <span className="font-semibold">{listing.rating}</span>
                    <span className="text-gray-600 text-sm">({listing.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-2 border rounded-lg">
                  <div className="p-3 border-r">
                    <div className="text-xs font-semibold uppercase mb-1">Check-in</div>
                    <div className="text-sm">{checkIn}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-semibold uppercase mb-1">Check-out</div>
                    <div className="text-sm">{checkOut}</div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-xs font-semibold uppercase mb-1">Guests</div>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-colors mb-2">
                Reserve
              </button>
              <p className="text-center text-sm text-gray-600 mb-4">
                You won&apos;t be charged yet
              </p>

              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span>
                    ₹{listing.price.toLocaleString('en-IN')} x {nights} nights
                  </span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>₹{serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-3">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/"
                className="block text-center text-sm text-gray-600 mt-4 underline"
              >
                Report this listing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default ListingDetail;
