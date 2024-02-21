import { NavLink } from 'react-router-dom';

import { cards } from '@shared/model/Card';

import classes from './navbar.module.css';

type props = {
  onLinkHandler: () => void;
};

export const NavBar = ({ onLinkHandler }: props) => {
  return (
    <ul>
      {cards.map(({ id, path, title }) => (
        <li key={id} className={classes.navEl}>
          <NavLink
            to={path}
            className={({ isActive }) => (isActive && classes.current) || ''}
            onClick={() => onLinkHandler()}
          >
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
