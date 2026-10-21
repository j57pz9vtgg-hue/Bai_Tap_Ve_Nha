# Exercise content policy

- Only add real exercises supplied by the repository owner. Never generate demo exams, questions, choices, worked examples, answer keys, explanations, or fake results.
- Record correct answers and explanations ONLY when explicitly supplied by the owner. Never infer, solve, fill in, or invent missing answers, even when a question seems easy. Missing answer keys must remain absent and cannot be scored.
- Preserve independent app access and parent passwords. Answer keys, explanations and scores remain parent-password protected. Do not render them in the work page.
- The owner removed the five previous topic definitions and all their examples (Age problem, Date Problem, Problem type 1/2, Number sequence with pattern, Figure sequence with pattern). Do not restore these topics or examples. The real exam and its supplied answer key must remain.
- TIMO Grade 2 qualifier paper 1 has 25 questions and the owner supplied its complete answer key and illustrated explanations. Source transcription is in src/content/timo-grade2-qualifier1.ts. Do not correct or expand the owner's mathematics by independently solving it.
- TIMO Grade 2 qualifier paper 2 also has 25 questions and the owner supplied all answer keys and illustrated explanations. Source: src/content/timo-grade2-qualifier2.ts. The owner clarified that question 11’s Vietnamese wording asks for odd two-digit numbers (số lẻ). Preserve that condition and the supplied answer A (3); there is no discrepancy with the supplied solution.
- The owner supplied numeric sequences as topic-01, using paper1 q1 and q12 as two public teaching examples. Keep its stable ID. Match supplied questions to the authorized topic definitions below; retain unknown or uncertain questions as unassigned and never fabricate missing topics or content. The owner explicitly authorized naming topics from paired supplied question/solution examples.
- Topic card numbers must automatically follow catalog order 1, 2, 3, ... independently of numeric words in topic names or IDs. Preserve topic numbers when filtering by search.
- When a question or supplied solution contains diagrams, reproduce arrangement, objects, labels, colors and mathematical meaning as closely as possible. Keep diagram annotations taken from the owner's source; never add inferred results to a question illustration.
- Show questions and their supplied solutions side by side during parent review on desktop, and stack them on narrow screens. Fit teaching examples on one screen where practical without discarding source content.
- App login has opt-in "Ghi nhớ đăng nhập" that saves a verified password encrypted in IndexedDB using a non-extractable browser key, and only prefills the masked login field. It must NEVER auto-login from remembered credentials. After logout or returning without an active session, keep the saved password prefilled and require an explicit click on Đăng nhập. Logout clears the active session but preserves the remembered password, results, theme and parent credentials. Unchecking forgets the saved password and cancels pending saves. Never persist empty, incorrect or plaintext passwords. Access configuration changes invalidate remembered credentials. Parent result/solution review still requires its independent password.

- On the existing topic practice screen, place the supplied example in a collapsible Bài mẫu panel directly below Chọn chủ đề and above the practice toolbar. Preserve the catalog and the existing workspace filters/layout. Do not move topic practice to the catalog page.

- The owner explicitly allows viewing Bài mẫu and its supplied solution without a parent password. This exception applies only to topic teaching examples; practice/exam results, answer keys and worked solutions remain parent-password protected.

- Opening a topic with Làm bài/Làm lại starts the timer immediately and shows Nộp bài; replace the old Xem ví dụ catalog action with Làm bài (or Tiếp tục for an existing draft). The collapsible example remains available within the running practice screen and does not reset its timer. Preserve any existing draft/deadline when resuming; hide redundant start controls while practicing.

- Paper question lists show questions, translations, illustrations and choices without source-strand headings (Logical thinking, Number Theory, etc.) or per-question source captions. Keep the source metadata in content for classification and traceability.

- Unify only question typography: Arial at 18px and line-height 1.5 for question text, translations, number sequences and choices. Preserve the existing colors, backgrounds, margins and layout; the owner explicitly canceled A4/paper restyling. Preserve mathematical content and diagram labels.

- Nộp bài submits directly without a confirmation step; freeze and save elapsed time on submission and show it with the parent-protected result. Preserve the parent result/answer gate.

- After Nộp bài, show the score inline in the existing paper toolbar immediately after Đã trả lời, retain the question paper and frozen elapsed time, and lock answer inputs. The owner explicitly allows this score summary without a parent password. Detailed answer keys/worked solutions still require the parent password, entered in a floating password dialog only when requested. Do not open a separate results popup.

- Keep a visible Làm lại button immediately after Nộp bài in the paper toolbar. It starts a fresh attempt by clearing selections and resetting the timer, while preserving previously saved results until the next submission.

- Xem đáp án & lời giải opens a floating modal for the parent password. Cancel/close returns to the same paper with the inline score; only successful authentication reveals detailed solutions.

- Exercise cards show Kết quả as correct/total câu đúng from the saved result (not Đã lưu), alongside saved elapsed time. This score summary is visible without a parent password; detailed solutions remain protected.

- Available interface themes are Thế giới Pixel, Thỏ con, Đảo pha lê (crystal), Thành phố trên mây (cloud), Rừng đom đóm (forest), Nhà khám phá khủng long (museum), Phép thuật (magic), Kho báu (treasure), and Ô tô (cars). The owner removed Công viên khủng long, Đảo khủng long 3D, Robot and Vũ trụ. Saved selections of removed themes fall back to Pixel; do not restore those options.

- Đảo pha lê follows the owner’s crystal-island reference using generated crystal-world/hero/sprites/book assets. Preserve the removed catalog heading/count row and real-content-only policy: reference demo cards/scores are decorative examples and must not be imported as exercises/results.

- Thành phố trên mây follows the owner’s warm pink/gold cloud-city reference with cloud-world/hero/sprites/book artwork, gold coin badges, warm borders and blue actions. Retain only real exercises and the owner-requested hidden catalog heading/count row.

- Rừng đom đóm follows the owner’s forest reference with generated forest-world/hero/sprites/book and wooden sign assets, woodland mascots, green/ivory surfaces and amber actions. Keep real content only and retain the hidden redundant catalog row.

- The owner explicitly requested restoring the museum theme and adding magic, treasure and cars from supplied references. Use their generated artwork, preserve real data and hidden catalog headings, and keep the existing practice/authentication flows.

- TIMO Grade 2 qualifier paper 3 has 25 bilingual questions and the owner supplied its complete answer key and illustrated explanations. Source: src/content/timo-grade2-qualifier3.ts; diagrams: src/Paper3Illustration.tsx. Preserve the supplied key B,C,D,B,D,B,C,B,D,A,D,B,A,C,A,D,A,C,B,D,C,A,C,A,B and supplied reasoning without independently correcting the source.

- The owner removed decorative theme-name signs from every interface (for example CHỦ ĐỀ / RỪNG ĐOM ĐÓM). Keep the app brand and background art, but do not render theme-name badges on the catalog hero. Theme names remain in the appearance picker for choosing an interface.

- The owner authorized creating descriptive topic names from the newly supplied paired question/solution images for paper 1 questions 2–6. Reuse existing source objects as public teaching examples; do not duplicate exam questions. Keep topic-01 ID and rename its title Dãy số và quy luật. Add topic-02 Bài toán cộng có lời văn (q2), topic-03 Bài toán tính tuổi (q3), topic-04 Quy luật số lượng hình (q4), topic-05 Ngày và thứ trong tuần (q5), topic-06 Tính tổng bằng cách ghép số (q6). Merge matching questions from the three supplied papers into those same topics. Topic counts are 6,3,3,3,3,3; 54 other questions remain unassigned. Each new topic uses paper 1's corresponding supplied question and explanation as its collapsible password-free example. Detailed practice answers remain parent-password protected. Paper 3 question 2 additionally excludes Jennie herself when counting classmates; retain that distinction in its supplied solution within the word-problem topic.

- Continue the owner's paired-example workflow for paper 1 questions 7–12: add topic-07 Tìm số bị che trong phép tính (q7), topic-08 Tính biểu thức cộng, trừ (q8), topic-09 Tính ngược theo sơ đồ (q9), topic-10 Tìm chữ số trong phép cộng (q10), topic-11 Đếm số theo tổng chữ số (q11), using the corresponding question and supplied explanation as the public teaching example. Q12 stays in existing topic-01; never create a duplicate sequence topic. Merge matching questions from papers 2 and 3. Each new topic has 3 questions; 11 named topics total (36 questions) and 39 unassigned. Include supplied solution diagrams in teaching examples when available. Retain paper 2 q11's odd-number restriction.

- Q12 is also added as a second teaching example within topic-01, paired with its supplied explanation. Preserve the original q1 example; the examples share one collapsible panel and do not create a second sequence topic.

- After completing q7–12, the owner supplied paper 1 q13–17 with explanations and authorized the same topic workflow. Add topic-12 Đếm kết quả chẵn, lẻ (q13), topic-13 Điền dấu cộng, trừ (q14), topic-14 Cân bằng số lượng (q15), topic-15 Đếm hình vuông (q16), topic-16 Quy luật dãy hình (q17). Reuse paper1 teaching examples and merge the matching questions from papers2/3. Keep their supplied diagrams/solutions, default collapse and public example access. This stage has16 named topics/51 questions and24 unassigned.

- After q13–17 is completed, use the owner’s q18–20 question/solution pairs as examples for topic-17 Đếm hình vuông theo hướng nhìn (q18), topic-18 Đếm đoạn thẳng (q19), topic-19 Đếm khối lập phương (q20). Merge the corresponding questions from all3 papers; front/right directions remain as supplied. Include the source solution diagrams. This stage has19 named topics/60 questions and15 unassigned.

- After q18–20 is completed, use paper1 q21–25 and their supplied explanations as examples for topic-20 Sắp xếp số và tìm thứ hạng (q21), topic-21 Lập số chẵn không lặp chữ số (q22), topic-22 Lập hai số có tổng nhỏ nhất (q23), topic-23 Đếm số cách kết hợp (q24), topic-24 Mua hàng nhận quà tặng (q25). Merge matching supplied questions from the three papers. Food combinations and successive route choices both belong to topic23's combination-counting pattern.
- Current completed catalog:24 named topics,75 unique questions; topic01 has6 questions and two examples, all other topics have3 questions and one example. All75 supplied questions currently match a topic. Hide empty topic cards, including Chưa có chủ đề; retain that bucket for future unmatched or uncertain questions. Never force uncertain new content into an existing topic.

- After completing all requested topic batches, the owner requires initial topic-card action Làm bài, immediate timed practice and Nộp bài (no Bắt đầu step). After submission retain inline score/time plus Xem đáp án & lời giải and Làm lại. Example panels remain collapsed by default and public; detailed practice solutions require the parent password in a floating dialog. All75 current questions are classified into24 topics; future papers/questions need semantic review and must remain unassigned when uncertain, even if their question numbers match an existing paper.

- Paper4: the owner supplied questions1–23 only, with no answer key or explanations. Source src/content/timo-grade2-qualifier4.ts and diagrams src/Paper4Illustration.tsx. Do not invent q24–25 or keys. Paper4's order differs from papers1–3: keep its reviewed per-question topicId; never classify it with the old number-to-topic table. Q12 (largest odd two-digit number), q14 (count even numbers greater than20) and q21 (equal sharing) remain unassigned pending a suitable supplied example. All other supplied paper4 questions match existing topics. No new topics are created.

- Paper5: all25 supplied questions, no keys/explanations. src/content/timo-grade2-qualifier5.ts and src/Paper5Illustration.tsx. Reviewed topicId is stored per question because numbering differs. Q8,12,14,18,19,21,23,24 remain unassigned (no matching supplied topic example); do not invent new topics or solutions.

- Paper6: all25 supplied questions, no keys/explanations. src/content/timo-grade2-qualifier6.ts and src/Paper6Illustration.tsx. Use its reviewed per-question topicId. Q3,7,10,13,15,17,20,22,24,25 remain unassigned where existing examples do not match. Preserve the symbol cross groups, exact grid and viewing direction; do not infer any answers.
