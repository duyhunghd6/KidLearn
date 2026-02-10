# 📘 TUTORIAL — Hướng dẫn Prompt để xây dựng KidLearn với Antigravity

> **Mục đích:** Tài liệu này ghi lại **tuần tự các prompt thực tế** đã dùng để xây dựng KidLearn từ đầu đến khi deploy, kèm giải thích **vì sao nên viết prompt như vậy**.
>
> **Tổng quan:** 3 phiên chat → 1 ứng dụng hoàn chỉnh + unit tests + deploy lên Vercel.

---

## Phiên 1: Thiết lập dự án & xây dựng MVP

> **Conversation:** "Creating KidLearn App"

Link Gemini cho phần lên ý tưởng: https://gemini.google.com/share/bdad1c968b78

### Prompt 1.1 — Thiết lập quy tắc làm việc cho Agent

```
Hãy đọc file @TAILIEUYEUCAU.md, từ đó cập nhật thật ngắn gọn Tech stack,
project dir, các thông tin triển khai thật ngắn gọn vào trong file NEWBIE.md.

Ngoài ra, yêu cầu IDE trước khi triển khai, hãy kiểm tra file STATUS.md
trong thư mục ./docs; Và khi triển khai xong hãy cập nhật STATUS.md để
update trạng thái của dự án - những task đã hoàn thành và task nào chưa
hoàn thành;

Tiếp theo: Với mỗi lần chạy, hãy cập nhật CHANGELOG.md để về sau dễ
dàng truy vết;

Tiếp theo: Hãy luôn yêu cầu Agents IDE test kỹ càng trước khi trả về
kết quả cho tôi;

Tiếp theo: Hãy lựa chọn 1 port mặc định để chạy local test, và nếu
port đó đã bị chiếm thì cứ mạnh tay mà kill đi

==> Hãy viết ngắn gọn súc tích vào file NEWBIE.md
```

**💡 Vì sao nên viết như vậy:**

- **Đọc tài liệu đầu vào trước** (`@TAILIEUYEUCAU.md`) — Agent có context thực tế, không tự "tưởng tượng".
- **Thiết lập "luật chơi" ngay từ đầu** — Đây là prompt quan trọng nhất. Bạn đang dạy Agent cách làm việc: kiểm tra STATUS trước khi code, cập nhật CHANGELOG sau mỗi lần chạy, test kỹ trước khi trả kết quả. Những quy tắc này áp dụng cho MỌI phiên sau.
- **Ghi vào NEWBIE.md** — File này là "luật" mà Agent đọc ở MỌI phiên chat mới. Viết 1 lần, Agent nhớ mãi.
- **Port management** — Chi tiết nhỏ nhưng thiết thực. Dev thường bị conflict port, yêu cầu Agent tự kill giúp tiết kiệm thời gian.

---

### Prompt 1.2 — Hỏi ngược lại Agent

```
Câu hỏi: Tại sao lại dùng cái này? Web Speech API
```

**💡 Vì sao nên viết như vậy:**

- **Hỏi ngược Agent để hiểu quyết định** — Khi Agent đề xuất một technology, bạn có quyền hỏi "tại sao?". Điều này giúp bạn hiểu trade-off và quyết định có giữ hay bỏ.
- **Prompt ngắn, đi thẳng vấn đề** — Không cần lịch sự dài dòng, chỉ cần hỏi rõ ràng.
- **Đây là bước quan trọng trong Vibe Coding** — Bạn không cần biết code, nhưng cần hiểu WHY để ra quyết định đúng.

---

### Prompt 1.3 — Ra quyết định cắt scope

```
Để Web Speech API sang features sau nhé, features MVP đầu tiên
==> Hãy chỉ để flashcard và chọn từ thôi nhé.
```

**💡 Vì sao nên viết như vậy:**

- **Cắt scope dứt khoát** — MVP là "Minimum Viable Product". Sau khi hỏi và hiểu Web Speech API, bạn quyết định chưa cần nó ở bản đầu. Đây là kỹ năng Product Owner.
- **Chỉ rõ MVP gồm gì** — "chỉ để flashcard và chọn từ" — Agent biết chính xác phạm vi, không làm thừa.
- **"Sang features sau"** — Không phải bỏ hẳn, mà là defer. Agent sẽ ghi nhớ cho roadmap.

---

### Prompt 1.4 — Sửa nhỏ, chỉ đạo nhanh

```
Dịch NEWBIE.md đừng để tiếng Việt nhé!
```

**💡 Vì sao nên viết như vậy:**

- **Feedback nhanh, không giải thích dài** — Agent viết NEWBIE.md bằng tiếng Việt, bạn muốn tiếng Anh (vì NEWBIE.md là file cho Agent/dev quốc tế đọc). Chỉ cần 1 câu.
- **Bài học:** Khi Agent làm gần đúng nhưng sai 1 chi tiết, chỉ cần feedback ngắn gọn chính xác vào điểm sai.

---

## Phiên 2: Triển khai đầy đủ + Deploy + Unit Tests

> **Conversation:** "Deploy KidLearn App To Vercel" (thực tế bao gồm cả code, deploy, và tests)

### Prompt 2.1 — Triển khai theo PRD

```
Triển khai dự án @PRD.md
```

**💡 Vì sao nên viết như vậy:**

- **Cực kỳ ngắn gọn — chỉ 4 từ** — Vì toàn bộ yêu cầu đã nằm trong file `PRD.md` (265 dòng, bao gồm tech stack, features, UX, acceptance criteria). Không cần lặp lại.
- **Dùng `@` để reference file** — Agent sẽ đọc toàn bộ PRD trước khi bắt đầu, đảm bảo hiểu đúng scope.
- **Bài học quan trọng nhất:** Nếu bạn đã đầu tư viết PRD tốt (ở phiên 1 hoặc bằng Gemini), thì prompt triển khai chỉ cần 1 câu. PRD chính là prompt chi tiết nhất.

---

### Prompt 2.2 — Nhắc Agent điều hiển nhiên

```
Bạn hiền ơi, chưa commit lên github thì deploy vercel bằng mắt à
```

**💡 Vì sao nên viết như vậy:**

- **Agent đôi khi bỏ qua bước** — Agent muốn deploy thẳng lên Vercel mà quên commit code lên GitHub trước. Bạn cần "nhắc" lại flow đúng.
- **Giọng thân thiện nhưng rõ ràng** — "Bạn hiền ơi" giữ không khí thoải mái, nhưng message rất rõ: commit trước, deploy sau.
- **Bài học:** Đừng tin Agent 100%. Luôn review plan trước khi approve, đặc biệt với deploy/publish.

---

### Prompt 2.3 — Yêu cầu chất lượng + documentation

```
Trước khi đóng task này, hãy viết unit test kỹ càng cho tôi, test xong
report lại nhé.

Bạn hiền, hãy cập nhật ./docs đi.

Và lưu ý: Viết file ARCHITECTURE.md cho tôi trong thư mục docs;

Và viết thêm một dòng tiếng Anh vào file NEWBIE.md nói rằng mỗi khi
cần code mới một features, hãy nhớ mà đọc ARCHITECTURE.md cho đúng,
đừng có sửa cái gì quan trọng mà không đọc ARCHITECTURE.md, nếu thấy
file đó sai hoặc củ chuối ---> Hãy hỏi tôi trước khi muốn cập nhật
ARCHITECTURE.md bởi vì nếu cập nhật thì phải sửa rất nhiều file code
---> Tôi cần phải xem xét rất kỹ những việc này.

Cuối cùng, hãy bổ sung 1 dòng tiếng Anh cho NEWBIE.md, yêu cầu cần
phải run unit test và viết unit test mỗi khi hoàn tất một task mà có
thêm sửa xoá file code nào nhé.
```

**💡 Vì sao nên viết như vậy:**

- **"Trước khi đóng task"** — Câu mở đầu hay. Ngăn Agent vội vàng kết thúc mà chưa đảm bảo chất lượng.
- **Unit test + report** — Yêu cầu test VÀ báo cáo kết quả. Agent phải chứng minh code hoạt động.
- **ARCHITECTURE.md + quy tắc bảo vệ** — Đây là kỹ thuật "guard rail" cao cấp:
  - Tạo ARCHITECTURE.md → Agent hiểu cấu trúc tổng thể.
  - Viết rule vào NEWBIE.md: "Đọc ARCHITECTURE.md trước khi code" → Agent ở MỌI phiên sau đều tuân thủ.
  - "Hỏi tôi trước khi cập nhật" → Bạn giữ quyền kiểm soát kiến trúc. Agent không được tự ý thay đổi foundation.
- **Unit test rule vào NEWBIE.md** — Buộc Agent viết test cho mọi thay đổi code trong tương lai. Một lần viết rule, áp dụng vĩnh viễn.
- **Bài học:** NEWBIE.md là "bộ nhớ dài hạn" của Agent. Mỗi khi bạn phát hiện thói quen xấu, hãy viết rule vào đó.

---

### Prompt 2.4 — Commit chuyên nghiệp

```
Now you commit changes with professional commit message
```

**💡 Vì sao nên viết như vậy:**

- **"Professional commit message"** — Buộc Agent viết commit message chuẩn (conventional commits, mô tả rõ ràng), không phải kiểu "fix stuff" hay "update files".
- **Tiếng Anh** — Commit message nên bằng tiếng Anh cho repo open-source.
- **Ngắn gọn** — Agent đã biết cần commit gì (vừa code + test + docs xong), chỉ cần trigger.

---

## Phiên 3: Tạo Logo

> **Conversation:** "Creating KidLearn Logo"

### Prompt 3.1 — Tạo và thay thế logo

```
Hãy tạo mới một logo phù hợp với tên app và sửa cái logo đó cho tớ
nhé bạn hiền.
```

**💡 Vì sao nên viết như vậy:**

- **Mở phiên riêng cho task độc lập** — Logo không liên quan logic app, nên tách ra conversation riêng. Gọn gàng, dễ tìm lại.
- **"Phù hợp với tên app"** — Agent đã biết app tên KidLearn, dành cho trẻ em. Sẽ tự chọn style phù hợp (sách, gam màu tươi sáng).
- **"Sửa cái logo đó"** — Không chỉ tạo file logo mới, mà còn **thay thế** logo cũ trong code. Agent phải tìm `Logo.tsx`, hiểu cách nó được import, rồi cập nhật.
- **Giọng tự nhiên** — "Bạn hiền", "cho tớ nhé" — Prompt không cần format cứng nhắc. Viết tự nhiên như nói chuyện với đồng nghiệp cũng OK, miễn ý rõ ràng.

---

## Tổng kết: Nguyên tắc viết Prompt hiệu quả

| #   | Nguyên tắc                                  | Ví dụ trong KidLearn                                                   |
| --- | ------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | **Viết PRD/tài liệu trước, code sau**       | Phiên 1: setup NEWBIE.md rules → Phiên 2: `Triển khai dự án @PRD.md`   |
| 2   | **Dùng `@` để reference file**              | `@TAILIEUYEUCAU.md`, `@PRD.md` — Agent đọc file thay vì bạn copy-paste |
| 3   | **Thiết lập "luật chơi" vào NEWBIE.md**     | STATUS, CHANGELOG, test, port, ARCHITECTURE — Agent nhớ mãi            |
| 4   | **Hỏi ngược Agent**                         | "Tại sao dùng Web Speech API?" — Hiểu rồi mới quyết định giữ/bỏ        |
| 5   | **Cắt scope dứt khoát**                     | "MVP chỉ flashcard + chọn từ" — Không làm thừa                         |
| 6   | **Review plan trước khi approve**           | Agent propose deploy → bạn nhắc: "chưa commit thì deploy bằng mắt à"   |
| 7   | **Yêu cầu test + docs TRƯỚC KHI đóng task** | "Viết unit test kỹ càng, test xong report lại nhé"                     |
| 8   | **Bảo vệ kiến trúc**                        | "Hỏi tôi trước khi cập nhật ARCHITECTURE.md" → Guard rail              |
| 9   | **Feedback ngắn gọn**                       | "Dịch NEWBIE.md đừng để tiếng Việt nhé!" — 1 câu, đúng điểm            |
| 10  | **Mở phiên riêng cho task khác domain**     | Logo = phiên riêng, không trộn với logic app                           |

---

## Kết quả cuối cùng

Sau 3 phiên chat:

- ✅ **Ứng dụng hoàn chỉnh** — React + Vite + TypeScript
- ✅ **100 từ vựng** — 7 chủ đề, JSON data
- ✅ **2 chế độ** — Flashcard (Học) + Quiz "Where is…?" (Chơi)
- ✅ **66 unit tests** — 8 test suites, coverage toàn diện
- ✅ **Documentation** — PRD, ARCHITECTURE, STATUS, CHANGELOG, NEWBIE
- ✅ **Deploy** — [kidlearn-eosin.vercel.app](https://kidlearn-eosin.vercel.app)
- ✅ **Logo** — Custom SVG logo
- ✅ **Link Github** — https://github.com/duyhunghd6/KidLearn

> 💬 **Bí quyết:** Prompt tốt không cần dài. Nó cần **rõ ràng**, **có context**, và **có deliverables cụ thể**. Viết 1 lần PRD tốt = tiết kiệm 10 lần prompt sau.
