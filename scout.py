import json, datetime, urllib.request
from pathlib import Path

SOURCES = {
    "Cointiply": "https://support.cointiply.com/en/support/solutions/articles/36000101129-i-can-t-get-offers-in-my-country-",
    "Publish0x": "https://www.publish0x.com/page/how-it-works",
    "Binance Learn & Earn": "https://www.binance.com/en/support/faq/detail/3819c21bd5fb493fa5057c727043cb14",
}
p = Path("data/opportunities.json")
data = json.loads(p.read_text())
now = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()

for name,url in SOURCES.items():
    try:
        req=urllib.request.Request(url,headers={"User-Agent":"EarningManagerScout/1.0"})
        with urllib.request.urlopen(req,timeout=15) as r:
            ok = 200 <= r.status < 400
        for o in data["opportunities"]:
            if o["name"] == name:
                o["source_checked"] = ok
                o["source_url"] = url
    except Exception as e:
        for o in data["opportunities"]:
            if o["name"] == name:
                o["source_checked"] = False
                o["source_url"] = url

data["generated_at"] = now + " UTC"
p.write_text(json.dumps(data,indent=2),encoding="utf-8")
