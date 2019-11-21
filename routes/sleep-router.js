const express = require("express");
const Sleep = require("../models/sleep-model.js")
const restricted = require('./auth/authenticate-middleware.js');
const server = express();


server.get("/", restricted, (req, res) => {
    Sleep.find()
    .then(sleep => {
        res.status(200).json(sleep)
        console.log(sleep)
    })
    .catch(error => {
        res.status(500).json({error: "cannot GET sleep"})
    })
})

server.get("/:id", (req, res) => {
    const { id } = req.params;

    Sleep.findById(id)
    .then(char => {
      if (char) {
        res.json(char);
      } else {
        res.status(404).json({ message: 'Could not find sleep' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed' });
    });
})

server.post("/", (req, res) => {
    const sleep = req.body;
    Sleep.add(sleep)
    .then(char => {
        res.status(200).json(char)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: `error`})
    })
})

server.delete('/:id', (req, res) => {
    const { id } = req.params;

    Sleep.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find sleep with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete' });
    });
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    const { bedTime, wakeTime, mood } = req.body;
    if (!bedTime && !wakeTime && !mood) {
      return res.status(400).json({error: 'Please provide name and bio for the user.'});
    }
    Sleep.update(id, { bedTime, wakeTime, mood })
      .then(updated => {
        if (updated) {
          Sleep.findId(id)
            .then(user => res.status(200).json(user))
            .catch(err => {
              console.log(err);
              res.status(500).json({error:"The user information could not be modified"});
            });
        } else {
          res.status(404).json({error: `The user with the specified ID does not exist.`});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: 'The user information could not be modified.'});
      });
  });

  server.get('/:id/user', (req, res) => {
    const { id } = req.params;
  
    Sleep.findSleep(id)
    .then(sleep => {
      if (sleep.length) {
        res.json(sleep);
      } else {
        res.status(404).json({ message: 'Could not find data for given user' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get data' });
    });
  });

  server.post('/:id/user', (req, res) => {
    const sleepData = req.body;
    const { id } = req.params; 
  
    Sleep.findById(id)
    .then(user => {
      if (user) {
        Sleep.add(sleepData, id)
        .then(sleep => {
          res.status(201).json(sleep);
        })
      } else {
        res.status(404).json({ message: 'Could not find data with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new data' });
    });
  });
  


module.exports = server;