from flask import Flask, jsonify, request
from handlers.patientHandler import patientHandler
from handlers.doctorHandler import doctorHandler
app = Flask(__name__)


@app.route('/')
def greeting():
    return 'This is flask!'

@app.route('/patients/all', methods=['GET'])
def getAllPatients():
    if request.method == 'GET':
        return patientHandler().getAllPatients()
    else:
        return jsonify(Error="Method not allowed."), 405
@app.route('/doctors/all', methods=['GET'])
def getAllDoctors():
    if request.method == 'GET':
        return doctorHandler().getAllDoctors()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/patient/name', methods=['GET'])
def getPatientByName():
    if request.method == 'GET':
        return patientHandler().getPatientByName(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/doctor/name', methods=['GET'])
def getDoctorByName():
    if request.method == 'GET':
        return doctorHandler().getDoctorByName(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/doctor/office', methods=['GET'])
def getDoctorByOffice():
    if request.method == 'GET':
        return doctorHandler().getDoctorByOffice(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/patient/app', methods=['GET'])
def getPatientByID():
    if request.method == 'GET':
        return patientHandler().getAppointmentByID(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405

if __name__ == "__main__":
    app.run()
