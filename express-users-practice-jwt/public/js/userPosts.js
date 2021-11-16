import { getUser, generateNav, logout } from './helper.js';

console.log('userPosts');
const URL = 'http://localhost:3000/posts';

// elements
const postsContainer = document.querySelector('.posts-container');
const mainTitleEl = document.querySelector('.main-title');
const mainNavEl = document.querySelector('.navbar-nav');

const { email, token } = getUser();

async function fetchData(urlPath = '', reqMethod = 'GET') {
  const resp = await fetch(`${URL}${urlPath}`, {
    method: reqMethod,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataFromResp = await resp.json();
  return dataFromResp;
}

function checkIfUserLoggedIn() {
  if (!email) {
    window.location.href = 'login.html';
  }
}

async function init() {
  checkIfUserLoggedIn();
  const allPostsArr = await getPost();
  // console.log('allPostsArr', allPostsArr);
  generatePosts(allPostsArr, postsContainer);
  mainTitleEl.innerHTML += email;
  initNav();
}
init();

// fetch GET /posts/all
async function getPost() {
  const data = await fetchData();
  // console.log('data', data);
  if (data.msg === 'success') {
    return data.data;
  }
  throw new Error('no posts found');
}

// generate cards with post data
function generatePosts(dataArr, dest) {
  dest.innerHTML = dataArr
    .map(
      (post) => `
      <div class="card m-2 ">
        <div class="card-header">Author: ${post.author}</div>
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <a href="single-posts.html?postId=${post.postId}" class="btn btn-primary btn-sm">See more</a>
          <button data-postid='${post.postId}' class="btn btn-sm btn-danger delete-post">Delete</button>
        </div>
        <div class="card-footer">Time ${post.timeStamp}</div>
      </div>
  `,
    )
    .join('');
}

// create navigation
function initNav() {
  const navArr = [
    {
      title: 'Posts',
      url: 'index.html',
      extraClass: '',
    },
    {
      title: 'User posts',
      url: 'user-posts.html',
      extraClass: 'active',
    },
    {
      title: email,
      url: '#',
      extraClass: 'disabled',
    },
    {
      title: 'Logout',
      url: '#logout',
      extraClass: '',
    },
  ];
  generateNav(navArr, mainNavEl);
  logoutHandler();
}

// logout button
function logoutHandler() {
  const logoutLinkEl = mainNavEl.querySelector("a[href='#logout']");
  console.log('logoutLinkEl', logoutLinkEl);
  logoutLinkEl.addEventListener('click', logout);
}

// delete action
postsContainer.addEventListener('click', async (e) => {
  // if we cliced on el with class 'delete-post'
  if (e.target.classList.contains('delete-post')) {
    // 1 get delete btn and id
    const id = e.target.dataset.postid;
    console.log('Delete in action ', id);
    // 2 send DELETE /posts/:id (authorization jwt)
    const dataBack = await fetchData(`/${id}`, 'DELETE');
    console.log('dataBack delete', dataBack);
    if (dataBack.msg === 'success') {
      window.location.reload();
    }
  }
});
// 3. check if succes and refresh or rm item
