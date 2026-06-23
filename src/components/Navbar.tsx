/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, LogIn, Menu, X, Landmark, Globe, BookOpen } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isLoggedIn: boolean;
  userType: "student" | "teacher" | null;
  userName: string | null;
  onLogout: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  isLoggedIn,
  userType,
  userName,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "หน้าหลัก", icon: Landmark },
    { id: "departments", label: "แผนกวิชา", icon: GraduationCap },
    { id: "news", label: "ข่าวประชาสัมพันธ์", icon: BookOpen },
    { id: "executive", label: "คณะผู้บริหาร", icon: UsersIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md border-b-2 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab("home")}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary font-bold border-2 border-accent shadow-inner">
              <span className="text-xl font-serif">LVC</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] bg-accent text-primary-dark px-1.5 py-0.5 rounded font-extrabold tracking-wider">สอศ.</span>
                <h1 className="font-sans font-bold text-base sm:text-lg tracking-tight text-white">
                  วิทยาลัยอาชีวศึกษาเลย
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-350 font-mono tracking-wider uppercase">
                Loei Vocational College
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-primary-dark font-semibold shadow"
                      : "text-slate-100 hover:bg-primary-dark hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Portal Authentication status button */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 bg-primary-dark px-4 py-2 rounded-lg border border-primary-light">
                <div className="text-right">
                  <p className="text-xs text-slate-300 font-mono">
                    {userType === "student" ? "ระบบนักศึกษา" : "ระบบอาจารย์"}
                  </p>
                  <p className="text-sm font-medium text-accent truncate max-w-[130px]">{userName}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab("portal");
                  }}
                  className="bg-accent hover:bg-accent-dark text-primary-dark text-xs font-semibold px-2.5 py-1.5 rounded transition-colors"
                >
                  แดชบอร์ด
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-300 hover:text-rose-450 text-xs font-medium cursor-pointer"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab("portal")}
                className="flex items-center space-x-2 bg-accent hover:bg-accent-dark text-primary-dark px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-accent/10 transition-all duration-200 hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบสารสนเทศ</span>
              </button>
            )}
            <div className="flex space-x-1 text-slate-400 hover:text-white pl-2 border-l border-slate-700 text-xs items-center font-mono cursor-not-allowed">
              <Globe className="w-3.5 h-3.5 mr-0.5" />
              <span>TH</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            {isLoggedIn && (
              <button
                onClick={() => setCurrentTab("portal")}
                className="text-xs bg-primary-dark text-accent font-bold px-2.5 py-1.5 rounded border border-primary-light"
              >
                ระบบงาน
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-primary-dark focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-primary-dark border-t border-primary-light animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-primary-dark font-bold"
                      : "text-slate-200 hover:bg-primary hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setCurrentTab("portal");
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-base font-bold bg-accent text-primary-dark hover:bg-accent-dark transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>เข้าสู่ระบบสารสนเทศ</span>
              </button>
            ) : (
              <div className="pt-4 pb-2 border-t border-primary-light px-4 mt-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center">
                    {userName ? userName.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{userName}</p>
                    <p className="text-xs text-slate-300">
                      {userType === "student" ? "นักศึกษา" : "ครู / อาจารย์"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCurrentTab("portal");
                      setIsOpen(false);
                    }}
                    className="bg-primary text-accent hover:bg-primary-light text-center py-2 rounded text-sm font-semibold"
                  >
                    แผงเรียน/สอน
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="bg-rose-955/40 text-rose-300 hover:bg-rose-900/30 text-center py-2 rounded text-sm font-semibold border border-rose-900/50"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Temporary alternative to avoid missing import
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
