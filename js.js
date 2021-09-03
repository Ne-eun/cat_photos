import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { getRoot, getNodes } from "./api.js";

class App {
  constructor($app) {
    this.$app = $app;
    this.state = {
      data: [],
      depth: [{ id: 0, title: "ROOT" }],
    };

    this.Nodes = new Nodes($app, this.state.data, this.getNodesData);
    this.Breadcrumb = new Breadcrumb($app, this.state.depth);

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

  // async getNodesData(id, title) {
  //   const data = await getNodes(id);
  //   console.log("아아아.....");
  //   // const nextState = {
  //   //   data: data,
  //   //   depth: [...this.state.depth, { id: id, title: title }],
  //   // };
  //   // this.setState(nextState);
  // }

  render() {
    this.$app.innerHTML = "";
    this.Breadcrumb.setState(this.state.depth);
    this.Nodes.setState(this.state.data);
  }
}

new App(document.querySelector(".App"));
