const { Router } = require('express');
const routes = Router();
const DeController  = require('./controllers/DevController');
const SearchController  = require('./controllers/SearchController');

routes.get('/devs', DeController.index);
routes.post('/devs',DeController.store);

routes.get('/search',SearchController.index);

module.exports = routes;