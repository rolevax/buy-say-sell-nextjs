import BriefIntro from "@/components/BriefIntro";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import HomeClient from "@/components/HomeClient";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("HomePage");

  return (
    <Box>
      <h1>{t("title")}</h1>;
      <BriefIntro />
      <HomeClient />
      <Copyright />
    </Box>
  );
}
