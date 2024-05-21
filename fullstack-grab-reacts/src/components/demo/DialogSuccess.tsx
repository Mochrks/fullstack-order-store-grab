import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogSuccess() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    window.location.reload();
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="text-center item-center pt-10">
              <div className="flex justify-center">
                <img
                  src="./src/assets/done.svg"
                  alt="Success Icon"
                  style={{ width: "100px", height: "80px" }}
                />
              </div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
                Pembayaran berhasil
              </h3>
            </div>
          </DialogDescription>
          <DialogFooter className="sm:justify-center w-full pt-5">
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="w-full"
                onClick={handleClose}
              >
                Selesai
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
