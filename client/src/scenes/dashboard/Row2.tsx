import DashboardBox from "@/components/DashboardBox";
import React from "react";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="c"></DashboardBox>
      <DashboardBox gridArea="d"></DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
    </>
  );
};
export default Row2;
