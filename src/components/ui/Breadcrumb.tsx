import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex ${className}`} aria-label="面包屑导航">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-300 mx-1" />
            )}

            {item.path ? (
              <Link
                to={item.path}
                className={clsx(
                  "inline-flex items-center text-sm font-medium transition-colors duration-150",
                  index === 0
                    ? "text-gray-700 hover:text-primary-900"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  "inline-flex items-center text-sm font-medium",
                  "text-gray-500 cursor-default"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
