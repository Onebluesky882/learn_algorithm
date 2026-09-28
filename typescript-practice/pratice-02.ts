/* 
## ข้อ 11 — Multiple Generic <T, U>

สร้าง function ชื่อ pair ที่รับค่า 2 ตัว โดยแต่ละตัวสามารถมี type แตกต่างกันได้

pair("Tob", 36)

pair(100, "THB")

pair(true, "success")

ฝึก: Generic 2 ตัว <T, U>

*/

function pair<T, U>(user: T, detail: U) {
  return { user, detail }
}

/* 
<T, U>       → มี Generic 2 ตัว

user: T      → parameter ตัวแรกเป็น T

detail: U    → parameter ตัวที่สองเป็น U

[T, U]       → return เป็น Tuple

               ตัวแรก T

               ตัวสอง U

เพราะ function มี return value เพียง หนึ่งค่า
แต่เราสามารถเอาหลายค่ามารวมเป็นค่าเดียวด้วย Tuple:
*/


/* 

## ข้อ 12 — Default Generic <T = string>

สร้าง type ชื่อ Box<T> สำหรับเก็บค่า value

โดยถ้าไม่ได้ระบุ Generic ให้ T เป็น string โดยอัตโนมัติ

ต้องสามารถใช้งานได้ทั้ง:

Box
Box<number>
Box<boolean>
ฝึก: Default Generic

*/

type Box<T = string> = {
  value: T
}


/* 


## ข้อ 13 — Generic extends

สร้าง function ชื่อ getId ที่รับ object ซึ่งต้องมี property:
แต่ object สามารถมี property อื่นเพิ่มเติมได้
ต้องสามารถใช้กับ:

User
Product
Order

ได้ทั้งหมด

แต่ object ที่ไม่มี id ต้องไม่สามารถส่งเข้า function ได้

ฝึก: Generic Constraint ด้วย extends
*/
type Props = {
  id: string
}

function getId<T extends Props>(obj: T) {
  return obj.id
}



/* ## ข้อ 14 — keyof

สร้าง function ชื่อ getKey ที่รับ:

1. object
2. key ของ object

const user = {
name: "Tob",
age: 36,
email: "test@test.com"
}

getKey(user, "name")
getKey(user, "age")
getKey(user, "email")

แต่ต้องไม่อนุญาต:
getKey(user, "banana")

ฝึก: keyof T
 */
function getKey<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}


/* 
## ข้อ 15 — K extends keyof T

สร้าง function ชื่อ getValue

โดยต้องสามารถ:
getValue(user, "name")
getValue(user, "age")
getValue(user, "email")

และ key ต้องเป็น key ที่มีอยู่ใน object เท่านั้น

const user = {
name: "Tob",
age: 36,
email: "test@test.com"
}

getValue(user, "banana")

ฝึก: ความสัมพันธ์ระหว่าง T และ K
 */

function getValue<T, V extends keyof T>(obj: T, value: V) {
  return obj[value]

}
/* ## ข้อ 16 — T[K] ⭐

ต่อจากข้อ 15

ปรับ getValue ให้ TypeScript สามารถรู้ return type ตาม key ที่ส่งเข้าไป

ตัวอย่าง: const name = getValue(user, "name")

ควรได้ type: string

const age = getValue(user, "age")
ควรได้: number

ฝึก: Indexed Access Type T[K]
 */

function getValueReturnType<T, V extends keyof T>(obj: T, key: V) {
  return obj[key]
}
const user = {
  name: 'john',
  age: 36
}
const userName = getValueReturnType(user, 'name')
console.log(typeof userName);


/* ## ข้อ 17 — Generic Array

สร้าง functions:

first()
last()

ให้สามารถทำงานกับ Array ได้ทุก type

first([1, 2, 3])
first(["A", "B", "C"])

last([1, 2, 3])
last(["A", "B", "C"])

ต้องสามารถ infer type ของข้อมูลกลับมาได้ถูกต้อง

เงื่อนไข: ห้ามใช้ any

ฝึก: Generic + Array
 */

function first<T>(data: T[]) {
  return data[0]
}

function last<T>(data: T[]) {
  const last = data.length - 1
  return data[last]
}



/* ## ข้อ 18 — ApiResponse<T> ⭐

สร้าง Generic Type:
ApiResponse<T>

สำหรับ response จาก API

โดย response ต้องมีข้อมูลอย่างน้อย:

success
data
message

จากนั้นสร้าง model:
User
Product
Order

และสามารถใช้:
ApiResponse<User>
ApiResponse<Product>
ApiResponse<Order[]>

ฝึก: Generic Type Alias + API Design
 */
type ApiResponseTwo<T> = {
  success: boolean,
  data: T,
  message: string,
}
type UserTwo = {
  name: string,
  address: string
}

type Product = {
  code: string
  price: number
}
type Order = {
  total: number
  date: string
}


type UserResponse = ApiResponse<User>

type ProductResponse = ApiResponse<Product>

type OrderResponse = ApiResponse<Order[]>

/* ## ข้อ 19 — Generic Repository ⭐⭐⭐

Repository<T>

findAll()

findById()

create()

update()

delete ()

จากนั้นนำไปใช้กับ: User, Product, Order

โดยไม่ต้องสร้าง UserRepository, ProductRepository, OrderRepository ที่เขียน type ซ้ำกันทั้งหมด

ฝึก: Generic + Interface + Architecture
 */


type Repository<T> = {
  findAll: () => T[]

  findById: (id: string) => T

  create: (json: T) => T

  update: (data: T) => T

  delete: (data: T) => T
}




/* ## ข้อ 20 — Generic Form Builder ⭐⭐⭐⭐⭐

FieldConfig<T>

สำหรับกำหนด field ของ Form

type User = {
  name: string
  age: number
  email: string
}
ต้องสามารถสร้าง:
FieldConfig<User>

และกำหนด field: name, age, email

แต่: banana ต้องเกิด TypeScript Error

จากนั้นต่อยอดให้มี: label, name, type

{
  name: "email",
    label: "Email",
      type: "text"
}
 */

type UserFormTwo = {
  name: string
  age: string
  email: string
}

type FieldConfigTwo<T, K extends keyof T> = {
  name: K
  label: string
  type: string
}

/* 

!! T คือชื่อ type 

T = UserFormTwo 

keyof T

   ↓

"name" | "age" | "email"

K extends keyof T

   ↓

K = "name" | "age" | "email"

*/