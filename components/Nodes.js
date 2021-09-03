class Nodes {
  constructor($app, initalState, onClickhandler) {
    this.state = initalState;
    this.$app = $app;
    this.onClickhandler = onClickhandler;

    this.$target = document.createElement("div");
    this.$target.classList.add("nodes");

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  template(item) {
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
    this.$target.innerHTML = this.state
      .map((item) => this.template(item))
      .join("");

    this.$target.querySelectorAll(".node").forEach((item, index) => {
      item.addEventListener("click", () => {
        const targetData = this.state[index];

        if (targetData.type === "DIRECTORY") {
          this.onClickhandler(targetData.id, targetData.name);
        }
      });
    });

    this.$app.appendChild(this.$target);
  }
}

export default Nodes;
