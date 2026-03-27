const express = require('express');
const app = express();

app.use(express.json());

app.use('/tournaments', require('./modules/tournaments/routes'));
app.use('/players', require('./modules/players/routes'));
app.use('/teams', require('./modules/teams/routes'));
app.use('/tournament-teams', require('./modules/teams/tournamentTeam.routes'));
app.use('/fixture', require('./modules/fixture/routes'));
app.use('/matches', require('./modules/matches/routes'));

module.exports = app;