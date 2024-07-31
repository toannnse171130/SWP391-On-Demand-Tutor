export function search(searchInput, list = []) {
  if (!searchInput) {
    return list;
  }
  return list.filter((item) =>
    item?.value.toLowerCase().includes(searchInput.toLowerCase())
  );
}
