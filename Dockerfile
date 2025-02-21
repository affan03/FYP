FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip


RUN pip install -r requirements.txt

COPY . .

EXPOSE 8003

CMD ["/usr/local/bin/uvicorn", "ai_api:app", "--reload", "--port", "8003"]
