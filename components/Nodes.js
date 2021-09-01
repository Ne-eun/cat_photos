class Nodes {
  constructor(targetApp, initalState, onClickhandler) {
    this.state = initalState;
    this.targetApp = targetApp;
    this.onClickhandler = onClickhandler;
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
    console.log(this.state);
    this.targetApp.classList.add("nodes");
    this.targetApp.innerHTML = this.state
      .map((item) => this.template(item))
      .join("");

    this.targetApp.querySelectorAll(".node").forEach((item, index) => {
      item.addEventListener("click", () => {
        const targetData = this.state[index];

        if (targetData.type === "DIRECTORY") {
          this.onClickhandler(targetData.id, targetData.name);
        }
      });
    });
  }
}

export default Nodes;
