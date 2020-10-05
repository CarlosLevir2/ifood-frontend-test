import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Callback from '../pages/Callback';
import Playlists from '../pages/Playlists';

export default function Routes() {
  return (
    <Switch>
      <Route path="/callback" component={Callback} />
      <Route path="/playlists" component={Playlists} />
      <Route path="/" component={SignIn} />
    </Switch>
  );
}
