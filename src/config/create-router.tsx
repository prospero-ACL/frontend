import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/homepage/home.page';
import MainApp from '@/main-app/main.page';
import Chat from '@/main-app/modules/chat';
import Documents from '@/main-app/modules/documents';
import Profile from '@/main-app/modules/profile';
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
        path: 'documents',
        element: <Documents />,
      },
    ],
  },
]);

export function MainRouter() {
  return <RouterProvider router={router} />;
}
