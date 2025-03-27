export function fetchUser() {
	return getJSON("/users/me");
}

export function fetchCards() {
	return getJSON("/cards");
}

function getJSON(link) {
	return fetch(`${process.env.BASE_URL}${process.env.GROUP_ID}${link}`, {
		headers: {
			authorization: process.env.TOKEN
		}
	})
  		.then((response) => {
  			if (response.ok) {
				return response.json().then((data) => {
					return data;
				});
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		})
}
