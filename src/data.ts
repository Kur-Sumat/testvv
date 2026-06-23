/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Teacher, Course, AttendanceRecord, GradeRecord, NewsItem, Announcement } from "./types";

export const COLLEGE_INFO = {
  nameTh: "วิทยาลัยอาชีวศึกษาเลย",
  nameEn: "Loei Vocational College",
  slogan: "ทักษะเด่น เน้นคุณธรรม ล้ำเลิศวิชาการ",
  philosophy: "มุ่งมั่นพัฒนาการเรียนการสอนด้านเทคโนโลยีและวิชาชีพ เพื่อผลิตกำลังคนที่มีความสามารถและจริยธรรม ตอบสนองความต้องการของสังคมและประเทศชาติ",
  vision: "วิทยาลัยอาชีวศึกษาเลยเป็นเลิศด้านนวัตกรรมอาชีวศึกษาระดับประเทศ พัฒนากำลังคนสู่ระดับสากลตามหลักปรัชญาของเศรษฐกิจพอเพียง ภายในปี พ.ศ. 2570",
  address: "เลขที่ 251 ถนนมลิวรรณ ตำบลกุดป่อง อำเภอเมืองเลย จังหวัดเลย 42000",
  phone: "042-811-545",
  fax: "042-812-165",
  email: "loeitech01@gmail.com",
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "66302040001",
    name: "นายสมเกียรติ พัฒนาดี",
    nameEn: "Mr. Somkiat Pattanadee",
    major: "สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล / คอมพิวเตอร์ธุรกิจ",
    department: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    level: "ปวส.",
    year: 2,
    gpa: 3.82,
    advisor: "นางสาวสมบูรณ์ สุขสวัสดิ์",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    classGroup: "บก.66.1",
  },
  {
    id: "66302040002",
    name: "นางสาวมณีรัตน์ แสงทอง",
    nameEn: "Miss Maneerat Saengthong",
    major: "สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล / คอมพิวเตอร์ธุรกิจ",
    department: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    level: "ปวส.",
    year: 2,
    gpa: 3.65,
    advisor: "นางสาวสมบูรณ์ สุขสวัสดิ์",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    classGroup: "บก.66.1",
  },
  {
    id: "66302040003",
    name: "นายปกรณ์ บุญช่วยเหลือ",
    nameEn: "Mr. Pakorn Boonchuay",
    major: "สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล / คอมพิวเตอร์ธุรกิจ",
    department: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    level: "ปวส.",
    year: 2,
    gpa: 3.24,
    advisor: "นางสาวสมบูรณ์ สุขสวัสดิ์",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    classGroup: "บก.66.1",
  },
  {
    id: "66201010012",
    name: "นายอภิชาติ ประกายรุ่ง",
    nameEn: "Mr. Apichat Pakairung",
    major: "สาขาวิชาการท่องเที่ยว",
    department: "แผนกวิชาการโรงแรมและการท่องเที่ยว",
    level: "ปวช.",
    year: 3,
    gpa: 3.45,
    advisor: "นายวิชัย แก่งการอนันต์",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    classGroup: "ทท.64.2",
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "teacher1",
    name: "อาจารย์สมศักดิ์ สุขวัฒนา",
    position: "หัวหน้าแผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    department: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    email: "somsak.s@loeitech.ac.th",
  },
  {
    id: "teacher2",
    name: "นางสาวสมบูรณ์ สุขสวัสดิ์",
    position: "อาจารย์ผู้สอนสาขาวิชาเทคโนโลยีธุรกิจดิจิทัล",
    department: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "somboon.s@loeitech.ac.th",
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: "30001-2001",
    name: "วิชาการเขียนโปรแกรมบนอุปกรณ์เคลื่อนที่ (Mobile Application)",
    credits: 3,
    classGroup: "บก.66.1",
    day: "Monday",
    time: "08:30 - 12:30",
    room: "ห้องปฎิบัติการคอมพิวเตอร์ 432",
    teacherId: "teacher1",
    studentIds: ["66302040001", "66302040002", "66302040003"],
  },
  {
    id: "30001-2002",
    name: "วิชาความมั่นคงปลอดภัยไซเบอร์เบื้องต้น (Introduction to Cyber Security)",
    credits: 3,
    classGroup: "บก.66.1",
    day: "Tuesday",
    time: "13:00 - 17:00",
    room: "ห้องปฎิบัติการคอมพิวเตอร์ 433",
    teacherId: "teacher1",
    studentIds: ["66302040001", "66302040002", "66302040003"],
  },
  {
    id: "30001-3005",
    name: "วิชาเทคโนโลยีการจัดการฐานข้อมูล (Database Management Technology)",
    credits: 3,
    classGroup: "บก.66.1",
    day: "Wednesday",
    time: "08:30 - 12:30",
    room: "ห้องปฎิบัติการคอมพิวเตอร์ 431",
    teacherId: "teacher2",
    studentIds: ["66302040001", "66302040002", "66302040003"],
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // 30001-2001 - Mobile App (Monday)
  { studentId: "66302040001", courseId: "30001-2001", date: "2026-06-15", status: "P" },
  { studentId: "66302040002", courseId: "30001-2001", date: "2026-06-15", status: "P" },
  { studentId: "66302040003", courseId: "30001-2001", date: "2026-06-15", status: "L" }, // late

  { studentId: "66302040001", courseId: "30001-2001", date: "2026-06-08", status: "P" },
  { studentId: "66302040002", courseId: "30001-2001", date: "2026-06-08", status: "P" },
  { studentId: "66302040003", courseId: "30001-2001", date: "2026-06-08", status: "P" },

  // 30001-2002 - Cyber Security (Tuesday)
  { studentId: "66302040001", courseId: "30001-2002", date: "2026-06-16", status: "P" },
  { studentId: "66302040002", courseId: "30001-2002", date: "2026-06-16", status: "S" }, // sick
  { studentId: "66302040003", courseId: "30001-2002", date: "2026-06-16", status: "P" },

  // 30001-3005 - Database (Wednesday)
  { studentId: "66302040001", courseId: "30001-3005", date: "2026-06-10", status: "P" },
  { studentId: "66302040002", courseId: "30001-3005", date: "2026-06-10", status: "P" },
  { studentId: "66302040003", courseId: "30001-3005", date: "2026-06-10", status: "A" }, // absent
];

export const INITIAL_GRADES: GradeRecord[] = [
  {
    studentId: "66302040001",
    courseId: "30001-2001",
    homework: 28,
    midterm: 27,
    final: 26,
    behavior: 10,
    total: 91,
    grade: "4.0",
  },
  {
    studentId: "66302040002",
    courseId: "30001-2001",
    homework: 26,
    midterm: 25,
    final: 24,
    behavior: 10,
    total: 85,
    grade: "4.0",
  },
  {
    studentId: "66302040003",
    courseId: "30001-2001",
    homework: 20,
    midterm: 21,
    final: 18,
    behavior: 9,
    total: 68,
    grade: "2.5",
  },
  // Courses that are not finalized yet have blank or ongoing scores
  {
    studentId: "66302040001",
    courseId: "30001-2002",
    homework: 25,
    midterm: 24,
    final: 0,
    behavior: 10,
    total: 59,
    grade: "ยังไม่ส่งผลการเรียน",
  },
  {
    studentId: "66302040002",
    courseId: "30001-2002",
    homework: 22,
    midterm: 20,
    final: 0,
    behavior: 9,
    total: 51,
    grade: "ยังไม่ส่งผลการเรียน",
  },
  {
    studentId: "66302040003",
    courseId: "30001-2002",
    homework: 18,
    midterm: 15,
    final: 0,
    behavior: 8,
    total: 41,
    grade: "ยังไม่ส่งผลการเรียน",
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "วิทยาลัยอาชีวศึกษาเลย ได้รับรางวัลชนะเลิศการประกวดสิ่งประดิษฐ์คนรุ่นใหม่ ระดับภาค ปีการศึกษา 2568",
    content: "วิทยาลัยอาชีวศึกษาเลย นำทีมโดยท่านผู้อำนวยการ คณะครูอาจารย์ และนักศึกษาแผนกวิชาการออกแบบและคอมพิวเตอร์ธุรกิจ คว้ารางวัลชนะเลิศอันดับ 1 ในการประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่และนวัตกรรมอาชีวศึกษา ระดับภาคประจำปี 2568 ชัยชนะครั้งนี้สะท้อนความมุ่งมั่นทุ่มเทพัฒนาเทคโนโลยีที่มีส่วนช่วยยกระดับชุมชนและภาคอุตสาหกรรมในทักษะงานจริงตามปรัชญาการทำงานของเยาวชนคนอาชีวะเลยที่มุ่งสร้างงานที่ใช้งานได้จริง เป็นประโยชน์เด่นชัดและยั่งยืน",
    date: "2026-06-15",
    category: "publicity",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    views: 432,
    important: true
  },
  {
    id: "news-2",
    title: "ประกาศรับสมัครนักศึกษาใหม่ โควตาพิเศษและรอบทั่วไป ประจำปีการศึกษา 2569 - ระดับ ปวช. และ ปวส.",
    content: "วิทยาลัยอาชีวศึกษาเลยเปิดรับสมัครบุคคลเข้าศึกษาต่อในระดับประกาศนียบัตรวิชาชีพ (ปวช.) และระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.) ประจำปีการศึกษา 2569 โควตาเรียนดี มีความสามารถ และเปิดรับสายบริหารธุรกิจ ศิลปกรรม และอุตสาหกรรมการท่องเที่ยว โดยผู้สนใจสามารถสมัครผ่านระบบออนไลน์ที่ loeitech.ac.th หรือติดต่อสอบถามรายละเอียด ได้ที่งานทะเบียน อาคารอำนวยการวิทยาลัยอาชีวศึกษาเลย",
    date: "2026-06-12",
    category: "admission",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    views: 890,
    important: true
  },
  {
    id: "news-3",
    title: "โครงการอบรมเชิงปฏิบัติการพัฒนาทักษะเทคโนโลยิจิทัลสำหรับบุคลากรครูและอาจารย์ ประจำปีการศึกษา 2569",
    content: "งานบุคลากร ฝ่ายบริการการศึกษา ร่วมกับแผนกคอมพิวเตอร์ จัดกิจกรรมฝึกอบรมเชิงปฏิบัติการเครื่องมือการสอนด้วย AI และเครื่องมือพัฒนาห้องเรียนดิจิทัล เพื่อก้าวเข้าสู่การเรียนรู้และจัดการเรียนการสอนแบบ Active Learning ยุคดิจิทัลเต็มรูปแบบ ณ ห้องปฏิบัติการคอมพิวเตอร์ อาคารวิทยบริการ เพื่อยกระดับความสามารถในการถ่ายทอด และยกระดับวิชาชีพครูอาชีวศึกษาให้สอดรับกับการเปลี่ยนแปลงอย่างรวดเร็วของโลกเทคโนโลยี",
    date: "2026-06-10",
    category: "educational",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
    views: 310,
  },
  {
    id: "news-4",
    title: "ประกาศจัดซื้อจัดจ้าง: เครื่องมือและอุปกรณ์คอมพิวเตอร์ประจำโรงฝึกปฏิบัติการวิทยาการดิจิทัล ประจำปีงบประมาณ 2569",
    content: "ประกาศจากงานพัสดุและจัดหาฯ วิทยาลัยอาชีวศึกษาเลย เรื่องการเปิดประมูลจัดซื้อจัดจ้างระบบปฏิบัติการประหยัดพลังงาน ตลอดจนถึงการจัดซื้อจัดหาครุภัณฑ์การศึกษาประจำปี รายละเอียดข้อกำหนดแบบเสนอราคาและเอกสารประกาศเชิญชวนสามารถดาวน์โหลดผ่านและยื่นซองเอกสารได้ตั้งแต่บัดนี้ถึงวันที่ 30 มิถุนายนนี้",
    date: "2020-06-08",
    category: "procurement",
    views: 115,
  },
  {
    id: "news-5",
    title: "กิจกรรมประกวดทักษะวิชาชีพและทักษะพื้นฐาน อวท. ระดับสถานศึกษา ประจำปีการศึกษา 2569",
    content: "องค์การนักวิชาชีพในอนาคตแห่งประเทศไทย (อวท.) ร่วมกับงานกิจกรรม วิทยาลัยอาชีวศึกษาเลย จัดวันปฐมนิเทศและเริ่มการแข่งขันทักษะวิชาชีพทุกประเภทรวมถึงการแข่งขันทักษะการกล่าวสุนทรพจน์ ทักษะการพัฒนาโปรแกรมคอมพิวเตอร์ และทักษะการท่องเที่ยวเชิงอนุรักษ์ธรรมชาติ ประจำปีในรอบคัดเลือกภายในสถาบัน เพื่อคัดผู้แทนเข้าร่วมประกวดในระดับจังหวัดและภาคตะวันออกเฉียงเหนือต่อไป",
    date: "2026-06-05",
    category: "events",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    views: 295,
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    courseId: "30001-2001",
    title: "ส่งความคืบหน้ารอบที่ 1 - โมบายแอปพลิเคชันช่วยเหลือสังคม",
    content: "ขอให้นักศึกษาทุกคนอัปโหลดโครงสร้างของหน้าจอแอพพลิเคชัน (Wireframe / Figma Link) พร้อมทั้งคำอธิบายหลักการทำงานเบื้องต้นลงในระบบสัปดาห์นี้ก่อนคาบเรียนวันจันทร์ถัดไป เพื่อรับคอมเมนต์แนะนำเพิ่มเติมจากอาจารย์ผู้สอน",
    date: "2026-06-14 10:20",
    author: "อาจารย์สมศักดิ์ สุขวัฒนา",
  },
  {
    id: "ann-2",
    courseId: "30001-3005",
    title: "สอบเก็บคะแนนกลางภาคบทที่ 1-3 (ER-Diagram และ Normalization)",
    content: "สัปดาห์หน้านัดสอบย่อยกลางภาคประจำรายวิชา เก็บคะแนนสะสม 15% สอบแบบเปิดหนังสือได้ ขอให้นักเรียนเตรียมอุปกรณ์การเรียน สมุดบันทึก และทบทวนความเข้าใจในหัวข้อการจัดกลุ่ม Normal Form ให้ดี มีข้อสงสัยประการใดสามารถสอบถามทางอีเมลอาจารย์ได้ทันที",
    date: "2026-06-12 14:05",
    author: "นางสาวสมบูรณ์ สุขสวัสดิ์",
  }
];

export const EXECUTIVE_BOARD = [
  {
    name: "ดร.สุวิทย์ มุกดา",
    position: "ผู้อำนวยการวิทยาลัยอาชีวศึกษาเลย",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    quote: "มุ่งมั่นสร้างทรัพยากรมนุษย์สายวิชาชีพ พัฒนาทักษะเชิงนวัตกรรม ปูทางสู่อนาคตที่มั่นคงและยั่งยืน"
  },
  {
    name: "นายเฉลิม แสงวิราช",
    position: "รองผู้อำนวยการฝ่ายวิชาการ",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "นางพจนา สุวรรณฉัตร",
    position: "รองผู้อำนวยการฝ่ายแผนงานและความร่วมมือ",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "นายบรรเลง รัตนกูล",
    position: "รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียนนักศึกษา",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  }
];

export const DEPARTMENTS_LIST = [
  {
    category: "บริหารธุรกิจและเทคโนโลยีด้านพาณิชย์ (Business & Technology)",
    items: [
      { id: "computer_business", name: "แผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล", code: "CBD", desc: "การปรับปรุงธุรกิจด้วยเทคโนโลยีดิจิทัล พัฒนาโปรแกรม ซีเคียวริตี้เบื้องต้น วิดีโอคอนเทนต์ และพาณิชย์อิเล็กทรอนิกส์", studentsCount: 340, coursesCount: 25 },
      { id: "accounting", name: "แผนกวิชาการบัญชี", code: "ACC", desc: "ตรวจสอบเอกสารและบันทึกบัญชีการเงิน วางระบบภาษีอากร การกรอกภาษีอิเล็กทรอนิกส์สำหรับภาคธุรกิจ", studentsCount: 410, coursesCount: 15 },
      { id: "marketing", name: "แผนกวิชาการตลาด", code: "MKT", desc: "กลยุทธ์การขาย พัฒนาผลิตภัณฑ์ การส่งออกแบบโมเดิร์นเทรด และการตลาดดิจิทัลบนโซเชียลมีเดียทราฟฟิค", studentsCount: 210, coursesCount: 14 }
    ]
  },
  {
    category: "ศิลปกรรม คหกรรมศาสตร์ และบริการการท่องเที่ยว (Fine Arts, Services & Hospitality)",
    items: [
      { id: "home_economics", name: "แผนกวิชาคหกรรมศาสตร์", code: "HEC", desc: "ศิลปะการออกแบบแฟชั่นเสื้อผ้า ผสมผสานธุรกิจอาหาร ขนมไทย เบเกอรี่คุณภาพ และงานออกแบบดูแลความงามสไตล์คราฟท์", studentsCount: 150, coursesCount: 12 },
      { id: "tourism", name: "แผนกวิชาการโรงแรมและการท่องเที่ยว", code: "HOT", desc: "ฝึกฝนทักษะการโรงแรม งานต้อนรับส่วนหน้า บริการอาหารและเครื่องดื่มมาตรฐาน และผู้นำการท่องเที่ยวเชิงนิเวศเพื่อผลักดันการท่องเที่ยวจังหวัดเลย", studentsCount: 180, coursesCount: 15 }
    ]
  }
];

export const SYSTEM_LINKS = [
  { name: "ระบบลงทะเบียนเรียน (STD)", url: "#", icon: "BookOpen" },
  { name: "ระบบแผงช่วยเหลือการเงิน (กยศ.)", url: "#", icon: "DollarSign" },
  { name: "ระบบสถิติห้องสมุดอิเล็กทรอนิกส์", url: "#", icon: "Library" },
  { name: "ระบบฝึกสอนทางไกล (e-Learning)", url: "#", icon: "MonitorPlay" },
  { name: "ระบบตรวจสอบสลิปเงินเดือนวิทยาศาสตร์ (ครู)", url: "#", icon: "ShieldCheck" },
  { name: "ระบบประเมินจิตพิสัยออนไลน์ (อสม.)", url: "#", icon: "Users" }
];
