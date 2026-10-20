import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Menu,
  Pencil,
  Search,
  Trophy,
  FileText,
  Medal,
  LibraryBig,
  Rocket,
  Trees,
  Sprout,
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
  category: Category;
  isExam: boolean;
  onCategory: (category: Category) => void;
  onClose?: () => void;
};

export function Sidebar({
  category,
  isExam,
  onCategory,
  onClose,
}: SidebarProps) {
  const { theme } = useTheme();
  const items = [
    { id: "all" as const, title: "Tất cả đề", Icon: Trophy },
    { id: "qualifier" as const, title: "Đề vòng loại", Icon: FileText },
    { id: "national" as const, title: "Đề Quốc gia", Icon: Medal },
    { id: "topic" as const, title: "Luyện theo chủ đề", Icon: LibraryBig },
  ];
  const choose = (next: Category) => {
    onCategory(next);
    onClose?.();
  };
  return (
    <aside className="sidebar catalog-sidebar">
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
        onClick={() => choose("all")}
        aria-label="Góc học tập của bé — Tất cả đề"
      >
        <img src={themeAsset(theme, "logo")} alt="" className="brand-dino" />
        <span>
          Góc học tập<span>của bé</span>
        </span>
      </button>
      <nav className="catalog-navigation" aria-label="Danh mục đề bài">
        {items.map(({ id, title, Icon }) => (
          <button
            key={id}
            className={`nav-row ${category === id ? "selected" : ""}`}
            aria-current={category === id ? "page" : undefined}
            disabled={!isExam && (id === "qualifier" || id === "national")}
            title={
              !isExam && (id === "qualifier" || id === "national")
                ? "Dành cho chương trình kỳ thi TIMO hoặc ASMO"
                : undefined
            }
            onClick={() => choose(id)}
          >
            <Icon size={25} />
            <span>{title}</span>
          </button>
        ))}
      </nav>
      <div className="catalog-theme-picker">
        <span>Giao diện</span>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

export function StudyFilters({
  grade,
  section,
  onGrade,
  onProgram,
  onSubject,
}: {
  grade: number;
  section: Section;
  onGrade: (grade: number) => void;
  onProgram: (program: "timo" | "asmo" | "school") => void;
  onSubject: (subject: Section) => void;
}) {
  const isExam = section === "timo" || section === "asmo";
  return (
    <div className="study-filters" aria-label="Bộ lọc bài tập">
      <div className="filter-field">
        <label htmlFor="study-grade">Chọn lớp</label>
        <div className="filter-select">
          <GraduationCap size={21} />
          <select
            id="study-grade"
            value={grade}
            onChange={(e) => onGrade(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                Lớp {n}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
      </div>
      <div className="filter-field">
        <label htmlFor="study-program">Chọn chương trình học</label>
        <div className="filter-select">
          <BookOpen size={21} />
          <select
            id="study-program"
            value={isExam ? section : "school"}
            onChange={(e) =>
              onProgram(e.target.value as "timo" | "asmo" | "school")
            }
          >
            <option value="timo">TIMO</option>
            <option value="asmo">ASMO</option>
            <option value="school">Báo bài của trường</option>
          </select>
          <ChevronDown size={18} />
        </div>
      </div>
      <div className="filter-field">
        <label htmlFor="study-subject">Chọn môn học</label>
        <div className="filter-select">
          <FlaskConical size={21} />
          <select
            id="study-subject"
            value={isExam ? "toan" : section}
            onChange={(e) => onSubject(e.target.value as Section)}
          >
            {(isExam
              ? (["toan"] as const)
              : (["toan", "vietnamese", "esl", "math", "science"] as const)
            ).map((s) => (
              <option key={s} value={s}>
                {SECTION_LABELS[s]}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
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
