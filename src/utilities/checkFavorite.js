const checkFavorite = (item = {}, favorites = []) => {
  const foundItem = favorites.find((i) => i.id === item.id);
  if (foundItem) return true;
  return false;
}

export default checkFavorite;