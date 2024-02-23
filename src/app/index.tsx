import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ThemeContextProvider from './context/ThemeContext';

import { Home } from '@pages/home';
import { Layout } from '@widgets/layout';
import { NotFound } from '@pages/notFound';
import { Contrast } from '@pages/contrastChecker';

const App = () => {
  const initTheme = localStorage.getItem('theme') || 'dark';
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/contrast', element: <Contrast /> },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <ThemeContextProvider init={initTheme}>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
};

export default App;
