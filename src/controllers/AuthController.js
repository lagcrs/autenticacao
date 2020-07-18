const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async auth(req, res){

        const { email, password } = req.body;

        //verificar se existe user no banco
        const user = await User.findOne({ email }).select('+password');

        //não existir user no banco
        if(!user) return res.status(400).send({ error: 'User not found' });

        //senhas não iguais
        if(!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' });

    },

    async store(req, res){
        const { email } = req.body;
        try {

            if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.json(user);

        } catch(err) {

            return res.status(400).send({ error: 'Registration failed' });

        }
    }
}