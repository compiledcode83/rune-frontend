import { addressShortening } from "@/utils/adress";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import moment from "moment";
import BtcLink from "@/assets/imgs/btc-link.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { TransactionType } from "@/types/type";
import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";

const TABLE_HEAD = [
  "Address",
  "Type",
  "Pay",
  "Receive",
  "Date",
  "Transaction ID",
  "Status",
  "Link",
];

// const transactions = [
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "b286bcaefdf9895a0c500be000e84c1f224a6cb7897ebd2fbd729e549e66e62c",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "b286bcaefdf9895a0c500be000e84c1f224a6cb7897ebd2fbd729e549e66e62c",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "199f218ebfcb5d46b3d3c75c445c5ce696f1706f3de603676754883f2a6d13ff",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "199f218ebfcb5d46b3d3c75c445c5ce696f1706f3de603676754883f2a6d13ff",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "f3db0b5a49b73bd454709689085c829d335aacfdbb0c2f5c2ff41566656484fc",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "f3db0b5a49b73dfere09689085c829d335aacfdbb0c2f5c2ff41566656484fc",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "f3db0b5a49b73bd454709689085c829d33342gfdbb0c2f5c2ff41566656484fc",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
//   {
//     address: "tb1plgn8ylkclykewrcxmy7l8fzgh9a9fsyqhagz5pjr5ejnmsq3f54s6plpn0",
//     type: "swap",
//     pay: {
//       ticker: "BTC",
//       amount: "0.03",
//     },
//     receive: {
//       ticker: "USDT",
//       amount: "2087.25",
//     },
//     date: "2024-06-03/16:30:52",
//     txId: "f3db0b5a49bew324454709689085c829d335aacfdbb0c2f5c2ff41566656484fc",
//     status: "Pending",
//     link: "https://mempool.space/tx/acede4d359a17c476a7a32b3d4a5dae9d3958b61352bd326fba74032741cb769",
//   },
// ];
interface TdProps {
  // Other props can be added here
  children: any;
  className?: string;
}
const NETWORK_TYPE = process.env.NEXT_PUBLIC_NETWORK;
const TransactionPanel = () => {
  const { ordinalAddress } = useUserContext();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    if (ordinalAddress !== "") {
      fetchData(page);
    }
  }, [page, ordinalAddress]);

  const fetchData = async (page: number) => {
    try {
      const { data, meta } = await poolApiService.getTransactionHistory(
        "DESC",
        page,
        limit,
        ordinalAddress
      );
      setTransactions((prevTransactions) => [...prevTransactions, ...data]);
      setHasMore(meta.hasNextPage);
    } catch (error) {
      console.log(error);
    }
  };
  const Td: React.FC<TdProps> = ({ children, className }) => (
    <td className={`relative px-4 ${className}`}>
      {children}
      <div className="absolute right-0 top-[20%] z-50 h-[60%] w-[2px] bg-[#252B36]" />
    </td>
  );
  const Status = (status: string) => {
    if (status === "pending") {
      return (
        <div className="mx-auto w-[90px] rounded-[2px] bg-[#4EA1DE] px-[15px] text-center text-[12px] text-white">
          Pending
        </div>
      );
    } else if (status === "completed") {
      return (
        <div className="mx-auto w-[90px] rounded-[2px] bg-[#4EDE5C] px-[15px] text-[12px] text-white">
          Successful
        </div>
      );
    } else if (status === "unsuccessful") {
      return (
        <div className="mx-auto w-[90px] rounded-[2px] bg-[#DE4E4E] px-[15px] text-[12px] text-white">
          Unsuccessful
        </div>
      );
    }
  };
  console.log({ ordinalAddress });
  return (
    <div className="h-[calc(100vh-220px)] overflow-hidden bg-[#252B3612] px-[30px] py-[20px] lg:px-[91px] lg:py-[59px] dark:bg-[#252B3699]">
      <div className="mb-[12px] text-[24px] font-semibold text-black lg:mb-[36px] dark:text-white">
        Transaction List
      </div>
      {ordinalAddress !== "" ? (
        <InfiniteScroll
          dataLength={transactions.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={null}
          scrollableTarget="transaction-table"
        >
          <div
            className="block max-h-[calc(100vh-300px)] overflow-y-auto  lg:!max-h-[calc(100vh-435px)] 2xl:!max-h-[calc(100vh-390px)]"
            id="transaction-table"
          >
            <table className="relative w-[calc(100%-16px)] min-w-max table-auto">
              <thead className="sticky top-0 z-50 bg-[#252B3620] dark:bg-[#252B36]">
                <tr className="h-[60px]">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="text-center text-[18px] font-normal"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {transactions.map((transaction, index) => (
                  <React.Fragment key={transaction.txId}>
                    <tr className="h-[76px] bg-[#39435640] text-center dark:bg-[#394356]">
                      <Td className="rounded-l-[6px]">
                        <div className="h-full w-full ">
                          <div>{addressShortening(transaction.address)}</div>
                        </div>
                      </Td>
                      <Td>{transaction.type}</Td>
                      <Td>
                        <div>{transaction.pay[0].token}</div>
                        <div>
                          {transaction.pay[0].amount /
                            10 ** transaction.pay[0].divisibility}
                        </div>
                      </Td>
                      <Td>
                        <div>{transaction.receive[0].token}</div>
                        <div>
                          {transaction.receive[0].amount /
                            10 ** transaction.receive[0].divisibility}
                        </div>
                      </Td>
                      <Td>
                        {moment(transaction.date).format("YYYY-MM-DD/HH:mm:ss")}
                      </Td>
                      <Td>
                        <div className="mx-auto w-[300px] break-words">
                          {transaction.txId}
                        </div>
                      </Td>
                      <Td>{Status(transaction.status)}</Td>
                      <td className="relative rounded-r-[6px] px-4">
                        <a
                          href={`https://mempool.space/${NETWORK_TYPE === "testnet" ? "testnet/" : ""}tx/${transaction.txId}`}
                          target="_blank"
                        >
                          <Image
                            src={BtcLink}
                            alt="tx link"
                            className="mx-auto"
                            height={30}
                            width={30}
                          />
                        </a>
                      </td>
                    </tr>
                    {index < transactions.length - 1 ? (
                      <tr className="h-5" />
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      ) : null}
    </div>
  );
};

export default TransactionPanel;
