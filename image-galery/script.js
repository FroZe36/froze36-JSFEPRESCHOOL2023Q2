'use strict';

const url = 'https://api.unsplash.com/photos/';
const CLIENT_ID = 'Client-ID 3kR8Ny4FbYf6yBjQNXMv1aO-kvn2jdUHYtPYykg7QIo';
const search = '';

async function getData() {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: CLIENT_ID,
    },
  });
  const data = await res.json()
  console.log(data)
}
getData()
