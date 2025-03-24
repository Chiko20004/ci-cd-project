const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/monprojet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB', err))

const itemSchema = new mongoose.Schema({
    name: String,
    description: String
})

const Item = mongoose.model('Item', itemSchema)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bonjour le monde!')
})

// Route GET pour récupérer la liste des objets
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des objets')
    }
})

// Route POST pour ajouter un nouvel objet
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body)
    try {
        await newItem.save()
        res.status(201).send('Objet sauvegardé avec succès')
    } catch (err) {
        res.status(400).send('Erreur lors de la sauvegarde de l\'objet')
    }
})

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution à http://localhost:${port}`)
})