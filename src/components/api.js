export function fetchUser() {
	return getJSON("/users/me");
}

export function patchUser(name, description) {
	return fetchHandler(
		fetch(`${process.env.BASE_URL}${process.env.GROUP_ID}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: process.env.TOKEN,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: description
			})
		})
	)
}

export function fetchCards() {
	return getJSON("/cards");
}

function getJSON(link) {
	return fetchHandler(
		fetch(`${process.env.BASE_URL}${process.env.GROUP_ID}${link}`, {
			headers: {
				authorization: process.env.TOKEN
			}
		})
	)
}

function fetchHandler(fetch) {
	return fetch
		.then((response) => {
  			if (response.ok) {
				return response.json().then((data) => {
					return data;
				});
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		})
}
