import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainApp } from '@/pages/main-app/page';
import { HomePage } from '../pages/Home.page';
import Chat from '../pages/main-app/components/chat';
import Docs from '../pages/main-app/components/docs';
import Profile from '../pages/main-app/components/profile';
import { onBootStrap } from './reducers/auth.reducer';
import { ProtectedRouteIsLoggedIn, ProtectedRouteIsLoggedOut } from './route-protection';
import { useAppDispatch } from './store';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onBootStrap());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
