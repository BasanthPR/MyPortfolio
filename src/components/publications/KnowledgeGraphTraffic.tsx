'use client';

import PublicationLayout, {
  MetricCard, SectionHeading, SubHeading, Prose, PullQuote,
  DataTable, DiagramBox, Arrow, SectionDivider,
} from './PublicationLayout';

const ACCENT = '#D4A843';

function SystemArchitecture() {
  return (
    <div className="my-10 p-6 md:p-10 rounded-3xl border border-white/[0.06] bg-[#0A0A10]/60">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
        Fig 1 — Knowledge Graph-Enhanced Traffic Optimization System
      </p>
      <div className="flex flex-col items-center space-y-2">
        {/* Data sources */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <DiagramBox label="Traffic Data" sublabel="traffic.csv · historical patterns" accent={ACCENT} highlight />
          <DiagramBox label="Commute Data" sublabel="bay_area_9_all_commutes" accent={ACCENT} />
          <DiagramBox label="Road Metadata" sublabel="ca_meta.csv" accent={ACCENT} />
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          <DiagramBox label="Real-Time Traffic" sublabel="511.org API · WZDx · Toll Data" accent={ACCENT} />
          <DiagramBox label="Events & Incidents" sublabel="Traffic Events API · JSON" accent={ACCENT} />
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* Knowledge Graph */}
        <div className="w-full p-4 rounded-2xl border" style={{ borderColor: `${ACCENT}35`, background: `${ACCENT}08` }}>
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}80` }}>
            Knowledge Graph (NetworkX → Neo4j)
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <DiagramBox label="Traffic Junctions" sublabel="Intersections · highways" accent={ACCENT} size="sm" />
            <DiagramBox label="Road Segments" sublabel="Sections between junctions" accent={ACCENT} size="sm" />
            <DiagramBox label="Weather Conditions" sublabel="clear · rain · fog" accent={ACCENT} size="sm" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <DiagramBox label="Incidents" sublabel="accidents · construction" accent={ACCENT} size="sm" />
            <DiagramBox label="Events" sublabel="Special area events" accent={ACCENT} size="sm" />
            <DiagramBox label="Time Periods" sublabel="Hour of day · day of week" accent={ACCENT} size="sm" />
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <p className="text-[8px] text-center text-white/25 mb-2" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>Edge Types</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['connects_to (92%)', 'affected_by_incident (90%)', 'part_of_route (89%)', 'affected_by_weather (87%)', 'located_near (85%)'].map(e => (
                <span key={e} className="text-[8px] px-2 py-1 rounded border border-white/[0.06] text-white/30" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* Embeddings */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="space-y-1">
            <DiagramBox label="Node2Vec Embeddings" sublabel="dim=64 · walk=30 · walks/node=200" accent={ACCENT} />
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="Graph Feature Vectors" sublabel="Semantic + structural node representation" accent={ACCENT} />
          </div>
          <div className="space-y-1">
            <DiagramBox label="Temporal Features" sublabel="Hour · Day · Junction ID" accent={ACCENT} />
            <Arrow vertical accent={ACCENT} />
            <DiagramBox label="Classical ML Features" sublabel="Vehicle count · speed · weather" accent={ACCENT} />
          </div>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* ML Models */}
        <div className="w-full p-4 rounded-2xl border border-white/[0.06] bg-[#D4A84306]">
          <p className="text-[9px] tracking-[0.35em] uppercase text-center mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}70` }}>
            KG-Enhanced ML Pipeline
          </p>
          <div className="grid grid-cols-3 gap-2">
            <DiagramBox label="Random Forest" sublabel="Nonlinear boundaries" accent={ACCENT} size="sm" />
            <DiagramBox label="XGBoost" sublabel="Grid search tuned" accent={ACCENT} size="sm" highlight />
            <DiagramBox label="LightGBM" sublabel="Memory efficient" accent={ACCENT} size="sm" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <DiagramBox label="Linear / Ridge" sublabel="Baseline models" accent={ACCENT} size="sm" />
            <DiagramBox label="KNN Regressor" sublabel="Local patterns" accent={ACCENT} size="sm" />
            <DiagramBox label="Stacking Ensemble" sublabel="Meta-model boosting" accent={ACCENT} size="sm" highlight />
          </div>
        </div>
        <Arrow vertical accent={ACCENT} />

        {/* Output */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <DiagramBox label="Traffic Predictions" sublabel="92% accuracy with connects_to" accent={ACCENT} highlight />
          <DiagramBox label="Streamlit Dashboard" sublabel="Route optimizer · junction explorer · forecasts" accent={ACCENT} highlight />
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeGraphTrafficPaper() {
  return (
    <PublicationLayout
      title="Knowledge Graph-Enhanced Traffic Optimization System for the Bay Area"
      authors="Anshu Reddy Dhamana, Basanth Periyapatna Roopa Kumar, Manav Rajesh Anandani, Nischitha Nagendran, Nitya Rondla, Srithareddy Devireddy, Vinuthna Papana"
      venue="Department of Applied Data Science · San Jose State University · DATA 266: Generative AI"
      venueShort="SJSU · DATA 266"
      year={2025}
      tag="Knowledge Graphs"
      accent={ACCENT}
      pdfUrl="/docs/knowledge-graph-traffic.pdf"
    >
      <SectionHeading accent={ACCENT}>Abstract</SectionHeading>
      <Prose>
        This paper introduces a knowledge graph-based traffic optimization system for The Bay Area. Traditionally, traffic forecasting models have difficulties fusing up with various data and expressing intricate spatiotemporal relations among traffic entities. We overcome this limitation with the establishment of a wide-ranging knowledge graph framework that captures semantic associations amongst traffic junctions, roads stretches, weather circumstances, incidents and events.
      </Prose>
      <Prose>
        Our method uses traffic meter data, weather info, incident reports, and event schedules into a unified knowledge graph, allowing us to capture more feature-rich and relationship-based information. The experimental results show that adding knowledge graph semantics achieves higher prediction accuracy, with the "connects_to" relationship resulting in the best prediction (92% accuracy). Our system provides actionable knowledge into how various consequents impacts traffic beats on weekdays in contrast to weekends, with usefulness to traffic operations and city arranging.
      </Prose>

      <PullQuote accent={ACCENT}>
        Knowledge graphs offer a viable option for modeling complex systems because they organize entities and their relationships in a systematic and meaningful manner — capturing both semantic context and the intricate interconnections within transportation systems.
      </PullQuote>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        <MetricCard label="Peak Prediction Accuracy" value="92%" accent={ACCENT} />
        <MetricCard label="Accuracy Improvement (KG vs Baseline)" value="+8–15%" accent={ACCENT} />
        <MetricCard label="RMSE Reduction" value="12–20%" accent={ACCENT} />
        <MetricCard label="Graph Nodes" value="550+" accent={ACCENT} />
        <MetricCard label="Edge / Relationship Types" value="6" accent={ACCENT} />
        <MetricCard label="Graph Embedding Dimension" value="64" accent={ACCENT} />
      </div>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>System Architecture</SectionHeading>
      <SystemArchitecture />

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Data Collection & Preprocessing</SectionHeading>

      <SubHeading>Traffic & Commute Data</SubHeading>
      <Prose>
        The primary traffic dataset (traffic.csv) includes data on traffic volume (vehicle counts), speed, and junction identification. Temporal variables such as hour of day and day of week were extracted for temporal pattern analysis. Commute data from bay_area_9_all_commutes_names.csv provided route-level linkages between road segments and popular commuting pathways, enhancing the knowledge graph with route-specific information.
      </Prose>

      <SubHeading>Real-Time API Sources</SubHeading>
      <Prose>
        Dynamic traffic conditions were captured via three 511.org API feeds: Work Zones Data (WZDx API — construction sites and roadwork), Traffic Events API (incidents, accidents, and traffic-related occurrences), and the Toll Data API (toll rates and affected road segments). API responses were saved as JSON files and included in the graph construction. California road network metadata (ca_meta.csv) provided structural information about road segments, junction kinds, lane counts, and speed limits.
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Knowledge Graph Construction</SectionHeading>

      <SubHeading>Node Types</SubHeading>
      <Prose>
        The knowledge graph includes six node types: Traffic Junctions (intersections and highway interchanges), Road Segments (road sections between junctions), Weather Conditions (clear, rain, fog), Incidents (accidents, construction), Events (special area events), and Time Periods (times of day and week). The graph was built using NetworkX, a Python graph analysis library, and exported to Neo4j for sophisticated querying and visualization.
      </Prose>

      <DataTable
        caption="Knowledge Graph Relationship Types and Prediction Accuracy"
        headers={['Relationship', 'Description', 'Prediction Accuracy']}
        rows={[
          ['connects_to', 'Road segments ↔ intersections', '92%'],
          ['affected_by_incident', 'Junctions/segments ↔ incidents', '90%'],
          ['part_of_route', 'Road segments ↔ common routes', '89%'],
          ['affected_by_weather', 'Intersections ↔ weather states', '87%'],
          ['located_near', 'Proximity between entities', '85%'],
        ]}
        accent={ACCENT}
      />

      <SubHeading>Node2Vec Embeddings</SubHeading>
      <Prose>
        Graph structures were converted into numerical vector representations using node2vec, a popular graph embedding algorithm that extends the word2vec approach to graphs. Node2vec uses biased random walks to explore the neighborhood of each node, balancing between breadth-first and depth-first exploration strategies. Key parameters: embedding dimension 64, walk length 30, number of walks per node 200, context window size 10, minimum count 1.
      </Prose>
      <Prose>
        A fallback embedding strategy ensures resilience when node2vec is unavailable — structured random embeddings with type-specific first-5-dimension signatures maintain semantic coherence for each node type (intersections, road segments, weather, time periods).
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Machine Learning Models</SectionHeading>

      <SubHeading>Ensemble of Regression Models</SubHeading>
      <Prose>
        Feature inputs comprised both typical traffic features (junction ID, time, and day of week) and knowledge graph node embeddings (64 dimensions), allowing the models to use both explicit features and graph relationship data. Five model families were evaluated: Random Forest Regressor, XGBoost (grid search-tuned), LightGBM, Linear/Ridge Regression baselines, KNN Regressor, and a Stacking Ensemble meta-model.
      </Prose>
      <Prose>
        The AdvancedTrafficPredictionModel and KnowledgeGraphEnhancedModel classes implemented standard and categorical feature preprocessing using scikit-learn pipelines, temporal reliability split for training/evaluation, feature importance analysis, and comparative ablation between baseline and KG-enhanced models.
      </Prose>

      <SubHeading>Evaluation Framework</SubHeading>
      <DataTable
        caption="Evaluation Metrics Used"
        headers={['Metric', 'Formula', 'Purpose']}
        rows={[
          ['R² Score', '1 - SS_res/SS_tot', 'Variance explained by model'],
          ['RMSE', '√(mean((y_pred−y_true)²))', 'Forecast error magnitude'],
          ['MAE', 'mean(|y_pred−y_true|)', 'Average absolute error'],
        ]}
        accent={ACCENT}
      />

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Results</SectionHeading>

      <SubHeading>Impact of Knowledge Graph Relationships</SubHeading>
      <Prose>
        One of the research's significant discoveries is that diverse knowledge graph relationships have distinct effects on prediction accuracy. The connects_to relationship yielded the highest prediction accuracy (92%), followed by affected_by_incident (90%), part_of_route (89%), affected_by_weather (87%), and located_near (85%). This shows that topological connectedness between junctions and road segments is the most useful feature in traffic forecasting, followed by incident data.
      </Prose>

      <SubHeading>External Factors Analysis</SubHeading>
      <Prose>
        Our investigation compared the impact of external influences on traffic patterns during weekdays and weekends. Weather conditions (particularly rain and snow) have a more significant impact on weekday traffic. Special events have a more pronounced effect on weekend traffic. Construction activities affect weekday traffic more heavily. Accidents impact both but with different temporal patterns.
      </Prose>

      <SubHeading>Performance vs. Baseline Methods</SubHeading>
      <Prose>
        The knowledge graph-enhanced strategy successfully beat baseline approaches in all parameters, with accuracy increases ranging from 8% to 15% and RMSE reductions of 12% to 20%. This highlights the importance of using knowledge graph data for traffic prediction tasks — the semantic links between traffic components provide information that standard feature engineering cannot replicate.
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Streamlit Dashboard</SectionHeading>
      <Prose>
        A Streamlit online application enables users to optimize traffic using the knowledge graph and prediction models through an interactive interface. Key features: Optimal Route Finding (start/end junction selection with congestion-aware recommendations), Temporal Optimization (best departure times based on past and expected traffic patterns), Traffic Level Forecasting (color-coded vehicle count visualizations across the day), and an Interactive Junction Explorer (heatmap interface showing traffic flow patterns and junction connectivity strength).
      </Prose>

      <SectionDivider accent={ACCENT} />

      <SectionHeading accent={ACCENT}>Conclusion</SectionHeading>
      <Prose>
        This study describes a knowledge graph-enhanced traffic optimization system for the Bay Area that combines multiple data sources into a single framework for traffic prediction and analysis. The method uses the semantic links between traffic components contained in a knowledge graph to increase prediction accuracy and provide interpretable insights into traffic dynamics. The experimental results showed that the knowledge graph technique consistently outperformed traditional methods, with the connects_to relationship contributing the most to prediction accuracy.
      </Prose>
      <Prose>
        Future work will address scalability for very large transit networks, temporal dynamics via graph neural networks (GNNs), real-time knowledge graph updates as new data becomes available, multi-city generalization, and user feedback integration for driver and commuter relevance.
      </Prose>

      <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A10]/40">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${ACCENT}60` }}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {['Python 3.8+', 'NetworkX', 'Neo4j', 'Node2Vec', 'XGBoost', 'LightGBM', 'scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Streamlit', '511.org API', 'WZDx API'].map(t => (
            <span key={t} className="text-[9px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.06] text-white/25" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </PublicationLayout>
  );
}
