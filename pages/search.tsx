import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Marker } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';
// components
import AppFooter from '@/components/atoms/AppFooter';
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppPlaceCard from '@/components/atoms/AppPlaceCard';
import AppMap from '@/components/atoms/AppMap';
// utils
import { formatGuests, formatRangeDate } from 'utils';
// icons
import { MapIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getSearch } from 'utils/data';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const query = router.query;
  const [visibleMapButton, setVisibleMapButton] = useState<boolean>(true);
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const [isFullMap, setIsFullMap] = useState<boolean>(false);
  const [map, setMap] = useState<boolean>(false);
  // data
  const [location, setLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date>(null);
  const [checkOut, setCheckOut] = useState<Date>(null);
  const [guests, setGuests] = useState<Object>();

  useEffect(() => {
    setLocation(query.location?.toString());
    if (query.checkIn) setCheckIn(new Date(query.checkIn?.toString()));
    if (query.checkOut) setCheckOut(new Date(query.checkOut?.toString()));
    if (query.guests) setGuests(JSON.parse(query.guests?.toString()));
  }, [query]);

  useEffect(() => {
    const handleOnScroll = () => {
      const position = window.scrollY;
      position > currentScroll ? setVisibleMapButton(false) : setVisibleMapButton(true);
      setCurrentScroll(position);
    };
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  });

  const getGuests = (guests) => {
    const totalGuests = formatGuests(guests, { noInfants: true });
    if (totalGuests) return `• ${totalGuests}`;
  };

  const getDates = (startDate, endDate) => {
    const dates = formatRangeDate(startDate, endDate);
    if (dates) return `• ${dates}`;
  };

  const getCenterMap = () => {
    const coords = searchResults.map((result) => ({
      latitude: result.lat,
      longitude: result.long,
    }));
    const center = getCenter(coords);
    // Default to Chandigarh if no center found
    return center && center.latitude && center.longitude
      ? center
      : { latitude: 30.7333, longitude: 76.7794 };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHead />
      <AppHeader searchPage query={{ location, checkIn, checkOut, guests }} />
      <main
        className={`${
          !isFullMap && 'lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,500px]'
        } flex-grow grid grid-cols-1 mt-[86px] duration-500`}
      >
        {/* left - cards */}
        <div
          className={`${isFullMap && 'hidden'} px-4 py-8 duration-500 lg:py-12 lg:px-7 overflow-y-auto`}
        >
          {/* Header with count and prices tag */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
              Over 1,000 homes in {location || 'Chandigarh'}
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                Prices include all fees
              </span>
            </div>
          </div>
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 transition-colors">
              Cancellation flexibility
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 transition-colors">
              Type of place
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 transition-colors">
              Price
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 transition-colors">
              Instant Book
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:border-gray-900 transition-colors">
              More filters
            </button>
          </div>

          {/* Listings Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <AppPlaceCard key={result.long + result.lat} data={result} />
            ))}
          </section>
        </div>
        {/* right - maps */}
        <section
          className={`${
            map ? 'block fixed left-0 right-0 bottom-0 top-0' : 'hidden'
          } sm:block sm:sticky top-[86px] h-[calc(100vh-86px)] flex-grow bg-gray-100 duration-100`}
        >
          <AppMap center={getCenterMap()}>
            <button
              className="items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
              onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
            >
              {isFullMap ? (
                <>
                  <ChevronRightIcon className="h-5" />{' '}
                  <span className="ml-2 text-sm font-semibold">Show list</span>
                </>
              ) : (
                <ChevronLeftIcon className="h-5" />
              )}
            </button>
            {searchResults.map((result) => (
              <Marker
                key={result.lat + result.long}
                latitude={result.lat}
                longitude={result.long}
                offset={[-20, -10]}
              >
                <button className="relative">
                  <button className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer">
                    {result.price.split('/')[0]}
                  </button>
                  <div className="absolute hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block">
                    <div className="relative w-full h-24 mb-2">
                      <Image
                        src={result.img}
                        alt={result.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                        placeholder="blur"
                        blurDataURL={result.img}
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">{result.title}</h2>
                    </div>
                  </div>
                </button>
              </Marker>
            ))}
          </AppMap>
        </section>
        {/* map toggler */}
        <button
          className={`${
            visibleMapButton
              ? 'translate-y-0 md:translate-y-[50px]'
              : 'translate-y-[80px] md:translate-y-[200px]'
          } lg:hidden duration-300 fixed flex items-center px-5 py-3 text-sm text-white translate-x-1/2 bg-gray-500 rounded-full right-1/2 bottom-20 shadow-lg active:scale-90`}
          onClick={() => {
            map ? setMap(false) : setMap(true);
          }}
        >
          {map ? (
            <>
              <span>List</span> <ClipboardIcon className="h-4 ml-2" />
            </>
          ) : (
            <>
              <span>Map</span> <MapIcon className="h-4 ml-2" />
            </>
          )}
        </button>
      </main>
      {/* footer */}
      {!isFullMap && <AppFooter />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const searchResults = await getSearch();

  return {
    props: { searchResults },
  };
};

export default Search;
