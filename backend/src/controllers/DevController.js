
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },


    async store(req, res) {
        const { github_usename, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({
            github_usename
        });

        if (!dev) {

            const response = await axios.get(`https://api.github.com/users/${github_usename}`);
            const { name = login, avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            dev = await Dev.create({
                name,
                github_usename,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });


        }
        return res.json(dev);
    }
};