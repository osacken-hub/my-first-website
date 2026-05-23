# Личный сайт — Дмитрий Остен Сакен

Статический одностраничный сайт на HTML, CSS и JavaScript.

## Структура проекта

```
my-first-website/
├── index.html
├── style.css
├── script.js
├── site-config.js      # контакты и Formspree
├── favicon.svg
├── sitemap.xml
├── robots.txt
├── images/
│   └── avatar.jpg
├── .github/workflows/
│   └── pages.yml       # автодеплой на GitHub Pages
└── README.md
```

## Быстрый старт

```powershell
cd c:\Users\RDSIM023\Desktop\my-first-website
python -m http.server 8080
```

Откройте: http://localhost:8080

## Настройка перед публикацией

Отредактируйте `site-config.js`:

```javascript
window.SITE_CONFIG = {
  siteUrl: "https://osacken-hub.github.io/my-first-website/",
  formspreeEndpoint: "https://formspree.io/f/ВАШ_ID",

  contacts: {
    email: "ваш@email.com",
    telegram: "ваш_username",
    phone: "+79001234567",
    phoneDisplay: "+7 900 123-45-67",
  },
};
```

1. Зарегистрируйтесь на [formspree.io](https://formspree.io) и создайте форму.
2. Вставьте URL формы в `formspreeEndpoint`.
3. Укажите реальные контакты — они автоматически подставятся на странице.

## Деплой на GitHub Pages

1. В репозитории GitHub: **Settings → Pages → Build and deployment → GitHub Actions**.
2. Закоммитьте и запушьте изменения в ветку `main`.
3. Workflow `.github/workflows/pages.yml` опубликует сайт автоматически.

Адрес: https://osacken-hub.github.io/my-first-website/

## Текущее состояние

| Раздел           | Статус |
|------------------|--------|
| Hero             | Готово |
| Обо мне          | Готово |
| Проекты          | Готово |
| Контакты + форма | Готово (Formspree по настройке) |
| SEO / OG         | Готово |
| Favicon          | Готово |
| Адаптив + меню   | Готово |
| GitHub Pages CI  | Готово |

## Следующие шаги

- Заменить контакты и подключить Formspree в `site-config.js`
- Запушить на GitHub и включить Pages
- Добавить отдельные страницы или модальные окна для проектов
- Подключить аналитику (Google Analytics / Yandex Metrica)

## Git

```powershell
git status
git add .
git commit -m "Описание изменений"
git push
```
