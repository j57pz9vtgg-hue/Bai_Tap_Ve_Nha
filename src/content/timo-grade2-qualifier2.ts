import type { Question } from "../data";

// Questions and the separately supplied answer key transcribed from the owner’s images.
// Preserve the supplied key and explanations without independently correcting the source.
export const TIMO_GRADE2_QUALIFIER2: Question[] = [
  {
    sourceNumber: 1,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "What is the number that should be filled in the blank?",
    translation: "Tìm số thích hợp để điền vào chỗ trống.",
    options: ["20", "25", "26", "30"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    diagram: "p2-sequence",
    correct: 1,
    explanation:
      "Quy luật: Khoảng cách giữa 2 số liên tiếp trong dãy tăng dần 2 đơn vị.\n1 + 3 = 4,　4 + 5 = 9,　9 + 7 = 16,　16 + 9 = 25,　25 + 11 = 36,　36 + 13 = 49.\nVậy số cần tìm là 25.\nĐáp số: B.",
  },
  {
    sourceNumber: 2,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "There are 11 boys and 15 girls in the art club. How many members are there in this club?",
    translation:
      "Câu lạc bộ nghệ thuật có 11 thành viên nam và 15 thành viên nữ. Hỏi câu lạc bộ đó có tất cả bao nhiêu thành viên?",
    options: ["24", "25", "26", "27"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Câu lạc bộ có tất cả số thành viên là: 11 + 15 = 26 (thành viên).\nĐáp số: C.",
  },
  {
    sourceNumber: 3,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Karik was 8 years old 7 years ago. How old is Karik now?",
    translation: "7 năm trước, Karik 8 tuổi. Hỏi bây giờ Karik bao nhiêu tuổi?",
    options: ["1", "8", "14", "15"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 3,
    explanation: "Tuổi của Karik bây giờ là: 8 + 7 = 15 (tuổi).\nĐáp số: D.",
  },
  {
    sourceNumber: 4,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, how many flowers are there in the next group?",
    translation:
      "Dựa vào quy luật dưới đây, có bao nhiêu hình bông hoa trong nhóm tiếp theo?",
    options: ["14", "15", "16", "17"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    diagram: "p2-flowers",
    correct: 2,
    explanation:
      "Ta có nhóm tiếp theo như hình dưới đây.\nVậy nhóm tiếp theo có 16 hình bông hoa.\nĐáp số: C.",
  },
  {
    sourceNumber: 5,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Tomorrow will be Saturday. Which day of the week was it 5 days before now?",
    translation: "Ngày mai là thứ Bảy. Hỏi 5 ngày trước hôm nay là thứ mấy?",
    options: [
      "Sunday / Chủ nhật",
      "Wednesday / Thứ Tư",
      "Saturday / Thứ Bảy",
      "Tuesday / Thứ Ba",
    ],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Ngày mai là thứ Bảy nên hôm nay là thứ Sáu.\n1 ngày trước hôm nay là thứ Năm. 2 ngày trước hôm nay là thứ Tư. 3 ngày trước hôm nay là thứ Ba. 4 ngày trước hôm nay là thứ Hai. 5 ngày trước hôm nay là Chủ nhật.\nĐáp số: A.",
  },
  {
    sourceNumber: 6,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Find the value of 5 + 14 + 7 + 16.",
    translation: "Tìm giá trị của 5 + 14 + 7 + 16.",
    options: ["37", "38", "41", "42"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 3,
    explanation:
      "5 + 14 + 7 + 16 = (14 + 16) + (5 + 7) = 30 + 12 = 42.\nĐáp số: D.",
  },
  {
    sourceNumber: 7,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Which number is hidden behind the tree below?",
    translation: "Số nào đang bị giấu sau cái cây dưới đây?",
    options: ["17", "39", "41", "43"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    diagram: "p2-tree",
    correct: 2,
    explanation:
      "Ta có:\n🌳 − 12 = 9 + 20\n🌳 − 12 = 29\n🌳 = 29 + 12\n🌳 = 41\nVậy số bị giấu sau cái cây là 41.\nĐáp số: C.",
  },
  {
    sourceNumber: 8,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Find the value of 15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5.",
    translation:
      "Tìm giá trị của 15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5.",
    options: ["10", "9", "7", "5"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5\n= (15 − 14) + (13 − 12) + (11 − 10) + (9 − 8) + (7 − 6) + 5\n= 1 + 1 + 1 + 1 + 1 + 5\n= 10.\nĐáp số: A.",
  },
  {
    sourceNumber: 9,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Find the first number in the sequence below.",
    translation: "Tìm số đầu tiên trong dãy dưới đây.",
    options: ["10", "15", "22", "25"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    diagram: "p2-chain",
    correct: 2,
    explanation:
      "Ta lần lượt tính theo chiều ngược lại như hình dưới đây.\nVậy số cần tìm là 22.\nĐáp số: C.",
  },
  {
    sourceNumber: 10,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Given that A and B represent different 1-digit numbers, find the value of B.",
    translation:
      "Biết rằng A và B biểu diễn các số có 1 chữ số khác nhau, tìm giá trị của B.",
    options: ["4", "7", "8", "9"],
    strand: "Arithmetic / Số học",
    topicId: "unassigned",
    diagram: "p2-addition",
    correct: 3,
    explanation:
      "Trường hợp 1: Hàng đơn vị là phép cộng không nhớ.\nXét hàng đơn vị, ta có: B + B = 8. Do đó, B = 4.\nXét hàng chục, ta có: A = 4 (không thỏa mãn A khác B).\nTrường hợp 2: Hàng đơn vị là phép cộng có nhớ.\nXét hàng đơn vị, ta có: B + B = 18. Do đó, B = 9.\nXét hàng chục, ta có: A + 1 = 4. Do đó, A = 3 (thỏa mãn A khác B).\nVậy B = 9.\nĐáp số: D.",
  },
  {
    sourceNumber: 11,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "How many 2-digit numbers with 2 digits adding up to 14 are there?",
    translation:
      "Hỏi có bao nhiêu số có 2 chữ số mà khi cộng 2 chữ số đó lại thì được kết quả là 14?",
    options: ["3", "5", "7", "8"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Ta có: 14 = 9 + 5 = 8 + 6 = 7 + 7 = 6 + 8 = 5 + 9.\nCác số có 2 chữ số mà tổng 2 chữ số bằng 14 là: 95, 86, 77, 68, 59.\nTrong đó, các số lẻ có 2 chữ số với tổng 2 chữ số bằng 14 là: 95, 77, 59.\nVậy có 3 số thỏa mãn đề bài.\nĐáp số: A.",
  },
  {
    sourceNumber: 12,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "According to the pattern below, what is the 6th number in the sequence?",
    translation: "Dựa vào quy luật dưới đây, số thứ 6 trong dãy là số nào?",
    options: ["32", "23", "14", "41"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    diagram: "p2-sequence12",
    correct: 0,
    explanation:
      "Quy luật: Các số trong dãy giảm dần 9 đơn vị.\n77 − 9 = 68,　68 − 9 = 59,　59 − 9 = 50,　…\nSố thứ 5 của dãy là: 50 − 9 = 41.\nSố thứ 6 của dãy là: 41 − 9 = 32.\nĐáp số: A.",
  },
  {
    sourceNumber: 13,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Among the following operations, how many results are odd numbers?",
    translation: "Hỏi có bao nhiêu kết quả là số lẻ trong các phép tính sau?",
    options: ["4", "3", "2", "5"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    diagram: "p2-operations",
    correct: 1,
    explanation:
      "Ta có: 7 + 4 = 11, 18 − 6 = 12, 14 + 23 = 37, 25 − 12 = 13, 21 − 2 − 9 = 10.\nCác kết quả là số lẻ bao gồm: 11, 37, 13.\nVậy có 3 kết quả là số lẻ.\nĐáp số: B.",
  },
  {
    sourceNumber: 14,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Fill in the lines with ‘−’ and ‘+’ to make the equation below correct.",
    translation:
      "Điền dấu ‘−’ và ‘+’ vào chỗ trống để tạo thành một phép tính đúng.",
    options: [
      "1 + 8 + 3 + 7 = 13",
      "1 + 8 + 3 − 7 = 13",
      "1 + 8 − 3 + 7 = 13",
      "1 + 8 − 3 − 7 = 13",
    ],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    diagram: "p2-operators",
    correct: 2,
    explanation:
      "Ta có: 1 + 8 − 3 + 7 = 9 − 3 + 7 = 6 + 7 = 13.\nVậy phép tính đúng là: 1 + 8 − 3 + 7 = 13.\nĐáp số: C.",
  },
  {
    sourceNumber: 15,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Ken has 10 marbles and Ben has 20 marbles. How many marbles should be given to Ken so that they have the same number of marbles?",
    translation:
      "Ken có 10 viên bi và Ben có 20 viên bi. Hỏi Ben phải cho Ken bao nhiêu viên bi để hai bạn có số bi bằng nhau?",
    options: ["5", "10", "15", "7"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Hai bạn có tất cả số bi là: 10 + 20 = 30 (viên).\nNhận thấy: 30 = 15 + 15. Do đó, khi hai bạn có số bi bằng nhau thì mỗi bạn có 15 viên bi.\nLúc đầu, Ben có 20 viên bi. Sau khi cho Ken, Ben còn lại 15 viên bi.\nVậy Ben phải cho Ken số bi là: 20 − 15 = 5 (viên).\nĐáp số: A.",
  },
  {
    sourceNumber: 16,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "How many squares are there in the figure below?",
    translation: "Hỏi có bao nhiêu hình vuông trong hình vẽ dưới đây?",
    options: ["9", "10", "12", "13"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p2-squares",
    correct: 3,
    explanation:
      "Ta đếm số hình vuông như hình vẽ sau.\nVậy hình đã cho có 13 hình vuông.\nĐáp số: D.",
  },
  {
    sourceNumber: 17,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, what is the figure in the space?",
    translation:
      "Dựa vào quy luật dưới đây, tìm hình vẽ thích hợp điền vào chỗ trống.",
    options: [
      "Hình tia nhọn",
      "Hình tam giác",
      "Hình trái tim",
      "Hình ngôi sao",
    ],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p2-shapes",
    correct: 0,
    explanation:
      "Quy luật: Nhóm 5 hình ♥ ✹ ▲ ★ ● lặp lại.\nVậy hình cần tìm là ✹.\nĐáp số: A.",
  },
  {
    sourceNumber: 18,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "At least how many small squares can be seen if viewing the figure below from the front?",
    translation:
      "Hỏi có thể thấy được ít nhất bao nhiêu hình vuông nhỏ nếu nhìn hình dưới đây từ phía trước?",
    options: ["10", "9", "8", "7"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p2-cubes-front",
    correct: 1,
    explanation:
      "Ta có hình vẽ sau.\nVậy ta có thể nhìn thấy 9 hình vuông nhỏ từ phía trước.\nĐáp số: B.",
  },
  {
    sourceNumber: 19,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "How many line segments are there in the figure below?",
    translation: "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
    options: ["12", "11", "13", "10"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p2-segments",
    correct: 1,
    explanation:
      "Ta đánh số các đoạn thẳng như hình dưới đây.\nCó 8 đoạn thẳng đơn là: 1, 2, 3, 4, 5, 6, 7, 8.\nCó 2 đoạn thẳng được ghép bởi 2 đoạn thẳng đơn là: (1 + 2), (2 + 3).\nCó 1 đoạn thẳng được ghép bởi 3 đoạn thẳng đơn là: (1 + 2 + 3).\nVậy hình đã cho có tất cả số đoạn thẳng là: 8 + 2 + 1 = 11 (đoạn thẳng).\nĐáp số: B.",
  },
  {
    sourceNumber: 20,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Camila stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
    translation:
      "Camila xếp các khối lập phương hệt nhau lên trên nhau được hình vẽ dưới đây. Hỏi cô bé cần ít nhất bao nhiêu khối lập phương?",
    options: ["10", "11", "12", "13"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p2-cubes-count",
    correct: 2,
    explanation:
      "Ta ghi lại số khối lập phương ở mỗi chồng như dưới đây.\nVậy Camila cần ít nhất số khối lập phương là: (1 + 1 + 1 + 1 + 1) + (2 + 2 + 2) = 12 (khối).\nĐáp số: C.",
  },
  {
    sourceNumber: 21,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Arrange these numbers in ascending order to find the 5th smallest number.",
    translation: "Sắp xếp các số sau từ bé đến lớn để tìm số bé thứ 5.",
    options: ["33", "62", "47", "39"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    diagram: "p2-numbers",
    correct: 2,
    explanation:
      "Các số được sắp xếp từ bé đến lớn là: 17, 24, 33, 39, 47, 62, 75, 80, 98.\nVậy số bé thứ 5 là 47.\nĐáp số: C.",
  },
  {
    sourceNumber: 22,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Choose 2 digits, without repetition, from 1, 3, 0, 7, 4 to form 2-digit numbers. How many odd numbers are there?",
    translation:
      "Chọn 2 chữ số không lặp lại từ 1, 3, 0, 7, 4 để tạo thành các số có 2 chữ số. Hỏi có thể tạo được bao nhiêu số lẻ?",
    options: ["8", "9", "10", "11"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Các số lẻ có hàng đơn vị là 1, 3 hoặc 7.\nCác số lẻ có hàng đơn vị là 1 bao gồm: 31, 71, 41.\nCác số lẻ có hàng đơn vị là 3 bao gồm: 13, 73, 43.\nCác số lẻ có hàng đơn vị là 7 bao gồm: 17, 37, 47.\nVậy ta có thể tạo được 9 số lẻ có 2 chữ số.\nĐáp số: B.",
  },
  {
    sourceNumber: 23,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Frank has 4 number cards: 1, 3, 5, 4. Find the largest sum of two 2-digit numbers formed by those cards without repetition.",
    translation:
      "Frank có 4 thẻ số: 1, 3, 5, 4. Tìm tổng lớn nhất của hai số có 2 chữ số tạo từ các thẻ đã cho biết rằng các chữ số không lặp lại.",
    options: ["94", "106", "85", "68"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 0,
    explanation:
      "Để tổng lớn nhất có thể, ta chọn 2 chữ số lớn nhất để làm hàng chục của 2 số.\nDo đó, 2 chữ số ở hàng chục là 5 và 4. Lúc này, 2 chữ số ở hàng đơn vị là 1 và 3.\nTổng lớn nhất có thể là: 51 + 43 = 53 + 41 = 94.\nĐáp số: A.",
  },
  {
    sourceNumber: 24,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Kara wants to go home after school. There are 3 roads from the school to the bus station and there are 2 roads from the bus station to her house. How many different ways are there to come back home given that Kara has to go through the bus station?",
    translation:
      "Kara muốn trở về nhà sau giờ học. Có 3 con đường từ trường học đến trạm xe buýt và có 2 con đường từ trạm xe buýt về nhà. Hỏi có bao nhiêu con đường khác nhau để đi từ trường về nhà mà Kara phải đi qua trạm xe buýt?",
    options: ["8", "7", "6", "5"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    diagram: "p2-routes",
    correct: 2,
    explanation:
      "Có 3 cách đi từ trường đến trạm xe buýt.\nCó 2 cách đi từ trạm xe buýt về nhà.\nSố cách đi từ trường về nhà là: 3 × 2 = 6 (cách).\nVậy có 6 con đường đi từ trường về nhà.\nĐáp số: C.",
  },
  {
    sourceNumber: 25,
    sourcePaper: "Đề số 2 · Vòng loại TIMO lớp 2",
    text: "Lily wants to buy some dolls. Each doll costs $5. For every 3 dolls, the store gives a tote bag for free. Lily has a total of $70. At most how many tote bags can Lily get for free?",
    translation:
      "Lily muốn mua một số búp bê. Mỗi con búp bê có giá 5 đô. Với mỗi 3 con búp bê, cửa hàng tặng thêm 1 chiếc túi. Lily có tổng cộng 70 đô. Hỏi Lily có thể được tặng nhiều nhất bao nhiêu túi?",
    options: ["2", "3", "4", "5"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Mỗi lần mua 3 con búp bê, Lily cần trả số tiền là: 5 + 5 + 5 = 15 (đô).\nTa có: 70 = 15 + 15 + 15 + 15 + 10 = 15 × 4 + 10.\nDo đó, Lily có thể mua được nhiều nhất 4 lần như vậy và được tặng 4 chiếc túi.\nĐáp số: C.",
  },
];
