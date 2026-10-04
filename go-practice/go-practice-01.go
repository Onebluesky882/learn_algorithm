package main

import (
	"context"
	"fmt"
	"net/http"
	"sync"
	"time"
)

type PairResult[T any, U any] struct {
	First  T
	Second U
}

func Pair[T any, U any](first T, second U) PairResult[T, U] {
	return PairResult[T, U]{
		First:  first,
		Second: second,
	}
}

// * Go Concurrency — Exercises 21–35

/*  ข้อ 21 — Goroutine ⭐

เป้าหมาย

ทำความเข้าใจการใช้ go เพื่อให้ function ทำงานแบบ concurrent

*/

func printNumber(n int) {

	for i := 1; i <= n; i++ {
		fmt.Printf("Number : %d \n", i)
	}

}

/*
* Exercise 22 — Multiple Goroutine
เป้าหมาย: เข้าใจว่าเราสามารถสร้าง Goroutine หลายตัวให้ทำงานพร้อมกันได้

* 23 WaitGroup
wg.Add()
   ↓
go func()
   ↓
defer wg.Done()
   ↓
ทำงาน
   ↓
wg.Wait()
*/

func workerWaitGroup(n int) {
	var wg sync.WaitGroup

	wg.Add(n)

	for i := 1; i <= n; i++ {
		go func() {
			defer wg.Done()
			fmt.Printf("worker : %d , job : %d \n", i, n)
		}()

	}
	wg.Wait()

}

/*
* Exercise 24 — Channel

เรียนรู้การส่งข้อมูลจาก goroutine → channel → main

โจทย์:
1. สร้าง channel สำหรับ int
2. สร้าง goroutine
3. ให้ goroutine ส่งเลข 1–5 เข้า channel
4. main รับค่าจาก channel แล้ว fmt.Println()
5. ใช้ close(channel) เมื่อส่งข้อมูลครบ
6. ยังไม่ใช้ WaitGroup


wg.Add() = ฉันเพิ่มงานที่ต้องรอ
wg.Done() = งานของฉันเสร็จแล้ว
wg.Wait() = รอจนทุกงานเสร็จ
defer wg.Done() = กันลืมบอกว่างานเสร็จ
*/

func chanelSimple() []int {
	var wg sync.WaitGroup

	ch := make(chan int)
	var result []int

	wg.Add(5)
	for i := 1; i <= 5; i++ {
		go func() {
			defer wg.Done()
			ch <- i
		}()
	}
	go func() {
		wg.Wait()
		close(ch)
	}()

	for value := range ch {
		result = append(result, value)
	}
	return result
}

/*
* Exercise 25 — Goroutine + Channel

ให้ทำงานดังนี้:

1. สร้าง channel สำหรับส่ง int
2. สร้าง Goroutine จำนวน 5 ตัว
3. Goroutine แต่ละตัวส่งเลข 1–5 เข้า channel
4. Main goroutine รับค่าจาก channel
5. เก็บค่าที่รับได้ลง []int
6. คืนค่า []int

              ┌→ Worker 1 ─┐

Jobs → Channel├→ Worker 2 ─┼→ Results

              ├→ Worker 3 ─┤

              └→ Worker 4 ─┘

						Send → Channel → Receive
*/

func processNumbers() []int {
	ch := make(chan int)
	worker := 5
	var result []int
	// sender
	for i := 1; i <= worker; i++ {
		go func() {
			ch <- i
		}()
	}

	// Receiver
	for i := 0; i < worker; i++ {
		value := <-ch
		result = append(result, value)
	}

	return result
}

/*
* Exercise 26 — Buffered Channel
? ch := make(chan int) ?? ch := make(chan int, 5)

โดยมีเงื่อนไข:

* สร้าง Buffered Channel ความจุ 5
* ส่งตัวเลข 1–5 เข้า channel
* ยังไม่ต้องใช้ goroutine
* จากนั้นรับค่าจาก channel 5 ครั้ง
* เก็บลง result
* return result
* ยังไม่ต้องใช้ close()

         Buffered Channel

        ┌─────────────────────┐

Sender →│  1 │  2 │  3 │  4 │  5 │→ Receiver

        └─────────────────────┘

             capacity = 5
*/

func bufferedNumbers() []int {
	var result []int
	capacity := 5
	ch := make(chan int, capacity)
	// sender
	for i := 1; i <= capacity; i++ {
		ch <- i
	}

	// receiver
	for i := 0; i < capacity; i++ {
		value := <-ch
		result = append(result, value)
	}
	return result
}

/*
*Exercise 27 — Close + Range

close(channel) + range channel

ให้ทำงานดังนี้:

1. สร้าง channel แบบ unbuffered
2. สร้าง Goroutine 1 ตัว เป็น Sender
3. Sender ส่งเลข 1–5 เข้า channel
4. เมื่อส่งครบแล้ว ให้ ปิด channel
5. Main goroutine ใช้ range รับค่าจาก channel
6. เก็บค่าลง result
7. return result

! close(ch) ต้องทำโดย Sender ในกรณีนี้ เพราะ Sender เป็นคนรู้ว่า:
* “ฉันส่งข้อมูลหมดแล้ว”
* The sender should close the channel.
*/

func generateNumbers() []int {
	var result []int
	ch := make(chan int)

	// sender
	go func() {
		for i := 1; i <= 5; i++ {
			ch <- i
		}
		close(ch)
	}()

	for value := range ch {
		result = append(result, value)
	}

	return result
}

//  Exercise 28 — Producer / Consumer
/*
Producer

สร้าง Goroutine 1 ตัว ทำหน้าที่:

* สร้างเลข 1–10
* ส่งเข้า jobs channel
* ส่งครบแล้ว close(jobs)

Consumer

Main goroutine:

* อ่านค่าจาก jobs ด้วย range
* คำนวณ value * 2
* เก็บผลลัพธ์ลง result
* return result
*/

func processNumbersT() []int {
	var result []int
	ch := make(chan int)

	go func() {
		for i := 1; i <= 10; i++ {
			ch <- i
		}
		close(ch)
	}()

	for value := range ch {
		multi := value * 2
		result = append(result, multi)
	}
	return result
}

/*
 * Exercise 29 — Worker Pool ⭐⭐⭐⭐⭐
 ตอนนี้เราจะเอา Producer → Channel → Consumer ที่ทำมาในข้อ 28 มาต่อยอดเป็น Worker Pool
             ┌─ Worker 1 ─┐
Jobs ───────►├─ Worker 2 ─┼──► Results
             └─ Worker 3 ─┘


						 เงื่อนไข:

1. มี jobs ทั้งหมด 1–10
2. มี worker 3 ตัว
3. สร้าง channel jobs
4. สร้าง channel results
5. สร้าง worker 3 goroutines
6. Worker แต่ละตัว:
    * รับค่าจาก jobs
    * คูณ 2
    * ส่งเข้า results
7. Producer ส่ง 1–10 เข้า jobs
8. Producer ต้อง close(jobs) หลังส่งครบ
9. main รับผลลัพธ์ทั้งหมด 10 ค่า
10. เก็บผลลัพธ์ใน []int
11. ยังไม่ต้องใช้ WaitGroup
12. ยังไม่ต้อง close(results)


Producer

   │

   │ 1 2 3 ... 10

   ▼

 chJob

   │

   ├──────► Worker 1

   ├──────► Worker 2

   └──────► Worker 3

                │

                ▼

            chResult

                │

                ▼

             result
*/

func workerPool() []int {
	chJob := make(chan int)
	chResult := make(chan int)
	worker := 3
	jobs := 10
	var result []int

	// producer ส่ง jobs เข้า channel แล้วปิด
	go func() {
		for i := 0; i < jobs; i++ {
			chJob <- i
		}
		close(chJob)
	}()

	// worker 3 คน ทำงาน และส่งงาน เข้า channel
	for i := 0; i < worker; i++ {

		go func() {
			for job := range chJob {
				chResult <- job * 2
			}
		}()
	}

	// received รับงาน ทั้งหมด จากใบงาน 10 ชุด
	for i := 0; i < jobs; i++ {
		value := <-chResult
		result = append(result, value)
	}

	return result
}

/*
* Exercise 30 — Worker Pool + Results ⭐⭐⭐⭐⭐
 */

func workerPoolResults() []int {
	var result []int

	worker := 3
	jobs := 10
	var wg sync.WaitGroup
	chJob := make(chan int)
	chResult := make(chan int)

	// producer ส่งงาน เข้า channel แล้วปิด
	go func() {
		for i := 1; i <= jobs; i++ {
			chJob <- i
		}
		close(chJob)
	}()

	// worker 3 คน รับงาน ส่งงาน
	wg.Add(worker)
	for i := 0; i < worker; i++ {
		go func() {
			defer wg.Done()
			for job := range chJob {
				chResult <- job * 2
			}
		}()
	}

	go func() {
		wg.Wait()
		close(chResult)
	}()

	for value := range chResult {
		result = append(result, value)
	}

	return result
}

// * Exercise 31 — HTTP Worker Pool ⭐⭐⭐⭐⭐

func httpWorkerPool() []string {
	urls := []string{
		"https://google.com",
		"https://facebook.com",
		"https://youtube.com",
		"https://yahoo.com",
		"https://www.kapook.com/",
	}
	var result []string

	worker := 3
	var wg sync.WaitGroup

	chJobs := make(chan string)
	chResult := make(chan string)
	// producer
	go func() {
		for i := 0; i < len(urls); i++ {
			chJobs <- urls[i]
		}
		close(chJobs)
	}()

	wg.Add(worker)
	for i := 0; i < worker; i++ {
		go func() {
			defer wg.Done()
			for job := range chJobs {
				res, err := http.Get(job)
				if err != nil {
					fmt.Printf("Error fetching %s: %v\n", job, err)
					continue
				}
				defer res.Body.Close()
				resultMessage := fmt.Sprintf("%s -> Status : %d", job, res.StatusCode)
				chResult <- resultMessage
			}
		}()
	}

	go func() {
		wg.Wait()
		close(chResult)
	}()

	for res := range chResult {
		fmt.Println("Successfully processed:", res)
		result = append(result, res)
	}
	return result
}

/*
* Exercise 32 — Concurrency Limit
 */

func concurrencyLimit() []int {
	jobs := 20
	var wg sync.WaitGroup
	var mu sync.Mutex

	sem := make(chan struct{}, 5)
	var result []int

	for i := 1; i <= jobs; i++ {
		wg.Add(1)
		go func(job int) {
			defer wg.Done()
			// จองสิทธิ์
			sem <- struct{}{}

			// คือสิทธิ์
			defer func() {
				<-sem
			}()

			mu.Lock()
			result = append(result, job*2)
			mu.Unlock()

		}(i)
	}

	func() {
		wg.Wait()
	}()

	return result
}

/*
! มีงานเยอะ และต้องการ จำนวน worker ที่แน่นอน ใช้ 31
? 31 Worker Pool
“ฉันมีคนงาน 5 คน และมีงาน 100 งาน → เอางานมากองไว้ใน queue แล้วให้คนงานหยิบไปทำ”

ดังนั้น Worker Pool เหมาะกับ:

* HTTP requests จำนวนมาก
* Process files
* Database jobs
* Image processing
* Queue processing
*/

/*
?32 Concurrency Limit
ฉันมี 20 งาน และต้องการสร้าง 20 goroutines แต่ห้ามทำพร้อมกันเกิน 5
20 goroutines

 ├── J1 ─┐
 ├── J2 ─┤
 ├── J3 ─┤  ← ทำงาน
 ├── J4 ─┤
 └── J5 ─┘

      │
      │ max 5
      ▼
   semaphore
      │
      ▼
 J6 J7 J8 ... รอ
*/

/*
? แล้ว Channel ต้องใช้ทุกครั้งไหม? ไม่ครับ

นี่คือเรื่องที่อยากให้คุณจำมากที่สุด

* Channel ไม่ใช่ “เครื่องมือ concurrency ทุกอย่าง”

31 = จำกัด “จำนวนคนงาน”
32 = จำกัด “จำนวนงานที่กำลังทำพร้อมกัน”
*/

/*
* Exercise 33 — Context
 */
func contextCancel() string {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	done := make(chan struct{})

	go func() {
		for {
			select {
			case <-ctx.Done():
				close(done)
				return
			default:
			}

		}
	}()
	time.Sleep(1 * time.Second)
	cancel()
	<-done
	return "Cancelled"
}

/*
	Exercise 33.1 — Cancel Long Running Job

User

	│
	│ เริ่มประมวลผล
	▼

Goroutine

	│
	├── อ่านข้อมูล
	├── ประมวลผล
	├── ประมวลผล
	├── ประมวลผล
	│
	│ User กดยกเลิก
	▼

Context Cancel

	│
	▼

หยุดงาน
*/
// func processFile(ctx context.Context) string {

// }

/*  Exercise 33.2 — HTTP Request Timeout

Your API

   │

   │ HTTP Request

   ▼

External API

   │

   │ ...ช้า...

   │

   ▼
	blank

*/
