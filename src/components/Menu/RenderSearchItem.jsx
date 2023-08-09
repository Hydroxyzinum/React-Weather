import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/locationSlice";
import _ from "lodash";

const RenderSearchItem = () => {
  const dispatch = useDispatch();

  const { searchEngine } = useSelector((state) => state.searchEngine);

  const memoSearchItem = React.useMemo(() => {
    if (searchEngine.length !== 0) {
      const newArr =
        searchEngine.length > 11 ? searchEngine.slice(0, 11) : searchEngine;
      return newArr.map(({ region, city }) => {
        return (
          <div key={_.uniqueId("city-")} className="buttons">
            <button
              onClick={() => dispatch(setLocation(city))}
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
  }, [searchEngine, dispatch]);

  return memoSearchItem;
};

export default RenderSearchItem;
