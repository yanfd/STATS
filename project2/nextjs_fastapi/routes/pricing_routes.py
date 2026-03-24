from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
import os
import json

router = APIRouter(
    prefix="/api/pricing",
    tags=["pricing"]
)

PRICING_FILE = os.environ.get('PRICING_FILE', '/etc/hughes-api/pricing.json')


# ── Models ────────────────────────────────────────────────────────────────────

class Product(BaseModel):
    id: str
    name: str
    cost: float = Field(..., ge=0, description="基础成本")
    category: Optional[str] = None
    notes: Optional[str] = None


class PricingRule(BaseModel):
    product_id: str
    coefficients: dict = Field(default_factory=dict, description="系数字典")
    override_price: Optional[float] = None


class PriceCalcRequest(BaseModel):
    product_id: str
    coefficients: Optional[dict] = None


# ── Storage helpers ───────────────────────────────────────────────────────────

def load_data() -> dict:
    if os.path.exists(PRICING_FILE):
        with open(PRICING_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"products": {}, "rules": {}, "global_coefficients": {}}


def save_data(data: dict):
    os.makedirs(os.path.dirname(PRICING_FILE), exist_ok=True)
    with open(PRICING_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def calc_price(cost: float, coefficients: dict) -> float:
    price = cost
    for coeff in coefficients.values():
        price *= coeff
    return round(price, 2)


# ── Routes ────────────────────────────────────────────────────────────────────

@router.get("/products")
async def get_products():
    data = load_data()
    return {"products": list(data["products"].values())}


@router.post("/products")
async def create_product(product: Product):
    data = load_data()
    data["products"][product.id] = product.model_dump()
    save_data(data)
    return {"product": product}


@router.get("/coefficients")
async def get_coefficients():
    data = load_data()
    return {"coefficients": data["global_coefficients"]}


@router.post("/coefficients")
async def set_coefficients(coefficients: dict):
    data = load_data()
    data["global_coefficients"] = coefficients
    save_data(data)
    return {"coefficients": coefficients}


@router.post("/calculate")
async def calculate_price(req: PriceCalcRequest):
    data = load_data()
    product = data["products"].get(req.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    coefficients = dict(data["global_coefficients"])
    rule = data["rules"].get(req.product_id, {})
    coefficients.update(rule.get("coefficients", {}))
    if req.coefficients:
        coefficients.update(req.coefficients)

    final_price = calc_price(product["cost"], coefficients)

    return {
        "product_id": req.product_id,
        "product_name": product["name"],
        "cost": product["cost"],
        "coefficients": coefficients,
        "final_price": final_price,
    }


@router.get("/calculate/all")
async def calculate_all_prices():
    data = load_data()
    results = []
    for product in data["products"].values():
        coefficients = dict(data["global_coefficients"])
        rule = data["rules"].get(product["id"], {})
        coefficients.update(rule.get("coefficients", {}))
        final_price = calc_price(product["cost"], coefficients)
        results.append({
            "product_id": product["id"],
            "product_name": product["name"],
            "category": product.get("category"),
            "cost": product["cost"],
            "coefficients": coefficients,
            "final_price": final_price,
        })
    return {"prices": results}
