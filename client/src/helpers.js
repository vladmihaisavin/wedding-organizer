export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPageName() {
  return ucFirst(window.location.pathname.split('/')[1])
}