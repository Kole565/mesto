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

export function postCard(name, link) {
	return fetchHandler(
		fetch(`${process.env.BASE_URL}${process.env.GROUP_ID}/cards`, {
			method: 'POST',
			headers: {
				authorization: process.env.TOKEN,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
	)
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
		.then((res) => {
  			if (res.ok) {
				return res.json().then((data) => {
					return data;
				});
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		})
}
