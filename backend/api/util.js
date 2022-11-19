import crypto from 'crypto';
import jwt from "jsonwebtoken";

const config = process.env;
const getToken = (user) => {
    return jwt.sign({
            user: user          
        }, 
        config.JWT_SECRET, {
            expiresIn: '24h'
        }
    );
}

const encrypt = (password) => {
    var salt = generateSalt(16);
    var passwordAndSalt = sha512(password, salt);
    return passwordAndSalt;
};

function sha512(password, salt){    
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var hash = hash.digest('hex');
    return{
        salt, 
        hash,
    };
}

function generateSalt(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0.16);
}

function login(password, saltOnBank, hashOnBank) {
    var passwordESalt = sha512(password, saltOnBank);
    return hashOnBank === passwordESalt.hash;
 }

export { getToken, encrypt, login };