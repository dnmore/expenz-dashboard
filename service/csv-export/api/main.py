from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import csv
from io import StringIO


app = FastAPI()

origins = [os.environ.get("FRONTEND_ORIGIN")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
    max_age=3600,
)

def generate_csv(data, headers):
    """
    Generates a CSV string from data and headers.
           
    """
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=headers)
    writer.writeheader()
    writer.writerows(data)
    return output.getvalue()


@app.get("/generate-csv-income")
def read_endpoint():
    return {"message": "Welcome to the CSV Income Export Endpoint"}
    

@app.post("/generate-csv-income")
async def generate_csv_endpoint(request: Request):
    """
    Expects JSON like:
    {
      "data": [ { "description": "...", "amount": 100, "date": "2025-10-01" }, ... ],
      "headers": ["description", "amount", "date"],
      "filename": "income.csv"
    }
    """
    try:
        body = await request.json()
        data = body.get("data")
        headers = body.get("headers")
        

        if not data or not headers:
            raise HTTPException(status_code=400, detail="Missing data or headers")

        csv_data = generate_csv(data, headers)

        return StreamingResponse(
            iter([csv_data]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=income.csv"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating CSV: {str(e)}")




@app.get("/generate-csv-expense")
def read_endpoint():
    return {"message": "Welcome to the CSV Expense Export Endpoint"}
    

@app.post("/generate-csv-expense")
async def generate_csv_endpoint(request: Request):
    """
    Expects JSON like:
    {
      "data": [ { "description": "...", "amount": 100, "date": "2025-10-01" }, ... ],
      "headers": ["description", "amount", "date"],
      "filename": "expense.csv"
    }
    """
    try:
        body = await request.json()
        data = body.get("data")
        headers = body.get("headers")
        

        if not data or not headers:
            raise HTTPException(status_code=400, detail="Missing data or headers")

        csv_data = generate_csv(data, headers)

        return StreamingResponse(
            iter([csv_data]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=expense.csv"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating CSV: {str(e)}")




