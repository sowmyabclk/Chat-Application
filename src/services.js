export const fetchLogIn = (userName) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ userName }),
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
   return;
  });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
  
};

export const fetchChats = () => {
  return fetch('/chats', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json(response);
  });

};

export const fetchMessages = (message) => {
  return fetch('/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ message }),
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
};
