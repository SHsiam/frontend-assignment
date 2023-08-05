import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import EngagementHelper from "./EngagementHelper";

const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
  const options = EngagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels);

  return <HighchartsReact highcharts={Highcharts}  options={options} />;
};

export default EngagementMessagesOverTime;
