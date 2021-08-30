import Node from "./Node.js";

class Nodes {
  constructor(targetApp, initalState) {
    this.state = initalState;
    this.targetApp = targetApp;
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.targetApp.classList.add("nodes");
    this.targetApp.innerHTML = this.state.map((item) => Node(item)).join("");
  }
}

export default Nodes;
