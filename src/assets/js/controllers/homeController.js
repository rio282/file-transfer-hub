import {Controller} from "./controller.js";

export class HomeController extends Controller {

    constructor(data) {
        super(data);
        super.loadContent(this).then(async view => {
            await this.#setupView(view);
        });
    }

    async #setupView(view) {
        const exitBtn = view.querySelector("#exitBtn");
        exitBtn.addEventListener("click", () => {
            console.log("exit!");
        });

        console.log("Loaded home view!");
    }
}
