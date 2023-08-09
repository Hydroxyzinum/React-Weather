import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/locationSlice"; // Импорт экшена setLocation из среза locationSlice
import _ from "lodash"; // Импорт библиотеки lodash

const RenderSearchItem = () => {
  const dispatch = useDispatch();

  const { searchEngine } = useSelector((state) => state.searchEngine); // Получение данных из состояния Redux с помощью useSelector

  const memoSearchItem = React.useMemo(() => {
    if (searchEngine.length !== 0) {
      const newArr =
        searchEngine.length > 11 ? searchEngine.slice(0, 11) : searchEngine; // Ограничение количества отображаемых результатов до 11
      return newArr.map(({ region, city }) => {
        return (
          <div key={_.uniqueId("city-")} className="buttons">
            <button
              onClick={() => dispatch(setLocation(city))} // Установка выбранного местоположения при клике
              type="submit"
              className="searchedItem"
            >
              {city ? city : null}
              <span className="region-name">({region ? region : null})</span>
            </button>
          </div>
        );
      });
    } else {
      return null;
    }
  }, [searchEngine, dispatch]); // Обновление при изменении searchEngine или dispatch

  return memoSearchItem; // Возвращение отрендеренных результатов поиска
};

export default RenderSearchItem;