import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <HomeAppBar />
        <HomeBody />
      </Box>
    </Container>
  );
}

function HomeAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Buy Say Sell
        </Typography>
        <Box>
          <Button component={NextLink} href="/about">About</Button>
          <Button>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function HomeBody() {
  let stories = [];
  for (let i = 0; i < 10; i++) {
    stories.push((
      <ListItem disablePadding key={i}>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Story " + i} />
        </ListItemButton>
      </ListItem>
    ));
  }

  return (
    <Box>
      <List>
        {stories}
      </List>
      <ProTip />
      <Copyright />
    </Box>
  );
}
