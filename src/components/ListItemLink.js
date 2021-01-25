import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default function ListItemLink({ icon, primary, to }) {
  return (
    <li>
      <ListItem
        button
        component={NavLink}
        to={to}
        activeClassName='Mui-selected'
        exact={true}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
