import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

regulations = [
"ANSI A13.1-2023 (Pipe Marking) requires that all pipes carrying hazardous substances must be marked with a color code and label indicating the material inside, the flow direction, and appropriate hazard symbols for quick and clear identification.",

"ANSI Z358.1-2014 (Emergency Equipment) outlines safety equipment standards such as eye wash stations, safety showers, and other emergency equipment, specifying placement, maintenance, and inspection procedures.",
"Based on the ANSI Z358.1-2014 standard, emergency showers, eye wash stations,, along with other emergency equipment, must be tested monthly and inspected annually. These showers should be easily accessible within 10 seconds of travel time, with regular flushing to ensure water quality. Any emergency equipment thats exposed to corrosive materials should be checked more frequently.",

"OSHA 1910.37(a)(3) (Clear Egress Path) requires that emergency exit routes be clearly marked, easily accessible, and unobstructed at all times to ensure safe evacuation during emergencies.",

"OSHA 1910.157(c)(1) outlines the installation and maintenance requirements for fire extinguishers, including placement near exits and ensuring they are easily accessible and in working condition.",

"OSHA 1910.303(e)(1) requires that electrical equipment be marked with the manufacturer's name, trademark, or other descriptive markings by which the organization responsible for the product can be identified. Additionally, the equipment must include information such as the voltage, current rating, and other specifications required for safe use, installation, and maintenance.",
"OSHA 1910.303(e)(1)(i) requires that the manufacturer's name, trademark, or other descriptive markings by which the organization responsible for the product may be identified, be clearly marked on electrical equipment.",
"OSHA 1910.303(e)(1)(ii) mandates that electrical equipment be marked with other relevant information, such as the voltage, wattage, current rating, and other specifications, necessary for safe operation and maintenance.",
"OSHA 1910.303(e)(2) requires markings on electrical equipment must be durable enough to withstand the environmental conditions they are exposed to.",

"OSHA 1910.303(g) applies to electrical equipment operating at 600 volts or less, requiring sufficient space around equipment for safe operation and maintenance.",
"OSHA 1910.303(g)(1) mandates that adequate access and working space be provided and maintained around all electrical equipment for safe operation and maintenance.",
"OSHA 1910.303(g)(1)(i) requires that working space for equipment likely to require servicing or maintenance while energized must meet specified dimensional criteria.",
"OSHA 1910.303(g)(1)(i)(A) specifies that the depth of working space in the direction of access to live parts must be no less than the following, based on the nominal voltage and the conditions outlined: - For 0-150V, the minimum depth is 0.9 m (3 ft), - For 151-600V under Condition A (exposed live parts on one side, no live or grounded parts on the other), the depth must be 1.0 m (3.5 ft), - For 151-600V under Condition B (exposed live parts on one side, grounded parts on the other), the depth should be 1.2 m (4 ft). - These values are based on Table S-1 from the OSHA guidelines.",
"OSHA 1910.303(g)(1)(i)(B) requires the width of the working space in front of electric equipment to be at least the equipments width or 30 inches, whichever is greater, ensuring a 90-degree opening of equipment doors.",
"OSHA 1910.303(g)(1)(i)(C) mandates that the working space extend from the floor to the required height, with equipment extending no more than 6 inches beyond the front.",
"OSHA 1910.303(g)(1)(ii) prohibits using working space for storage and requires guarding when live parts are exposed for inspection or servicing in open spaces.",

"Electrical systems must be inspected at least annually as per OSHA 1910.303(g)(1). However, more frequent checks may be required depending on environmental factors (e.g., humidity, dust) or heavy usage.",
]

regulation_embeddings = model.encode(regulations)

np.save('regulation_embeddings.npy', regulation_embeddings)

with open('regulations.txt', 'w') as f:
    for regulation in regulations:
        f.write(f"{regulation}\n")

print("Embeddings and regulations have been saved successfully.")