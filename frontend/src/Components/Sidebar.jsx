import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { SymbolState } from '../SymbolContext';
import { Typography } from '@mui/material';

export default function Sidebar() {

  // PROVIDED BY MATERIAL UI----------------------------
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const { watchlist, setSymbol, setFunc, setWatchlist } = SymbolState();
  const removeFromWatchlist = (itemToRemove) => {
    const updatedWatchlist = watchlist.filter(item => item !== itemToRemove);
    setWatchlist(updatedWatchlist);
  };
  // ---------------------------------------------------

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant='contained' onClick={toggleDrawer(anchor, true)}>Watchlist</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div style={{ width: '400px', padding: '20px' }} className='flex-v2'>
              <Typography>Watchlist</Typography>

              <div className="flex-v1">
                {watchlist && watchlist.map((item, index) => (
                  <div key={index} className='watchlist__item pointer flex-s' onClick={() => { setSymbol(item.symbol); setFunc(item.func); }}>
                    <div className="flex-vh">
                      <Typography variant='h6'>{item.symbol}</Typography>
                      <Typography variant='sub-title'>{item.func}</Typography>
                    </div>
                    <Button onClick={() => removeFromWatchlist(item)} variant='outlined'>Remove</Button>
                  </div>
                ))}
              </div>

            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
