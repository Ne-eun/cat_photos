import Modal from "./Modal.js";

class Nodes {
  constructor({ $app, initialState, handler }) {
    this.state = initialState;
    this.$app = $app;
    this.handler = handler;

    this.$target = document.createElement("div");
    this.$target.className = "nodes";

    this.modal = new Modal({
      $app: this.$app,
      filePath: null,
    });

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  goBackTemplate() {
    if (!this.state.isRoot) {
      return `
        <div class="Node">
          <img src="./assets/prev.png">
        </div>
      `;
    } else return "";
  }

  itemTemplate(item) {
    if (item.type == "DIRECTORY") {
      return `
        <div class="node">
          <img src="./assets/directory.png">
          <p>${item.name}</p>
        </div>`;
    }

    if (item.type == "FILE") {
      return `
        <div class="node">
          <img src="./assets/file.png">
          <p>${item.name}</p>
        </div>
      `;
    }
  }

  render() {
    this.$target.innerHTML =
      this.goBackTemplate() +
      this.state.data.map((item) => this.itemTemplate(item)).join("");

    this.$target.querySelectorAll(".node").forEach((item, index) => {
      item.addEventListener("click", () => {
        const targetData = this.state.isRoot
          ? this.state.data[index]
          : this.state.data[index - 1];

        //뒤로가기 버튼
        if (targetData == undefined) {
          return this.state.depth.length === 2
            ? this.handler.goRoot()
            : this.handler.goBack(this.state.data[0].parent.id);
        }

        if (targetData.type === "DIRECTORY") {
          return this.handler.goNode(targetData.id, targetData.name);
        }

        if (targetData.type === "FILE") {
          this.modal.setState(targetData.filePath);
        }
      });
    });

    this.$app.appendChild(this.$target);
  }
}

export default Nodes;
