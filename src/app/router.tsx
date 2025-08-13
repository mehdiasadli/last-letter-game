import { Route, Routes } from 'react-router-dom';

import StartPage from '../pages/start.page';
import SettingsPage from '../pages/settings.page';
import PlayersPage from '../pages/players.page';
import GamePage from '../pages/game.page';
import ResultPage from '../pages/result.page';
import AppLayout from './layouts/app.layout';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<StartPage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route path='players' element={<PlayersPage />} />
        <Route path='game' element={<GamePage />} />
        <Route path='result' element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
