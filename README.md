# Weather App
# [DEMO](https://hydroxyzinum.github.io/Build-Weather/)

## Описание проекта

Приложение Weather App представляет собой интерактивный веб-интерфейс, разработанный на основе React.js, который позволяет пользователям получать прогноз погоды для выбранных городов. Приложение использует открытый API [OpenWeatherMap](https://openweathermap.org/) для получения актуальных данных о погоде и геолокации пользователей, чтобы предоставить точную информацию о погоде для различных местоположений.

## Возможности приложения

Приложение Weather App обеспечивает пользователей полным спектром функций для удобного и информативного получения и отслеживания погодных данных:

- **Просмотр текущей погоды**: Получайте наглядную информацию о текущей температуре, влажности, скорости ветра, облачности и других важных показателях для выбранного города. Все данные обновляются в реальном времени, что позволяет быть в курсе последних изменений погоды.

- **Подробный прогноз на 5 дней**: Получите точный прогноз погоды на ближайшие 5 дней с детализацией по времени дня. Это позволяет планировать свои действия заранее, учитывая возможные изменения погодных условий.

- **Поиск погоды в разных городах**: Легко найдите прогноз погоды для любого города в мире. Просто введите название интересующего вас места в поисковую строку, и приложение предоставит актуальные погодные данные.

- **Выбор единиц измерения**: Переключайте отображение температуры между градусами Цельсия и Фаренгейта в зависимости от вашего предпочтения.

- **Настройки темы**: Изменяйте внешний вид приложения, выбирая одну из предоставленных тем: "День", "Вечер", "Ночь" или "По умолчанию". Это позволяет настроить интерфейс в соответствии с вашими предпочтениями.

- **Локация по умолчанию**: Задайте город по умолчанию, чтобы при каждом запуске приложения видеть актуальную погоду для вашего предпочтительного местоположения.

## Технические детали

Приложение Weather App разработано на основе популярной библиотеки React.js, что обеспечивает масштабируемость и переиспользование компонентов. Для управления состоянием используется Redux и Redux Toolkit, что облегчает передачу данных между компонентами без необходимости прокидывания через пропсы. Стилизация компонентов осуществляется с использованием CSS, а также библиотеки classnames, что позволяет добавлять и удалять классы в зависимости от условий.

## Как использовать

1. Клонируйте репозиторий на свой компьютер с помощью команды: `git clone https://github.com/Hydroxyzinum/React-Weather.git`

2. Установите зависимости приложения, выполнив команду: `npm install`

3. Запустите приложение с помощью команды: `npm start`

4. Откройте ваш любимый браузер и перейдите по адресу `http://localhost:3000` для использования приложения.

**Важно!** Для корректной работы приложения на локальной машине, создайте файл `.env` в корневой папке проекта и добавьте в него следующие переменные окружения:

- REACT_APP_API_KEY = Ваш Api key OpenWeather
- REACT_APP_API_KEY_RESERVE = Ваш Api key OpenWeather
- REACT_APP_API_KEY_TIME = Ваш Api key IpGeolocation
- REACT_APP_API_KEY_TIME_RESERVE = Ваш Api key IpGeolocation

## Зависимости

- [React.js](https://reactjs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React-Redux](https://react-redux.js.org/)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [React-Yandex-Maps](https://github.com/gribnoysup/react-yandex-maps)
- [Axios](https://axios-http.com/)
- [Lodash](https://lodash.com/)
- [classNames](https://github.com/JedWatson/classnames)

## Автор

Олег. К
