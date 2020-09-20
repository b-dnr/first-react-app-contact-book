import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Contacts from './Contacts';
import Mycontacts from './Mycontacts';

function Routers() {
    return (
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/mycontacts" component={Mycontacts} />

        </Switch>
    )
}

export default Routers;
