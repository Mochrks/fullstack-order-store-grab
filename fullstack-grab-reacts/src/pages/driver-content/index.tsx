import React, { useState } from "react";
import "@/App.css";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SearchBar } from "@/components/demo/SearchBar";
import locationLists from "@/apis/listLocationApis";
import NavProfile from "@/components/demo/NavProfile";

function DriverContent() {
  return (
    <>
      <div className="bottom-0 left-0 right-0 mx-auto max-w-[1290px]  px-4 ">
        <div>
          <AspectRatio ratio={16 / 2.5}>
            <img
              src="../src/assets/driver.jpg"
              alt="Banner Food Images"
              className="object-cover w-full h-full rounded-md"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="bottom-0 left-0 right-0 mx-auto max-w-[1120px]  pt-14 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <AspectRatio ratio={16 / 11}>
              <img
                src="../src/assets/maps.jpg"
                alt="Banner Food Images"
                className="object-cover w-full h-full rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="col-span-5">
            <div className="bottom-0 left-0 right-0 mx-auto max-w-full">
              <SearchBar></SearchBar>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {locationLists.map((location) => (
                <li
                  key={location.jln}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src="./src/assets/location.png"
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {location.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {location.jln}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {location.distance}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* buttom */}
        <NavProfile />
      </div>
    </>
  );
}

export default DriverContent;
