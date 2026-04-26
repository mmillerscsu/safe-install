# 🔐 safe-install

### A safer way to npm install ✔

> ⚠️ You’re executing untrusted code every time you run `npm install`.

---

## 🚀 Try it in 5 seconds

```bash
npx safe-install express
```

---

## 👀 What actually happens during install

```bash
❌ shady-package → score: 85 → BLOCKED

- postinstall script detected
- published 2 hours ago
```

```bash

⚠ express → score: 55 → WARNING

- uses install scripts

```

```bash
✔ lodash → score: 10 → SAFE

```

---

## 🧠 Why this exists

Most developers don’t realize:

- `npm install` can run arbitrary scripts
- packages can be compromised overnight
- malicious code can execute before you even import it

👉 **safe-install adds a checkpoint before install**

---

## ⚡ What it does

- 🔍 Detects install-time scripts (`postinstall`, `preinstall`)
- ⏱ Flags newly published packages
- 👤 Checks maintainer presence
- 🚫 Blocks high-risk installs
- ⚡ Runs instantly — no setup required

---

## 🛠 Usage

Scan Package

```bash
safe-install <package>
```

Scan & Install

```bash
safe-install -i <package>
```

Force Install (Not Recommended)

```bash
safe-install -f <package>
```

---

## ⚙️ Optional config

```json
{
  "threshold": "medium",
  "allow": ["lodash"],
  "blockScripts": true,
  "cacheTTL": 3600000
}
```

---

## 🔥 Why developers are using this

Because “just npm install it” is no longer safe.

---

## ⭐ If this made you think twice about `npm install`

Give it a star — it helps more developers stay safe.

---

## 🔐 Keywords

npm security, safe npm install, dependency scanner, package risk analysis, supply chain security, JavaScript security tool

---

## 📄 License

MIT
