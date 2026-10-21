import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  X,
  ChevronDown,
  Check,
  Clock3,
  BookOpen,
  Flag,
  Star,
} from "lucide-react";
import { useLearningTheme } from "./theme";
import { SECTION_LABELS } from "./data";
import type { Category, Exercise, Result, Section } from "./data";

export const publicAsset = (name: string) =>
  `${import.meta.env.BASE_URL}assets/${name}.webp`;

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

export function PixelIcon({
  name,
  size = 24,
}: {
  name: "book" | "flag" | "star";
  size?: number;
}) {
  const { theme } = useLearningTheme();
  if (theme !== "pixel") {
    const Icon = name === "book" ? BookOpen : name === "flag" ? Flag : Star;
    return (
      <Icon size={size} aria-hidden="true" className="smooth-theme-icon" />
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {name === "book" ? (
        <>
          <path d="M2 4h8v1h4V4h8v17h-8v1h-4v-1H2z" fill="#083b54" />
          <path
            d="M4 3h6v1h4V3h6v15h-6v1h-4v-1H4z"
            fill="#fcffff"
            stroke="#0e8095"
          />
          <path
            d="M11 5h2v13h-2zM5 7h4v2H5zm0 4h4v1H5zm0 3h4v1H5z"
            fill="#52c5d5"
          />
          <path d="M16 4h2v2h2v2h-2v7h-2V8h-2V6h2z" fill="#ffc43d" />
        </>
      ) : name === "flag" ? (
        <>
          <path d="M5 2h3v20H5z" fill="#543325" />
          <path d="M8 3h6v2h7v8h-6v-2H8z" fill="#fc6385" stroke="#7e304f" />
          <path d="M9 4h4v2H9z" fill="#ffd8e3" />
          <path d="M3 21h7v2H3z" fill="#a56a34" />
        </>
      ) : (
        <>
          <path
            d="M10 2h4v5h2v2h6v4h-3v6h-5v-2h-4v2H5v-6H2V9h6V7h2z"
            fill="#ffd047"
            stroke="#74491d"
          />
          <path d="M10 5h2v4H8v2H5v-1h5z" fill="#fff4b0" />
        </>
      )}
    </svg>
  );
}

export function formatDuration(seconds?: number) {
  if (seconds === undefined) return "—";
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)} phút ${String(value % 60).padStart(2, "0")} giây`;
}

export function StudyFilters({
  grade,
  section,
  category,
  onGrade,
  onProgram,
  onSubject,
  onCategory,
}: {
  grade: number;
  section: Section;
  category: Category;
  onGrade: (grade: number) => void;
  onProgram: (program: "timo" | "asmo" | "school") => void;
  onSubject: (subject: Section) => void;
  onCategory: (category: Category) => void;
}) {
  const isExam = section === "timo" || section === "asmo";
  return (
    <div className="study-filters" aria-label="Bộ lọc bài tập">
      <div className="filter-field">
        <label htmlFor="study-grade">Chọn lớp</label>
        <div className="filter-select">
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
      <div className="filter-field">
        <label htmlFor="study-category">Chọn nội dung luyện tập</label>
        <div className="filter-select">
          <select
            id="study-category"
            value={category}
            onChange={(e) => onCategory(e.target.value as Category)}
          >
            <option value="all">Tất cả đề</option>
            {isExam ? (
              <>
                <option value="qualifier">Đề vòng loại</option>
                <option value="national">Đề Quốc gia</option>
              </>
            ) : null}
            <option value="topic">Luyện theo chủ đề</option>
          </select>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
}

const COLORS = [
  "#ffae21",
  "#28a9ef",
  "#f84e7b",
  "#30bf66",
  "#a143ec",
  "#10b4b8",
  "#ffc62e",
];
export function ExerciseCard({
  exercise,
  index,
  result,
  hasDraft,
  onOpen,
  onView,
}: {
  exercise: Exercise;
  index: number;
  result?: Result;
  hasDraft: boolean;
  onOpen: () => void;
  onView: () => void;
}) {
  const { theme } = useLearningTheme();
  const artIndex = index % 16;
  const number =
    exercise.category === "topic"
      ? index + 1
      : Number(exercise.id.match(/-(\d+)$/)?.[1] ?? index + 1);
  return (
    <article className={`exercise-card ${result ? "is-complete" : ""}`}>
      <div className="exercise-top">
        <span
          className="number-badge"
          style={{ color: COLORS[(number - 1) % COLORS.length] }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 44" shapeRendering="crispEdges">
            <path
              d="M10 2h20v3h5v5h3v24h-3v5h-5v3H10v-3H5v-5H2V10h3V5h5z"
              fill="#10234b"
            />
            <path
              d="M11 5h18v3h5v4h1v20h-3v5h-5v2H11v-3H7v-5H5V12h3V8h3z"
              fill="currentColor"
            />
            <path d="M11 7h15v2H12v4H9v9H7V12h3V9h1z" fill="#ffffff88" />
          </svg>
          <span>
            {theme === "pixel" ? number : String(number).padStart(2, "0")}
          </span>
        </span>
        <div className="exercise-name">
          <h2>{exercise.title}</h2>
          <span
            className={`status ${result ? "done" : hasDraft ? "in-progress" : ""}`}
          >
            {exercise.exampleOnly ? (
              <BookOpen size={13} />
            ) : result ? (
              <Check size={13} />
            ) : (
              <Clock3 size={13} />
            )}
            {exercise.exampleOnly
              ? "Có bài ví dụ"
              : result
                ? "Đã làm"
                : hasDraft
                  ? "Đang làm"
                  : "Chưa làm"}
          </span>
        </div>
        <span className="card-charm">
          <PixelIcon
            name={(["star", "book", "flag"] as const)[index % 3]}
            size={22}
          />
        </span>
      </div>
      {exercise.exampleOnly ? (
        <p className="exercise-stats">
          TIMO · Lớp 2<br />
          Chưa có câu luyện tập
        </p>
      ) : (
        <dl className="exercise-stats">
          <div>
            <dt>Kết quả:</dt>
            <dd>{result ? "Đã lưu" : "—"}</dd>
          </div>
          <div>
            <dt>Thời gian:</dt>
            <dd>{formatDuration(result?.elapsedSeconds)}</dd>
          </div>
        </dl>
      )}
      {theme !== "pixel" && (
        <span
          className="exercise-card-art"
          aria-hidden="true"
          style={{
            backgroundPosition: `${((artIndex % 4) * 100) / 3}% ${(Math.floor(artIndex / 4) * 100) / 3}%`,
          }}
        />
      )}
      <div className="card-actions">
        {result ? (
          <>
            <button className="view-result-button" onClick={onView}>
              Xem kết quả
            </button>
            <button className="retry-button" onClick={onOpen}>
              {hasDraft ? "Tiếp tục" : "Làm lại"}
            </button>
          </>
        ) : (
          <button className="start-button" onClick={onOpen}>
            {exercise.exampleOnly
              ? "Xem ví dụ"
              : hasDraft
                ? "Tiếp tục"
                : "Làm bài"}
          </button>
        )}
      </div>
    </article>
  );
}
