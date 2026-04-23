'use client';

import PublicationLayout, {
  MetricCard, SectionHeading, SubHeading, Prose, PullQuote,
  DataTable, DiagramBox, Arrow, SectionDivider,
} from './PublicationLayout';

const ACCENT = '#FF4655';

function FireSenseArchitecture() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        FireSense Model Architecture — ResNet34-UNet + CBAM
      </p>

      {/* Input */}
      <div className="flex flex-col items-center space-y-1">
        <DiagramBox label="Landsat-8 Satellite Imagery" sublabel="10 spectral bands · 256×256 px · 30m resolution" accent={ACCENT} highlight size="lg" />
        <Arrow vertical accent={ACCENT} />

        {/* Encoder */}
        <div className="w-full p-4 rounded-2xl border border-white/[0.06] bg-[#FF465506]">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            ResNet34 Encoder (ImageNet pretrained)
          </p>
          <div className="grid grid-cols-4 gap-2">
            <DiagramBox label="Stage 1" sublabel="64 ch" accent={ACCENT} size="sm" />
            <DiagramBox label="Stage 2" sublabel="128 ch" accent={ACCENT} size="sm" />
            <DiagramBox label="Stage 3" sublabel="256 ch" accent={ACCENT} size="sm" />
            <DiagramBox label="Stage 4" sublabel="512 ch" accent={ACCENT} size="sm" highlight />
          </div>
          <p className="text-[8px] text-center mt-2 text-white/20" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            First conv layer modified to accept 10-channel input · Skip connections to decoder
          </p>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* CBAM */}
        <div className="w-full p-4 rounded-2xl border" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}>
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}90` }}>
            CBAM — Convolutional Block Attention Module
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-[8px] text-center text-white/30 mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>Channel Attention</p>
              <DiagramBox label="AvgPool + MaxPool" accent={ACCENT} size="sm" />
              <Arrow vertical accent={ACCENT} />
              <DiagramBox label="MLP Shared Weights" accent={ACCENT} size="sm" />
              <Arrow vertical accent={ACCENT} />
              <DiagramBox label="Sigmoid → Mc(F)" sublabel="SWIR1/SWIR2/TIR1 highest weights" accent={ACCENT} size="sm" highlight />
            </div>
            <div className="space-y-1">
              <p className="text-[8px] text-center text-white/30 mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>Spatial Attention</p>
              <DiagramBox label="AvgPool + MaxPool" accent={ACCENT} size="sm" />
              <Arrow vertical accent={ACCENT} />
              <DiagramBox label="7×7 Convolution" accent={ACCENT} size="sm" />
              <Arrow vertical accent={ACCENT} />
              <DiagramBox label="Sigmoid → Ms(F)" sublabel="Spatial fire region weights" accent={ACCENT} size="sm" highlight />
            </div>
          </div>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* Decoder */}
        <div className="w-full p-4 rounded-2xl border border-white/[0.06] bg-[#FF465506]">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            U-Net Decoder (Transposed Convolutions + Skip Connections)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {['Block 4', 'Block 3', 'Block 2', 'Block 1'].map(b => (
              <DiagramBox key={b} label={b} sublabel="3×3 Conv · BN · ReLU · CBAM" accent={ACCENT} size="sm" />
            ))}
          </div>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* Soft labels + loss */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="space-y-1">
            <DiagramBox label="Soft Label Generation" sublabel="Multi-annotator consensus · ŷ_soft = ⅓∑(Schroeder+Murphy+Kumar-Roy)" accent={ACCENT} />
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="GCE Loss + Dice Loss" sublabel="λ=0.5 · q=0.7 noise tolerance" accent={ACCENT} />
          </div>
          <div className="space-y-1">
            <DiagramBox label="Temperature Scaling" sublabel="p_cal = σ(z/T) · T*=1.287" accent={ACCENT} highlight />
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="Calibrated Predictions" sublabel="ECE: 0.142→0.020 (−86.1%)" accent={ACCENT} highlight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FireSensePaper() {
  return (
    <PublicationLayout
      title="FireSense: Multispectral Fire Detection with Channel Attention and Probabilistic Calibration"
      authors="Basanth Periyapatna Roopa Kumar, Nischitha Nagendran, Nandhakumar Apparsamy, Nitya Rondla"
      venue="Department of Applied Data Science · San Jose State University · DATA 255: Deep Learning"
      venueShort="SJSU · DATA 255"
      year={2025}
      tag="Deep Learning"
      accent={ACCENT}
      pdfUrl="/docs/firesense-fire-detection.pdf"
    >
      <SectionHeading accent={ACCENT}>Abstract</SectionHeading>
      <Prose>
        We present a deep learning framework for automated wildfire detection in Landsat-8 satellite imagery that addresses three fundamental challenges: extreme class imbalance, annotation uncertainty, and prediction reliability. Our approach combines a ResNet34-UNet architecture with Convolutional Block Attention Modules (CBAM) to leverage all ten spectral bands of Landsat-8, enabling the model to learn optimal band importance for fire detection.
      </Prose>
      <Prose>
        We introduce soft labels derived from multi-annotator consensus to capture uncertainty in fire boundaries, and apply temperature scaling for calibrated probability estimates. Evaluated on the ActiveFire dataset spanning North and South America (14,815 patches), our method achieves a mean Intersection over Union (IoU) of 69.6%, representing a 24.9% improvement over baseline approaches and 45.6% improvement over classical fire detection algorithms.
      </Prose>

      <PullQuote accent={ACCENT}>
        The attention mechanism correctly prioritizes Short-Wave Infrared (SWIR) and Thermal Infrared (TIR) bands, validating the physical intuition that thermal signatures are critical for fire detection.
      </PullQuote>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        <MetricCard label="Mean IoU" value="69.6%" accent={ACCENT} />
        <MetricCard label="Dice Score" value="0.828" accent={ACCENT} />
        <MetricCard label="Precision" value="0.834" accent={ACCENT} />
        <MetricCard label="Recall" value="0.867" accent={ACCENT} />
        <MetricCard label="vs. Classical Baselines" value="+45.6%" accent={ACCENT} />
        <MetricCard label="ECE Reduction" value="86.1%" accent={ACCENT} />
      </div>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Model Architecture</SectionHeading>
      <FireSenseArchitecture />

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Dataset — ActiveFire</SectionHeading>
      <Prose>
        Experiments utilize the ActiveFire dataset, comprising Landsat-8 imagery patches from wildfire events across North and South America during the 2020 fire season. Each patch is a 256×256 pixel crop at 30-meter spatial resolution, providing approximately 7.68 km × 7.68 km ground coverage. Geographic coverage spans two continents with distinct fire regimes: North America (45%) — California wildfires, Pacific Northwest forest fires, Canadian boreal fires — and South America (55%) — Amazon deforestation fires and Brazilian cerrado burns.
      </Prose>
      <Prose>
        The dataset includes fire masks from three classical detection algorithms: Schroeder et al. (threshold-based MODIS), Murphy et al. (contextual local statistics), and Kumar-Roy et al. (multi-temporal change detection). These often disagree on fire boundaries, motivating the soft label approach.
      </Prose>

      <DataTable
        caption="Landsat-8 Spectral Bands Used in This Study"
        headers={['Band', 'Name', 'Wavelength (μm)', 'Fire Relevance', 'CBAM Attention Weight']}
        rows={[
          ['6', 'SWIR1', '1.61', 'Very High', '0.18'],
          ['7', 'SWIR2', '2.19', 'Very High', '0.15'],
          ['9', 'TIR1', '10.9', 'Very High', '0.12'],
          ['10', 'TIR2', '12.0', 'High', '~0.10'],
          ['5', 'NIR', '0.87', 'High', '0.15'],
          ['4', 'Red', '0.66', 'Medium', 'Low'],
          ['1', 'Coastal', '0.44', 'Low', 'Very Low'],
          ['2', 'Blue', '0.49', 'Low', 'Very Low'],
          ['3', 'Green', '0.56', 'Low', 'Very Low'],
          ['8', 'Cirrus', '1.38', 'Low', 'Very Low'],
        ]}
        accent={ACCENT}
      />

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Methodology</SectionHeading>

      <SubHeading>Soft Label Generation</SubHeading>
      <Prose>
        Rather than using binary masks from a single annotator, soft labels encode multi-annotator consensus: ŷ_soft(i,j) = ⅓ ∑ y_a(i,j) for annotators a ∈ &#123;Schroeder, Murphy, Kumar-Roy&#125;. This yields soft labels in &#123;0, 0.33, 0.66, 1.0&#125;, capturing uncertainty at fire boundaries where annotators disagree. The approach reduces overfitting to noisy annotations and produces smoother decision boundaries that generalize better to unseen data.
      </Prose>

      <DataTable
        caption="Effect of Soft Labels on Model Performance"
        headers={['Training', 'IoU', 'Dice', 'Precision', 'Recall']}
        rows={[
          ['Hard Labels', '0.592', '0.744', '0.781', '0.823'],
          ['Soft Labels', '0.680', '0.810', '0.834', '0.867'],
          ['Improvement', '+14.8%', '+8.9%', '+6.8%', '+5.3%'],
        ]}
        accent={ACCENT}
      />

      <SubHeading>Loss Function</SubHeading>
      <Prose>
        A combination of Generalized Cross-Entropy (GCE) loss for robustness to label noise and Dice loss for handling class imbalance: ℒ = ℒ_GCE + λℒ_Dice, where λ=0.5. GCE is defined as: ℒ_GCE(p,y) = (1 − p_y^q) / q with q=0.7 controlling noise tolerance. All models were trained using the AdamW optimizer (lr 5×10⁻⁴, weight decay 10⁻⁴) with cosine annealing over 100 epochs.
      </Prose>

      <SubHeading>Temperature Scaling</SubHeading>
      <Prose>
        To calibrate prediction probabilities, temperature scaling p_calibrated = σ(z/T) was applied as a post-hoc step where T is optimized on the validation set. The optimal T* = 1.287 &gt; 1 indicates the uncalibrated model is overconfident — a common finding in deep neural networks. Temperature scaling reduces Expected Calibration Error (ECE) from 0.142 to 0.020 (−86.1%) and Brier Score from 0.089 to 0.061 (−31.2%).
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Results</SectionHeading>

      <DataTable
        caption="Table V — Ablation Study: Contribution of Each Component"
        headers={['Configuration', 'IoU', 'Dice', 'Cumulative Gain']}
        rows={[
          ['Baseline U-Net (RGB)', '0.584', '0.737', '—'],
          ['+ ResNet34 Encoder', '0.621', '0.766', '+6.3%'],
          ['+ 10-Band Input', '0.658', '0.794', '+12.7%'],
          ['+ Soft Labels', '0.680', '0.810', '+16.4%'],
          ['+ CBAM Attention', '0.706', '0.828', '+20.9%'],
          ['+ Temperature Scaling', '0.696', '0.828', '+19.2%'],
        ]}
        accent={ACCENT}
      />

      <DataTable
        caption="Table VII — Comparison with Classical Fire Detection Algorithms"
        headers={['Method', 'IoU', 'Precision', 'Recall', 'F1']}
        rows={[
          ['Schroeder', '0.412', '0.523', '0.687', '0.594'],
          ['Murphy', '0.445', '0.556', '0.712', '0.624'],
          ['Kumar-Roy', '0.478', '0.589', '0.734', '0.654'],
          ['FireSense (Ours)', '0.696', '0.834', '0.867', '0.850'],
          ['Improvement', '+45.6%', '+41.6%', '+18.1%', '+30.0%'],
        ]}
        accent={ACCENT}
      />

      <SubHeading>Confounder Robustness</SubHeading>
      <Prose>
        The attention mechanism effectively suppresses common confounders by focusing on thermal bands that distinguish true fires from false positives. Evaluated on challenging subsets: Cloud Cover (FP reduction −42%), Industrial Heat (−55%), Sun Glint (−48%), Bare Soil (−40%). Average false-positive reduction: −46%.
      </Prose>

      <SubHeading>Regional Performance on Real Satellite Imagery</SubHeading>
      <Prose>
        The model generalizes well across both North American (crown fires) and South American (surface fires) fire regimes. Average improvement over baseline: +24.9% IoU. Sample 1 (North America): +27.0%, Sample 3 (South America): +21.5%. The model correctly delineates fire boundaries with high IoU (74.8%) despite complex terrain and smoke obscuration.
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Conclusion</SectionHeading>
      <Prose>
        FireSense demonstrates that combining multi-spectral input, attention mechanisms, soft labels, and calibration yields substantial improvements over both classical algorithms and baseline deep learning approaches. The learned CBAM attention weights align with physical intuition about fire detection — SWIR bands (1.6–2.2 μm) capture reflected radiation from active flames, while TIR bands (10.9–12.0 μm) detect thermal emission. The model discovers this importance hierarchy without explicit supervision, validating the attention mechanism's utility.
      </Prose>
      <Prose>
        Future work will explore multi-temporal analysis to leverage fire spread dynamics, active learning to reduce annotation requirements, and transfer to other satellite sensors (Sentinel-2, MODIS) for global coverage.
      </Prose>

      <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A10]/40">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {['PyTorch', 'ResNet34', 'UNet', 'CBAM', 'Landsat-8', 'ActiveFire Dataset', 'AdamW', 'GCE Loss', 'Dice Loss', 'Temperature Scaling', 'Grad-CAM', 'Apple M4 (MPS)'].map(t => (
            <span key={t} className="text-[9px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.06] text-white/25" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </PublicationLayout>
  );
}
