const mongoose = require('mongoose');

const todoSchema = {
    title: { type: String },
    description: { type: String },
    createdAt: { type: Date }
}

module.exports = {
    Todo: mongoose.model('Todo', todoSchema)
}