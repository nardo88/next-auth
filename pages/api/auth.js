import mongoose from 'mongoose'
import Person from '../../schema/users.js'

const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)

export default async function auth(req, res) {
    const {username, password} = req.body

    try{
        const user = await Person.findOne({username: username})
        console.log(user)
        if(user){
            throw 'Пользователь уже существует'
        }
        const newUser = await Person.create({username,password})
        return res.json({result: newUser})
    } catch(e){
        res.json(e)
    }

}