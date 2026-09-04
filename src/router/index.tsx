import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";

// 页面组件
import Home from "../pages/Home";
import Team from "../pages/Team";
import MemberDetail from "../pages/MemberDetail";
import Publications from "../pages/Publications";
import News from "../pages/News";
import NewsAll from "../pages/NewsAll";
import NewsDetail from "../pages/NewsDetail";
import Announcements from "../pages/Announcements";
import Gallery from "../pages/Gallery";
import Research from "../pages/Projects"; // Renamed from Projects to Research
import ResearchDetail from "../pages/ResearchDetail";
import ProjectDetail from "../pages/ProjectDetail";
import NotFound from "../pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Router basename="/idealab">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<MemberDetail />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/lectures" element={<News />} />
          <Route path="/news" element={<NewsAll />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<ResearchDetail />} />
          <Route path="/timeline" element={<Announcements />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          {/* 404 页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
