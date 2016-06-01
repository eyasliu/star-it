import setGlobal from './setGlobal';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import RouterHistory from 'react-router/lib/hashHistory'

setGlobal({
  React,
  ReactDOM,
  Router,
  Route,
  RouterHistory
})