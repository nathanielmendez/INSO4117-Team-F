from flask import jsonify
from daos.patientDAO import PatientDAO
from daos.doctorDAO import doctorDAO



class patientHandler:


    def getAllPatients(self):
        user_list = PatientDAO().getAllPatients()
        return jsonify(user_list)
    

    def getPatientByName(self, json):
        f_name = json['f_name']
        l_name = json['l_name']
        row = PatientDAO().getPatientByName(f_name,l_name)
        if not row:
            return jsonify(Error="Person Not Found"), 404
        else:
            return jsonify(row)

    def getAppointmentByID(self, args):

        row = PatientDAO().getAppointmentByID(args.get('p_id'))
        if not row:
            return jsonify(Error="No appointment found"), 404
        else:
            return jsonify(row)

    def scheduleAppointment(self, json):

        if not doctorDAO().getDoctorById(json["doctor_id"]):
            return jsonify(Error="Doctor not found"), 404
        
        if not PatientDAO().getPatientByID(json["patient_id"]):
            return jsonify(Error="Patient not found"), 404
        
        if not doctorDAO().getOfficeById(json["office_id"]):
            return jsonify(Error="Office not found"), 404
        
        return jsonify(PatientDAO().addAppointment(json["office_id"], json["patient_id"], json["doctor_id"], json["time"], json["date"], json["notes"])), 200
        
    def cancelAppointment(self, json):

        return jsonify(PatientDAO().cancelAppointment(json["a_id"]))
