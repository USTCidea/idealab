// 团队成员类型
export interface TeamMember {
  id: string;
  name: string;
  nameEn?: string;
  role: "faculty" | "postdoc" | "phd" | "master" | "alumni";
  type?: "engineer" | "academic";
  title?: string; // 职称
  supervisorType?: string; // 导师类型：博士生导师、研究生导师等
  avatar?: string;
  email?: string;
  researchInterests: string[];
  bio?: string;
  education?: Education[];
  workExperience?: WorkExperience[]; // 工作经历
  representativeWorks?: string[]; // 代表作
  publications?: string[]; // 论文ID列表
  graduationYear?: number; // 毕业生专用
  currentPosition?: string; // 毕业生当前职位
  alumniBio?: string; // 在毕业生栏目展示时的简介
  joinYear?: number;
  website?: string;
}

// 教育背景
export interface Education {
  degree: string;
  institution: string;
  year: number;
  major?: string;
}

// 工作经历
export interface WorkExperience {
  position: string;
  institution: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

// 论文类型
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "workshop";
  abstract?: string;
  pdfUrl?: string;
  projectUrl?: string;
  bibtex?: string;
  featured?: boolean;
  doi?: string;
  impact?: number;
}

// 新闻动态类型
export interface NewsItem {
  id: string;
  title: string;
  category:
    | "conference"
    | "talk"
    | "thesis"
    | "achievement"
    | "collaboration"
    | "activity"
    | "personnel";
  content: string;
  publishDate: string;
  status: "published" | "draft";
  images?: string[];
  tags?: string[];
  author?: string;
  featured?: boolean;

  // 会议特有字段
  conferenceName?: string;
  conferenceDate?: string;
  conferenceLink?: string;

  // 学术报告特有字段
  talkSpeaker?: string;
  talkTime?: string;
  talkLocation?: string;

  // 学位论文特有字段
  thesisAuthor?: string;
  thesisYear?: number;
}

// 科研项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  type: "national" | "provincial" | "university" | "enterprise";
  status: "ongoing" | "completed" | "planned";
  startDate: string;
  endDate?: string;
  funding?: number;
  leader: string;
  members: string[];
  relatedPublications?: string[];
  website?: string;
}

// 图片画廊类型
export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  category: "academic" | "team" | "conference" | "daily";
  date: string;
  tags?: string[];
}

// 导航菜单类型
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

// 通用响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 分页类型
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// 搜索过滤类型
export interface SearchFilters {
  query?: string;
  category?: string;
  year?: number;
  type?: string;
  status?: string;
}

// 主题配置类型
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

// 网站配置类型
export interface SiteConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  email: string;
  address: string;
  phone?: string;
  wechat?: string;
  logo: string;
  favicon: string;
  theme: ThemeConfig;
}
