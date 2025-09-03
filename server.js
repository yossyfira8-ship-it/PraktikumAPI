const express = require('express');
const app = express();
const port = 3100;

app.use(express.json());
let movies = [
    {id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010},
    {id: 2, title: 'The Matrix', director: 'The Wachowskis', year: 1999},
    {id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014}
];

app.get('/', (req, res) => {
  res.send('selamat datang dibelajar API Film!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
const id = Number(req.params.id);
const movie = movies.find(m => m.id === id);
 if (!movie) return res.status(404).json({ error: 'Movie tidak,,→ ditemukan' });
res.json(movie);
});

 let idSeq = 4;

app.post('/movies',(req,res)=>{
const {title,director, year}=req.body||{};
if(!title||!director||!year){
returnres.status(400).json({error:'title,director,year →wajibdiisi'});
}
const newMovie={id:idSeq++,title,director,year};
movies.push(newMovie);
res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie tidak ditemukan' });
 }
    const { title, director, year } = req.body || {};
    const updatedMovie = { id, title, director, year };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
const id = Number(req.params.id);
const movieIndex = movies.findIndex(m => m.id === id);
if (movieIndex === -1) {
return res.status(404).json({ error: 'Movie tidak ditemukan',});
}
movies.splice(movieIndex, 1);
res.status(204).send();
});

//BAB 3

let directors = [
    { id: 1, name: 'Yossy Fira', birthYear: 2008 },
    { id: 2, name: 'Alfin Hadi', birthYear : 2009 },
    { id: 3, name: 'Bastomi Lazuardi', birthYear : 2006 }
];

app.get('/', (req, res) => {
    res.send('Welcome to our profile')
});

app.get('/directors', (req, res) => {
    res.json(directors);
});

app.get('/directors/:id', (req, res) => {
 const id = Number(req.params.id);
 const director = directors.find(d => d.id === id);
 if (!director) return res.status(404).json({ error: 'Profil tidak ditemukan' });
 res.json(director);
});

 app.post('/directors', (req, res) => {
  const { name, birthYear } = req.body || {};
  if (!name || !birthYear) {
      return res.status(400).json({ error: 'nama dan tahun lahir wajib diisi' });
     }
     const newDirectors = { id: idSeq++, name, birthYear };
     directors.push(newDirectors);
     res.status(201).json(newDirectors);
 });

 app.put('/directors/:id', (req, res) => {
  const id = Number(req.params.id);
  const directorsIndex = directors.findIndex(d => d.id === id);
  if (directorsIndex === -1) {
     return res.status(404).json({ error: 'Data tidak ditemukan,→' });
     }
     const { name, birthYear } = req.body || {};
     const updatedDirectors = { id, name, birthYear };
     directors[directorsIndex] = updatedDirectors;
     res.json(updatedDirectors);
  });

 app.delete('/directors/:id', (req, res) => {
  const id = Number(req.params.id);
  const directorsIndex = directors.findIndex(d => d.id === id);
  if (directorsIndex === -1) {
     return res.status(404).json({ error: 'Data tidak ditemukan'});
     }
     directors.splice(directorsIndex, 1);
     res.status(204).send();
});

app.use((err, req, res, _next) => {
 console.error('[ERROR]', err);
 res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});


app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});