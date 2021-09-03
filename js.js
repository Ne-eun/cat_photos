import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { getRoot, getNodes } from "./api.js";

class App {
  constructor($app) {
    this.$app = $app;
    this.state = {
      isRoot: true,
      data: [],
      depth: [{ id: 0, title: "ROOT" }],
    };

    this.Nodes = new Nodes({
      $app,
      initialState: this.state,
      // 원래 이벤트 핸들러 내부의 this는 이벤트가 바인딩된 DOM 요소를 가리킨다.
      // 여기서 this가 생성될 인스턴스를 가리키게 하려면 위에서 바인딩을 해줘야 한다.
      //this.Nodes.onclickhandler = this.increaseMethod.bind(this);
      // 화살표 함수는 자신의 this가 없고 상위 스코프의 this를 참조하므로,
      // 화살표 함수 내부의 this는 생성될 인스턴스를 가리킨다.
      handler: {
        goNode: (id, title) => this.getNodesData(id, title),
        goBack: (id) => this.getgoBackData(id),
        goRoot: () => this.getRootData(),
      },
    });

    this.Breadcrumb = new Breadcrumb({
      $app,
      initialState: this.state,
    });

    this.getRootData();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  async getRootData() {
    const data = await getRoot();
    const nextState = {
      isRoot: true,
      data: data,
      depth: [{ id: 0, title: "ROOT" }],
    };
    this.setState(nextState);
  }

  async getNodesData(id, title) {
    const data = await getNodes(id);
    const nextState = {
      isRoot: false,
      data: data,
      depth: [...this.state.depth, { id: id, title: title }],
    };
    this.setState(nextState);
  }

  async getgoBackData(id) {
    const data = await getNodes(id);
    const nextState = {
      isRoot: false,
      data: data,
      depth: this.state.depth,
    };
    nextState.depth.pop();
    this.setState(nextState);
  }

  render() {
    this.$app.innerHTML = "";
    this.Breadcrumb.setState(this.state);
    this.Nodes.setState(this.state);
  }
}

new App(document.querySelector(".App"));
