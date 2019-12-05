export const renderFooterStatistic = (films) => {
  const footerStatistic = document.querySelector(`.footer__statistics`);

  footerStatistic.textContent = `${films.length} movies inside`;
};
