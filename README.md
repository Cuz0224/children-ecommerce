# Welcome to your AutoCoder.cc project

## Project info

- **Project ID:** PROJ_1cd476cd_snap_20260831_021440_707
- **Version:** Implemented toy store
- **URL:** [AutoCoder.cc](https://pre.autocode.cc/platform/generate/483686093?PROJECTID=PROJ_1cd476cd)
- **Test account (no registration required):**

**🔑 Recommended Test Access (No Registration Required):**

* Frontend: `sarah_toylover`/`ToyStorePass2026!`/`username` (CUSTOMER)

* Backend admin: `clara_admin`/`AdminSecret2026!`/`username` (ADMIN)

**Note:** The test account and its data will be disabled upon official platform launch to ensure security.
## Getting Started

**Prerequisites:** Node.js (recommend [nvm](https://github.com/nvm-sh/nvm)) and [pnpm](https://pnpm.io/).

```bash
cd AutoCoder.cc

# Install dependencies
pnpm install

# Initialize the database and rebuild server actions
pnpm run init

# Run development
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The backend API runs at [http://localhost:3001](http://localhost:3001).

**Quick Links**
- **Website** — [http://localhost:3000/](http://localhost:3000/)
- **Backend** — [http://localhost:3000/productcatalogadmin](http://localhost:3000/productcatalogadmin)

---

## How can I edit this project?

You can work on this project in several ways:

### Use AutoCoder.cc

Visit [AutoCoder.cc](https://pre.autocode.cc/platform/generate/483686093?PROJECTID=PROJ_1cd476cd) and use the editor. Changes are committed automatically to the connected repo.

### Use your IDE locally

Clone the repo, then from the project root:

1. Install dependencies
2. `pnpm run init` initializes the database and rebuilds the server action common bundle
3. Edit files
4. if you edit actions, run `pnpm run build:server` to rebuild
5. Start frontend: `pnpm run dev` (port 3000)

---



## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- Prisma
- shadcn/ui
