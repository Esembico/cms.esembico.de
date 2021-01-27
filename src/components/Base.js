import React, { useState } from 'react';
import { setSidebarVisibleAction } from '../redux/reducers/pageState';
import { logoutAction } from '../redux/reducers/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseLine from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemLink from './ListItemLink';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GroupIcon from '@material-ui/icons/Group';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PagesIcon from '@material-ui/icons/Pages';
import ImageIcon from '@material-ui/icons/Image';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const drawerWidth = 240;

const links = [
  {
    to: '/',
    text: 'Home',
    icon: <HomeIcon />,
    exact: true
  },
  {
    to: '/team',
    text: 'Team',
    icon: <GroupIcon />
  },
  {
    to: '/prototypes',
    text: 'Prototypes',
    icon: <EmojiObjectsIcon />
  },
  {
    to: '/recommendations',
    text: 'Recommendations',
    icon: <FeaturedPlayListIcon />
  },
  {
    to: '/pages',
    text: 'Pages',
    icon: <PagesIcon />
  },
  {
    to: '/images',
    text: 'Images',
    icon: <ImageIcon />
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function Base({ children, token, sidebarVisible, setSidebarVisible, logout }) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setSidebarVisible(true);
  };

  const handleDrawerClose = () => {
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  return (
    <div className={classes.root}>
      <CssBaseLine />
      {token && (
        <React.Fragment>
          <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
              [classes.appBarShift]: sidebarVisible
            })}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(
                  classes.menuButton,
                  sidebarVisible && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant='h6' noWrap>
                Content management system
              </Typography>
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={sidebarVisible}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {links.map((link) => (
                <ListItemLink
                  key={link.text}
                  to={link.to}
                  primary={link.text}
                  icon={link.icon}
                  exact={link.exact}
                />
              ))}
            </List>
          </Drawer>
        </React.Fragment>
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarVisible
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  const token = state.auth.token;
  const sidebarVisible = state.pageState.sidebarVisible;
  return { token, sidebarVisible };
};

const mapDispatchToProps = (dispatch) => {
  const setSidebarVisible = setSidebarVisibleAction;
  const logout = logoutAction;
  return bindActionCreators({ setSidebarVisible, logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
