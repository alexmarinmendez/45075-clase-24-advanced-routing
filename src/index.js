import express from 'express'

const app = express()

app.param('word', async(req, res, next, word) => {
    if(!word) req.word = null
    else req.params.word = word.toLowerCase()
    next()
})

app.get('/api/dictionary/:word', (req, res) => {
    const word = req.params.word
    res.send(`Significado de la palabra ${word}`)
})

app.post('/api/dictionary/:word', (req, res) => {
    const word = req.params.word
    res.send(`Significado de la palabra ${word}`)
})


app.get('*', (req, res) => {
    res.status(404).send('No se puede encontrar la palabra')
})

app.listen(8080, () => console.log('Server Up'))