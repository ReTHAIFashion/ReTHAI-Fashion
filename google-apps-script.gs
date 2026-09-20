/**
 * ReTHAI Fashion — สคริปต์เชื่อมต่อออเดอร์จากเว็บไซต์เข้า Google Sheet
 *
 * วิธีติดตั้ง:
 * 1. เปิด Google Sheet ที่จะใช้เก็บออเดอร์ (สร้างใหม่ก็ได้)
 * 2. เมนูด้านบน: ส่วนขยาย (Extensions) > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดนี้แทน
 * 4. กด Deploy > New deployment
 *      - Select type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. กด Deploy แล้วคัดลอก "Web app URL" ที่ได้
 * 6. นำ URL ไปวางแทนที่ GOOGLE_SCRIPT_URL ในไฟล์ index.html (ในส่วน <script> ท้ายไฟล์)
 * 7. ทดสอบสั่งซื้อจากหน้าเว็บ แล้วเช็คว่าแถวใหม่ขึ้นใน Sheet
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // ถ้าเป็นแถวแรกของชีต ให้ใส่หัวตารางก่อน
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Order ID", "วันที่", "ชื่อลูกค้า", "ที่อยู่", "เบอร์โทร", "สินค้า","จำนวน","ยอดรวม","สถานะชำระเงิน","สถานะจัดส่ง","ลิงก์สลิป","หมายเหตุ"]);
    }

    var data = JSON.parse(e.postData.contents);

   sheet.appendRow([
  "ORD" + new Date().getTime(), // Order ID
  data.timestamp,              // วันที่
  data.name,                   // ชื่อลูกค้า
  data.address,                // ที่อยู่
  data.phone,                  // เบอร์โทร
  data.product,                // สินค้า
  1,                           // จำนวน
  data.price,                  // ยอดรวม
  "รอชำระเงิน",                // สถานะชำระเงิน
  "รอจัดส่ง",                  // สถานะจัดส่ง
  "",                          // ลิงก์สลิป
  data.note                    // หมายเหตุ
]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
