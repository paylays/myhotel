FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && apt-get clean

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

CMD ["/wait-for-postgres.sh", "python", "app.py"]