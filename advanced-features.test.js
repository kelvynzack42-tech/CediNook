const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const readme=fs.readFileSync(path.join(__dirname,'README.md'),'utf8');
test('category budget guardrails are present and persisted',()=>{assert.match(html,/categoryBudgets/);assert.match(html,/Category spending guardrails/);assert.match(html,/OVER LIMIT/)});
test('debt payoff optimizer supports avalanche and snowball',()=>{assert.match(html,/avalanche/);assert.match(html,/snowball/);assert.match(html,/Estimated interest/)});
test('manual-entry-only design remains explicit',()=>{assert.match(html,/No live bank connection/);assert.match(readme,/All amounts are entered by you/);});
test('no login or register screen blocks the dashboard',()=>{assert.doesNotMatch(html,/id="accountGate"/);assert.doesNotMatch(html,/accountSignOutBtn/);assert.doesNotMatch(html,/id="cloudLogin"/);assert.doesNotMatch(html,/id="cloudRegister"/);assert.match(html,/loadAccountData/);assert.match(html,/initProfile/)});



test('every script block is valid JavaScript on its own (no script split inside another)',()=>{const vm=require('node:vm');const blocks=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(b=>b.trim());assert.ok(blocks.length>=3);blocks.forEach(b=>new vm.Script(b))});
test('dashboard insights, goal status, backup reminder and MoMo are present',()=>{assert.match(html,/id="stInsights"/);assert.match(html,/function goalHealth\(/);assert.match(html,/function backupDue\(/);assert.match(html,/value="Mobile Money"/);assert.match(html,/Get started in three steps/)});
test('hero artwork no longer uses the mockup screenshot',()=>{assert.doesNotMatch(html,/savings-growth\.png/);assert.ok(fs.existsSync(path.join(__dirname,'assets','hero.svg')))});
test('side navigation supports collapse on desktop and a drawer on phones',()=>{assert.match(html,/id="stMenuBtn"/);assert.match(html,/id="stCollapseBtn"/);assert.match(html,/id="stBackdrop"/);assert.match(html,/function sideNav\(|\(function sideNav\(/);assert.match(html,/aria-current/)});

test('the app is fully renamed and uses CediNook branding',()=>{const read=f=>fs.readFileSync(path.join(__dirname,f),'utf8');const all=['index.html','manifest.webmanifest','service-worker.js','package.json','README.md','server.js','render.yaml'].map(read).join('\n').replace("startsWith('savetrack_')",'');assert.doesNotMatch(all,/save[\s_-]?track/i);assert.match(html,/<title>CediNook/);assert.match(html,/id="valvi-theme"/);assert.ok(!fs.existsSync(path.join(__dirname,'icons','savetrack-192.png')));assert.ok(fs.existsSync(path.join(__dirname,'icons','valvitrack-512.png')))});
