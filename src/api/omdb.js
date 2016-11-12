const baseUrl = 'http://www.omdbapi.com/?';

export function search(title, pageNumber=1) {
  return fetch(`${baseUrl}?type=movie&s=${title}&page=${pageNumber}`)
    .then((res) => res.json())
    .then((result) => result.Search.map((item) => ({
      ...item,
      Poster: item.Poster === 'N/A' ? null : item.Poster,
    })))
  ;
}

export function getById(id) {
  return fetch(`${baseUrl}i=${id}&r=json`)
    .then((res) => res.json());
};
