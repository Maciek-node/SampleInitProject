# Projekt z warsztatów 'Continuous Integration na przykładzie testów API w Node JS - Bartosz Kuczera'
## W ramach projektu tworzyliśmy lekki framework do testów API

### Instalacja niezbędnych narzędzi
- Zainstalować nodaJs'a według: https://nodejs.org/en
- Zainstalowaliśmy pactum: `npm install pactum --save-dev` biblotek dzięki której możemy wykonywać zapytania do API (https://pactumjs.github.io/)
- Zainstalowaliśmy dotenv: `npm install dotenv --save-dev` bibliotek umożliwia konfigurację pliku w zależności od środowiska (https://www.npmjs.com/package/dotenv)
- Zainstalowaliśmy chai: `npm install chai --save-dev` biblioteka którą używaliśmy do assercji(https://www.chaijs.com/)

### Pierwszy test
Utworzyliśmy plik api.test.js w ramach którego utworzyliśmy pierwszy test którego zadaniem było sprawdzić jeden z podstawowych requestów z https://demoqa.com/swagger/

```
import pkg from "pactum";
const { spec } = pkg;
import { expect } from "chai";

describe("Api tests", () => {
  it.skip("first test", async () => {
    const response = await spec().get(`https://demoqa.com/BookStore/v1/Books`);
    expect(response.body.books[0].title).to.eql("Git Pocket Guide");
    expect(response.statusCode).to.eql(200);
  });
```

### Kolejne testy
W ramach kontynuacji pracy dopisywaliśmy testy kolejnych endpointów. Przenieśliśmy definicje globalnych zmiennych do pliku data.js
I dociągneliśmy je w ramach naszego pliku wykonywalnego którym jest api.test.js
```
import { baseUrl, userID } from "../helpers/data.js";
```
Po dodaniu ostatnich testów poprzez instalacjae mochawsome(`npm install --save-dev mochawesome`) i dopisaniem komendy `--reporter mochawesome` do skryptu uruchomieniowego.
Po każdym uruchomieniu komendy `npm test` zobaczylismy raport z testów

### Konfiguracja CI
W ramach ostanich 2h zajmowaliśmy się konfiguracją Github Actions (https://docs.github.com/en/actions) utworzyliśmy plik Api-Tests-CI.yml 
Dodaliśmy plik .env z secretami dociągneliśmy je potem za pośrednictwem
```
import 'dotenv/config'
export const userName=process.env.SECRET_USERNAME
export const secretPassword=process.env.SECRET_PASSWORD
```
A następnie utworzyliśmy secrety po stronie githuba bazując na https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions