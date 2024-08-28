import express from 'express'

const app = express()

app.get('/vendas', (req, res) => {
    res.send('Ok')
})

app.listen(3000)


/*
    Criar API de Vendas

    -

*/