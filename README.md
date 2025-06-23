# Biblioteka

Šis projektas – tai knygų rezervavimo sistema, sudaryta iš **Node.js/Express** backend'o ir **React** frontend'o.

## Projekto struktūra

```
biblioteka/
├── Back/   # Node.js/Express backend
└── Front/  # React frontend (Vite)
```

## Funkcionalumas

- Vartotojų registracija ir prisijungimas (su slaptažodžių šifravimu ir JWT autentifikacija)
- Knygų sąrašo peržiūra, paieška, filtravimas
- Knygų kūrimas, redagavimas, trynimas (admin vartotojams)
- Knygų rezervacija, rezervacijų peržiūra ir atšaukimas
- Knygų vertinimas ir vidutinio vertinimo skaičiavimas
- Komentarų palikimas prie rezervacijų

## Diegimas

### Backend

1. Įeik į `Back` katalogą:
   ```sh
   cd Back
   ```
2. Įdiek priklausomybes:
   ```sh
   npm install
   ```
3. Užpildyk `.env` failą su duomenų bazės duomenimis (pavyzdys jau yra).
4. Paleisk duomenų bazės lentelių kūrimo skriptus iš `tables/` katalogo (jei reikia).
5. Paleisk serverį:
   ```sh
   npm start
   ```

### Frontend

1. Įeik į `Front` katalogą:
   ```sh
   cd Front
   ```
2. Įdiek priklausomybes:
   ```sh
   npm install
   ```
3. Paleisk React aplikaciją:
   ```sh
   npm run dev
   ```

Frontend veiks adresu [http://localhost:5173](http://localhost:5173), backend – [http://localhost:3030](http://localhost:3030).

## API

- Vartotojai: `/api/v1/users`
- Knygos: `/api/v1/books`
- Rezervacijos: `/api/v1/registracijos`

## Naudojamos technologijos

- Node.js, Express, Postgres, Argon2, JWT, Express-validator
- React, Vite, Axios, TailwindCSS

---

Autorius: Tomas Bendaravičius  
Visos teisės saugomos ©