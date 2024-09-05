import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/vendas', async (req, res) => {
    
    await prisma.user.create({
        data: {
            produto: req.body.produto, 
            quantidade:  req.body.quantidade,
            valor: req.body.valor,
            tipo:      req.body.tipo,
            valorTotal: req.body.valorTotal,
            tipoDePagamento: req.body.tipoDePagamento,
            cliente: req.body.cliente,
            valorPago: req.body.valorPago,
            troco:  req.body.troco,
            data: req.body.data
        }
    })
    
    res.status(201).json(req.body)
})

app.get('/vendas', async (req, res) => {
    
    let vendas = []

    if(req.query){
        vendas = await prisma.user.findMany({
            where:{
                produto: req.query.produto, 
                quantidade: req.query.quantidade,
                valor: req.query.valor,
                tipo: req.query.tipo,
                valorTotal: req.query.valorTotal,
                tipoDePagamento: req.query.tipoDePagamento,
                cliente: req.query.cliente,
                valorPago: req.query.valorPago,
                troco:  req.query.troco,
                data: req.query.data
            }
        })
    }
    else{
        vendas = await prisma.user.findMany()
    }

    res.status(200).json(vendas)
})

app.put('/vendas/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            produto: req.body.produto, 
            quantidade: req.body.quantidade,
            valor: req.body.valor,
            tipo: req.body.tipo,
            valorTotal: req.body.valorTotal,
            tipoDePagamento: req.body.tipoDePagamento,
            cliente: req.body.cliente,
            valorPago: req.body.valorPago,
            troco:  req.body.troco,
            data: req.body.data
        }
    })
    
    res.status(201).json(req.body)
})

app.delete('/vendas/:id', async (req, res) =>{
    
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message: "Venda deletada com sucesso!"})
})

app.listen(3000)


/*
    Criar API de Vendas

    {
        "produtos": ["manicoto","parafuso"],
        "quantidades":[1,2],
        "valores": [10,4],
        "tipos": ["produto","produto"],
        "valorTotal": 14,
        "tipoDePagamento": "Cartao de Credito",
        "valorPago": 14,
        "troco": "Sem troco"
    }

    winisc
    WTysVG3V6cC9Di0C

*/