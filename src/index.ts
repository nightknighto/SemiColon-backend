import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.post('/upload', (req, res) => {
    const { message } = req.body;
    console.log(message);
    res.status(201).send({ message: 'File uploaded successfully' });
})

app.listen(3008, () => {
    console.log('Server is running on port 3008');
})