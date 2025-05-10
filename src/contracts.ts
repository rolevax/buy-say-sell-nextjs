export const wagmiContractConfig = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abi: [
    {
      type: "function",
      name: "addComment",
      inputs: [
        {
          name: "storyIndex",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "content",
          type: "string",
          internalType: "string",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "agreeSellPrice",
      inputs: [
        {
          name: "storyIndex",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "createStory",
      inputs: [
        {
          name: "content",
          type: "string",
          internalType: "string",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getStories",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "tuple[]",
          internalType: "struct BuySaySell.Story[]",
          components: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "sellPrice",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "buyPrice",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "buyer",
              type: "address",
              internalType: "address",
            },
            {
              name: "comments",
              type: "tuple[]",
              internalType: "struct BuySaySell.Comment[]",
              components: [
                {
                  name: "owner",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "content",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "offerBuyPrice",
      inputs: [
        {
          name: "storyIndex",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "price",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "offerSellPrice",
      inputs: [
        {
          name: "storyIndex",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "price",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "error",
      name: "OwnerError",
      inputs: [],
    },
    {
      type: "error",
      name: "PriceError",
      inputs: [],
    },
    {
      type: "error",
      name: "SaidStateError",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferError",
      inputs: [],
    },
    {
      type: "error",
      name: "UserArgError",
      inputs: [],
    },
  ],
} as const;
