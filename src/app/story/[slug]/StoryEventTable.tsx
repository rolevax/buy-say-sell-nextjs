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
    if (comment.isLog) {
      let child: ReactNode;
      if (comment.content == "buy") {
        child = <LogContent icon={<ShoppingCart />} text={t("buyLog")} />;
      } else if (comment.price == 0n) {
        child = (
          <LogContent
            icon={<RemoveShoppingCart key={i} />}
            text={t("unlistLog")}
          />
        );
      } else {
        child = <LogContent icon={<Discount key={i} />} text={t("priceLog")} />;
      }

      return (
        <EventRow
          key={i}
          address={comment.owner}
          timestamp={comment.timestamp}
          price={comment.price}
        >
          {child}
        </EventRow>
      );
    }

    return (
      <EventRow
        key={i}
        address={comment.owner}
        timestamp={comment.timestamp}
        price={comment.price}
      >
        <Typography variant="body1" color="textPrimary">
          {comment.content}
        </Typography>
      </EventRow>
    );
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

function EventRow(props: {
  address: `0x${string}`;
  timestamp: bigint;
  price: bigint;
  children: ReactNode;
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
        <MetaMaskAvatar address={props.address} size={48} />
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
                <AddressLink address={props.address}>
                  {props.address}
                </AddressLink>
              }
              arrow
            >
              <Typography variant="caption">
                {shortAddr(props.address)}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="secondary">
              {formatEther(props.price)} ETH
            </Typography>
            <TimeText timestamp={props.timestamp} />
          </Stack>
          {props.children}
        </Card>
      </TableCell>
    </TableRow>
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
