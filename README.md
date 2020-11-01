
# Ссылки на демки
* [Ссылка на демо бэкофис (интерфейс для сотрудников приютов)](https://lk.dev.meteora.pro/)
* [Публичный каталог животных](https://pets.dev.meteora.pro/)
* [Публичная swagger документация](https://api-pet-hackaton.dev.meteora.pro/public/docs/)
* [swagger документация внутреннего api](https://api-pet-hackaton.dev.meteora.pro/docs/)

## Данные для входа
| Роль              | Логин         | Пароль  |
| ----------------- |:-------------:| -------:|
| ГБУ "Доринвест"   | ДЖКХ          | 123123 |
| префектура        | СВАО          | 123123 |
| эксп. организация | Организация - ВАО  | 123123 |
| Врач              | Врач 1        | 123123 |
| Приют             | Работник 1    | 123123 |

# Как запустить проект
## Необходимое ПО для запуска
1. [Docker](https://www.docker.com/get-started)
1. [NodeJS](https://nodejs.org/en/)
## Запуск
1. Нужен docker и docker-compose
1. Выполнить команду `docker-compose --env-file ./config/api/.local.env up -d`

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
