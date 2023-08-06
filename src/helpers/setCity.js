export const setSity = (defaultLocation, currentLocation, localStorageLocation) => {
  switch (true) {
    case currentLocation:
      return `${currentLocation} ${"КУРРЕНТ ЛОКЕЙШН"}`;
    case `${localStorageLocation} ${"ЛОКАЛ СТОРАГЕ ЛОКАТИОН"}`:
      return localStorageLocation;
    default:
      return defaultLocation;
  }
};
