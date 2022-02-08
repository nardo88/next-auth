import mongoose from 'mongoose'
import Person from '../../schema/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
import cookie from 'cookie'

const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)


export const authenticated = (fn) => async (req, res) => {
    // токен вытаскиваем из cookies. auth - это тот ключ который
    // мы указали при записи оце в cookie
    jwt.verify(req.cookies.auth, 'SEKRET_KEY', function(err, decoded) {
        if(!err && decoded){
            return fn(req, res)
        } 
        res.json({message: 'токен протух'})
    })
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

                // работа с cookie. 
                // serialize - это что-то типы JSON.stringify для cookie
                // первым аргументом передаем ключ по которому можем затем обращаться в cookie
                // вторым передаем ключ JWT
                res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                    httpOnly: true,
                    secure: false, // используется ли https
                    sameSite: 'strict',
                    maxAge: 3600, // время жизни cookie
                    path: '/' // путь где будет доступны cookie в рамках домена
                }))
                // Передаем на клиент токен
                res.json({message: 'Welcome back to our APP!'})
            } else {
                res.json({message: 'не верный логин или пароль'})
            }
        });
    } catch(e){
        res.json(e)
    }
}







