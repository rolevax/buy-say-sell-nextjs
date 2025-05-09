'use client'
 
import { AppBar, Box, Button, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, TextField, Toolbar, Typography } from '@mui/material';
import { usePathname } from 'next/navigation'
import NextLink from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import Copyright from '@/components/Copyright';
 
export default function Story() {
  const pathname = usePathname();
  let storyID = pathname.substring(pathname.lastIndexOf('/') + 1);
 
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <StoryAppBar storyID={storyID} />
        <StoryBody storyID={storyID} />
      </Box>
    </Container>
  );
}

function StoryAppBar(props: {storyID: string}) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          href="/"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Story {props.storyID}
        </Typography>
        <Box>
          <Button component={NextLink} href="/about">About</Button>
          <Button>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function StoryBody(props: {storyID: string}) {
  let storyEvents = [];
  for (let i = 0; i < 10; i++) {
    storyEvents.push((
      <ListItem key={i}>
        <ListItemAvatar>N</ListItemAvatar>
        <ListItemText primary="name" secondary="bla bla bla bla bla bla bla bla" />
      </ListItem>
    ));
  }
  return (
    <Box>
      <List>
        {storyEvents}
      </List>
      <CommentInput />
    </Box>
  );
}

function CommentInput() {
  return (
    <Box>
      <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          fullWidth
          rows={2}
        />
      <Button variant="contained">Buy</Button>
      <Button variant="contained">Say</Button>
      <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      <Button variant="contained">Sell</Button>
      <Copyright />
    </Box>
  );
}