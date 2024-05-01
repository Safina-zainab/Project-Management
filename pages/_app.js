import "@/styles/globals.css";

// In your _app.js or index.js (or any other higher-level component)
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
