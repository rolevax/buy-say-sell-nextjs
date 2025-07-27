import BriefIntro from "@/components/BriefIntro";
import Copyright from "@/components/Copyright";
import HomeClient from "@/components/HomeClient";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
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
        <Button component={NextLink} href="/about">
          About
        </Button>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}

function HomeBody() {
  return (
    <Box>
      <BriefIntro />
      <HomeClient />
      <Copyright />
    </Box>
  );
}
