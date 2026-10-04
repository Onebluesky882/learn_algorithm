my-app/
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ ├── client.ts ← HTTP abstraction
│ │ │ ├── user.api.ts ← User API
│ │ │ ├── product.api.ts ← Product API
│ │ │ └── order.api.ts ← Order API
│ │ │
│ │ ├── hooks/
│ │ │ ├── useUsers.ts
│ │ │ └── useProducts.ts
│ │ │
│ │ ├── types/
│ │ │ ├── user.ts
│ │ │ └── product.ts
│ │ │
│ │ └── pages/
│ │ └── Users.tsx
│ │
│ └── ...
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ │ ├── user.route.ts
│ │ │ └── product.route.ts
│ │ │
│ │ ├── controllers/
│ │ │ ├── user.controller.ts
│ │ │ └── product.controller.ts
│ │ │
│ │ ├── services/
│ │ │ ├── user.service.ts
│ │ │ └── product.service.ts
│ │ │
│ │ ├── repositories/
│ │ │ ├── user.repository.ts
│ │ │ └── product.repository.ts
│ │ │
│ │ ├── schemas/
│ │ │ ├── user.schema.ts
│ │ │ └── product.schema.ts
│ │ │
│ │ └── db/
│ │ └── ...
│ │
│ └── ...
│
└── shared/
├── types/
│ ├── user.ts
│ ├── product.ts
│ └── api.ts
│
└── ...

                 FRONTEND
                    │
                    ▼
              React Component
                    │
                    ▼
               useUsers()
                    │
                    ▼
              user.api.ts
                    │
                    ▼
               client.ts
                    │
              ┌─────┴─────┐
              │   Axios   │
              └─────┬─────┘
                    │
                 HTTP
                    │
                    ▼
                 BACKEND
                    │
                    ▼
              user.route.ts
                    │
                    ▼
            user.controller.ts
                    │
                    ▼
             user.service.ts
                    │
                    ▼
          user.repository.ts
                    │
                    ▼
                  DB
