# AuraDrive: Trust-Aware Explainable Autonomous Driving

## With Counterfactual Reasoning

> A research-grade system that simulates autonomous driving decisions (STOP, GO, SLOW) and provides multi-modal explainability along with a computed trust score. Designed for IEEE publication.

---

## 🔬 Research Contributions

This project introduces three novel contributions to Explainable AI for autonomous driving:

### 1. Multi-Modal Explainability Framework
Combines three complementary explanation modalities:
- **Visual** (Grad-CAM): Highlights image regions influencing decisions
- **Quantitative** (Custom + SHAP): Feature importance scoring
- **Natural Language**: Human-readable decision explanations

### 2. Counterfactual Reasoning Module
Answers "what-if" questions about driving decisions:
- Object removal: "If the pedestrian was not present..."
- Distance modification: "If the car was 5m farther..."
- Object substitution: "If the pedestrian was a car..."
- **Minimal change analysis**: Finds smallest change to flip the decision

### 3. Trust Scoring Mechanism
Novel trust score combining three components:

```
T(x) = w₁·C(x) + w₂·E(x) + w₃·S(x)

C(x) = Model Confidence (detection + decision confidence)
E(x) = Explanation Consistency (stability under perturbations)
S(x) = Distribution Similarity (Mahalanobis distance)
```

---

## 📁 Project Structure

```
EXAI/
├── models/
│   ├── perception.py          # YOLOv5 + ResNet-18 perception pipeline
│   └── decision_engine.py     # Hybrid rule-based + ML decision logic
├── explainability/
│   ├── gradcam.py             # Grad-CAM visual explanations
│   ├── feature_importance.py  # Custom + SHAP feature importance
│   └── nlg_explainer.py       # Natural language explanation generator
├── counterfactuals/
│   └── counterfactual.py      # What-if scenario simulator
├── trust/
│   └── trust_score.py         # Trust scoring engine
├── ui/
│   └── app.py                 # Streamlit web dashboard
├── experiments/
│   ├── evaluate.py            # Evaluation & publication figures
│   └── user_study.py          # Simulated user study
├── utils/
│   └── helpers.py             # Configuration, data structures, utilities
├── data/
│   └── sample_images/         # Test images
├── main.py                    # CLI entry point
├── requirements.txt           # Dependencies
└── README.md                  # This file
```

---

## 🚀 Setup & Installation

### Prerequisites
- Python 3.8+
- pip

### Step 1: Create Virtual Environment
```bash
cd EXAI
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run the System
```bash
# Option 1: Run demo with synthetic scene
python main.py --demo

# Option 2: Launch Streamlit web dashboard
python main.py --ui
# or directly:
streamlit run ui/app.py

# Option 3: Analyze a specific image
python main.py --image path/to/driving_scene.jpg

# Option 4: Run evaluation experiments
python main.py --evaluate

# Option 5: Run simulated user study
python main.py --user-study

# Option 6: Run everything
python main.py --all
```

---

## 🖥️ Streamlit Dashboard

The web dashboard provides a complete visual interface:

| Section | Description |
|---------|-------------|
| **Image Upload** | Upload driving scene or select synthetic scenario |
| **Object Detection** | Bounding boxes with class, confidence, distance |
| **Decision Display** | STOP/GO/SLOW badge with confidence |
| **Grad-CAM** | Heatmap overlay showing attention regions |
| **Feature Importance** | Interactive bar chart (Custom + SHAP) |
| **NL Explanation** | Human-readable decision reasoning |
| **Counterfactuals** | What-if scenario cards |
| **Trust Score** | Gauge visualization with component breakdown |

Launch with:
```bash
streamlit run ui/app.py
```

---

## 🏗️ Architecture

### Pipeline Flow
```
Input Image
    │
    ├─→ YOLOv5 → Object Detections (class, confidence, bbox)
    │                    │
    │              Distance Estimation (pinhole model heuristic)
    │
    ├─→ ResNet-18 → Feature Vector (512-dim)
    │
    │   ┌────────────────────────────────────────┐
    │   │         Decision Engine                 │
    │   │   α × Rule-Based + (1-α) × ML-Based   │
    │   │   → STOP / SLOW / GO                   │
    │   └────────────────────────────────────────┘
    │              │
    ├──────────────┼──→ Grad-CAM → Visual Heatmap
    │              │
    ├──────────────┼──→ Feature Importance → SHAP + Custom
    │              │
    ├──────────────┼──→ NLG → Natural Language Explanation
    │              │
    ├──────────────┼──→ Counterfactuals → What-If Scenarios
    │              │
    └──────────────┴──→ Trust Score → T(x) ∈ [0,1]
```

### Hybrid Decision Engine
The decision engine combines:
1. **Rule-Based**: Priority-ordered driving rules (transparent, auditable)
2. **ML-Based**: Neural network classifier on feature vectors
3. **Fusion**: `P_final(a) = α × P_rule(a) + (1-α) × P_ml(a)`

---

## 📊 Evaluation

### Running Experiments
```bash
python main.py --evaluate
python main.py --user-study
```

### Generated Plots
- `results/confusion_matrix.png` — Decision accuracy
- `results/class_metrics.png` — Per-class precision/recall/F1
- `results/trust_distribution.png` — Trust score histogram
- `results/trust_components.png` — Component breakdown
- `results/evaluation_summary.png` — Combined summary
- `results/user_study_results.png` — User study comparison

---

## 🔧 Configuration

All parameters are centralized in `utils/helpers.py` → `Config` dataclass:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `yolo_confidence_threshold` | 0.35 | Min detection confidence |
| `pedestrian_stop_distance` | 15.0m | Stop threshold for pedestrians |
| `vehicle_slow_distance` | 20.0m | Slow threshold for vehicles |
| `decision_alpha` | 0.70 | Rule/ML balance (higher = more rules) |
| `trust_w1` | 0.40 | Confidence weight in trust score |
| `trust_w2` | 0.35 | Consistency weight in trust score |
| `trust_w3` | 0.25 | Similarity weight in trust score |
| `num_perturbations` | 5 | Perturbations for consistency |

---

## 📝 Module Documentation

### Perception Module (`models/perception.py`)
- **YOLOv5s**: Pretrained object detection via `torch.hub`
- **ResNet-18**: Feature extraction with ImageNet weights
- **Distance Estimation**: Pinhole camera model heuristic
- Outputs: Detection objects + 512-dim feature vectors

### Decision Engine (`models/decision_engine.py`)
- 7 prioritized driving rules (STOP: 3, SLOW: 3, GO: 1)
- Small feedforward network (520 → 256 → 64 → 3)
- Configurable hybrid fusion parameter α

### Explainability Modules
- **Grad-CAM** (`explainability/gradcam.py`): Hooks into ResNet `layer4`
- **Feature Importance** (`explainability/feature_importance.py`): Dual scoring
- **NLG** (`explainability/nlg_explainer.py`): Template-based with confidence qualifiers

### Counterfactual Module (`counterfactuals/counterfactual.py`)
- 4 scenario types: removal, distance, substitution, minimal change
- Automatic scenario generation based on detected objects
- Human-readable counterfactual explanations

### Trust Score Engine (`trust/trust_score.py`)
- Mathematical formulation with Mahalanobis distance
- Reference distribution for similarity computation
- Quick mode (heuristic) and full mode (perturbation-based)

---

## 🔮 Future Improvements for Publication

1. **Real Dataset Evaluation**: Use BDD100K or KITTI driving datasets
2. **Temporal Consistency**: Extend to video sequences with decision tracking
3. **Real User Study**: Replace simulated data with actual participant responses
4. **Advanced Trust Model**: Add Bayesian uncertainty estimation component
5. **Ensemble Explanations**: Compare Grad-CAM with LIME, RISE, Score-CAM
6. **Real-Time Performance**: Optimize for real-time inference on edge devices
7. **Multi-Sensor Fusion**: Integrate LiDAR and radar data channels
8. **Adversarial Robustness**: Evaluate trust score under adversarial inputs
9. **Calibrated Confidence**: Replace raw softmax with temperature scaling
10. **Human-in-the-Loop**: Add interactive explanation refinement

---

## 📚 References

- Selvaraju, R.R., et al. "Grad-CAM: Visual Explanations from Deep Networks." ICCV 2017.
- Lundberg, S.M., Lee, S.I. "A Unified Approach to Interpreting Model Predictions." NeurIPS 2017.
- Wachter, S., et al. "Counterfactual Explanations without Opening the Black Box." JMLR 2017.
- Pearl, J. "Causality: Models, Reasoning and Inference." Cambridge University Press, 2009.
- Miller, T. "Explanation in Artificial Intelligence: Insights from the Social Sciences." AI 2019.
- Hoffman, R.R., et al. "Metrics for Explainable AI." arXiv 2018.

---

## 📄 License

This project is developed for academic research purposes.

## 👥 Authors

XAI Research Team — Semester 6, 2026
