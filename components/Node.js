function Node(item) {
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

export default Node;
