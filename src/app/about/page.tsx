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
      <Box sx={{ width: 220, overflow: "auto" }}>
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
      <Stack direction="column" spacing={1} sx={{ p: 3 }}>
        <Typography variant="h4">About Buy Say Sell</Typography>
        <Typography variant="h5">What</Typography>
        <Typography variant="body1">Buy Say Sell is a bla bla bla</Typography>
      </Stack>
    </Stack>
  );
}
