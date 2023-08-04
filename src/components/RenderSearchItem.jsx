import React, { useContext } from "react";
import _ from "lodash";
import { Context } from "../context/context";

// Компонент-контейнер для меню с поиском города и переключателем единиц измерения

// Компонент, который отображает элементы результата поиска городов
const RenderSearchItem = () => {
  const contextData = useContext(Context);

  const { state, dispatch } = contextData;

  const { searchEngine } = state;

  // Создание массива с элементами результата поиска и их отображение
  const memoSearchItem = React.useMemo(() => {
    if (searchEngine.length !== 0) {
      const newArr =
        searchEngine.length > 11 ? searchEngine.slice(0, 11) : searchEngine;
      return newArr.map(({ region, city }) => {
        return (
          <div key={_.uniqueId("city-")} className="buttons">
            <button
              onClick={() => dispatch({ type: "SET_LOCATION", payload: city })}
              type="submit"
              className="searchedItem"
            >
              {city ? city : null}{" "}
              <span className="region-name">({region ? region : null})</span>
            </button>
          </div>
        );
      });
    } else {
      return <div className="p-10">Ожидание запроса...</div>;
    }
  }, [searchEngine, dispatch]);

  return memoSearchItem;
};

// Компонент меню, который использует MenuContainer и RenderSearchItem

export default RenderSearchItem;
