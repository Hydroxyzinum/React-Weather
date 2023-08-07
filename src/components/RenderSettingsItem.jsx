import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { setSearchEngine } from "../store/searchEngineSlice";

const RenderSettingsItem = () => {
  const dispatch = useDispatch();

  const { searchEngine } = useSelector((state) => state.searchEngine);

  const memoSearchItem = React.useMemo(() => {
    if (searchEngine.length !== 0) {
      const newArr =
        searchEngine.length > 8 ? searchEngine.slice(0, 8) : searchEngine;
      return newArr.map(({ city }) => {
        return (
          <div key={_.uniqueId("city-")} className="buttons">
            <button
              onClick={() => {
                localStorage.setItem('default', city)
                dispatch(setSearchEngine([]));
              }}
              className="searchedItem"
            >
              {city ? city : null}
            </button>
          </div>
        );
      });
    } else {
      return null;
    }
  }, [searchEngine, dispatch]);

  return memoSearchItem;
};

export default RenderSettingsItem;