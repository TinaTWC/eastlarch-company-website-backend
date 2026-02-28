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
| POST | /api/contact | 提交聯絡表單 |

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
5. 部署完成後會取得公開 URL（如 `https://xxx.railway.app`）
6. 在前端專案設定 `VITE_API_URL=https://xxx.railway.app` 並重新 build

### 4. 僅部署後端

`.dockerignore` 已排除 `web-frontend/`，Docker 只會複製後端檔案。若專案包含前端，請在 Railway 建立**兩個服務**，分別部署前端與後端。
