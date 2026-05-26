import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, MessageSquareText, Search, UserPlus, Users } from "lucide-react";

const initialStudents = [
  { id: 1, name: "이민준", age: "6세", day: "월", phone: "" },
  { id: 2, name: "김서우", age: "6세", day: "화", phone: "" },
  { id: 3, name: "김소연", age: "6세", day: "수", phone: "" },
  { id: 4, name: "로빈", age: "6세", day: "금", phone: "" },
  { id: 5, name: "엄예나", age: "6세", day: "토", phone: "" },
  { id: 6, name: "이다온", age: "7세", day: "월", phone: "" },
  { id: 7, name: "나유찬", age: "7세", day: "화", phone: "" },
  { id: 8, name: "하윤율", age: "7세", day: "수", phone: "" },
  { id: 9, name: "안시은", age: "7세", day: "금", phone: "" },
  { id: 10, name: "권로운", age: "7세", day: "토", phone: "" },
  { id: 11, name: "이로운", age: "8세", day: "월", phone: "" },
  { id: 12, name: "최지우", age: "8세", day: "화", phone: "" },
  { id: 13, name: "초은율", age: "8세", day: "토", phone: "" },
];

const today = new Date().toISOString().slice(0, 10);
const thisMonth = today.slice(0, 7);

const lessonTopics = [
  "평면도형",
  "칠교/팔교",
  "수배열",
  "연산",
  "시계",
  "규칙/분류",
  "보드게임",
  "입체도형",
  "수학일기",
];

const homeActivities = {
  "평면도형": "집에서는 색종이를 접고 자르며 같은 모양을 찾아보면 좋습니다.",
  "칠교/팔교": "집에서는 칠교 조각으로 동물이나 집 모양을 만들어보며 회전과 뒤집기를 경험해 주세요.",
  "수배열": "집에서는 달력이나 엘리베이터 숫자를 보며 숫자 배열의 규칙을 찾아보면 좋습니다.",
  "연산": "집에서는 간식 개수를 나누고 더해보며 자연스럽게 덧셈과 뺄셈을 말로 표현해 주세요.",
  "시계": "집에서는 등원 시간, 식사 시간처럼 실제 생활 속 시간을 함께 읽어 주세요.",
  "규칙/분류": "집에서는 단추, 블록, 양말을 색·모양·크기 기준으로 분류해 보세요.",
  "보드게임": "집에서는 승패보다 차례 지키기, 전략 말하기, 이유 설명하기를 함께 해주세요.",
  "입체도형": "집에서는 상자, 공, 원기둥 모양 물건을 찾아 이름을 말해보면 좋습니다.",
  "수학일기": "집에서는 오늘 배운 내용을 그림 한 장과 한 문장으로 표현해 주세요.",
};

function monthKey(dateString) {
  return dateString.slice(0, 7);
}

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      studentId: 1,
      date: today,
      topic: "평면도형",
      content: "도형을 회전해서 맞추는 활동에 적극적으로 참여했습니다.",
      parentChecked: true,
    },
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("전체");
  const [dayFilter, setDayFilter] = useState("전체");
  const [activeTopic, setActiveTopic] = useState("평면도형");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackDate, setFeedbackDate] = useState(today);
  const [newStudent, setNewStudent] = useState({ name: "", age: "6세", day: "월", phone: "" });

  const selectedStudent = students.find((s) => s.id === selectedId) || students[0];

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchQuery = s.name.includes(query.trim());
      const matchAge = ageFilter === "전체" || s.age === ageFilter;
      const matchDay = dayFilter === "전체" || s.day === dayFilter;
      return matchQuery && matchAge && matchDay;
    });
  }, [students, query, ageFilter, dayFilter]);

  const monthComplete = students.filter(
    (s) => feedbacks.filter((f) => f.studentId === s.id && monthKey(f.date) === thisMonth).length >= 4
  ).length;

  const needFeedback = students.filter(
    (s) => feedbacks.filter((f) => f.studentId === s.id && monthKey(f.date) === thisMonth).length < 4
  ).length;

  const studentFeedbacks = feedbacks
    .filter((f) => f.studentId === selectedStudent?.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const addStudent = () => {
    if (!newStudent.name.trim()) return;
    const student = { id: Date.now(), ...newStudent };
    setStudents((prev) => [...prev, student]);
    setSelectedId(student.id);
    setNewStudent({ name: "", age: "6세", day: "월", phone: "" });
  };

  const generateBriefing = () => {
    const name = selectedStudent?.name || "아이";
    const activity = homeActivities[activeTopic];
    return `${name}은(는) 이번 ${activeTopic} 수업에서 교구를 직접 조작하며 개념을 익혔습니다. 단순히 정답을 맞히는 것보다 왜 그렇게 생각했는지 말로 표현해 보는 과정을 중요하게 보았습니다. 특히 유·초등 시기의 사고력수학은 눈으로 보고, 손으로 움직이고, 말로 설명하는 과정이 함께 이루어질 때 개념이 오래 남습니다. 오늘 수업에서는 집중해서 시도하는 모습이 좋았고, 어려운 부분도 다시 비교하며 스스로 수정해 보려는 태도가 보였습니다. ${activity} 다음 수업에서도 아이가 자신 있게 설명할 수 있도록 과정 중심으로 이어가겠습니다.`;
  };

  const addFeedback = () => {
    if (!selectedStudent) return;
    const base =
      feedbackText.trim() ||
      `${activeTopic} 수업에 참여했습니다. 오늘 활동을 통해 개념을 직접 만지고 경험하며 이해하는 시간을 가졌습니다.`;
    setFeedbacks((prev) => [
      ...prev,
      {
        id: Date.now(),
        studentId: selectedStudent.id,
        date: feedbackDate,
        topic: activeTopic,
        content: base,
        parentChecked: false,
      },
    ]);
    setFeedbackText("");
  };

  const toggleChecked = (id) => {
    setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, parentChecked: !f.parentChecked } : f)));
  };

  const exportCsv = () => {
    const rows = [["이름", "연령", "요일", "최근피드백", "이번달피드백횟수", "확인완료피드백"]];
    students.forEach((s) => {
      const fs = feedbacks.filter((f) => f.studentId === s.id).sort((a, b) => b.date.localeCompare(a.date));
      rows.push([
        s.name,
        s.age,
        s.day,
        fs[0]?.date || "없음",
        feedbacks.filter((f) => f.studentId === s.id && monthKey(f.date) === thisMonth).length,
        feedbacks.filter((f) => f.studentId === s.id && f.parentChecked).length,
      ]);
    });
    const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `처음수학_피드백관리_${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-slate-500">판교플레이팩토 처음수학</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">학생 피드백 관리 프로그램</h1>
            <p className="mt-2 text-slate-600">학생별 피드백 기록과 학부모 브리핑 자동생성만 남긴 가벼운 버전입니다.</p>
          </div>
          <Button onClick={exportCsv} className="rounded-2xl">CSV 저장</Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat icon={<Users />} label="전체 학생" value={`${students.length}명`} />
          <Stat icon={<CheckCircle2 />} label="이번달 4회 완료" value={`${monthComplete}명`} />
          <Stat icon={<MessageSquareText />} label="피드백 필요" value={`${needFeedback}명`} />
          <Stat icon={<UserPlus />} label="선택 학생" value={selectedStudent?.name || "없음"} />
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-4">
          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2">
                <Search className="h-4 w-4 text-slate-500" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생 이름 검색" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FilterSelect value={ageFilter} onChange={setAgeFilter} options={["전체", "6세", "7세", "8세"]} />
                <FilterSelect value={dayFilter} onChange={setDayFilter} options={["전체", "월", "화", "수", "목", "금", "토"]} />
              </div>

              <div className="rounded-2xl border bg-white p-3 space-y-2">
                <b className="text-sm">학생 추가</b>
                <Input placeholder="이름" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <FilterSelect value={newStudent.age} onChange={(v) => setNewStudent({ ...newStudent, age: v })} options={["6세", "7세", "8세"]} />
                  <FilterSelect value={newStudent.day} onChange={(v) => setNewStudent({ ...newStudent, day: v })} options={["월", "화", "수", "목", "금", "토"]} />
                </div>
                <Input placeholder="학부모 연락처 선택입력" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} />
                <Button onClick={addStudent} className="w-full rounded-2xl">추가</Button>
              </div>

              <div className="max-h-[520px] overflow-auto space-y-2 pr-1">
                {filteredStudents.map((s) => {
                  const count = feedbacks.filter((f) => f.studentId === s.id && monthKey(f.date) === thisMonth).length;
                  const last = feedbacks.filter((f) => f.studentId === s.id).sort((a, b) => b.date.localeCompare(a.date))[0]?.date || "없음";
                  return (
                    <button key={s.id} onClick={() => setSelectedId(s.id)} className={`w-full text-left rounded-2xl border p-3 transition ${selectedId === s.id ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:bg-slate-50"}`}>
                      <div className="flex justify-between items-center">
                        <b>{s.name}</b>
                        <span className="text-xs opacity-80">{s.age} · {s.day}</span>
                      </div>
                      <div className="mt-2 flex gap-2 items-center text-xs opacity-90">
                        <Badge variant={count >= 4 ? "default" : "secondary"}>피드백 {count}/4</Badge>
                        <span>최근 {last}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-5 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">선택 학생</p>
                    <h2 className="text-2xl font-bold">{selectedStudent?.name}</h2>
                  </div>
                  <Badge className="text-sm px-3 py-1">{selectedStudent?.age} · {selectedStudent?.day}요일</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500">이번 달 피드백 {feedbacks.filter((f) => f.studentId === selectedStudent?.id && monthKey(f.date) === thisMonth).length}/4회</p>
              </div>

              <div className="grid md:grid-cols-3 gap-2">
                <Input type="date" value={feedbackDate} onChange={(e) => setFeedbackDate(e.target.value)} />
                <FilterSelect value={activeTopic} onChange={setActiveTopic} options={lessonTopics} />
                <Button onClick={() => setFeedbackText(generateBriefing())} className="rounded-2xl">브리핑 자동생성</Button>
              </div>

              <Textarea className="min-h-40 rounded-2xl" placeholder="피드백 내용을 입력하거나, 브리핑 자동생성을 눌러 초안을 만드세요." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />

              <div className="flex gap-2">
                <Button onClick={addFeedback} className="rounded-2xl"><CheckCircle2 className="mr-2 h-4 w-4" />피드백 저장</Button>
                <Button variant="secondary" onClick={() => setFeedbackText("")} className="rounded-2xl">내용 지우기</Button>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold">피드백 기록</h3>
                {studentFeedbacks.length === 0 && <div className="rounded-2xl bg-slate-100 p-4 text-slate-500">아직 저장된 피드백이 없습니다.</div>}
                {studentFeedbacks.map((f) => (
                  <div key={f.id} className="rounded-2xl border bg-white p-4">
                    <div className="flex justify-between gap-2 items-center">
                      <b>{f.date} · {f.topic}</b>
                      <Button size="sm" variant={f.parentChecked ? "default" : "secondary"} onClick={() => toggleChecked(f.id)} className="rounded-xl">
                        {f.parentChecked ? "확인완료" : "미확인"}
                      </Button>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{f.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3 [&>svg]:h-5 [&>svg]:w-5">{icon}</div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <b className="text-2xl">{value}</b>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="rounded-2xl">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default App;
