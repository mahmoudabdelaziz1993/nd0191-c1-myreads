const api = "https://reactnd-books-api.udacity.com";

export let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = async (bookId) => {
  let res = await fetch(`${api}/books/${bookId}`, { headers });
  let data = await res.json();
  if (data.book) {
    return data.book;
  }
};

export const getAll = async () => {
  let res = await fetch(`${api}/books`, { headers });
  let data = await res.json();
  if (data.books) {
    return data?.books;
  }
  return [];
};
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = async (query, maxResults) => {
  let res = await fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  });
  let data = await res.json();
  if (Array.isArray(data.books)) {
    return data?.books;
  }
  return [];
};
