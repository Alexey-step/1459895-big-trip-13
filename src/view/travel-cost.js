export const createTravelCostTemplate = (items) => {

  const travelCost = items.reduce((a, b) => a + b.price, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
</p>`;
};
