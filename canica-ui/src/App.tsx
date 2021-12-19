// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.less';

// import { useState } from 'react';
import { useAppSelector } from './app/hooks';
import Files from './app/pages/files';
import { Login } from './app/pages/login';
import { selectUser } from './app/store/auth/slice';


// function routeComponent (route: string) {
//   switch(route) {
//     case 'login':
//       return (<Login></Login>);
//     case 'files':
//       return (<Files></Files>);
//   }
//   return null;
// };

function App() {
  // TODO: ceck hhot to connect state to the router
  // const [routeState, setRouteState] = useState('files');

  const user = useAppSelector(selectUser);

  
  // return (routeComponent(routeState));
  return (user ? <Files></Files> : <Login></Login>);
}

export default App;
