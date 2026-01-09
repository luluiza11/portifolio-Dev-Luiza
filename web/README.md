# Luiza - Portfólio (React + TypeScript + PWA)

Este diretório contém um scaffold mínimo criado com Vite + React + TypeScript e configuração PWA via `vite-plugin-pwa`.

Como rodar localmente:

```bash
cd web
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` por padrão.

Para build e preview:

```bash
npm run build
npm run preview
```

Observações:
- O `vite-plugin-pwa` já gera o `manifest` e registro do service worker automaticamente.
- Coloque os ícones em `web/public/` se quiser personalizar (`pwa-192.png`, `pwa-512.png`).
