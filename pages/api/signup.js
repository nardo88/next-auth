import mongoose from 'mongoose'
import Person from '../../schema/users.js'

const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)

export default async function auth(req, res) {
    // получаем данные из тела запроса
    const {username, password} = req.body
    // отсеиваем запросы если это не POST запрос
    if (req.method !== 'POST'){
        res.status(405).json({error: 'API use only POST request'})
    }
}


