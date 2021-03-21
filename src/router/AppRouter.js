import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import { ItemScreen } from '../items/ItemScreen';
import { SeachScreen } from '../search/SearchScreen';
import { Navbar } from '../ui/Navbar';

export const AppRouter = () => {
    return (
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={SeachScreen} />
                        <Route  path="/item/:itemId" component={ItemScreen} />
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
    )
}
