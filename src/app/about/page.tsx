import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={"About"} />
        <DocsBody />
        <Copyright />
      </Box>
    </Container>
  );
}

function DocsBody() {
  return (
    <Stack direction="row">
      <Box sx={{ width: "480px", overflow: "auto" }}>
        <List>
          {["About Buy Say Sell", "Contributers"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Stack direction="column" sx={{ p: 3 }}>
        <Typography variant="h4">About Buy Say Sell</Typography>
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          What
        </Typography>
        <Typography variant="body1">
          Buy Say Sell is an altered social media where only the owner of a
          story can comment to it.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          Motivation
        </Typography>
        <Typography variant="body1">
          People bla bla bla too much on Internet. Their words are trash. So
          build a place where people always say something interesting. By
          interesting we mean words that ignite people to comments to it, and
          those comments contribute more value to the story. People really want
          to express their idea even it requires money.
          <br />
          The story can be constructive or debative. As people want to sell the
          story, they stop saying trash and think hard on saying something
          valueable. By this we keep idiots away from this platform.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          Technical Overview
        </Typography>
        <Typography variant="body1">
          Buy Say Sell is a decenteralized application based on Ethereum. The
          service is purely on-chain an there is no centeralized server. The
          frontend webpage is open-sourced and anyone can deploy it.
          <br />
          The stories implements the ERC-721 standard. You can also trade the
          stories outside this platform, like wallets and standard NFT markets.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          Pricing
        </Typography>
        <Typography variant="body1">
          Currently Buy Say Sell is gas-only. This application is developed
          mostly for experimental purpose.
          <br />
          If you don't want to spend any real money for gas, there is also
          testnet contract deployed. Just switch network to Sepolia and get some
          ETH from faucets.
        </Typography>
      </Stack>
    </Stack>
  );
}
