# 📘 TUTORIAL — Hướng dẫn Prompt để xây dựng KidLearn với Antigravity

> **Mục đích:** Tài liệu này ghi lại **tuần tự các prompt** đã dùng để xây dựng KidLearn từ đầu đến khi deploy, kèm giải thích **vì sao nên viết prompt như vậy**.
>
> **Tổng quan:** 4 phiên chat → 1 ứng dụng hoàn chỉnh + unit tests + deploy lên Vercel.

---

## Phiên 1: Tạo ứng dụng KidLearn

> **Conversation:** "Creating KidLearn App"

Link Gemini cho phần lên ý tưởng: https://gemini.google.com/share/bdad1c968b78

### Prompt 1.1 — Tạo PRD trước khi code

```
Hãy đọc file docs/do-not-read-this-dir/TAILIEUYEUCAU.md, từ đó tạo file docs/PRD.md
bằng tiếng Việt, bao gồm: tổng quan sản phẩm, đối tượng người dùng, phạm vi MVP,
tính năng chi tiết (Flashcard + Quiz), yêu cầu kỹ thuật (React + Vite + TypeScript),
yêu cầu UX/UI, tiêu chí chấp nhận, và lộ trình phát triển.
```

**💡 Vì sao nên viết như vậy:**

- **Cung cấp tài liệu đầu vào** (`TAILIEUYEUCAU.md`) — Agent có context thực tế để làm việc, không phải tự "tưởng tượng" yêu cầu.
- **Chỉ rõ file đầu ra** (`docs/PRD.md`) — Agent biết chính xác nơi lưu file, đúng cấu trúc thư mục.
- **Liệt kê các mục cần có** — Giúp PRD đầy đủ theo chuẩn, tránh thiếu sót. Nếu chỉ nói "tạo PRD" thì kết quả sẽ quá chung chung.
- **Viết bằng tiếng Việt** — Phù hợp với nhóm dev Việt Nam, dễ đọc dễ review.
- **Tạo PRD trước khi code** — Đây là bước quan trọng nhất. PRD trở thành "hợp đồng" giữa bạn và Agent. Mọi phiên sau đều tham chiếu lại PRD.

---

### Prompt 1.2 — Code toàn bộ MVP theo PRD

```
Hãy đọc file docs/PRD.md và docs/do-not-read-this-dir/TAILIEUYEUCAU.md, sau đó
triển khai toàn bộ ứng dụng KidLearn MVP:
- Khởi tạo React + Vite + TypeScript
- Tạo vocabulary.json (100 từ, 7 chủ đề)
- Tạo các components: Card, FlashcardMode, QuizMode, CategorySelector
- Tạo App.tsx với navigation giữa các mode
- Thiết kế kid-friendly (Nunito font, warm colors, animation)
- Tích hợp Web Speech API cho phát âm
- Tích hợp canvas-confetti cho hiệu ứng
- Tạo docs: STATUS.md, CHANGELOG.md, NEWBIE.md
```

**💡 Vì sao nên viết như vậy:**

- **Tham chiếu PRD** (`docs/PRD.md`) — Agent sẽ đọc PRD để hiểu full context, không cần lặp lại yêu cầu chi tiết trong prompt.
- **Liệt kê checklist rõ ràng** — Mỗi bullet là 1 deliverable cụ thể. Agent sẽ tạo implementation plan dựa trên checklist này, đảm bảo không bỏ sót.
- **Gộp tất cả vào 1 prompt** — Thay vì chat từng bước (tạo project → tạo data → tạo component...), gộp lại giúp Agent lên kế hoạch tổng thể, quản lý dependency giữa các file.
- **Chỉ rõ tech decisions** — "Nunito font", "warm colors", "canvas-confetti" — Những quyết định thiết kế cụ thể giúp Agent không phải hỏi lại, tiết kiệm thời gian.
- **Yêu cầu docs cùng lúc** — Agent sẽ tạo documentation song song với code, đảm bảo docs luôn đồng bộ chứ không bị quên.

---

## Phiên 2: Deploy lên Vercel

> **Conversation:** "Deploy KidLearn App To Vercel"

### Prompt 2.1 — Deploy

```
Deploy ứng dụng KidLearn lên Vercel.
```

**💡 Vì sao nên viết như vậy:**

- **Ngắn gọn vì context đã đủ** — Antigravity có quyền truy cập Vercel MCP tool, và project đã build thành công ở phiên trước. Không cần hướng dẫn chi tiết.
- **Agent đã có sẵn codebase** — Antigravity biết cấu trúc project (React + Vite), tự xác định build command (`npm run build`) và output directory (`dist/`).
- **Vercel MCP tự xử lý** — Tool `deploy_to_vercel` làm hết: tạo project, upload code, build, deploy. Bạn chỉ cần trigger.
- **Bài học:** Khi Agent đã có đầy đủ context và tool, prompt càng ngắn càng tốt. Viết dài không giúp ích gì thêm, thậm chí có thể gây nhiễu.

---

## Phiên 3: Tạo Logo

> **Conversation:** "Creating KidLearn Logo"

### Prompt 3.1 — Tạo logo mới

```
Tạo logo mới cho KidLearn và thay thế logo hiện tại.
```

**💡 Vì sao nên viết như vậy:**

- **Mở phiên mới cho task riêng biệt** — Logo là feature độc lập, không liên quan đến logic app. Mở phiên riêng giúp conversation gọn gàng, dễ tìm lại sau.
- **Agent tự khám phá** — Antigravity sẽ tự tìm file `Logo.tsx` hiện tại, hiểu cách nó được import, rồi quyết định approach (generate image bằng AI → convert sang SVG inline component).
- **"Thay thế logo hiện tại"** — Câu này quan trọng. Nó buộc Agent phải tìm vị trí sử dụng logo cũ và cập nhật, thay vì chỉ tạo file mới rồi bỏ đó.
- **Không cần mô tả thiết kế** — Agent đã biết app dành cho trẻ em (từ PRD), sẽ tự chọn style phù hợp (sách, gam màu tươi sáng, kid-friendly).

---

## Phiên 4: Viết Unit Tests

> **Conversation:** "Writing KidLearn Unit Tests"

### Prompt 4.1 — Viết unit tests toàn diện

```
Hãy đọc docs/PRD.md và docs/ARCHITECTURE.md, rồi viết unit tests cho toàn bộ
ứng dụng KidLearn:
- Setup Vitest + React Testing Library + jsdom
- Mock Web Speech API và canvas-confetti
- Test tất cả components: Card, Logo, CategorySelector, FlashcardMode, QuizMode, App
- Test utils: speech.ts
- Test data integrity: vocabulary.json
- Cập nhật ARCHITECTURE.md và NEWBIE.md với thông tin testing
```

**💡 Vì sao nên viết như vậy:**

- **Tham chiếu docs** (`PRD.md` + `ARCHITECTURE.md`) — Agent hiểu cả business requirements LẪN technical architecture. Tests sẽ cover đúng behavior, không chỉ test bề mặt.
- **Chỉ rõ testing stack** — "Vitest + React Testing Library + jsdom" loại bỏ ambiguity. Không để Agent chọn Jest (nặng hơn, cần config thêm cho Vite).
- **Chỉ rõ cần mock gì** — Web Speech API và canvas-confetti phụ thuộc browser, phải mock trong test environment. Nếu không nói, Agent có thể quên và tests sẽ fail.
- **Liệt kê TẤT CẢ components** — Đảm bảo coverage toàn diện. Nếu chỉ nói "viết unit tests" thì Agent có thể bỏ qua Logo, speech utils, hoặc data integrity.
- **Yêu cầu cập nhật docs** — Tests mà không cập nhật docs thì developer mới vào sẽ không biết cách chạy tests. Luôn yêu cầu Agent giữ docs đồng bộ.

---

## Tổng kết: Nguyên tắc viết Prompt hiệu quả

| #   | Nguyên tắc                                         | Ví dụ                                                            |
| --- | -------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | **Tạo PRD trước, code sau**                        | Phiên 1 tạo PRD → làm "hợp đồng" cho toàn bộ dự án               |
| 2   | **Tham chiếu file có sẵn**                         | `Hãy đọc docs/PRD.md...` thay vì copy-paste nội dung             |
| 3   | **Liệt kê deliverables cụ thể**                    | Bullet list rõ ràng, mỗi item = 1 output                         |
| 4   | **Gộp task liên quan vào 1 prompt**                | Code + styling + docs trong 1 prompt, không chia nhỏ             |
| 5   | **Chỉ rõ tech decisions**                          | "Vitest", "Nunito font", "canvas-confetti" — không để Agent đoán |
| 6   | **Mở phiên riêng cho task độc lập**                | Logo, Deploy, Tests — mỗi cái 1 conversation                     |
| 7   | **Ngắn gọn khi context đã đủ**                     | Deploy chỉ cần 1 câu vì Agent đã có codebase + tools             |
| 8   | **Luôn yêu cầu cập nhật docs**                     | `Cập nhật ARCHITECTURE.md` — giữ docs đồng bộ với code           |
| 9   | **Mock khi dùng browser APIs**                     | Chỉ rõ "mock Web Speech API" để tests không fail                 |
| 10  | **Review implementation plan trước khi chấp nhận** | Agent luôn tạo plan → bạn review → approve → Agent mới code      |

---

## Kết quả cuối cùng

Sau 4 phiên chat:

- ✅ **Ứng dụng hoàn chỉnh** — React + Vite + TypeScript
- ✅ **100 từ vựng** — 7 chủ đề, JSON data
- ✅ **2 chế độ** — Flashcard (Học) + Quiz "Where is…?" (Chơi)
- ✅ **66 unit tests** — 8 test suites, coverage toàn diện
- ✅ **Documentation** — PRD, ARCHITECTURE, STATUS, CHANGELOG, NEWBIE
- ✅ **Deploy** — [kidlearn-eosin.vercel.app](https://kidlearn-eosin.vercel.app)
- ✅ **Logo** — Custom SVG logo
- ✅ **Link Github** — https://github.com/duyhunghd6/KidLearn

> 💬 **Bí quyết:** Prompt tốt không cần dài. Nó cần **rõ ràng**, **có context**, và **có deliverables cụ thể**.
