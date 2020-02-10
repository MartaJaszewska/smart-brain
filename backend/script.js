const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@doe.xyz',
      password: 'cookie',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@doe.xyz',
      password: 'choco',
      entries: 0,
      joined: new Date()
    }
  ]
  // login: [
  //   {
  //     id: '987',
  //     hash: '',
  //     email: 'john@doe.xyz'
  //   },
  //   {
  //     id: '986',
  //     hash: '',
  //     email: 'sally@doe.xyz'
  //   }
  // ]
}
app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json('singing in')
    }
  res.status(400).json('error loging in') 
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    })
      res.json(database.users[database.users.length-1], )
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if (!found) {
    return res.status(404).json('no such user')
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    } 
  })
  if (!found) {
    return res.status(404).json('no such user')
  }
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
});

// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // == false
// });

// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
  // Store hash in your password DB.
// });
// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
  // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
  // result == false
// });