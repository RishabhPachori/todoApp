const express = require('express');
const cors = require('cors');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { Todo } = require('./schema/todo')
const { authenticateRequest } = require('./middlewares/auth');

const app = express();

app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json({ limit: "100mb", extended: true }));

app.use(cors());

app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 120, // maximum 100 requests per minute
    message: "Too many requests from this IP, please try again in a minute",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

// initiateRoutes(router);

// app.use('/', router);

app.get('/todos', authenticateRequest, async (request, response) => {
    const allTodos = await Todo.find()

    response.status(200).json({ isSuccess: true, data: allTodos, message: 'Successfully get all todos data.' })
})

app.get('/todos/:id', authenticateRequest, async (request, response) => {
    const todoId = request.params.id;
    const isTodoIdExists = !!todoId;
    if (!isTodoIdExists){
        return response.status(400).json({ isSuccess: false, message: 'Please provide todo id.' })
    }
    const allTodos = await Todo.find({ _id: todoId })

    response.status(200).json({ isSuccess: true, data: allTodos[0], message: 'Successfully get todo details.' })
})

app.post('/todos/create', authenticateRequest, async (request, response) => {
    const requestBody = request.body;
    const isRequestBodyExists = !!requestBody && Object.keys(requestBody).length > 0;
    if (!isRequestBodyExists){
        return response.status(400).json({ isSuccess: false, message: 'Please provide todo details.' })
    }
    
    const { title, description } = requestBody;

    await Todo.create({ title, description, createdAt: new Date() })

    response.status(200).json({ isSuccess: true, data: allTodos[0], message: 'Successfully saved todo details.' })
})

app.put('/todos/update', authenticateRequest, async (request, response) => {
    const requestBody = request.body;
    const isRequestBodyExists = !!requestBody && Object.keys(requestBody).length > 0;
    if (!isRequestBodyExists){
        return response.status(400).json({ isSuccess: false, message: 'Please provide todo details to update.' })
    }
    const { id: todoId, updateObj } = requestBody;

    // const todoId = request.params.id;
    const isTodoIdExists = !!todoId;
    if (!isTodoIdExists){
        return response.status(400).json({ isSuccess: false, message: 'Please provide todo id.' })
    }
    

    await Todo.updateOne({ _id: todoId }, { $set: updateObject })

    response.status(200).json({ isSuccess: true, data: allTodos[0], message: 'Successfully updated todo details.' })
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// For serving files statically from 'public' directory
app.use('/public', express.static('public'));

module.exports = {
    app,
    router
};
