from flask import Flask, jsonify, request
from handlers.patientHandler import patientHandler
from handlers.doctorHandler import doctorHandler
app = Flask(__name__)


@app.route('/')
def greeting():
    return 'This is flask!'

@app.route('/patients', methods=['GET'])
def getAllPatients():
    if request.method == 'GET':
        return patientHandler().getAllPatients()
    else:
        return jsonify(Error="Method not allowed."), 405
@app.route('/doctors', methods=['GET'])
def getAllDoctors():
    if request.method == 'GET':
        return doctorHandler().getAllDoctors()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/patient/<int:p_id>', methods=['GET'])
def getPatient(p_id):
    if request.method == 'GET':
        return patientHandler().getPatientByName(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/doctor/<int:d_id>', methods=['GET'])
def getDoctorByName():
    if request.method == 'GET':
        return doctorHandler().getDoctorByName(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/doctor/office/<int:o_id>', methods=['GET'])
def getDoctorByOffice():
    if request.method == 'GET':
        return doctorHandler().getDoctorByOffice(request.json)
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/patient/appointments', methods=['GET', 'POST', 'DELETE'])
def mangeAppointments():
    if request.method == 'GET':
        return patientHandler().getAppointmentByID(request.args)
    
    elif request.method == 'POST':
        return patientHandler().scheduleAppointment(request.json)

    elif request.method == 'DELETE':
        return patientHandler().cancelAppointment(request.json)

    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/doctor/appointments/<int:d_id>', methods=['GET'])
def manageAppointmentsDoctor(d_id):
    if request.method == 'GET':
        return doctorHandler().getAppointmentsById(d_id)
    else:
        return jsonify(Error="Method not allowed."), 405


if __name__ == "__main__":
    app.run()
