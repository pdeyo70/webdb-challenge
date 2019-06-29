const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
const knex = require('knex');

const db = require('../data/db.js');

server.get('/api/projects',  (req, res) => {
    const projects =  db('projects');
    if (projects) {
        res.status(200).json(projects);
    } else {
        error => {
            res.status(500).json(error);
        }
    }
});

module.exports = server;
