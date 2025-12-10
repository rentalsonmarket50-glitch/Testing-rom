import React, { FC, PropsWithChildren } from 'react';
import { Map } from 'react-map-gl';

interface IAppMap extends PropsWithChildren<any> {
  center: { longitude: number; latitude: number };
}

const AppMap: FC<IAppMap> = ({ children, center }) => {
  const [viewState, setViewState] = React.useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 14,
  });

  return (
    <Map
      {...viewState}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100%', height: '100%' }}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {children}
    </Map>
  );
};

export default AppMap;
