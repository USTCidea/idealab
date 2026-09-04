import React from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Container from "./Container";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 实验室信息 */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LIDEA</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    智能决策博弈与数字经济创新
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Laboratory for Intelligent Decision-making with Emerging Algorithms
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
              致力于优化理论与智能决策算法研究，培养具有创新精神和实践能力的优秀人才。
              </p>

              {/* 联系信息 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPinIcon className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">
                    安徽省合肥市中国科学技术大学东区管理科研楼
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">ldliu@ustc.edu.cn</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <PhoneIcon className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">+86-551-63606183</span>
                </div>
              </div>
            </div>

            {/* 微信公众号 */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-4">关注我们</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">微信公众号</p>
                  <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">二维码</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label="学术社交网络"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.162 1.2-.84 3.96-.84 3.96s-.84 2.76-.84 3.96v.72c0 .84-.72 1.56-1.56 1.56h-.72c-1.2 0-3.96.84-3.96.84s-2.76.84-3.96.84H5.04c-.84 0-1.56-.72-1.56-1.56v-.72c0-1.2-.84-3.96-.84-3.96s-.84-2.76-.84-3.96v-.72c0-.84.72-1.56 1.56-1.56h.72c1.2 0 3.96-.84 3.96-.84s2.76-.84 3.96-.84h.72c.84 0 1.56.72 1.56 1.56v.72z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label="邮箱"
                  >
                    <EnvelopeIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} 智能决策博弈与数字经济创新 实验室. 保留所有权利.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-primary-400 transition-colors duration-200"
              >
                隐私政策
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-400 transition-colors duration-200"
              >
                使用条款
              </Link>
              <Link
                to="/sitemap"
                className="hover:text-primary-400 transition-colors duration-200"
              >
                网站地图
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
