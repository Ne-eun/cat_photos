import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { getRoot } from "./api.js";

class App {
  constructor($app) {
    this.app = $app;
    this.state = {
      data: [],
      deps: [{ id: 0, title: "ROOT" }],
    };
    this.initRoot();
    this.render();
  }

  async initRoot() {
    const data = await getRoot();
    this.setState(data, "data");
  }

  setState(nextState, type) {
    if (type == "data") this.state.data = nextState;
    if (type == "deps") this.state.deps = nextState;
    this.render();
  }

  render() {
    this.app.innerHTML = "";

    const breadcrumb = document.createElement("nav");
    const nodes = document.createElement("div");

    new Breadcrumb(breadcrumb, this.state.deps);
    new Nodes(nodes, this.state.data);

    this.app.appendChild(breadcrumb);
    this.app.appendChild(nodes);
  }
}

new App(document.querySelector(".App"));
