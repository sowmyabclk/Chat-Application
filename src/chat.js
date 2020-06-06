import {
    fetchLogIn,
    fetchLoginStatus,
    fetchChats,
    fetchLogout,
    fetchMessages
  } from './services';


  const appState = {
    pollId: null,
    isLoggedIn: false,
    messageList: [],
    userList:{},
    error: '',
  };

const messageUserList = document.querySelector('.message-user-list'); 
const status = document.querySelector('.status');
const messageArea = document.querySelector('.new-message-info');
const login = document.querySelector('.login');
const logout = document.querySelector('.logout');
const messages = document.querySelector('.messages');
const users = document.querySelector('.users');


const errMsgs = {
    'network-error': 'There was a problem connecting to the network, try again',
    'bad-login': 'name should not be empty, does not contain whitespace and dog word',
    'not-allowed': 'something went wrong...',
    'unauthorized': "please login with username",
    'missing-name': "item name is missing",
    "empty-message":"message should not be empty"
};


function renderLogin(show){
  const login = document.querySelector('.login');
  if(show){
    const html = `
        <h1 class = "homepage-title">Login Page</h1>  
        <div class = "login-info">
            <label class = "user-name">Username:</label><input class = "user" name="username" placeholder="Enter User name"/>
        </div>
        <button class ="to-login" type="submit">Login</button>
    `
    login.innerHTML = html;
  }
  else{
    login.innerHTML = ``;
  }
}


function renderMessageArea(){
  const html = `
          <textarea class = "new-message" type="text"  placeholder = "Enter an Message"></textarea>
          <button class = "send-message" type="submit">Send</button>
      `
      messageArea.innerHTML = html;
  
  }

function renderLogout(){
  const logout = document.querySelector('.logout');
const html = `
      <button class = "to-logout" type="submit">Logout</button>
    `
    logout.innerHTML = html;

}

function renderErrors( errorMessage ) {
  status.innerHTML = errorMessage;
}

function renderPage() {
  if(!appState.isLoggedIn)  {
    logout.innerHTML = '';
    messageArea.innerHTML = '';
    messageUserList.innerHTML = '';
    renderLogin(true);
  } else {
    renderLogin(false);
    renderLogout();
    renderMessageArea();
    messageUserList.append(messages)
    messageUserList.append(users);
    
  }
  renderErrors(appState.error);
}


login.addEventListener('click', (e) => {
  if(e.target.classList.contains('to-login')) {
  const username = document.querySelector('.user').value;
  fetchLogIn(username)
  .then( () => {
      appState.isLoggedIn = true;
      appState.error = '';
      poll(true);
      renderPage();
  })
 .catch( (err) => {
  if (err.error == 'not-allowed' || err.error == 'unauthorized') {
    appState.isLoggedIn = false;
    appState.error = errMsgs[err.error] || err.error;
    poll(false);
    renderPage();
  }
  else{
    appState.isLoggedIn = false;
    appState.error = errMsgs[err.error] || err.error;
    renderPage();
    }
  });
}
});

logout.addEventListener('click', (e) => {
if(e.target.classList.contains('to-logout')) {
  fetchLogout()
  .then( () => {
      appState.isLoggedIn = false;
      poll(false);
      appState.error = '';
      renderPage();
  })
  .catch( (err) => {
    appState.isLoggedIn = false;
    poll(false);
    appState.error = errMsgs[err.error] || err.error;
    renderPage();
    });
}

});

messageArea.addEventListener('click', (e) => {
if(e.target.classList.contains('send-message')) {
  const message = document.querySelector('.new-message').value;
  fetchMessages(message)
  .then( () => {
    appState.isLoggedIn = true;
    appState.error = '';
    renderPage();
  })
  .catch( (err) => {
    if (err.error == 'not-allowed' || err.error == 'unauthorized') {
      appState.isLoggedIn = false;
      poll(false);
      appState.error = errMsgs[err.error] || err.error;
      renderPage();
    }
    else{
      appState.isLoggedIn = true;
      appState.error = errMsgs[err.error] || err.error;
      renderPage();
    }
  });
 }
});

function poll(shouldPoll) {
  if( shouldPoll && !appState.pollId ) {
    appState.pollId = setInterval( () => {
      fetchChats()
      .catch( (err) => {
        if (err.error == 'not-allowed' || err.error == 'unauthorized') {
          appState.error = errMsgs[err.error] || err.error;
          appState.isLoggedIn = false;
          poll(false);
          renderPage();
        }
        else{
        appState.error = errMsgs[err.error] || err.error;
        renderPage();
        }
      })
      .then( chats => {
        appState.error = '';
        appState.isLoggedIn = true;
        appState.messageList = chats.messageList;
        appState.userList = chats.userList;
        renderMessages(appState.messageList,appState.userList);
        renderUsers(appState.userList);
      });
    }, 3000);
  }
  if( !shouldPoll && appState.pollId ) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

  function renderChats(userList,messageList){   
    renderMessages(messageList,userList);
    renderUsers(userList);
  }

  function renderMessages( messageList,userList ) {
    messages.innerHTML =  messageList.map( message => `
    <li>
      <div class="message">
        <div class="message-info">
            <span class="username">${userList[message.sender].userName}</span>
            <span class="timestamp">${message.timeStamp}</span>
          </div>
        <div class="message-text">${message.text}</div>
      </div>
    </li>
  `).join('');
  }

  function renderUsers(userList ) {
    users.innerHTML =  Object.values(userList).filter( user => user.active).map( user => `
    <li>
      <div class="user">
        <span class="username">${user.userName}</span>
      </div>
    </li>
  `).join('') 
  }
  

  fetchLoginStatus()
  .then( () => {
    appState.isLoggedIn = true;
    appState.error = '';
    poll(true);
    renderPage();
})
.catch((err) => {
  appState.isLoggedIn = false;
  renderPage();
});


