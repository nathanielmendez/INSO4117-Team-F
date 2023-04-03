"""
This scenario regards the cancellation of scheduled appointments by patient users, which is usage scenario 3.

How to run:
    1. From the command line run: locust -f load_testing/scenarioB.py
    2. Go to http://localhost:8089/ and enter the number of users to simulate and the spawn rate.
    3. On Host enter: http://localhost:5000

Notes: Since the app is running locally using too many users leads to failures.
"""

from locust import HttpUser, task, between
import random


class Patient(HttpUser):
    wait_time = between(1, 5)
    weight = 5

    # Scenario where a patient cancels an appointment.
    @task
    def cancel_appointment(self):
        a_id = random.randint(1, 3000)
        self.client.delete("/patient/app", json={"a_id": a_id})

    # Other scenarios.
    @task(6)
    def see_scheduled_appointments(self):
        p_id = random.randint(1, 5)
        self.client.get("/patient/app", json={"p_id": p_id})

    @task(3)
    def schedule_appointment(self):
        patient_id = random.randint(1, 5)
        doctor_id = random.randint(2, 5)
        office_id = 1
        if doctor_id == 2:
            office_id = 2
        elif doctor_id == 3:
            office_id = 3
        self.client.post("/patient/app", json={"office_id": office_id, "patient_id": patient_id,
                                               "doctor_id": doctor_id, "time": "10:00am",
                                               "date": "2023-05-01", "notes": "test"})


class Doctor(HttpUser):
    wait_time = between(1, 10)
    weight = 1

    @task
    def see_scheduled_appointments(self):
        d_id = random.randint(2, 5)
        self.client.get("/doctor/appointments/%s" % (d_id))


