/*
! 21. Generic + Union Types
    โจทย์ 21: ApiResult<T>

สร้าง Generic type สำหรับผลลัพธ์จาก API ที่มีได้ 2 สถานะ

- สำเร็จ → มี data
- ล้มเหลว → มี error

กำหนดให้ TypeScript บังคับว่า

ถ้า status === "success" ต้องมี data

ถ้า status === "error" ต้องมี error */

type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

/*
! 22. Generic + Intersection Types

สร้าง Generic type: WithTimestamp<T>

เพื่อให้สามารถเพิ่ม
createdAt: Date
updatedAt: Date
 */

type User = {
  id: number;
  name: string;
  email: string;
  age: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type WithTimestamp<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

/*
 ! 23. Conditional Types ⭐ 
โจทย์ 23: IdType<T>

สร้าง Generic type: IdType<T>
 */

type IdType<T extends Record<"id", unknown>> = T["id"] extends number
  ? number
  : string;

type UserId = IdType<User>;

/*
! 24. infer ⭐⭐⭐
 ExtractData<T>   ที่สามารถ ดึง type ที่อยู่ข้างใน data ออกมา

 เป้าหมาย:
 */
type ApiResponse<T> = {
  data: T;
};

type ExtractData<T> = T extends ApiResponse<infer L> ? L : never;

// ? ดังนั้น infer มีประโยชน์มากกับพวก type ที่มีโครงสร้างซ้อนอยู่
// ? เช่น API response, Promise, function, array ฯลฯ

/*
! ⭐⭐⭐ Exercise 25 — Mapped Types

ข้อนี้สำคัญมาก เพราะ Mapped Types จะเริ่มทำให้เห็นว่า TypeScript สามารถ 
สร้าง type ใหม่จาก type เดิมแบบอัตโนมัติ ได้อย่างไร 

type User = {
  id: number;
  name: string;
  email: string;
};

โดยมีเงื่อนไขว่า:
ทุก property ของ T ต้องกลายเป็น optional
*/

type Optional<T> = { [K in keyof T]?: T[K] };

type OptionalUser = Optional<User>;
/* 
? ใช้ 3 concepts พร้อมกัน:
keyof T   // เอา keys

[K in ...] // วน keys

T[K]      // เอา type ของ property

*/

/* 
! ⭐⭐⭐ Exercise 26 — Template Literal Types

ข้อนี้จะเริ่มเห็นว่า TypeScript สามารถ สร้าง String Type ใหม่จาก String Literal Types ได้
*/

type EventTwo = "click" | "change" | "submit";

type EventHandler<T extends string> = `on${Capitalize<T>}`;

/*
!  26 — Generic + Partial<T>

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};
*/

type PartialType<T> = Partial<T>;

function updateUser(id: number, dataToUpdate: Partial<User>) {
  // logic
}

/* 
  ! 27. Generic + Pick<T, K> 

  เลือกเฉพาะ K
  */

type PickType<T, K extends keyof T> = Pick<T, K>;

/* 
!  28. Generic + Omit<T, K>

เอา K ออก

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type PublicUser = OmitType<User, "password">;
เอา K ออก
*/

type OmitType<T, K extends keyof T> = Omit<T, K>;

/*
!   29. Generic API Client ⭐⭐⭐⭐  */

async function getAll<T>(url: string): Promise<T[]> {
  const response = await fetch(`${url}`, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

async function getById<T>(url: string, id: string): Promise<T> {
  const response = await fetch(`${url}/${id}`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

async function create<T>(url: string, body: Omit<T, "id">): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

async function update<T>(
  url: string,
  id: string,
  body: Partial<Omit<T, "id">>,
): Promise<T> {
  const response = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
}

async function deleteMethod(url: string, id: string): Promise<void> {
  await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

/*
! ⭐⭐⭐⭐⭐ Exercise 30 — Generic Data Table / Form System

เป้าหมายคือสร้างระบบที่สามารถใช้กับข้อมูลหลายประเภท โดย ไม่ต้องเขียน Table component ใหม่ทุกครั้ง */

// Part 1 — Generic Table
type Column<T> = {
  name: keyof T;
  lable: string;
};

// Part 2 — เอา Column ไปอ่านข้อมูล ⭐⭐⭐⭐
function getValue<T>(data: T, key: keyof T) {
  return data[key];
}

// Part 3 — Generic Data Table
const columns: Column<Product>[] = [
  {
    lable: "id",
    name: "id",
  },
  {
    lable: "name",
    name: "name",
  },
  {
    lable: "price",
    name: "price",
  },
];

// Part 4 — Generic Form ⭐⭐⭐⭐⭐
type FormField<T> = {
  name: keyof T;
  label: string;
}[];

export const userFields: FormField<User> = [
  { name: "name", label: "name" },
  { name: "email", label: "email" },
  { name: "age", label: "age" },
];

// Part 5 — ⭐⭐⭐⭐⭐ Form Value
function setFieldValue<T, K extends keyof T>(data: T, key: K, value: T[K]) {
  return [
    {
      data,
      key,
      value,
    },
  ];
}
