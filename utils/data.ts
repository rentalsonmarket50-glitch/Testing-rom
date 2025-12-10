export const getExploreNearby = async () => {
  // Static data for Mohali nearby locations
  // Future me yeh dynamic ho jayega
  return [
    {
      location: 'Chandigarh',
      img: '/assets/explore-nearby/1to.webp',
      distance: '15 km away',
    },
    {
      location: 'Panchkula',
      img: '/assets/explore-nearby/2k3.webp',
      distance: '12 km away',
    },
    {
      location: 'Zirakpur',
      img: '/assets/explore-nearby/40m.webp',
      distance: '18 km away',
    },
    {
      location: 'Kharar',
      img: '/assets/explore-nearby/41m.webp',
      distance: '22 km away',
    },
    {
      location: 'Kurali',
      img: '/assets/explore-nearby/5j2.webp',
      distance: '28 km away',
    },
    {
      location: 'Rupnagar',
      img: '/assets/explore-nearby/kji.webp',
      distance: '42 km away',
    },
    {
      location: 'Patiala',
      img: '/assets/explore-nearby/msp.webp',
      distance: '65 km away',
    },
    {
      location: 'Ambala',
      img: '/assets/explore-nearby/ynx.webp',
      distance: '55 km away',
    },
  ];
};

export const getLiveAnywhere = async () => {
  const liveAnywhereResponse = await fetch(
    'https://firebasestorage.googleapis.com/v0/b/edwintantawi-25f09.appspot.com/o/airbnb-web-clone%2Flive-anywhere.json?alt=media'
  );
  return liveAnywhereResponse.json();
};

export const getSearch = async () => {
  // Static data for search results - Mohali/Chandigarh area listings
  // Future me yeh dynamic ho jayega based on location
  return [
    {
      id: '1',
      img: '/assets/search/013c9377-349f-418b-8d4c-15f923234a5f.webp',
      location: 'Sahibzada Ajit Singh Nagar',
      title: 'Room in Sahibzada Ajit Singh Nagar',
      description: 'BlueBliss(bath...',
      roomDetails: '1 king bed',
      star: '4.89',
      reviews: '103',
      price: '₹2,511/night',
      lat: 30.7046,
      long: 76.7179,
      checkIn: '20 Dec',
      checkOut: '25 Dec',
      isGuestFavourite: true,
    },
    {
      id: '2',
      img: '/assets/search/1379331e-593a-4c1e-af51-222808c85a11.webp',
      location: 'Chandigarh',
      title: 'Centrally located private room with a park view',
      description: 'Centrally located private room',
      roomDetails: '1 king bed',
      star: '4.97',
      reviews: '240',
      price: '₹2,397/night',
      lat: 30.7333,
      long: 76.7794,
      checkIn: '12 Dec',
      checkOut: '17 Dec',
      isGuestFavourite: true,
    },
    {
      id: '3',
      img: '/assets/search/2dd686bc-0195-40db-a37f-8b02476415b7.webp',
      location: 'Chandigarh',
      title: 'Apartment in Chandigarh',
      description: 'Subko Abode- RK with Mountain...',
      roomDetails: '1 bedroom 1 double bed',
      star: '5.0',
      reviews: '5',
      price: '₹2,876/night',
      lat: 30.7415,
      long: 76.7681,
      checkIn: '10 Dec',
      checkOut: '15 Dec',
      isGuestFavourite: false,
    },
    {
      id: '4',
      img: '/assets/search/44cb0de7-fa62-49e2-b4b8-68aed14373cb.webp',
      location: 'Panchkula',
      title: 'Room in Panchkula',
      description: 'Cozy room with modern amenities',
      roomDetails: '1 queen bed',
      star: '4.85',
      reviews: '87',
      price: '₹2,055/night',
      lat: 30.6942,
      long: 76.8616,
      checkIn: '18 Dec',
      checkOut: '23 Dec',
      isGuestFavourite: true,
    },
    {
      id: '5',
      img: '/assets/search/97bc37a6-9a1b-4bb2-8564-771319b246fb.webp',
      location: 'Zirakpur',
      title: 'Apartment in Zirakpur',
      description: 'Spacious apartment near highway',
      roomDetails: '2 bedrooms',
      star: '4.92',
      reviews: '156',
      price: '₹3,200/night',
      lat: 30.6422,
      long: 76.8172,
      checkIn: '15 Dec',
      checkOut: '20 Dec',
      isGuestFavourite: false,
    },
    {
      id: '6',
      img: '/assets/search/dde44668-1df5-41b6-8f91-5051975c4865.webp',
      location: 'Mohali',
      title: 'Room in Mohali',
      description: 'Comfortable stay near airport',
      roomDetails: '1 double bed',
      star: '4.78',
      reviews: '92',
      price: '₹1,898/night',
      lat: 30.7046,
      long: 76.7179,
      checkIn: '22 Dec',
      checkOut: '27 Dec',
      isGuestFavourite: true,
    },
  ];
};
