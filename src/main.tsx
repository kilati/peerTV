import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { StrictMode } from 'react'
import App from "./App.tsx";
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
    </StrictMode>,
);
