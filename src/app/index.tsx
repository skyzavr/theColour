import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ThemeContextProvider from './context/ThemeContext';

import { Home } from '@pages/home';
import { Layout } from '@widgets/layout';
import { NotFound } from '@pages/notFound';
import { Contrast } from '@pages/contrastChecker';
import { Palette } from '@pages/paletteGenerator';
import { ImagePalette } from '@pages/imagePalette';
import { ColourSetsPage } from '@pages/ColourSetsPage';
import { Converter } from '@pages/converter';

const App = () => {
  const initTheme = localStorage.getItem('theme') || 'dark';
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/contrast', element: <Contrast /> },
        { path: '/generator', element: <Palette /> },
        { path: '/palette', element: <ImagePalette /> },
        { path: '/converter', element: <Converter /> },
        { path: '/ColourInfo', element: <ColourSetsPage /> },
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
