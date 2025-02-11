import requests
from PIL import Image
from torchvision import transforms, models
import torch

model = models.resnet18(pretrained=True)
model.eval()

def process_image(image_path):
    img = Image.open(image_path)
    transform = transforms.Compose([transforms.Resize(256), transforms.ToTensor()])
    img = transform(img).unsqueeze(0)
    
    with torch.no_grad():
        output = model(img)
    return output.argmax().item()

image_path = "sample.jpg"
prediction = process_image(image_path)
print(f"Predicted Label: {prediction}")