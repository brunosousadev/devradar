
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        try {
            let dev = await Dev.findOne({ github_username });

            if (!dev) {

                const response = await axios.get(`https://api.github.com/users/${github_username}`);
                const { name = login, avatar_url, bio } = response.data;
                const techsArray = parseStringAsArray(techs);

                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
                dev = await Dev.create({
                    name,
                    github_username,
                    bio,
                    avatar_url,
                    techs: techsArray,
                    location
                });

            }
            return res.json(dev);
        } catch (error) {
            return response.status(404).json('User does not exists');
        }

    },

    async update(req, res) {

    },

    async destroy(req, res) {
        const { id } = req.params;

        try {
            const dev = await Dev.findOne({ _id: id });
            if (dev) {
                await Dev.deleteOne({ _id: id });
                return res.send('Successfully deleted Dev');
            }
            return res.status(402).send('Non-existent user');
        } catch (error) {         
            return res.status(402).send('Error when trying to delete Dev');
        }
    }
};