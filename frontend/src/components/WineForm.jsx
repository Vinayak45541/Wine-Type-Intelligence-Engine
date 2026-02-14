import { useState } from "react";
import { predictWine } from "../api";

const features = [
  { name: "fixed_acidity", label: "Fixed Acidity", icon: "🧪", min: 4, max: 16, step: 0.1 },
  { name: "volatile_acidity", label: "Volatile Acidity", icon: "⚗️", min: 0.1, max: 1.5, step: 0.01 },
  { name: "citric_acid", label: "Citric Acid", icon: "🍋", min: 0, max: 1, step: 0.01 },
  { name: "residual_sugar", label: "Residual Sugar", icon: "🍬", min: 0.5, max: 16, step: 0.1 },
  { name: "chlorides", label: "Chlorides", icon: "🧂", min: 0.01, max: 0.2, step: 0.001 },
  { name: "free_sulfur_dioxide", label: "Free SO₂", icon: "💨", min: 1, max: 70, step: 1 },
  { name: "total_sulfur_dioxide", label: "Total SO₂", icon: "🌫️", min: 6, max: 300, step: 1 },
  { name: "density", label: "Density", icon: "⚖️", min: 0.990, max: 1.005, step: 0.0001 },
  { name: "pH", label: "pH Level", icon: "🔬", min: 2.8, max: 4.2, step: 0.01 },
  { name: "sulphates", label: "Sulphates", icon: "🧴", min: 0.3, max: 1.5, step: 0.01 },
  { name: "alcohol", label: "Alcohol", icon: "🍷", min: 7, max: 15, step: 0.1 },
];

const initialState = Object.fromEntries(
  features.map(f => [f.name, (f.min + f.max) / 2])
);

export default function WineForm() {
  const [values, setValues] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const updateValue = (name, val, min, max) => {
    const v = clamp(Number(val), min, max);
    setValues(prev => ({ ...prev, [name]: v }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictWine(values);
      setResult(res);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      padding: "40px",
      fontFamily: "Inter, Arial"
    }}>

      {/* CLASSIC HEADLINE */}
      <div style={{ maxWidth: "1000px", margin: "auto", marginBottom: "35px" }}>
        <h1 style={{
          fontSize: "36px",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: "#111827"
        }}>
          🍷 Wine Type Intelligence Engine
        </h1>

        <p style={{
          color: "#475569",
          marginTop: "10px",
          lineHeight: 1.6,
          fontSize: "15px"
        }}>
          Provide chemical composition inputs and the ML model classifies whether the wine belongs
          to <b> Red </b> or <b> White </b> category.
        </p>
      </div>

      {/* GRID */}
      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px"
      }}>
        {features.map(f => (
          <div key={f.name} style={{
            background: "#f8fafc",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>{f.icon}</span>
              <span style={{ fontWeight: 600 }}>{f.label}</span>
            </div>

            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
              Range: {f.min} — {f.max}
            </div>

            {/* SMALLER SLIDER */}
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.name]}
              onChange={(e) => updateValue(f.name, e.target.value, f.min, f.max)}
              style={{
                width: "100%",
                height: "4px",
                accentColor: "#7c3aed",
                cursor: "pointer"
              }}
            />

            <input
              type="number"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.name]}
              onChange={(e) => updateValue(f.name, e.target.value, f.min, f.max)}
              style={{
                marginTop: "6px",
                width: "100%",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #cbd5f5",
                fontSize: "13px"
              }}
            />
          </div>
        ))}
      </div>

      {/* PREDICT BUTTON */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handlePredict}
          style={{
            padding: "14px 32px",
            background: "#111827",
            color: "white",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#7c3aed";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 22px rgba(124,58,237,0.35)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "#111827";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
          }}
        >
          {loading ? "Analyzing..." : "Predict Wine Type"}
        </button>
      </div>

      {/* RESULT */}
      {/* RESULT */}
      {result && (
        <div style={{
          marginTop: "40px",
          padding: "24px",
          border: "1px solid #e5e5e5",
          borderRadius: "12px",
          background: "#ffffff"
        }}>
    
          {/* HEADLINE */}
          <h2 style={{
            marginBottom: "12px",
            fontSize: "22px",
            fontWeight: "600"
          }}>
            Wine Type Prediction
          </h2>

          {/* MAIN PREDICTION TEXT */}
          <div style={{
            fontSize: "20px",
            marginBottom: "18px"
          }}>
            Result:
            <span style={{
              marginLeft: "10px",
              fontWeight: "700",
              color: result.prediction === "Red Wine" ? "#c62828" : "#2e7d32"
            }}>
              {result.prediction}
            </span>
          </div>

          {/* CALCULATE BOTH PROBABILITIES */}
          {(() => {
            const redProb = result.confidence;
            const whiteProb = 1 - result.confidence;

            return (
              <>
                {/* RED BAR */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{
                    fontSize: "14px",
                    marginBottom: "4px"
                  }}>
                    Red Wine Probability — {(redProb * 100).toFixed(2)}%
                  </div>

                  <div style={{
                    width: "100%",
                    height: "22px",
                    background: "#eee",
                    borderRadius: "6px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${redProb * 100}%`,
                      height: "100%",
                      background: "#c62828",
                      transition: "width 0.4s ease"
                    }} />
                  </div>
                </div>

                {/* WHITE BAR */}
                <div>
                  <div style={{
                    fontSize: "14px",
                    marginBottom: "4px"
                  }}>
                    White Wine Probability — {(whiteProb * 100).toFixed(2)}%
                  </div>

                  <div style={{
                    width: "100%",
                    height: "22px",
                    background: "#eee",
                    borderRadius: "6px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${whiteProb * 100}%`,
                      height: "100%",
                      background: "#2e7d32",
                      transition: "width 0.4s ease"
                    }} />
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}