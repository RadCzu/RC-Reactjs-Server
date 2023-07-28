const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');


server.use(jsonServer.bodyParser);
server.use(cors());

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log("username: " + username, " passowrd: " + password);
  const users = router.db.get('users').value();
  const user = users.find(user => user.name === username && user.password === password);
  if (user) {
    res.status(200).json({ success: true, user: user.name, id: user.id });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

server.post('/auth/sign-up', (req, res) => {
  const { username } = req.body;
  console.log("username: " + username);
  const users = router.db.get('users').value();
  const user = users.find(user => user.name === username);
  if (!user) {
    let index = 0;
    for(let i = 0; i < users.length; i++) {
      if(users[i].id != i) {
        index = i;
        break;
      }
    }
    res.status(200).json({ success: true, id: index, message: 'Username not in database'});
  } else {
    res.status(401).json({ success: false, message: 'Username already in database' });
  }
});

server.post("/auth/get-user", (req, res) => {
  const { id } = req.body;
  const users = router.db.get('users').value();
  const convertedId = parseInt(id, 10);
  const user = users.find(user => user.id === convertedId);
  if (user) {
    res.status(200).json({ success: true, name: user.name});
  } else {
    res.status(401).json({ success: false, message: 'Username already in database' });
  }
});

server.post("/auth/get-id", (req, res) => {
  const { name } = req.body;
  const users = router.db.get('users').value();
  console.log(name);
  const user = users.find(user => user.name === name);
  console.log("username: " + user.name, " id: " + user.id);
  if (user) {
    res.status(200).json({ success: true, name: user.name, id: user.id});

  } else {
    res.status(401).json({ success: false, message: 'couldnt find user' });
  }
});


server.get('/auth/login', (req, res) => {
  res.json([]);
});

server.get('/auth/sign-up', (req, res) => {
  res.json([]);
});

server.get('/auth/get-id', (req, res) => {
  res.json([]);
});

server.get('/auth/get-user', (req, res) => {
  res.json([]);
});


server.use(middlewares);
server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});