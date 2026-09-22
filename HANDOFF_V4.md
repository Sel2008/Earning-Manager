# Earning Manager — MASTER PROJECT HANDOFF V4

Date: 2026-09-22
Project: Earning Manager
GitHub repository: Sel2008/Earning-Manager
Primary deployed app: https://sel2008.github.io/Earning-Manager/
Authoritative application file: main/index.html
Current Step: Step 4

## 1. PURPOSE
This is the continuation point for the next ChatGPT session. Continue from this state; do not restart the architecture or redo completed work.

The Earning Manager is designed to discover legitimate online earning opportunities, verify eligibility/payout/automation/completion signals, prefer permitted automation when it reduces user labour, surface high-value human work for the user's own decision, manage approved tasks, record only real earnings, track payout states, continuously research alternatives, and prepare AI Factory briefs.

## 2. USER WORKFLOW
READY -> IN PROGRESS -> COMPLETE / BOT REPORTED COMPLETE -> actual earning entered/confirmed -> EARNING RECORDED -> EARNED -> WITHDRAWAL REQUESTED -> PAID

Manual tasks: user starts, completes, and enters the actual amount earned.
BOT tasks: bot may report completion, but actual platform payout must be confirmed. The app never invents or estimates earnings.
Critical rule: starting or completing a task does NOT create earnings automatically.

## 3. CURRENT UI
Home: monthly target R1,500; first milestone R500; earned/pending/withdrawable/today; Opportunity Scout; Opportunity Results; Approval Center; Manager Control Loop; AI Factory handoff foundation; Scout Rules.
Tasks: saved/approved opportunities, READY, IN PROGRESS, COMPLETE/BOT REPORTED COMPLETE, EARNING RECORDED, and earning states.
Earnings: total/pending/withdrawable/today plus records.
POD: reserved for later and not part of the current Step 4 test.
Settings: reserved for later.

## 4. APPROVAL CENTER
Save for review creates a SAVED task and a PENDING approval request. Approve changes the matching task to READY. Reject marks the request REJECTED. External account, financial, agent-deployment and similar side effects require user approval.

## 5. OPPORTUNITY DECISION LAYER
Decision factors: automation level, explicit automation permission, expected hourly rate, user minutes per task, machine-verifiable completion, payout confirmation, upfront cost, and verification evidence.
Decision classes: AUTO_PRIORITY, HUMAN_REVIEW, HYBRID_REVIEW, REJECT.
Automation is preferred, not mandatory. If a human-required opportunity has high enough expected value to justify the user's time, surface it with time, expected rate, eligibility and compliance evidence so the user can decide.

## 6. VERIFICATION POLICY
Source inspection is evidence collection only; it is not automatically verification.
Verification fields: eligibility_status, compensation_status, automation_permission_status, payout_status, minimum_withdrawal, payment_methods, country_eligibility, evidence_urls, evidence_notes, verified_at, confidence.
Statuses: VERIFIED, PARTIAL, UNKNOWN, NOT_ELIGIBLE, PROHIBITED.
AUTO_PRIORITY requires authoritative support for eligibility, compensation, automation permission and payout, plus required completion evidence.

## 7. CONTINUOUS RESEARCH / DECISION ARCHITECTURE
The continuous research foundation has been added. The Manager can detect insufficient earning pace, queue zero-upfront-cost research, prefer permitted automation, keep high-value human opportunities visible, inspect evidence, show verification status, and prepare AI Factory research briefs.
Research categories include microtasks; data labeling/evaluation; transcription/data conversion; website/app testing; research/data collection; digital services; affiliate/referral opportunities; open paid APIs/data work; and other legitimate zero-upfront-cost online work.
The opportunity feed is broader than the original seed platforms.

## 8. MANAGER PACE
Current config: milestone R500; next milestone/target R1,500; research trigger window 7 days; minimum preferred rate R25/hour.
The Manager calculates actual earned, remaining milestone amount, recent daily average, estimated days to milestone, and whether additional research should be triggered.

## 9. AI FACTORY FOUNDATION
Approved research categories can generate an AI Factory Agent Brief covering zero upfront cost, eligibility, automation permission, payout, completion signals, net hourly rate, evidence, risks, task state machine, and approval boundaries.
The Factory foundation is present; it is not yet a fully deployed autonomous earning system.

## 10. CURRENT OPPORTUNITY FEED
data/opportunities.json currently contains seed examples: Cointiply, Publish0x, Binance Learn & Earn, FreeCash, and an upfront-payment/high-risk earning offer.
These are seed examples only, not the full opportunity universe.
Recorded research findings: Cointiply and FreeCash records indicate prohibited automation for relevant activities; Binance Learn & Earn requires campaign/account-specific verification and automation permission must be separately verified before implementation.

## 11. GITHUB / BACKUP STATE
Repository: Sel2008/Earning-Manager
The GitHub connection has been available to the current ChatGPT session and the repository was directly inspected.
index.html blob SHA at handoff creation: 4d418632900e0c7f14b1602e658c8367736ec462
data/opportunities.json blob SHA: 7e4d99fd6298d66cb5ab47c97284c7af06a57755
Latest observed commit: 3cd32712b599a8a0508b4b68d02d80f5d1fdcc17 — Add explicit verification checklist and gate automation priority.
Important preceding commits: 16de88b54fa8d46781ee29cc90f83b454c59e4ef (structured opportunity verification policy); d88994dab2e535f722993b7b40033e2d309a6ebf (verification records); 18499e0f83ee50bad505e8a7bc075f739a8b2584 (continuous research verification status); 87d53521d80ecd40b18d1fdaf38620db4706919b (evidence inspection); df0492dc85d1b3c8b8c37707ae9c1a00bf7698ea (scheduled research); e480f9b7a178b68a623f34d53263cefeffbdeeaf (research worker); 19bc548f0c7afff5cc3dc4f6949ce6074b2ea41c (decision schema); 14dc40452d04e58fb056b8bc9eddc87f53f572ae (automation-first human opportunity layer); bef0dd26d061f096f67544a46d2a2e7160fa913d (broadened discovery).
Previously recorded workflow commit: 10809aeef4c7f088dcdbeefd8dd45fee877a4d27.

## 12. TESTS ALREADY COMPLETED
Available static checks previously passed for Approval Center structure; saving opportunities for review; approval/rejection flow; task state progression; manual vs bot task distinction; actual earning entry; earning record creation; withdrawal request state; paid state; separation of Tasks and Earnings; automation-first scoring; high-value human opportunity surfacing; continuous research architecture; research queue; AI Factory brief foundation; evidence inspection; verification checklist; and AUTO_PRIORITY gating.
The current index.html and opportunities.json were directly inspected from GitHub at this handoff.

## 13. REMAINING TESTS / WORK
Immediate: live browser test of Step 4 end-to-end.
Test Scout feed loading, Opportunity Results rendering, Manager decision/verification panels, save-for-review, approval, READY -> IN PROGRESS -> completion, actual earning entry, Earnings update, withdrawal request, PAID confirmation, reload persistence, BOT path, and the rule that task completion never invents earnings.
Verify the previously suspected Scout/rendering issue in the live app rather than assuming it is fixed. Current source calls loadScout(), successful load calls render(), and startup calls renderManager().
Continuous research next layer: refresh permitted public sources, gather authoritative evidence, create structured opportunity records, recheck stale verification, distinguish discovery from verification, and feed verified records into the decision layer. Do not turn discovery into automatic external earning actions.
AI Factory next layer: determine safe implementation for actual agent creation/execution only after research evidence is verified.
Later persistence may need to move beyond localStorage if multi-device/server continuity becomes necessary.

## 14. NON-NEGOTIABLE CONTROL RULES
Never invent earnings or payout confirmation. Never claim eligibility or automation permission without evidence. Never spend money or withdraw funds without approval. Never create fake identities/accounts, fake reviews/engagement, spam, CAPTCHA bypasses, geo-restriction bypasses, or evasive platform behaviour. Never automate a platform where automation is prohibited.

## 15. CONTINUATION INSTRUCTIONS
Do not restart. First read Handoff V4, inspect the GitHub main branch, live-test the deployed app, fix only confirmed issues, commit stable changes, then continue the continuous research/decision layer.
GitHub is the durable source-of-truth backup. GitHub Pages is the live test surface.

## 16. IMMEDIATE NEXT OBJECTIVE
Live-test Step 4 end-to-end, then continue the continuous research/decision layer only after the current workflow is confirmed.

Handoff V4 status: project preserved at the current Step 4 architecture and GitHub state for continuation without starting from scratch.