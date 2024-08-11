import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@heroicons/react/24/outline";
// import foodLists from "@/apis/listFoodApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  fetchFoodLists,
  addToCart as addToCartFromService,
} from "../../service/apiService";
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
export default function ListFood({ currentPage, itemsPerPage }) {
  const [foodLists, setFoodLists] = useState([]);

  useEffect(() => {
    const loadFoodLists = async () => {
      try {
        const data = await fetchFoodLists();
        setFoodLists(data);
      } catch (error) {
        console.error("Error loading food lists:", error);
      }
    };

    loadFoodLists();
  }, []);

  const addToCart = async (foodId) => {
    try {
      await addToCartFromService(foodId);
      toast.success("Item berhasil ditambahkan ke keranjang");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Item sudah ada didalam keranjang");
      }
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, foodLists.length);
  const paginatedFoodLists = foodLists.slice(startIndex, endIndex);

  const viewFoodDetails = () => {
    console.log("Detail makanan dengan ID ");
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 sm:px-4 sm:py-7 lg:max-w-7xl lg:px-8">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Rekomendasi untuk anda
          </h3>

          <div className=" mt-6 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {paginatedFoodLists.map((food) => (
              <div key={food.foodId} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
                  <img
                    src="../src/assets/gambar.jpg"
                    alt="Banner Food Images"
                    className="h-full w-fulobject-cover object-center lg:h-[150px] lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-lg  font-medium text-gray-700">
                      {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                      {food.foodName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {food.location}
                    </p>
                  </div>
                  <p className="text-md font-medium text-gray-900">
                    {formatCurrency(food.price)}
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-2">
                  {/* button detail */}
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="outline" onClick={viewFoodDetails}>
                        <EyeIcon className="h-5 w-5 mr-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription className="pt-5">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
                            <img
                              src="../src/assets/gambar.jpg"
                              alt="Banner Food Images"
                              className="h-full w-fulobject-cover object-center lg:h-[250px] lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between mx-3">
                            <div>
                              <h1 className="text-2xl font-medium text-gray-700">
                                {food.foodName}
                              </h1>
                              <p className="mt-1 text-1xl text-gray-500">
                                {food.location}
                              </p>
                              <div className="flex items-center mt-1">
                                <span className="text-yellow-500">
                                  ⭐⭐⭐⭐
                                </span>
                              </div>
                            </div>
                            <p className="text-2xl font-medium text-gray-900">
                              {formatCurrency(food.price)}
                            </p>
                          </div>
                          <div className="pt-10">
                            <Button
                              variant="destructive"
                              className="w-full flex items-center justify-center "
                              onClick={() => addToCart(food.foodId)}
                            >
                              Tambah ke Keranjang
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  {/* button add to cart */}
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => addToCart(food.foodId)}
                  >
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
