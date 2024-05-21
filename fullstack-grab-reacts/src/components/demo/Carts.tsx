import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import cartLists from "@/apis/listCartsApis";
import DialogSuccess from "./DialogSuccess";
import { Button } from "@/components/ui/button";
import DialogFailed from "./DialogFailed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Carts() {
  const [open, setOpen] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [cartLists, setCartLists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/foods/cart/data")
      .then((response) => {
        setCartLists(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cart lists:", error);
      });
  }, []);

  const handleCheckout = () => {
    axios
      .post("http://localhost:8080/api/orders/create", {})
      .then((response) => {
        setTimeout(() => {
          setShowSuccessDialog(true);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const removeFromCart = (foodId) => {
    axios
      .delete(`http://localhost:8080/api/foods/cart/${foodId}/`)
      .then((response) => {
        console.log("Item with ID " + foodId + " removed from cart:");
        console.log("Response:", response.data);
        toast.success("Item berhasil dihapus dari keranjang");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  // ==========================================================
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  //calculate price
  const subtotal = cartLists.reduce(
    (acc, curr) => acc + parseFloat(curr.price),
    0
  );
  let ongkir = 0;
  const ppn = 0.1;

  if (subtotal !== 0) {
    ongkir = 15000;
  }

  const totalBiaya = subtotal + ongkir + subtotal * ppn;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Keranjang saya
                        </Dialog.Title>

                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <hr className="border-t-2 border-gray-200" />

                        {cartLists.length === 0 ? (
                          <p className="pt-5">Keranjang belanja Anda kosong</p>
                        ) : (
                          <div className="flow-root pt-5">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartLists.map((carts) => (
                                <li key={carts.foodId} className="flex py-6">
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
                                          <a href={carts.href}>
                                            {carts.foodName}
                                          </a>
                                        </h3>
                                        <p className="ml-4">{carts.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {carts.location}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty 1</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            removeFromCart(carts.foodId)
                                          }
                                        >
                                          Hapus
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rp. {formatCurrency(subtotal)}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-500">
                        <p>Ongkos Kirim</p>
                        <p>Rp. {formatCurrency(ongkir)}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-500">
                        <p>PPN(10%)</p>
                        <p>Rp. {formatCurrency(subtotal * ppn)}</p>
                      </div>
                      <br />
                      <hr />
                      <br />
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Biaya</p>
                        <p>Rp. {formatCurrency(totalBiaya)}</p>
                      </div>

                      <p className="mt-0.5 text-sm text-gray-500">
                        Pembayaran total biaya termasuk biaya PPN dan ongkos
                        kirim.
                      </p>
                      <div className="mt-6">
                        <Button
                          variant="default"
                          className="w-full flex items-center h-[40px] justify-center rounded-md border border-transparent bg-green-600 px-3  text-base font-medium text-white shadow-sm hover:bg-green-700"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>

                    {showSuccessDialog && <DialogSuccess />}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}