import type { Question } from "../data";

// All25 owner-supplied questions, answers and explanations.
export const TIMO_GRADE2_QUALIFIER5: Question[] = [
  {
    sourceNumber: 1,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Michael’s class has 5 boys and 6 girls. How many classmates does he have?",
    translation:
      "Lớp của Michael có 5 bạn trai và 6 bạn gái. Hỏi Michael có bao nhiêu bạn cùng lớp?",
    options: ["11", "10", "12", "9"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "topic-02",
    correct: 1,
    explanation:
      "Lớp của Michael có số học sinh là: 5 + 6 = 11 (bạn).\nVì không tính Michael nên số bạn cùng lớp của Michael là: 11 − 1 = 10 (bạn).\nĐáp số: B.",
  },
  {
    sourceNumber: 2,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "If today is Wednesday and also the first day of March, which day of the week is 9th March?",
    translation:
      "Nếu hôm nay là thứ Tư và cũng là ngày đầu tiên của tháng 3. Vậy ngày 9 tháng 3 là thứ mấy?",
    options: [
      "Wednesday / Thứ Tư",
      "Saturday / Thứ Bảy",
      "Friday / Thứ Sáu",
      "Thursday / Thứ Năm",
    ],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "topic-05",
    correct: 3,
    explanation:
      "Sau 7 ngày (tức là 1 tuần) thì thứ trong tuần lặp lại.\nHôm nay là thứ Tư (ngày 1 tháng 3) thì 1 tuần sau (ngày 8 tháng 3) cũng là thứ Tư.\nVậy ngày 9 tháng 3 là thứ Năm.\nĐáp số: D.",
  },
  {
    sourceNumber: 3,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "According to the pattern below, find the 15th figure counting from the left.",
    translation: "Dựa vào quy luật dưới đây, tìm hình thứ 15 tính từ bên trái.",
    options: ["○", "□", "△", "✱"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "topic-16",
    correct: 0,
    explanation:
      "Quy luật: Nhóm 4 hình (△ ✱ ○ □) lặp lại.\nVì 15 = 4 + 4 + 4 + 3 nên trong 15 hình đầu có 3 nhóm hình (△ ✱ ○ □) và thừa ra 3 hình lần lượt là (△ ✱ ○). Hình thứ 15 là hình cuối cùng thừa ra và là ○.\nĐáp số: A.",
    diagram: "p5-shapes",
  },
  {
    sourceNumber: 4,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Dan celebrated his 6th birthday 3 years ago. How old will he be 2 years later?",
    translation:
      "Dan tổ chức sinh nhật lần thứ 6 vào 3 năm trước. Hỏi 2 năm nữa anh ấy mấy tuổi?",
    options: ["1", "11", "7", "5"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "topic-03",
    correct: 1,
    explanation:
      "3 năm trước, Dan 6 tuổi nên hiện tại số tuổi của Dan là: 6 + 3 = 9 (tuổi).\n2 năm nữa số tuổi của Dan là: 9 + 2 = 11 (tuổi).\nĐáp số: B.",
  },
  {
    sourceNumber: 5,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "According to the pattern below, what is the value of the next number?",
    translation:
      "Dựa vào quy luật của dãy số sau, giá trị của số tiếp theo là số nào?",
    options: ["13", "15", "25", "30"],
    strand: "Logical thinking / Tư duy lô-gic",
    topicId: "topic-01",
    correct: 3,
    explanation:
      "Quy luật: Tách dãy đã cho thành 2 dãy nhỏ đan xen nhau:\nDãy thứ nhất: 50, 45, 40, 35, …\nDãy thứ hai: 3, 6, 9, 12, …\nSố cần tìm là số tiếp theo của dãy thứ nhất.\nQuy luật của dãy thứ nhất: Các số trong dãy giảm dần 5 đơn vị.\n50 − 5 = 45; 45 − 5 = 40; 40 − 5 = 35; …\nSố cần tìm là: 35 − 5 = 30.\nĐáp số: D.",
    diagram: "p5-sequence",
  },
  {
    sourceNumber: 6,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Find the value of 5 + 6 + 7 + 8 + 9 + 10.",
    translation: "Tìm giá trị của 5 + 6 + 7 + 8 + 9 + 10.",
    options: ["50", "55", "40", "45"],
    strand: "Arithmetic / Số học",
    topicId: "topic-06",
    correct: 3,
    explanation:
      "5 + 6 + 7 + 8 + 9 + 10 = (5 + 10) + (6 + 9) + (7 + 8) = 15 + 15 + 15 = 45.\nĐáp số: D.",
  },
  {
    sourceNumber: 7,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Calculate 13 − 11 + 9 − 7 + 5 − 3 + 1.",
    translation: "Tính 13 − 11 + 9 − 7 + 5 − 3 + 1.",
    options: ["14", "6", "7", "10"],
    strand: "Arithmetic / Số học",
    topicId: "topic-08",
    correct: 2,
    explanation:
      "13 − 11 + 9 − 7 + 5 − 3 + 1 = (13 − 11) + (9 − 7) + (5 − 3) + 1 = 2 + 2 + 2 + 1 = 7.\nĐáp số: C.",
  },
  {
    sourceNumber: 8,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Gordon thinks of a number. He adds 38 then subtracts 42 to get the smallest 2-digit odd number. Find Gordon’s number.",
    translation:
      "Gordon nghĩ ra một số. Anh ấy lấy số đó cộng thêm 38 rồi trừ đi 42 thì được số lẻ nhỏ nhất có hai chữ số. Tìm số đó.",
    options: ["15", "25", "14", "7"],
    strand: "Arithmetic / Số học",
    topicId: "topic-09",
    diagram: "p5-inverse",
    correct: 0,
    explanation:
      "Số lẻ nhỏ nhất có hai chữ số là 11.\nTa có sơ đồ như hình minh họa: số cần tìm cộng 38 được 53; 53 trừ 42 được 11.\nTính ngược: 11 + 42 = 53; 53 − 38 = 15.\nĐáp số: A.",
  },
  {
    sourceNumber: 9,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Let X and Y be different 1-digit numbers. If the equation below is correct, find the value of Y.",
    translation:
      "Cho X và Y là các số có một chữ số khác nhau. Biết rằng phép toán dưới đây là đúng, tìm giá trị của Y.",
    options: ["4", "8", "9", "7"],
    strand: "Arithmetic / Số học",
    topicId: "topic-10",
    correct: 2,
    explanation:
      "Xét hàng đơn vị: Y + Y = 8 hoặc Y + Y = 18 (phép cộng có nhớ 1).\n+ Với Y + Y = 8 thì Y = 4, X = 4. Điều này không thỏa mãn X và Y là 2 số khác nhau.\n+ Với Y + Y = 18 thì Y = 9 và X + 1 = 4 nên X = 3 thỏa mãn bài toán.\nĐáp số: C.",
    diagram: "p5-addition",
  },
  {
    sourceNumber: 10,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "According to the pattern of the following sequence, find the sum of the first eight numbers.",
    translation:
      "Dựa vào quy luật dãy số dưới đây, hãy tìm tổng của 8 số đầu tiên.",
    options: ["21", "54", "44", "34"],
    strand: "Arithmetic / Số học",
    topicId: "topic-01",
    correct: 1,
    explanation:
      "Quy luật: Tổng 2 số hạng liên tiếp bằng số tiếp theo của dãy.\n1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; …\nSố thứ bảy của dãy là: 5 + 8 = 13.\nSố thứ tám của dãy là: 8 + 13 = 21.\nTổng của 8 số hạng đầu tiên của dãy là:\n1 + 1 + 2 + 3 + 5 + 8 + 13 + 21\n= (1 + 1 + 8) + (2 + 3 + 5) + 13 + 21\n= 10 + 10 + 13 + 21\n= 54.\nĐáp số: B.",
    diagram: "p5-sequence10",
  },
  {
    sourceNumber: 11,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "According to the pattern below, find the value of the 7th number in the sequence.",
    translation:
      "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 7 trong dãy.",
    options: ["18", "19", "23", "27"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "topic-01",
    correct: 3,
    explanation:
      "Quy luật: Các số trong dãy tăng dần 4 đơn vị.\n3 + 4 = 7; 7 + 4 = 11; 11 + 4 = 15; …\nSố thứ 5 của dãy là: 15 + 4 = 19.\nSố thứ 6 của dãy là: 19 + 4 = 23.\nSố thứ 7 của dãy là: 23 + 4 = 27.\nĐáp số: D.",
    diagram: "p5-sequence11",
  },
  {
    sourceNumber: 12,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "From 7 to 23, how many 2-digit numbers are there?",
    translation: "Trong các số từ 7 đến 23, hỏi có bao nhiêu số có hai chữ số?",
    options: ["13", "14", "15", "16"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Các số có 2 chữ số thỏa mãn là: 10, 11, 12, 13, …, 23.\nTừ 1 đến 23 có 23 số.\nTừ 1 đến 9 có 9 số.\nVậy từ 10 đến 23 có 23 − 9 = 14 số.\nĐáp số: B.",
  },
  {
    sourceNumber: 13,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Cara has 40 candies and Jolie has 20 candies. How many candies does Cara have to give to Jolie to make them have the same number of candies?",
    translation:
      "Cara có 40 cái kẹo và Jolie có 20 cái kẹo. Hỏi Cara phải cho Jolie bao nhiêu cái kẹo để hai bạn có số kẹo bằng nhau?",
    options: ["20", "15", "10", "5"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "topic-14",
    correct: 2,
    explanation:
      "Tổng số kẹo của 2 bạn là: 40 + 20 = 60 (cái).\nChia đều 60 cái kẹo cho 2 bạn thì mỗi bạn sẽ có 60 : 2 = 30 cái kẹo.\nVậy Cara cần cho Jolie số kẹo là: 40 − 30 = 10 (cái).\nĐáp số: C.",
  },
  {
    sourceNumber: 14,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Refer to these numbers, how many odd numbers greater than 39 are there?",
    translation: "Trong các số dưới đây, hỏi có bao nhiêu số lẻ lớn hơn 39?",
    options: ["3", "2", "4", "1"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Các số lẻ lớn hơn 39 là 93 và 41.\nVậy có 2 số lẻ lớn hơn 39 trong các số đã cho.\nĐáp số: B.",
    diagram: "p5-numbers14",
  },
  {
    sourceNumber: 15,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Fill in the blank to get a correct equation.",
    translation: "Điền số thích hợp vào chỗ trống để được phép toán đúng.",
    options: ["17", "27", "61", "71"],
    strand: "Number Theory / Lý thuyết số",
    topicId: "topic-07",
    correct: 0,
    explanation:
      "X + 27 = 19 + 48 − 23\nX + 27 = 44\nX = 44 − 27\nX = 17.\nĐáp số: A.",
    diagram: "p5-equation",
  },
  {
    sourceNumber: 16,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "At least how many cubes are there in the figure below?",
    translation: "Hình dưới đây có ít nhất bao nhiêu khối lập phương?",
    options: ["8", "7", "6", "9"],
    strand: "Geometry / Hình học",
    topicId: "topic-19",
    correct: 0,
    explanation:
      "Ta đánh số các khối lập phương như hình minh họa.\nVậy có ít nhất 8 khối lập phương trong hình đã cho.\nĐáp số: A.",
    diagram: "p5-cubes-count",
  },
  {
    sourceNumber: 17,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "At least how many squares can be seen if viewing the figure from top?",
    translation:
      "Nếu nhìn hình dưới đây từ trên xuống thì có thể thấy được ít nhất bao nhiêu hình vuông?",
    options: ["3", "4", "6", "5"],
    strand: "Geometry / Hình học",
    topicId: "topic-17",
    correct: 3,
    explanation:
      "Ta đánh số các hình vuông thấy được khi nhìn hình đã cho từ trên xuống như hình minh họa.\nVậy có thể thấy ít nhất 5 hình vuông khi nhìn hình đã cho từ trên xuống.\nĐáp số: D.",
    diagram: "p5-cubes-top",
  },
  {
    sourceNumber: 18,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "How many triangles are there in the figure below?",
    translation: "Hình dưới đây có bao nhiêu hình tam giác?",
    options: ["5", "8", "10", "12"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Ta đánh số các mảnh như hình minh họa.\nHình tam giác đơn: 5 hình, là 1, 2, 3, 4, 5.\nHình tam giác tạo bởi 2 tam giác đơn và 1 ngũ giác: 5 hình, là (1, 3, 6), (2, 4, 6), (3, 5, 6), (4, 1, 6) và (5, 2, 6).\nTổng số hình tam giác là: 5 + 5 = 10 (hình).\nĐáp số: C.",
    diagram: "p5-triangles",
  },
  {
    sourceNumber: 19,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Daniel draws 6 lines on a sheet of paper. At most how many squares can be formed by Daniel?",
    translation:
      "Daniel vẽ 6 đường thẳng trên một tờ giấy. Hỏi anh ấy có thể tạo ra nhiều nhất bao nhiêu hình vuông?",
    options: ["1", "4", "5", "6"],
    strand: "Geometry / Hình học",
    topicId: "unassigned",
    diagram: "p5-max-squares",
    correct: 2,
    explanation:
      "Daniel có thể tạo được nhiều nhất 5 hình vuông như hình minh họa.\nĐáp số: C.",
  },
  {
    sourceNumber: 20,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "According to the pattern shown below, how many circles are there in the first 20 figures?",
    translation:
      "Dựa vào quy luật dưới đây, có bao nhiêu hình tròn trong 20 hình đầu tiên?",
    options: ["6", "8", "10", "12"],
    strand: "Geometry / Hình học",
    topicId: "topic-16",
    correct: 1,
    explanation:
      "Quy luật: Nhóm 5 hình (□ □ ▲ ○ ○) lặp lại.\n20 hình đầu tiên gồm 20 : 5 = 4 nhóm.\nTrong mỗi nhóm có 2 hình tròn nên trong 4 nhóm có 2 × 4 = 8 hình tròn.\nĐáp số: B.",
    diagram: "p5-circles",
  },
  {
    sourceNumber: 21,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Separate the following stars into 3 equal groups. How many stars are there in the first 2 groups?",
    translation:
      "Chia các hình ngôi sao dưới đây thành 3 nhóm bằng nhau. Hỏi có bao nhiêu hình ngôi sao trong 2 nhóm đầu tiên?",
    options: ["3", "4", "6", "9"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 2,
    explanation:
      "Chia đều 9 hình ngôi sao vào 3 nhóm thì mỗi nhóm có 9 : 3 = 3 ngôi sao.\nTrong 2 nhóm đầu tiên có 3 + 3 = 6 ngôi sao.\nĐáp số: C.",
    diagram: "p5-stars",
  },
  {
    sourceNumber: 22,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Arrange these numbers in descending order to find the 4th largest number.",
    translation: "Sắp xếp các số sau từ lớn đến bé để tìm số lớn thứ tư.",
    options: ["39", "50", "46", "73"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "topic-20",
    correct: 1,
    explanation:
      "Các số được sắp xếp theo thứ tự từ lớn đến bé như sau: 91, 82, 73, 50, 46, 39, 23.\nVậy số lớn thứ tư là 50.\nĐáp số: B.",
    diagram: "p5-numbers22",
  },
  {
    sourceNumber: 23,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Tom chooses 2 different digits from 1, 4 and 7 to form 2-digit numbers. Among those numbers, how many odd numbers are there?",
    translation:
      "Tom chọn 2 chữ số khác nhau từ 1, 4 và 7 để lập thành các số có hai chữ số. Trong số đó có bao nhiêu số lẻ?",
    options: ["3", "4", "5", "6"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    correct: 1,
    explanation:
      "Các số lẻ có 2 chữ số lập được là: 17, 41, 47, 71.\nĐáp số: B.",
  },
  {
    sourceNumber: 24,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "In how many ways can we distribute 6 identical flowers into 3 different vases given that no vases are empty?",
    translation:
      "Hỏi có bao nhiêu cách để cắm 6 bông hoa giống nhau vào 3 lọ hoa khác nhau sao cho lọ nào cũng có hoa?",
    options: ["2", "9", "10", "18"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "unassigned",
    diagram: "p5-flowers-table",
    correct: 2,
    explanation:
      "Ta có thể cắm hoa theo các cách trong bảng minh họa.\nĐáp số: C.",
  },
  {
    sourceNumber: 25,
    sourcePaper: "Đề số 5 · Vòng loại TIMO lớp 2",
    text: "Kesha has 2 different T-shirts and 3 different pants. Each day, she mixes a shirt with a pant to make a set of clothes. At most how many different sets of clothes can she mix?",
    translation:
      "Kesha có 2 chiếc áo phông khác nhau và 3 chiếc quần khác nhau. Mỗi ngày, cô bé phối 1 chiếc áo với 1 chiếc quần để có một bộ quần áo. Hỏi cô bé có thể phối nhiều nhất bao nhiêu bộ quần áo khác nhau?",
    options: ["6", "3", "5", "8"],
    strand: "Combinatorics / Tổ hợp",
    topicId: "topic-23",
    correct: 0,
    explanation:
      "Cách 1:\nVới chiếc áo phông thứ nhất Kesha có thể phối với 3 chiếc quần được 3 bộ quần áo.\nVới chiếc áo phông thứ hai Kesha có thể phối với 3 chiếc quần được 3 bộ quần áo.\nVậy tổng số bộ quần áo Kesha có thể phối là 3 + 3 = 6 (bộ).\nCách 2:\nSố cách Kesha chọn áo là: 2 cách.\nSố cách Kesha chọn quần là: 3 cách.\nSố cách phối quần áo là: 2 × 3 = 6 (cách).\nĐáp số: A.",
  },
];
