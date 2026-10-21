# Exercise content policy

- Only add real exercises supplied by the repository owner. Never generate demo exams, questions, choices, worked examples, answer keys, explanations, or fake results.
- Record correct answers and explanations ONLY when explicitly supplied by the owner. Never infer, solve, fill in, or invent missing answers, even when a question seems easy. Missing answer keys must remain absent and cannot be scored.
- Preserve independent app access and parent passwords. Answer keys, explanations and scores remain parent-password protected. Do not render them in the work page.
- The owner removed the five previous topic definitions and all their examples (Age problem, Date Problem, Problem type 1/2, Number sequence with pattern, Figure sequence with pattern). Do not restore these topics or examples. The real exam and its supplied answer key must remain.
- TIMO Grade 2 qualifier paper 1 has 25 questions and the owner supplied its complete answer key and illustrated explanations. Source transcription is in src/content/timo-grade2-qualifier1.ts. Do not correct or expand the owner's mathematics by independently solving it.
- TIMO Grade 2 qualifier paper 2 also has 25 questions and the owner supplied all answer keys and illustrated explanations. Source: src/content/timo-grade2-qualifier2.ts. The owner clarified that question 11’s Vietnamese wording asks for odd two-digit numbers (số lẻ). Preserve that condition and the supplied answer A (3); there is no discrepancy with the supplied solution.
- The owner supplied replacement "Chủ đề 1": numeric sequences, with qualifier paper 1 question 1 and its supplied solution as the example. Questions 1 and 12 from both papers belong to topic-01 (4 questions); the other 46 remain unassigned. When new topics/examples are supplied, update the app immediately, classify matching questions against the supplied examples, and keep unmatched/uncertain questions in "Chưa có chủ đề". Never invent new topic names.
- Topic card numbers must automatically follow catalog order 1, 2, 3, ... independently of numeric words in topic names or IDs. Preserve topic numbers when filtering by search.
- When a question or supplied solution contains diagrams, reproduce arrangement, objects, labels, colors and mathematical meaning as closely as possible. Keep diagram annotations taken from the owner's source; never add inferred results to a question illustration.
- Show questions and their supplied solutions side by side during parent review on desktop, and stack them on narrow screens. Fit teaching examples on one screen where practical without discarding source content.
- App login has opt-in "Ghi nhớ đăng nhập" that saves a verified password encrypted in IndexedDB using a non-extractable browser key, and only prefills the masked login field. It must NEVER auto-login from remembered credentials. After logout or returning without an active session, keep the saved password prefilled and require an explicit click on Đăng nhập. Logout clears the active session but preserves the remembered password, results, theme and parent credentials. Unchecking forgets the saved password and cancels pending saves. Never persist empty, incorrect or plaintext passwords. Access configuration changes invalidate remembered credentials. Parent result/solution review still requires its independent password.

- On the existing topic practice screen, place the supplied example in a collapsible Bài mẫu panel directly below Chọn chủ đề and above the practice toolbar. Preserve the catalog and the existing workspace filters/layout. Do not move topic practice to the catalog page.

- The owner explicitly allows viewing Bài mẫu and its supplied solution without a parent password. This exception applies only to topic teaching examples; practice/exam results, answer keys and worked solutions remain parent-password protected.

- Opening a topic with Làm bài/Làm lại starts the timer immediately and shows Nộp bài. Xem ví dụ is preview-only and does not start a new timer. Preserve any existing draft/deadline when resuming; hide redundant start controls while practicing.

- Paper question lists show questions, translations, illustrations and choices without source-strand headings (Logical thinking, Number Theory, etc.) or per-question source captions. Keep the source metadata in content for classification and traceability.

- Unify only question typography: Arial at 18px and line-height 1.5 for question text, translations, number sequences and choices. Preserve the existing colors, backgrounds, margins and layout; the owner explicitly canceled A4/paper restyling. Preserve mathematical content and diagram labels.

- Nộp bài submits directly without a confirmation step; freeze and save elapsed time on submission and show it with the parent-protected result. Preserve the parent result/answer gate.

- After Nộp bài, show the score inline in the existing paper toolbar immediately after Đã trả lời, retain the question paper and frozen elapsed time, and lock answer inputs. The owner explicitly allows this score summary without a parent password. Detailed answer keys/worked solutions still require the parent password, entered in a floating password dialog only when requested. Do not open a separate results popup.

- Keep a visible Làm lại button immediately after Nộp bài in the paper toolbar. It starts a fresh attempt by clearing selections and resetting the timer, while preserving previously saved results until the next submission.

- Xem đáp án & lời giải opens a floating modal for the parent password. Cancel/close returns to the same paper with the inline score; only successful authentication reveals detailed solutions.

- Exercise cards show Kết quả as correct/total câu đúng from the saved result (not Đã lưu), alongside saved elapsed time. This score summary is visible without a parent password; detailed solutions remain protected.

- Available interface themes are Thế giới Pixel, Thỏ con, Đảo pha lê (crystal), and Thành phố trên mây (cloud). The owner removed Công viên khủng long, Đảo khủng long 3D, Nhà khám phá khủng long, Robot and Vũ trụ. Saved selections of removed themes fall back to Pixel; do not restore those options.

- Đảo pha lê follows the owner’s crystal-island reference using generated crystal-world/hero/sprites/book assets. Preserve the removed catalog heading/count row and real-content-only policy: reference demo cards/scores are decorative examples and must not be imported as exercises/results.

- Thành phố trên mây follows the owner’s warm pink/gold cloud-city reference with cloud-world/hero/sprites/book artwork, gold coin badges, warm borders and blue actions. Retain only real exercises and the owner-requested hidden catalog heading/count row.
