import AddressLink from "@/components/AddressLink";
import { contractAbi } from "@/contracts";
import {
  Discount,
  RemoveShoppingCart,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormatter, useTranslations } from "next-intl";
import { ReactNode } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { formatEther, ReadContractReturnType } from "viem";

export default function StoryEventTable({
  story,
}: {
  story: ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
}) {
  const t = useTranslations("Story");

  let storyEvents = story.comments.map((comment, i) => {
    return <EventRow key={i} comment={comment} />;
  });

  return (
    <TableContainer>
      <Table>
        <TableBody>{storyEvents}</TableBody>
      </Table>
    </TableContainer>
  );
}

function LogContent(props: { icon: ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={1}>
      {props.icon}
      <Typography color="secondary">{props.text}</Typography>
    </Stack>
  );
}

function EventRow({
  comment,
}: {
  comment: ReadContractReturnType<
    typeof contractAbi,
    "getStory",
    [0n]
  >["comments"][0];
}) {
  return (
    <TableRow
      sx={{
        "td, th": { border: 0 },
      }}
    >
      <TableCell
        sx={{ width: "1px", alignContent: "start" }}
        component="th"
        scope="row"
      >
        <MetaMaskAvatar address={comment.owner} size={48} />
      </TableCell>
      <TableCell>
        <Card sx={{ pt: 1, pb: 1, pl: 2, pr: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ mb: 1 }}
          >
            <Tooltip
              title={
                <AddressLink address={comment.owner}>
                  {comment.owner}
                </AddressLink>
              }
              arrow
            >
              <Typography variant="caption">
                {shortAddr(comment.owner)}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="secondary">
              {formatEther(comment.price)} ETH
            </Typography>
            <TimeText timestamp={comment.timestamp} />
          </Stack>
          <EventRowContent comment={comment} />
        </Card>
      </TableCell>
    </TableRow>
  );
}

function EventRowContent({
  comment,
}: {
  comment: ReadContractReturnType<
    typeof contractAbi,
    "getStory",
    [0n]
  >["comments"][0];
}) {
  const t = useTranslations("Story");
  if (comment.isLog) {
    if (comment.content == "buy") {
      return <LogContent icon={<ShoppingCart />} text={t("buyLog")} />;
    }
    if (comment.price == 0n) {
      return <LogContent icon={<RemoveShoppingCart />} text={t("unlistLog")} />;
    }
    return <LogContent icon={<Discount />} text={t("priceLog")} />;
  }

  return (
    <Typography variant="body1" color="textPrimary">
      {comment.content}
    </Typography>
  );
}

function TimeText(props: { timestamp: bigint }) {
  const format = useFormatter();

  return (
    <Typography variant="caption" color="secondary">
      {format.dateTime(new Date(Number(props.timestamp) * 1000), {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </Typography>
  );
}

function shortAddr(address: string) {
  return (
    address.substring(0, 4) + "..." + address.substring(address.length - 4)
  );
}
