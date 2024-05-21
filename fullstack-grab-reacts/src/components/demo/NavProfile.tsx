import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavProfile() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[1290px] px-20 pb-4">
        <div className="absolute inset-0 bg-white "></div>
        <Alert className="relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="mr-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <AlertTitle>Selamat datang !! John Doe</AlertTitle>
              <AlertDescription>
                Kami senang Anda bergabung dengan kami. Mari mulai pesan
                perjalanan Anda sekarang juga!
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    </>
  );
}
