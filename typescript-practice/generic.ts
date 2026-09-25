// ปรกติ รับ เฉพาะ string
function identity(value: string) {
  return value
}

// รับได้หลาย type 
function identityGeneric<T>(value: T): T {
  return value
}

const a = identity('hello')
const b = identityGeneric(1234)
console.log(a);
console.log(b);


// extends
// T ต้องมีคุณสมบัติตามที่กำหนด
// T ต้องเป็น object ที่มี key เป็น string
// type FormProps<T extends Record<string, unknown>>
