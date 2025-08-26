## Tài liệu Kế hoạch kiểm thử (Test Plan) & Trường hợp kiểm thử (Test Cases)

### Màn hình Quản lý Bàn/Khu vực (Table/Area Management Screen)


### 1. Kế hoạch kiểm thử (Test Plan)

* **1.1. Mục đích và Phạm vi kiểm thử (Purpose and Scope)**
  * **Mục đích:** Đảm bảo màn hình Quản lý Bàn/Khu vực của hệ thống POS hoạt động đúng theo các yêu cầu chức năng (FRS) và phi chức năng (URS), cung cấp trải nghiệm người dùng ổn định và đáng tin cậy.
  * **Phạm vi:** Kiểm thử toàn bộ các chức năng và tương tác trên màn hình Quản lý Bàn/Khu vực, bao gồm:
    * Hiển thị trạng thái và thông tin bàn theo khu vực.
    * Tương tác để mở/chỉnh sửa đơn hàng.
    * Các chức năng quản lý bàn: Chuyển, Gộp, Tách, In tạm tính.
    * Chức năng tìm kiếm bàn/đơn hàng.
    * Hiển thị thông tin tổng quan và danh sách đơn hàng chờ.
    * Kiểm thử giao diện người dùng (UI) và trải nghiệm người dùng (UX) liên quan đến màn hình này.
  * **Ngoài phạm vi (Out of Scope):**
    * Kiểm thử các module khác của hệ thống POS (ví dụ: màn hình chi tiết món ăn, màn hình thanh toán, quản lý kho, báo cáo tổng hợp) trừ khi chúng ảnh hưởng trực tiếp đến chức năng của màn hình quản lý bàn.
    * Kiểm thử hiệu năng chuyên sâu dưới tải cực lớn (stress testing), trừ khi được yêu cầu cụ thể.
* **1.2. Các loại hình kiểm thử (Test Types)**
  * **Kiểm thử chức năng (Functional Testing):** Xác minh từng chức năng hoạt động đúng theo FRS.
  * **Kiểm thử giao diện người dùng (UI Testing):** Đảm bảo giao diện hiển thị chính xác, đẹp mắt và dễ sử dụng.
  * **Kiểm thử tích hợp (Integration Testing):** Xác minh tương tác giữa màn hình quản lý bàn và các module khác (ví dụ: màn hình order, máy in).
  * **Kiểm thử khả năng sử dụng (Usability Testing):** Đánh giá mức độ dễ sử dụng, hiệu quả của giao diện.
  * **Kiểm thử hồi quy (Regression Testing):** Đảm bảo các thay đổi không ảnh hưởng đến các chức năng đã có.
  * **Kiểm thử bảo mật (Security Testing):** Đảm bảo phân quyền và truy cập dữ liệu được bảo vệ.
* **1.3. Tiêu chí vào/ra (Entry/Exit Criteria)**
  * **Tiêu chí vào (Entry Criteria):**
    * URS và FRS của màn hình Quản lý Bàn đã được phê duyệt.
    * Môi trường kiểm thử đã được thiết lập.
    * Phiên bản build phần mềm đã sẵn sàng để kiểm thử.
    * Đội ngũ kiểm thử đã được đào tạo và hiểu rõ yêu cầu.
  * **Tiêu chí ra (Exit Criteria):**
    * Tất cả các trường hợp kiểm thử chức năng và UI mức độ nghiêm trọng cao đã được thực hiện và đạt (Pass).
    * Số lượng lỗi nghiêm trọng (Critical/High) bằng 0.
    * Số lượng lỗi trung bình (Medium) dưới ngưỡng cho phép (ví dụ: < 5 lỗi).
    * Tất cả các lỗi đã được ghi nhận, ưu tiên và theo dõi.
    * Đội ngũ quản lý dự án đã phê duyệt bản kiểm thử.
* **1.4. Môi trường kiểm thử (Test Environment)**
  * **Hệ điều hành:** Windows 10/11, macOS (nếu ứng dụng chạy trên Mac), Android/iOS (nếu là tablet POS).
  * **Phần cứng:** Máy POS cảm ứng (độ phân giải tối thiểu 1024x768), máy tính bàn/laptop.
  * **Thiết bị ngoại vi:** Máy in hóa đơn nhiệt (kết nối LAN/USB/Bluetooth), đầu đọc mã vạch (nếu có tích hợp).
  * **Cơ sở dữ liệu:** Môi trường Database riêng cho kiểm thử, chứa dữ liệu mẫu (món ăn, bàn, đơn hàng).
  * **Mạng:** Đảm bảo kết nối mạng ổn định cho các chức năng liên quan đến server/cloud.
* **1.5. Vai trò và Trách nhiệm (Roles and Responsibilities)**
  * **Test Lead/Manager:** Lập kế hoạch, quản lý tiến độ, phê duyệt kết quả.
  * **Test Engineer/QA:** Viết test cases, thực hiện kiểm thử, ghi nhận lỗi.
  * **Developer:** Sửa lỗi, cung cấp bản build.
  * **Business Analyst (BA):** Giải đáp thắc mắc về yêu cầu, xác nhận lỗi.
* **1.6. Công cụ kiểm thử (Test Tools)**
  * **Quản lý Test Cases/Lỗi:** Jira, Trello, Azure DevOps, TestLink, Excel.
  * **Kiểm thử tự động (nếu có):** Selenium, Appium (cho mobile), Cypress, Playwright.
* **1.7. Kế hoạch lịch trình (Test Schedule)**
  * [Ngày bắt đầu kiểm thử] - [Ngày kết thúc kiểm thử]
  * [Liệt kê các giai đoạn kiểm thử cụ thể: Ví dụ: Kiểm thử Chức năng (tuần 1), Kiểm thử Tích hợp (tuần 2), Hồi quy & UAT (tuần 3)]

---

### 2. Trường hợp kiểm thử (Test Cases)

Dưới đây là một số trường hợp kiểm thử mẫu, dựa trên các chức năng đã phân tích. Mỗi chức năng sẽ có nhiều test cases khác nhau để kiểm tra các kịch bản thành công, thất bại và các trường hợp biên.

**Format cho mỗi Test Case:**

* **TC ID:** [Mã định danh duy nhất]
* **Mô tả:** [Tóm tắt mục đích kiểm thử]
* **Chức năng liên quan:** [Tham chiếu đến FR-XX.X]
* **Điều kiện tiên quyết:** [Các điều kiện cần thiết trước khi thực hiện TC]
* **Các bước thực hiện:**
  1. [Bước 1]
  2. [Bước 2]
  3. [Tiếp tục...]
* **Dữ liệu đầu vào:** [Thông tin cụ thể cần thiết cho TC, ví dụ: mã bàn, số lượng món]
* **Kết quả mong đợi:** [Hành vi chính xác của hệ thống sau khi thực hiện các bước]
* **Trạng thái:** [Pass/Fail/Blocked]
* **Ghi chú:** [Thêm thông tin cần thiết]

---

#### 2.1. Kiểm thử chức năng: Hiển thị tổng quan trạng thái bàn

* **TC ID:** TM_UI_001
* **Mô tả:** Kiểm tra hiển thị trạng thái bàn trống (màu xanh lá cây).
* **Chức năng liên quan:** FR-01.2
* **Điều kiện tiên quyết:** Tất cả các bàn ban đầu đều trống.
* **Các bước thực hiện:**
  1. Đăng nhập vào hệ thống POS với vai trò "Phục vụ".
  2. Truy cập màn hình "Quản lý Bàn".
* **Dữ liệu đầu vào:** N/A
* **Kết quả mong đợi:**
  * Tất cả các ô bàn trên màn hình đều hiển thị màu xanh lá cây.
  * Thông tin tên bàn/mã bàn hiển thị chính xác.
  * Không có thông tin tổng tiền tạm tính hoặc số khách được hiển thị trên các bàn trống.
* **Trạng thái:**
* **TC ID:** TM_UI_002
* **Mô tả:** Kiểm tra hiển thị trạng thái bàn đang phục vụ (màu đỏ) với thông tin tóm tắt.
* **Chức năng liên quan:** FR-01.2
* **Điều kiện tiên quyết:** Có ít nhất một bàn (ví dụ: GLA01) đang có đơn hàng với 2 khách và tổng tiền tạm tính là 150,000 VNĐ.
* **Các bước thực hiện:**
  1. Đăng nhập vào hệ thống POS với vai trò "Phục vụ".
  2. Truy cập màn hình "Quản lý Bàn".
* **Dữ liệu đầu vào:** Bàn GLA01 (2 khách, 150,000 VNĐ).
* **Kết quả mong đợi:**
  * Ô bàn GLA01 hiển thị màu đỏ.
  * Trên ô GLA01 hiển thị số lượng khách là "2".
  * Trên ô GLA01 hiển thị tổng tiền tạm tính là "150,000".
  * Thời gian order/khách ngồi (nếu có) hiển thị chính xác.
* **Trạng thái:**

---

#### 2.2. Kiểm thử chức năng: Lọc bàn theo khu vực

* **TC ID:** TM_FILT_001
* **Mô tả:** Kiểm tra lọc bàn theo "Khu A".
* **Chức năng liên quan:** FR-01.1
* **Điều kiện tiên quyết:** Có các bàn ở các khu vực khác nhau (Khu A, Khu B, Khu C).
* **Các bước thực hiện:**
  1. Trên màn hình Quản lý Bàn, click vào tab/nút "Khu A".
* **Dữ liệu đầu vào:** Chọn "Khu A".
* **Kết quả mong đợi:** Chỉ các bàn có tiền tố "GLA" (ví dụ: GLA01, GLA02,...) được hiển thị. Các bàn từ khu vực khác không hiển thị.
* **Trạng thái:**

---

#### 2.3. Kiểm thử chức năng: Mở/Chỉnh sửa đơn hàng

* **TC ID:** TM_ORDER_001
* **Mô tả:** Mở đơn hàng mới cho bàn trống.
* **Chức năng liên quan:** FR-02.1
* **Điều kiện tiên quyết:** Bàn GLC05 đang trống.
* **Các bước thực hiện:**
  1. Trên màn hình Quản lý Bàn, click vào ô bàn "GLC05".
* **Dữ liệu đầu vào:** Click bàn GLC05.
* **Kết quả mong đợi:**
  * Hệ thống chuyển hướng sang màn hình chi tiết đơn hàng.
  * Màn hình chi tiết đơn hàng hiển thị trống, sẵn sàng cho việc chọn món.
  * Ô bàn GLC05 trên màn hình Quản lý Bàn chuyển sang màu đỏ (hoặc màu "đang phục vụ").
* **Trạng thái:**

---

#### 2.4. Kiểm thử chức năng: Gộp bàn

* **TC ID:** TM_MERGE_001
* **Mô tả:** Gộp hai bàn đang phục vụ thành một.
* **Chức năng liên quan:** FR-02.2
* **Điều kiện tiên quyết:** Bàn GLB01 có đơn hàng A (2 món, 100k) và GLB02 có đơn hàng B (3 món, 150k).
* **Các bước thực hiện:**
  1. Trên màn hình Quản lý Bàn, chọn bàn "GLB01" và bàn "GLB02".
  2. Click nút "Gộp bàn".
  3. Xác nhận thao tác gộp (nếu có hộp thoại xác nhận).
* **Dữ liệu đầu vào:** Chọn GLB01, GLB02.
* **Kết quả mong đợi:**
  * Bàn GLB01 và GLB02 chuyển về trạng thái trống (màu xanh lá cây).
  * Một bàn mới (hoặc bàn đích được chọn) hiển thị đơn hàng chứa tất cả 5 món (tổng 250k) từ cả hai đơn hàng cũ.
  * Không có dữ liệu bị mất hoặc sai lệch.
* **Trạng thái:**
