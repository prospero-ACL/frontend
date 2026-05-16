import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainApp } from '@/pages/main-app.page';
import { HomePage } from '../pages/Home.page';
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
        element: <h2>app</h2>,
      },
      {
        path: 'profile',
        element: <h2>profile</h2>,
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
