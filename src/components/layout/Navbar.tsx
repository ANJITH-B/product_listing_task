"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/products";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import { useDebounce } from "@/hooks/useDebounce";
import Filters from "./Filter";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const lastQ = useRef(searchParams.get("q") || "");

  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "asc";

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: productApi.getCategories,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (debouncedSearch === lastQ.current) return;
    const params = new URLSearchParams(searchParams.toString());
    debouncedSearch ? params.set("q", debouncedSearch) : params.delete("q");
    lastQ.current = debouncedSearch;
    router.push(`/?${params.toString()}`);
  }, [debouncedSearch]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 z-30 w-full bg-white md:bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="font-bold uppercase text-xl hidden md:block">
            Products
          </Link>

          {/* SEARCH */}
          <div className="flex-1 max-w-md relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full bg-gray-50 border border-gray-200 py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden md:flex">
            <Filters
              category={category}
              categories={categories}
              sortBy={sortBy}
              order={order}
              onChange={handleFilterChange}
            />
          </div>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="md:hidden px-3 py-2 text-xs border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            {showMobileFilters ? "Close" : "Filters"}
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-DOWN FILTER BAR */}
      <Transition
        show={showMobileFilters}
        enter="transition transform duration-600"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition transform duration-600"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div className="fixed top-20 left-0 right-0 z-20 bg-white border-b border-gray-200 p-4">
          <Filters
            category={category}
            categories={categories}
            sortBy={sortBy}
            order={order}
            onChange={handleFilterChange}
          />

          <button
            onClick={() => setShowMobileFilters(false)}
            className="mt-4 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-100"
          >
            Close Filters
          </button>
        </div>
      </Transition>
    </>
  );
}
