export async function getRoot() {
  const res = await fetch(
    "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"
  );
  const data = await res.json();
  return data;
}

export async function getNodes(id) {
  const res = await fetch(
    `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`
  );
  const data = await res.json();
  return data;
}
