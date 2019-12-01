export const renderFooterStatistic = (filmsData) => {
  const footerStatistic = document.querySelector(`.footer__statistics`);

  footerStatistic.textContent = `${filmsData.length} movies inside`;
};
