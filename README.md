# 🤖 Android Club Showcase & Project Workspace

An integrated, high-performance web ecosystem designed for the **Android Club (VIT Chennai)**. This platform serves a dual purpose: a high-fidelity public landing portal showcasing active research spotlights, live events, and technological breakthroughs to the general public, paired with an internal, role-restricted Kanban task matrix for club engineers.

This repository represents the completed solution for the **Android Club Technical Recruitment 2026 Web Development Task**, transformed from the original base repository (`ChinmayBabu/devChart`).

---

## 🔗 Project Access Nodes

* **🚀 Live Production Deployment:** [devChart Live Deployment Hub](https://dev-chart-mxr020g7a-ratchanar2025-9196s-projects.vercel.app?_vercel_share=YfhEaTJkPmdq8BHZvIgQ2fUvIUyLXdF9)
* **💻 GitHub Repository Source:** [ratchanar2025/devChart](https://github.com/ratchanar2025/devChart.git)

---

## 🚀 Active Features Implemented

### 1. Kanban-Style Stage Lifecycle (Core Requirement)
* **Visual Workstreams:** Upgraded the legacy vertical list view into a multi-column Kanban layout containing segregated structural states: `To Do`, `In Progress`, and `Done`.
* **State Mutation Routing:** Integrated responsive, secure control endpoints to dynamically update item documentation values cleanly inside MongoDB Atlas across states.

### 2. Role-Based Access Control & Creation Gating (Feature Upgrade 1)
* **Admin Privilege Isolation:** Only registered accounts passing verified administrative validation strings can trigger the centralized form configuration window and mint new task documentation nodes onto the board.
* **Member Claim Framework:** Registered club users automatically receive permissions to claim available tasks, locking their profile identities to specified nodes as they shift items through the pipeline.

### 3. Gamified Token Reward System (Feature Upgrade 2)
* **Token Balance Mapping:** Embedded explicit coin metrics (`rewardCoins`) directly inside task definitions.
* **Economic Visibility:** Displays specific project difficulties via interactive coin badges to incentivize student developers dynamically as tasks are claimed and performed.

### 4. Dual-View Public Outreach Layout (Feature Upgrade 3)
* **Public Visibility Frame:** Restructured the default base route file `app/page.tsx` into a multi-layer view dashboard. Unauthenticated visitors can view public upcoming streams (such as `DevJams 2026`) and ongoing club spotlight modules without authentication barriers.
* **Portal Gateway Overlays:** Embedded an instantaneous conditional identity processing modal context overlay that reveals the authenticated workspace upon successful token issuance.

---

## 🛠️ Technology Stack Used

* **Frontend Framework:** Next.js 15 (React 19, TypeScript)
* **Styling Engine:** Tailwind CSS
* **Database Layer:** MongoDB Atlas (via Mongoose ODM)
* **Authentication Engine:** Standalone JWT Structure with Cryptographic Payload Signing
* **Package Manager:** `pnpm` (v10)
* **Cloud Deployment Provider:** Vercel Production Environment

---

## 📂 System Architecture Blueprint

```text
android-club-website/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts       # Secure JSON credential handler
│   │   │   └── register/
│   │   │       └── route.ts       # Mongoose user insertion worker
│   │   └── tasks/
│   │       └── route.ts           # Lowercase ENUM validation controller
│   ├── layout.tsx                 # Core HTML root layout wrapper
│   └── page.tsx                   # Public Spotlight showcase view & Auth logic
├── components/
│   └── kanban/
│       ├── auth-modal.tsx         # Identity routing gate
│       ├── premium-kanban.tsx     # Workspace board grid loop
│       └── premium-task-card.tsx  # Interactive state rendering node
├── lib/
│   └── mongodb.ts                 # Cached Mongoose connection layer
├── models/
│   ├── Tasks.ts                   # Strict schema blueprint for task cards
│   └── User.ts                    # Identity credential layout definition
├── public/                        # Static repository graphical assets
├── .env.local                     # Hidden development variables file
├── .gitignore                     # Version control leakage protection configurations
├── next.config.ts                 # Custom framework configuration compiler options
├── package.json                   # Dependency definitions script manifest
├── pnpm-lock.yaml                 # Deterministic dependency dependency layout definition
└── tsconfig.json                  # Strict static TypeScript compiler rule set

---
## ⚡ Local Setup Instructions
---
### 1. Environment Variable Configuration
Generate a .env.local configuration block directly inside your project's root node directory:

Code snippet
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/android_club
JWT_SECRET=your_high_entropy_secret_string_here

---

### 2. Dependency Ingestion
Execute the build preparation command using pnpm to map system lockfiles cleanly without causing CI mismatch errors:

Bash
pnpm install --no-frozen-lockfile

---

### 3. Initialize Dev Server Execution
Bash
pnpm dev
Navigate to http://localhost:3000 inside your browser environment to test the full-stack loop locally.

---
## 🚀 Deployment Instructions (Vercel)
Connect your forked GitHub repository to your Vercel Dashboard profile node.

In the Project Build Settings, add your environment configurations matching your MongoDB Atlas connection keys (MONGODB_URI, JWT_SECRET).

Under Build & Development Settings, toggle on the manual custom Install Command override to resolve compilation freezing checks during installation:

Plaintext
   pnpm install --no-frozen-lockfile
Click Deploy. Vercel will build your serverless routes and generate your functional deployment links automatically.

🖼️ Screenshots of the Working Website

<p align="center">
  <img src="https://github.com/user-attachments/assets/fe608974-218e-4680-a1a3-2cd47292f23d" alt="Application Preview" width="80%">
</p>

Persistent LocalStorage State: Client authentication details are verified using localStorage. Sessions remain permanently active locally until users explicitly clear stored string variables.

---
### 🔮 Future Engineering Roadmap

###📡 Phase 1: Strict Institutional Google OAuth Protocol
NextAuth.js Integration: Transition from custom standalone JWT configurations to native Google OAuth 2.0 provider pipelines.

Institutional Domain Gating: Implement strict hosted-domain locks (hd: "vitstudent.ac.in") preventing external emails from access attempts.

Automatic Profile Sync: Instantly extract verified Google avatars, names, and campus identities directly from their student accounts into their Kanban profiles.


### 📈 Phase 2: Fluid Drag & Drop Integration

Refactor Kanban lanes with dnd-kit to allow natural cursor state mutation tracking. Combine this with backend automated balance payouts that settle rewardCoins data increments to profiles the exact millisecond a card hits the done collection.

🔊 Phase 3: Enhanced Public Outreach & Engagement Features
Interactive Club Sandbox: An in-browser interactive terminal showcase allowing visiting students to run and view simple Android layouts natively on the landing page.

Push Notification Systems: Webhook bridges pushing alerts straight to student mobile environments whenever club administrators drop urgent High Priority assignments.

📄 License
This project is engineered exclusively for the Android Club Recruitment Framework 2026. All rights reserved.
