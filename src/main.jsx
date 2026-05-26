import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{
      fontFamily: "sans-serif",
      padding: "30px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <h1>판교플레이팩토 처음수학</h1>
      <h2>학생 피드백 관리 프로그램</h2>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
        marginTop: "20px"
      }}>
        <h3>학생 선택</h3>
        <select style={{padding:"10px", width:"200px"}}>
          <option>이민준</option>
          <option>김서우</option>
          <option>김소연</option>
        </select>

        <div style={{marginTop:"20px"}}>
          <label>피드백 날짜</label><br />
          <input type="date" style={{padding:"10px"}} />
        </div>

        <div style={{marginTop:"20px"}}>
          <label>피드백 내용</label><br />
          <textarea
            rows="6"
            style={{
              width:"100%",
              padding:"10px",
              borderRadius:"10px"
            }}
            placeholder="아이 수업 피드백 입력"
          />
        </div>

        <button style={{
          marginTop:"20px",
          background:"#111827",
          color:"white",
          padding:"12px 20px",
          borderRadius:"12px",
          border:"none"
        }}>
          피드백 저장
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);