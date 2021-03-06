/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:27 PM.
 *
 */

const config = {
  apiUrl: 'http://localhost:3000'
};

export const userService = {
  login,
  loginWithFirebase,
  logout,
  register,
  getAll,
  getById,
  update,
  deleteUser,
  getAvatar
};

function authHeader() {
  // return authorization header
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser && currentUser.accessToken) {
    return { 'Authorization': 'Bearer ' + currentUser.accessToken };
  } else {
    return {};
  }
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // login successful if there's a token in the response
        if (user.accessToken) {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
}

function loginWithFirebase(user, loginType) {
  user.accessToken = 'fake-access-token';
  user.loginType = loginType;

  return new Promise((resolve) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    resolve(user);
  })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  user.loginType = 'local';
  user.created_at = new Date();

  return getAvatar().then(
    avatar => {
      user.avatar_url = avatar;
      requestOptions.body = JSON.stringify(user);

      return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse)
    }
  );
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function getAvatar() {
  return fetch('https://picsum.photos/200/300/?random')
    .then(avatarResponse => {
      return avatarResponse.url ? avatarResponse.url : null;
    });
}