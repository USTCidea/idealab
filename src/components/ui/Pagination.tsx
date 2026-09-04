import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showQuickJumper?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showQuickJumper = false,
  className = "",
}) => {
  const [jumpToPage, setJumpToPage] = React.useState("");

  // 生成页码列表
  const getPageNumbers = () => {
    const delta = 2; // 当前页前后显示的页数
    const range = [];
    const rangeWithDots = [];

    // 计算显示范围
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // 生成页码范围
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // 添加首页和省略号
    if (start > 2) {
      rangeWithDots.push(1, "...");
    } else if (start === 2) {
      rangeWithDots.push(1);
    }

    // 添加主要范围
    rangeWithDots.push(...range);

    // 添加尾页和省略号
    if (end < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (end === totalPages - 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage("");
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* 左侧信息 */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors duration-150",
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          上一页
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={clsx(
            "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors duration-150",
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          下一页
        </button>
      </div>

      {/* 桌面端分页 */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            第 <span className="font-medium">{currentPage}</span> 页，共{" "}
            <span className="font-medium">{totalPages}</span> 页
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* 快速跳转到首页 */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={clsx(
              "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium transition-colors duration-150",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            )}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          </button>

          {/* 上一页 */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              "relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium transition-colors duration-150",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            )}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {/* 页码 */}
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={clsx(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-150",
                    page === currentPage
                      ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* 下一页 */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              "relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium transition-colors duration-150",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            )}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* 快速跳转到尾页 */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={clsx(
              "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium transition-colors duration-150",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            )}
          >
            <ChevronDoubleRightIcon className="h-5 w-5" />
          </button>

          {/* 快速跳转 */}
          {showQuickJumper && (
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-sm text-gray-700">跳转到</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleJumpToPage();
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">页</span>
              <button
                onClick={handleJumpToPage}
                className="px-3 py-1 bg-primary-900 text-white text-sm rounded-md hover:bg-primary-800 transition-colors duration-150"
              >
                确定
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
