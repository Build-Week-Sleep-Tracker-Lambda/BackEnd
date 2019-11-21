const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../models/user-model.js');
const restricted = require('./authenticate-middleware.js');
const secrets = require('./secrets.js')


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(registered => {
      res.status(201).json(registered);
    })
    .catch(error => {
      res.status(500).json({error: "register failed"});
    })
});

router.get('/register', (req, res) => {
  res.status(200).json({message: "register is functional"})
})


router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user =>{
      if(user && bcrypt.compareSync(password, user.password)){

        const token = generateToken(user)
        const decoded = jwt.verify(token, secrets.jwtSecret)

        res.status(200).json({
          message: `Log in, success! Welcome, ${user.username}`,
          id:user.id,
          token:token
        })
      } else {
        res.status(401).json({ message: "invalid credentials" })
      }
    })
    .catch(error => {
      res.status(500).json({error: "Login failed"})
    })
});

router.get('/login', (req, res) => {
  res.status(200).json({message: "post credentials"})
})

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users); //
    })
    .catch(error => {
      res.send(error);
    })
})


module.exports = router;
