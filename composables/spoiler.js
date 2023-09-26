export const useSpoiler = e => {
  const target = e.target;
  const nextSibling = target.nextElementSibling;
  target.classList.toggle("spoiler-is-open");
  nextSibling.style.maxHeight = nextSibling.style.maxHeight ? null : `${nextSibling.scrollHeight}px`;
};
