const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/challenge.db3',
    },
    useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());




server.get('/api/projects', async (req, res) => {
    // get the roles from the database
    try {
        const projects = await
            db('projects')
            .join('actions', {'actions.project_id': 'projects.id'});
        console.log(projects); // all the records from the table
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.post('/api/projects', async (req, res) => {
    try {
        const [id] = await db('projects').insert(req.body);

        const project = await db('projects')
            .where({ id })
            .first();

        res.status(201).json(project);
    } catch (error) {
        const message = errors[error.errno] || 'We ran into an error';
        res.status(500).json({ message, error });
    }
});

server.post('/api/actions', async (req, res) => {
    try {
        const [id] = await db('actions').insert(req.body);

        const action = await db('actions')
            .where({ id })
            .first();

        res.status(201).json(action);
    } catch (error) {
        const message = errors[error.errno] || 'We ran into an error';
        res.status(500).json({ message, error });
    }
});



module.exports = server;
