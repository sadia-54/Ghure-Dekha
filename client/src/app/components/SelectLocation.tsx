"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const locations = [
"Dhaka",
  "Faridpur",
  "Gazipur",
  "Gopalganj",
  "Kishoreganj",
  "Madaripur",
  "Manikganj",
  "Munshiganj",
  "Narayanganj",
  "Narsingdi",
  "Rajbari",
  "Shariatpur",
  "Tangail",
  "Bandarban",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Cumilla",
  "Cox's Bazar",
  "Feni",
  "Khagrachari",
  "Lakshmipur",
  "Noakhali",
  "Rangamati",
  "Bagerhat",
  "Chuadanga",
  "Jashore",
  "Jhenaidah",
  "Khulna",
  "Kushtia",
  "Magura",
  "Meherpur",
  "Narail",
  "Satkhira",
  "Bogura",
  "Joypurhat",
  "Naogaon",
  "Natore",
  "Pabna",
  "Rajshahi",
  "Sirajganj",
  "Dinajpur",
  "Gaibandha",
  "Kurigram",
  "Lalmonirhat",
  "Nilphamari",
  "Panchagarh",
  "Rangpur",
  "Thakurgaon",
  "Jamalpur",
  "Mymensingh",
  "Netrokona",
  "Sherpur",
  "Barguna",
  "Barishal",
  "Bhola",
  "Jhalokati",
  "Patuakhali",
  "Pirojpur",
  "Habiganj",
  "Moulvibazar",
  "Sunamganj",
  "Sylhet"
].sort(); // Sort alphabetically

type SelectLocationProps = {
  value: string
  onChange: (value: string) => void
};

export default function SelectLocation({value, onChange}: SelectLocationProps) {
  const [search, setSearch] = useState("");
  // const [selected, setSelected] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Select 
    value={value}
    onValueChange={(val) => onChange(val)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        {/* Search input */}
        <div className="p-2">
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md outline-none border-gray-300"
          />
        </div>

        {/* Filtered list */}
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            No location found.
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
