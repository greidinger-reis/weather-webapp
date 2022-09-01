# Simple weather app - Aplicativo simples de clima

![app screenshot](/public/screenshot.png)

## Description - Descrição

:uk: This is a simple weather app that uses the OpenWeatherMap API to get the current weather and forecast for a city. (only brazillian cities are supported, but you can configure the API request url country code in `src/server/router/weather.ts`)


:brazil: Este é um aplicativo simples de clima que usa a API OpenWeatherMap para obter o clima atual e a previsão para uma cidade.

[Working deploy in Vercel - Deploy funcional na Vercel](https://weather-webapp-pi.vercel.app/)

## Technologies Used - Tecnologias Usadas

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com)
- [TRPC](https://trpc.io)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Axios](https://axios-http.com/)

## Implementation details - Detalhes de implementação

:uk: This project uses Axios to fetch the weather data from the OpenWeatherMap API, and TRPC to make the API type-safe and interact directly with the front-end.


:brazil: Este projeto usa Axios para buscar os dados do clima da API OpenWeatherMap e TRPC para fazer a segurança dos tipos da API e interagir diretamente com o front-end.

## Installation - Instalação

```bash
npm install
```

:uk: Rename `.env-example` to `.env` and fill in with your OpenWeatherMap API key.


:brazil: Renomeie `.env-example` para `.env` e preencha com sua chave da API OpenWeatherMap.


## Usage - Uso

```bash
npm run dev | npm start
```
