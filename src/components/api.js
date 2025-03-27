export function fetchUser() {
	return fetchJSON("/users/me");
}

function fetchJSON(link) {
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
