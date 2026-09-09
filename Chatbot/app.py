from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("GEMINI_API_KEY"),    
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat",methods=["POST"])
def chat():
    data=request.get_json()
    user_message=data.get("message", "")

    response= client.chat.completions.create(
        model="gemini-3.8-flash",
        messages=[{"role": "user", "content": user_message}]
    )

    reply=response.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)