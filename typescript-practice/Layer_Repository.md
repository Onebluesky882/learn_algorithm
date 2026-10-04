Route
↓
Controller
↓
Service
↓
Repository
↓
Database (ล่างสุด)

หน้าที่ของ Repository คือ:

คุยกับ Database โดยตรง

Service ไม่ควรต้องรู้ว่า Database ใช้ Drizzle, Prisma, SQL หรืออะไร

```typescript

```

1. Repository Interface เรากำหนดว่า Repository ต้องทำอะไรได้บ้าง

```typescript
interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
```

เราบอกแค่ว่า:
UserRepository ต้องทำสิ่งเหล่านี้ได้
ยังไม่สนใจว่าจะใช้ Database อะไร

2. Repository Implementation

```typescript
class DrizzleUserRepository implements UserRepository {
  constructor(private db: DB) {}

  async findAll() {
    return this.db.select().from(users);
  }

  async findById(id: number) {
    // query database
  }

  async create(user: User) {
    // insert database
  }

  async update(id: number, data: Partial<User>) {
    // update database
  }

  async delete(id: number) {
    // delete database
  }
}
```

Implementation

UserRepository

      ↑

      │ implements
      |

DrizzleUserRepository

      ↓

Database

3. Service ใช้ Repository
   Service ไม่ควรเขียน SQL เอง

```typescript
class UserService {
  constructor(private repository: UserRepository) {}

  async getUsers() {
    return this.repository.findAll();
  }

  async getUser(id: number) {
    return this.repository.findById(id);
  }
}
```

4. DI ตอนสร้าง

ตรงนี้จะเห็น DI ชัดที่สุด:

```typescript
const repository = new DrizzleUserRepository(db);

const userService = new UserService(repository);
```

ภาพรวมทั้งหมด

                 HTTP
                  │
                  ▼
              Controller
                  │
                  ▼
               Service
                  │
                  ▼
          UserRepository
          (Abstraction)
                  │
                  ▼
     DrizzleUserRepository
        (Implementation)
                  │
                  ▼
              Database
