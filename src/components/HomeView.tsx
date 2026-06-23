/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { NewsItem } from "../types";
import { 
  COLLEGE_INFO, 
  INITIAL_NEWS, 
  EXECUTIVE_BOARD, 
  DEPARTMENTS_LIST, 
  SYSTEM_LINKS 
} from "../data";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Search, 
  Bell, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Award, 
  Clock, 
  ArrowRight,
  BookOpen, 
  FileText, 
  ExternalLink,
  MessageSquare
} from "lucide-react";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectNews: (news: NewsItem) => void;
}

export default function HomeView({ setCurrentTab, onSelectNews }: HomeViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [newsCategory, setNewsCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Background slides
  const slides = [
    {
      title: "ยินดีต้อนรับสู่ วิทยาลัยอาชีวศึกษาเลย",
      sub: "Loei Vocational College",
      desc: COLLEGE_INFO.slogan,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80",
    },
    {
      title: "มุ่งเน้นความเป็นเลิศด้านเทคโนโลยีสิ่งประดิษฐ์",
      sub: "รางวัลสิ่งประดิษฐ์คนรุ่นใหม่ ระดับชาติ",
      desc: "ส่งขยายเสริมศักยภาพอาชีวศึกษาไทย ผลิตเยาวชนสมรรถนะเด่นนำนวัตกรรม",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=80",
    },
    {
      title: "เปิดรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2569",
      sub: "สร้างอนาคตด้วยสายวิชาชีพที่ตลาดยอมรับ",
      desc: "เปิดรับสมัครทั้งระดับ ปวช. และ ปวส. เรียนต่อสายตรง สวัสดิการและกองทุน กยศ. ครบครัน",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80",
    },
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Filter systems
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactMsg) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
      }, 5000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* 1. Majestic Hero Banner Slideshow */}
      <section className="relative h-[480px] md:h-[560px] bg-slate-950 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Dark Mask Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/85 z-20"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            {/* Core Text Content */}
            <div className="absolute inset-0 flex items-center z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl space-y-4 md:space-y-6">
                <span className="inline-block bg-accent text-primary-dark text-xs sm:text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-sm border-l-4 border-primary shadow animate-pulse">
                  {slide.sub}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab("news")}
                    className="bg-accent hover:bg-accent-dark text-primary-dark text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 rounded-lg shadow-lg hover:shadow-accent/20 transition duration-250 cursor-pointer"
                  >
                    อ่านข่าวสารประชาสัมพันธ์
                  </button>
                  <button
                    onClick={() => setCurrentTab("portal")}
                    className="bg-primary-dark hover:bg-primary text-accent text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 rounded-lg border border-accent/40 hover:border-accent transition duration-250 cursor-pointer"
                  >
                    เข้าระบบสารสนเทศสถาบัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls Chevron buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-slate-900/50 hover:bg-slate-900 text-white p-2 sm:p-3 rounded-full hover:scale-105 border border-slate-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-slate-900/50 hover:bg-slate-900 text-white p-2 sm:p-3 rounded-full hover:scale-105 border border-slate-700 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide indicators dot-bar */}
        <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "bg-accent w-8"
                  : "bg-slate-650 hover:bg-slate-400 bg-slate-600"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. Philosophy & Vision Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* motto */}
            <div className="bg-gradient-to-br from-primary to-primary-dark p-7 rounded-2xl border-b-4 border-accent text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-5">
                <Users className="w-40 h-40" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-accent">ปรัชญาของวิทยาลัย</h3>
              </div>
              <p className="text-2xl font-black text-white py-1 font-serif text-center italic tracking-wider leading-relaxed my-2">
                &ldquo;{COLLEGE_INFO.slogan}&rdquo;
              </p>
              <div className="border-t border-primary-light/40 mt-4 pt-4 text-center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Slogan of Loeitech</span>
              </div>
            </div>

            {/* vision */}
            <div className="bg-gradient-to-br from-primary-dark via-primary to-[#001f40] p-7 rounded-2xl border-b-4 border-accent text-white shadow-xl lg:col-span-2 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Award className="w-48 h-48" />
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2.5 bg-white/10 text-accent rounded-lg">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-accent">วิสัยทัศน์ (Vision)</h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-gray-100 font-light max-w-4xl pt-1">
                {COLLEGE_INFO.vision}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-accent">
                <span className="bg-primary/80 px-3 py-1 rounded border border-primary-light/50">#เทคโนโลยีคอมพิวเตอร์และดิจิทัล</span>
                <span className="bg-primary/80 px-3 py-1 rounded border border-primary-light/50">#กำลังคนสมรรถนะสูง</span>
                <span className="bg-primary/80 px-3 py-1 rounded border border-primary-light/50">#เศรษฐกิจพอเพียง</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. News Feed and Announcements Portal */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-widest">News Hub Update</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ข่าวสาร & ประชาสัมพันธ์
              </h2>
            </div>

            {/* Search Input on News */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ค้นหาประกาศ ข่าวพัสดุ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Category Tabs list */}
          <div className="flex overflow-x-auto space-x-1 mb-8 pb-2 scrollbar-thin scrollbar-thumb-primary/20">
            {categoryFilters.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setNewsCategory(tab.value)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  newsCategory === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-650 bg-white hover:bg-slate-50 hover:text-primary border border-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectNews(item)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden border border-gray-100 flex flex-col group cursor-pointer transition duration-300 hover:-translate-y-1"
                >
                  {/* News Image */}
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.important && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        ข่าวสำคัญ
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.category === "publicity" && "ประชาสัมพันธ์"}
                      {item.category === "admission" && "การรับนักศึกษา"}
                      {item.category === "procurement" && "ข่าวพัสดุฯ"}
                      {item.category === "events" && "กิจกรรมวิทยาลัย"}
                      {item.category === "educational" && "อบรมวิชาการ"}
                    </span>
                  </div>

                  {/* News Text */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2 font-mono">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {item.date}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          {item.views}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-primary font-bold">
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center">
                        อ่านรายละเอียดทั้งหมด <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">ไม่พบข้อมูลข่าวสารที่สอดคล้องกับหัวข้อค้นหา</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Active Systems Quick Links (ระบบเพื่อนักศึกษาและอาจารย์) */}
      <section className="py-14 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs text-accent font-bold tracking-widest uppercase mb-1 block">Quick Access Links</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              ระบบงานสารสนเทศเพื่อความสะดวก
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto mt-2">
              เชื่อมโยงช่องทางและฐานข้อมูลสารสนเทศส่วนกลางของหน่วยงานและกระทรวงศึกษาธิการ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SYSTEM_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`คุณกำลังเข้าสู่ ${link.name} (ในสภาพแวดล้อมที่ใช้งานจริง ลิงก์จะเชื่อมประตูดังกล่าวเพื่อทำรายการ)`);
                }}
                className="bg-primary-dark/60 hover:bg-primary-dark p-4 rounded-xl border border-primary-light/40 hover:border-accent flex items-center justify-between transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 bg-primary group-hover:bg-accent text-accent group-hover:text-primary-dark rounded-lg flex items-center justify-center border border-primary-light transition">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold group-hover:text-white transition-colors">{link.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider">ONLINE PORTAL SYSTEM</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>

          {/* Core Interactive Login Card invitation inside Home */}
          <div className="mt-12 bg-gradient-to-br from-primary-dark to-primary p-6 rounded-2xl border border-primary-light/55 max-w-4xl mx-auto text-center relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">เข้าสู่ระบบตรวจดูตารางเรียน รายงานผู้เรียน และเกรดสะสมประจำตัว</h3>
              <p className="text-xs text-slate-200 max-w-lg mx-auto mb-4">
                สำหรับคุณครูที่ปรึกษา คณาจารย์ และนักเรียนนักศึกษาในสังกัดวิทยาลัยเพื่อดูขอมูลเช็คชื่อและส่งคะแนนปลายภาคผ่านเว็บแอพพลิเคชันอย่างสะดวกรวดเร็ว
              </p>
              <button
                onClick={() => setCurrentTab("portal")}
                className="bg-accent hover:bg-accent-dark text-primary-dark font-bold px-7 py-2.5 rounded-lg text-sm transition shadow hover:shadow-lg hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>เข้าสู่ระบบสารสนเทศส่วนบุคคล</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 font-black text-9xl select-none text-white font-mono leading-none pointer-events-none transform translate-y-12">
              LVC
            </div>
          </div>

        </div>
      </section>

      {/* 5. Executive Board (คณะผู้บริหาร) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs text-red-700 font-bold tracking-widest uppercase mb-1 block">Leadership Team</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              คณะผู้บริหารวิทยาลัยอาชีวศึกษาเลย
            </h2>
            <div className="h-1 bg-amber-500 w-16 mx-auto mt-3"></div>
          </div>

          {/* Director highlight */}
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6 mb-12 relative items-center">
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
              ผู้อำนวยการ
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shadow border-2 border-amber-500 flex-shrink-0 bg-slate-200">
              <img
                src={EXECUTIVE_BOARD[0].image}
                alt={EXECUTIVE_BOARD[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left flex-1 space-y-2">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Director</p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{EXECUTIVE_BOARD[0].name}</h3>
              <p className="text-xs text-red-700 font-semibold bg-red-50 inline-block px-2.5 py-1 rounded-sm">
                {EXECUTIVE_BOARD[0].position}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-serif italic py-1 border-t border-slate-200 leading-relaxed">
                &ldquo;{EXECUTIVE_BOARD[0].quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Deputy directors grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {EXECUTIVE_BOARD.slice(1).map((board, id) => (
              <div
                key={id}
                className="bg-slate-50 border border-slate-100 p-5 rounded-xl text-center flex flex-col items-center hover:shadow-md transition"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow mb-4 bg-slate-200">
                  <img
                    src={board.image}
                    alt={board.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{board.name}</h4>
                <p className="text-xs text-slate-500 bg-white px-2.5 py-1 rounded border border-gray-100">
                  {board.position}
                </p>
                <span className="text-[10px] text-gray-400 mt-2 tracking-wider font-mono uppercase">Deputy Director</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. High-impact stats counter */}
      <section className="py-12 bg-slate-50 border-t border-b border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">2,500+</p>
              <p className="text-xs text-gray-500 font-medium tracking-wide mt-1 uppercase">นักเรียนและนักศึกษา</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">12</p>
              <p className="text-xs text-gray-500 font-medium tracking-wide mt-1 uppercase">แผนกวิชาการศึกษา</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">120+</p>
              <p className="text-xs text-gray-500 font-medium tracking-wide mt-1 uppercase">คณาจารย์บุคลากร</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">98.4%</p>
              <p className="text-xs text-gray-500 font-medium tracking-wide mt-1 uppercase">ความพึงพอใจและการมีงานทำ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer Contact Us with feedback form */}
      <footer className="bg-[#002244] border-t-4 border-accent text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            
            {/* Address Columns */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent text-primary p-2 font-serif font-extrabold flex items-center justify-center">LV</div>
                <div>
                  <h3 className="font-bold text-lg text-accent">วิทยาลัยอาชีวศึกษาเลย</h3>
                  <span className="text-[10px] text-slate-300 font-mono tracking-widest uppercase">Office of Vocational Education</span>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed pt-2">
                วิทยาลัยด้านอาชีวศึกษาและวิชาชีพแห่งจังหวัดเลย มุ่งให้ผู้เรียนเก่งพ้นทักษะชีวิต ทักษะสมรรถนะเทคโนโลยี เปี่ยมด้วยจริยธรรมของคติพจน์อาชีวศึกษา
              </p>
              <div className="space-y-3 pt-3 text-xs text-slate-200">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-accent pt-0.5" />
                  <span>{COLLEGE_INFO.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>โทร: {COLLEGE_INFO.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>อีเมล: {COLLEGE_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Interactive maps placeholder */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-accent border-b border-primary pb-2 uppercase tracking-wide">
                พิกัดสถานที่วิทยาลัย (Google Maps Location)
              </h4>
              <div className="w-full h-44 rounded-lg overflow-hidden border border-primary bg-slate-950 relative shadow-inner">
                {/* Simulated Google Map using clean graphic layout */}
                <div className="absolute inset-0 bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="w-8 h-8 text-rose-500 animate-bounce mb-1" />
                  <p className="text-xs font-semibold text-white">วิทยาลัยอาชีวศึกษาเลย</p>
                  <p className="text-[10px] text-gray-400">#วิทยาลัยวิชาชีพสมรรถนะเด่น</p>
                  <a 
                    href="https://maps.google.com/?q=Loei+Vocational+College"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="mt-3 bg-primary hover:bg-primary-dark text-[10px] text-accent font-bold px-3 py-1.5 rounded transition inline-flex items-center space-x-1"
                  >
                    <span>เปิดแผนที่จริงบนกูเกิลแมป</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact feedback form */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-accent border-b border-primary pb-2 uppercase tracking-wide">
                ติดต่อสอบถาม / ส่งข้อร้องเรียนออนไลน์
              </h4>
              {contactSubmitted ? (
                <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-300 p-4 rounded-lg text-xs leading-relaxed animate-in fade-in duration-300">
                  <p className="font-bold text-sm mb-1 text-emerald-400">✓ ส่งข้อความของท่านเรียบร้อยแล้ว!</p>
                  <p>ทางงานประชาสัมพันธ์วิทยาลัยอาชีวศึกษาเลยจะดึงข้อมูลนี้เข้าสู่สำนักงาน และตอบกลับท่านอย่างรวดเร็วที่สุดทางที่อยู่อีเมลป้อน ขอบพระคุณครับ</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="ชื่อผู้สมัคร/ชื่อของตัวท่าน *"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="อีเมลติดต่อกลับ (ไม่จำเป็น)"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="ระบุคำถามคำร้องเรียนหรือฝ่ายบริการที่ประสงค์จะประสานงานด้วย..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-primary-dark text-xs font-bold py-2 rounded shadow transition-all hover:shadow-accent/10 cursor-pointer"
                  >
                    ส่งข้อความติดต่อกลับ
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-[11px] text-gray-400 gap-4">
            <p className="text-center md:text-left">
              &copy; 2026 วิทยาลัยอาชีวศึกษาเลย - เพื่อการศึกษาอาชีวศึกษาจังหวัดเลย. สงวนลิขสิทธิ์ทั้งหมดตามพระราชบัญญัติ.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="hover:text-white cursor-help">นโยบายส่วนบุคคล</span>
              <span>•</span>
              <span className="hover:text-white cursor-help">ขั้นตอนและมาตรการร้องเรียน</span>
              <span>•</span>
              <span className="hover:text-white cursor-help">สอศ. หน้าแรก</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
