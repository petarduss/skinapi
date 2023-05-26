# Skin Generator API

## Opis

Skin Generator API to prosty serwer API umożliwiający generowanie i przechowywanie skinów Minecraft. Wykorzystuje Express.js, MongoDB i inne narzędzia.

## Instalacja

1. Sklonuj repozytorium:

   ```shell git clone https://github.com/petarduss/SkinGeneratorApi.git```

2. Zainstaluj zależności:

  ```cd SkinGeneratorApi```
  ```npm install```

3. Skonfiguruj połączenie z bazą danych MongoDB w pliku server.ts:

// server.ts
// ...
mongoose
    .connect(
        "mongodb://localhost:27017",
        { useNewUrlParser: true, useUnifiedTopology: true, dbName: "skins" }
    )
// ...

4. Uruchom serwer:

```npm start```

5. Serwer będzie dostępny pod adresem http://localhost:3000.

Struktura projektu

    server.ts - Główny plik serwera, konfiguracja i obsługa żądań HTTP.
    generate.ts - Klasa Generate odpowiedzialna za przetwarzanie żądania generowania skinów.
    models/SkinSchema.ts - Model MongoDB dla kolekcji skinów.

Pliki
server.ts

Plik server.ts zawiera konfigurację serwera Express.js oraz obsługę żądań HTTP.
generate.ts

Plik generate.ts zawiera klasę Generate, która odpowiada za przetwarzanie żądania generowania skinów. W metodzie uploadToMineskin następuje przesłanie pliku do Mineskin API, zapisanie wynikowych danych skinu w bazie danych MongoDB oraz obsługa błędów.
