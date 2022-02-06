import mongoose from 'mongoose'
import Person from '../../schema/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 

const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)


export const authenticated = (fn) => async (req, res) => {
    // токен придет в заголовке authorization
    jwt.verify(req.headers.authorization, 'SEKRET_KEY', function(err, decoded) {
        if(!err && decoded){
            return fn(req, res)
        } 
        res.json({message: 'токен протух'})
    });

    
}

export default async function signin(req, res) {
    // получаем данные из тела запроса
    const {username, password} = req.body
    // отсеиваем запросы если это не POST запрос
    if (req.method !== 'POST'){
        res.status(405).json({error: 'API use only POST request'})
    }
    try{
        const currentUser = await Person.findOne({username: username})
        if(!currentUser){
            throw 'User undefined'
        }

        bcrypt.compare(password, currentUser.password, function(err, result) {
            if(result){
                // создаем токен. Метод принимает объект с данными которые нужно зашить в токен
                // вторым аргументом передаем секретный ключ. 
                const token = jwt.sign({roles: ['admin'] }, 'SEKRET_KEY', { expiresIn: 60 * 60 })
                // Передаем на клиент токен
                res.json({token: token})
            } else {
                res.json({message: 'не верный логин или пароль'})
            }
        });
    } catch(e){
        res.json(e)
    }
}







