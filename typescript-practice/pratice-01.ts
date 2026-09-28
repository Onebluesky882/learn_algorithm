// 1. Identity Function
// สร้าง Generic function ที่รับค่าอะไรก็ได้ และคืนค่าชนิดเดิมกลับมา

function value<T>(value: T): T {
  return value
}

// 2. Generic Array
//    สร้าง Generic function ที่รับ Array และคืนค่า element ตัวแรก

function valueArray<T>(value: T[]): T {
  return value[0]
}

/* 
3. Generic Object
   สร้าง Generic function ที่รับ Object หรือ value ใด ๆ และแสดงข้อมูลออกทาง console.log
*/
function GenericObject<T>(any: T) {
  return console.log(any);
}


/* 
4. กำหนด Property ด้วย Generic
   สร้าง Generic function ที่รับ Object ซึ่งต้องมี property name และคืนค่า name
*/

function GenericProps<T>({ name }: { name: T }) {
  return name
}


/* 
5. Generic extends
   ใช้ extends กำหนดว่า Generic T ต้องมี name: string และทดลองส่ง Object ที่มีและไม่มี name
*/
type User = {
  name: string;
}
function genericExtends<T extends User>(name: T) {
  return name
}

// T จะเป็น type อะไรก็ได้ แต่ต้องมีคุณสมบัติตาม User

/* 
6. Generic Record
   ใช้ T extends Record<string, unknown> เพื่อสร้าง function ที่รับเฉพาะ Object
*/
function GenericRecord<T extends Record<string, unknown>>(user: T) {
  return user
}

/* 
! จุดที่ควรจำ

ข้อ 5 = Object ต้องมี name
ข้อ 6 = ขอแค่เป็น Object ที่มี key เป็น string ก็พอ

Record<string, unknown>

        ↓

Object ที่มี key เป็น string

และ value เป็น unknown
*/


/* 
7. Generic Key
   สร้าง function ที่รับ Object และชื่อ property โดยชื่อ property ต้องเป็น key ที่มีอยู่จริงใน Object นั้น
*/

function GenericKey<T extends User, K extends keyof T>(object: T, key: K) {
  return object[key]
}

/* 
K extends keyof T  แปลว่า K ต้องเป็น key ที่มีอยู่จริงใน T
*/



/* 
8. Generic Type Alias
   สร้าง ApiResponse<T> ที่สามารถเก็บ data ได้หลายรูปแบบ เช่น User, Product, หรือ Array
*/

type ApiResponse<T> = {
  data: T
}

/* 
9. Generic Form Props
   สร้าง FormProps<T> ที่มี data และ onSubmit โดย data และ parameter ของ onSubmit ต้องเป็น type เดียวกัน
*/

type FormProps<T> = {
  data: T
  onSubmi: (data: T) => void
}

/* 
10. Generic FieldConfig
    สร้าง FieldConfig<T> สำหรับ Form โดย name ต้องรับเฉพาะ property ที่มีอยู่ใน T เช่น UserForm มี name, age, email ก็ห้ามใส่ "banana"
*/
type UserForm = {
  name: string
  age: string
  email: string
}

type FieldConfig<T extends UserForm> = {
  name: keyof T
  lable: string
  placeHoder: string
}