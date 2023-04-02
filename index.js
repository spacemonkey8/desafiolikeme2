const express = require('express')
const app = express()
const { agregarPosts, leerPosts, modificarPosts, borrarPosts } = require('./consultas')
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log('SERVIDOR ENCENDIDO')
})

app.get('/posts', async (req, res) => {
    const resultado = await leerPosts()
    res.json(resultado)
})


app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body
    await agregarPosts(titulo, url, descripcion)
    res.json()
})


app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params
    await modificarPosts(id)
    res.send('Post Modificado con éxito!')
})

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    await borrarPosts(id)
    res.send('Posts eliminado con éxito')
})