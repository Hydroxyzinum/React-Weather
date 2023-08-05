import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";

const YandexMap = () => {
  const { data } = useSelector((state) => state.weatherData);

  const { lon, lat } = data.coord;
  return (
    <YMaps>
      <div className="yamap">
        <Map defaultState={{ center: [lat, lon], zoom: 9 }}>
          <Placemark geometry={[lat, lon]} />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
