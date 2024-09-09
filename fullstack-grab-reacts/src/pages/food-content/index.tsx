import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/styles/style";
import "@/App.css";
import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ListFood from "@/components/demo/ListFood";
import Carts from "@/components/demo/Carts";
import Pages from "@/components/demo/Pages";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import foodLists from "@/apis/listFoodApis";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchOrderData as fetchOrderDataFromService,
  completeOrder as completeOrderFromService,
} from "../../service/apiService";

function FoodContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // get order data
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await fetchOrderDataFromService();
        // Log respons ke konsol
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  // update orders done
  const completeOrder = async () => {
    try {
      await completeOrderFromService();
      toast.success("Pesanan selesai");
      console.log("Pesanan selesai berhasil diperbarui");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
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

      <div>
        <ListFood currentPage={currentPage} itemsPerPage={itemsPerPage} />
      </div>

      <div className="pb-24">
        <Pages
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={foodLists.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {isCartOpen && <Carts />}

      {isMobile ? (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[1290px]">
          <div className="absolute inset-0 bg-white "></div>
          <Alert className="relative z-10 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <AlertTitle>Selamat datang !! John Doe</AlertTitle>
                <AlertDescription>
                  Kami senang Anda bergabung dengan kami. Mari mulai pesan
                  makanan favorit Anda sekarang juga!
                </AlertDescription>
              </div>
            </div>
            <div className="flex space-x-4">
              <Drawer>
                <DrawerTrigger>
                  <Button variant="destructive">
                    <ClipboardDocumentListIcon className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Pesanan anda</DrawerTitle>
                    <DrawerDescription>
                      <AspectRatio ratio={16 / 14}></AspectRatio>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose >
                      <Button variant="outline" className="w-full">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Button variant="default" onClick={toggleCart}>
                <ShoppingCartIcon className="h-6 w-6" />
              </Button>
            </div>
          </Alert>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[1290px] px-20 pb-4">
          <div className="absolute inset-0 bg-white "></div>
          <Alert className="relative z-10 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <AlertTitle>Selamat datang !! John Doe</AlertTitle>
                <AlertDescription>
                  Kami senang Anda bergabung dengan kami. Mari mulai pesan
                  makanan favorit Anda sekarang juga!
                </AlertDescription>
              </div>
            </div>
            <div className="flex space-x-4">
              <Drawer>
                <DrawerTrigger>
                  <Button variant="destructive">
                    <ClipboardDocumentListIcon className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <div className="flex space-x-4">
                      <ClipboardDocumentListIcon className="h-6 w-6" />
                      <DrawerTitle>Pesanan anda</DrawerTitle>
                    </div>
                    {/* <DrawerDescription></DrawerDescription> */}
                  </DrawerHeader>
                  <div>
                    <AspectRatio ratio={16 / 5}>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <hr className="border-t-2 border-gray-200" />
                          <div className="flow-root pt-10">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              <li className="flex px-6 py-6 bg-gray-200">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src="../src/assets/gambar.jpg"
                                    alt="Banner Food Images"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">
                                          {orderData &&
                                            orderData.data.detail_foods
                                              .map((food) => food.foodName)
                                              .join(", ")}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        Total pesanan :{" "}
                                        {orderData &&
                                          orderData.data.total_price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {orderData &&
                                        orderData.data.detail_foods
                                          .map((food) => food.location)
                                          .join(".. , .. ")}
                                    </p>

                                    <Badge
                                      variant={
                                        orderData &&
                                          orderData.data.state === "ongoing"
                                          ? "destructive"
                                          : "default"
                                      }
                                    >
                                      {orderData && orderData.data.state}
                                    </Badge>
                                  </div>
                                  <ToastContainer />
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Total item :{" "}
                                      {orderData && orderData.data.total_item}
                                    </p>

                                    <div className="flex">
                                      <Button
                                        variant={
                                          orderData &&
                                            orderData.data.state === "ongoing"
                                            ? "destructive"
                                            : "default"
                                        }
                                        onClick={completeOrder}
                                      >
                                        <ClipboardDocumentListIcon className="h-6 w-6" />
                                        {orderData &&
                                          orderData.data.state === "ongoing"
                                          ? "Pesanan selesai"
                                          : "Beli lagi"}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Tutup</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Button variant="default" onClick={toggleCart}>
                <ShoppingCartIcon className="h-6 w-6" />
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}

export default FoodContent;
