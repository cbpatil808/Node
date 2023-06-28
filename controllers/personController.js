const Person = require('../models/person.js');
const mongoose = require('mongoose')

exports.getPersons = (req, res) => {
  Person.find()
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};


exports.createPerson = (req, res) => {
  const { name, age, gender, phoneNumber } = req.body;
  const person = new Person({ name, age, gender, phoneNumber });

  person
    .save()
    .then(result => {
      console.log('Created A Person');
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
};



exports.editPerson = (req, res, next) => {
  const personId = req.body.personId;
  const updatedName = req.body.name;
  const updatedAge = req.body.age;
  const updatedGender = req.body.gender;
  const updatedPhoneNumber = req.body.phoneNumber;
  

  Person.findById(personId)
    .then(person => {
      person.name = updatedName;
      person.age = updatedAge;
      person.gender = updatedGender;
      person.phoneNumber = updatedPhoneNumber;
      return person.save();
    })
    .then(result => {
      console.log('Updated Person!');
      res.json(result);
    })
    .catch(err => console.log(err));
};

exports.DeletePerson = (req, res, next) => {
  const PersonId = req.body.personId;
  Person.findByIdAndRemove(PersonId)
    .then(() => {
      console.log('Person Deleted SuccessFullly');
      res.send("Deleted Successfully")
    })
    .catch(err => console.log(err));
};