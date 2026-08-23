# PINN for 2D Incompressible Navier–Stokes

This repository implements a **Physics-Informed Neural Network (PINN)** to solve the **2D incompressible Navier–Stokes equations** using the **Taylor–Green vortex** as the benchmark problem.

---

## ✨ Features
- Uses **Fourier feature embeddings** to enhance the neural network’s ability to represent oscillatory solutions.
- Solves the **Navier–Stokes PDE residuals** (momentum + continuity) inside the domain.
- Enforces **initial condition** consistency with the analytic Taylor–Green vortex solution.
- Includes **adaptive resampling** of collocation points for better training.
- Supports **early stopping** for efficient convergence.
- Computes and visualizes:
  - Velocity fields (`u`, `v`)
  - Pressure field (`p`)
  - Vorticity field (`ω`)

---

## 📘 Governing Equations
We solve the **2D incompressible Navier–Stokes equations**:

\[
\begin{aligned}
u_t + u u_x + v u_y &= -p_x + \nu (u_{xx} + u_{yy}), \\
v_t + u v_x + v u_y &= -p_y + \nu (v_{xx} + v_{yy}), \\
u_x + v_y &= 0,
\end{aligned}
\]

where:
- \( u, v \) are velocity components,
- \( p \) is pressure,
- \( \nu = \frac{1}{Re} \) is kinematic viscosity.

---

## 📘 Taylor–Green Vortex (Analytic Solution)
The Taylor–Green vortex is a classical analytic solution:

\[
\begin{aligned}
u(x,y,t) &= -\cos(x) \sin(y) \, e^{-2\nu t}, \\
v(x,y,t) &= \;\; \sin(x) \cos(y) \, e^{-2\nu t}, \\
p(x,y,t) &= -\tfrac{1}{4}\left( \cos(2x) + \cos(2y) \right) e^{-4\nu t}.
\end{aligned}
\]

It provides a perfect benchmark for verifying the PINN.

---

## 📂 Project Structure
.
├── pinn_navier_stokes.py # Main training + evaluation script
├── README.md # Project documentation

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/pinn-navier-stokes.git
cd pinn-navier-stokes
```

### 2️⃣ Install dependencies

Make sure you have Python 3.8+ and install required packages:
```bash
pip install torch numpy matplotlib
```

### 3️⃣ Run training
```bash
python pinn_navier_stokes.py
```

---

## 📊 Results

At the end of training, the model evaluates the velocity field at **t = 0.1** and visualizes the predicted **u velocity field**:

- Contour plots of **u(x,y,t)**.
- Vorticity field computation for further analysis.

---

## ⚙️ Key Hyperparameters

- Layers: 8  
- Hidden dimension: 128  
- Fourier features: 50  
- Reynolds number (Re): 100  
- Collocation points (interior): 5000  
- Initial condition points: 1000  
- Optimizer: Adam (lr = 1e-3)  
- Early stopping patience: 500 epochs  

---

## 📌 Notes

- Training may be slow on CPU; GPU (`cuda`) is recommended.  
- The evaluation grid is set in the script (`test_points = 50`).  
- The `resample_points()` function adaptively focuses on high-residual regions.  

---

## 🙌 Acknowledgements

- Raissi, Perdikaris & Karniadakis (2019): *Physics-Informed Neural Networks (PINNs)*.  
- Taylor & Green (1937): *Mechanism of the production of small eddies from large ones*.  

