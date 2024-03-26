# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

COPY ./src/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY ./src .

# Make port available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
