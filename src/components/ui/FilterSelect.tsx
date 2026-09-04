import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "选择筛选条件",
  className = "",
}) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-md bg-white py-2.5 pl-3 pr-10 text-left",
              "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "transition-colors duration-150"
            )}
          >
            <span className="block truncate text-gray-900">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1",
                "shadow-sm border border-gray-200 focus:outline-none"
              )}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-3 pr-9",
                      active
                        ? "bg-primary-50 text-primary-900"
                        : "text-gray-900"
                    )
                  }
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <span
                          className={clsx(
                            "block truncate",
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          {option.label}
                        </span>
                        {option.count !== undefined && (
                          <span
                            className={clsx(
                              "text-sm",
                              active ? "text-primary-600" : "text-gray-500"
                            )}
                          >
                            ({option.count})
                          </span>
                        )}
                      </div>
                      {selected && (
                        <span
                          className={clsx(
                            "absolute inset-y-0 right-0 flex items-center pr-3",
                            active ? "text-primary-600" : "text-primary-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterSelect;
