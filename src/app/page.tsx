import BriefIntro from "@/components/BriefIntro";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import HomeClient from "@/components/HomeClient";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title="Buy Say Sell" />
        <HomeBody />
      </Box>
    </Container>
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
