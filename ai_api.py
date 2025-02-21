from fastapi import FastAPI, UploadFile, File, HTTPException # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing.image import img_to_array # type: ignore
import numpy as np
from io import BytesIO
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of allowed origins (the URL of your React app)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

skin_disease_model = load_model("final_skin_disease_model.h5")
acne_model = load_model("final_acne_type_model.h5")

skin_disease_classes = ['Acne', 'Eczema', 'Dermatitis', 'Psoriasis', 'Warts', 'Clear Skin']
acne_classes = ['Comodones', 'Nodulocystic', 'Papules', 'Pustules']

def prepare_image(image: Image.Image, target_size: int) -> np.ndarray:
    image = image.resize((target_size, target_size))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.post("/predict/")
async def predict_skin_disease(file: UploadFile = File(...)):
    try:
        image = Image.open(BytesIO(await file.read()))
        processed_image = prepare_image(image, target_size=380)

        skin_disease_prediction = skin_disease_model.predict(processed_image)
        skin_disease_index = np.argmax(skin_disease_prediction)
        skin_disease_label = skin_disease_classes[skin_disease_index]

        if skin_disease_label == "Acne":
            processed_image_acne = prepare_image(image, target_size=456)
            acne_prediction = acne_model.predict(processed_image_acne)
            acne_index = np.argmax(acne_prediction)
            acne_type_label = acne_classes[acne_index]
            
            acne_info = {
                "Comodones": {"grade": "Grade 1", "severity": "Mild"},
                "Papules": {"grade": "Grade 2", "severity": "Moderate"},
                "Pustules": {"grade": "Grade 2", "severity": "Moderate"},
                "Nodulocystic": {"grade": "Grade 3", "severity": "Severe"}
            }

            response = {
                "Skin disease": skin_disease_label,
                "Acne type": acne_type_label,
                "Acne grade": acne_info[acne_type_label]["grade"],
                "Acne severity": acne_info[acne_type_label]["severity"]
            }
        else:
            response = {
                "Skin disease": skin_disease_label,
            }

        return JSONResponse(content=response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to Derma AI!"}
