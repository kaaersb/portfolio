import _ from "lodash";
import "./styles.css";
import { analytics } from "./config";
import { site } from "./content";
import { totalPrice } from "./lib/price";

const app = document.querySelector<HTMLElement>("#app")!;

app.innerHTML = `
  <header>
    <img src="/logo.svg" alt="Logo" width="64" height="64" />
    <p class="host">${_.escape(site.name)} presents</p>
  </header>
  <h1>${_.escape(site.event)}</h1>
  <p class="date">${_.escape(site.date)} ${site.year}</p>
  <form id="order">
    <label>Tickets <input name="quantity" type="number" min="0" max="50" value="1" /></label>
    <label><input name="student" type="checkbox" /> I'm a student</label>
    <p class="total">Total: <output name="total"></output> DKK</p>
  </form>
`;

const form = app.querySelector<HTMLFormElement>("#order")!;
const output = form.querySelector("output")!;

function update() {
  const quantity = Number(form.quantity.value) || 0;
  const student = form.student.checked;
  output.textContent = String(
    totalPrice(site.ticketPrice, { quantity, student }),
  );
}

form.addEventListener("input", update);
update();

navigator.sendBeacon?.(
  analytics.endpoint,
  JSON.stringify({ key: analytics.api_key, page: location.pathname }),
);
