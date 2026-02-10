## 1. Danh sách 100 từ vựng (Dạng JSON)

Để dễ dàng cho việc Open-source, mình gom 100 từ vào 1 file `data.json`. Người dùng khác chỉ cần sửa file này là app tự đổi nội dung.

- **Chủ đề:** Động vật (20), Trái cây (20), Màu sắc (10), Hình khối (10), Phương tiện (10), Cơ thể (10), Đồ vật trong nhà (20).
- **Hình ảnh:** Sử dụng URL từ Unsplash (ảnh thật) hoặc Lucid Icons (biểu tượng). Với bé 3 tuổi, mình đề xuất dùng **Emoji lớn** hoặc **Icon màu** để app nhẹ và load nhanh.

---

## 2. Cấu trúc thư mục (Folder Structure)

Dự án React + Vite của bạn sẽ trông như thế này:

```text
kid-learn-app/
├── src/
│   ├── data/
│   │   └── vocabulary.json   <-- Nơi chứa 100 từ
│   ├── components/
│   │   ├── Card.tsx          <-- Hiển thị hình ảnh/từ
│   │   ├── FlashcardMode.tsx <-- Logic lật thẻ
│   │   └── QuizMode.tsx      <-- Logic game tìm hình
│   ├── App.tsx               <-- Điều hướng chính
│   └── main.tsx
├── public/                   <-- Chứa âm thanh ting ting, pháo hoa
└── package.json

```

---

## 3. Logic vận hành (The Mechanics)

### Chế độ Flashcard (Học):

- **Giao diện:** Một slide lớn giữa màn hình.
- **Tương tác:** Bé bấm vào hình -> Hình rung rinh (Animation) -> Máy đọc to từ đó (Sử dụng `Web Speech API` - không cần file mp3, trình duyệt tự nói tiếng Anh cực chuẩn).

### Chế độ Game "Where is...?" (Chơi):

- **Câu hỏi:** App phát âm thanh: _"Where is the Elephant?"_
- **Lựa chọn:** Hiển thị 3 hình ảnh ngẫu nhiên (1 đúng, 2 sai).
- **Phần thưởng:** \* **Đúng:** Hiệu ứng `canvas-confetti` (pháo hoa giấy) bắn tung tóe + Âm thanh "Yeah!".
- **Sai:** Hình ảnh bị rung nhẹ (shake) và mờ đi, cho bé chọn lại đến khi đúng.

---

## 4. Bắt đầu Code (Mẫu cơ bản)

### Bước 1: Khởi tạo dự án

Mở terminal và chạy:

```bash
npm create vite@latest kid-learn-app -- --template react-ts
cd kid-learn-app
npm install
npm install lucide-react canvas-confetti framer-motion # Thư viện icon & hiệu ứng

```

### Bước 2: Code hàm đọc tiếng Anh (Web Speech API)

Bạn không cần lo về file âm thanh, chỉ cần dùng đoạn code này:

```typescript
const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9; // Đọc chậm một chút cho bé dễ nghe
  window.speechSynthesis.speak(utterance);
};
```

---

## 5. Hướng dẫn Publish lên Vercel (Cực dễ)

Bạn chưa quen CI/CD? Đừng lo, Vercel làm hết cho bạn:

1. **Lên GitHub:**

- Tạo một Repository mới trên GitHub (ví dụ: `english-for-kid`).
- Đẩy code của bạn lên đó:

```bash
git add .
git commit -m "First version for my kid"
git push origin main

```

2. **Lên Vercel:**

- Truy cập [Vercel.com](https://vercel.com/) và đăng nhập bằng tài khoản GitHub.
- Nhấn **"Add New"** -> **"Project"**.
- Chọn Repository `english-for-kid` bạn vừa tạo.
- Nhấn **"Deploy"**.
- **Xong!** Vercel sẽ đưa cho bạn một đường link (ví dụ: `kid-learn.vercel.app`). Bất cứ khi nào bạn sửa code và `git push`, trang web sẽ **tự động cập nhật**.
