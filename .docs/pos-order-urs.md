## Tài liệu đặc tả yêu cầu người dùng (User Requirements Specification - URS)

### Màn hình Quản lý Bàn/Khu vực

### 1. Giới thiệu

Tài liệu này mô tả các yêu cầu chức năng và phi chức năng cho màn hình Quản lý Bàn/Khu vực của hệ thống POS trong nhà hàng/quán cafe. Màn hình này là giao diện chính để nhân viên theo dõi trạng thái các bàn, quản lý việc sắp xếp khách, tạo/chỉnh sửa đơn hàng và thực hiện các thao tác liên quan đến bàn ăn.

### 2. Phạm vi hệ thống

Màn hình Quản lý Bàn/Khu vực là một module cốt lõi của hệ thống POS, tập trung vào các chức năng sau:

* Hiển thị trạng thái và thông tin các bàn/khu vực.
* Cho phép người dùng tương tác với các bàn để thực hiện nghiệp vụ.
* Cung cấp tổng quan về tình hình kinh doanh hiện tại (đơn hàng, khách).
* Hỗ trợ tìm kiếm bàn và lọc theo khu vực.

---

### 3. Các Actor

| Actor                | Mô tả                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Thu ngân**  | Người thực hiện các giao dịch thanh toán, quản lý hóa đơn, áp dụng khuyến mãi.                                        |
| **Phục vụ**  | Người nhận order, sắp xếp khách, tương tác trực tiếp với các bàn để tạo/chỉnh sửa đơn hàng.                     |
| **Quản lý**  | Người giám sát hoạt động của nhà hàng, có thể xem tổng quan, điều chỉnh trạng thái bàn (nếu cần), xem báo cáo. |
| **Tiếp tân** | Người phụ trách đón khách, sắp xếp bàn cho khách, theo dõi trạng thái bàn.                                             |

Xuất sang Trang tính

---

### 4. Các Use Case (Trường hợp sử dụng)

Dưới đây là các Use Case cho màn hình Quản lý Bàn/Khu vực dựa trên hình ảnh bạn cung cấp:

#### 4.1. UC-01: Xem tổng quan trạng thái bàn

* **Actor chính:** Phục vụ, Thu ngân, Quản lý, Tiếp tân
* **Mô tả:** Người dùng xem tổng quan trạng thái của tất cả các bàn trong nhà hàng/quán cafe.
* **Luồng cơ bản:**
  1. Người dùng đăng nhập vào hệ thống và truy cập màn hình Quản lý Bàn.
  2. Hệ thống hiển thị danh sách các khu vực (ví dụ: "Khu A", "Khu B", "Khu C", "Phòng họp VIP", "Convention") dưới dạng tab hoặc nút chọn.
  3. Trong mỗi khu vực, hệ thống hiển thị các ô đại diện cho từng bàn (ví dụ: GLA01, GLB01, GLC01).
  4. Mỗi ô bàn hiển thị trạng thái hiện tại của bàn bằng màu sắc và/hoặc biểu tượng (ví dụ: màu xanh lá cây cho bàn trống, màu đỏ cho bàn đang phục vụ/chờ thanh toán, màu vàng cho bàn chờ gộp/tách).
  5. Đối với bàn có khách, ô bàn hiển thị thông tin tóm tắt như số khách, tổng tiền tạm tính, thời gian order hoặc thời gian khách ngồi.
* **Điều kiện tiên quyết:** Người dùng đã đăng nhập vào hệ thống.
* **Điều kiện sau cùng:** Người dùng có cái nhìn tổng quan về tình hình sử dụng bàn.

#### 4.2. UC-02: Lọc bàn theo khu vực

* **Actor chính:** Phục vụ, Thu ngân, Quản lý, Tiếp tân
* **Mô tả:** Người dùng lọc các bàn để chỉ xem những bàn trong một khu vực cụ thể.
* **Luồng cơ bản:**
  1. Người dùng đang ở màn hình Quản lý Bàn.
  2. Người dùng chọn một tab/nút khu vực (ví dụ: "Khu A") ở phía trên màn hình.
  3. Hệ thống chỉ hiển thị các bàn thuộc khu vực đã chọn.
* **Luồng thay thế:**
  * **ALT-02.1: Xem tất cả:** Người dùng chọn tab "Tất cả" để xem toàn bộ các bàn ở mọi khu vực.
* **Điều kiện tiên quyết:** Người dùng đang ở màn hình Quản lý Bàn.
* **Điều kiện sau cùng:** Các bàn được hiển thị đã được lọc theo khu vực mong muốn.

#### 4.3. UC-03: Mở/Tạo đơn hàng cho bàn trống

* **Actor chính:** Phục vụ, Tiếp tân
* **Mô tả:** Nhân viên tạo một đơn hàng mới khi khách hàng được sắp xếp vào bàn trống.
* **Luồng cơ bản:**
  1. Người dùng xác định một bàn trống (màu xanh lá cây).
  2. Người dùng chạm/click vào ô bàn trống đó.
  3. Hệ thống chuyển sang màn hình chi tiết đơn hàng cho bàn đó, sẵn sàng để phục vụ nhập món.
  4. Bàn trên màn hình quản lý sẽ chuyển sang trạng thái "đang phục vụ" (màu đỏ hoặc màu sắc tương ứng).
* **Điều kiện tiên quyết:** Bàn được chọn đang ở trạng thái trống.
* **Điều kiện sau cùng:** Đơn hàng mới được khởi tạo và bàn chuyển trạng thái.

#### 4.4. UC-04: Tiếp tục chỉnh sửa đơn hàng cho bàn đang phục vụ

* **Actor chính:** Phục vụ
* **Mô tả:** Nhân viên tiếp tục thêm/bớt món hoặc xem thông tin đơn hàng cho một bàn đang có khách.
* **Luồng cơ bản:**
  1. Người dùng xác định một bàn đang phục vụ (màu đỏ) và chạm/click vào ô bàn đó.
  2. Hệ thống chuyển sang màn hình chi tiết đơn hàng hiện tại của bàn, hiển thị các món đã order, số lượng và tổng tiền tạm tính.
  3. Người dùng có thể thêm món, bớt món, điều chỉnh số lượng hoặc thêm ghi chú.
* **Điều kiện tiên quyết:** Bàn được chọn đang ở trạng thái "đang phục vụ" và có đơn hàng.
* **Điều kiện sau cùng:** Người dùng có thể chỉnh sửa đơn hàng của bàn.

#### 4.5. UC-05: Chuyển bàn / Gộp bàn / Tách bàn / In tạm tính (Từ màn hình tổng quan)

* **Actor chính:** Phục vụ, Thu ngân, Quản lý
* **Mô tả:** Người dùng thực hiện các thao tác quản lý phức tạp trên bàn (chuyển, gộp, tách, in tạm tính) trực tiếp từ màn hình tổng quan.
* **Luồng cơ bản:**
  1. Người dùng chọn một hoặc nhiều bàn (ví dụ: giữ và kéo, hoặc tích chọn).
  2. Hệ thống hiển thị một menu ngữ cảnh hoặc các nút chức năng tương ứng (ví dụ: "Chuyển bàn", "Gộp bàn", "Tách hóa đơn", "In tạm tính"). (Hình ảnh có biểu tượng "đĩa" và "người" trên một số bàn, có thể đại diện cho các chức năng này).
  3. Người dùng chọn chức năng mong muốn.
  4. Hệ thống hiển thị giao diện để hoàn tất thao tác (ví dụ: chọn bàn đích để chuyển, chọn các món để tách).
  5. Sau khi hoàn tất, trạng thái các bàn liên quan được cập nhật trên màn hình tổng quan.
* **Luồng thay thế:**
  * **ALT-05.1: Chuyển bàn:** Chọn bàn gốc, chọn chức năng "Chuyển bàn", sau đó chọn bàn đích.
  * **ALT-05.2: Gộp bàn:** Chọn nhiều bàn, chọn chức năng "Gộp bàn". Hệ thống gộp các đơn hàng và chuyển trạng thái các bàn cũ thành trống.
  * **ALT-05.3: Tách hóa đơn:** Chọn bàn, chọn chức năng "Tách hóa đơn". Hệ thống hiển thị chi tiết đơn hàng để người dùng chọn món tách.
  * **ALT-05.4: In tạm tính:** Chọn bàn, chọn chức năng "In tạm tính". Hệ thống in một bản sao hóa đơn tạm thời cho khách hàng.
* **Điều kiện tiên quyết:** Các bàn đã có đơn hàng hoặc ở trạng thái phù hợp cho thao tác.
* **Điều kiện sau cùng:** Thao tác quản lý bàn được thực hiện thành công và trạng thái bàn được cập nhật.

#### 4.6. UC-06: Tìm kiếm bàn hoặc đơn hàng (trên thanh tìm kiếm)

* **Actor chính:** Phục vụ, Thu ngân, Quản lý
* **Mô tả:** Người dùng tìm kiếm một bàn cụ thể hoặc một đơn hàng theo mã.
* **Luồng cơ bản:**
  1. Người dùng nhập từ khóa vào ô tìm kiếm (ví dụ: "GLA01" hoặc một phần của mã đơn hàng).
  2. Hệ thống lọc và hiển thị các bàn/đơn hàng phù hợp với từ khóa tìm kiếm.
* **Điều kiện tiên quyết:** Không có.
* **Điều kiện sau cùng:** Các bàn/đơn hàng phù hợp được hiển thị.

#### 4.7. UC-07: Xem danh sách đơn hàng chờ (cột bên phải)

* **Actor chính:** Thu ngân, Quản lý
* **Mô tả:** Người dùng xem danh sách các đơn hàng đang chờ thanh toán hoặc các đơn hàng nổi bật cần chú ý.
* **Luồng cơ bản:**
  1. Người dùng nhìn vào cột bên phải của màn hình.
  2. Hệ thống hiển thị danh sách các "đơn hàng" (ví dụ: GLB01, GLC15, GLC02...) cùng với thông tin tóm tắt như số khách, tổng tiền tạm tính, thời gian chờ, và nút "Chuyển tiền" (có thể là để thanh toán nhanh hoặc chuyển hóa đơn).
  3. Người dùng có thể click vào từng mục để đi đến chi tiết đơn hàng đó.
* **Điều kiện tiên quyết:** Có các đơn hàng đang hoạt động trong hệ thống.
* **Điều kiện sau cùng:** Người dùng có cái nhìn nhanh về các đơn hàng đang chờ xử lý hoặc có tổng tiền lớn.

---

### 5. Quy tắc nghiệp vụ (Business Rules)

* **BR-01:** Chỉ các bàn ở trạng thái "Trống" mới có thể được chọn để tạo đơn hàng mới.
* **BR-02:** Một bàn đang phục vụ chỉ có thể được gộp hoặc chuyển sang một bàn khác cũng đang phục vụ hoặc trống.
* **BR-03:** Khi gộp bàn, tất cả các món từ các đơn hàng được gộp phải được chuyển sang một đơn hàng duy nhất.
* **BR-04:** Khi tách hóa đơn, tổng tiền của các hóa đơn con phải bằng tổng tiền của hóa đơn gốc.
* **BR-05:** Thông tin tóm tắt trên ô bàn (số khách, tổng tiền tạm tính, thời gian) phải được cập nhật theo thời gian thực.
* **BR-06:** Các biểu tượng/màu sắc trạng thái bàn phải nhất quán và dễ hiểu.
* **BR-07:** Các số trên ô bàn (ví dụ: số "2" nhỏ màu đỏ trên GLA01) có thể biểu thị số lần thêm món/chỉnh sửa hoặc số khách của bàn. Cần xác định rõ ý nghĩa này. (Trong hình có vẻ là số khách và số order/phiếu đang mở).

---

### 6. Yêu cầu phi chức năng (Non-functional Requirements)

* **NFR-01: Hiệu suất:**
  * Thời gian tải màn hình tổng quan không quá 2 giây, ngay cả với 100+ bàn.
  * Việc cập nhật trạng thái bàn phải diễn ra gần như tức thời (dưới 0.5 giây) khi có thay đổi (ví dụ: khách order thêm, thanh toán).
* **NFR-02: Khả năng sử dụng (Usability):**
  * Giao diện phải trực quan, các ô bàn phải dễ chạm/click và phân biệt được trạng thái bằng màu sắc.
  * Các nút chức năng (lọc khu vực, tìm kiếm) phải dễ tìm và dễ sử dụng.
  * Thông tin trên ô bàn phải hiển thị rõ ràng, dễ đọc.
  * Thiết kế phải phù hợp với màn hình cảm ứng (touch-friendly).
* **NFR-03: Bảo mật:**
  * Chỉ người dùng có quyền (ví dụ: Quản lý, Thu ngân) mới được phép thực hiện các thao tác nhạy cảm như gộp/tách hóa đơn.
  * Mọi thao tác thay đổi trạng thái bàn hoặc đơn hàng phải được ghi lại nhật ký (log) chi tiết.
* **NFR-04: Khả năng tương thích:**
  * Màn hình phải hiển thị tốt trên nhiều kích thước màn hình và độ phân giải khác nhau của thiết bị POS.
* **NFR-05: Khả năng mở rộng:**
  * Dễ dàng thêm mới, chỉnh sửa, xóa các khu vực và bàn.
  * Hệ thống có thể hỗ trợ số lượng bàn lớn mà không ảnh hưởng hiệu suất.
* **NFR-06: Tính ổn định:**
  * Màn hình phải hoạt động ổn định, không bị treo hoặc lỗi khi xử lý nhiều thao tác đồng thời.
* **NFR-07: Tính thẩm mỹ (Aesthetics):**
  * Giao diện phải hiện đại, sạch sẽ và phù hợp với thương hiệu. (Điều này có thể được phát triển chi tiết trong FRS và thiết kế UI/UX).
