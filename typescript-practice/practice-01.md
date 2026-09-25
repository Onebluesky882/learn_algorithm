Generic Type — แบบฝึกหัด 10 ข้อ

1. Identity Function
   สร้าง Generic function ที่รับค่าอะไรก็ได้ และคืนค่าชนิดเดิมกลับมา
2. Generic Array
   สร้าง Generic function ที่รับ Array และคืนค่า element ตัวแรก
3. Generic Object
   สร้าง Generic function ที่รับ Object หรือ value ใด ๆ และแสดงข้อมูลออกทาง console.log
4. กำหนด Property ด้วย Generic
   สร้าง Generic function ที่รับ Object ซึ่งต้องมี property name และคืนค่า name
5. Generic extends
   ใช้ extends กำหนดว่า Generic T ต้องมี name: string และทดลองส่ง Object ที่มีและไม่มี name
6. Generic Record
   ใช้ T extends Record<string, unknown> เพื่อสร้าง function ที่รับเฉพาะ Object
7. Generic Key
   สร้าง function ที่รับ Object และชื่อ property โดยชื่อ property ต้องเป็น key ที่มีอยู่จริงใน Object นั้น
8. Generic Type Alias
   สร้าง ApiResponse<T> ที่สามารถเก็บ data ได้หลายรูปแบบ เช่น User, Product, หรือ Array
9. Generic Form Props
   สร้าง FormProps<T> ที่มี data และ onSubmit โดย data และ parameter ของ onSubmit ต้องเป็น type เดียวกัน
10. Generic FieldConfig
    สร้าง FieldConfig<T> สำหรับ Form โดย name ต้องรับเฉพาะ property ที่มีอยู่ใน T เช่น UserForm มี name, age, email ก็ห้ามใส่ "banana"

ทำ ข้อ 1 → 10 ตามลำดับ เพราะแต่ละข้อจะต่อยอดจากข้อก่อนหน้าครับ.
