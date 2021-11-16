console.log('single post');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log('params', params); // { postId: "8", sort: "asc", tomorrow: "satruday" }

const currentPostId = params.postId;

console.log('currentPostId', currentPostId);

if (currentPostId === undefined) {
  document.body.innerHTML = '<h1>GO AWAY</h1>';
  window.location.href = 'index.html';
}

// GET single posts with id currentPostId
// fill page details with post data
