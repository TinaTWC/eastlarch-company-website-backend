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
        "name": "FE系列-全透明無耗氣電子式排水器",
        "model": "FE系列",
        "description": "採用全透明桶身設計，可即時目視積水狀態，結合電子感應控制自動排水，達到節能省電、降低人工巡視的誤判的智能管理效果。適用於壓縮空氣系統、冷凍乾燥機、精密過濾器等工業設備。",
        "image_url": "/images/fe220-angle.jpg",
        "images": [
            "/images/fe220-angle.jpg",
            "/images/fe220-side.jpg",
            "/images/fe220-top.jpg",
            "/images/fe220-label.png",
        ],
        "category": "無耗氣電子式排水器",
        "specs": {
            "型號": "FE110｜FE220｜PRE220",
            "專利字號": "中華民國專利證書字號 M683135",
            "耐壓": "≤ 16 bar",
            "耐溫": "≤ 80 °C",
            "電壓": "AC 110V / AC 220V",
            "最大排水量": "≤ 6 L/min",
            "桶身材質": "全透明耐壓特殊材質",
            "濾芯材質": "SUS304 不鏽鋼",
            "接口尺寸": "PT 1/2\"",
            "口徑": "4 分",
            "指示燈": "Power / Valve / Alarm 三色 LED",
        },
        "features": [
            {"title": "全透明", "desc": "無死角，目視檢查排水效果 100%。"},
            {"title": "無耗氣", "desc": "只排水，節省壓縮氣體效果 100%。"},
            {"title": "高科技", "desc": "輸出警報，可連接中控室監控。"},
            {"title": "最節能", "desc": "液位計自動控制液位排放，無氣體浪費。"},
            {"title": "抗阻塞", "desc": "有濾心，電磁閥膜片不損害、壽命長。"},
            {"title": "抗腐蝕", "desc": "上下蓋表面陽極處理＋不鏽鋼螺絲，耐酸鹼。"},
            {"title": "排放口", "desc": "大口徑 4 分排放口，排放速度快不阻塞。"},
            {"title": "保養容易", "desc": "快拆設計，濾心清洗更換更便利。"},
        ],
        "intro": "FE110/FE220/PFE220 全透明無耗氣電子式排水器（中華民國專利證書字號 M683135）專為壓縮空氣系統設計，透過全透明 PC 桶身讓操作人員隨時掌握積水量，搭配電子液位感應器實現全自動精準排水，有效避免傳統定時排水器造成的壓縮空氣洩漏損耗。\n\n適用場景：空氣壓縮機後冷器、冷凍乾燥機、精密過濾器、空氣儲槽及各類氣動設備，廣泛應用於製造業、電子業、食品業、汽車工業等需要高品質乾燥壓縮空氣之環境。",
        "applications": ["壓縮空氣系統", "冷凍乾燥機", "精密過濾器", "空氣儲槽", "氣動設備"],
    },
    {
        "id": 2,
        "name": "BFE系列-全透明無耗氣電子式排水器",
        "model": "BFE系列",
        "description": "採用全透明桶身設計，可即時目視排水狀態，結合電子感應控制自動排水，排水完畢立即關閉、不隨水排掉珍貴的壓縮空氣，能省電、降低人工巡視的誤判的智能管理效果。水平圓筒式機身安裝空間需求小，SUS304 不鏽鋼濾芯耐腐蝕、免耗材更換。",
        "image_url": "/images/fe-drain-angle.jpg",
        "images": [
            "/images/fe-drain-angle.jpg",
            "/images/fe-drain-front.jpg",
            "/images/fe-drain-side.jpg",
        ],
        "category": "大排量無耗氣電子式排水器",
        "specs": {
            "型號": "BFE110｜BFE220",
            "驅動方式": "電子液位感應式（自動偵測排水）",
            "耐壓": "≤ 16 bar",
            "耐溫": "≤ 80 °C",
            "電壓": "AC 110V / AC 220V",
            "最大排水量": "≤ 12 L/min",
            "桶身材質": "全透明耐壓特殊材質",
            "濾芯材質": "SUS304 不鏽鋼",
            "接口尺寸": "PT 1/2\"",
            "安裝方式": "水平壁掛式",
        },
        "features": [
            {"title": "全透明桶身", "desc": "PC 材質透明桶身，積水量一目了然，免拆機即可掌握運作狀態。"},
            {"title": "電子感應自動排水", "desc": "內建液位感應器，水位達設定值自動啟動排水閥，精準節能。"},
            {"title": "無耗氣排水", "desc": "依實際積水量啟閉，排完即關，不像定時排水器連壓縮空氣一起排掉，直接省下氣耗成本。"},
            {"title": "SUS304 不鏽鋼濾芯", "desc": "不鏽鋼濾芯耐腐蝕、壽命長，無需定期更換耗材，維護成本極低。"},
            {"title": "高耐壓耐溫設計", "desc": "耐壓 ≤ 16 bar、耐溫 ≤ 80°C，符合嚴苛工業現場長期使用需求。"},
            {"title": "水平壁掛安裝", "desc": "水平圓筒式設計，安裝空間需求小，適合各類管路配置場景。"},
        ],
        "intro": "BFE110/BFE220 全透明無耗氣電子式排水器採用電子液位感應控制，偵測積水達設定值時自動啟動排水閥，排完立即關閉，不會像傳統定時排水器一樣把壓縮空氣一併排掉，真正做到無耗氣運轉。\n\n全透明 PC 桶身設計讓操作人員可隨時目視積水狀態，搭配 SUS304 不鏽鋼濾芯，耐腐蝕、壽命長，大幅降低日常維護成本；水平圓筒式機身安裝空間需求小，適合各類管路配置。\n\n適用場景：空氣壓縮機、後冷器、精密過濾器、空氣儲槽及各類氣動設備，廣泛應用於製造業、食品業、電子業等需要穩定乾燥壓縮空氣的工業環境。",
        "applications": ["壓縮空氣系統", "後冷器", "精密過濾器", "空氣儲槽", "氣動設備"],
    },
    {
        "id": 3,
        "name": "NDFA-827 無耗能機械式自動排水器",
        "model": "NDFA-827",
        "description": "採用氣壓缸機械驅動機構，以壓縮空氣（80~120 PSI）作為動力源自動啟閉不鏽鋼球閥排水，完全無需外部電力。鋁合金框架搭配玻璃纖維強化複合材料桶身，結構堅固耐用，適合高壓、大流量及惡劣環境之壓縮空氣系統長期穩定使用。",
        "image_url": "/images/ndfa827-angle.jpg",
        "images": [
            "/images/ndfa827-angle.jpg",
            "/images/ndfa827-top.jpg",
            "/images/ndfa827-front.jpg",
            "/images/ndfa827-vertical.jpg",
            "/images/ndfa827-side.jpg",
        ],
        "category": "無耗氣機械式排水器",
        "specs": {
            "型號": "NDFA-827",
            "驅動方式": "氣壓缸機械式驅動（無需外部電源）",
            "控制氣壓": "80 ~ 120 PSI（5.5 ~ 8.3 bar）",
            "排水閥型式": "不鏽鋼球閥",
            "桶身材質": "玻璃纖維強化複合材料（半透明）",
            "框架材質": "鋁合金",
            "接口尺寸": "PT 3/4\"",
            "安裝方式": "水平壁掛式",
            "耗電量": "零耗電",
            "適用控制氣體": "乾燥潔淨壓縮空氣",
        },
        "features": [
            {"title": "零耗電機械驅動", "desc": "純氣壓缸機械結構驅動，無任何電子元件，完全不需外接電源，可靠性極高。"},
            {"title": "不鏽鋼球閥排水", "desc": "採用不鏽鋼球閥作為排水閥，開關迅速、密封性佳，壽命遠超傳統電磁閥。"},
            {"title": "鋁合金堅固框架", "desc": "厚實鋁合金框架提供優異的結構強度，耐衝擊、耐振動，適合惡劣工業現場。"},
            {"title": "大容量儲水桶身", "desc": "玻璃纖維強化複合材料桶身，容積大、重量輕，可目視積水量，利於排程維護。"},
            {"title": "高壓大流量適用", "desc": "設計適用高壓系統，控制氣壓 80~120 PSI，滿足大型壓縮機系統需求。"},
            {"title": "維護極簡", "desc": "純機械結構無電子故障點，日常保養僅需定期確認控制氣壓，維護成本低。"},
        ],
        "intro": "NDFA-827 無耗能機械式自動排水器採用氣壓缸驅動不鏽鋼球閥，以系統壓縮空氣（80~120 PSI）作為唯一動力源，達到全自動無耗電排水。\n\n鋁合金框架搭配玻璃纖維強化複合材料桶身，結構堅固、容積大，半透明桶身可直接目視積水量，方便日常巡視。純機械結構無電子元件，可靠性高，適合長時間連續運作的重工業場景。\n\n適用場景：大型空氣壓縮機、鍋爐後冷系統、高壓精密過濾器、大容量空氣儲槽，以及任何不方便拉線供電的壓縮空氣系統安裝位置，廣泛應用於重工業、石化業、造船業、礦業等嚴苛環境。",
        "applications": ["大型壓縮機系統", "高壓精密過濾器", "鍋爐後冷系統", "大容量空氣儲槽", "重工業環境"],
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
