class Breadcrumb {
  constructor({ $app, initialState }) {
    this.$app = $app;
    this.state = initialState;

    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state.depth
      .map((item) => `<div>${item.title}</div>`)
      .join("");
    this.$app.appendChild(this.$target);
  }
}

export default Breadcrumb;
