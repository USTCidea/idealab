export interface ReadingCollection {
  id: string;
  title: string;
  paperCount: number;
  edition: string;
  pdfPath: string;
  downloadName: string;
}

export const readingCollections: ReadingCollection[] = [
  {
    id: "cooperative-game-theory-2026-11",
    title: "合作博弈方向",
    paperCount: 3,
    edition: "2026年11月",
    pdfPath: "reading-collections/cooperative-game-theory-2026-11.pdf",
    downloadName: "合作博弈方向论文集.pdf",
  },
  {
    id: "optimization-learning-2026-11",
    title: "优化学习方向",
    paperCount: 7,
    edition: "2026年11月",
    pdfPath: "reading-collections/optimization-learning-2026-11.pdf",
    downloadName: "优化学习方向论文集.pdf",
  },
  {
    id: "data-intelligence-2026-11",
    title: "数据智能方向",
    paperCount: 5,
    edition: "2026年11月",
    pdfPath: "reading-collections/data-intelligence-2026-11.pdf",
    downloadName: "数据智能方向论文集.pdf",
  },
  {
    id: "operations-management-2026-11",
    title: "运营管理方向",
    paperCount: 6,
    edition: "2026年11月",
    pdfPath: "reading-collections/operations-management-2026-11.pdf",
    downloadName: "运营管理方向论文集.pdf",
  },
];
