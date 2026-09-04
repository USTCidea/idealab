import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import {
  Button,
  MemberCard,
  NewsCard,
  PublicationCard,
} from "../components/ui";
import { mockTeamMembers, mockNews, mockPublications } from "../data/mockData";

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900 text-white">
        <Container>
          <div className="py-8 md:py-16">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold mb-2 leading-tight text-center">
                智能决策博弈与数字经济创新实验室
              </h1>
              <h2 className="text-xl md:text-2xl mb-8 text-blue-100 text-center">
                Laboratory for Intelligent Decision-making with Emerging Algorithms
              </h2>
              <p className="text-lg mb-4 text-white leading-relaxed max-w-5xl">
              安徽省哲学社会科学重点实验室，主要运用机器学习、优化理论与方法、博弈论等人工智能和运筹管理等学科中的方法，通过数据分析、数学建模、模型解析、实验仿真的范式，对交通物流、生产制造、公共资源管理、应急管理等场景中的决策与博弈问题进行研究。实验室的研究工作得到了中国科学院、中国科学技术大学、国家自然科学基金委、安徽省教育厅，以及芯片制造、汽车制造、国家电网等中国龙头企业的资助。
              </p>
            </div>
          </div>
        </Container>
        {/* 装饰性背景 */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      {/* 团队成员预览 */}
      <section id="team-section">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我们的团队
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              由经验丰富的导师和充满活力的学生组成的研究团队
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* 显示所有老师 */}
            {mockTeamMembers.filter((member) => member.role === "faculty").map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/team">
              <Button variant="outline">查看全部成员</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 最新动态 */}
      <section className="bg-gray-50">
        <Container>
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                最新动态
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                了解实验室的最新研究进展和学术活动
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* 显示最新的3条动态（按发布日期倒序） */}
              {[...mockNews]
                .sort(
                  (a, b) =>
                    new Date(b.publishDate).getTime() -
                    new Date(a.publishDate).getTime()
                )
                .slice(0, 3)
                .map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/news">
                <Button variant="outline">查看更多动态</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 精选论文 */}
      <section>
        <Container>
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                精选论文
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                展示实验室的重要研究成果和学术贡献
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* 显示精选论文 */}
              {mockPublications
                .filter((pub) => pub.featured)
                .slice(0, 3)
                .map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    layout="horizontal"
                    showAbstract={true}
                    highlightAuthors={true}
                  />
                ))}
            </div>

            <div className="text-center">
              <Link to="/publications">
                <Button variant="outline">查看全部论文</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 联系我们 */}
      {/* <section id="contact-section" className="bg-gray-50">
        <Container>
          <div className="pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                联系我们
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                如果您对我们的研究感兴趣或想要加入我们的团队，欢迎联系
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  联系方式
                </h3>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">地址</h4>
                    <p className="text-gray-600 mt-1">
                      北京市海淀区中关村南大街XX号 XX大学 XX楼XX室
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">邮箱</h4>
                    <p className="text-gray-600 mt-1">
                      3dv-lab@university.edu.cn
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">电话</h4>
                    <p className="text-gray-600 mt-1">+86 010-XXXX-XXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  加入我们
                </h3>
                <p className="text-gray-600 mb-4">
                  我们实验室长期招收对计算机视觉、3D重建、虚拟现实等方向有浓厚兴趣的优秀学生。
                  如果您想加入我们的团队，请发送您的简历和研究兴趣到我们的邮箱。
                </p>

                <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                  <h4 className="font-medium text-primary-900 mb-2">
                    招生要求
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>扎实的数学基础和编程能力</li>
                    <li>对计算机视觉或相关领域有浓厚兴趣</li>
                    <li>具有良好的英语读写能力</li>
                    <li>有相关研究或项目经验者优先</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() =>
                      (window.location.href =
                        "mailto:3dv-lab@university.edu.cn")
                    }
                  >
                    发送邮件咨询
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section> */}
    </div>
  );
};

export default Home;
