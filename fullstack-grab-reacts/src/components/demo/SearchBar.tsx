import { BikeIcon, Utensils } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import React from "react";

export function SearchBar() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Lokasi saat ini ..." />
      <CommandInput placeholder="Mau kemana..." />
    </Command>
  );
}
