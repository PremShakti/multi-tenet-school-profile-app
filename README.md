# 🏫 Multi-Tenant School Management App

A full-stack multi-tenant school info management app built with **Next.js 15+**, supporting **subdomain-based isolation** for each school. Admins can **add**, **edit**, and **view** school details. Built with a clean UI using **Tailwind CSS** + **ShadCN**, secure **JWT auth**, and **Zod validation** for solid form handling.

---

## 🧠 Features

- 🌐 **Subdomain Routing** – Each school is accessible via its own subdomain.
- 🔐 **JWT Authentication** – Protected `/admin` routes.
- ⚙️ **Admin Panel** – Add or update school information.
- 🧾 **Zod Validation** – Required fields with custom validation.
- 💄 **ShadCN UI** – Modern UI components.
- 🔔 **Sonner** – Smooth and accessible toast notifications.

---

## 📦 Tech Stack

- **Frontend**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + ShadCN
- **Form Handling**: React Hook Form + Zod
- **Notifications**: Sonner
- **Auth**: JWT (jsonwebtoken)
- **Database**: MongoDB via Mongoose
- **Subdomain Logic**: Edge Middleware
- **API**: RESTful (via `app/api`)

---

## 📁 Folder Structure

```
my-project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard page
│   ├
│   │          
│   ├
│   │        
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   ├── signup/route.ts
│       ├── school-info/route.ts       # GET school data
│       ├── update-school/route.ts     # PUT for school
│       ├──add-school/route.ts          #POST for add school
├── components/
│   ├── forms/
│   │   ├── SchoolForm.tsx             # Add/Edit School form
│   ├── ui/
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   ├── ToastProvider.tsx
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
├── constants/
│   ├── site.ts                        # Static site info
├── lib/
│   ├── db.ts                          # MongoDB connection
│   ├── auth.ts                        # JWT helpers
├── middleware.ts                     # Middleware for auth + subdomain
├── models/
│   ├── User.ts                        # Mongoose User model
│   └── School.ts                      # Mongoose School model
├── public/
│   ├── favicon.ico
├── styles/
│   ├── globals.css
├── .env.local                         # ENV variables
├── README.md
├── package.json
├── tsconfig.json
└── next.config.js

```

---

## 🔗 Subdomain Logic

Each school is accessed via its own subdomain:

```
school1.example.com → shows school1’s data
school2.example.com → shows school2’s data
```

The middleware reads the subdomain and injects it into cookies.

---

## 🔐 Authentication

JWT is used to protect the `/admin` route. Users must log in to access it. If no valid token is present, users are redirected to `/`.

Middleware handles this in `middleware.ts`:

```ts
if (pathname.startsWith("/admin")) {
  const token = request.cookies.get("token")?.value;
  if (!token || !jwt.verify(token, JWT_SECRET)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
```

---

## 📝 Forms

### Admin Form (Add / Edit School)

- Uses React Hook Form with Zod
- Allows POST for new school or PUT for updates
- Subdomain field is always required

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Input label="Subdomain" required {...form.register("subdomain")} />
    <Input label="Name" required {...form.register("name")} />
    <Textarea label="Description" required {...form.register("description")} />
    <Input label="Contact" required {...form.register("contact")} />
    <Button type="submit">{mode === "edit" ? "Update" : "Add"} School</Button>
  </form>
</Form>
```

---

## 📦 API Routes

- `GET /api/school-info?school=subdomain`
- `PUT /api/update-school` – for editing
- `POST /api/update-school` – for adding new
- `POST /api/register` – to register new users

---

## 🎨 UI Stack

- **ShadCN**: Stylish, accessible components
- **Sonner**: Toast notifications
- **Tailwind CSS**: Utility-first styling

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/school-multitenant-app
cd school-multitenant-app

npm install

# Add your .env.local
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret

npm run dev
```

Visit: `http://localhost:3000` or `http://subdomain.localhost:3000`

---

## 🙌 Credits

Crafted with ❤️ by Prem
