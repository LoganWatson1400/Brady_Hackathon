import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

regulations = [
"ANSI A13.1-2023 (Pipe Marking) requires that all pipes carrying hazardous substances must be marked with a color code and label indicating the material inside, the flow direction, and appropriate hazard symbols for quick and clear identification.",

"ANSI Z358.1-2014 (Emergency Equipment) outlines safety equipment standards such as eye wash stations, safety showers, and other emergency equipment, specifying placement, maintenance, and inspection procedures.",

"OSHA 1910.37(a)(3) (Clear Egress Path) requires that emergency exit routes be clearly marked, easily accessible, and unobstructed at all times to ensure safe evacuation during emergencies.",

"OSHA 1910.157(c)(1) outlines the installation and maintenance requirements for fire extinguishers, including placement near exits and ensuring they are easily accessible and in working condition.",

"OSHA 1910.303(e)(1) requires that electrical equipment be marked with the manufacturer's name, trademark, or other descriptive markings by which the organization responsible for the product can be identified. Additionally, the equipment must include information such as the voltage, current rating, and other specifications required for safe use, installation, and maintenance.",

"OSHA 1910.303(g) applies to electrical equipment operating at 600 volts or less, requiring sufficient space around equipment for safe operation and maintenance.",
]

regulation_embeddings = model.encode(regulations)

np.save('regulation_embeddings.npy', regulation_embeddings)

with open('regulations.txt', 'w') as f:
    for regulation in regulations:
        f.write(f"{regulation}\n")

print("Embeddings and regulations have been saved successfully.")
