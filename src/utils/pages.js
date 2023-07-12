export const getPageCount = (count, limit) => {
  return Math.ceil(count / limit);
};

export const getPagesArray = (totalPages) => {
  const arrayPages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    arrayPages.push(i);
  }
  return arrayPages;
};


