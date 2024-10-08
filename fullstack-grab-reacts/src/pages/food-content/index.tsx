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
import Slider from 'react-slick'
import { cn } from '@/lib/utils'


import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const images = [
  '../src/assets/bgsteak.jpg',
  '../src/assets/bgnasi.jpg',
  '../src/assets/bgsteak2.jpg',
]

function FoodContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // get order data
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    fetchOrderData();
  }, []);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear'
  }

  return (
    <>
      {/* banner */}
      {/* {isMobile ? (
        <AspectRatio ratio={16 / 5}>
          <img
            src="../src/assets/gambar.jpg"
            alt="Banner Food Images"
            className="object-cover w-full h-full rounded-md"
          />
        </AspectRatio>
      ) : (
        <div className="bottom-0 left-0 right-0 mx-auto max-w-[1290px]  px-4 ">
          <AspectRatio ratio={16 / 2}>
            <img
              src="../src/assets/gambar.jpg"
              alt="Banner Food Images"
              className="object-cover w-full h-full rounded-md"
            />
          </AspectRatio>
        </div>
      )} */}

      {/* banner update  with corousel*/}
      <div className={cn(
        "mx-auto max-w-[1290px] px-4",
        isMobile ? "w-full" : "bottom-0 left-0 right-0"
      )}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <AspectRatio ratio={isMobile ? 16 / 5 : 16 / 2}>
                <img
                  src={image}
                  alt={`Banner Food Image ${index + 1}`}
                  className="object-cover w-full h-full rounded-md transition-opacity duration-500"
                />
              </AspectRatio>
            </div>
          ))}
        </Slider>
      </div>

      {/* list-food */}
      <div className="bg-white">
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

      {/* carts */}
      {isCartOpen && <Carts />}


      {/* nav profiles */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-full lg:max-w-[1200px] pb-4 px-5 bg-white p-4">
        <div className="absolute inset-0 "></div>
        <Alert className="flex items-center justify-between z-10 border gap-4 shadow-lg">
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
                Mari mulai pesan makanan favorit Anda sekarang juga!
              </AlertDescription>
            </div>
          </div>
          <div className="flex space-x-4 ">
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
                </DrawerHeader>
                <div className="border bg-slate-400">
                  <AspectRatio ratio={16 / 8}>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white ">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        {orderData &&
                          orderData.data.state === "ongoing" ? (
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

                                <div className="ml-4 flex flex-1 flex-col ">
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
                                        {formatCurrency(orderData && orderData.data.total_price)}
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
                                            ? "default"
                                            : "destructive"
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
                          </div>) : <><div className="text-center" ><p>Tidak ada pesanan saat ini</p></div></>}
                      </div>
                    </div>
                  </AspectRatio>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline" className="w-[140px] border shadow-lg">Tutup</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Button variant="default" onClick={toggleCart}>
              <ShoppingCartIcon className="h-6 w-6" />
            </Button>
          </div >
        </Alert >
      </div >

    </>
  );
}

export default FoodContent;
