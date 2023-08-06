export const setSity = (
  defaultLocation,
  currentLocation,
  localStorageLocation
) => {
  switch (true) {
    case currentLocation:
      return currentLocation;
    case localStorageLocation:
      return localStorageLocation;
    default:
      return defaultLocation;
  }
};
