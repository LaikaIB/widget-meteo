/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom/client';

import WidgetMeteo from './components/WidgetMeteo/WidgetMeteo';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <WidgetMeteo zipcodeFromApi="" cityFromApi="" />
);
