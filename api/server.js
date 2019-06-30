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

module.exports = server;
