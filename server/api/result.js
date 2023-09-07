export default eventHandler(async event => {
  const { data } = await readBody(event);
  return `Data from api: ${data}`;
});
