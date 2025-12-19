import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Axios from "../../utils/axios";
import Loading from "../shimmer/Loading";

/* ---------------- TYPES ---------------- */
type RangeType = "7d" | "14d" | "28d" | "3m";

type DataPoint = {
  x: number; // timestamp
  y: number;
};

type ApiResponse = {
  range: string;
  total: number;
  data: {
    date: string;
    count: number;
  }[];
};

/* ---------------- HELPERS ---------------- */

const getTickAmount = (range: RangeType) => {
  switch (range) {
    case "7d":
      return 7;
    case "14d":
      return 7;
    case "28d":
      return 6;
    case "3m":
      return 5;
    default:
      return 6;
  }
};

/* ---------------- COMPONENT ---------------- */

const MessageAnalytics = () => {
  const [range, setRange] = useState<RangeType>("7d");
  const [seriesData, setSeriesData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH STATS ---------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await Axios.get(
          "/stats/messages",
          {
            params: { range },
          }
        );

        // Convert API response to ApexCharts format
        const formatted: DataPoint[] = res.data.data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.count,
        }));

        setSeriesData(formatted);
      } catch (error) {
        console.error("Failed to fetch message stats:", error);
        setSeriesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [range]);

  const series = [
    {
      name: "Messages",
      data: seriesData,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.35,
        opacityTo: 0.08,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      type: "datetime",
      tickAmount: getTickAmount(range),

      labels: {
        format: "dd MMM",
        style: {
          colors: "#6b7280",
        },
      },

      tooltip: {
        enabled: false, // ✅ hide bottom tooltip
      },
    },

    yaxis: {
      title: { text: undefined },
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },

    tooltip: {
      theme: "light",
      x: {
        format: "dd MMM yyyy",
      },
    },

    colors: ["#4f46e5"],

    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-md border border-gray-300/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Message Analytics</h2>

        {/* Range Selector */}
        <div className="flex gap-2">
          {[
            { label: "7D", value: "7d" },
            { label: "2W", value: "14d" },
            { label: "4W", value: "28d" },
            { label: "3M", value: "3m" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setRange(item.value as RangeType)}
              className={`px-3 py-1 text-sm rounded-md border transition
                ${
                  range === item.value
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart / Loader */}
      {loading ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          <Loading />
        </div>
      ) : (
        <Chart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      )}
    </div>
  );
};

export default MessageAnalytics;
