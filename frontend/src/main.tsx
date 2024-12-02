import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from "./Routers/Router"
import {AuthProvider} from './AuthContext/auth.provider';

ReactDOM.render(
  <AuthProvider>
      <RouterProvider router={router} />
  </AuthProvider>,
  document.getElementById('root')
);

