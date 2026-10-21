import type { Question } from "../data";

// Questions, answer key and explanations transcribed from the owner’s supplied images.
export const TIMO_GRADE2_QUALIFIER3: Question[] = [
  {
    sourceNumber: 1,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, find the number to replace the question mark.",
    translation: "Dựa vào quy luật dưới đây, tìm số để thay thế dấu hỏi chấm.",
    options: ["26", "27", "28", "29"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Quy luật: Khoảng cách giữa 2 số liên tiếp trong dãy tăng dần 1 đơn vị.\n2 + 3 = 5; 5 + 4 = 9; 9 + 5 = 14; 14 + 6 = 20; …\nSố cần tìm là: 20 + 7 = 27.\nĐáp số: B.",
    diagram: "p3-sequence",
  },
  {
    sourceNumber: 2,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "There are 15 boys and 12 girls in Jennie’s class. How many classmates does she have?",
    translation:
      "Lớp của Jennie có 15 học sinh nam và 12 học sinh nữ. Hỏi cô bé có bao nhiêu người bạn cùng lớp?",
    options: ["24", "25", "26", "27"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Lớp của Jennie có tổng số học sinh là: 15 + 12 = 27 (học sinh).\nVậy Jennie có 26 người bạn cùng lớp (không tính Jennie).\nĐáp số: C.",
  },
  {
    sourceNumber: 3,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "After 6 years, Linda will be 15 years old. How old is Linda now?",
    translation:
      "6 năm nữa, Linda sẽ 15 tuổi. Hỏi bây giờ Linda bao nhiêu tuổi?",
    options: ["6", "21", "11", "9"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 3,
    explanation: "Tuổi của Linda bây giờ là: 15 − 6 = 9 (tuổi).\nĐáp số: D.",
  },
  {
    sourceNumber: 4,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, how many suns are there in the 10th group?",
    translation:
      "Dựa vào quy luật dưới đây, có bao nhiêu hình mặt trời trong nhóm thứ 10?",
    options: ["20", "22", "24", "26"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Cách 1: Quy luật: Số hình mặt trời trong nhóm thứ n là 2 × n + 2.\nNhóm 1: 2 × 1 + 2 = 4 hình mặt trời.\nNhóm 2: 2 × 2 + 2 = 6 hình mặt trời.\nNhóm 3: 2 × 3 + 2 = 8 hình mặt trời.\nNhóm 4: 2 × 4 + 2 = 10 hình mặt trời.\n…\nVậy nhóm 10 có 2 × 10 + 2 = 22 hình mặt trời.\nCách 2: Số hình mặt trời trong các nhóm lần lượt là: 4, 6, 8, 10, …\nQuy luật: Các số trong dãy tăng dần 2 đơn vị.\nTa liệt kê và tìm được số thứ 10 trong dãy là 22.\nĐáp số: B.",
    diagram: "p3-suns",
  },
  {
    sourceNumber: 5,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "The day before yesterday was Monday. Which day of the week will it be 4 days later?",
    translation: "Ngày hôm kia là thứ Hai. Hỏi 4 ngày nữa là thứ mấy?",
    options: [
      "Tuesday / Thứ Ba",
      "Wednesday / Thứ Tư",
      "Saturday / Thứ Bảy",
      "Sunday / Chủ Nhật",
    ],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "Ngày hôm kia là thứ Hai nên hôm qua là thứ Ba. Hôm nay là thứ Tư.\n1 ngày nữa là thứ Năm. 2 ngày nữa là thứ Sáu. 3 ngày nữa là thứ Bảy.\nVậy 4 ngày nữa là Chủ nhật.\nĐáp số: D.",
  },
  {
    sourceNumber: 6,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Find the value of 12 + 6 + 7 + 13.",
    translation: "Tìm giá trị của 12 + 6 + 7 + 13.",
    options: ["28", "38", "37", "27"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "12 + 6 + 7 + 13 = (12 + 6) + (7 + 13) = 18 + 20 = 38.\nĐáp số: B.",
  },
  {
    sourceNumber: 7,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Which number is hidden inside the backpack below?",
    translation: "Số nào đang bị giấu trong chiếc cặp dưới đây?",
    options: ["33", "35", "13", "15"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 2,
    explanation: "Ta có các bước biến đổi như hình dưới đây.\nĐáp số: C.",
    diagram: "p3-backpack",
  },
  {
    sourceNumber: 8,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Find the value of 10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1.",
    translation: "Tìm giá trị của 10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1.",
    options: ["4", "5", "6", "3"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1\n= (10 − 9) + (8 − 7) + (6 − 5) + (4 − 3) + (2 − 1)\n= 1 + 1 + 1 + 1 + 1 = 5.\nĐáp số: B.",
  },
  {
    sourceNumber: 9,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "What is the first number in the sequence?",
    translation: "Số đầu tiên trong dãy là số nào?",
    options: ["26", "17", "21", "20"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "Ta có sơ đồ với hai ô giữa được ký hiệu A và B như hình.\nVì B + 6 = 23 nên B = 23 − 6 = 17.\nVì A + 7 = B nên A = B − 7 = 17 − 7 = 10.\nVì ? − 10 = A nên ? = A + 10 = 10 + 10 = 20.\nVậy số cần tìm là 20.\nĐáp số: D.",
    diagram: "p3-chain",
  },
  {
    sourceNumber: 10,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Given that A and B represent different 1-digit numbers, what is the value of B?",
    translation:
      "Biết A và B biểu diễn các số có 1 chữ số khác nhau, hỏi giá trị của B bằng bao nhiêu?",
    options: ["7", "8", "4", "2"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Trường hợp 1: Phép cộng ở hàng đơn vị là phép cộng không nhớ.\nKhi đó, B + B = 4. Suy ra, B = 2.\nAB + B = 24 nên AB = 24 − B = 24 − 2 = 22, suy ra A = 2 (loại vì A = B = 2).\nTrường hợp 2: Phép cộng ở hàng đơn vị là phép cộng có nhớ 1.\nKhi đó, B + B = 14. Suy ra, B = 7.\nAB + B = 24 nên AB = 24 − B = 24 − 7 = 14, suy ra A = 1 (thỏa mãn A khác B).\nVậy B = 7.\nĐáp số: A.",
    diagram: "p3-addition",
  },
  {
    sourceNumber: 11,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "How many 2-digit numbers with 2 digits adding up to 12 are there?",
    translation:
      "Hỏi có bao nhiêu số có 2 chữ số mà khi cộng 2 chữ số đó lại thì được kết quả là 12?",
    options: ["6", "12", "8", "7"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "Các số thỏa mãn yêu cầu là: 39, 48, 57, 66, 75, 84, 93.\nVậy có 7 số thỏa mãn yêu cầu.\nĐáp số: D.",
  },
  {
    sourceNumber: 12,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "According to the pattern below, find the value of the 6th number in the sequence.",
    translation:
      "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 6 trong dãy.",
    options: ["40", "38", "50", "48"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Quy luật: Các số trong dãy giảm dần 12 đơn vị.\n98 − 12 = 86; 86 − 12 = 74; 74 − 12 = 62; …\nSố thứ 5 của dãy là: 62 − 12 = 50.\nSố thứ 6 của dãy là: 50 − 12 = 38.\nĐáp số: B.",
    diagram: "p3-sequence12",
  },
  {
    sourceNumber: 13,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Among the operations below, how many results are even numbers?",
    translation:
      "Trong các phép tính dưới đây, có bao nhiêu kết quả là số chẵn?",
    options: ["3", "2", "4", "1"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Ta có: 12 − 3 = 9; 7 + 5 = 12; 11 − 3 + 2 = 10; 111 + 1 = 112; 20 − 17 = 3.\nTrong các kết quả ở trên, có 3 kết quả là số chẵn (là 12, 10 và 112).\nĐáp số: A.",
    diagram: "p3-operations",
  },
  {
    sourceNumber: 14,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Fill in the blanks with ‘−’ and ‘+’ to make the equation below correct.",
    translation:
      "Điền dấu ‘−’ và ‘+’ vào chỗ trống để tạo thành một phép tính đúng.",
    options: [
      "4 + 5 + 3 + 6 = 12",
      "4 + 5 − 3 − 6 = 12",
      "4 + 5 − 3 + 6 = 12",
      "4 + 5 + 3 − 6 = 12",
    ],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "4 + 5 + 3 + 6 = 9 + 3 + 6 = 12 + 6 = 18 (loại).\n4 + 5 − 3 − 6 = 9 − 3 − 6 = 6 − 6 = 0 (loại).\n4 + 5 − 3 + 6 = 9 − 3 + 6 = 6 + 6 = 12 (thỏa mãn).\n4 + 5 + 3 − 6 = 9 + 3 − 6 = 12 − 6 = 6 (loại).\nVậy phép tính đúng là: 4 + 5 − 3 + 6 = 12.\nĐáp số: C.",
    diagram: "p3-operators",
  },
  {
    sourceNumber: 15,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "John has 20 balloons and Jack has 60 balloons. How many balloons should Jack give to John so that they have the same number of balloons?",
    translation:
      "John có 20 quả bóng bay và Jack có 60 quả bóng bay. Hỏi Jack phải cho John bao nhiêu quả bóng bay để họ có số bóng bằng nhau?",
    options: ["20", "40", "60", "80"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Tổng số bóng bay của hai bạn là: 20 + 60 = 80 (quả).\nKhi hai bạn có số bóng bay bằng nhau thì mỗi bạn có 80 : 2 = 40 (quả).\nVậy Jack cần cho John số bóng bay là: 60 − 40 = 20 (quả).\nĐáp số: A.",
  },
  {
    sourceNumber: 16,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "How many squares are there in the figure below?",
    translation: "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
    options: ["6", "9", "10", "7"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "Ta đánh số các mảnh ghép như hình.\nCác hình vuông tạo bởi 1 mảnh ghép là: 2, 3, 4, 5 ⇒ 4 hình vuông.\nCác hình vuông tạo bởi 2 mảnh ghép là: (5, 6) ⇒ 1 hình vuông.\nCác hình vuông tạo bởi 4 mảnh ghép là: (2, 3, 4, 5) ⇒ 1 hình vuông.\nCác hình vuông tạo bởi 5 mảnh ghép là: (1, 2, 3, 4, 5) ⇒ 1 hình vuông.\nVậy trong hình đã cho có tất cả 4 + 1 + 1 + 1 = 7 hình vuông.\nĐáp số: D.",
    diagram: "p3-squares",
  },
  {
    sourceNumber: 17,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, what is the figure in the space (“__”) provided?",
    translation:
      "Dựa vào quy luật dưới đây, hình điền vào chỗ trống (“__”) là hình nào?",
    options: ["●", "△", "◆", "○"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Quy luật: Nhóm gồm 5 hình (● ● △ ◆ △) lặp lại.\n(● ● △ ◆ △) (● ● △ ◆ △) (● __ △ ◆ △)\nVậy hình cần tìm là ●.\nĐáp số: A.",
    diagram: "p3-shapes",
  },
  {
    sourceNumber: 18,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "At least how many squares can be seen if viewing the figure below from the right?",
    translation:
      "Hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông nếu nhìn hình dưới đây từ phía bên phải?",
    options: ["9", "6", "7", "8"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Ta đánh số các hình vuông thấy được khi nhìn hình đã cho từ bên phải như hình.\nVậy có thể thấy được ít nhất 7 hình vuông khi nhìn hình đã cho từ bên phải.\nĐáp số: C.",
    diagram: "p3-cubes-right",
  },
  {
    sourceNumber: 19,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "How many line segments are there in the figure below?",
    translation: "Hỏi có bao nhiêu đoạn thẳng trong hình dưới đây?",
    options: ["12", "14", "13", "11"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Ta đánh số các đoạn thẳng như hình.\nNgoài ra, có 2 đoạn thẳng ghép bởi 2 đoạn thẳng đơn là (5, 6), (6, 7) và 1 đoạn thẳng ghép bởi 3 đoạn thẳng đơn là (5, 6, 7).\nVậy trong hình đã cho có tất cả 11 + 2 + 1 = 14 đoạn thẳng.\nĐáp số: B.",
    diagram: "p3-segments",
  },
  {
    sourceNumber: 20,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Fiona stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
    translation:
      "Fiona xếp chồng các khối lập phương y hệt nhau để được hình dưới đây. Hỏi bé có cần ít nhất bao nhiêu khối lập phương?",
    options: ["10", "11", "8", "9"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "Ta đánh số các khối lập phương như hình.\nNgoài ra, còn 1 khối lập phương ở ngay bên dưới khối lập phương số 2.\nVậy có ít nhất 8 + 1 = 9 khối lập phương trong hình đã cho.\nĐáp số: D.",
    diagram: "p3-cubes-count",
  },
  {
    sourceNumber: 21,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Arrange these numbers in descending order to find the 3rd largest number.",
    translation: "Sắp xếp các số sau từ lớn đến bé để tìm số lớn thứ 3.",
    options: ["88", "37", "52", "49"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Các số được sắp xếp theo thứ tự từ lớn đến bé là: 92, 88, 52, 49, 45, 37, 23, 12.\nVậy số lớn thứ 3 là 52.\nĐáp số: C.",
    diagram: "p3-numbers",
  },
  {
    sourceNumber: 22,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Choose 2 digits, without repetition, from 2, 3, 4, 5, 6 to form 2-digit numbers. How many even numbers are there?",
    translation:
      "Chọn 2 chữ số không lặp lại từ 2, 3, 4, 5, 6 để tạo thành các số có 2 chữ số. Hỏi có tất cả bao nhiêu số chẵn?",
    options: ["12", "24", "10", "20"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Cách 1: Vì số cần tìm là số chẵn nên có hàng đơn vị là 2, 4 hoặc 6.\nNếu hàng đơn vị là 2, ta tạo được các số sau: 32, 42, 52, 62 ⇒ 4 số.\nNếu hàng đơn vị là 4, ta tạo được các số sau: 24, 34, 54, 64 ⇒ 4 số.\nNếu hàng đơn vị là 6, ta tạo được các số sau: 26, 36, 46, 56 ⇒ 4 số.\nVậy có tất cả 4 + 4 + 4 = 12 số thỏa mãn yêu cầu.\nCách 2: Có 3 cách chọn chữ số hàng đơn vị (là 2, 4, 6).\nSau đó, có 4 cách chọn chữ số hàng chục từ các chữ số còn lại.\nVậy có tất cả 3 × 4 = 12 số thỏa mãn yêu cầu.\nĐáp số: A.",
  },
  {
    sourceNumber: 23,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Teacher writes 4 digits 2, 8, 5, 3 on the board. Find the smallest sum of two 2-digit numbers formed by those digits without repetition.",
    translation:
      "Cô giáo viết 4 chữ số 2, 8, 5, 3 trên bảng. Hãy tìm tổng nhỏ nhất của hai số có 2 chữ số tạo từ các chữ số đã cho, biết rằng không có chữ số nào bị lặp lại.",
    options: ["61", "81", "63", "83"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Để tổng nhỏ nhất thì ta chọn 2 chữ số nhỏ nhất làm hàng chục (là 2 và 3).\nCòn lại 2 chữ số 8 và 5 làm hàng đơn vị.\nKhi đó, ta có hai số 28 và 35 (hoặc 25 và 38).\nTổng nhỏ nhất cần tìm là: 28 + 35 = 25 + 38 = 63.\nĐáp số: C.",
  },
  {
    sourceNumber: 24,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "There are 4 ways from the supermarket to the train station and there are 2 ways from the train station to the cinema. How many different ways are there from the supermarket to the cinema through the train station?",
    translation:
      "Có 4 cách đi từ siêu thị đến ga tàu và có 2 cách đi từ ga tàu đến rạp chiếu phim. Hỏi có bao nhiêu cách khác nhau đi từ siêu thị đến rạp chiếu phim mà phải đi qua ga tàu?",
    options: ["8", "5", "6", "4"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Có 4 cách chọn đường đi từ siêu thị đến ga tàu và 2 cách chọn đường đi từ ga tàu đến rạp chiếu phim.\nDo đó, có 4 × 2 = 8 cách đi từ siêu thị đến rạp chiếu phim mà phải đi qua ga tàu.\nĐáp số: A.",
    diagram: "p3-routes",
  },
  {
    sourceNumber: 25,
    sourcePaper: "Đề số 3 · Vòng loại TIMO lớp 2",
    text: "Peter wants to buy some pens. Each pen costs $5. For every 2 pens, the store gives 1 eraser for free. Peter has a total of $25. At most how many erasers can Peter get for free?",
    translation:
      "Peter muốn mua một số bút. Mỗi chiếc bút giá 5 đô. Với mỗi 2 chiếc bút, cửa hàng tặng thêm 1 cục tẩy miễn phí. Peter có tổng cộng 25 đô. Hỏi Peter có thể được tặng nhiều nhất bao nhiêu cục tẩy?",
    options: ["5", "2", "3", "4"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Peter có thể mua được nhiều nhất số chiếc bút là: 25 : 5 = 5 (chiếc bút).\nTa có 5 = 2 + 2 + 1 nên có 2 lần Peter được tặng 1 cục tẩy.\nVậy Peter có thể được tặng nhiều nhất là 2 cục tẩy.\nĐáp số: B.",
  },
];
