const { Schema, model } = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

module.exports = model('User', UserSchema);