import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Container from "./Container";
import type { NavItem } from "../../types";

const navigation: NavItem[] = [
  { name: "首页", path: "/" },
  { name: "团队信息", path: "/team" },
  { name: "学术论文", path: "/publications" },
  { name: "新闻动态", path: "/news" },
  { name: "学术讲座", path: "/lectures" },
  { name: "团队风采", path: "/gallery" },
  { name: "研究方向", path: "/research" },
  { name: "时间线", path: "/timeline" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCurrentPath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-200 border-b backdrop-blur-lg",
        isScrolled
          ? "bg-white/90 border-gray-200"
          : "bg-transparent border-transparent",
      )}
    >
      {({ open }) => (
        <>
          <Container>
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="h-10 w-auto bg-primary-900 rounded-md flex items-center justify-center">
                    {/* <span className="text-primary font-bold text-lg">智能决策博弈与数字经济创新</span>
                     */}
                    <img
                      src={import.meta.env.BASE_URL + "/images/logo.png"}
                      alt="OR Colearning Society"
                      className="h-12 w-auto my-auto"
                    />
                  </div>
                  {/* <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-gray-900">
                      智能决策博弈与数字经济创新 实验室
                    </h1>
                    <span className="text-sm text-gray-600">
                      3D Vision Laboratory
                    </span>
                  </div> */}
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={clsx(
                        "px-2.5 py-2 text-sm font-medium border-b-2 border-transparent transition-colors duration-150",
                        isCurrentPath(item.path)
                          ? "text-primary-900 border-primary-900"
                          : "text-gray-700 hover:text-primary-900 hover:border-gray-300",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">打开主菜单</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </Container>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.path}
                  className={clsx(
                    "block px-3 py-2 text-base font-medium border-l-2 border-transparent transition-colors duration-150",
                    isCurrentPath(item.path)
                      ? "text-primary-900 border-primary-900"
                      : "text-gray-700 hover:text-primary-900 hover:border-gray-300",
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
