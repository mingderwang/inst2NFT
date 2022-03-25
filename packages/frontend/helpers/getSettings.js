export async function getSettings() {
  const result = await fetch(`/api/settings`).then((res) => res.json());
  return result;
}
