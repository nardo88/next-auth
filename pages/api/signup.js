import mongoose from 'mongoose'
import Person from '../../schema/users.js'
import bcrypt from 'bcrypt'

const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)

export default async function signin(req, res) {
    // получаем данные из тела запроса
    const {username, password} = req.body
    // отсеиваем запросы если это не POST запрос
    if (req.method !== 'POST'){
        res.status(405).json({error: 'API use only POST request'})
    }
    // используем bcrypt что бы захешировать пароль
    bcrypt.hash(password, 7, async (err, hash) => {
        try{
            // проверяем есть ли пользователь в БД с таким именем
            const user = await Person.findOne({username: username})
            if(user){
                throw 'Пользователь уже существует'
            }
            // добавляем пользователя в БД
            const newUser = await Person.create({username, password: hash})
            return res.json({result: newUser})
        } catch(e){
            res.json(e)
        }
    })
}


