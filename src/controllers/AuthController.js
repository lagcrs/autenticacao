const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

generateToken = ( params = {} ) => (
    //passar informacao unica, hash unico do token e tempo de expiracao
    jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
)

module.exports = {
    async auth(req, res){

        const { email, password } = req.body;

        //verificar se existe user no banco
        const user = await User.findOne({ email }).select('+password');

        //não existir user no banco
        if(!user) return res.status(400).send({ error: 'User not found' });

        //senhas não iguais
        if(!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
        });
    },

    async store(req, res){
        const { email } = req.body;
        try {

            if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({ 
                user, 
                token: generateToken({ id: user.id }) 
            });

        } catch(err) {

            return res.status(400).send({ error: 'Registration failed' });

        }
    }
}