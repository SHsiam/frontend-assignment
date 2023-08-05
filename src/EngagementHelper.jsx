import Highcharts from "highcharts";


const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
 
    const channelCounts = {};
    messageCountList.forEach((message) => {
      if (channelCounts[message.channelId]) {
        channelCounts[message.channelId].count++;
      } else {
        channelCounts[message.channelId] = {
          count: 1,
          name: channels.find((channel) => channel.id === message.channelId)?.name || "",
        };
      }
    });

    const filteredChannels = Object.entries(channelCounts)
      .filter(([, data]) => data.count > 1)
      .map(([channelId, data]) => ({
        channelId,
        name: data.name,
      }));

    const groupedMessages = {};
    messageCountList.forEach((message) => {
      const channelId = message.channelId;
      if (filteredChannels.some((channel) => channel.channelId === channelId)) {
        const date = new Date(message.timeBucket).toLocaleDateString();
        if (!groupedMessages[channelId]) {
          groupedMessages[channelId] = {};
        }
        if (groupedMessages[channelId][date]) {
          groupedMessages[channelId][date] += parseInt(message.count);
        } else {
          groupedMessages[channelId][date] = parseInt(message.count);
        }
      }
    });

 
    const series = [];
    filteredChannels.forEach((channel) => {
      const channelId = channel.channelId;
      const data = Object.entries(groupedMessages[channelId]).map(([date, count]) => ({
        x: new Date(date).getTime(),
        y: count,
      }));
      series.push({
        name: channel.name,
        data: data.sort((a, b) => a.x - b.x),
      });
    });

    const options = {
      chart: {
        type: "line",
        zoomType: "z",
      },
      title: {
        text: "Engagement Messages Over Time",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.series.name +
            "</b><br/>" +
            Highcharts.dateFormat("%Y-%m-%d", this.x) +
            "<br/>" +
            "Messages: " +
            this.y
          );
        },
      },
      series: series,
    };

    return options;
  },
};

export default EngagementHelper;
