import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load precomputed embeddings and regulations
regulation_embeddings = np.load('regulation_embeddings.npy')

with open('regulations.txt', 'r') as f:
    regulations = f.readlines()

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_best_regulation(query):
    query_embedding = model.encode([query])  # encoding query
    similarities = cosine_similarity(query_embedding, regulation_embeddings)
    best_match_index = similarities.argmax()
    return regulations[best_match_index].strip()

queries = [
    "Can you explain OSHA 1910.303(e)(1), which is about electrical equipment markings?",
    "What does ANSI A13.1 (Pipe Marking) require?",
    "Tell me about emergency equipment standards.",
    "Can you summarize the ANSI A13.1 (Pipe Marking) regulation?",
]

# Testing
for query in queries:
    print(f"Query: {query}")
    print(f"Best Matched Regulation: {get_best_regulation(query)}\n")
