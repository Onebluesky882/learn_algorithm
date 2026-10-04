DI = Dependency Injection

DI = ส่ง dependency เข้ามา

1. Abstraction

คือการ ซ่อน implementation ที่ไม่จำเป็นต้องรู้

```typescript
interface UserRepository {
  findAll(): Promise<User[]>;
}
```

Service รู้แค่ว่า:

“ฉันมี repository ที่สามารถ findAll() ได้”

ไม่จำเป็นต้องรู้ว่าใช้:
Drizzle
SQLite
Postgres
D1
Prisma

UserService
↓
UserRepository
↓
DB

------------- \* -------------
Dependency Injection = เราไม่สร้างของที่ต้องใช้ข้างในเอง แต่ให้ข้างนอกเอามาให้

สมมติ UserService ต้องใช้ Database

เราไม่ให้ UserService สร้าง Database แต่ เอา Database ส่งเข้าไป

```typescript
class UserService {
  constructor(private db: Database) {}

  getUsers() {
    return this.db.getUsers();
  }
}

const repository = new UserRepository(db);

const userService = new UserService(repository);
```

การใช้ DI เตรียมของให้พ่อครัว: Kitchen เตา, หม้อ ,วัตถุดิบ

พ่อครัวแค่บอก: require

```typescript
class UserService {
  constructor(private repository: UserRepository) {}

  getUsers() {
    return this.repository.findAll();
  }
}
```

“ฉันต้องใช้เตาและวัตถุดิบ” แล้วคนข้างนอกเอามาให้ นี่คือ DI

------------- \* -------------
Abstraction บอกว่า:

“Payment ต้องทำอะไรได้”

DI บอกว่า:

“เอา Payment ตัวนี้มาให้ OrderService”

------------- สรุป -------------
Concept หน้าที่ คำถาม
Abstraction ซ่อนรายละเอียด WHAT?
DI ส่ง dependency เข้าไป HOW?
Implementation ตัวที่ทำงานจริง HOW EXACTLY?

และจำประโยคนี้ไว้ได้เลย: Abstraction คือ “กำหนดสิ่งที่ต้องการ” ส่วน DI คือ “เอาสิ่งนั้นมาใส่ให้”
