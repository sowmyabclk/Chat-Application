   const users = {};
   
   const messages = [];
   
   function addMessage( uId, timeStamp=new Date(), text ) {
     messages.push({ sender: uId, timeStamp, text });
   }
   
   function userExists(userName) {
     const record = Object.values(users).find(user => user.userName === userName);
     return record && record.uid;
   }
   
   function addUser(userName,uId) {   
     const oldId = userExists(userName);
     const id = oldId || uId;
     users[id] = { userName, active: true, uId: id };
     return id;
   }
   
   function removeUser(uId) {
     if(users[uId]) {
       users[uId].active = false;
     }
   }
   
   const chat = {
     users,
     messages,
     addMessage,
     addUser,
     removeUser,
   };
   
   module.exports = chat;
   
   