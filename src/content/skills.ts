import type { Skill } from "./types";

// One list per row of the pyramid, top to bottom; each row is centred under
// the one above. On phones, rows longer than four cards split into two.
// Logos live in public/skills/.

export const skillRows: Skill[][] = [
  [{ name: "Python", logo: "/skills/python.svg" }],
  [
    { name: "C", logo: "/skills/c.svg" },
    { name: "C++", logo: "/skills/cplusplus.svg" },
  ],
  [
    { name: "JavaScript", logo: "/skills/javascript.svg" },
    { name: "HTML", logo: "/skills/html5.svg" },
    { name: "CSS", logo: "/skills/css3.svg" },
  ],
  [
    { name: "SQL", logo: "/skills/sql.svg" },
    { name: "SQLite", logo: "/skills/sqlite.svg" },
    { name: "NoSQL", logo: "/skills/nosql.svg" },
  ],
  [
    { name: "Qdrant", logo: "/skills/qdrant.svg" },
    { name: "PyTorch", logo: "/skills/pytorch.svg" },
    { name: "TensorFlow", logo: "/skills/tensorflow.svg" },
    { name: "scikit-learn", logo: "/skills/scikitlearn.svg" },
    { name: "Hugging Face", logo: "/skills/huggingface.svg" },
  ],
  [
    { name: "OpenCV", logo: "/skills/opencv.svg" },
    { name: "YOLO", logo: "/skills/ultralytics.svg" },
    { name: "Pandas", logo: "/skills/pandas.svg" },
    { name: "NumPy", logo: "/skills/numpy.svg" },
    { name: "LangGraph", logo: "/skills/langgraph.svg" },
    { name: "FastAPI", logo: "/skills/fastapi.svg" },
  ],
  [
    { name: "Flask", logo: "/skills/flask.svg" },
    { name: "Docker", logo: "/skills/docker.svg" },
    { name: "Git", logo: "/skills/git.svg" },
    { name: "Linux", logo: "/skills/linux.svg" },
    { name: "Google Colab", logo: "/skills/googlecolab.svg" },
    { name: "VS Code", logo: "/skills/vscode.svg" },
    { name: "Windows", logo: "/skills/windows.svg" },
  ],
];
