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
        "name": "FE110 -FE220全透明排水器",
        "model": "BFE110 / BFE220",
        "description": "採用全透明桶身設計，可即時目視積水狀態，結合電子感應控制自動排水，達到節能省電、免人工巡視的智能管理效果。適用於壓縮空氣系統、冷凍乾燥機、精密過濾器等工業設備。",
        "image_url": "/images/fe220-angle.jpg",
        "images": [
            "/images/fe220-angle.jpg",
            "/images/fe220-side.jpg",
            "/images/fe220-top.jpg",
            "/images/fe220-label.png",
        ],
        "category": "電動排水",
        "specs": {
            "型號": "BFE110 / BFE220",
            "耐壓": "≤ 16 bar",
            "耐溫": "≤ 80 °C",
            "電壓": "AC 110V / AC 220V",
            "最大排水量": "≤ 12 L/min",
            "桶身材質": "全透明 PC（聚碳酸酯）",
            "濾芯材質": "SUS304 不鏽鋼",
            "接口尺寸": "PT 1/2\"",
            "防護等級": "IP54",
            "指示燈": "Power / Valve / Alarm 三色 LED",
        },
        "features": [
            {"title": "全透明桶身", "desc": "PC 材質透明桶身，積水量一目了然，免拆機即可掌握運作狀態。"},
            {"title": "電子感應自動排水", "desc": "內建液位感應器，水位達設定值自動啟動電磁閥排水，精準節能。"},
            {"title": "三色 LED 狀態顯示", "desc": "Power / Valve / Alarm 指示燈即時反映設備狀態，異常一秒判斷。"},
            {"title": "TEST 一鍵測試", "desc": "面板 TEST 按鈕可隨時手動觸發排水，方便安裝後現場驗收。"},
            {"title": "高耐壓耐溫設計", "desc": "耐壓 ≤ 16 bar、耐溫 ≤ 80°C，符合嚴苛工業現場需求。"},
            {"title": "SUS304 不鏽鋼濾芯", "desc": "不鏽鋼濾芯耐腐蝕、壽命長，維護成本低。"},
        ],
        "intro": "全透明節能電子式排水器（BFE110 / BFE220）專為壓縮空氣系統設計，透過全透明 PC 桶身讓操作人員隨時掌握積水量，搭配電子液位感應器實現全自動精準排水，有效避免傳統定時排水器造成的壓縮空氣洩漏損耗。\n\n適用場景：空氣壓縮機後冷器、冷凍乾燥機、精密過濾器、空氣儲槽及各類氣動設備，廣泛應用於製造業、電子業、食品業、汽車工業等需要高品質乾燥壓縮空氣之環境。",
        "applications": ["壓縮空氣系統", "冷凍乾燥機", "精密過濾器", "空氣儲槽", "氣動設備"],
    },
    {
        "id": 2,
        "name": "FE110 -FE220 無耗能自動排水器",
        "model": "FE110 / FE220",
        "description": "利用系統本身壓縮空氣壓力驅動浮球機構自動排水，完全無需外部電源，零電費運轉。全透明 PC 桶身可即時目視積水量，SUS304 不鏽鋼濾芯耐腐蝕、免耗材更換，適合各類壓縮空氣系統長期穩定使用。",
        "image_url": "/images/fe-drain-angle.jpg",
        "images": [
            "/images/fe-drain-angle.jpg",
            "/images/fe-drain-front.jpg",
            "/images/fe-drain-side.jpg",
        ],
        "category": "無耗能自動排水",
        "specs": {
            "型號": "FE110 / FE220",
            "驅動方式": "氣壓浮球式（無需外部電源）",
            "耐壓": "≤ 16 bar",
            "耐溫": "≤ 80 °C",
            "最大排水量": "≤ 12 L/min",
            "桶身材質": "全透明 PC（聚碳酸酯）",
            "濾芯材質": "SUS304 不鏽鋼",
            "接口尺寸": "PT 1/2\"",
            "安裝方式": "水平壁掛式",
            "耗電量": "零耗電",
        },
        "features": [
            {"title": "零耗電運轉", "desc": "利用壓縮空氣系統本身壓力驅動，完全不需要外接電源，節能環保。"},
            {"title": "全透明桶身", "desc": "PC 材質透明桶身，積水量一目了然，免拆機即可掌握運作狀態。"},
            {"title": "氣壓浮球自動控制", "desc": "浮球機構隨水位自動啟閉排水閥，無需人工操作，全程自動化。"},
            {"title": "SUS304 不鏽鋼濾芯", "desc": "不鏽鋼濾芯耐腐蝕、壽命長，無需定期更換耗材，維護成本極低。"},
            {"title": "高耐壓耐溫設計", "desc": "耐壓 ≤ 16 bar、耐溫 ≤ 80°C，符合嚴苛工業現場長期使用需求。"},
            {"title": "水平壁掛安裝", "desc": "水平圓筒式設計，安裝空間需求小，適合各類管路配置場景。"},
        ],
        "intro": "FE110 -FE220 無耗能自動排水器採用氣壓浮球驅動機構，完全依靠壓縮空氣系統本身的壓力自動排水，無需任何外部電力，實現真正的零耗能運轉。\n\n全透明 PC 桶身設計讓操作人員可隨時目視積水狀態，搭配 SUS304 不鏽鋼濾芯，耐腐蝕、壽命長，大幅降低日常維護成本。\n\n適用場景：空氣壓縮機、後冷器、精密過濾器、空氣儲槽及各類不方便接電的氣動設備安裝位置，廣泛應用於製造業、食品業、電子業等需要穩定乾燥壓縮空氣的工業環境。",
        "applications": ["壓縮空氣系統", "後冷器", "精密過濾器", "空氣儲槽", "無電源安裝場所"],
    }
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


async def _send_contact_email(form: ContactForm) -> None:
    """透過 Resend API 將聯絡表單內容寄到指定信箱（收件人 + 主管 CC）"""
    api_key = os.getenv("RESEND_API_KEY")
    recipient = os.getenv("QUOTE_RECIPIENT_EMAIL", "ctwtingwei@gmail.com")

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="郵件服務尚未設定，請聯絡管理員。",
        )

    body = f"""
【聯絡表單 - 新提交】

=== 聯絡資訊 ===
姓名：{form.name}
公司名稱：{form.company or "未填寫"}
電話：{form.phone or "未填寫"}
電子郵件：{form.email}

=== 訊息內容 ===
{form.message}

---
此信件由官網聯絡表單自動送出，請勿直接回覆。
""".strip()

    subject = f"聯絡表單 - {form.name} ({form.company or '無公司'})"

    resend_from = os.getenv("RESEND_FROM", "Eastlarch 系統通知 <noreply@eastlarch.com>")
    manager_email = os.getenv("MANAGER_EMAIL", "").strip()
    payload = {
        "from": resend_from,
        "to": [recipient],
        "subject": subject,
        "text": body,
    }
    if manager_email and "onboarding@resend.dev" not in resend_from:
        payload["cc"] = [manager_email]

    def _do_send():
        import resend

        resend.api_key = api_key
        resend.Emails.send(payload)

    try:
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, _do_send)
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"郵件寄送失敗：{str(e)}",
        ) from e


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    """接收聯絡表單，寄信給收件人與主管，回傳成功訊息"""
    await _send_contact_email(form)
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
    recipient = os.getenv("QUOTE_RECIPIENT_EMAIL", "ctwtingwei@gmail.com")

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
來自公司名稱：{form.company or "未填寫"} 對於
{products_text} 的詢價單，請盡快回覆喔。

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

    resend_from = os.getenv("RESEND_FROM", "Eastlarch 系統通知 <noreply@eastlarch.com>")
    manager_email = os.getenv("MANAGER_EMAIL", "").strip()
    payload = {
        "from": resend_from,
        "to": [recipient],
        "subject": subject,
        "text": body,
    }
    # Resend 測試寄件人 (onboarding@resend.dev) 僅允許寄給註冊信箱，CC 他人會失敗
    # 使用驗證網域後才加入 CC
    if manager_email and "onboarding@resend.dev" not in resend_from:
        payload["cc"] = [manager_email]

    def _do_send():
        import resend

        resend.api_key = api_key
        resend.Emails.send(payload)

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
