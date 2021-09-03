class Breadcrumb {
  constructor($app, initailState) {
    this.$app = $app;
    this.state = initailState;

    this.$target = document.createElement("nav");
    this.$target.classList.add("Breadcrumb");

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state.map(
      (item) => `<div>${item.title}</div>`
    );

    this.$app.appendChild(this.$target);
  }
}

export default Breadcrumb;
