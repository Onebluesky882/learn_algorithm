Generic Round 3 — Advanced

สั่ง TypeScript ให้สร้าง Type ใหม่จาก Type เดิม

21. Generic + Union Types
    โจทย์ 21: ApiResult<T>

สร้าง Generic type สำหรับผลลัพธ์จาก API ที่มีได้ 2 สถานะ

- สำเร็จ → มี data
- ล้มเหลว → มี error

กำหนดให้ TypeScript บังคับว่า

ถ้า status === "success" ต้องมี data

ถ้า status === "error" ต้องมี error

22. Generic + Intersection Types

กำหนดให้ TypeScript บังคับว่า

ถ้า status === "success" ต้องมี data

ถ้า status === "error" ต้องมี error

type User = {

id: number

name: string

}

type Product = {

id: number

price: number

}

สร้าง Generic type: WithTimestamp<T>

เพื่อให้สามารถเพิ่ม
createdAt: Date

updatedAt: Date

23. Conditional Types ⭐
    โจทย์ 23: IdType<T>

สร้าง Generic type: IdType<T>

24. infer ⭐⭐⭐

25. Mapped Types ⭐⭐⭐

26. Generic + Partial<T>

    26.1 Exercise 26 — Template Literal Types

27. Generic + Pick<T, K>

28. Generic + Omit<T, K>

29. Generic API Client ⭐⭐⭐⭐

30. Generic Data Table / Form System ⭐⭐⭐⭐⭐

โดยเฉพาะ 23–28 สำคัญมาก เพราะจะเริ่มเห็นว่า TypeScript สามารถ สร้าง Type จาก Type อื่น ได้
