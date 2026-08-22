import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { MainApp } from '@/pages/main-app/Main.page';
import Chat from '@/pages/main-app/modules/chat';
import Documents from '@/pages/main-app/modules/documents';
import Profile from '@/pages/main-app/modules/profile';
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
