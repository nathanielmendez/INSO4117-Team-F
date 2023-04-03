"""
This scenario has patients from usage scenario 1 and 2 and doctors from usage scenario 4.

How to run:
    1. From the command line run: locust -f load_testing/scenarioA.py
    2. Go to http://localhost:8089/ and enter the number of users to simulate and the spawn rate.
    3. On Host enter: http://localhost:5000

Notes: Since the app is running locally using to many users leads to failures.
"""

from locust import HttpUser, task, between
import random


class Patient(HttpUser):
    wait_time = between(1, 5)
    weight = 5 # 5 times more likely to be selected than the other users


    @task(5) # 5 times more likely to be selected than the other tasks
    def see_all_schedule_appointements(self):
        p_id = random.randint(1, 5)
        self.client.get("/patient/app", json={"p_id": p_id})

    @task
    def schedule_appointment(self):
        patient_id = random.randint(1, 5)
        doctor_id = random.randint(2, 5)
        office_id = 1
        if doctor_id == 2:
            office_id = 2
        elif doctor_id == 3:
            office_id = 3
        self.client.post("/patient/app", json={"office_id": office_id, "patient_id": patient_id, "doctor_id": doctor_id, "time": "10:00am", "date": "2023-05-01", "notes": "test"})



class Doctor(HttpUser):
    wait_time = between(1, 10)

    @task
    def see_all_schedule_appointements(self):
        d_id = random.randint(2, 5)
        self.client.get("/doctor/appointments/%s"%(d_id))