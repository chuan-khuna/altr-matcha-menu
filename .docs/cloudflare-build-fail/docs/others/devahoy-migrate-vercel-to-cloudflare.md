บันทึกการ Migrate Astro จาก Vercel ไป Cloudflare Workers
Astro
Tutorial
บันทึกการ Migrate Astro จาก Vercel ไป Cloudflare Workers
#Astro
#Vercel
#Cloudflare
#Cloudflare Workers

Copy for LLM
สวัสดีครับ วันนี้มาแชร์ประสบการณ์เล็กๆน้อยๆ ในการย้ายเว็บ (อีกแล้ว) จาก Vercel มาใช้ Cloudflare Workers ครับ ณ วันที่เขียนบทความ ก็ได้ทำการย้ายเสร็จเรียบร้อยตั้งแต่ช่วงวันหยุดที่แล้ว (บางคนอาจจะเห็นมี server down บ้างเล็กน้อย)

ทำไมต้องย้าย?
ปัญหาหลักๆ เลยคือ จะประหยัดต้นทุน และจะลดตรงส่วน Hosting เดิมที่เป็น Vercel และ Supabase ซึ่งรวมๆ ก็จ่ายรวมกัน $55 ต่อเดือน ทีนี้ไหนๆ ก็จะย้าย ผมก็เลยคิดเป็น 2 phrase ในการย้าย คือ

ย้ายส่วน Hosting จาก Vercel ไปก่อน ง่ายสุด ไม่น่ากระทบมาก
ส่วน Supabase และ Supabase Auth น่าจะกระทบเยอะสุด (ยังไม่ย้าย เดี๋ยวไว้มาเล่าทีหลัง) ซึ่งส่วน Supabase ผมมีแผนเปลี่ยนไปใช้ Cloudflare D1 ที่เป็น sqlite เลย (จริงๆ database เล็กมากๆ) ส่วน Supabase Auth ก็จะแทนที่ด้วย better-auth ครับ
Cloudflare Workers คืออะไร?
Cloudflare Workers คือ Serverless computing platform ที่ทำงานบน Cloudflare’s global network ซึ่งมีข้อดีคือ

รันบน edge ทั่วโลก ทำให้ response เร็ว
รองรับ JavaScript/TypeScript (จริงๆ ภาษาอื่นๆ ก็ได้ เช่น Python, Rust)
เชื่อมต่อกับ Cloudflare ecosystem ได้ง่าย (R2, D1, KV)
Step 1: เริ่มต้น Migrate
ผมลองดูแล้ว แทบจะไม่กระทบเลย เนื่องจากใช้ Astro การย้ายมีเพียงแค่เปลี่ยน Adapter ไปใช้ cloudflare เท่านั้นเอง ลองอ่านจากบทความที่แนบไว้ให้ได้ครับ

Astro
Create an Astro application and deploy it to Cloudflare Workers with Workers Assets.
developers.cloudflare.com

@astrojs/cloudflare
Learn how to use the @astrojs/cloudflare adapter to deploy your Astro project.
docs.astro.build

สำหรับ Astro เราต้องติดตั้ง Cloudflare adapter แทน Vercel adapter

Terminal window
bun add @astrojs/cloudflare

ปรับแต่ง Astro config ที่ไฟล์ astro.config.mjs ให้ใช้ cloudflare adapter

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
output: 'server',
adapter: cloudflare({
imageService: 'cloudflare',
platformProxy: {
enabled: true
}
})
})

เรื่อง output: 'server' ผมก็เปลี่ยนมาจาก static มาเป็น server ตั้งแต่ Astro 4 (แทน hybrid) แล้วไปกำหนด prerender แต่ละ page ให้เป็น static page เอา

export const prerender = true

Step 2: สร้างไฟล์ wrangler.jsonc
ต่อมาสร้างไฟล์ wrangler.jsonc เพื่อตั้งค่าให้กับ cloudflare workers

{
"name": "devahoy-astro",
"main": "./dist/\_worker.js/index.js",
"compatibility_date": "2026-01-31",
"compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
"assets": {
"binding": "ASSETS",
"directory": "./dist"
},
"observability": {
"enabled": true
},
"preview_urls": true
}

main ต้องใช้เป็นอันนี้เท่านั้น "./dist/\_worker.js/index.js"
assets เพื่อบอกให้ wranger หา static assets ใน ./dist ของเรา
compatibility_date ผมใช้เป็นวันที่ล่าสุดที่สร้างไฟล์ wrangler.jsonc
preview_urls ทำให้สามารถดู Preview Url ตอน build branch อื่นๆได้ แบบ Vercel
เวลาจะ build และ deploy ก็ใช้คำสั่งนี้ ซึ่งเราจะไป config ใน Cloudflare worker dashboard ให้มัน auto deploy เมื่อเรา publish git (merge PR ไป main branch)

Terminal window
bun run build
bun run wrangler deploy

Step 3: สร้าง Cloudflare Workers Project และ Connect GitHub
ต่อมา เราจะสร้าง Workers project และเชื่อมต่อกับ GitHub repository ก่อนครับ

วิธีสร้าง Workers Project
เข้าไปที่ Cloudflare Dashboard
ไปที่ Sidebar ด้านซ้ายมือเรา Compute & AI > Workers & Pages > Create application
เลือก Continue with Github จากนั้นก็ทำการเลือก repository ของเรา
หลังจาก connect git เสร็จ มันจะ detect ว่าเป็น Astro พวก build command, deploy command มันจะ config ให้เองเลย ถ้าไม่ถูก ก็ใส่ตามนี้

Terminal window

# Build command

bun run build

# Deploy command

bun run wrangler deploy

# หรือ npx wrangler deploy

# Path

/

เมื่อ connect GitHub แล้ว Cloudflare จะ auto deploy ให้ตาม flow นี้

checkout new branch -> commit และ push code ไป
ตัว Workers จะสร้าง Preview deployment (ได้ URL preview ให้ทดสอบ)
เวลาที่เราเปิด PR แล้วถูก merge ไป main → Deploy ไป Production อัตโนมัติ
ซึ่ง flow มันก็เหมือนกับ Vercel เลย ไม่ต่างกัน ใน PR เราก็จะเห็น Preview URL และผลลัพธ์

Cloudflare Deploy Preview

Wrangler Commands พื้นฐาน
มาแชร์ wrangler commands พื้นฐานเล็กๆน้อยๆครับ เอาไว้ใช้ Wrangler CLI เพื่อเอาไว้จัดการ workers บนเครื่อง local ของเรานั่นเอง

ติดตั้งลง local ของ project เราได้เลย

Terminal window
bun install wrangler@latest

คำสั่งพื้นฐาน

Terminal window

# 1. เชื่อมต่อ Cloudflare account (ต้องทำครั้งแรก)

wrangler login

# 2. รัน local dev server (เหมือน bun run dev แต่จำลอง Workers environment)

wrangler dev

# 3. deploy ไป production

wrangler deploy

# 4. ดู realtime logs จาก production

wrangler tail

# เช็ค bundle size ก่อน deploy จริง

wrangler deploy --dry-run --output dist

# ดู secrets ที่ได้สร้างไว้

wrangler secret list

# สร้าง secrets ใหม่

wrangler secret put MY_SECRET

wrangler deploy --dry-run เป็น command ที่ผมใช้บ่อยมาก เพราะช่วยให้เห็น bundle size ก่อน deploy จริง ซึ่งสำคัญมากสำหรับ Cloudflare Workers ที่มีข้อจำกัดเรื่องขนาด ตัวฟรี ต้องมีขนาดไม่เกิน 3MB ซึ่งตัวบล็อก Astro ผม มีบทความ 340 กว่าบทความ ทำให้มันถูก bundle เลยมีขนาดใหญ่ ลองปรับแก้ ไปแก้มา ตัดสินใจ เสียตังใช้ Paid Plan จบเรื่องดีกว่า

Custom Domain
สำหรับ custom domain ให้เพิ่มใน routes อย่างของผมก็เพิ่มแบบนี้ (ใช้ทั้ง www และ non-www)

{
"routes": [
{
"pattern": "devahoy.com",
"zone_name": "devahoy.com",
"custom_domain": true
},
{
"pattern": "www.devahoy.com",
"zone_name": "devahoy.com",
"custom_domain": true
}
]
}

หมายเหตุ: ต้องมี domain อยู่ใน Cloudflare DNS แล้ว และ zone_name ต้องตรงกับ zone ที่มีใน account เนื่องจากผมใช้ Cloudflare เป็น DNS อยู่แล้ว เลยไม่ได้ชี้ DNS มาที่ cloudflare เพิ่ม

Environment Variables
จุดที่คนมักสับสนคือ Environment Variables ใน Cloudflare Workers มี 2 แบบครับ ซึ่งทีแรก ผมก็สับสน และงงๆ ว่าทำไมตอน build มันไม่เจอค่า PUBLIC\_\*\* ที่เราตั้งค่าไว้นะ สุดท้าย มาพบว่า ไปใส่ผิดช่อง ไปใส่ช่อง run time

Runtime vs Build-time Environment
Build-time: ใช้ตอน build (เช่น PUBLIC_API_URL ที่ใช้ใน Astro)
Runtime: ใช้ตอน Worker รัน (เช่น API keys, database URLs)
ตัว Runtime variables & scret จะอยู่ส่วนนี้

Variables and Secrets
Define the environment variables and secrets for your Worker used at runtime

ส่วน Build-Time เลื่อนลงมาล่างๆ หน่อย ตรง Build ครับ

Build
Connect your Worker to a Git repository for automatic builds and deployments

สำหรับ Astro ที่ใช้ import.meta.env ส่วนใหญ่จะเป็น build-time ครับ

วิธีตั้ง Environment Variables

1. ใน wrangler.jsonc (สำหรับ ค่าที่ไม่ sensitive)

{
"vars": {
"PUBLIC_API_URL": "https://api.example.com",
"PUBLIC_SITE_URL": "https://yourdomain.com"
}
}

2. ใช้ wrangler secret (สำหรับ sensitive values)

Terminal window

# เพิ่ม secret

wrangler secret put API_KEY

# จะถาม value ให้พิมพ์ (ไม่แสดงบนหน้าจอ)

# ดู secrets ทั้งหมด

wrangler secret list

3. ตั้งใน Cloudflare Dashboard

หรือเราจะไปเพิ่มใน Cloudflare Dashboard แทนการใช้ wrangler secret put ก็ได้ครับ

ไปที่ Workers & Pages > เลือก project > Settings > Variables and Secrets ให้เลือก Type เป็น secret
⚠️ อย่าลืม: Sync ระหว่าง wrangler.jsonc กับ Dashboard จุดที่ทำให้ผมสับสนและเสียเวลามากคือ การตั้งค่าใน Dashboard จะถูก override โดย wrangler.jsonc ทุกครั้งที่ deploy

หลังจากการ deploy ก็ลองตรวจสอบ log ดูด้วยคำสั่ง

Terminal window
wrangler tail

Metrics หลังจาก deploy
Metrics หลังจากที่ deploy 1-2วัน

สรุป
ย้ายจาก Vercel ไป Cloudflare Workers สำเร็จแล้วครับ ตอนนี้เว็บรันบน Cloudflare อยู่ ลดต้นทุนจาก $20 เหลือ $5 ต่อเดือน (เนื่องจาก bundle size เกินนั่นเอง ฮา) ผมมองว่า สำหรับปัญหา Worker size ถ้าเว็บมีเนื้อหาเยอะๆ ก็เตรียมตัวไป paid plan ได้เลยครับ $5 เมื่อเทียบกับประสิทธิภาพแล้วคุ้มค่าครับ

เพราะเสียเวลา optimize หรือลบ library ใหญ่ๆ ออก สุดท้าย ถ้าบทความเยอะ bundle size ก็ใหญ่ (พวก syntax highlighter ด้วย มันแปลงเป็น string ไป embed ทุก static pages)

Step ต่อไป รอ migrate Supabase ครับ ซึ่ง task ค่อนข้างใหญ่ และมีไฟล์ที่เกี่ยวข้องเยอะเลย

หากใครมีคำถามหรืออยากให้ช่วยดู migration สามารถคอมเมนต์มาได้เลยครับ

Happy Coding ❤️
