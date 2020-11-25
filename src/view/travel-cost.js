export const createTravelCostTemplate = (items) => {

  const travelCost = items.reduce((acc, item) => acc + item.price, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
</p>`;
};
