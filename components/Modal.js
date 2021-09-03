class Modal {
  constructor({ $app, filePath }) {
    this.$app = $app;
    this.state = filePath;

    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  template() {
    return `
      <div class="content">
        <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${this.state}">
        <button id="close">닫기</button>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.$target.style.display = this.state ? "block" : "none";

    this.$target.addEventListener("click", () => {
      this.setState = null;
    });

    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.setState = null;
      }
    };

    this.$app.appendChild(this.$target);
  }
}

export default Modal;
