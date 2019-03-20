const express = require('express')
const app = express()
app.use(express.json())

const userData = require('./userData.json')
const ctrl = require('./usersCtrl')

app.get('/api/user/:id', ctrl.getUsersId)
app.get('/api/user/', ctrl.getUsers)
app.get('/api/admin', ctrl.getAdmin)
app.get('/api/nonadmin', ctrl.nonAdmin)
app.get('/api/type/:type', ctrl.type)
app.put('/api/user/:userId', ctrl.updateUser)
app.post('/api/user', ctrl.newUser)
app.delete('/api/user/:id', ctrl.delete)

const port = 3000

app.listen(port, () => console.log(`Tryna be a mentor on port, ${port}`))