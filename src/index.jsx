import React from 'react'
import { render }  from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyCbxkRRDFsrir95X3jHffVKjqYj-HK4gfc',
  authDomain: 'curso-react-a04a6.firebaseapp.com',
  databaseURL: 'https://curso-react-a04a6.firebaseio.com',
  storageBucket: 'curso-react-a04a6.appspot.com',
  messagingSenderId: '1047679653490'
});

import App from './components/App'

render(<App />, document.getElementById('root'))
