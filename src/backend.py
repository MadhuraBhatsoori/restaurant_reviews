import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

app = Flask(__name__)
CORS(app)

# Initialize Pinecone and OpenAI
pc = Pinecone(api_key="23dd1521-3082-4d40-b835-f19d6cd5c706")
llm = ChatOpenAI(
    openai_api_key="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",
    model_name="gpt-4-turbo",
    temperature=1.0
)

# Initialize the Pinecone index and vector store
index = pc.Index("redpanda")
vector_store = PineconeVectorStore(
    index=index,
    embedding=OpenAIEmbeddings(
        openai_api_key="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"
    )
)

# Initialize the Retriever and QA chain
retriever = vector_store.as_retriever()
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever
)

def process_query(query):
    # Add restaurant context if provided
    response = qa.invoke(query)
    return response.get('result')

@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided"}), 400
        
    try:
        result = process_query(query)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)