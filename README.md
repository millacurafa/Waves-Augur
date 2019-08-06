# Waves-Augur

## Структура проекта

```
├── public               # Каталог с содержимым результатов сборки
├── src                  # Каталог исходных файлов
│   ├── Application.js   # Корневой компонент приложения
│   ├── actions          # Redux actions 
│   ├── index.js         # Входная точка приложения
│   ├── components       # Каталог вспомогательных компонентов
│   │   └── index.js     # Инициалзация компонентов
│   │                        1. ClientStorageComponent - работа со стороджем браузера.
│   │                        2. HtmlComponent - работа с html. Основное использование - это БЭМ.
│   │                        3. HttpComponent - работа с запросами(на будущее).
│   │                        4. LocaleComponent - конфигурация локализации.
│   │                        5. StoreComponent - работа с глобальным хранилещем(Redux).
│   │                        6. UiComponent - работа с UI компонентами.
│   ├── enums            # Каталог файлов с описанием перечеслимых данных
│   ├── reducers         # Redux reducers
│   ├── routes           # Каталог отдельных страниц с их внутренними компонентами
│   │   └── index.js     # Дерево страниц
│   ├── shared           # Каталог общих компонентов
│   ├── style            # Каталог стилей
│   │   └── index.scss   # Корневой файл стилей
│   ├── types            # Описание часто используемых/громоздких PropTypes схем
│   └── ui               # Каталог UI компонентов(будут добавлны по ходу проекта)
│       ├── form         # UI форм
│       ├── list         # UI списков
│       ├── modal        # UI модальных окон
│       └── nav          # UI навигации
└── webpack.js           # Конфигурация webpack
```


## Run docker

```sh
docker build -t ventuary .
docker run -itd --name ventuary --restart always -v ~/dev/ventuary:/data -p 5000:5000 ventuary
```


## Install to deploy

```
ln -s /var/www/ventuary-dao/repo/dev/nginx.conf /etc/nginx/sites-enabled/ventuary-dao.conf

```
