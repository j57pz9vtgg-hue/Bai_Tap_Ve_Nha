import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { getExercises, getQuestions } from "../src/data";
import { TOPIC_REVIEW } from "../src/content/topic-review";
import { QuestionIllustration } from "../src/QuestionIllustration";
import type { Question } from "../src/data";

globalThis.localStorage = { getItem: () => null, setItem: () => {} } as unknown as Storage;
globalThis.window = new EventTarget() as unknown as Window & typeof globalThis;
const papers = ["qualifier", "national"].flatMap((category) => getExercises("timo", category as "qualifier" | "national", 2));
function find(ref: { paper: string; number: number }) {
  const paper = papers.find((p) => p.id === ref.paper);
  const question = paper && getQuestions(2, "timo", paper).find((q) => q.sourceNumber === ref.number);
  if (!question) throw new Error(`Missing source: ${ref.paper} question ${ref.number}`);
  return question;
}
function code(ref: { paper: string; number: number }) {
  return `${ref.paper.startsWith("qualifier") ? "VL" : "QG"}${Number(ref.paper.split("-")[1])}-C${ref.number}`;
}
function QuestionContent({ q }: { q: Question }) {
  return <><p>{q.text}</p><p className="translation">{q.translation}</p>
    <QuestionIllustration diagram={q.diagram} />
    {q.options.length > 0 && <ul className="options">{q.options.map((option, index) => <li key={index}>{"ABCD"[index]}. {option}</li>)}</ul>}
    {!q.options.length && <p className="source">Câu tự điền đáp án.</p>}
  </>;
}
function QuestionCard({ q, label }: { q: Question; label: string }) {
  return <article id={label}><header><strong>Bài mẫu đã được chỉ định</strong></header>
    <p className="source">{q.sourcePaper} · Câu {q.sourceNumber}</p><QuestionContent q={q} /></article>;
}
const page = <html lang="vi"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Câu hỏi chờ duyệt cho hai chủ đề</title>
<style>{`*{box-sizing:border-box}body{margin:0;background:#f8f6ef;color:#173c32;font:16px/1.65 Arial,sans-serif}main{max-width:1020px;margin:0 auto;padding:32px 20px 60px}h1{font:700 34px/1.2 Georgia,serif}h2{font:700 27px/1.3 Georgia,serif;margin-top:48px}a{color:#07664a}nav{display:flex;gap:20px;flex-wrap:wrap}article{background:#fff;border:1px solid #dad8ca;border-radius:14px;padding:24px;margin:18px 0;break-inside:avoid;scroll-margin-top:20px}article header{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap}article header strong{color:#07553d;font-size:20px}article header span{font-size:13px;background:#fff0c7;padding:4px 10px;border-radius:20px}.source{font-size:13px;color:#637969}.translation{color:#506c61}.options{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;list-style:none;padding:0}.question-illustration{text-align:center;margin:20px auto;max-width:100%;overflow:auto}.question-illustration>svg{display:block;max-width:100%;max-height:230px;margin:auto;width:640px;height:auto}.sequence-diagram{display:flex;justify-content:center}.sequence-diagram>div{display:flex;align-items:center}.sequence-arrow{display:none}.sequence-diagram>div>span:first-child{display:inline-block;padding:7px}.sequence-diagram>div:not(:last-child)>span:first-child:after{content:','}.sequence-diagram small{display:none}.intro{padding:16px 20px;background:#eaf2e8;border-left:4px solid #147151}table{width:100%;border-collapse:collapse;table-layout:fixed;background:white;margin:24px 0}th,td{border:1px solid #d8d8ca;padding:18px;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{background:#e7eee3;color:#154b34}th:first-child{width:26%}td:first-child{font-size:14px}td>p:first-child{margin-top:0}tr{scroll-margin-top:20px;break-inside:avoid}summary{cursor:pointer;font-weight:bold}details{margin:18px 0}li a{font-weight:600}@media(max-width:600px){main{padding:20px 14px}h1{font-size:28px}h2{font-size:24px}article{padding:18px}th,td{padding:10px}th:first-child{width:29%}td:first-child{font-size:12px}.options{grid-template-columns:repeat(2,minmax(0,1fr))}}@media print{body{background:white}nav{display:none}main{padding:0}article{border-color:#bbb}details{display:none}}`}</style></head><body><main>
<a href="../index.html">← Về ứng dụng</a><h1>Câu hỏi chờ duyệt cho hai chủ đề</h1>
<p className="intro">Chỉ hai bài mẫu đã được gắn. Toàn bộ 21 câu đề xuất dưới đây vẫn ở “Chưa có chủ đề”. Bạn gửi lại mã câu đồng ý trong cuộc trò chuyện; danh sách này không tự thay đổi chủ đề.</p>
<nav>{TOPIC_REVIEW.map((topic) => <a key={topic.id} href={`#${topic.id}`}>{topic.title}</a>)}</nav>
{TOPIC_REVIEW.map((topic) => <section id={topic.id} key={topic.id}><h2>{topic.title}</h2><p>{topic.note}</p>
<QuestionCard q={find(topic.sample)} label={`Mẫu-${code(topic.sample)}`} />
<details open><summary>Danh sách {topic.candidates.length} câu để bạn xem xét</summary><ul>{topic.candidates.map((ref) => <li key={code(ref)}><a href={`#${code(ref)}`}>{code(ref)}</a> — {find(ref).sourcePaper}, câu {ref.number}</li>)}</ul></details>
<table><thead><tr><th>Vị trí câu hỏi</th><th>Chi tiết câu hỏi</th></tr></thead><tbody>{topic.candidates.map((ref) => <tr id={code(ref)} key={code(ref)}><td><strong>{code(ref)}</strong><p>{find(ref).sourcePaper}<br/>Câu {ref.number}</p><span className="source">Chờ bạn duyệt</span></td><td><QuestionContent q={find(ref)} /></td></tr>)}</tbody></table>
</section>)}<p>Không hiển thị đáp án hay lời giải trong danh sách duyệt. Câu hỏi và hình minh họa lấy nguyên từ bộ đề đã cung cấp.</p>
</main></body></html>;
writeFileSync("public/review/topic-questions.html", "<!doctype html>" + renderToStaticMarkup(page));
console.log("Built source-only review: 2 approved examples, 17 sequence candidates and 4 related object candidates. No assignments changed.");
