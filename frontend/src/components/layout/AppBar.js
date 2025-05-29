import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import axaLogo from '../../assets/axa_logo.svg';

import { Link, useLocation } from 'react-router-dom';

const MenuLink = styled(Link)(({ theme, active }) => ({
  margin: theme.spacing(0, 2),
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '0.9rem',
  color: "primary.main",
  borderBottom: active ? '3px solid red' : '3px solid transparent',
  paddingBottom: theme.spacing(0.5),
  transition: 'border-color 0.3s ease',
  textDecoration: 'none',
}));

export default function AppBar({ menuItems }) {
  const location = useLocation();

  return (
    <MuiAppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        <Link to="/">
          <Box
            component="img"
            src={axaLogo}
            alt="AXA Logo"
            sx={{ height: 48, width: 48, marginRight: 4 }}
          />
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {menuItems.map((item, index) =>
            (<Box key={`menu-item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                {index !== 0 && <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3 }} />}
                <MenuLink
                    key={item.path}
                    to={item.path}
                    active={location.pathname === item.path ? 1 : 0}
                >
                    {item.label}
                </MenuLink>
            </Box>)
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
