// Importowanie modułów i plików
import express from 'express'; // Moduł Express.js
import path from 'path'; // Moduł Path
import Generate from './generate'; // Plik klasy Generate
import bodyParser from 'body-parser'; // Moduł Body Parser
import multer from 'multer'; // Moduł Multer

const app = express(); // Inicjalizacja aplikacji Express

const mongoose = require('mongoose'); // Moduł Mongoose do obsługi MongoDB
mongoose.set('strictQuery', true); // Ustawienie surowego zapytania w Mongoose
mongoose
    .connect(
        'mongodb://localhost:27017', // Połączenie z lokalną bazą danych MongoDB
        { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'skins' } // Opcje połączenia
    )
    .then(() => console.log('APP | Connected with MongoDB successfully!')) // Połączenie udane
    .catch(err => console.log(err)); // Obsługa błędu połączenia

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ustawienie nagłówka dla dostępu Cross-Origin
    next();
});

// Konfiguracja przechowywania przesłanych plików z użyciem Multera
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Określenie katalogu, do którego będą zapisywane przesłane pliki
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Określenie nazwy przesłanego pliku
    },
});
const upload = multer({ storage }); // Inicjalizacja Multera z konfiguracją przechowywania

app.set('view engine', 'ejs'); // Ustawienie silnika szablonów EJS

app.use(bodyParser.json()); // Parsowanie żądań w formacie JSON
app.use(express.urlencoded({ extended: true })); // Parsowanie danych z formularzy

app.set('views', [
    path.join(__dirname, 'public'), // Ustawienie ścieżki do katalogu views
]);

// Obsługa żądania GET na główną stronę
app.get('/', (req, res) => {
    res.render('generate'); // Wyrenderowanie szablonu generate.ejs
});

// Obsługa żądania GET na stronę wygenerowanego skina
app.get('/:code', (req, res) => {
    const code = String(req.params.code).replace(':', ''); // Pobranie kodu skina z parametru URL
    res.render('generated', { skin: code }); // Wyrenderowanie szablonu generated.ejs z przekazanymi danymi
});

// Obsługa żądania POST na generowanie skina
app.post('/generate', upload.single('file'), async (req, res) => {
    new Generate(req, res, mongoose); // Utworzenie instancji klasy Generate i przekazanie danych
});

app.use([
    express.static(path.join(__dirname, 'public')), // Ustawienie ścieżki do katalogu publicznego
]);

app.listen(3000, () => console.log('APP | Api app is listening on port 3000!')); // Uruchomienie