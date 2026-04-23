'use client';

import PublicationLayout, {
  MetricCard, SectionHeading, SubHeading, Prose, PullQuote,
  DataTable, DiagramBox, Arrow, SectionDivider,
} from './PublicationLayout';

const ACCENT = '#1D9E75';

function DualPipelineArchitecture() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        Fig 3 — Overall Dual Big-Data Pipeline Architecture
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Part 1: Epidemiological */}
        <div className="space-y-1">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            Part 1 — Epidemiological Pipeline
          </p>
          <DiagramBox label="CDC Case Surveillance (Tabular)" sublabel="3M+ patient records" accent={ACCENT} highlight />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Pre-Process & Encode" sublabel="Standardize · Balance classes" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <div className="grid grid-cols-2 gap-2">
            <DiagramBox label="Bloom Filter" sublabel="O(1) high-risk pre-screen" accent={ACCENT} />
            <DiagramBox label="XGBoost Classifier" sublabel="Grid Search CV · F1=0.76" accent={ACCENT} highlight />
          </div>
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Kafka–Spark Stream" sublabel="Apache Kafka 3.9 · Spark UDFs" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <div className="grid grid-cols-2 gap-2">
            <DiagramBox label="Low Risk" sublabel="No prioritization" accent="#888" />
            <DiagramBox label="High Risk" sublabel="Requires triage" accent="#FF4655" highlight />
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <DiagramBox label="CTGAN Synthetic Data" sublabel="300/500/1000 epoch stress test" accent={ACCENT} />
          </div>
        </div>

        {/* Part 2: Imaging */}
        <div className="space-y-1">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            Part 2 — Imaging & Reasoning Pipeline
          </p>
          <div className="grid grid-cols-2 gap-2">
            <DiagramBox label="TCIA COVID-19 Archive" sublabel="DICOM → PNG" accent={ACCENT} />
            <DiagramBox label="Kaggle Radiography DB" sublabel="3,867 COVID · 10,192 Normal" accent={ACCENT} />
          </div>
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Preprocessing & Augmentation" sublabel="Resize · Normalize · Flip · Rotation" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="EfficientNet-B0" sublabel="Fine-tuned · Binary classifier" accent={ACCENT} highlight />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Grad-CAM Visualization" sublabel="Penultimate conv layer heatmaps" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="GPT-Based Agentic Reasoning" sublabel="GPT-3.5-turbo · T=0.2 · 300 tokens" accent={ACCENT} highlight />
          <Arrow vertical accent={ACCENT} />
          <div className="grid grid-cols-3 gap-2">
            <DiagramBox label="ALERT" sublabel="Immediate referral" accent="#FF4655" highlight />
            <DiagramBox label="FLAG" sublabel="Manual review" accent="#D4A843" />
            <DiagramBox label="LOG" sublabel="Normal — archive" accent={ACCENT} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabularPipelineFlowchart() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        Fig 4 — Tabular Hospitalization Risk Prediction Pipeline
      </p>
      <div className="flex flex-col items-center space-y-1 max-w-md mx-auto">
        <DiagramBox label="CDC Surveillance (Tabular)" accent={ACCENT} highlight size="lg" />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Pre-Process & Encode" sublabel="Missing values · categorical encoding" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <div className="grid grid-cols-3 gap-3 w-full">
          <DiagramBox label="Synthetic Data Gen" sublabel="Random · Weighted · CTGAN" accent={ACCENT} size="sm" />
          <DiagramBox label="Model Selection & Grid Search" sublabel="XGBoost / RF / LR" accent={ACCENT} size="sm" />
          <DiagramBox label="Train Bloom Filter" sublabel="High-risk profiles" accent={ACCENT} size="sm" />
        </div>
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Kafka Integration & Spark Stream" sublabel="Real-time patient record intake" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <div
          className="px-6 py-3 rounded-xl border text-center rotate-45 mx-auto"
          style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}0A`, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span className="-rotate-45 text-[9px]" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}CC` }}>Bloom?</span>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center space-y-1">
            <p className="text-[8px] text-white/25 tracking-widest uppercase" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>Yes</p>
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="Trained ML Model" sublabel="XGBoost F1=0.76" accent={ACCENT} highlight />
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="High Risk" sublabel="Requires prioritization" accent="#FF4655" highlight />
          </div>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-[8px] text-white/25 tracking-widest uppercase" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>No</p>
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="Low Risk" sublabel="No prioritization needed" accent="#555" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PandemicHospitalization() {
  return (
    <PublicationLayout
      title="A Big Data Pipeline Approach for Predicting Real-Time Pandemic Hospitalization Risk"
      authors="Vishnu S. Pendyala, Mayank Kapadia, Basanth Periyapatnaroopakumar, Manav Anandani, Nischitha Nagendran"
      venue="Department of Applied Data Science, College of Information, Data, and Society, San Jose State University"
      venueShort="MDPI · Algorithms 2025"
      year={2025}
      tag="Peer-Reviewed"
      accent={ACCENT}
      pdfUrl="/docs/pandemic-hospitalization-risk.pdf"
      externalUrl="https://www.mdpi.com/1999-4893/18/12/730"
      doi="10.3390/a18120730"
    >
      {/* Abstract */}
      <SectionHeading accent={ACCENT}>Abstract</SectionHeading>
      <Prose>
        Pandemics emphasize the importance of real-time, interpretable clinical decision-support systems for identifying high-risk patients and assisting with prompt triage, particularly in data-intensive healthcare systems. This paper describes a novel dual big-data pipeline that includes (i) a streaming module for real-time epidemiological hospitalization risk prediction and (ii) a supplementary imaging-based detection and reasoning module for chest X-rays, with COVID-19 as an example.
      </Prose>
      <Prose>
        The first pipeline uses state-of-the-art machine learning algorithms to estimate patient-level hospitalization risk based on data from the Centers for Disease Control and Prevention's (CDC) COVID-19 Case Surveillance dataset. A Bloom filter accelerated triage by constant-time pre-screening of high-risk profiles. XGBoost was selected after significant experimentation and optimization, achieving the best minority-class F1-score (0.76) and recall (0.80), outperforming baseline models.
      </Prose>
      <Prose>
        The second pipeline focuses on diagnostic imaging: a convolutional neural network (EfficientNet-B0) classifies chest X-rays, with Grad-CAM providing visual explanations. A lightweight GPT-based reasoning layer converts model predictions into auditable triage comments (ALERT/FLAG/LOG). CTGAN generates synthetic tabular data for streaming stress-tests.
      </Prose>

      <PullQuote accent={ACCENT}>
        A scalable, explainable, and near-real-time framework providing a foundation for future multimodal and genomic advancements in public health readiness.
      </PullQuote>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        <MetricCard label="XGBoost Minority F1" value="0.76" accent={ACCENT} />
        <MetricCard label="Hospitalization Recall" value="0.80" accent={ACCENT} />
        <MetricCard label="Chest X-Ray Accuracy" value="99.5%" accent={ACCENT} />
        <MetricCard label="External Test Accuracy" value="99.3%" accent={ACCENT} />
        <MetricCard label="CDC Records Processed" value="3M+" accent={ACCENT} />
        <MetricCard label="Bloom Filter Latency Gain" value="3–6%" accent={ACCENT} />
      </div>

      <SectionDivider accent={ACCENT} />

      {/* Architecture */}
      <SectionHeading accent={ACCENT}>System Architecture</SectionHeading>
      <Prose>
        The proposed method integrates two complementary real-time operations into a single pandemic-triage architecture. The epidemiological pipeline uses machine learning models and Bloom filter pre-screening to enable large-scale screening and prioritizing by swiftly estimating hospitalization risk from tabular case-surveillance data. The imaging-based pipeline uses chest X-rays to validate diagnoses, with a GPT-based reasoning layer that creates auditable triage summaries (ALERT, FLAG, and LOG) using Grad-CAM for visual explanation.
      </Prose>

      <DualPipelineArchitecture />

      <SectionDivider accent={ACCENT} />

      {/* Part 1: Epidemiological */}
      <SectionHeading accent={ACCENT}>Part 1 — Epidemiological Risk Prediction</SectionHeading>

      <SubHeading>Dataset: CDC COVID-19 Case Surveillance</SubHeading>
      <Prose>
        The tabular component uses the CDC COVID-19 Case Surveillance Public Use dataset, retrieved directly through the CDC Socrata API in batches of 10,000 rows per request, up to 4,000,000 records. Demographic attributes (sex, age_group, race_ethnicity_combined), clinical attributes (hosp_yn, icu_yn, death_yn, medcond_yn), and case metadata (cdc_case_earliest_dt, current_status) were selected for analysis.
      </Prose>
      <Prose>
        The dataset exhibited a significant class imbalance — hospitalized cases were substantially outnumbered by non-hospitalized ones. Random undersampling of the majority class produced a 1:1 ratio, yielding a final balanced dataset used for all model training and evaluation.
      </Prose>

      <SubHeading>XGBoost Classifier with Grid Search</SubHeading>
      <Prose>
        Three machine-learning models were tested: Extreme Gradient Boosting (XGBoost), Random Forest, and Logistic Regression. XGBoost was chosen as the main classifier for further optimization due to its ability to handle heterogeneous feature types, capture nonlinear interactions, and successfully control class imbalance. GridSearchCV with threefold cross-validation optimized hyperparameters including n_estimators, max_depth, learning_rate, subsample, and colsample_bytree.
      </Prose>
      <Prose>
        The optimal configuration was max_depth=3 and learning_rate=0.05, producing a cross-validated F1-score of 0.759. The top 10 features by importance were dominated by age_group_80_years, age_group_70_79_years, and medcond_yn_No — confirming that age and comorbidity status are the strongest predictors of hospitalization risk.
      </Prose>

      <DataTable
        caption="Table 2 — Model performance comparison across classifiers"
        headers={['Model', 'Accuracy', 'F1 (No)', 'F1 (Yes)', 'Mean F1']}
        rows={[
          ['Logistic Regression', '0.75', '0.75', '0.75', '0.75'],
          ['Random Forest', '0.75', '0.76', '0.74', '0.75'],
          ['XGBoost', '0.75', '0.75', '0.76', '0.75'],
          ['LightGBM', '0.75', '0.76', '0.75', '0.75'],
          ['CatBoost', '0.75', '0.75', '0.74', '0.75'],
        ]}
        accent={ACCENT}
      />

      <SubHeading>Bloom Filter Pre-Screening</SubHeading>
      <Prose>
        A Bloom filter was trained on high-risk rows from the dataset, using prior knowledge of hospitalization characteristics. Bloom filters support O(1) membership searches with predictable false-positive rates, making them ideal for quick triage in high-throughput environments. During inference, each incoming record was initially checked against the filter — if flagged as possibly high-risk, it was forwarded to XGBoost for thorough evaluation, otherwise routed as low-risk. This reduced end-to-end latency by 3–6% across test cycles of 100,000 records per iteration.
      </Prose>

      <TabularPipelineFlowchart />

      <SubHeading>Kafka–Spark Streaming Integration</SubHeading>
      <Prose>
        The creation of an end-to-end near-real-time pipeline was made possible by the integration of Apache Spark and Apache Kafka version 3.9.0 (Scala 2.12 build). Kafka served as the message broker for continuous intake of both real and generated data streams. Spark Streaming deployed user-defined functions (UDFs) that successively called the XGBoost classifier and the trained Bloom filter. Results were saved for further examination after being formatted into structured JSON data.
      </Prose>

      <SectionDivider accent={ACCENT} />

      {/* Part 2: Imaging */}
      <SectionHeading accent={ACCENT}>Part 2 — Chest X-Ray Classification</SectionHeading>

      <SubHeading>Dataset Composition</SubHeading>
      <DataTable
        caption="Table 1 — Chest X-ray dataset composition before and after augmentation"
        headers={['Category', 'After Merge (TCIA + Kaggle)', 'After Augmentation (Train)', 'External Test Set']}
        rows={[
          ['Normal Images', '10,192', '3,000', '317'],
          ['COVID Images', '3,867', '3,000', '116'],
          ['Total', '14,059', '6,000', '433'],
        ]}
        accent={ACCENT}
      />

      <SubHeading>EfficientNet-B0 Fine-Tuning</SubHeading>
      <Prose>
        The pre-trained EfficientNet-B0 model (trained originally on ImageNet) was adapted for binary classification by replacing its final fully connected layer with a new binary classification head (COVID-19 vs. Normal). The model was fine-tuned on the balanced dataset of 3,000 normal and 3,000 COVID-positive images, with input images resized to 224×224 and normalized. Data augmentation included random horizontal flip, rotation, brightness/contrast jitter, and affine transforms.
      </Prose>
      <Prose>
        EfficientNet-B0 was selected after comparing several architectures (custom baseline CNN, MobileNetV2, ResNet-18) — it had the most consistent and stable performance across different training runs, doing best in COVID-19 sensitivity and overall F1-score. Internal accuracy reached 99.5% and external test accuracy reached 99.3%.
      </Prose>

      <SubHeading>Grad-CAM Visual Explanation</SubHeading>
      <Prose>
        Gradient-weighted Class Activation Mapping (Grad-CAM) was applied to the trained EfficientNet-B0 model to highlight the most significant areas in each input image responsible for the model prediction. The Grad-CAM process finds the last convolutional layer and weights the feature maps using gradients of the predicted class, producing a heatmap overlaid on the original chest X-ray. Red/yellow areas indicate high model attention; blue indicates lower attention.
      </Prose>
      <Prose>
        The model tends to focus on the lower or peripheral regions of the lung in cases of COVID-positive predictions, consistent with documented radiographic patterns for COVID-19 pneumonia (bilateral lower-lobe consolidation).
      </Prose>

      <SubHeading>GPT-Based Agentic Reasoning</SubHeading>
      <Prose>
        A GPT-based agentic reasoning module was integrated to simulate independent, clinically significant triage decision-making. The module accepts structured input from the EfficientNet-B0 prediction, confidence score, and Grad-CAM interpretation, and produces a clinical-style decision and rationale. GPT-3.5-turbo was used via the OpenAI API with temperature=0.2 and max_tokens=300. Parsing the model's textual answer yielded three standardized triage outcomes — ALERT, FLAG, or LOG — along with their justifications.
      </Prose>

      <div className="my-8 p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A10]/40">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
          Sample GPT-generated decision — LOG response
        </p>
        <pre className="text-sm text-white/40 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px' }}>
{`Decision:   LOG
Reasoning:  Model predicted Normal with very high confidence (99.99%), and
            the Grad-CAM heatmap is in agreement with the expected normal
            lung appearance. There is no abnormal activation sign, and the
            output aligns with the ground truth. Logging the case is
            appropriate in this scenario.`}
        </pre>
      </div>

      <div className="my-8 p-6 rounded-2xl border border-[#FF4655]/20 bg-[#FF4655]/05">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#FF465580' }}>
          Sample GPT-generated decision — ALERT response
        </p>
        <pre className="text-sm text-white/40 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px' }}>
{`Decision:   ALERT
Reasoning:  The model is calling COVID-19 with 100% certainty, and the
            Grad-CAM heatmap is showing very dense bilateral activation
            in the lower lung fields — a classic appearance of COVID-19
            pneumonia. The ground truth is COVID-19. This case should be
            referred to a physician for immediate follow-up.`}
        </pre>
      </div>

      <SectionDivider accent={ACCENT} />

      {/* Results */}
      <SectionHeading accent={ACCENT}>Results & Discussion</SectionHeading>

      <SubHeading>Tabular Model Performance</SubHeading>
      <Prose>
        Although overall accuracies were equivalent across models (~0.75), XGBoost was preferred because it achieved the greatest recall and F1-score for hospitalized cases, decreasing false negatives in this clinically critical area. Its ROC curve outperforms the others across most false-positive rates, demonstrating a stronger capacity for discrimination.
      </Prose>

      <SubHeading>Chest X-Ray Performance</SubHeading>
      <Prose>
        EfficientNet-B0 achieved 99.5% internal accuracy and 99.3% external accuracy on the held-out test set of 433 images. The model correctly classified all true positives and true negatives in the external test set, with no false positive predictions. Grad-CAM activations showed 87% overlap with ground truth lung regions in TP cases.
      </Prose>

      <SubHeading>Synthetic Data (CTGAN) Fidelity</SubHeading>
      <Prose>
        The CTGAN-generated synthetic data was evaluated at 300, 500, and 1000 epochs. CTGAN produced the most realistic samples by maintaining both class proportions and inter-feature relationships, outperforming random and weighted distribution sampling strategies. This confirmed its suitability for streaming pipeline stress-testing.
      </Prose>

      <SectionDivider accent={ACCENT} />

      {/* Conclusion */}
      <SectionHeading accent={ACCENT}>Conclusion</SectionHeading>
      <Prose>
        This paper presents a scalable, dual big-data pipeline for real-time pandemic triage that addresses the discrepancy between the quick increase in patient danger and the clinical decision-making systems' later reactions. By combining XGBoost epidemiological risk modeling, Bloom filter pre-screening, EfficientNet-B0 chest X-ray classification, Grad-CAM explainability, and GPT-based auditable reasoning within a Kafka-Spark streaming infrastructure, the system provides dependable and auditable triage support.
      </Prose>
      <Prose>
        The framework provides a foundation for future multimodal and genomic advancements in public health readiness. Future work will address multi-modal fusion of tabular and imaging streams, integration with electronic health records (EHR), and expansion to other respiratory conditions beyond COVID-19.
      </Prose>

      <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A10]/40">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
          Keywords
        </p>
        <div className="flex flex-wrap gap-2">
          {['hospitalization risk prediction', 'real-time streaming analytics', 'chest X-ray classification', 'explainable AI (XAI)', 'bloom filter', 'CTGAN', 'Kafka–Spark streaming', 'clinical decision support'].map(kw => (
            <span key={kw} className="text-[9px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.06] text-white/25" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              {kw}
            </span>
          ))}
        </div>
      </div>
    </PublicationLayout>
  );
}
