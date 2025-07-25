"use client";

import { useAccount } from "wagmi";
import CreateStoryBox from "./CreateStoryBox";
import StoryList from "./StoryList";
import PleaseConnect from "./PleaseConnect";

export default function HomeClient() {
  const { address } = useAccount();

  if (!address) {
    return <PleaseConnect />;
  }

  return (
    <div>
      <StoryList />
      <CreateStoryBox />
    </div>
  );
}
