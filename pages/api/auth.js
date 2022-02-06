import mongoose from 'mongoose'
import Person from '../../schema/users.js'
import {authenticated} from './login'
const url = 'mongodb+srv://admin:admin@cluster0.qqf5x.mongodb.net/simpleAuth?retryWrites=true&w=majority'

mongoose.connect(url)

async function auth(req, res) {
    try{
        const user = await Person.find()
        return res.json({result: user})
    } catch(e){
        res.json(e)
    }
}

export default authenticated(auth)