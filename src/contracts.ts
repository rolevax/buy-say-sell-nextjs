export const wagmiContractConfig = {
  // address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // anvil
  address: "0xEc17680FC384aA29061994F19d66Ee0860f93E72", // sepolia
  abi: [
    {
      type: "constructor",
      inputs: [],
      stateMutability: "nonpayable",
    },
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
      name: "approve",
      inputs: [
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
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
      name: "getApproved",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
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
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isApprovedForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownerOf",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "setApprovalForAll",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "approved",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "tokenURI",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "approved",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "approved",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "ERC721IncorrectOwner",
      inputs: [
        {
          name: "sender",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InsufficientApproval",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidApprover",
      inputs: [
        {
          name: "approver",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidOperator",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidOwner",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidReceiver",
      inputs: [
        {
          name: "receiver",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidSender",
      inputs: [
        {
          name: "sender",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721NonexistentToken",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
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
