import {MyApp} from "../myApp";

export class Controller {

    #navigationViewHtml;
    #contentViewHtml;

    #controllerData;
    #pathToHtmlViews;

    constructor(data) {
        this.#controllerData = data;
        this.#pathToHtmlViews = "html_views"
        this.#navigationViewHtml = document.querySelector(".navigation");
        this.#contentViewHtml = document.querySelector(".content");
    }

    async #fetchHtmlView(htmlFile, customElement = null) {
        let loadIntoElement = this.#contentViewHtml; // default
        if (customElement instanceof Element) // check if element
            loadIntoElement = customElement;

        try {
            // fetch html view
            const response = await fetch(htmlFile);

            // if fetch was ok
            if (response.ok) {
                const html = await response.text();
                loadIntoElement.innerHTML = "";
                loadIntoElement.innerHTML = html;
            } else { // if fetch failed
                throw Error(response.statusText);
            }
        } catch (e) {
            console.error(e);
            loadIntoElement.innerHTML = "<p>Failed to load HTML file</p>";
        }

        return loadIntoElement;
    }

    async loadHtmlIntoNavigation(htmlFile) {
        return await this.#fetchHtmlView(htmlFile, this.#navigationViewHtml);
    }

    async loadHtmlIntoContent(htmlFile) {
        return await this.#fetchHtmlView(htmlFile, this.#contentViewHtml);
    }


    async loadContent(controller) {
        if (!controller instanceof Controller)
            return;

        const name = controller.constructor.name.toLowerCase().replace("controller", "");

        MyApp.loadController(name);
        return await this.#fetchHtmlView(`${this.#pathToHtmlViews}/${name}.html`);
    }
}
