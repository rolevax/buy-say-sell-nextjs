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
      name: "changeSellPrice",
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
      name: "createStory",
      inputs: [
        {
          name: "content",
          type: "string",
          internalType: "string",
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
                {
                  name: "price",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "isLog",
                  type: "bool",
                  internalType: "bool",
                },
              ],
            },
            {
              name: "said",
              type: "bool",
              internalType: "bool",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getStory",
      inputs: [
        {
          name: "index",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct BuySaySell.Story",
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
                {
                  name: "price",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "isLog",
                  type: "bool",
                  internalType: "bool",
                },
              ],
            },
            {
              name: "said",
              type: "bool",
              internalType: "bool",
            },
          ],
        },
      ],
      stateMutability: "view",
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
