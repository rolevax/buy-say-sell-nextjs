import AddressLink from "@/components/AddressLink";
import { contractAbi } from "@/contracts";
import {
  Paper,
  Skeleton,
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
  story?: ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
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
              <AddressLink address={story?.owner ?? "0x0"}>
                <Stack direction="row" spacing={1}>
                  {story ? (
                    <MetaMaskAvatar address={story.owner} />
                  ) : (
                    <Skeleton variant="circular" width={24} height={24} />
                  )}
                  <Typography>
                    {story ? story.owner : <Skeleton width={400} />}
                  </Typography>
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
                {story ? (
                  story.sellPrice > 0 ? (
                    t("sellingAt", { price: formatEther(story.sellPrice) })
                  ) : (
                    t("notListed")
                  )
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
