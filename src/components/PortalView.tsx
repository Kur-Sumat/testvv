/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Student, 
  Teacher, 
  Course, 
  AttendanceRecord, 
  GradeRecord, 
  Announcement 
} from "../types";
import { 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_COURSES, 
  INITIAL_ATTENDANCE, 
  INITIAL_GRADES, 
  INITIAL_ANNOUNCEMENTS 
} from "../data";
import { 
  LogIn, 
  User, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  Save, 
  Plus, 
  Megaphone, 
  TrendingUp, 
  UserCheck, 
  ShieldAlert, 
  Lock,
  Mail,
  ChevronRight,
  Clock,
  MapPin,
  ClipboardList
} from "lucide-react";

interface PortalViewProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  userType: "student" | "teacher" | null;
  setUserType: (type: "student" | "teacher" | null) => void;
  loggedInUserId: string | null;
  setLoggedInUserId: (id: string | null) => void;
}

export default function PortalView({
  isLoggedIn,
  setIsLoggedIn,
  userType,
  setUserType,
  loggedInUserId,
  setLoggedInUserId,
}: PortalViewProps) {
  // --- STATE PERSISTENCE USING LOCALSTORAGE ---
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("ltc_students");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem("ltc_teachers");
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("ltc_courses");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem("ltc_attendance");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  const [grades, setGrades] = useState<GradeRecord[]>(() => {
    const saved = localStorage.getItem("ltc_grades");
    return saved ? JSON.parse(saved) : INITIAL_GRADES;
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem("ltc_announcements");
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Save states to localstorage whenever they change
  useEffect(() => {
    localStorage.setItem("ltc_students", JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem("ltc_teachers", JSON.stringify(teachers));
  }, [teachers]);
  useEffect(() => {
    localStorage.setItem("ltc_courses", JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem("ltc_attendance", JSON.stringify(attendance));
  }, [attendance]);
  useEffect(() => {
    localStorage.setItem("ltc_grades", JSON.stringify(grades));
  }, [grades]);
  useEffect(() => {
    localStorage.setItem("ltc_announcements", JSON.stringify(announcements));
  }, [announcements]);

  // --- LOGIN STATES ---
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [portalTab, setPortalTab] = useState<"student_login" | "teacher_login">("student_login");

  // --- DASHBOARD ACTIVE TAB STATES ---
  const [studentDashTab, setStudentDashTab] = useState<"academic" | "timetable" | "attendance" | "notices">("academic");
  const [teacherDashTab, setTeacherDashTab] = useState<"courses" | "attendance" | "grades_entry" | "notices" | "stats">("courses");
  
  // --- TEACHER CONTROL ACTIVE STATES ---
  const [teacherSelectedCourseId, setTeacherSelectedCourseId] = useState<string>("");
  const [attRecordDate, setAttRecordDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "P" | "A" | "L" | "S" | "E">>({});
  
  // Scoring edits state
  const [editedGrades, setEditedGrades] = useState<Record<string, { homework: number; midterm: number; final: number; behavior: number }>>({});
  
  // Create notice state
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [noticeSuccessMsg, setNoticeSuccessMsg] = useState("");

  // Student Advisor Message State
  const [adviseText, setAdviseText] = useState("");
  const [adviseRecords, setAdviseRecords] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: "System", text: "ยินดีต้อนรับสู่กล่องแชทปรึกษาอาจารย์ที่ปรึกษาออนไลน์ ท่านสามารถฝากข้อคำถามประสานงานได้ที่นี่", time: "10:30 น." }
  ]);

  // Compute Active Entities
  const currentStudent = students.find(s => s.id === loggedInUserId);
  const currentTeacher = teachers.find(t => t.id === loggedInUserId);

  // Default teacher course select on load
  useEffect(() => {
    if (isLoggedIn && userType === "teacher" && currentTeacher) {
      const teacherCourses = courses.filter(c => c.teacherId === currentTeacher.id);
      if (teacherCourses.length > 0 && !teacherSelectedCourseId) {
        setTeacherSelectedCourseId(teacherCourses[0].id);
      }
    }
  }, [isLoggedIn, userType, currentTeacher, courses, teacherSelectedCourseId]);

  // Load student attendance options or grade rows whenever course changes for teacher
  useEffect(() => {
    if (teacherSelectedCourseId) {
      const activeCourse = courses.find(c => c.id === teacherSelectedCourseId);
      if (activeCourse) {
        // Init temporary grade state
        const initialGradeMap: typeof editedGrades = {};
        activeCourse.studentIds.forEach(sid => {
          const sgrade = grades.find(g => g.studentId === sid && g.courseId === teacherSelectedCourseId);
          initialGradeMap[sid] = sgrade ? {
            homework: sgrade.homework,
            midterm: sgrade.midterm,
            final: sgrade.final,
            behavior: sgrade.behavior
          } : { homework: 0, midterm: 0, final: 0, behavior: 0 };
        });
        setEditedGrades(initialGradeMap);

        // Init attendance options map for date
        const initialAttMap: Record<string, "P" | "A" | "L" | "S" | "E"> = {};
        activeCourse.studentIds.forEach(sid => {
          const matched = attendance.find(a => a.studentId === sid && a.courseId === teacherSelectedCourseId && a.date === attRecordDate);
          initialAttMap[sid] = matched ? matched.status : "P";
        });
        setAttendanceMap(initialAttMap);
      }
    }
  }, [teacherSelectedCourseId, attRecordDate, courses]);

  // Handle Login Logic
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (portalTab === "student_login") {
      const found = students.find(s => s.id === inputUsername && (inputPassword === "1234" || inputPassword === s.id));
      if (found) {
        setIsLoggedIn(true);
        setUserType("student");
        setLoggedInUserId(found.id);
        setInputUsername("");
        setInputPassword("");
      } else {
        setLoginError("รหัสประจำตัวนักศึกษาหรือรหัสผ่านไม่ถูกต้อง (กรุณาป้อนรหัสตามบัญชีแนะนำ)");
      }
    } else {
      const found = teachers.find(t => t.id === inputUsername && (inputPassword === "1234" || inputPassword === t.id));
      if (found) {
        setIsLoggedIn(true);
        setUserType("teacher");
        setLoggedInUserId(found.id);
        setInputUsername("");
        setInputPassword("");
      } else {
        setLoginError("ชื่อผู้ใช้งานของอาจารย์หรือรหัสผ่านไม่ถูกต้อง (กรุณาป้อนรหัสตามบัญชีแนะนำ)");
      }
    }
  };

  const handleQuickLogin = (role: "student" | "teacher", id: string) => {
    setLoginError("");
    if (role === "student") {
      const found = students.find(s => s.id === id);
      if (found) {
        setIsLoggedIn(true);
        setUserType("student");
        setLoggedInUserId(found.id);
      }
    } else {
      const found = teachers.find(t => t.id === id);
      if (found) {
        setIsLoggedIn(true);
        setUserType("teacher");
        setLoggedInUserId(found.id);
      }
    }
  };

  // Grading calculation details
  const getGradePoint = (totalScore: number): string => {
    if (totalScore >= 80) return "4.0";
    if (totalScore >= 75) return "3.5";
    if (totalScore >= 70) return "3.0";
    if (totalScore >= 65) return "2.5";
    if (totalScore >= 60) return "2.0";
    if (totalScore >= 55) return "1.5";
    if (totalScore >= 50) return "1.0";
    return "0.0 / F";
  };

  // Grade color helper
  const getGradeBgColor = (g: string) => {
    if (g === "4.0" || g === "3.5") return "bg-emerald-100 text-emerald-800";
    if (g === "3.0" || g === "2.5") return "bg-blue-100 text-blue-800";
    if (g === "2.0" || g === "1.5") return "bg-amber-100 text-amber-800";
    if (g.includes("F") || g === "0.0 / F") return "bg-rose-100 text-rose-800";
    return "bg-slate-100 text-slate-600";
  };

  // Attendance rate indicator computation
  const getAttendanceRate = (sid: string, cid?: string): { rate: number; label: string; color: string } => {
    const studentRecords = attendance.filter(a => a.studentId === sid && (!cid || a.courseId === cid));
    if (studentRecords.length === 0) return { rate: 100, label: "ครบถ้วน", color: "text-emerald-600 border-emerald-500 bg-emerald-50" };

    const presentsP = studentRecords.filter(r => r.status === "P" || r.status === "E").length; // Excuses count as OK
    const presentsL = studentRecords.filter(r => r.status === "L").length; // Late is minor OK
    const effectivePresent = presentsP + (presentsL * 0.8); // 5 Lates cost a full day

    const rate = Math.round((effectivePresent / studentRecords.length) * 100);
    
    if (rate >= 80) return { rate, label: "ปกติ / ผ่านเกณฑ์", color: "text-emerald-500 border-emerald-500 bg-emerald-50/50" };
    if (rate >= 75) return { rate, label: "เฝ้าระวังต่ำกว่าเกณฑ์", color: "text-amber-500 border-amber-400 bg-amber-50/50" };
    return { rate, label: "ต่ำกว่า 80% (อันตราย / ไร้สิทธิ์สอบ)", color: "text-rose-500 border-rose-500 bg-rose-50/50" };
  };

  // Save attendance inputs
  const handleSaveAttendance = () => {
    if (!teacherSelectedCourseId) return;

    let updatedAttendance = [...attendance];
    Object.entries(attendanceMap).forEach(([sid, rawStatus]) => {
      const status = rawStatus as "P" | "A" | "L" | "S" | "E";
      // Find exist record on date for student course
      const existingIdx = updatedAttendance.findIndex(
        a => a.studentId === sid && a.courseId === teacherSelectedCourseId && a.date === attRecordDate
      );

      const record: AttendanceRecord = {
        studentId: sid,
        courseId: teacherSelectedCourseId,
        date: attRecordDate,
        status,
      };

      if (existingIdx > -1) {
        updatedAttendance[existingIdx] = record;
      } else {
        updatedAttendance.push(record);
      }
    });

    setAttendance(updatedAttendance);
    alert(`บันทึกสถิติขาดลามาสายของรายวิชา วันที่ ${attRecordDate} สำเร็จเรียบร้อยแล้ว!`);
  };

  // Save grade workbook inputs
  const handleSaveGrades = () => {
    if (!teacherSelectedCourseId) return;

    let updatedGrades = [...grades];
    Object.entries(editedGrades).forEach(([sid, rawScores]) => {
      const scores = rawScores as { homework: number; midterm: number; final: number; behavior: number };
      const sumTotal = scores.homework + scores.midterm + scores.final + scores.behavior;
      const computedGrade = getGradePoint(sumTotal);

      const existingClassIdx = updatedGrades.findIndex(
        g => g.studentId === sid && g.courseId === teacherSelectedCourseId
      );

      const record: GradeRecord = {
        studentId: sid,
        courseId: teacherSelectedCourseId,
        homework: scores.homework,
        midterm: scores.midterm,
        final: scores.final,
        behavior: scores.behavior,
        total: sumTotal,
        grade: computedGrade
      };

      if (existingClassIdx > -1) {
        updatedGrades[existingClassIdx] = record;
      } else {
        updatedGrades.push(record);
      }
    });

    setGrades(updatedGrades);
    alert(`บันทึกและคำนวณตัดคะแนนเกรดเฉลี่ยของแผนห้องเรียนรายวิชานี้เสร็จสิ้น! เพื่อส่งไปยังฐานข้อมูลกลาง`);
  };

  // Post Announcements
  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent || !teacherSelectedCourseId || !currentTeacher) return;

    const newObj: Announcement = {
      id: `ann-${Date.now()}`,
      courseId: teacherSelectedCourseId,
      title: newNoticeTitle,
      content: newNoticeContent,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      author: currentTeacher.name
    };

    setAnnouncements([newObj, ...announcements]);
    setNewNoticeTitle("");
    setNewNoticeContent("");
    setNoticeSuccessMsg("โพสต์ประกาศการเรียนการสอนไปยังวอลล์ความคืบหน้าของนักศึกษาเรียบร้อยแล้ว!");
    setTimeout(() => setNoticeSuccessMsg(""), 6000);
  };

  // Student send advisory chat
  const handleSendAdvise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adviseText) return;

    const newMsg = {
      sender: currentStudent ? currentStudent.name : "นักศึกษา",
      text: adviseText,
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น."
    };

    setAdviseRecords([...adviseRecords, newMsg]);
    setAdviseText("");

    // Simulate teacher fast automated reassurance response in 1 second
    setTimeout(() => {
      setAdviseRecords(prev => [...prev, {
        sender: currentStudent ? currentStudent.advisor : "คุณครูที่ปรึกษา",
        text: `รับทราบค่ะอาจารย์ได้รับเรื่องเรียบร้อยแล้ว เดี๋ยวตรวจสอบเอกสารเพิ่มเติมในระบบให้นะคะ หากมีข้อสงสัยเพิ่มเติมสามารถเข้ามาติดต่ออาจารย์ที่ห้องแผนกสัปดาห์นี้ได้เลยค่ะ`,
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น."
      }]);
    }, 1200);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- STATE 1: NOT LOGGED IN SHIELD CARD --- */}
        {!isLoggedIn ? (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            
            {/* Left Decorator side */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-white text-left flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-500 text-slate-950 font-bold font-serif flex items-center justify-center rounded-xl border border-white text-lg">
                  LV
                </div>
                <div>
                  <span className="text-[9px] bg-red-700 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">LVC PORTAL</span>
                  <h2 className="text-xl font-bold text-amber-400 mt-1">ระบบงานสารสนเทศนักเรียนและครู</h2>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  ระบบบริการข้อมูลสถิตินักศึกษา ผลการเรียน ตารางสอน สถิติเวลาเรียน และช่วยสอนสำหรับคณาจารย์ในวิทยาลัยอาชีวศึกษาเลย
                </p>
              </div>

              {/* Quick Login Preset Box */}
              <div className="space-y-3 pt-6 border-t border-slate-800 mt-6 md:mt-0">
                <p className="text-[10px] font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center space-x-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>บัญชีสาธิตเพื่อการประเมิน (Demo Logins)</span>
                </p>
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/40 transition">
                    <p className="font-semibold text-white">1. บัญชีนักศึกษา (เรียนเด่น เกรดดี)</p>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="font-mono text-amber-400">ID: 66302040001 (รหัสผ่าน: 1234)</span>
                      <button 
                        onClick={() => handleQuickLogin("student", "66302040001")}
                        className="text-amber-500 font-bold hover:underline cursor-pointer"
                      >
                        เข้าใช้ด่วน
                      </button>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/40 transition">
                    <p className="font-semibold text-white">2. บัญชีนักศึกษา (เสี่ยงคะแนนต่ำ/เฝ้าระวัง)</p>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="font-mono text-amber-400">ID: 66302040003 (รหัสผ่าน: 1234)</span>
                      <button 
                        onClick={() => handleQuickLogin("student", "66302040003")}
                        className="text-amber-500 font-bold hover:underline cursor-pointer"
                      >
                        เข้าใช้ด่วน
                      </button>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/40 transition">
                    <p className="font-semibold text-white">3. บัญชีอาจารย์ (หัวหน้าแผนกคอมฯ)</p>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="font-mono text-amber-400">User: teacher1 (รหัสผ่าน: 1234)</span>
                      <button 
                        onClick={() => handleQuickLogin("teacher", "teacher1")}
                        className="text-amber-500 font-bold hover:underline cursor-pointer"
                      >
                        เข้าใช้ด่วน
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Login fields input side */}
            <div className="md:col-span-7 p-8 flex flex-col justify-center text-left">
              
              {/* Tab selector for login type */}
              <div className="flex bg-slate-105 p-1 rounded-lg border border-slate-200 mb-6 bg-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setPortalTab("student_login");
                    setLoginError("");
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition ${
                    portalTab === "student_login"
                      ? "bg-slate-900 text-white shadow"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  <span className="inline-flex items-center space-x-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>ระบบนักเรียน-นักศึกษา</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPortalTab("teacher_login");
                    setLoginError("");
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition ${
                    portalTab === "teacher_login"
                      ? "bg-slate-900 text-white shadow"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  <span className="inline-flex items-center space-x-1.5">
                    <User className="w-4 h-4" />
                    <span>ระบบคณาจารย์ผู้สอน</span>
                  </span>
                </button>
              </div>

              <h3 className="text-xl font-bold font-sans text-slate-900 mb-1">
                {portalTab === "student_login" ? "เข้าสู่ระบบนักศึกษา" : "เข้าสู่ระบบอาจารย์ผู้ใช้"}
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-light">
                {portalTab === "student_login" 
                  ? "ป้อนรหัสประจำตัวนักศึกษา 11 หลัก และรหัสผ่านเพื่อตรวจสอบสิทธิเข้าชั้นเรียน" 
                  : "กรอกบัญชีผู้ใช้งานส่วนบุคคลของครูอาชีวศึกษาเพื่อเข้าลงสถิติเกรด"}
              </p>

              {loginError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs leading-relaxed mb-4 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Main Login Form fields */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    {portalTab === "student_login" ? "รหัสประจำตัวนักศึกษา (11 หลัก)" : "ชื่อบัญชีผู้ใช้งาน (เช่น t.somchai)"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={inputUsername}
                      onChange={(e) => setInputUsername(e.target.value)}
                      placeholder={portalTab === "student_login" ? "เช่น 66302040001" : "เช่น teacher1"}
                      className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500">รหัสผ่าน (Password)</label>
                    <span className="text-[11px] text-amber-600 hover:underline cursor-pointer" onClick={() => alert("กรุณาตรวจสอบข้อมูลกับคณะทะเบียนวิทยาลัย (รหัสผ่านตั้งต้นของช่วงทดสอบคือ 1234)")}>
                      ลืมรหัสผ่าน?
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      placeholder="ป้อนรหัสผ่านบัญชี หรือ 1234"
                      className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-lg shadow-md transition flex items-center justify-center space-x-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>ตรวจสอบสิทธิและเข้างาน</span>
                </button>
              </form>

              <div className="border-t border-gray-100 mt-6 pt-4 text-center">
                <p className="text-[10px] text-gray-400">
                  * ข้อมูลผู้ใช้งานได้รับการปกป้องภายใต้มาตรฐาน PDPA ประจำปีวิทยาลัยอาชีวศึกษาเลย
                </p>
              </div>

            </div>

          </div>
        ) : (
          
          // --- STATE 2: ALREADY LOGGED IN PORTALS ---
          <div className="space-y-6 text-left">
            
            {/* Logged in Portal Header banner */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border-b-4 border-amber-500 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-800 flex-shrink-0">
                  <img
                    src={userType === "student" ? currentStudent?.profileImage : currentTeacher?.profileImage}
                    alt="user_avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                      คุณกำลังใช้: {userType === "student" ? "ระบบรายงานนักศึกษา" : "กระดานสอนคณาจารย์"}
                    </span>
                    <span className="text-[10px] bg-red-700 text-white px-2 py-0.5 rounded">
                      วิทยาเขตหลัก กุดป่อง
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {userType === "student" ? currentStudent?.name : currentTeacher?.name}
                  </h2>
                  <p className="text-xs text-gray-400">
                    สังกัด: {userType === "student" ? currentStudent?.major : currentTeacher?.position}
                  </p>
                </div>
              </div>

              {/* Header Right statistics brief */}
              <div className="flex items-center space-x-4 pr-2 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0">
                {userType === "student" ? (
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-450 block uppercase tracking-wider text-gray-400">ผลการเรียนเฉลี่ยสะสม (GPA)</span>
                    <span className="text-2xl font-black text-amber-400">{currentStudent?.gpa}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">กลุ่มเรียนวิชาดูแลรับผิดชอบ</span>
                    <span className="text-base font-extrabold text-amber-400">
                      {courses.filter(c => c.teacherId === currentTeacher?.id).length} รายวิชาที่สอน
                    </span>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserType(null);
                    setLoggedInUserId(null);
                  }}
                  className="bg-slate-850 hover:bg-slate-800 text-gray-300 hover:text-white px-3 py-1.5 border border-slate-700 rounded text-xs transition font-semibold"
                >
                  ลงชื่อออก
                </button>
              </div>
            </div>

            {/* --- PORTAL A: STUDENT FULL DASHBOARD PORTAL PANEL --- */}
            {userType === "student" && currentStudent && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left controls sidebar */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">เมนูรายงานตรวจสอบ</p>
                    
                    <button
                      onClick={() => setStudentDashTab("academic")}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-2.5 ${
                        studentDashTab === "academic"
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>บันทึกผลการเรียนรายวิชา</span>
                    </button>

                    <button
                      onClick={() => setStudentDashTab("timetable")}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-2.5 ${
                        studentDashTab === "timetable"
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>ตารางเรียนและชั้นเรียน</span>
                    </button>

                    <button
                      onClick={() => setStudentDashTab("attendance")}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-2.5 ${
                        studentDashTab === "attendance"
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>รายงานชั่วโมงเรียนย้อนหลัง</span>
                    </button>

                    <button
                      onClick={() => setStudentDashTab("notices")}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-2.5 ${
                        studentDashTab === "notices"
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Megaphone className="w-4 h-4" />
                      <span>กระดานข่าวคอร์สวิชาคู่สาย</span>
                    </button>
                  </div>

                  {/* Student Advisor Profile card */}
                  <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-3 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left">อาจารย์ผู้ดูแลที่ปรึกษา</p>
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto bg-slate-200">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                        alt="teacher_adv"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{currentStudent.advisor}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">ฝ่ายการเรียนกลุ่ม แผนกธุรกิจดิจิทัล</p>
                    </div>
                    <span className="inline-block bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded">
                      สถานะติดต่อ: ในระบบ
                    </span>
                  </div>
                </div>

                {/* Right Area: Dynamic Student content tab panels */}
                <div className="lg:col-span-9 bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 shadow-sm min-h-[400px]">
                  
                  {/* TAB PANEL 1: Grades Details with nice charts */}
                  {studentDashTab === "academic" && (
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          สมุดประเมินและรายงานสะสมเกรด (Academic Grades Tracker)
                        </h3>
                        <p className="text-xs text-gray-450 mt-1 leading-relaxed">
                          รายงานแยกรายวิชาสะสมประจำปี แสดงคะแนนเก็บกลางภาค เก็บงานส่ง จิตพิสัย ปลายภาค และเกรดประเมินรวมสะสม
                        </p>
                      </div>

                      {/* Displaying simple clean bar chart of course scores using Tailwind percentages */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">แผนภูมิสัดส่วนเกรดสะสมประจำตัว</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {courses.filter(c => c.studentIds.includes(currentStudent.id)).map(course => {
                            const studentGrade = grades.find(g => g.studentId === currentStudent.id && g.courseId === course.id);
                            const totalSc = studentGrade ? studentGrade.total : 0;
                            const progressWidth = `${totalSc}%`;

                            return (
                              <div key={course.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 flex flex-col justify-between">
                                <div className="space-y-1">
                                  <span className="text-[9px] uppercase font-mono font-bold text-slate-500 bg-white border px-1.5 py-0.5 rounded">
                                    {course.id}
                                  </span>
                                  <h5 className="font-bold text-xs text-slate-900 line-clamp-1 mt-1 leading-normal">
                                    {course.name.replace("วิชา", "")}
                                  </h5>
                                </div>
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-[11px] font-bold pb-1 text-gray-500">
                                    <span>ความสมบูรณ์คะแนน</span>
                                    <span className="text-slate-900">{totalSc} / 100</span>
                                  </div>
                                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-amber-500 h-full rounded-full transition-all" 
                                      style={{ width: progressWidth }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-[10px] text-gray-400">เกรดที่ประเมิน</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                    getGradeBgColor(studentGrade ? studentGrade.grade : "ยังไม่ส่ง")
                                  }`}>
                                    {studentGrade ? studentGrade.grade : "กำลังประเมิน"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Transcripts lists tables */}
                      <div className="overflow-x-auto border border-gray-100 rounded-xl mt-6">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="bg-slate-950 text-white text-xs uppercase font-mono tracking-wider">
                            <tr>
                              <th className="p-3.5">รหัสรายวิชา</th>
                              <th className="p-3.5">ชื่อรายวิชา</th>
                              <th className="p-3.5 text-center">หน่วยกิต</th>
                              <th className="p-3.5 text-center">คะแนนงาน (40)</th>
                              <th className="p-3.5 text-center">สอบย่อย (30)</th>
                              <th className="p-3.5 text-center">คะแนนรวม</th>
                              <th className="p-3.5 text-center">ผลการเรียน</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-xs sm:text-xs">
                            {courses.filter(c => c.studentIds.includes(currentStudent.id)).map(course => {
                              const sgrade = grades.find(g => g.studentId === currentStudent.id && g.courseId === course.id);
                              
                              return (
                                <tr key={course.id} className="hover:bg-slate-50 transition">
                                  <td className="p-3.5 font-mono font-bold text-slate-800">{course.id}</td>
                                  <td className="p-3.5 font-semibold text-slate-900">{course.name}</td>
                                  <td className="p-3.5 text-center font-mono font-bold">{course.credits}</td>
                                  <td className="p-3.5 text-center font-mono font-semibold text-gray-500">
                                    {sgrade ? (sgrade.homework + sgrade.behavior) : "-"}
                                  </td>
                                  <td className="p-3.5 text-center font-mono font-semibold text-gray-500">
                                    {sgrade ? (sgrade.midterm + sgrade.final) : "-"}
                                  </td>
                                  <td className="p-3.5 text-center font-mono font-extrabold text-slate-900">
                                    {sgrade ? sgrade.total : "รอดำเนินการ"}
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <span className={`px-2.5 py-1 rounded-sm font-bold text-xs ${
                                      getGradeBgColor(sgrade ? sgrade.grade : "ยังไม่ส่ง")
                                    }`}>
                                      {sgrade ? sgrade.grade : "กำลังรอสรุป"}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB PANEL 2: Student study timetable schedule */}
                  {studentDashTab === "timetable" && (
                    <div className="space-y-6 animate-in fade-in duration-350">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-900">รายวิชาเรียนและตารางสอนรายวัน</h3>
                        <p className="text-xs text-gray-450 mt-1 leading-relaxed">
                          ตารางคาบเรียนหลักสูตรประกาศนียบัตรวิชาชีพประจำกลุ่มการเรียนของตัวท่าน สัปดาห์ ณ ปีการศึกษาปัจจุบัน
                        </p>
                      </div>

                      <div className="space-y-4">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((dayName) => {
                          const todayCourses = courses.filter(
                            c => c.day === dayName && c.studentIds.includes(currentStudent.id)
                          );

                          return (
                            <div key={dayName} className="border border-slate-100 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
                              {/* Day Label left column */}
                              <div className={`md:w-36 p-4 flex flex-col h-full justify-center text-center items-center font-bold font-sans text-xs uppercase tracking-wide gap-1 shrink-0 ${
                                dayName === "Monday" ? "bg-amber-500 text-slate-950" :
                                dayName === "Tuesday" ? "bg-rose-600 text-white" :
                                dayName === "Wednesday" ? "bg-emerald-600 text-white" :
                                dayName === "Thursday" ? "bg-orange-500 text-white" : "bg-blue-600 text-white"
                              }`}>
                                <span className="text-base sm:text-xs">
                                  {dayName === "Monday" && "วันจันทร์"}
                                  {dayName === "Tuesday" && "วันอังคาร"}
                                  {dayName === "Wednesday" && "วันพุธ"}
                                  {dayName === "Thursday" && "วันพฤหัสบดี"}
                                  {dayName === "Friday" && "วันศุกร์"}
                                </span>
                                <span className="text-[10px] font-mono tracking-wider opacity-90">{dayName}</span>
                              </div>

                              {/* Class card right columns */}
                              <div className="flex-1 p-4 bg-white/50 divide-y divide-slate-100 divide-y flex flex-col justify-center">
                                {todayCourses.length > 0 ? (
                                  todayCourses.map((crs) => {
                                    const teacherOnCourse = teachers.find(t => t.id === crs.teacherId);

                                    return (
                                      <div key={crs.id} className="py-2 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
                                        <div className="space-y-1">
                                          <div className="flex items-center space-x-2">
                                            <span className="text-[10px] bg-slate-900 text-amber-400 font-bold px-1.5 py-0.5 rounded font-mono">
                                              {crs.id}
                                            </span>
                                            <span className="text-[11px] text-slate-500 flex items-center">
                                              <MapPin className="w-3 h-3 mr-0.5 text-slate-400" /> {crs.room}
                                            </span>
                                          </div>
                                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                            {crs.name}
                                          </h4>
                                          <p className="text-[11px] text-gray-500">
                                            ผู้สอน: <span className="font-semibold text-slate-700">{teacherOnCourse?.name}</span> • จำนวนหน่วยกิต: <span className="font-bold text-slate-850">{crs.credits} หน่วยกิต</span>
                                          </p>
                                        </div>

                                        <div className="flex items-center space-x-1 text-slate-700 font-mono text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                          <Clock className="w-3.5 h-3.5 text-amber-600 mr-1" />
                                          <span className="font-semibold">{crs.time}</span>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="text-xs text-gray-400 italic py-2">-- ไม่มีรายวิชาเรียนที่ขึ้นทะเบียนในวันนี้ --</p>
                                )}
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB PANEL 3: Student Attendance logs and status */}
                  {studentDashTab === "attendance" && (
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-900">บันทึกสถิติเวลาและชั่วโมงเรียนเข้าคลาส</h3>
                        <p className="text-xs text-gray-450 mt-1 leading-relaxed">
                          ตรวจสอบสถิติเปอร์เซ็นต์สะสมของรายวิชา หากมีรายงานการมาสายสะสมเกินเกณฑ์หรือขาดเรียนไร้สาย เกิน 80% จะหมดสิทธิสอบปลายภาค
                        </p>
                      </div>

                      {/* Displaying general attendance rating dial for student */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {courses.filter(c => c.studentIds.includes(currentStudent.id)).map(course => {
                          const attInfo = getAttendanceRate(currentStudent.id, course.id);
                          const totalClass = attendance.filter(a => a.studentId === currentStudent.id && a.courseId === course.id);

                          return (
                            <div key={course.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center space-y-3 shadow-sm relative">
                              <div className="text-left">
                                <span className="text-[9px] bg-slate-900 text-amber-400 font-bold px-1.5 py-0.5 rounded font-mono">
                                  {course.id}
                                </span>
                              </div>
                              <h4 className="font-bold text-xs text-slate-900 truncate leading-snug">
                                {course.name.replace("วิชา", "")}
                              </h4>
                              
                              <div className="pt-2">
                                <span className={`inline-block py-1 px-3 text-xs font-bold rounded-lg ${attInfo.color}`}>
                                  สถิติมาเรียน: {attInfo.rate}%
                                </span>
                              </div>

                              <p className="text-[10px] text-gray-400">
                                เช็คชื่อตรวจสอบแล้ว: {totalClass.length} ครั้ง | ขัดการเข้าร่วม/ขาดสอบ: {totalClass.filter(c => c.status === "A").length} ครั้ง
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed attendance table history */}
                      <div className="border border-slate-100 rounded-xl overflow-hidden mt-6">
                        <div className="bg-slate-900 text-amber-400 font-bold text-xs px-4 py-3 border-b border-slate-800">
                          สถิติประวัติตรวจเข้าแถวและรายวันแยกวันที่
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead className="bg-slate-950 text-white text-[10px] uppercase font-mono tracking-wider">
                              <tr>
                                <th className="p-3">วันที่สถิตการจัด</th>
                                <th className="p-3">รายวิชาเรียน</th>
                                <th className="p-3 text-center">สัญลักษณ์บันทึก</th>
                                <th className="p-3 text-center">ความหมายรายงาน</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                              {attendance.filter(r => r.studentId === currentStudent.id).map((record, id) => {
                                const courseOn = courses.find(c => c.id === record.courseId);

                                return (
                                  <tr key={id} className="hover:bg-slate-50">
                                    <td className="p-3 font-semibold text-slate-900">{record.date}</td>
                                    <td className="p-3 text-xs font-sans font-semibold text-slate-800">
                                      {courseOn ? courseOn.name : "การปฐมนิเทศ/วิทยาลัย"}
                                    </td>
                                    <td className="p-3 text-center">
                                      <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-black ${
                                        record.status === "P" ? "bg-emerald-100 text-emerald-800" :
                                        record.status === "L" ? "bg-amber-100 text-amber-800" :
                                        record.status === "A" ? "bg-rose-100 text-rose-800 font-bold" : "bg-blue-100 text-blue-800"
                                      }`}>
                                        {record.status}
                                      </span>
                                    </td>
                                    <td className="p-3 text-center font-sans font-semibold text-xs text-slate-600">
                                      {record.status === "P" && "✓ เข้าเรียนตรงเวลา"}
                                      {record.status === "L" && "⚠ มาสายคลาสปกติ"}
                                      {record.status === "A" && "❌ ขาดเรียนไร้ใบสั่ง"}
                                      {record.status === "S" && "🤒 ลาป่วยมีใบเสร็จ"}
                                      {record.status === "E" && "✈ ลากิจประสานแผนก"}
                                    </td>
                                  </tr>
                                );
                              })}

                              {attendance.filter(r => r.studentId === currentStudent.id).length === 0 && (
                                <tr>
                                  <td colSpan={4} className="p-8 text-center text-gray-400 font-semibold font-sans italic">
                                    -- ยังไม่มีสถิติรับเช็คชื่อรายงานในสัปดาห์นี้ --
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB PANEL 4: Notices, Announcements and QA Advisor advisor box */}
                  {studentDashTab === "notices" && (
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-900">ข่าวความคืบหน้าและการสื่อสารห้องคลาส</h3>
                        <p className="text-xs text-gray-450 mt-1 leading-relaxed">
                          ประกาศการเรียน สอบกลางภาคเก็บคะแนนที่ครูผู้สอนโพสต์ถึงคู่สายห้องเรียน และแชทประสานงานกับผู้ดูแลกลุ่ม
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Course announcements timeline list */}
                        <div className="lg:col-span-7 space-y-4">
                          <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">กระดานข้อความความคืบหน้า (Course Wall)</h4>
                          
                          {announcements.filter(a => courses.some(c => c.id === a.courseId && c.studentIds.includes(currentStudent.id))).map((ann) => {
                            const crs = courses.find(c => c.id === ann.courseId);

                            return (
                              <div key={ann.id} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-between text-left shadow-sm">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                                      วิชา: {crs ? crs.name.replace("วิชา", "") : "ทั่วไป"}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">{ann.date}</span>
                                  </div>
                                  <h5 className="font-bold text-slate-900 text-sm">{ann.title}</h5>
                                  <p className="text-xs text-gray-600 leading-relaxed font-light whitespace-pre-line">
                                    {ann.content}
                                  </p>
                                </div>
                                <div className="pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-500 font-bold">
                                  เขียนโดย: {ann.author} (อาจารย์ผู้สอนประจำวิชา)
                                </div>
                              </div>
                            );
                          })}

                          {announcements.length === 0 && (
                            <p className="text-xs text-gray-400 italic">-- ไม่มีข่าวส่งเสริมคลาสเรียนโพสต์ในตอนนี้ --</p>
                          )}
                        </div>

                        {/* Interactive advisor consultation portal chat simulation inside student */}
                        <div className="lg:col-span-5 space-y-4">
                          <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">ปรึกษาปัญหาที่ปรึกษาออนไลน์ (Advisor Hotline)</h4>
                          
                          <div className="border border-slate-200 rounded-xl bg-slate-50 flex flex-col h-80 justify-between overflow-hidden">
                            {/* Dialogue list representation */}
                            <div className="p-4 flex-1 space-y-2 overflow-y-auto max-h-[220px] scrollbar-thin">
                              {adviseRecords.map((msg, idx) => (
                                <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] text-xs leading-normal ${
                                  msg.sender === "System" 
                                    ? "bg-slate-200 text-slate-700 mx-auto text-center" 
                                    : (msg.sender === currentStudent.name 
                                        ? "bg-slate-900 text-white ml-auto text-right" 
                                        : "bg-amber-100 text-amber-900 mr-auto text-left")
                                }`}>
                                  <p className="font-bold text-[10px] opacity-80 mb-0.5">{msg.sender}</p>
                                  <p>{msg.text}</p>
                                  <span className="block text-[9px] opacity-60 mt-1 font-mono text-right">{msg.time}</span>
                                </div>
                              ))}
                            </div>

                            {/* Chat interaction sender form fields */}
                            <form onSubmit={handleSendAdvise} className="p-2 bg-white border-t border-slate-200 flex space-x-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                              <input
                                type="text"
                                value={adviseText}
                                onChange={(e) => setAdviseText(e.target.value)}
                                placeholder="พิมพ์ข้อความปรึกษาอาจารย์..."
                                className="flex-1 bg-slate-100 border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none"
                              />
                              <button
                                type="submit"
                                className="bg-slate-900 text-white font-bold text-xs px-3 rounded hover:bg-slate-800 transition py-1.5 cursor-pointer"
                              >
                                ส่งข้อความ
                              </button>
                            </form>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* --- PORTAL B: TEACHER CONTROL PANEL DASHBOARD --- */}
            {userType === "teacher" && currentTeacher && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left side: Class selection index & controller */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">รายวิชาที่จัดการดูแลสอน</p>
                    
                    {courses.filter(c => c.teacherId === currentTeacher.id).map((crs) => (
                      <button
                        key={crs.id}
                        onClick={() => {
                          setTeacherSelectedCourseId(crs.id);
                          // Reset notices inputs on switch
                          setNewNoticeTitle("");
                          setNewNoticeContent("");
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition duration-250 flex flex-col justify-between ${
                          teacherSelectedCourseId === crs.id
                            ? "bg-slate-905 border-amber-500 text-slate-100 bg-slate-900 shadow"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-gray-200"
                        }`}
                      >
                        <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded w-max mb-1.5 ${
                          teacherSelectedCourseId === crs.id ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-600"
                        }`}>
                          {crs.id}
                        </span>
                        <h4 className="font-bold text-xs line-clamp-2 leading-tight">
                          {crs.name.replace("วิชา", "")}
                        </h4>
                        <p className={`text-[10px] mt-2 font-mono ${
                          teacherSelectedCourseId === crs.id ? "text-gray-300" : "text-gray-500"
                        }`}>
                          กลุ่ม {crs.classGroup} • {crs.studentIds.length} นักศึกษา
                        </p>
                      </button>
                    ))}

                    {courses.filter(c => c.teacherId === currentTeacher.id).length === 0 && (
                      <p className="text-xs text-gray-400 italic">-- ไม่มีรายวิชากู้รหัส --</p>
                    )}
                  </div>

                  {/* Dynamic Side Menu selection */}
                  <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">Operations</p>
                    
                    <button
                      onClick={() => setTeacherDashTab("courses")}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center space-x-2 ${
                        teacherDashTab === "courses" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>ภาพรวมนักเรียนในกลุ่ม</span>
                    </button>

                    <button
                      onClick={() => setTeacherDashTab("attendance")}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center space-x-2 ${
                        teacherDashTab === "attendance" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>เช็คชื่อและชั่วโมงเรียน</span>
                    </button>

                    <button
                      onClick={() => setTeacherDashTab("grades_entry")}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center space-x-2 ${
                        teacherDashTab === "grades_entry" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>ประเมินตัดเกรดประจำวิชา</span>
                    </button>

                    <button
                      onClick={() => setTeacherDashTab("notices")}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center space-x-2 ${
                        teacherDashTab === "notices" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Megaphone className="w-4 h-4" />
                      <span>ส่งข่าว/โพสต์ห้องช่วยเหลือ</span>
                    </button>

                    <button
                      onClick={() => setTeacherDashTab("stats")}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center space-x-2 ${
                        teacherDashTab === "stats" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>วิเคราะห์เฝ้าระวังผู้เรียน</span>
                    </button>
                  </div>
                </div>

                {/* Right Area: Dynamic Teacher operation controller views */}
                <div className="lg:col-span-9 bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 shadow-sm min-h-[440px] text-slate-800">
                  
                  {/* Selected course reference display */}
                  {teacherSelectedCourseId ? (
                    (() => {
                      const activeCourse = courses.find(c => c.id === teacherSelectedCourseId);
                      if (!activeCourse) return null;

                      return (
                        <div className="space-y-6 text-left">
                          
                          {/* Course title badge ribbon */}
                          <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="bg-slate-900 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                                  {activeCourse.id}
                                </span>
                                <span className="text-xs text-slate-400">กลุ่มเรียน {activeCourse.classGroup}</span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                                {activeCourse.name}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-100 py-1.5 px-3 rounded font-mono border self-start sm:self-auto">
                              <Calendar className="w-3.5 h-3.5 text-amber-600" />
                              <span>{activeCourse.day} {activeCourse.time}</span>
                            </div>
                          </div>

                          {/* SUB VIEW 1: Courses Students overview */}
                          {teacherDashTab === "courses" && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">รายชื่อนักเขียนที่ขึ้นทะเบียนเรียนสิทธิ์ (Registered Students list)</h4>
                              <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-inner bg-slate-50/50">
                                <table className="w-full text-xs text-left border-collapse">
                                  <thead className="bg-slate-950 text-white font-mono uppercase text-[10px] tracking-wider">
                                    <tr>
                                      <th className="p-3">รหัสประจำตัว</th>
                                      <th className="p-3">ชื่อ-นามสกุล</th>
                                      <th className="p-3 text-center">สถิติมาเรียน</th>
                                      <th className="p-3 text-center">เกรดประเมินปัจจุบัน</th>
                                      <th className="p-3">อาจารย์ที่ปรึกษา</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100 font-sans font-medium text-slate-700">
                                    {activeCourse.studentIds.map(sid => {
                                      const stud = students.find(s => s.id === sid);
                                      if (!stud) return null;

                                      const attStats = getAttendanceRate(sid, activeCourse.id);
                                      const studGrade = grades.find(g => g.studentId === sid && g.courseId === activeCourse.id);

                                      return (
                                        <tr key={sid} className="hover:bg-white transition">
                                          <td className="p-3 font-mono font-bold text-slate-900">{sid}</td>
                                          <td className="p-3">
                                            <div className="flex items-center space-x-2">
                                              <img src={stud.profileImage} className="w-6 h-6 rounded-full object-cover border" alt="avatar" />
                                              <span>{stud.name}</span>
                                            </div>
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-sm font-bold font-mono text-[11px] ${
                                              attStats.rate >= 80 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                                            }`}>
                                              {attStats.rate}%
                                            </span>
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-sm font-bold ${
                                              getGradeBgColor(studGrade ? studGrade.grade : "ยังไม่ส่ง")
                                            }`}>
                                              {studGrade ? studGrade.grade : "ไม่มีคะแนน"}
                                            </span>
                                          </td>
                                          <td className="p-3 text-gray-500 font-light truncate max-w-[120px]">{stud.advisor}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* SUB VIEW 2: Mark Attendance Sheet */}
                          {teacherDashTab === "attendance" && (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-3">
                                <div>
                                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">บันทึกประวัติร่วมคลาสวันนี้</h4>
                                  <p className="text-[11px] text-gray-400">กรุณาเลือกวันที่และติ๊กรายงานสัญลักษณ์สถานะของนักเรียนแต่ละคน</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <label className="text-xs font-bold text-slate-600 font-mono">วันที่ตรวจ:</label>
                                  <input
                                    type="date"
                                    value={attRecordDate}
                                    onChange={(e) => setAttRecordDate(e.target.value)}
                                    className="border rounded text-xs px-2 py-1.5 focus:ring-1 focus:ring-amber-500 outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-3">
                                {activeCourse.studentIds.map(sid => {
                                  const stud = students.find(s => s.id === sid);
                                  if (!stud) return null;

                                  const curVal = attendanceMap[sid] || "P";

                                  return (
                                    <div key={sid} className="bg-slate-50 border p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                                      <div className="flex items-center space-x-3">
                                        <span className="font-mono text-xs font-bold text-slate-500 w-24 shrink-0">{sid}</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-850">{stud.name}</span>
                                      </div>

                                      {/* ATT STATUS RADIO GROUP SETTINGS */}
                                      <div className="flex items-center space-x-4">
                                        {[
                                          { val: "P", label: "✓ มาเรียน", color: "peer-checked:bg-emerald-600 peer-checked:text-white" },
                                          { val: "A", label: "✕ ขาดเรียน", color: "peer-checked:bg-rose-600 peer-checked:text-white" },
                                          { val: "L", label: "⚠ สาย", color: "peer-checked:bg-amber-500 peer-checked:text-slate-950" },
                                          { val: "S", label: "🤒 ลาป่วย", color: "peer-checked:bg-blue-600 peer-checked:text-white" },
                                          { val: "E", label: "✈ ลากิจ", color: "peer-checked:bg-slate-700 peer-checked:text-white" },
                                        ].map(opt => (
                                          <label key={opt.val} className="relative flex items-center cursor-pointer select-none">
                                            <input
                                              type="radio"
                                              name={`att-${sid}`}
                                              value={opt.val}
                                              checked={curVal === opt.val}
                                              onChange={() => {
                                                setAttendanceMap({
                                                  ...attendanceMap,
                                                  [sid]: opt.val as any
                                                });
                                              }}
                                              className="sr-only peer"
                                            />
                                            <span className={`px-2 py-1 border text-[10px] font-bold rounded hover:bg-slate-100 transition ${opt.color} ${
                                              curVal === opt.val 
                                                ? (opt.val === "P" ? "bg-emerald-600 text-white" :
                                                   opt.val === "A" ? "bg-rose-600 text-white" :
                                                   opt.val === "L" ? "bg-amber-500 text-slate-950" :
                                                   opt.val === "S" ? "bg-blue-600 text-white" : "bg-slate-700 text-white")
                                                : "bg-white text-slate-650"
                                            }`}>
                                              {opt.label}
                                            </span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="pt-4 border-t flex justify-end">
                                <button
                                  type="button"
                                  onClick={handleSaveAttendance}
                                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow inline-flex items-center space-x-1.5 cursor-pointer"
                                >
                                  <Save className="w-4 h-4 text-emerald-400" />
                                  <span>ยื่นสถิติเช็คชื่อวันนี้ ({attRecordDate})</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* SUB VIEW 3: Grades Workbook Score entries */}
                          {teacherDashTab === "grades_entry" && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">บันทึกสัดส่วนคะแนนสะสมและการตัดเกรดเฉลี่ย (Grade Book)</h4>
                                <p className="text-[11px] text-gray-400 mt-0.5">ระบุคะแนนเก็บจริง ระบบจะใช้การคำนวณสะสมตัดเกรดเฉลี่ยอัตโนมัติ (คะแนนเก็บ+พฤติกรรม=40, สอบย่อย=30, ปลายภาค=30 รวมเต็ม 100)</p>
                              </div>

                              <div className="overflow-x-auto border border-gray-150 rounded-xl">
                                <table className="w-full text-xs text-left border-collapse bg-slate-50/50">
                                  <thead className="bg-slate-950 text-white font-mono uppercase text-[10.5px]">
                                    <tr>
                                      <th className="p-3">รหัสนักศึกษา</th>
                                      <th className="p-3">ชื่อนักเรียน</th>
                                      <th className="p-3 text-center">คะแนนงาน (30)</th>
                                      <th className="p-3 text-center">จิตพิสัย (10)</th>
                                      <th className="p-3 text-center">เก็บกลางภาค (30)</th>
                                      <th className="p-3 text-center">สอบปลายภาค (30)</th>
                                      <th className="p-3 text-center">คะแนนรวม</th>
                                      <th className="p-3 text-center">เกรดตัดสรุป</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-150 font-sans font-semibold text-slate-800">
                                    {activeCourse.studentIds.map(sid => {
                                      const stud = students.find(s => s.id === sid);
                                      if (!stud) return null;

                                      const cSc = editedGrades[sid] || { homework: 0, midterm: 0, final: 0, behavior: 0 };
                                      const totalSc = cSc.homework + cSc.behavior + cSc.midterm + cSc.final;
                                      const computedGr = getGradePoint(totalSc);

                                      return (
                                        <tr key={sid} className="hover:bg-white transition duration-150">
                                          <td className="p-3 font-mono text-slate-900">{sid}</td>
                                          <td className="p-3 font-bold text-slate-900">{stud.name}</td>
                                          
                                          {/* Homework editing input */}
                                          <td className="p-2 text-center">
                                            <input
                                              type="number"
                                              max={30}
                                              min={0}
                                              value={cSc.homework}
                                              onChange={(e) => {
                                                const newVal = Math.min(30, Math.max(0, parseInt(e.target.value) || 0));
                                                setEditedGrades({
                                                  ...editedGrades,
                                                  [sid]: { ...cSc, homework: newVal }
                                                });
                                              }}
                                              className="w-14 border border-gray-300 rounded p-1 text-center font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                            />
                                          </td>

                                          {/* Behavior score editing input */}
                                          <td className="p-2 text-center">
                                            <input
                                              type="number"
                                              max={10}
                                              min={0}
                                              value={cSc.behavior}
                                              onChange={(e) => {
                                                const newVal = Math.min(10, Math.max(0, parseInt(e.target.value) || 0));
                                                setEditedGrades({
                                                  ...editedGrades,
                                                  [sid]: { ...cSc, behavior: newVal }
                                                });
                                              }}
                                              className="w-14 border border-gray-300 rounded p-1 text-center font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                            />
                                          </td>

                                          {/* Midterm score editing input */}
                                          <td className="p-2 text-center">
                                            <input
                                              type="number"
                                              max={30}
                                              min={0}
                                              value={cSc.midterm}
                                              onChange={(e) => {
                                                const newVal = Math.min(30, Math.max(0, parseInt(e.target.value) || 0));
                                                setEditedGrades({
                                                  ...editedGrades,
                                                  [sid]: { ...cSc, midterm: newVal }
                                                });
                                              }}
                                              className="w-14 border border-gray-300 rounded p-1 text-center font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                            />
                                          </td>

                                          {/* Final score editing input */}
                                          <td className="p-2 text-center">
                                            <input
                                              type="number"
                                              max={30}
                                              min={0}
                                              value={cSc.final}
                                              onChange={(e) => {
                                                const newVal = Math.min(30, Math.max(0, parseInt(e.target.value) || 0));
                                                setEditedGrades({
                                                  ...editedGrades,
                                                  [sid]: { ...cSc, final: newVal }
                                                });
                                              }}
                                              className="w-14 border border-gray-300 rounded p-1 text-center font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                            />
                                          </td>

                                          {/* Auto sums total */}
                                          <td className="p-3 text-center font-mono font-black text-slate-900 border-l">
                                            {totalSc} / 100
                                          </td>

                                          {/* Computed grade point */}
                                          <td className="p-3 text-center border-l">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-sm ${
                                              getGradeBgColor(computedGr)
                                            }`}>
                                              {computedGr}
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              <div className="pt-4 border-t flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                <p className="text-[10px] text-gray-500 max-w-sm leading-relaxed">
                                  * หมายเหตุ: แถบประเมินตัดเกณฑ์ใช้ระบบสัดส่วน อิงเกณฑ์สอศ. ทั่วประเทศ (80 ขึ้นไปเกรด 4.0, ต่ำกว่า 50 เกรด F ติดศูนย์การเข้าร่วม)
                                </p>
                                <button
                                  type="button"
                                  onClick={handleSaveGrades}
                                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow inline-flex items-center space-x-1 px-5 cursor-pointer"
                                >
                                  <Save className="w-4 h-4 text-emerald-400 mr-1" />
                                  <span>ประมวลผลตัดเกรดวิชา</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* SUB VIEW 4: Core announcement Noticeboard posting */}
                          {teacherDashTab === "notices" && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">โพสต์และประกาศกิจกรรมวิชาการประจำกลุ่มเรียน</h4>
                                <p className="text-[11px] text-gray-450 mt-0.5">พิมพ์ข้อมูลความคืบหน้าแจ้งเตือนการส่งการเรียน นักศึกษาทุกคนในคลังสาขาที่ผูกกับรหัสวิชานี้จะได้เห็นทันทีในหัวข้อแดชบอร์ด</p>
                              </div>

                              {noticeSuccessMsg && (
                                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-lg text-xs leading-relaxed animate-in fade-in duration-300">
                                  {noticeSuccessMsg}
                                </div>
                              )}

                              <form onSubmit={handlePostAnnouncement} className="space-y-4 max-w-2xl bg-slate-50 border border-slate-100 p-5 rounded-xl">
                                <div>
                                  <label className="text-xs font-bold text-gray-500 block mb-1">หัวข้อประกาศ (เช่น สอบเก็บคะแนนฉุกเฉิน, สั่งงานสัปดาห์ที่ 8) *</label>
                                  <input
                                    type="text"
                                    required
                                    value={newNoticeTitle}
                                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                                    placeholder="เขียนคีย์เวิร์ดดึงดูดกระชับ..."
                                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-bold text-gray-500 block mb-1">คำอธิบายรายละเอียดแจ้งแจงแจกแจง *</label>
                                  <textarea
                                    required
                                    rows={5}
                                    value={newNoticeContent}
                                    onChange={(e) => setNewNoticeContent(e.target.value)}
                                    placeholder="ระบุกำหนดส่ง งาน เอกสาร หรือบทเรียนที่ให้อ่านเพิ่มอย่างละเอียด..."
                                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed"
                                  ></textarea>
                                </div>

                                <button
                                  type="submit"
                                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded shadow inline-flex items-center space-x-1 transition cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 text-amber-400" />
                                  <span>โพสต์ข่าวไปวอลเล็ตเรียน</span>
                                </button>
                              </form>
                            </div>
                          )}

                          {/* SUB VIEW 5: Student alert warning analytics list */}
                          {teacherDashTab === "stats" && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">ระบบวิเคราะห์สนับสนุนจรรยาบรรณเฝ้าระวังผู้เรียน (At-Risk Watchlist)</h4>
                                <p className="text-[11px] text-gray-450 mt-0.5">คัดกรองอัตโนมัติแจ้งชื่อนักศึกษาที่มีเปอร์เซ็นต์ส่วนร่วมสติกเวลาเรียนเฉลี่ยต่ำกว่า 80% หรือคะแนนประเมินเข้าเกณฑ์ความยากลำบาก เพื่อให้อาจารย์ที่ปรึกษาสนับสนุนด่วนสุด</p>
                              </div>

                              <div className="space-y-4">
                                {activeCourse.studentIds.map(sid => {
                                  const stud = students.find(s => s.id === sid);
                                  if (!stud) return null;

                                  const attRating = getAttendanceRate(sid, activeCourse.id);
                                  const studGrade = grades.find(g => g.studentId === sid && g.courseId === activeCourse.id);
                                  const totalSc = studGrade ? studGrade.total : 0;

                                  const isAtRisk = attRating.rate < 80 || totalSc < 50;

                                  return (
                                    <div 
                                      key={sid} 
                                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left ${
                                        isAtRisk 
                                          ? "bg-rose-50 border-rose-200 text-rose-900 shadow-sm" 
                                          : "bg-emerald-50/55 border-emerald-150 text-emerald-900 opacity-80"
                                      }`}
                                    >
                                      <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-white rounded-lg border font-bold text-center text-xs w-24 font-mono select-none flex-shrink-0">
                                          {sid}
                                        </div>
                                        <div className="space-y-1">
                                          <h5 className="font-bold text-sm flex items-center space-x-2">
                                            <span>{stud.name}</span>
                                            {isAtRisk ? (
                                              <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center">
                                                <ShieldAlert className="w-3 h-3 mr-0.5" /> เฝ้าระวังด่วน
                                              </span>
                                            ) : (
                                              <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                ปกติ
                                              </span>
                                            )}
                                          </h5>
                                          <p className="text-xs opacity-80">
                                            ชั่วโมงเรียนเฉลี่ย: <span className="font-bold underline">{attRating.rate}%</span> | คะแนนจัดเก็บ: <span className="font-bold underline">{totalSc} คะแนน</span>
                                          </p>
                                          <p className="text-[10px] text-gray-500 font-light">อาจารย์ที่ปรึกษา: {stud.advisor}</p>
                                        </div>
                                      </div>

                                      <div className="flex sm:flex-col items-start sm:items-end gap-1 font-mono text-xs">
                                        {isAtRisk ? (
                                          <button
                                            type="button"
                                            onClick={() => alert(`ส่งสัญญาณ SMS ตักเตือนด่วนไปยังผู้ปกครองของ ${stud.name} สำเร็จและแจ้งเตือนเข้าช่อง Advisory Inbox แล้ว`)}
                                            className="bg-rose-700 hover:bg-rose-800 text-white text-[10.5px] font-bold px-3 py-1.5 rounded transition self-start sm:self-auto cursor-pointer"
                                          >
                                            ส่งหนังสือตักเตือนผู้ปกครอง (SMS)
                                          </button>
                                        ) : (
                                          <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider border">
                                            ✓ ผ่านเกณฑ์สอศ.
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-20">
                      <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-bounce" />
                      <h4 className="font-bold text-lg text-slate-850">คุณยังไม่ได้เลือกรหัสชั้นเรียน</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                        กรุณากดคลิกปุ่มรหัสชุดข้อมูลรายวิชาที่ดูแลด้านขวามีสีฟ้าหรือแผงชั้นเรียนด้านซ้าย เพื่อดึงข้อมูลตรวจแถวพฤติกรรมสะสม
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
