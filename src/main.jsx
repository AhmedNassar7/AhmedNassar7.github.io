import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';

// Unregister stale service workers in development to prevent reload loops
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
      console.log(
        '[DEV] Unregistered stale service worker:',
        registration.scope,
      );
    });
  });
} else if (import.meta.env.PROD) {
  // Registered manually (instead of vite-plugin-pwa's auto-injected script) so
  // we can force the service worker to re-check for a new deploy periodically
  // and whenever the tab regains focus, not just on the initial page load.
  import('virtual:pwa-register').then(({ registerSW }) => {
    const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

    const updateSW = registerSW({
      onRegisteredSW(_swUrl, registration) {
        if (!registration) return;

        setInterval(() => registration.update(), UPDATE_CHECK_INTERVAL);

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update();
          }
        });
      },
    });

    void updateSW;
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
