const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const chats = require('./chats');
const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/session', (req, res) => {
  const uniqueId = req.cookies.uid;
  if(!uniqueId) {
    res.status(401).send({ error: 'unauthorized' });
    return;
  }
  if(!chats.users[uniqueId]) {
    chats.removeUser(uniqueId);
    res.clearCookie('uid');
    res.status(403).send({ error: 'not-allowed' });
    return;
  }
  return res.sendStatus(200);
});

app.post('/session', express.json(), (req, res) => {
    let cleanUserName;
    const userName = req.body.userName;
    if (userName) {
      cleanUserName = userName.replace(/[^A-Za-z0-9_\-]/g, '');
    }
    const uniqueId = req.cookies.uid;

    if (chats.users[uniqueId]) {
      if (chats.users[uniqueId].userName != userName) {
        return res.status(403).json({ error: 'not-allowed' });
      }
    }
    if (!userName || userName.includes("dog") || userName.length !== cleanUserName.length) {
      res.status(400).json({ error: 'bad-login' });
      return;
    }

      const uId = uuidv4();
      const id = chats.addUser(cleanUserName,uId);
      res.cookie('uid', id);
      return res.json({userList : chats.users, messageList: chats.messages});
    });
    

  app.delete('/session', (req, res) => {
    const uniqueId = req.cookies.uid;
    chats.removeUser(uniqueId);
    res.clearCookie('uid');
    return res.sendStatus(200);
 });

  app.get('/chats', (req, res) => {
    const uniqueId = req.cookies.uid;
    if(!uniqueId) {
      res.status(401).send({ error: 'unauthorized' });
    return;
   }

    if(!chats.users[uniqueId]) {
      chats.removeUser(uniqueId);
      res.clearCookie('uid');
      res.status(403).send({ error: 'not-allowed' });
      return;
    }
    return res.json({userList : chats.users, messageList: chats.messages});
});

app.post('/messages', express.json(), (req, res) => {
  const message = req.body.message;
  const uniqueId = req.cookies.uid;
  if (message) {
    cleanMessage = message.replace(/[^A-Za-z0-9_\-]/g, '');
  }
  
  if(!uniqueId) {
    res.status(401).send({ error: 'unauthorized' });
    return;
  }
  if(!chats.users[uniqueId]) {
    chats.removeUser(uniqueId);
    res.clearCookie('uid');
    res.status(403).send({ error: 'not-allowed' });
    return;
  }
 
  if (!message  || cleanMessage.length ==0) {
    res.status(400).json({ error: 'empty-message' });
    return;
  }
  chats.addMessage( uniqueId,new Date(), message );
  return res.sendStatus(200);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );

