import { Transaction } from "@/models/transaction";
import { RootState } from "@/redux/store";
import PaidIcon from "@mui/icons-material/Paid";
import { ListItemIcon, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import { useSelector } from "react-redux";

const formatDate = (dateObj: string) => {
  // poor implementation, Dayjs is not initialising properly, instead as string
  const date = new Date(dateObj);
  const formattedDate = date.toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

//for whatever reason, this is needed
type DrawPieChartProps = {
  transactions: Transaction[];
};

const DrawPieChart: React.FC<DrawPieChartProps> = ({ transactions }) => {
  const groupedItems = Object.values(
    transactions.reduce(
      (acc: Record<string, any>, item: Transaction, index) => {
        const label = `${item.type} (${(acc[item.type]?.count || 0) + 1})`;
        acc[item.type] = {
          id: index,
          value: (acc[item.type]?.value || 0) + item.dollarAmount,
          label,
          count: (acc[item.type]?.count || 0) + 1,
        };

        console.log(acc);
        return acc;
      },
      {}
    )
  );

  return (
    <div>
      {/* PIE CHART */}
      <PieChart
        series={[
          {
            data: groupedItems,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            cx: 300,
            cy: 125,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={800}
        height={300}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 125,
            labelStyle: {
              fill: "white",
            },
          },
        }}
      />
    </div>
  );
};

const Transactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.project.project?.transactions
  );
  const { palette } = useTheme();
  if (!transactions || transactions.length === 0) {
    return <p>No Transactions as of yet!</p>;
  }
  console.log(transactions);

  return (
    <div>
      <DrawPieChart transactions={transactions} />

      {/* TODO add scrollable element with transparent scrollbar - requires CSS file */}
      <div>
        {transactions.map((transaction, index) => {
          const amount = transaction.dollarAmount;
          const roundedAmount =
            amount % 1 === 0 ? amount : parseFloat(amount.toFixed(2));
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "50px",
                }}
              >
                {" "}
                {/* Adjust as needed */}
                <ListItemIcon sx={{ color: palette.white.light }}>
                  <PaidIcon fontSize="large" />
                </ListItemIcon>
              </div>

              {/* Expanded Details Section */}
              <div style={{ flex: 1, textAlign: "left", paddingRight: "10px" }}>
                {" "}
                {/* Allow this to grow */}
                <h3 style={{ margin: "0", color: "white" }}>
                  {transaction.whatBrought}
                </h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {formatDate(transaction.dateTime.toString())} {"  ·  "}
                    {transaction.whatFor}
                  </p>
                </div>
              </div>

              {/* Transaction Type - Fixed Position */}
              <div
                style={{
                  flexBasis: "150px", // Fixed width or basis for transaction type and amount
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end", // Align items to the right
                  textAlign: "right",
                  color: "white",
                }}
              >
                <div
                  style={{
                    border: "1px solid",
                    borderColor: palette.white.middle,
                    padding: "5px",
                    borderRadius: "12%",
                    marginBottom: "5px", // Space between type and amount
                  }}
                >
                  <span>{transaction.type}</span>
                </div>
                <span>$ {roundedAmount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
