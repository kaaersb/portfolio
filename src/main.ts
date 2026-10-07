import "./styles.css";
import { site } from "./content";
import { renderPage } from "./lib/render";

const app = document.querySelector<HTMLElement>("#app")!;
app.innerHTML = renderPage(site);
document.title = `${site.name}: portfolio`;
