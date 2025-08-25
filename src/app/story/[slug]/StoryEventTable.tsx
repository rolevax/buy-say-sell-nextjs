import AddressLink from "@/components/AddressLink";
import { contractAbi } from "@/contract_abi";
import {
  Discount,
  RemoveShoppingCart,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Card,
  Divider,
  Skeleton,
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

type StoryType = ReadContractReturnType<typeof contractAbi, "getStory", [0n]>;
type CommentType = StoryType["comments"][0];

export default function StoryEventTable({ story }: { story?: StoryType }) {
  const t = useTranslations("Story");

  let storyEvents = story
    ? story.comments.map((comment, i) => <EventRow key={i} comment={comment} />)
    : Array.from(Array(3).keys()).map((i) => <EventRow key={i} />);

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

function EventRow({ comment }: { comment?: CommentType }) {
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
        {comment ? (
          <MetaMaskAvatar address={comment.owner} size={48} />
        ) : (
          <Skeleton variant="circular" width={48} height={48} />
        )}
      </TableCell>
      <TableCell>
        <Card sx={{ pt: 1, pb: 1, pl: 2, pr: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ mb: 1 }}
          >
            {comment ? (
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
            ) : (
              <Typography variant="caption">
                <Skeleton variant="text" width={60} />
              </Typography>
            )}
            {comment ? (
              <Typography variant="caption" color="secondary">
                {formatEther(comment.price)} ETH
              </Typography>
            ) : (
              <Typography variant="caption">
                <Skeleton variant="text" width={60} />
              </Typography>
            )}
            <TimeText timestamp={comment?.timestamp} />
          </Stack>
          <EventRowContent comment={comment} />
        </Card>
      </TableCell>
    </TableRow>
  );
}

function EventRowContent({ comment }: { comment?: CommentType }) {
  if (!comment) {
    return (
      <Typography variant="body1" color="textPrimary">
        <Skeleton variant="text" />
      </Typography>
    );
  }

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

function TimeText({ timestamp }: { timestamp?: bigint }) {
  const format = useFormatter();

  return (
    <Typography variant="caption" color="secondary">
      {timestamp ? (
        format.dateTime(new Date(Number(timestamp) * 1000), {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ) : (
        <Skeleton variant="text" width={160} />
      )}
    </Typography>
  );
}

function shortAddr(address: string) {
  return (
    address.substring(0, 4) + "..." + address.substring(address.length - 4)
  );
}
