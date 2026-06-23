/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string; // Student ID e.g. "66302010001"
  name: string;
  nameEn: string;
  major: string; // แผนกวิชา
  department: string; // สาขาวิชา เช่น คอมพิวเตอร์ธุรกิจ
  level: "ปวช." | "ปวส."; // ระดับการศึกษา
  year: number; // ชั้นปี
  gpa: number;
  advisor: string;
  profileImage: string;
  classGroup: string; // กลุ่มเรียน
}

export interface Teacher {
  id: string; // Teacher Username e.g. "t.somchai"
  name: string;
  position: string;
  department: string;
  profileImage: string;
  email: string;
}

export interface Course {
  id: string; // e.g., "30001-1001"
  name: string;
  credits: number;
  classGroup: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  time: string; // e.g. "08:30 - 11:30"
  room: string;
  teacherId: string;
  studentIds: string[];
}

export interface AttendanceRecord {
  studentId: string;
  courseId: string;
  date: string; // YYYY-MM-DD
  status: "P" | "A" | "L" | "S" | "E"; // Present, Absent, Late, Sick, Excuse
}

export interface GradeRecord {
  studentId: string;
  courseId: string;
  homework: number; // 30
  midterm: number;  // 30
  final: number;    // 30
  behavior: number; // 10
  total: number;    // 100
  grade: string;    // "4.0", "3.5", etc.
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "publicity" | "procurement" | "events" | "admission" | "educational";
  image?: string;
  views: number;
  important?: boolean;
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  content: string;
  date: string;
  author: string;
}
