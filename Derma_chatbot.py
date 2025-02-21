from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="Dermatology Chatbot API", version="1.0")

# Add CORS middleware to allow connections from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

model = ChatMistralAI(model="mistral-large-latest")

chat_history = []

system_message = SystemMessage(content=(
    "You are a virtual assistant specializing exclusively in dermatology and skin health. "
    "You provide scientifically accurate advice, guidance on skincare routines, treatments for common skin issues, and "
    "information about dermatological procedures. Avoid responding to topics outside the scope of skin and dermatology. "
    "Your responses must be concise (maximum 150-200 tokens) and professional. Always recommend consulting a certified "
    "dermatologist for serious or persistent skin concerns."
))
chat_history.append(system_message)

class Query(BaseModel):
    user_input: str

@app.post("/chat/")
async def chat(query: Query):
    user_input = query.user_input.strip()
    
    chat_history.append(HumanMessage(content=user_input))
    
    try:
        result = model.invoke(chat_history)
        response = result.content
        chat_history.append(AIMessage(content=response))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {e}")

    return {"response": response}

@app.get("/")
async def root():
    return {"message": "Dermatology Chatbot API is running. Use the /chat/ endpoint for queries."}
