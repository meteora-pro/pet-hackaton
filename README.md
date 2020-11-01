
# Ссылки на демки
* [Ссылка на демо бэкофис (интерфейс для сотрудников приютов)](https://lk.dev.meteora.pro/)
* [Публичный каталог животных](https://pets.dev.meteora.pro/)
* [Публичная swagger документация](https://api-pet-hackaton.dev.meteora.pro/public/docs/)
* [swagger документация внутреннего api](https://api-pet-hackaton.dev.meteora.pro/docs/)

## Данные для входа
| Роль              | Логин         | Пароль  | Область видимости |
| ----------------- |:-------------:| -------:| ----------:|
| ДЖКХ   | ДЖКХ          | 123123 | Все питомники |
| эксп. организация   | ГБУ "Доринвест"          | 123123 | Все питомники |
| префектура        | СВАО          | 123123 | Питомники СВАО |
| префектура        | СВАО          | 123123 | Питомники СВАО |
| эксп. организация | ГБУ "Автомобильные дороги ВАО  | 123123 | Питомники организации |
| Врач              | Врач 1        | 123123 | Приют «Зеленоград» |
| Приют             | Игнатов А.В.    | 123123 | Приют «Зеленоград» |
| Приют             | Черкашин И.А.   | 123123 | Приют «Бирюлево» |
| Приют             | Дружинин А.М.   | 123123 | Приют «Зоорассвет» |
| Приют             | Хвостичкина Н.М | 123123 | Кожуховский приют |
| Приют             | Врач 13 | 123123 |  Приют «Красная сосна» |
| Приют             | Работник 18   | 123123 | Приют «Дубовая роща» |
| Приют             | Работник 23   | 123123 |  Приют «Искра» |
| Приют             | Мисочкин И.А.   | 123123 | Приют «Щербинка» |
| Приют             | Мячиков И.А.  | 123123 | Приют «Некрасовка» |
| Приют             | Погуляйкин И.А.  | 123123 | Приют «Печатники» |
| Приют             | Котиков М.Я. | 123123 | Приют «GETDOG» |
| Приют             | Погуляйка И.А.  | 123123 | Приют «Молжаниново» |

# Как запустить проект
## Необходимое ПО для запуска
1. [Docker](https://www.docker.com/get-started)
1. [NodeJS](https://nodejs.org/en/)
## Запуск
1. Нужен docker и docker-compose
1. Выполнить команду `docker-compose --env-file ./config/api/.local.env up -d`
1. Первый раз могут довольно долго собираться образы, последующие запуски будут быстрыми
1. После того как все стартует можно смотреть приложение:
    1. [бэкофис (интерфейс для сотрудников приютов)](http://localhost:8080/auth/login)
    1. [Публичный каталог животных](http://localhost)
    1. [Внутреняя документация Swagger Api](http://localhost:3333/docs)
    1. [Публичная документация Swagger Api](http://localhost:3333/public/docs)

# Используемые технологии
1. Использован один язык для написания backend и frontend - [TypeScript](https://www.typescriptlang.org/)
1. Управление монорепозиторием [Nx](https://nx.dev)
1. Frontend - [Angular](https://angular.io/) ([Material Theme](https://material.angular.io/))
1. Backend ([NodeJs](https://nodejs.org/en/), [NestJs](https://nestjs.com/), [TypeOrm](https://typeorm.io/))
1. База данных [Postgres](https://www.postgresql.org/)
1. Деплой [Kubernetes](https://kubernetes.io/ru/), [Helm](https://helm.sh/), [Gitlab CI/CD](https://docs.gitlab.com/ee/ci/)

# Как запустить в режиме разработки
1. Нужны nodejs и npm
1. Установить зависимости командой `npm i`
1. Настроить коннект к серверу баз данных и создать базу данных
1. Запустить с помощью команды `npm start` (для запуска всех сервисов)
   1. Или для старта бэкенда `npm run start:api`
   1. Или для старта фронтофиса(публичный каталог) `npm run start:frontoffice`
   1. Или для старта бэкенда(для сотрудников приютов) `npm run start:backoffice`

# Структура проекта
1. apps/ - тут лежит основной код сервисов
1. config/ - .env файлы для бэкенд сервисов
1. deploy/ - docker файлы и конфиги для деплоя в kubernetes
1. libs/ - исходных код для общих библиотек в проекте

# Как добавить миграцию
установить tsnode глобально:
`npm i -g ts-node`

Сгенерить миграцию по схеме:
`npm run typeorm -- migration:generate -n MigrationName`

Добавить созданную миграцию в массив с миграциями (all.migations.ts)
