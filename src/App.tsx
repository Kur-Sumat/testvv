/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import DepartmentsView from "./components/DepartmentsView";
import ExecutiveView from "./components/ExecutiveView";
import NewsView from "./components/NewsView";
import PortalView from "./components/PortalView";
import { NewsItem } from "./types";
import { Eye, Calendar, X, Share2, Award, Users } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // News detail modal state
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Authentication shared state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("ltc_logged_in") === "true";
  });
  const [userType, setUserType] = useState<"student" | "teacher" | null>(() => {
    return localStorage.getItem("ltc_user_type") as any || null;
  });
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(() => {
    return localStorage.getItem("ltc_user_id") || null;
  });

  const handleLogin = (logged: boolean) => {
    setIsLoggedIn(logged);
    localStorage.setItem("ltc_logged_in", logged ? "true" : "false");
  };

  const handleUserType = (type: "student" | "teacher" | null) => {
    setUserType(type);
    if (type) {
      localStorage.setItem("ltc_user_type", type);
    } else {
      localStorage.removeItem("ltc_user_type");
    }
  };

  const handleUserId = (id: string | null) => {
    setLoggedInUserId(id);
    if (id) {
      localStorage.setItem("ltc_user_id", id);
    } else {
      localStorage.removeItem("ltc_user_id");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setLoggedInUserId(null);
    localStorage.removeItem("ltc_logged_in");
    localStorage.removeItem("ltc_user_type");
    localStorage.removeItem("ltc_user_id");
    setCurrentTab("home");
  };

  // Get User Display Name for Navbar indicators
  const getUserDisplayName = (): string => {
    if (!isLoggedIn || !loggedInUserId) return "";
    
    if (userType === "student") {
      const studs = localStorage.getItem("ltc_students");
      const parsed = studs ? JSON.parse(studs) : [];
      const match = parsed.find((s: any) => s.id === loggedInUserId);
      return match ? match.name : "นักศึกษา";
    } else {
      const tc = localStorage.getItem("ltc_teachers");
      const parsed = tc ? JSON.parse(tc) : [];
      const match = parsed.find((t: any) => t.id === loggedInUserId);
      return match ? match.name : "อาจารย์";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans transition-all selection:bg-amber-500 selection:text-slate-900 border-t-4 border-slate-900">
      
      {/* Scrollable announcement header ribbon */}
      <div className="bg-gradient-to-r from-red-700 via-red-850 to-red-950 text-white text-xs py-2 px-4 shadow-sm flex items-center justify-between relative overflow-hidden font-medium z-40 border-b border-rose-800">
        <div className="flex items-center space-x-2">
          <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded animate-pulse">HOT</span>
          <span className="font-sans truncate max-w-lg">
            เปิดระบบรับเข้าสมัครผู้เรียนประจำปี พ.ศ. 2569 โครงการเรียนดี และรอบโควตาแผนกวิชาคอมพิวเตอร์และธุรกิจดิจิทัล
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[10px] font-mono tracking-wide opacity-80 shrink-0">
          <span>สโมสรอวท. วิทยาลัยอาชีวศึกษาเลย</span>
          <span>•</span>
          <span>TEL: 042-811-545</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isLoggedIn={isLoggedIn}
        userType={userType}
        userName={isLoggedIn ? getUserDisplayName() : null}
        onLogout={handleLogout}
      />

      {/* Primary Dynamic Screen Switchboard */}
      <main className="flex-grow">
        {currentTab === "home" && (
          <HomeView
            setCurrentTab={setCurrentTab}
            onSelectNews={(news) => setSelectedNews(news)}
          />
        )}
        
        {currentTab === "departments" && (
          <DepartmentsView />
        )}

        {currentTab === "news" && (
          <NewsView onSelectNews={(news) => setSelectedNews(news)} />
        )}

        {currentTab === "executive" && (
          <ExecutiveView />
        )}

        {currentTab === "portal" && (
          <PortalView
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={handleLogin}
            userType={userType}
            setUserType={handleUserType}
            loggedInUserId={loggedInUserId}
            setLoggedInUserId={handleUserId}
          />
        )}
      </main>

      {/* --- DETAILED NEWS DETAIL OVERLAY MODAL --- */}
      {selectedNews && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-2xl border border-gray-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-250 text-left">
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute right-4 top-4 bg-slate-900/50 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* News illustration header representation */}
            <div className="h-64 sm:h-72 bg-slate-900 relative">
              <img
                src={selectedNews.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"}
                alt={selectedNews.title}
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <span className="bg-amber-500 text-slate-950 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                  {selectedNews.category === "publicity" && "ข่าวประชาสัมพันธ์"}
                  {selectedNews.category === "admission" && "การรับสมัครเรียน"}
                  {selectedNews.category === "procurement" && "ประกาศจัดซื้อจัดจ้าง"}
                  {selectedNews.category === "events" && "กิจกรรมสำคัญ"}
                  {selectedNews.category === "educational" && "อบรมวิชาการ"}
                </span>
                <h4 className="text-white font-extrabold text-base sm:text-xl font-sans tracking-tight leading-snug">
                  {selectedNews.title}
                </h4>
              </div>
            </div>

            {/* Content text explanation */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-4 text-[11px] text-gray-450 border-b border-gray-100 pb-3 font-mono">
                <span className="flex items-center text-slate-500">
                  <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                  วันที่เผยแพร่: {selectedNews.date}
                </span>
                <span className="flex items-center text-slate-500">
                  <Eye className="w-4 h-4 mr-1 text-slate-400" />
                  สถิตผู้ชม: {selectedNews.views} ครั้ง
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line font-light">
                {selectedNews.content}
              </p>

              {/* Extra details about loeitech shared */}
              <div className="bg-slate-100/60 p-4 rounded-xl border border-dotted border-gray-200 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900 flex items-center">
                    <Award className="w-3.5 h-3.5 mr-1 text-amber-500" /> ข้อมูลได้รับการตรวจสอบแล้ว
                  </p>
                  <p className="text-[10px] text-gray-400">เผยแพร่โดยกองงานเทคโนโลยีสารสนเทศเพื่อความถูกต้อง</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("คัดลอกลิงก์ข่าวประชาสัมพันธ์ไปยังคลิปบอร์ดสำเร็จประดับสถานศึกษา!");
                  }}
                  className="bg-white hover:bg-slate-100 text-xs text-slate-800 font-semibold px-3 py-1.5 rounded border flex items-center space-x-1 shadow-sm transition self-start sm:self-auto cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  <span>แชร์ข่าวสารนี้</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
