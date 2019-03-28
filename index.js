'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');//req.body
const cors = require('cors');
let contacts = require ('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
  if (!contacts){
    res.status(404).json({ message: 'Nothing to see here'});
  }
  res.json(contacts);
});

app.get('/:id', (req, res) => {
  const reqId = req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == reqId;
  });
  if (!contacts){
    res.status(404).json({ message: 'Nothing to see here'});
  }
  res.json(contact[0]);
});

//POST request

app.post('/', (req, res) => {

  const contact = {
    id: contacts.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  contacts.push(contact);
  res.json(contact);
});

app.put('/:id', (req, res) => {

  const reqId = req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == reqId;
  })[0];
 const index = contacts.indexOf(contact);
 const keys = Object.keys(req.body);
 keys.forEach(key => {
   contact[key] = req.body[key];
 });

 contacts[index] = contact;
 res.json(contacts[index]);
});

app.delete('/:id', (req, res) => {
  const reqId= req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == reqId;
  })[0];

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);

  res.json({message: `User ${reqId} has been deleted.`});

  });

//const hostname = 'localhost';
//const port = 8080;

const port=process.env.PORT || 8080;
app.listen(port, () =>{
  console.log(`Server is running at PORT:${port}`);
});
