import React, { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PieChart from "@/components/demo/PieCharts";
import {
  fetchStatisticsData,
  fetchOngoingOrders,
  fetchHistoricalOrders,
} from "../../service/apiService";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

function StatisticContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [statisticsData, setStatisticsData] = useState(null);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [historicalOrders, setHistoricalOrders] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const loadStatisticsData = async () => {
      try {
        const data = await fetchStatisticsData();
        setStatisticsData(data);
      } catch (error) {
        console.error("Error loading statistics data:", error);
      }
    };

    loadStatisticsData();
  }, []);

  useEffect(() => {
    const loadOngoingOrders = async () => {
      try {
        const data = await fetchOngoingOrders(1);
        setOngoingOrders(data);
      } catch (error) {
        console.error("Error loading ongoing orders data:", error);
      }
    };

    loadOngoingOrders();
  }, []);

  useEffect(() => {
    const loadHistoricalOrders = async () => {
      try {
        const data = await fetchHistoricalOrders(1, selectedState);
        setHistoricalOrders(data);
      } catch (error) {
        console.error("Error loading historical orders data:", error);
      }
    };

    loadHistoricalOrders();
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generatePieChartData = () => {
    if (!statisticsData) return null;

    const { averageOrderPrice, total_order_price } = statisticsData;

    const data = {
      labels: ["Harga rata-rata pesanan", "Total Harga pesanan"],
      datasets: [
        {
          data: [averageOrderPrice, total_order_price],
          backgroundColor: [
            "rgba(255, 99, 1321, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };

    return data;
  };

  const chartData = generatePieChartData();

  return (
    <>

      {/* banner old */}
      {isMobile ? (
        <AspectRatio ratio={16 / 5}>
          <img
            src="../src/assets/gambar.jpg"
            alt="Banner Food Images"
            className="object-cover w-full h-full rounded-md"
          />
        </AspectRatio>
      ) : (
        <div className="bottom-0 left-0 right-0 mx-auto max-w-[1290px]  px-4 ">
          <AspectRatio ratio={16 / 1.7}>
            <img
              src="../src/assets/gambar.jpg"
              alt="Banner Food Images"
              className="object-cover w-full h-full rounded-md"
            />
          </AspectRatio>
        </div>
      )}

      {/* nav-profiles */}


      <Alert className="relative z-10 flex items-center justify-between my-5 shadow-lg">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <AlertTitle>Selamat datang !! Admin</AlertTitle>
            <AlertDescription>
              Mari lihat statistik pesanan!!
            </AlertDescription>
          </div>
        </div>
        <div className="flex space-x-4"></div>
      </Alert>



      {/* title data statistic */}
      <div className="pt-5">
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h4 className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              Data Statistics
            </h4>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            ></button>
          </div>
        </div>
      </div>


      {/* content */}
      <div className="pt-10 pb-20">
        <Tabs defaultValue="orders" className="w-[ 1400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Statistic pesanan</TabsTrigger>
            <TabsTrigger value="historical">Histori pesanan</TabsTrigger>
            <TabsTrigger value="order">Sedang di proses</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <div className="flex justify-center items-center pb-14">
              <div className="max-w-[590px]">
                {chartData && <PieChart data={chartData} />}
                <h3 className=" text-2xl font-semibold tracking-tight flex justify-center items-center p-4">
                  Statistics Orders
                </h3>
              </div>
            </div>
            <div className="flex flex-nowrap gap-5">
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                <Card className="bg-yellow-100">
                  {/* Card content */}
                  <CardHeader>
                    <CardTitle>Total makanan</CardTitle>
                    <CardDescription>
                      Jumlah item makanan terjual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className=" text-2xl font-semibold tracking-tight">
                      {statisticsData ? statisticsData.total_item : ""}
                    </h3>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                <Card className="bg-green-100">
                  {/* Card content */}
                  <CardHeader>
                    <CardTitle>Total Pesanan</CardTitle>
                    <CardDescription>
                      Jumlah order makanan terjual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className=" text-2xl font-semibold tracking-tight">
                      {statisticsData ? statisticsData.total_order : ""}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex flex-nowrap gap-5">
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                <Card className="bg-blue-100 ">
                  {/* Card content */}
                  <CardHeader>
                    <CardTitle>Total Harga Pesanan </CardTitle>
                    <CardDescription>
                      jumlah total harga pesanan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className=" text-2xl font-semibold tracking-tight">
                      {statisticsData
                        ? formatRupiah(statisticsData.total_order_price)
                        : ""}
                    </h3>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                <Card className="bg-purple-100">
                  {/* Card content */}
                  <CardHeader>
                    <CardTitle>Total Rata-rata Harga pesanan </CardTitle>
                    <CardDescription>
                      jumlah rata rata total harga pesanan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className=" text-2xl font-semibold tracking-tight">
                      {statisticsData
                        ? formatRupiah(statisticsData.averageOrderPrice)
                        : ""}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="historical">
            <div className="py-5">
              <div className="relative">
                <select
                  onChange={handleStateChange}
                  value={selectedState}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Pilih status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="complete">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12l-6-6 1.5-1.5L10 9.5 17.5 2 19 3.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {historicalOrders.map((order) => (
              <Card key={order.orderId} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    Total Harga : {formatRupiah(order.total_price)}
                  </CardTitle>
                  <CardDescription>
                    Total Item : {order.total_item}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2"></CardContent>
                <CardFooter>
                  <Button
                    variant={
                      order.state === "complete" ? "default" : "destructive"
                    }
                  >
                    {order.state}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="order">
            {ongoingOrders.map((order, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    Total Harga : {formatRupiah(order.total_price)}
                  </CardTitle>
                  <CardDescription>
                    Total Item : {order.total_item}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2"></CardContent>
                <CardFooter>
                  <Button variant="destructive">{order.state}</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>




    </>
  );
}

export default StatisticContent;
