import AddressLink from "@/components/AddressLink";
import { contractAbi } from "@/contracts";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { formatEther, ReadContractReturnType } from "viem";

export default function StoryStatus({
  story,
}: {
  story: ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
}) {
  const t = useTranslations("Story");

  return (
    <TableContainer sx={{ display: "inline-block" }} component={Paper}>
      <Table style={{ width: "auto" }}>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Typography>{t("owner")}</Typography>
            </TableCell>
            <TableCell>
              <AddressLink address={story.owner}>
                <Stack direction="row" spacing={1}>
                  <MetaMaskAvatar address={story.owner} />
                  <Typography>{story.owner}</Typography>
                </Stack>
              </AddressLink>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Typography>{t("listing")}</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {story.sellPrice > 0
                  ? t("sellingAt", { price: formatEther(story.sellPrice) })
                  : t("notListed")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
