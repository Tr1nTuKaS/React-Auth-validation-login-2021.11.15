console.log('login');

import { showError } from './helper.js';

const URL = 'http://localhost:3000/users';
// get form inputs and sendt to our back end api
// import {blue} from './helper.js'
const formEL = document.getElementById('login-form');
const errorEl = document.querySelector('.errors');

formEL.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('sending');
  const formData = new FormData(formEL);
  console.log('formData', Object.fromEntries(formData));
  // send fetch
  const resp = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const dataBack = await resp.json();
  console.log('dataBack login', dataBack);
  if (dataBack.error) {
    showError(dataBack.error, errorEl);
  }
  if (dataBack.msg === 'success') {
    const { email, token } = dataBack.data;
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    // redirect to home page
    window.location = 'index.html';
  }
});
