import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  Atom,
  BookOpen,
  BookOpenText,
  Calculator,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  House,
  Menu,
  Pencil,
  Search,
  Trophy,
  Rocket,
  Trees,
  Sprout,
  ChartNoAxesColumnIncreasing,
  Settings,
  X,
} from "lucide-react";
import { CATEGORIES, SECTION_LABELS } from "./data";
import type { Category, Exercise, Result, Section } from "./data";
import { themeAsset, useTheme } from "./theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-switcher" role="group" aria-label="Chọn giao diện">
      <button
        aria-pressed={theme === "dinosaur"}
        onClick={() => setTheme("dinosaur")}
      >
        <Trees size={16} />
        Khủng long
      </button>
      <button
        aria-pressed={theme === "space"}
        onClick={() => setTheme("space")}
      >
        <Rocket size={16} />
        Vũ trụ
      </button>
      <button
        aria-pressed={theme === "garden"}
        onClick={() => setTheme("garden")}
      >
        <Sprout size={16} />
        Vườn học tập
      </button>
    </div>
  );
}

export function Dialog({
  children,
  onClose,
  title,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`dialog ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Đóng"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

type SidebarProps = {
  grade: number;
  section: Section;
  category: Category;
  examsOpen: boolean;
  schoolOpen: boolean;
  onGrade: (grade: number) => void;
  onNavigate: (section: Section, category?: Category) => void;
  onToggleExams: () => void;
  onToggleSchool: () => void;
  onClose?: () => void;
  onProgress: () => void;
  onSettings: () => void;
};
const subjects = [
  { id: "toan" as const, icon: Calculator },
  { id: "vietnamese" as const, icon: BookOpenText },
  { id: "esl" as const, icon: null },
  { id: "math" as const, icon: Atom },
  { id: "science" as const, icon: FlaskConical },
];

export function Sidebar(props: SidebarProps) {
  const { theme } = useTheme();
  const {
    grade,
    section,
    category,
    examsOpen,
    schoolOpen,
    onGrade,
    onNavigate,
    onToggleExams,
    onToggleSchool,
    onClose,
    onProgress,
    onSettings,
  } = props;
  const isExam = section === "timo" || section === "asmo";
  const navigate = (s: Section, c: Category = "all") => {
    onNavigate(s, c);
    onClose?.();
  };
  return (
    <aside className="sidebar">
      {onClose ? (
        <button
          className="icon-button mobile-close"
          aria-label="Đóng menu"
          onClick={onClose}
        >
          <X />
        </button>
      ) : null}
      <button
        className="brand"
        onClick={() => navigate("home")}
        aria-label="Góc học tập của bé — Trang chủ"
      >
        <img src={themeAsset(theme, "logo")} alt="" className="brand-dino" />
        <span>
          Góc học tập<span>của bé</span>
        </span>
      </button>
      <ThemeSwitcher />
      <div className="grade-picker">
        <label htmlFor={onClose ? "mobile-grade" : "grade"}>Chọn lớp</label>
        <div className="select-wrap">
          <select
            id={onClose ? "mobile-grade" : "grade"}
            value={grade}
            onChange={(e) => onGrade(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                Lớp {n}
              </option>
            ))}
          </select>
          <ChevronDown size={20} />
        </div>
      </div>
      <nav aria-label="Danh mục học tập">
        <button
          className={`nav-row home-link ${section === "home" ? "selected" : ""}`}
          onClick={() => navigate("home")}
        >
          <House size={24} fill="currentColor" />
          <span>Trang chủ</span>
        </button>
        <button
          className={`nav-row nav-parent ${isExam ? "selected" : ""}`}
          onClick={onToggleExams}
          aria-expanded={examsOpen}
        >
          <Trophy size={25} />
          <span>Các kỳ thi</span>
          <ChevronDown size={18} className={examsOpen ? "rotated" : ""} />
        </button>
        {examsOpen ? (
          <div className="exam-nav">
            {(["timo", "asmo"] as const).map((exam) => (
              <div key={exam}>
                <button
                  className={`nav-row exam-link ${section === exam ? "active" : ""}`}
                  onClick={() => navigate(exam)}
                >
                  <ChevronRight size={15} fill="currentColor" />
                  <span>{SECTION_LABELS[exam]}</span>
                  <ChevronDown
                    size={17}
                    className={section === exam ? "rotated" : ""}
                  />
                </button>
                {section === exam ? (
                  <div className="exam-subnav">
                    <button
                      className={`all-exams ${category === "all" ? "current" : ""}`}
                      onClick={() => navigate(exam)}
                    >
                      <span className="nav-dot" />
                      Tất cả đề
                    </button>
                    <div className="subnav-branch">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c.id}
                          className={category === c.id ? "current" : ""}
                          onClick={() => navigate(exam, c.id)}
                        >
                          {c.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        <button
          className={`nav-row nav-parent school-parent ${!isExam && section !== "home" ? "selected" : ""}`}
          onClick={onToggleSchool}
          aria-expanded={schoolOpen}
        >
          <BookOpen size={25} />
          <span>Báo bài của trường</span>
          <ChevronDown size={18} className={schoolOpen ? "rotated" : ""} />
        </button>
        {schoolOpen ? (
          <div className="subject-nav">
            {subjects.map(({ id, icon: Icon }) => (
              <button
                className={`nav-row ${section === id ? "active" : ""}`}
                key={id}
                onClick={() => navigate(id)}
              >
                {Icon ? (
                  <Icon size={24} />
                ) : (
                  <span className="letter-icon">Aa</span>
                )}
                <span>{SECTION_LABELS[id]}</span>
              </button>
            ))}
          </div>
        ) : null}
      </nav>
      {theme === "garden" ? (
        <div className="garden-shortcuts">
          <button
            className="nav-row"
            onClick={() => {
              onClose?.();
              onProgress();
            }}
          >
            <ChartNoAxesColumnIncreasing size={21} />
            <span>Tiến độ học tập</span>
          </button>
          <button
            className="nav-row"
            onClick={() => {
              onClose?.();
              onSettings();
            }}
          >
            <Settings size={21} />
            <span>Cài đặt</span>
          </button>
        </div>
      ) : null}
      {theme === "dinosaur" ? (
        <img
          className="sidebar-art"
          src={`${import.meta.env.BASE_URL}assets/sidebar.webp`}
          alt=""
        />
      ) : null}
    </aside>
  );
}

export function Hero({
  search,
  onSearch,
  onMenu,
  onParent,
}: {
  search: string;
  onSearch: (s: string) => void;
  onMenu: () => void;
  onParent: () => void;
}) {
  const { theme } = useTheme();
  return (
    <header className="hero">
      <div className="hero-tools">
        <button
          className="mobile-menu icon-button"
          onClick={onMenu}
          aria-label="Mở menu"
        >
          <Menu size={25} />
        </button>
        <div className="search-box">
          <Search size={23} />
          <input
            type="search"
            aria-label="Tìm bài tập"
            placeholder="Tìm bài tập"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search ? (
            <button
              className="icon-button clear-search"
              aria-label="Xóa tìm kiếm"
              onClick={() => onSearch("")}
            >
              <X size={17} />
            </button>
          ) : null}
        </div>
        <button className="parent-button" onClick={onParent}>
          <span className="avatar">
            <GraduationCap size={22} />
          </span>
          <span>Phụ huynh</span>
          <ChevronDown size={19} />
        </button>
      </div>
      {theme === "space" ? (
        <div className="space-headline">
          <div>
            Góc học tập<span>của bé</span>
          </div>
          <p>Khám phá tri thức – Vươn tới những ước mơ!</p>
        </div>
      ) : theme === "dinosaur" ? (
        <div className="wooden-sign" aria-label="Khám phá tri thức mỗi ngày">
          <span>KHÁM PHÁ</span>
          <span>TRI THỨC</span>
          <span>MỖI NGÀY!</span>
        </div>
      ) : null}
      <div className="mobile-brand">
        Góc học tập <span>của bé</span>
      </div>
    </header>
  );
}

export function CategoryCards({
  category,
  onSelect,
}: {
  category: Category;
  onSelect: (category: Category) => void;
}) {
  return (
    <div className="category-grid" aria-label="Loại đề">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className={`category-card ${c.tone} ${category === c.id ? "chosen" : ""}`}
          onClick={() => onSelect(category === c.id ? "all" : c.id)}
          aria-pressed={category === c.id}
        >
          <span
            className={`category-emoji category-icon-${c.id}`}
            aria-hidden="true"
          />
          <span className="category-copy">
            <strong>{c.title}</strong>
            <span>{c.description}</span>
          </span>
          <ChevronRight size={23} />
        </button>
      ))}
    </div>
  );
}

export function ExerciseCard({
  exercise,
  grade,
  result,
  hasDraft,
  onOpen,
}: {
  exercise: Exercise;
  grade: number;
  result?: Result;
  hasDraft: boolean;
  onOpen: () => void;
}) {
  const { theme } = useTheme();
  return (
    <article className="exercise-card">
      <button
        className="card-image-button"
        onClick={onOpen}
        aria-label={`Mở ${exercise.title}`}
      >
        <img
          className={`card-image ${exercise.image === "hero" ? "explorer-image" : ""}`}
          src={themeAsset(theme, exercise.image)}
          alt={
            theme === "garden"
              ? "Bạn thú nhỏ khám phá kiến thức trong khu vườn"
              : theme === "space"
                ? "Nhà du hành nhỏ khám phá vũ trụ"
                : exercise.image === "triceratops"
                  ? "Khủng long nhỏ khám phá dấu chân trong rừng"
                  : "Bạn nhỏ và khủng long cùng khám phá khu rừng"
          }
        />
      </button>
      <h3>
        <button onClick={onOpen}>{exercise.title}</button>
      </h3>
      <div className="card-meta">
        <span>
          <GraduationCap size={25} fill="currentColor" />
          Lớp {grade}
        </span>
        <span
          className={`status ${result ? "done" : hasDraft ? "in-progress" : ""}`}
        >
          {result
            ? `Đã làm · ${result.score}/${result.total}`
            : hasDraft
              ? "Đang làm"
              : "Chưa làm"}
        </span>
      </div>
      <button className="start-button" onClick={onOpen}>
        <Pencil size={25} fill="white" />
        {result ? "Làm lại" : hasDraft ? "Tiếp tục" : "Làm bài"}
      </button>
    </article>
  );
}
