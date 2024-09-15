import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import foodLists from "@/apis/listFoodApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThumbsUp, ThumbsDown, Send, AlertCircle, EyeIcon, Star } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
  const [view, setView] = useState('grid')

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

  const existingReviews = [
    { id: 1, user: 'John D.', rating: 4, comment: 'Makanannya enak sekali !! rekomend bangets', date: '2023-05-15', helpful: 12, notHelpful: 2 },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Cepat sampai dan enak !!', date: '2023-05-10', helpful: 8, notHelpful: 1 },

  ]

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <>
      <div className="p-5">
        <div className="flex items-center mx-auto justify-between p-5 mt-10  ">
          <h3 className="scroll-m-20 text-lg lg:text-2xl font-semibold tracking-tight ml-5">
            Rekomendasi untuk anda
          </h3>

          <div className="flex items-center space-x-4">

            <div className="flex border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-gray-200 hover:bg-gray-300' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setView('list')} className={view === 'list' ? 'bg-gray-200 hover:bg-gray-300' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </Button>
            </div>
          </div>
        </div >
        <div className={` mx-auto  py-5 grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 ' : 'grid-cols-1 '}`}>
          {paginatedFoodLists.map((food) => (
            <Card key={food.foodId} className={view === 'list' ? 'flex flex-col md:flex-row rounded-lg shadow-md ' : ' rounded-lg shadow-md '}>
              <img
                src="../src/assets/gambar.jpg"
                alt={`${food.foodName} image`}
                className={`object-cover ${view === 'grid' ? 'h-48 w-full' : 'flex  h-48 w-full md:h-full md:w-48 '}`}
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="flex flex-col b-red-200 h-[8rem]">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg mb-2">{food.foodName}</h3>
                    <span className="font-bold text-lg">{formatCurrency(food.price)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{food.location}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.0</span>
                  </div>
                </div>

                {/* dialog see foods */}
                <div className="flex mt-4 w-full ">
                  <div className="flex gap-2 ">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={viewFoodDetails} >
                          Lihat
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{food.foodName}</DialogTitle>
                          <DialogDescription>
                            <div className="flex flex-col mt-4">
                              <img
                                src="../src/assets/gambar.jpg"
                                alt={`${food.foodName} image`}
                                className="w-full h-[250px] object-cover rounded-md"
                              />
                              <div className="flex flex-row items-center justify-between pr-5">
                                <p className="flex mt-2 text-2xl font-bold">{formatCurrency(food.price)}</p>
                                <div className="flex  mt-2">
                                  {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-md">{food.location}</p>

                              {/* customer riviews */}
                              <Card className="mt-5 border shadow-md">
                                <p className="text-base p-5 font-semibold">Customer Riviews</p>
                                <CardContent >
                                  <ScrollArea className="h-full">
                                    <div className="space-y-1 ">
                                      {existingReviews.map((review) => (
                                        <div key={review.id} className="border-b pb-4">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                              <Avatar>
                                                <AvatarFallback>{review.user[0]}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <p className="font-semibold">{review.user}</p>
                                                <div className="flex">
                                                  {renderStars(review.rating)}
                                                </div>
                                              </div>
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                          </div>
                                          <p className="mt-2">{review.comment}</p>
                                          <div className="mt-2 flex items-center space-x-3">
                                            <Button variant="outline" size="xs" className="text-[11px]">
                                              <ThumbsUp className="h-3 w-3 mr-2" />
                                              Helpful ({review.helpful})
                                            </Button>
                                            <Button variant="outline" size="xs" className="text-[11px]">
                                              <ThumbsDown className="h-3 w-3 mr-2" />
                                              Not Helpful ({review.notHelpful})
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </CardContent>
                              </Card>
                              <Button
                                variant="default"
                                className="w-full mt-4"
                                onClick={() => addToCart(food.foodId)}
                              >
                                Tambah ke Keranjang
                              </Button>
                            </div>



                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => addToCart(food.foodId)}
                    >
                      Tambah ke Keranjang
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ToastContainer />
      </div >


    </>
  );
}
