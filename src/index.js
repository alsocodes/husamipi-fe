import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import ThemeProvider from './utils/ThemeContext';
import { store, persistor } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../src/index.css';
import App from './App';
// import App2 from './App2.jsx';
// import 'assets/styles/tailwind.css';
import './assets/styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     </Router>
//   </React.StrictMode>
// );
