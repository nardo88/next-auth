
import mongoose from 'mongoose'

const Person = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

export default mongoose.models.Person || mongoose.model('Person', Person)

