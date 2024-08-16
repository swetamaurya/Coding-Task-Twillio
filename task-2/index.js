const express = require('express');
const ivrRoutes = require('./routes/ivrRoutes');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req,res)=>{
    return res.status(200).send("working")
})

app.use('/ivr', ivrRoutes);
app.get('/audio/Fara-interview-audio.mp3', (req, res) => {
    const filePath = path.join(__dirname, 'Fara-interview-audio.mp3');
    res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
