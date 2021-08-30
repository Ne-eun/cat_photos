class Breadcrumb {
  constructor($target, initailState) {
    this.$target = $target;
    this.state = initailState;
    this.render();
  }

  render() {
    this.$target.classList.add("Breadcrumb");
    this.$target.innerHTML = this.state.map(
      (item) => `<div>${item.title}</div>`
    );
  }
}

export default Breadcrumb;
