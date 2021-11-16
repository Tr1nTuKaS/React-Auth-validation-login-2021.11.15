export function showError(errText, dest) {
  const errHtml = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${errText}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `;

  dest.innerHTML = errHtml;
}

export function getUser() {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  if (email && token) {
    return {
      email,
      token,
    };
  }
  return false;
}

export function generateNav(arr, dest) {
  dest.innerHTML = arr
    .map(
      (el) => `
  <a class="nav-link ${el.extraClass}" href="${el.url}">${el.title}</a>`,
    )
    .join('');
}

export function logout() {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
