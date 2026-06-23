/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DEPARTMENTS_LIST } from "../data";
import { GraduationCap, Users, BookOpen, Search, ArrowRight, BookMarked } from "lucide-react";

export default function DepartmentsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const flatDepts = DEPARTMENTS_LIST.flatMap((cat) => 
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredDepts = flatDepts.filter((dept) => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDept = flatDepts.find((dept) => dept.id === selectedDeptId);

  return (
    <div className="bg-slate-100/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1 font-mono">Academic Divisions</span>
          <h1 className="text-3xl sm:text-4xl font-black text-primary-dark tracking-tight">
            แผนกวิชาการศึกษาทางอาชีพ
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed">
            วิทยาลัยอาชีวศึกษาเลย เปิดสอนหลักสูตรสายวิชาชีพ ปวช. และ ปวส. โดยคณาจารย์ผู้มีความชำนาญการและอุปกรณ์ฝึกปฏิบัติอันทันสมัยสอดรับระดับมาตรฐานสากล
          </p>
          <div className="h-1 bg-accent w-16 mx-auto mt-4"></div>
        </div>

        {/* Search filter for departments */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาชื่อแผนกวิชา (เช่น ช่างยนต์, บัญชี, คอมพิวเตอร์)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Grid: Major Groups & Cards list */}
          <div className="lg:col-span-2 space-y-8">
            {DEPARTMENTS_LIST.map((group, idx) => {
              // Filter Group item matches
              const groupItems = group.items.filter((item) =>
                filteredDepts.some((f) => f.id === item.id)
              );

              if (groupItems.length === 0) return null;

              return (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center space-x-2 font-mono">
                    <span className="w-1.5 h-3.5 bg-primary rounded-sm inline-block"></span>
                    <span>{group.category}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groupItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedDeptId(item.id)}
                        className={`p-5 rounded-xl border transition duration-300 text-left hover:scale-[1.01] cursor-pointer flex flex-col justify-between ${
                          selectedDeptId === item.id
                            ? "bg-primary border-accent text-white shadow-lg"
                            : "bg-white hover:bg-slate-50 border-slate-100 text-slate-800 shadow-sm"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded ${
                              selectedDeptId === item.id
                                ? "bg-accent text-primary-dark"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {item.code}
                            </span>
                            <GraduationCap className={`w-5 h-5 ${
                              selectedDeptId === item.id ? "text-accent" : "text-gray-400"
                            }`} />
                          </div>
                          <h4 className="font-bold text-base mb-1.5">{item.name}</h4>
                          <p className={`text-xs line-clamp-2 leading-relaxed ${
                            selectedDeptId === item.id ? "text-slate-200" : "text-gray-500"
                          }`}>
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-4 mt-3 border-t border-slate-100/10 flex items-center justify-between text-[11px] font-semibold font-mono">
                          <span className={`flex items-center space-x-1 ${
                            selectedDeptId === item.id ? "text-accent" : "text-slate-600"
                          }`}>
                            <Users className="w-3.5 h-3.5 mr-1" />
                            {item.studentsCount} ผู้เรียน
                          </span>
                          <span className={`inline-flex items-center group-hover:translate-x-1 transition duration-200 ${
                            selectedDeptId === item.id ? "text-accent" : "text-primary"
                          }`}>
                            ดูรายละเอียด <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredDepts.length === 0 && (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-lg text-slate-800">ไม่พบคลังแผนกหลักสูตร</h4>
                <p className="text-xs text-gray-500 mt-1">กรุณาลองพิมพ์ชื่อคำค้นหาอื่นใหม่อีกครั้ง</p>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Program Details Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl shadow-md p-6 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-24 h-24 bg-accent/5 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              {selectedDept ? (
                <div className="space-y-5 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                      {selectedDept.code}
                    </span>
                    <span className="text-xs text-slate-400 tracking-wider font-mono">LVC DIVISION PROFILE</span>
                  </div>

                  <h3 className="font-sans font-extrabold text-xl text-primary-dark border-b border-gray-150 pb-3">
                    {selectedDept.name}
                  </h3>

                  <div className="space-y-4 pt-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">คำนิยาม / จุดประสงค์สาขา</h4>
                      <p className="text-xs sm:text-sm text-gray-650 leading-relaxed mt-1">
                        {selectedDept.desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block">ปริมาณนักเรียน</span>
                        <span className="text-base font-extrabold text-primary">{selectedDept.studentsCount} คน</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block font-sans">วิชาเปิดสอนประจำแผนก</span>
                        <span className="text-base font-extrabold text-primary">{selectedDept.coursesCount} รายวิชา</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 font-mono">กลุ่มหลักสูตรการเรียน</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded text-xs">
                          <span className="font-bold text-slate-800">ระดับ ปวช. (หลักสูตร 3 ปี)</span>
                          <span className="bg-accent/20 text-primary-dark px-2 py-0.5 rounded-sm font-semibold text-[10px]">เปิดสอนพิเศษ</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded text-xs">
                          <span className="font-bold text-slate-800">ระดับ ปวส. (หลักสูตร 2 ปี)</span>
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-sm font-semibold text-[10px]">เปิดหลักสูตรทวิภาคี</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA on specific departments */}
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-[10px] text-gray-400 font-light mb-3">
                        * สนใจสมัครเข้าศึกษาแผนกวิชานี้ สามารถสมัครผ่านระบบรับเข้าเพื่อดำเนินการในขั้นตอนถัดไป
                      </p>
                      <button
                        onClick={() => alert(`ท่านกำลังสมัครคัดเลือกเข้าภาคเรียนวิชากับสาขา ${selectedDept.name} ระบบจะบันทึกประสานงานโควตา`)}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-2.5 rounded shadow transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <span>สมัครสอบคัดเลือกด้าน {selectedDept.name.replace("แผนกวิชา", "")}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <GraduationCap className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
                  <h4 className="font-bold text-sm text-slate-800">โปรดเลือกแผนกวิชา</h4>
                  <p className="text-xs text-gray-400 max-w-[200px] mx-auto leading-relaxed">
                    คลิกเลือกแผนกวิชาด้านซ้ายมือ เพื่อเรียกดูรายละเอียดกลุ่มวิชา คลังข้อมูล จำนวนนักเรียน และหลักสูตรวิทยาลัยอาชีวศึกษาเลย
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
