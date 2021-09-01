import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { getRoot, getNodes } from "./api.js";

class App {
  constructor($app) {
    this.app = $app;
    this.state = {
      data: [],
      depth: [{ id: 0, title: "ROOT" }],
    };
    this.initRoot();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  async initRoot() {
    const data = await getRoot();
    const nextState = {
      data: data,
      depth: [...this.state.depth],
    };
    this.setState(nextState);
  }

  async getNodesData(id, title) {
    const data = await getNodes(id);
    this.test(data);
    // const nextState = {
    //   data: data,
    //   depth: [...this.state.depth, { id: id, title: title }],
    // };
    // this.setState(nextState);
  }

  render() {
    this.app.innerHTML = "";
    console.log("render state", this.state);
    const breadcrumb = document.createElement("nav");
    const nodes = document.createElement("div");

    new Breadcrumb(breadcrumb, this.state.depth);
    new Nodes(nodes, this.state.data, this.getNodesData);

    this.app.appendChild(breadcrumb);
    this.app.appendChild(nodes);
  }
}

new App(document.querySelector(".App"));
