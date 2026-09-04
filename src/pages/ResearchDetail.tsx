import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  BeakerIcon,
  LightBulbIcon,
  CubeIcon,
  UserGroupIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { Button, Card } from "../components/ui";

// 扩展的研究领域数据
const researchAreas = [
  {
    id: "1",
    title: "研究方向一：优化理论",
    subtitle: "指导老师：刘林冬",
    description:
      "主要研究方向为数学建模，优化理论，人工智能算法及其在合作博弈，智能调度，智慧交通物流等方面的应用。",
    abstract:
      "主要研究方向为数学建模，优化理论，人工智能算法及其在合作博弈，智能调度，智慧交通物流等方面的应用。",
    icon: <AcademicCapIcon className="h-12 w-12" />,
    color: "bg-blue-100 text-blue-600",
    technologies: ["优化理论", "智能算法设计"],
    achievements: [
      "招生要求：有很强的自驱力，自我规划能力，有责任感，对数学、计算机等学科有兴趣。",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    detailedContent: {
      overview:
        "主要研究方向为数学建模，优化理论，人工智能算法及其在合作博弈，智能调度，智慧交通物流等方面的应用。",
      keyResearchAreas: [
        {
          name: "优化理论",
          description: "数学建模、优化理论",
        },
        {
          name: "智能算法设计",
          description:
            "人工智能算法及其在合作博弈，智能调度，智慧交通物流等方面的应用",
        },
      ],
      currentProjects: [],
      publications: [],
      teamMembers: [{ name: "刘林冬", role: "指导老师" }],
      equipment: [],
      collaborations: [],
    },
  },
  {
    id: "2",
    title: "研究方向二：数据驱动的鲁棒优化理论及其应用",
    subtitle: "指导老师：张勋",
    description:
      "该方向主要围绕不确定环境下的最优决策方法展开，旨在构建高效且可靠的决策支持体系。研究的理论核心是数据驱动的鲁棒优化，该方法为应对有限样本引起的预测偏差、截断数据及内生性等数据质量问题提供了系统性的理论框架。方法论上，该方向的研究融合了优化、统计学、机器学习与计量经济学等领域的思想与技术。应用层面上，该方向关注将相关方法应用于供应链与库存管理、定价以及产品组合优化等典型运营管理问题中，以实现理论创新与实践价值的统一。",
    abstract:
      "该方向主要围绕不确定环境下的最优决策方法展开，旨在构建高效且可靠的决策支持体系。研究的理论核心是数据驱动的鲁棒优化，该方法为应对有限样本引起的预测偏差、截断数据及内生性等数据质量问题提供了系统性的理论框架。方法论上，该方向的研究融合了优化、统计学、机器学习与计量经济学等领域的思想与技术。应用层面上，该方向关注将相关方法应用于供应链与库存管理、定价以及产品组合优化等典型运营管理问题中，以实现理论创新与实践价值的统一。",
    icon: <CubeIcon className="h-12 w-12" />,
    color: "bg-green-100 text-green-600",
    technologies: ["鲁棒优化", "数据分析", "供应链管理", "零售管理"],
    achievements: [
      "招生要求：自我驱动；有好奇心；具备良好数理基础或者编程能力；有管理科学与工程、数学、统计、计算机、工业工程或者经济方面的背景",
    ],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    detailedContent: {
      overview:
        "该方向主要围绕不确定环境下的最优决策方法展开，旨在构建高效且可靠的决策支持体系。研究的理论核心是数据驱动的鲁棒优化，该方法为应对有限样本引起的预测偏差、截断数据及内生性等数据质量问题提供了系统性的理论框架。方法论上，该方向的研究融合了优化、统计学、机器学习与计量经济学等领域的思想与技术。应用层面上，该方向关注将相关方法应用于供应链与库存管理、定价以及产品组合优化等典型运营管理问题中，以实现理论创新与实践价值的统一。",
      keyResearchAreas: [
        {
          name: "鲁棒优化",
          description: "数据驱动的鲁棒优化",
        },
        {
          name: "数据分析",
          description:
            "融合优化、统计学、机器学习与计量经济学等领域的思想与技术",
        },
        {
          name: "供应链管理",
          description: "应用于供应链与库存管理",
        },
        {
          name: "零售管理",
          description: "定价以及产品组合优化等典型运营管理问题",
        },
      ],
      currentProjects: [],
      publications: [],
      teamMembers: [{ name: "张勋", role: "指导老师" }],
      equipment: [],
      collaborations: [],
    },
  },
  {
    id: "3",
    title: "研究方向三：低空物流系统建模与智能调度优化",
    subtitle: "",
    description:
      "本方向聚焦即时物流场景，面向无人机运输与空地协同（无人机–货车）配送等关键问题开展研究。研究内容涵盖多层级服务网络设计、运力资源配置与协同调度优化，旨在构建高效、灵活的低空物流运行体系。在方法层面，融合运筹优化、组合优化、强化学习与数据驱动分析等技术手段，形成可扩展的智能决策框架与协同调度机制。研究目标在于解决复杂时空环境下的资源分配与实时调度难题，为低空物流系统的安全高效运行及智慧城市物流体系建设提供理论与方法支撑。",
    abstract:
      "本方向聚焦即时物流场景，面向无人机运输与空地协同（无人机–货车）配送等关键问题开展研究。研究内容涵盖多层级服务网络设计、运力资源配置与协同调度优化，旨在构建高效、灵活的低空物流运行体系。在方法层面，融合运筹优化、组合优化、强化学习与数据驱动分析等技术手段，形成可扩展的智能决策框架与协同调度机制。研究目标在于解决复杂时空环境下的资源分配与实时调度难题，为低空物流系统的安全高效运行及智慧城市物流体系建设提供理论与方法支撑。",
    icon: <BeakerIcon className="h-12 w-12" />,
    color: "bg-purple-100 text-purple-600",
    technologies: [
      "低空物流系统",
      "无人机运输",
      "空地资源协同",
      "即时配送调度",
      "运筹优化与强化学习",
    ],
    achievements: [
      "招生要求：欢迎具有数学、计算机、管理科学、交通运输等相关背景的同学报考硕士或博士研究生。申请者应具备良好的逻辑思维与编程能力，对低空物流系统与调度优化问题研究具有浓厚兴趣，愿意在交叉领域开展系统性与创新型研究。",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    detailedContent: {
      overview:
        "本方向聚焦即时物流场景，面向无人机运输与空地协同（无人机–货车）配送等关键问题开展研究。研究内容涵盖多层级服务网络设计、运力资源配置与协同调度优化，旨在构建高效、灵活的低空物流运行体系。在方法层面，融合运筹优化、组合优化、强化学习与数据驱动分析等技术手段，形成可扩展的智能决策框架与协同调度机制。研究目标在于解决复杂时空环境下的资源分配与实时调度难题，为低空物流系统的安全高效运行及智慧城市物流体系建设提供理论与方法支撑。",
      keyResearchAreas: [
        {
          name: "低空物流系统",
          description: "多层级服务网络设计、运力资源配置与协同调度优化",
        },
        {
          name: "运筹优化与强化学习",
          description:
            "融合运筹优化、组合优化、强化学习与数据驱动分析等技术手段",
        },
      ],
      currentProjects: [],
      publications: [],
      teamMembers: [],
      equipment: [],
      collaborations: [],
    },
  },
  {
    id: "4",
    title: "研究方向四：仿真优化研究",
    subtitle: "指导老师：杜建忠",
    description:
      "研究概述：面对医疗、制造、交通等领域的复杂动态系统，仿真优化通过构建随机仿真模型量化系统性能，并探索最优决策方案。其核心研究包括：1）随机系统仿真建模方法，需准确刻画系统的动态演化与随机扰动；2）具有收敛保障的智能优化算法，需基于仿真模型高效逼近最优解。",
    abstract:
      "研究概述：面对医疗、制造、交通等领域的复杂动态系统，仿真优化通过构建随机仿真模型量化系统性能，并探索最优决策方案。其核心研究包括：1）随机系统仿真建模方法，需准确刻画系统的动态演化与随机扰动；2）具有收敛保障的智能优化算法，需基于仿真模型高效逼近最优解。",
    icon: <LightBulbIcon className="h-12 w-12" />,
    color: "bg-yellow-100 text-yellow-600",
    technologies: ["仿真优化算法", "随机系统建模与仿真"],
    achievements: [
      "招生要求：1）对高等数学和概率论感兴趣并成绩优异；2）掌握一门编程语言（如：Python）",
    ],
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    detailedContent: {
      overview:
        "研究概述：面对医疗、制造、交通等领域的复杂动态系统，仿真优化通过构建随机仿真模型量化系统性能，并探索最优决策方案。其核心研究包括：1）随机系统仿真建模方法，需准确刻画系统的动态演化与随机扰动；2）具有收敛保障的智能优化算法，需基于仿真模型高效逼近最优解。",
      keyResearchAreas: [
        {
          name: "随机系统仿真建模方法",
          description: "准确刻画系统的动态演化与随机扰动",
        },
        {
          name: "具有收敛保障的智能优化算法",
          description: "基于仿真模型高效逼近最优解",
        },
      ],
      currentProjects: [],
      publications: [],
      teamMembers: [{ name: "杜建忠", role: "指导老师" }],
      equipment: [],
      collaborations: [],
    },
  },
];

const ResearchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const research = researchAreas.find((area) => area.id === id);

  if (!research) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              研究方向未找到
            </h1>
            <Link to="/research">
              <Button variant="primary">返回研究方向</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16">
      <Container>
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/research" className="hover:text-gray-900">
            研究方向
          </Link>
          <span>/</span>
          <span className="text-gray-900">{research.title}</span>
        </nav>

        {/* 返回按钮 */}
        <Link
          to="/research"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          返回研究方向
        </Link>

        {/* 头图 */}
        <div className="h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={research.image}
            alt={research.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 标题区域 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className={`p-4 rounded-lg ${research.color}`}>
              {research.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {research.title}
              </h1>
              <h2 className="text-lg text-gray-600 mb-4">
                {research.subtitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {research.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 摘要 */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">研究概述</h3>
              <p className="text-gray-700 leading-relaxed">
                {research.abstract}
              </p>
            </Card>

            {/* 详细介绍 */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">详细介绍</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {research.detailedContent.overview}
              </p>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 核心技术 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                核心技术
              </h3>
              <div className="flex flex-wrap gap-2">
                {research.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            {/* 研究团队 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                研究团队
              </h3>
              <div className="space-y-3">
                {research.detailedContent.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 主要成果 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                主要成果
              </h3>
              <div className="space-y-3">
                {research.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <TrophyIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 研究设备 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                研究设备
              </h3>
              <div className="space-y-2">
                {research.detailedContent.equipment.map((equipment, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {equipment}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResearchDetail;
