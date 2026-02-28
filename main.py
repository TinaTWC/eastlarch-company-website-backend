import asyncio
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = FastAPI(title="排水器公司 API")

# 縣市代碼對應中文（詢價單用）
REGION_LABELS = {
    "keelung": "基隆市", "taipei": "台北市", "new_taipei": "新北市",
    "taoyuan": "桃園市", "hsinchu_city": "新竹市", "hsinchu_county": "新竹縣",
    "miaoli": "苗栗縣", "taichung": "台中市", "changhua": "彰化縣",
    "nantou": "南投縣", "yunlin": "雲林縣", "chiayi_city": "嘉義市",
    "chiayi_county": "嘉義縣", "tainan": "台南市", "kaohsiung": "高雄市",
    "pingtung": "屏東縣", "yilan": "宜蘭縣", "hualien": "花蓮縣",
    "taitung": "台東縣", "other": "其他 / 外島地區",
}

# CORS：允許前端存取（開發 localhost:5173，生產環境請於 Railway 設定 VITE_API_URL）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源，正式環境建議改為 ["https://你的網域.com"]
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========== 產品 API ==========
# GET /api/products 回傳假商品列表
MOCK_PRODUCTS = [
    {
        "id": 1,
        "name": "電動式排水器",
        "description": "專為廠房設計，具備高流量與低噪音特性，有效排除積水與汙水。高效率馬達驅動，適用於需穩定強力排水之場域。",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGKAbmrPcFcRwOUcF4nfsF-BC09aUzYQTosowdXnmkviSEBZvgKlcLmAhn7PpBaMB8mMc9GgukmHw3Op4ngI2SQB59efPy6T75f6ddJHU5a11Zkte7oAQCfRQmV0YM88DotDnsBkXbnkIK-GetRsJXX5ohC0DzfEXsmquSwZvKRGGAhwdtDmiW2J9lp-4INWAqX2SZuz6VTXqw86TaiRhae4siwiPjOMJtSD3iXMshNkkGJTtYIBjFqSTisf-D0tdjWQRMCM-xu38",
        "category": "電動排水",
        "intro": "電動式排水器採用高效率馬達驅動，專為工業廠房、倉儲、地下停車場等場域設計。\n\n產品特點：\n• 高效率馬達，省電耐用\n• 低噪音設計，不干擾作業\n• 適用於需穩定強力排水之場域\n• 符合工業安全標準",
    },
    {
        "id": 2,
        "name": "無動力排水器",
        "description": "利用重力自然排水，零電費運轉。SUS304 不鏽鋼材質耐用抗腐蝕，環保節能，適合屋頂及一般排水需求。",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCU_kga-sCtYP-K1Sg2sxhIIujLtlsqiUlHlVJ6wODxLItNvVCac6bFPmFWcFnVPWtfJLlDA-bTRplJG0yieeDZ46JEfIt-IdGl33h9Y7EvnlC-Gxzr2R6GmnhVmUC8AKmlLTWjB_uSWNVN1BCbWqo2u_Bf5IjeWbWagPso_myefxDIE5ImWnoT2n00MUGDq99PhP2pEAt1hA4BwboAkSRYqqVu1uDqWRri4ZNWKcAEOy_2nxt4TFG7Kpe2uy3uwuF0ZUkr5BvZ8",
        "category": "無動力排水",
        "intro": "無動力排水器利用重力原理自然排水，無需電力即可運轉，零電費、零耗能。採用 SUS304 不鏽鋼材質，耐腐蝕、壽命長。\n\n產品特點：\n• 重力排水，零電費運轉\n• SUS304 不鏽鋼，耐腐蝕\n• 環保節能，無碳排放\n• 結構簡單，維護容易",
    },
    {
        "id": 3,
        "name": "定製排水管道",
        "description": "依據現場需求訂製的排水管路與接頭，模組化設計、安裝簡易，完美適配各類排水設備。",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCjKKgIQslbtXLfCoM0v7XJTQQ7fXxAFjk5eJNx_udloAEJtXU6icXRh1tTAotUGlpS_XoBx2vg2z2XQ9_xgjNxV4Usq4-0I6Y1Dq2wiX1AVcCH2qkvZxj1y-LI_7_S8_t0KjmjXe_cN-aSre12jHq1X7CZa69pzXV8ZoUac8ecc_XNlmeYC3EpMUbxMOR978elACvGCk0UkpQqQEAxy_zhHD4rYPFsvvEHl5pfrnw0X3jprj__fmxEUlC2gr6EFuhl3Z2JRv3AdHg",
        "category": "安裝配件",
        "intro": "依據現場需求訂製的排水管路與接頭，模組化設計、安裝簡易，完美適配各類排水設備。\n\n產品特點：\n• 模組化設計，安裝簡易\n• 多種規格接頭\n• 完美適配各類排水設備",
    },
]


@app.get("/api/products")
async def get_products():
    """回傳產品列表（假資料）"""
    return MOCK_PRODUCTS


@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    """回傳單一產品詳情"""
    for p in MOCK_PRODUCTS:
        if p["id"] == product_id:
            detail = dict(p)
            detail.setdefault("intro", p.get("description", ""))
            return detail
    raise HTTPException(status_code=404, detail="產品不存在")


# ========== 聯絡表單 API ==========
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    company: str | None = None  # 選填
    phone: str | None = None    # 選填


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    """接收聯絡表單，回傳成功訊息"""
    # 實際部署時可在此將資料寫入資料庫或寄出郵件
    return {
        "success": True,
        "message": "感謝您的來信，我們將在 24 小時內與您聯繫。",
    }


# ========== 詢價單 API ==========
class QuoteForm(BaseModel):
    products: list[str] = []  # 選中的產品名稱，如 ["電動排水器", "無動力排水器"]
    name: str
    email: EmailStr
    company: str | None = None
    phone: str | None = None
    region: str | None = None  # 縣市代碼


async def _send_quote_email(form: QuoteForm) -> None:
    """透過 Resend API 將詢價單內容寄到指定信箱（使用 HTTPS，適用 Railway 等雲端平台）"""
    api_key = os.getenv("RESEND_API_KEY")
    recipient = os.getenv("QUOTE_RECIPIENT_EMAIL", "qwqwqw4564@gmail.com")

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="郵件服務尚未設定，請聯絡管理員。",
        )

    region_label = REGION_LABELS.get(form.region, form.region or "未填寫")
    products_text = "、".join(form.products) if form.products else "未勾選"

    body = f"""
【產品詢價單 - 新提交】

=== 詢價項目 ===
{products_text}

=== 聯絡資訊 ===
姓名：{form.name}
公司名稱：{form.company or "未填寫"}
電話：{form.phone or "未填寫"}
電子郵件：{form.email}
公司所在地 (服務地區)：{region_label}

---
此信件由官網詢價表單自動送出，請勿直接回覆。
""".strip()

    subject = f"產品詢價單 - {form.name} ({form.company or '無公司'})"

    def _do_send():
        import resend

        resend.api_key = api_key
        resend.Emails.send(
            {
                "from": os.getenv("RESEND_FROM", "官網詢價 <onboarding@resend.dev>"),
                "to": [recipient],
                "subject": subject,
                "text": body,
            }
        )

    try:
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, _do_send)
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"郵件寄送失敗：{str(e)}",
        ) from e


@app.post("/api/quote")
async def submit_quote(form: QuoteForm):
    """接收詢價單表單，將內容寄到指定信箱"""
    await _send_quote_email(form)
    return {
        "success": True,
        "message": "詢價單已送出，我們將盡快與您聯繫。",
    }
