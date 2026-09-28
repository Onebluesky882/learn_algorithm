ก่อนใช้ Generic ให้ถาม:

1.  Logic นี้ต้องใช้กับหลาย Type ไหม?
    ↓
    ใช่

2.  Logic ของแต่ละ Type เหมือนกันไหม?
    ↓
    ใช่

3.  ถ้าใช้ Generic แล้ว Type Safety ดีขึ้นไหม?
    ↓
    ใช่

```typescript
function getUser(user: User) {
  return user;
}

function getProduct(product: Product) {
  return product;
}

function getOrder(order: Order) {
  return order;
}
```

แล้ว extends, keyof, T[K] ใช้เมื่อไหร่?

ตรงนี้ให้คิดเป็นขั้น ๆ

1. Generic ธรรมดา

“ไม่รู้ว่า Type อะไร แต่ต้องการรักษา Type นั้นไว้”

```typescript
function identity<T>(value: T): T {
  return value;
}
```

2. extends

“ต้องเป็น Type ที่มีคุณสมบัติบางอย่าง”

```typescript
function getId<T extends { id: string }>(item: T) {
  return item.id;
}
```

3. keyof

“ต้องการให้เลือกเฉพาะ key ที่มีอยู่จริง”

```typescript
function getValue<T, K extends keyof T>(object: T, key: K) {
  return object[key];
}
```

4. T[K] “ฉันต้องการ Type ของ value ที่อยู่ใน key นั้น”

```typescript
function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```
