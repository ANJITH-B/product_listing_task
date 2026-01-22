"use client";

import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Default", value: "" },
  { name: "Price", value: "price" },
  { name: "Rating", value: "rating" },
  { name: "Title", value: "title" },
];

interface Props {
  category: string;
  categories: string[];
  sortBy: string;
  order: string;
  onChange: (key: string, value: string) => void;
}

export default function Filters({
  category,
  categories,
  sortBy,
  order,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      {/* CATEGORY */}
      <div className="w-full md:w-44">
        <Listbox value={category} onChange={(v) => onChange("category", v)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left text-sm border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
              <span className="block truncate capitalize">
                {category || "All Categories"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                <Listbox.Option value="">
                  {({ selected, active }) => (
                    <div
                      className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                      All Categories
                    </div>
                  )}
                </Listbox.Option>

                {categories.map((cat) => (
                  <Listbox.Option key={cat} value={cat}>
                    {({ selected, active }) => (
                      <div
                        className={`relative cursor-pointer select-none py-2 pl-10 pr-4 capitalize ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                        {cat.replace("-", " ")}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* SORT */}
      <div className="w-full md:w-36">
        <Listbox value={sortBy} onChange={(v) => onChange("sortBy", v)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left text-sm border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
              {sortOptions.find((o) => o.value === sortBy)?.name || "Sort"}
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>

            <Transition as={Fragment} leave="transition opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-40 mt-1 w-full bg-white shadow-lg rounded-md text-sm ring-1 ring-black ring-opacity-5">
                {sortOptions.map((opt) => (
                  <Listbox.Option key={opt.value} value={opt.value}>
                    {({ selected, active }) => (
                      <div
                        className={`relative cursor-pointer py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                        {opt.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* ORDER */}
      <div className="flex w-full md:w-auto">
        <button
          onClick={() => onChange("order", "asc")}
          className={`flex-1 md:flex-none px-3 py-2 text-xs border border-gray-200 rounded-l-lg ${
            order === "asc"
              ? "bg-gray-100 font-medium"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          Low → High
        </button>
        <button
          onClick={() => onChange("order", "desc")}
          className={`flex-1 md:flex-none px-3 py-2 text-xs border border-gray-200 rounded-r-lg ${
            order === "desc"
              ? "bg-gray-100 font-medium"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          High → Low
        </button>
      </div>
    </div>
  );
}

