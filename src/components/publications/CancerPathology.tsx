'use client';

import PublicationLayout, {
  MetricCard, SectionHeading, SubHeading, Prose, PullQuote,
  DataTable, DiagramBox, Arrow, SectionDivider,
} from './PublicationLayout';

const ACCENT = '#00D4FF';

function MultimodalPipeline() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        System Architecture — Multimodal Generative AI Framework
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image branch */}
        <div className="space-y-1">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            Branch 1 — Histopathology Images
          </p>
          <DiagramBox label="PatchCamelyon (PCam)" sublabel="262,144 train · 32,768 val · 32,768 test" accent={ACCENT} highlight />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Tensor Conversion & Normalization" sublabel="Standard preprocessing — no augmentation" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <div className="space-y-1">
            <DiagramBox label="EfficientNet-B0" sublabel="Acc 0.8760 · ROC-AUC 0.9508" accent={ACCENT} />
            <DiagramBox label="ResNet-50" sublabel="Acc 0.8871 · ROC-AUC 0.9500" accent={ACCENT} />
            <DiagramBox label="ViT-Base/16" sublabel="Acc 0.8898 · ROC-AUC 0.9601" accent={ACCENT} highlight />
          </div>
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="BLIP-2 (FLAN-T5-XL) Captioning" sublabel="Caption quality via CLIP similarity" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Caption → Label Classifier (FLAN-T5)" sublabel="Caption signal analysis" accent={ACCENT} />
        </div>

        {/* Text branch */}
        <div className="space-y-1">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            Branch 2 — Clinical Notes (TCGA BRCA)
          </p>
          <DiagramBox label="TCGA Pathology Reports (~48K)" sublabel="Filter: BRCA cohort → 1,105 reports" accent={ACCENT} highlight />
          <Arrow vertical accent={ACCENT} />
          <div className="grid grid-cols-2 gap-2">
            <DiagramBox label="PyTesseract OCR" sublabel="Keyword + Negation Rules" accent={ACCENT} size="sm" />
            <DiagramBox label="TCGA Metadata" sublabel="Morphological codes" accent={ACCENT} size="sm" />
          </div>
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Class Imbalance (1,190 M vs 89 B)" sublabel="Upsample benign → 1:1 ratio" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="Final Balanced Dataset" sublabel="2,380 reports · Train 1,428 / Val 476 / Test 476" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="ClinicalBERT Classifier" sublabel="Pretrained on clinical notes" accent={ACCENT} />
          <Arrow vertical accent={ACCENT} />
          <DiagramBox label="SFT → TAPT → LoRA Fine-Tuning" sublabel="Best: rank r=4 · α=8 · LR 2e-3 · F1=0.94" accent={ACCENT} highlight />
        </div>
      </div>

      {/* Unified RAG */}
      <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-1 max-w-sm mx-auto">
        <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-4" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
          Unified — RAG Caption Generation
        </p>
        <DiagramBox label="GPT-4o Ground Truth Captions" sublabel="Selected via DeepSeek-as-Judge from 300 stratified notes" accent={ACCENT} highlight />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="LiquidAI RAG Pipeline" sublabel="Fine-tuned with LoRA · 4 prompting strategies" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <div className="grid grid-cols-4 gap-2">
          {['Zero-Shot', 'Self-Reflect', 'Self-Ask', 'Tree-of-Thought'].map(p => (
            <DiagramBox key={p} label={p} accent={ACCENT} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinicalBERTTrainingPipeline() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        ClinicalBERT Sequential Training Pipeline (Fig 3)
      </p>
      <div className="flex flex-col items-center space-y-1 max-w-xs mx-auto">
        <DiagramBox label="Processed Clinical Notes" sublabel="2,380 BRCA pathology reports" accent={ACCENT} highlight />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="ClinicalBERT Classifier" sublabel="Pretrained base — evaluation" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Supervised Fine-Tuning (SFT)" sublabel="Standard labeled training" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Task-Adaptive Pretraining (TAPT)" sublabel="Domain text adaptation" accent={ACCENT} />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Low-Rank Adaptation (LoRA)" sublabel="r ∈ {4,8,16} · α ∈ {8,16,32,64}" accent={ACCENT} highlight />
        <Arrow vertical accent={ACCENT} />
        <DiagramBox label="Predictions & Metrics" sublabel="Accuracy · Precision · Recall · F1 · ROC-AUC" accent={ACCENT} />
      </div>
    </div>
  );
}

export default function CancerPathology() {
  return (
    <PublicationLayout
      title="A Multimodal Generative AI Framework for Cancer Pathology Classification"
      authors="Mayank Kapadia, Basanth Periyapatna Roopa Kumar, Nischitha Nagendran"
      venue="Department of Applied Data Science · San Jose State University"
      venueShort="SJSU · ADS"
      year={2025}
      tag="Generative AI"
      accent={ACCENT}
      pdfUrl="/docs/multimodal-cancer-pathology.pdf"
    >
      <SectionHeading accent={ACCENT}>Abstract</SectionHeading>
      <Prose>
        We propose a multimodal generative AI framework for cancer pathology that combines three capabilities: (i) histopathology picture classification, (ii) clinical note classification, and (iii) prompt-driven clinical captioning using retrieval-augmented generation (RAG). The approach establishes accurate vision baselines on PatchCamelyon (PCam) and creates a complementing text pipeline by curating and categorizing TCGA BRCA clinical notes via two distinct routes to assure trustworthy supervision.
      </Prose>
      <Prose>
        We investigate caption utility by creating image-based descriptions and constructing a lightweight caption-label classifier to assess RAG's downstream worth. Together, these components establish a uniform data and model foundation, explain interfaces for combining picture and text representations, and give an evidence-based approach to short, clinically grounded summaries.
      </Prose>

      <PullQuote accent={ACCENT}>
        The main objective is to provide a practical, auditable procedure that improves diagnostic support by matching visual findings with structured language while still allowing for parameter-efficient adjustment and eventual inclusion into clinical decision tools.
      </PullQuote>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        <MetricCard label="ViT-Base/16 ROC-AUC" value="0.9601" accent={ACCENT} />
        <MetricCard label="ViT-Base/16 F1" value="0.8852" accent={ACCENT} />
        <MetricCard label="ClinicalBERT LoRA F1" value="0.94 ± 0.05" accent={ACCENT} />
        <MetricCard label="PCam Training Images" value="262,144" accent={ACCENT} />
        <MetricCard label="BRCA Clinical Notes" value="2,380" accent={ACCENT} />
        <MetricCard label="Tree-of-Thought ROUGE-L" value="0.320" accent={ACCENT} />
      </div>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>System Architecture</SectionHeading>
      <MultimodalPipeline />

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Datasets</SectionHeading>

      <SubHeading>Histopathology Images — PatchCamelyon (PCam)</SubHeading>
      <Prose>
        Experiments use the PatchCamelyon (PCam) histopathology patch dataset via the torchvision PCAM interface. Each example is a color image patch paired with a binary label (benign vs. malignant). Official splits are preserved: 262,144 training, 32,768 validation, and 32,768 testing images. No relabeling, rebalancing, or re-splitting was performed. All reported metrics are computed on the fixed splits for strict reproducibility.
      </Prose>

      <SubHeading>Clinical Notes — TCGA BRCA</SubHeading>
      <Prose>
        Clinical notes were provided via the Cancer Genome Atlas (TCGA) portal, focused on the Breast Invasive Carcinoma (BRCA) cohort. 1,105 BRCA-specific pathology reports were extracted from ~48K reports on various cancer types. Two annotation approaches were used: Approach 1 (PyTesseract OCR + keyword/negation rules) and Approach 2 (TCGA metadata morphological codes). The dataset exhibited considerable class imbalance (1,190 malignant vs. 89 benign), which was addressed by random upsampling to achieve a 1:1 ratio. The final balanced dataset of 2,380 reports was split: train 1,428 / val 476 / test 476.
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Methodology</SectionHeading>

      <SubHeading>Histopathology Classification</SubHeading>
      <Prose>
        Three modern image backbones were benchmarked on PCam using a unified classification pipeline. Each backbone was instantiated from standard libraries and adapted to binary prediction with a single linear classification head. Decision thresholds were selected on the validation set (ResNet-50 τ=0.22, ViT-B/16 τ=0.36) and then fixed for test-time reporting.
      </Prose>

      <DataTable
        caption="PCam Test Performance of Image Classifiers"
        headers={['Model', 'Threshold', 'Accuracy', 'F1', 'ROC-AUC']}
        rows={[
          ['EfficientNet-B0', '0.50', '0.8760', '0.8627', '0.9508'],
          ['ResNet-50', '0.22', '0.8871', '0.8818', '0.9500'],
          ['ViT-Base/16', '0.36', '0.8898', '0.8852', '0.9601'],
        ]}
        accent={ACCENT}
      />

      <Prose>
        ViT-Base/16 delivers the most consistent performance across all metrics; ResNet-50 is a close second; EfficientNet-B0 remains a strong lightweight baseline even without threshold tuning. These fixed numbers establish robust image baselines to be held unchanged in subsequent fusion and caption-aware experiments.
      </Prose>

      <SubHeading>Clinical Note Classification — ClinicalBERT Fine-Tuning</SubHeading>
      <Prose>
        The balanced clinical notes are used as input to a ClinicalBERT model for benign and malignant classification. We evaluate the pretrained model as a baseline, then sequentially apply Supervised Fine-Tuning (SFT) and Task-Adaptive Pretraining (TAPT) to increase domain adaptation, followed by LoRA to fine-tune parameters efficiently.
      </Prose>

      <ClinicalBERTTrainingPipeline />

      <Prose>
        The optimum LoRA configuration (rank r=4, α=8, learning rate 2e-3, 10 epochs) had the highest stable validation F1-score (0.94 ± 0.05) and was chosen for clinical note classification in the multimodal fusion experiments. The experiments were conducted in two environments: SJSU GPU Lab (RTX 5090) and Google Colab (A100 GPU).
      </Prose>

      <SubHeading>Caption Generation — LiquidAI RAG + Prompting Strategies</SubHeading>
      <Prose>
        Caption generation addresses limited caption supervision by first comparing three zero-shot LLMs (GPT-4o, GPT-3.5-turbo, Claude 3.5 Sonnet) on 300 stratified notes. A fourth model (DeepSeek) served as an objective judge and selected GPT-4o as the best performer; its captions were adopted as ground truth for the LiquidAI RAG pipeline. RAG was then trained and fine-tuned with LoRA (rank r, scale α) while tuning output token limit and input context length. Four prompting strategies were evaluated within the RAG setup under identical hyperparameters: Zero-Shot, Self-Reflection, Self-Ask, and Tree-of-Thought.
      </Prose>

      <DataTable
        caption="Table XI — Best Performance Comparison Across Prompting Techniques (LoRA-RAG)"
        headers={['Technique', 'ROUGE-1', 'ROUGE-2', 'ROUGE-L', 'BLEU', 'BERTScore-F1']}
        rows={[
          ['Zero-Shot', '0.363', '0.180', '0.276', '0.106', '0.843'],
          ['Self-Reflection', '0.247', '0.100', '0.187', '0.060', '0.833'],
          ['Self-Ask', '0.227', '0.105', '0.178', '0.063', '0.635'],
          ['Tree-of-Thought', '0.409', '0.214', '0.320', '0.130', '0.862'],
        ]}
        accent={ACCENT}
      />

      <PullQuote accent={ACCENT}>
        Tree-of-Thought (ToT) achieved the highest overall lexical and semantic alignment (R1=0.409, RL=0.320, BF1=0.862) under the LoRA-RAG setup (r=16, α=64, LR=7e-6, max_len=2048), confirming that structured reasoning enhances factual completeness in medical captioning.
      </PullQuote>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Conclusion</SectionHeading>
      <Prose>
        Together, the PCam image baselines, ClinicalBERT fine-tuning pipeline, BLIP-2 caption analysis, and LoRA-RAG captioning system establish a uniform data and model foundation for multimodal cancer pathology classification. The framework provides evidence-based approaches to short, clinically grounded summaries while remaining parameter-efficient and extensible to future fusion architectures.
      </Prose>

      <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A10]/40">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {['PyTorch v2.9.0', 'Transformers v4.57.1', 'NumPy', 'Pandas', 'scikit-learn', 'Datasets', 'PEFT', 'BLIP-2', 'ClinicalBERT', 'LiquidAI RAG', 'GPT-4o', 'DeepSeek'].map(t => (
            <span key={t} className="text-[9px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.06] text-white/25" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </PublicationLayout>
  );
}
