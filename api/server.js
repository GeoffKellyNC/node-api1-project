// BUILD YOUR SERVER HERE

const express = require('express');

const server = express();

const { find, findById, insert, update, remove } = require('./users/model');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});


// GET USERS
server.get('/api/users', async (req, res) => {
    const users = await find();
    if(!users){
        res.status(500).json({ message: 'The users information could not be retrieved.' });
        return
    }
    res.status(200).json(users);
    return
});

// GET USER BY ID

server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    if(!id){
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        return
    }

    const user = await findById(id);

    if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist" });
        return
    }

    res.status(200).json(user);
    return
});

// POST USER

server.post('/api/users', async (req, res) => {
    const {name, bio} = req.body;

    if(!name || !bio){
        res.status(400).json({ message: 'Please provide name and bio for the user.' });
        return
    }
    const newUser = await insert({name, bio})

    if(!newUser){
        res.status(500).json({ message: 'There was an error while saving the user to the database' });
        return
    }

    res.status(201).send(newUser)
    return

});

// DELETE USER

server.delete('/api/users/:id', async (req, res) => {
        const id = req.params.id;
    
        if(!id){
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            return
        }
    
        const user = await remove(id);
    
        if(!user){
            res.status(404).json({ message: "does not exist" });
            return
        }
    
        res.status(200).json(user);
        return

});

server.put('/api/users/:id', async (req, res) => {
        const id = req.params.id;
        const {name, bio} = req.body;
    
        if(!name || !bio){
            res.status(400).json({ message: 'Please provide name and bio for the user.' });
            return
        }
    
        if(!id){
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            return
        }
    
        const updatedUser = await update(id, {name, bio});
    
        if(!updatedUser){
            res.status(404).json({ message: 'does not exist' });
            return
        }

        res.status(200).json(updatedUser);
        return

});



module.exports = server; // EXPORT YOUR SERVER instead of {}
