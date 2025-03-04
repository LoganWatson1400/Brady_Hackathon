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
    best_match_score = similarities[0, best_match_index] * 100

    return regulations[best_match_index].strip(), best_match_score

queries = [
    "Can you explain OSHA 1910.303(e)(1), which is about electrical equipment markings?",
    "What does ANSI A13.1 (Pipe Marking) require?",
    "Tell me about emergency equipment standards.",
    "Can you summarize the ANSI A13.1 (Pipe Marking) regulation?",
    "What is the regulation for safety evacuations?",
    "Give me a short explanation of ANSI Z358.1",
    "Is it true that emergency exits must be clearly marked?",
    "How often should electrical systems be inspected?",
    "Can you explain the maintenance standards for emergency showers?",
]

# Testing
for query in queries:
    best_match, best_match_score = get_best_regulation(query)
    print(f"Query: {query}")
    print(f"Similarity Score: {best_match_score: .2f}")
    print(f"Best Matched Regulation: {best_match}\n")
