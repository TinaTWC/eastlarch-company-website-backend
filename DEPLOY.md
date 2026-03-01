# 部署與前端串接說明

## 後端 API

### 啟動後端（本地開發）

```bash
# 在專案根目錄
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API 文件：http://localhost:8000/docs

### API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | /api/products | 取得產品列表（3 筆假資料） |
| GET | /api/products/{id} | 取得單一產品詳情 |
| POST | /api/contact | 提交聯絡表單（會寄信給收件人與主管） |
| POST | /api/quote | 提交產品詢價單（會寄至 ctwtingwei@gmail.com） |

### 聯絡表單 Request Body

```json
{
  "name": "王小明",
  "email": "wang@example.com",
  "message": "需求描述...",
  "company": "範例公司",
  "phone": "0912-345-678"
}
```

`company`、`phone` 為選填。

### 詢價單 Request Body

```json
{
  "products": ["電動排水器", "無動力排水器"],
  "name": "王小明",
  "email": "wang@example.com",
  "company": "範例公司",
  "phone": "02-2345-6789",
  "region": "taipei"
}
```

`company`、`phone`、`region`、`products` 為選填，`name` 和 `email` 為必填。

### 詢價單郵件設定（Resend API）

因 Railway 等雲端平台會封鎖 SMTP，改使用 **Resend**（走 HTTPS，不受限）。免費方案每月 3,000 封。

**設定步驟：**

1. 前往 [Resend](https://resend.com) 註冊（建議用收信信箱 ctwtingwei@gmail.com）
2. 到 [API Keys](https://resend.com/api-keys) 建立金鑰
3. 設定環境變數：

| 變數 | 必填 | 說明 |
|------|------|------|
| RESEND_API_KEY | ✓ | Resend API 金鑰（re_ 開頭） |
| QUOTE_RECIPIENT_EMAIL | | 收件人（預設 ctwtingwei@gmail.com） |
| MANAGER_EMAIL | | 主管信箱（CC 副本） |
| RESEND_FROM | | 寄件人顯示（預設 `Eastlarch 系統通知 <noreply@eastlarch.com>`） |

- **本地開發**：複製 `.env.example` 為 `.env` 並填入 `RESEND_API_KEY`。
- **Railway**：在後端服務 → **Variables** 新增 `RESEND_API_KEY`（與 `QUOTE_RECIPIENT_EMAIL` 若需自訂）。

> 須在 [Resend Domains](https://resend.com/domains) 驗證 eastlarch.com 網域後，此寄件人才能正常發信。

---

## 前端串接

### API 基礎網址

- **開發**：`http://localhost:8000`（預設）
- **生產**：在部署前端時設定環境變數 `VITE_API_URL`，例如 `https://你的後端.railway.app`

### 使用方式

**Products.jsx** 已使用 `fetchProducts()` 從 API 取得產品列表：

```javascript
import { fetchProducts } from '../api/products.js'

useEffect(() => {
  fetchProducts()
    .then(setProducts)
    .catch(setError)
}, [])
```

**Contact.jsx** 已使用 `submitContact()` 提交表單：

```javascript
import { submitContact } from '../api/contact.js'

const handleSubmit = async (e) => {
  e.preventDefault()
  const data = { name, email, message, company, phone }
  await submitContact(data)
}
```

**Quote.jsx** 已使用 `submitQuote()` 提交詢價單（送出後會寄信至 ctwtingwei@gmail.com）：

```javascript
import { submitQuote } from '../api/quote.js'

const handleSubmit = async (e) => {
  e.preventDefault()
  const data = { products, name, email, company, phone, region }
  await submitQuote(data)
}
```

### 使用 axios（可選）

若偏好 axios，可安裝後改寫：

```bash
cd web-frontend && npm install axios
```

```javascript
// api/products.js
import axios from 'axios'
import { API_BASE } from './config.js'

export async function fetchProducts() {
  const { data } = await axios.get(`${API_BASE}/api/products`)
  return data
}
```

---

## Railway 部署

### 1. requirements.txt（已就緒）

```
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
pydantic[email]>=2.0.0
```

### 2. Dockerfile（已就緒）

專案根目錄的 `Dockerfile` 已設定好，Railway 會自動偵測並使用。

### 3. 部署步驟

1. 登入 [Railway](https://railway.app)
2. 新增專案 → Deploy from GitHub（或本機上傳）
3. 選擇此專案根目錄
4. Railway 會偵測 Dockerfile 並建置
5. **設定環境變數**：點選後端服務 → **Variables** → 新增 `RESEND_API_KEY`（到 resend.com 建立金鑰）
6. 部署完成後會取得公開 URL（如 `https://xxx.railway.app`）
7. 在前端專案設定 `VITE_API_URL` 為後端網址，並重新 build

### 4. .env 與 Railway Variables 的差別

| 環境 | 如何設定 | 說明 |
|------|----------|------|
| 本地開發 | 使用專案根目錄的 `.env` | `python-dotenv` 會載入，`os.getenv()` 可讀取 |
| Railway | 使用 Railway 的 **Variables** | .env 不會被打包進 Docker，必須在 Railway 控制台手動新增 |

### 5. 僅部署後端

`.dockerignore` 已排除 `web-frontend/`，Docker 只會複製後端檔案。若專案包含前端，請在 Railway 建立**兩個服務**，分別部署前端與後端。

---

## 錯誤排查：在哪裡看錯誤訊息？

### 1. 頁面上的錯誤提示（已優化）

提交失敗時，頁面紅色區塊會顯示後端回傳的具體錯誤（例如「郵件服務尚未設定」「郵件服務認證失敗」等），先檢查這裡。

### 2. 瀏覽器開發者工具（F12）

1. 按 **F12** 開啟開發者工具
2. 切到 **Network（網路）** 分頁
3. 再次提交表單
4. 點選失敗的 `quote` 請求
5. 在 **Response** 或 **Preview** 查看回傳內容（通常會有 `detail` 欄位說明原因）

### 3. Railway 後端 Logs

1. 登入 [Railway](https://railway.app)
2. 點選後端服務
3. 進入 **Deployments** → 點選最新部署
4. 或直接點 **View Logs**／**Logs** 分頁
5. 查看 Python 印出的錯誤（如 SMTP 連線失敗、認證錯誤等）
