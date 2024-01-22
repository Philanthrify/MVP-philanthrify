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
          value: (acc[item.type]?.value || 0) + item.amount,
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
        {transactions.map((transaction, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ alignItems: "center", paddingBottom: "5px" }}>
              <ListItemIcon sx={{ color: palette.white.light }}>
                <PaidIcon fontSize="large" />
              </ListItemIcon>
            </div>

            {/* Placeholder for the Title -- column width needs fine-tuning*/}
            <div style={{ textAlign: "left", columnWidth: "450px" }}>
              <h3 style={{ margin: "0", color: "white" }}>
                {transaction.whatFor}
              </h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  {formatDate(transaction.dateTime.toString())} {"  ·  "}{" "}
                  {transaction.whatBrought}
                </p>
              </div>
            </div>

            {/* Placeholder for the Tag */}
            <div
              style={{
                border: "1px solid",
                borderColor: palette.white.middle,
                padding: "5px",
                borderRadius: "12%",
                display: "flex", // Use flex display
                flexDirection: "row",
                alignItems: "center", // Align items vertically in the center
                color: "white",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#444ce7",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              ></div>
              {transaction.type}
            </div>

            {/* Placeholder for the $amount */}
            <div
              style={{ textAlign: "right", marginLeft: "auto", color: "white" }}
            >
              <span>{transaction.amount} $</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
