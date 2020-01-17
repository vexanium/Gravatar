import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/home';


import 'semantic-ui-css/semantic.min.css';
import './assets/index.css';

ReactDOM.render(
    <div className={'container'}>
        <Index />
    </div>, document.getElementById('root'));
