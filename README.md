## Iniciando

* Crie uma nova branch a partir da `development`
* O nome da branch deve ser `feature/nome-da-feature`

Certifique-se de possuir a versão correta do node instalada (v14) `nvm ls node` e então rode:

```bash
yarn && yarn dev
```

Para visualizar a aplicação, abra [http://localhost:3000](http://localhost:3000) no seu browser.

## Scripts

```bash
    "start": Inicia uma versão gerada de build.
    "build": Gera o build de uma versão de produção.
    "test": Roda todos os testes.
    "dev": Inicia na porta 3000.
    "lint": Lint dos arquivos.
    "lint:fix": Lint dos arquivos e autofix.
    "format":  Formatação dos arquivos.
    "format:check": Checagem da formatação dos arquivos.
    "commit": Comitar mudanças.
    "prepare": Será executado quando instalar todas as dependências do projeto.
```

## Padrões de commit

  * `fix(:scope): (descrição)`: Corrige um bug.

  * `feat(:scope): (descrição)`: Adiciona uma nova funcionalidade.

  * `docs(:scope): (descrição)`: Adiciona uma nova documentação.

  * `style(:scope): (descrição)`: Corrige um bug de estilo.

  * `refactor(:scope): (descrição)`: Refatora um código.

  * `perf(:scope): (descrição)`: Melhora a performance.

  * `test(:scope): (descrição)`: Adiciona um novo teste.

  * `chore(:scope): (descrição)`: Altera o comportamento do projeto.

  * `revert(:scope): (descrição)`: Reverte um commit.

  * `WIP(:scope): (descrição)`: Work in progress.

  * `BREAKING CHANGE(:scope): (descrição)`: Alteração que pode causar problemas.

  * `release(:scope): (descrição)`: Lançamento de uma nova versão.

* **As descrições são opcionais. Caso coloque ele deverá ser breve.**

## Enviado suas mudanças

* Para adicionar suas mudanças, faça uma Pull Request para a `development` e peça para alguém validar suas mudanças e fazer o merge.
* Depois de validado, faça outra Pull Request de `development` para `staging` e peça para alguém validar suas mudanças e fazer o merge.
* Depois de validado, faça outra Pull Request de `staging` para `master` e faça o merge.
