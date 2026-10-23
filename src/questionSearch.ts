import type { Question } from "./data";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase();

/** Search source content only; never index answer keys or worked solutions. */
export function matchesQuestionSearch(question: Question, query: string): boolean {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const content = normalize([question.text, question.translation, ...question.options, question.sourcePaper, question.sourceNumber].join(" "));
  return terms.every((term) => content.includes(term));
}
