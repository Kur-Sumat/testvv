/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EXECUTIVE_BOARD, COLLEGE_INFO } from "../data";
import { Award, ShieldAlert, BadgeCheck, Users, Milestone, Radio } from "lucide-react";

export default function ExecutiveView() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="text-red-700 text-xs font-bold tracking-widest uppercase block mb-1">Board of Directors</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ทำเนียบคณะผู้บริหารวิทยาลัย
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
            คณะผู้บริหาร คณะผู้อำนวยการ และรองผู้อำนวยการฝ่ายต่าง ๆ มุ่งเน้นการยกระดับวิชาชีพอาชีวศึกษาเลยเพื่อประโยชน์ผู้เรียนเป็นหลัก
          </p>
          <div className="h-1 bg-amber-500 w-16 mx-auto mt-4"></div>
        </div>

        {/* Director Panel */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl overflow-hidden shadow-xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center border border-slate-800 relative mb-12">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
            <Users className="w-80 h-80" />
          </div>
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-4 border-amber-500 bg-slate-800 shrink-0">
            <img
              src={EXECUTIVE_BOARD[0].image}
              alt={EXECUTIVE_BOARD[0].name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="text-center md:text-left flex-1 space-y-4">
            <div>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase font-mono">
                Director of Loeitech
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-2">{EXECUTIVE_BOARD[0].name}</h3>
              <p className="text-sm text-red-100 font-semibold">{EXECUTIVE_BOARD[0].position}</p>
            </div>
            <p className="text-sm sm:text-base text-gray-200 font-serif italic py-3 border-t border-slate-800 leading-relaxed">
              &ldquo;{EXECUTIVE_BOARD[0].quote}&rdquo;
            </p>
            <div className="flex justify-center md:justify-start space-x-2 pt-1.5">
              <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">EXPERIENCED PHD</span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">TECHNICAL LEADER</span>
            </div>
          </div>
        </div>

        {/* Deputy Board grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {EXECUTIVE_BOARD.slice(1).map((board, index) => {
            return (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition p-6 text-center flex flex-col justify-between items-center"
              >
                <div className="space-y-4 w-full">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-100 shadow bg-slate-100 mx-auto">
                    <img
                      src={board.image}
                      alt={board.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{board.name}</h4>
                    <p className="text-xs text-red-700 font-bold bg-red-50 inline-block px-2.5 py-0.5 rounded-sm mt-1">
                      {board.position}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 w-full text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                  LVC Deputy director
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Information: Core administration departments of the college */}
        <div className="max-w-4xl mx-auto mt-16 bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm text-left grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-wide flex items-center mb-4 text-red-700">
              <Milestone className="w-4 h-4 mr-2" />
              <span>ส่วนราชการและกองงานภายใน</span>
            </h4>
            <div className="space-y-2 text-xs text-gray-650">
              <p className="p-3 bg-slate-50 rounded border border-slate-105"><strong>ฝ่ายวิชาการ (Academic Division)</strong>: รับผิดชอบหลักสูตรคลังวิเคราะห์ แผนการลงทะเบียน งานทะเบียน และปรับปรุงชั่วโมงเรียน</p>
              <p className="p-3 bg-slate-50 rounded border border-slate-105"><strong>ฝ่ายแผนงานและความร่วมมือ</strong>: เชื่อมโยงงบประมาณ ทุนขัดใจพัสดุ อุปกรณ์การสอบ ร่วมกับกระทรวงการพัฒนาจังหวัดและบริษัทเครือข่าย</p>
              <p className="p-3 bg-slate-50 rounded border border-slate-105"><strong>ฝ่ายพัฒนากิจการนักเรียนนักศึกษา</strong>: คุมระเบียบข้อบังคับ ช่วยเหลือ กยศ. อวท. และจัดโครงการประกวดเพื่อสร้างทัศนคติผู้นำอาชีวะคนรุ่นใหม่</p>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <h5 className="font-bold text-xs text-amber-900 flex items-center mb-1">
                <Radio className="w-3.5 h-3.5 mr-1 text-amber-600" /> นโยบายสุจริตและการเปิดเผยข้อมูล
              </h5>
              <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                คณะผู้บริหารวิทยาลัยอาชีวศึกษาเลยยึดมั่นประกาศนโยบาย No Gift Policy ทำงานโปร่งใส ตรวจสอบความถูกต้องของสัญกรณ์ อุปกรณ์และการบริการวิชาการได้อย่างทั่วถึง มั่นคง และเป็นต้นแบบอาชีวศึกษาสีขาวอย่างยั่งยืน
              </p>
            </div>
            <p className="text-[10px] text-gray-400 font-light">
              * ข้อมูลข้างต้นได้รับการรับรองอย่างเป็นทางการ ณ ฝ่ายเทคโนโลยีสารสนเทศ วิทยาลัยอาชีวศึกษาเลย ปี 2569
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
