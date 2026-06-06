import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainApp } from '@/pages/main-app/page';
import { HomePage } from '../pages/Home.page';
import Chat from '../pages/main-app/components/chat';
import Profile from '../pages/main-app/components/profile';
import Docs from '../pages/main-app/modules/docs';
import { ProtectedRouteIsLoggedIn, ProtectedRouteIsLoggedOut } from './route-protection';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRouteIsLoggedOut>
        <HomePage />
      </ProtectedRouteIsLoggedOut>
    ),
  },
  {
    path: '/app',
    element: (
      <ProtectedRouteIsLoggedIn>
        <MainApp />
      </ProtectedRouteIsLoggedIn>
    ),
    children: [
      {
        index: true,
        element: <Chat />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'docs',
        element: <Docs />,
      },
    ],
  },
]);

export function MainRouter() {
  return <RouterProvider router={router} />;
}
