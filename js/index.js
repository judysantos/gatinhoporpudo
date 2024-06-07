const { Board, Led } = require('johnny-five')
const express = require('express')
const board = new Board()
board.on('ready', () => {
    const led = new Led(11)
    const app = express()
    app.get('/', (req, res) =>{
        res.sendFile('index.html', { root: '.'})
    })
    app.get('/led', (req, res) => {
        const { turnTo }= req.query
        if (typeof led[turnTo] == 'function'){
            led[turnTo]()
            res.send(`Ligando led ${turnTo}`)
        } else {
            res.status(406).send('Ação inválida')
        }
    })
    const port = process.env.PORT || 3000
    app.listen(port,() => console.log(`> Servidor rodando na porta ${port}`))
    })