/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { INITIAL_NEWS } from "../data";
import { NewsItem } from "../types";
import { Calendar, Eye, Search, BookOpen, AlertCircle, Bookmark } from "lucide-react";

interface NewsViewProps {
  onSelectNews: (news: NewsItem) => void;
}

export default function NewsView({ onSelectNews }: NewsViewProps) {
  const [newsCategory, setNewsCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryFilters = [
    { label: "ข่าวสารทั้งหมด", value: "all" },
    { label: "ข่าวประชาสัมพันธ์", value: "publicity" },
    { label: "รับสมัครนักเรียนนักศึกษา", value: "admission" },
    { label: "จัดซื้อจัดจ้าง", value: "procurement" },
    { label: "ข่าวกิจกรรมวิทยาลัย", value: "events" },
    { label: "ข่าวจัดอบรม/วิชาการ", value: "educational" },
  ];

  const filteredNews = INITIAL_NEWS.filter((item) => {
    const matchesCategory = newsCategory === "all" || item.category === newsCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="text-red-700 text-xs font-bold tracking-widest uppercase block mb-1">Information Center</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            คลังข่าวสารและประชาสัมพันธ์
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
            ติดตามประวัติความเคลื่อนไหว ประกาศสอบทักษะ การจัดซื้อจัดจัดจ้างงานจัดงาน อบรมของบุคลากร และงานปฐมนิเทศนักศึกษาผ่านระบบศูนย์กลางข้อมูล
          </p>
          <div className="h-1 bg-amber-500 w-16 mx-auto mt-4"></div>
        </div>

        {/* Filters and search box */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 gap-4 flex flex-col md:flex-row md:items-center md:justify-between mb-8 shadow-sm">
          {/* Category Scroller */}
          <div className="flex overflow-x-auto space-x-1 pb-2 md:pb-0 scrollbar-none">
            {categoryFilters.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setNewsCategory(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                  newsCategory === tab.value
                    ? "bg-slate-900 text-white"
                    : "text-gray-500 bg-slate-50 hover:bg-gray-100 hover:text-slate-900 border border-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="พิมพ์คำค้นหาข่าวพาดหัว..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-350 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Main list Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNews(item)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden flex flex-col group cursor-pointer transition duration-300 hover:-translate-y-1"
              >
                <div className="h-44 bg-slate-150 relative overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition duration-500"
                  />
                  {item.important && (
                    <span className="absolute top-3 left-3 bg-red-650 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow bg-red-700">
                      ข่าวประกาศ
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded uppercase backdrop-blur-sm">
                    {item.category === "publicity" && "ประชาสัมพันธ์"}
                    {item.category === "admission" && "สมัครเรียน"}
                    {item.category === "procurement" && "พัสดุและจัดซื้อ"}
                    {item.category === "events" && "กิจกรรมวิทยาลัย"}
                    {item.category === "educational" && "งานบริการวิชาการ"}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-mono">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {item.date}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {item.views} Views
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition duration-150">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-amber-600 font-bold">
                    <span>อ่านต่อข้อมูลฉบับเต็ม</span>
                    <Bookmark className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-gray-200">
              <AlertCircle className="w-12 h-12 text-slate-350 mx-auto mb-3" />
              <h4 className="font-bold text-lg text-slate-900">ไม่พบบันทึกประกาศ</h4>
              <p className="text-xs text-gray-500">กรุณาลองปรับเปลี่ยนชนิดตัวคัดกรอง หรือปรับปรุงคำค้นหาอีกครั้ง</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
