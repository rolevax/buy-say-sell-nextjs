import BriefIntro from "@/components/BriefIntro";
import CommonAppBar from "@/components/CommonAppBar";
import Copyright from "@/components/Copyright";
import HomeClient from "@/components/HomeClient";
import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("App");

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <CommonAppBar title={<Badge badgeContent="Beta">{t("name")}</Badge>} />
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
