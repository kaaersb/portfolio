export type Order = {
  quantity: number;
  student: boolean;
};

export const STUDENT_DISCOUNT = 0.5;
export const GROUP_SIZE = 10;
export const GROUP_DISCOUNT = 0.2;

/** Total price in DKK for an order of tickets, rounded to whole kroner. */
export function totalPrice(ticketPrice: number, order: Order): number {
  if (order.quantity < 1) return 0;
  let price = ticketPrice;
  if (order.student) price = price * (1 - STUDENT_DISCOUNT);
  let total = price * order.quantity;
  if (order.quantity > GROUP_SIZE) total = total * (1 - GROUP_DISCOUNT);
  return Math.round(total);
}
