// projects.jsx
import ProjectGrid from "./grid";

const slides = [
  {
    title: 'Protein Secondary Structure Prediction (Thesis)',
    description: 'A three-seed Transformer ensemble on frozen ESM-2 embeddings for per-residue protein structure classification, refined with a post-processing pipeline.',
    fullDescription: 'An independent research project and manuscript tackling Protein Secondary Structure Prediction (PSSP) across both coarse 3-state and fine-grained 8-state DSSP schemes. While modern tools like AlphaFold2 predict static 3D coordinates, high-resolution secondary structure prediction remains critical for capturing conformational transitions, fold-switching dynamics, and functional gating hinges.\n\nApproach: I designed a three-seed ensemble of encoder-only Transformers operating on frozen per-residue embeddings from ESM-2 (650M). A core methodological contribution is an intra-embedding slicing strategy, partitioning the 1280-dimensional residue representation into sub-tokens so multi-head self-attention learns dependencies within the embedding space itself. To address biologically implausible predictions, I developed a dual post-processing pipeline combining a learned Random Forest filter with empirical structural rules that prune unfeasible segments and restore structural continuity.\n\nEvaluation & Interpretability: I conducted representation analysis using attention weight visualization and PCA on encoder representations, confirming class-discriminative clustering across structural states rather than simple embedding pass-through.\n\nResults: The post-processing pipeline lifted Segment Overlap (SOV) scores by up to 10 points on CASP12 and yielded substantial gains on critical minority classes (+22.10 points for 3₁₀-helices and +28.10 points for π-helices). Across CASP12, TS115, and CB513 benchmarks, the framework matched or surpassed state-of-the-art predictors, reaching 86.80% Q₃ and 75.10% Q₈ accuracy on CB513.',
    tags: 'PyTorch,Transformers,ESM-2,Bioinformatics,RandomForest,Python'
  },
  {
    title: 'CV-Proposal Matching System',
    description: 'A hybrid retrieval pipeline built on the Microsoft Power Platform, combining TF-IDF lexical search with OpenAI embeddings to automate employee-to-project matching.',
    fullDescription: 'Built during my Software Developer Internship at Grant Thornton Cyprus (Quantitative Risk Department). The department needed a faster way to match employees to proposal teams based on skills and experience buried in unstructured CVs.\n\nI designed a two-stage retrieval pipeline on the Microsoft Power Platform with a vector database. The first stage used a TF-IDF inverted index for fast lexical candidate retrieval; the second stage re-ranked those candidates using OpenAI text embeddings for semantic similarity, so the system could match on meaning and not just exact keyword overlap. An LLM was integrated on top to help structure and summarize the final ranked output. Finally I automated the last mile: compiling the ranked employee data directly into structured PowerPoint proposal decks, removing a manual assembly step the team had been doing by hand.\n\nThe result was a working internal tool that turned an ad-hoc, memory-dependent staffing process into a repeatable, data-driven one.',
    tags: 'OpenAI,VectorDB,NLP,PowerPlatform,Python,SQLServer'
  },
  {
    title: 'WBL Sampling',
    description: 'A Django and Leaflet.js geospatial web app built for the Water Board of Limassol to log, edit, and visualize chlorine and substance measurements across the network.',
    fullDescription: 'As lead developer at KIOS Center of Excellence, I built WBLSampling for the Water Board of Limassol (WBL) — a tool for field staff to log, edit, and review chlorine and other substance measurements across the water network, replacing a slower manual reporting process.\n\nThe Django web framework handled the backend and data model, backed by a PostgreSQL database storing time-stamped, geo-tagged measurement records. On the frontend, I used the Leaflet.js library to render an interactive map where each sampling point could be clicked to inspect its measurement history, and jQuery to wire up dynamic, AJAX-driven queries against the database. The app was containerized with Docker for consistent deployment.\n\nAs lead contributor, I owned the data model design and the map interaction logic end-to-end, coordinating with the water board\'s domain requirements for what "unfeasible" or "flagged" measurements should look like.\n\nThe result was an internal tool actively used by WBL staff for day-to-day chlorine and substance-level monitoring.',
    tags: 'Django,Python,Javascript,JQuery,PostgreSQL,Docker,Leaflet'
  },
  {
    title: 'Oceanos Digital Twin',
    description: 'A QGIS-based calibration and genetic algorithm simulation toolkit for the Oceanos Digital Twin, mirroring and optimizing regional water distribution networks.',
    fullDescription: 'Contributed to OceanosDT, a digital twin platform at KIOS Center of Excellence that mirrors the physical water distribution networks of the Water Boards of Limassol and Larnaca, used for monitoring and what-if simulation.\n\nMy work centered on the Python/QGIS side — building and refining geospatial plugins and tooling used to calibrate hydraulic models against real sensor readings, so the digital twin\'s simulated network behavior tracks the real one. I also worked on genetic algorithm-based simulations, used to search for optimal network configurations (e.g. valve settings, pressure zones) under operational constraints, rather than relying on manual trial and error.\n\nThis was a larger, evolving team codebase rather than a solo build, so my contribution was concentrated on the QGIS tooling and the optimization/simulation layer.\n\nThe result was a calibration and simulation tooling that feeds into ongoing digital twin monitoring for two municipal water boards.',
    tags: 'QGIS,GeneticAlgorithms,Simulation,Python'
  },
  {
    title: 'Twitter Sentiment Classification',
    description: 'An NLP pipeline combining 200d GloVe Twitter embeddings with 40+ engineered linguistic, pragmatic, and sarcasm-aware features to classify tweet sentiment.',
    fullDescription: 'An end-to-end NLP classification pipeline engineered to classify tweets into positive or negative sentiment, designed specifically around the informal, emotive, and non-standard syntax characteristic of microblog text.\n\nFeature Architecture & Pipeline: Rather than relying solely on surface bag-of-words, the system leverages pre-trained 200-dimensional GloVe Twitter word vectors for dense semantic representation (outperforming TF-IDF in empirical selection), augmented by a multi-layered suite of over 40 engineered features across five key categories:\n• Lexical & Syntactic: spaCy part-of-speech distributions, negation markers, character elongation ("soooo"), and casing ratios.\n• Sentiment & Pragmatic: NLTK Opinion Lexicon polarity, custom emoji and emoticon sentiment scoring, and intra-sentence polarity flips.\n• Advanced Psychological Signals: TextBlob polarity/subjectivity fused with an integrated pre-trained sarcasm detection classifier to resolve ironic expressions.\n\nModeling & Interpretability: The primary classifier is an SGDClassifier with log loss (logistic regression), optimized via Optuna Bayesian search across 100 trials using 3-fold cross-validation on macro-averaged F1. A complementary Random Forest model was trained to analyze Gini feature importance across the high-dimensional feature space.\n\nResults & Insights: The tuned model achieved 87.41% accuracy (0.86 macro F1, 0.8187 3-fold CV F1) on a holdout test set of 6,347 tweets, maintaining 0.88 precision and 0.93 recall on negative sentiment. Feature importance analysis revealed that engineered sarcasm scores, polarity-flip detection, and expressive punctuation (!) ranked among the top predictive signals alongside dense word vectors, demonstrating that pragmatic and emotional cues provide decisive discriminatory power in noisy, short-form text.',
    tags: 'Python,NLP,GloVe,Scikit-Learn,Optuna,SpaCy,TextBlob'
  }
];

const Project = () => {
  return (
    <section className="w-full p-5 md:p-10">
      <h2 id="projects" className="font-mono text-3xl text-white font-semibold mb-2">Projects</h2>
      <p className="text-lg md:text-xl font-serif text-stone-400 mb-10">
        Here are some projects that provide a glimpse of my work, knowledge and dedication.
      </p>
      <ProjectGrid slides={slides} />
    </section>
  );
};

export default Project;
