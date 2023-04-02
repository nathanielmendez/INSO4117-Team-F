from flask import jsonify
from daos.patientDAO import PatientDAO
from daos.doctorDAO import doctorDAO



class patientHandler:
    def build_person_dict(self, row):
        result = {"p_ID":row[0],
                  'f_name': row[1],
                  'l_name': row[2],
                  'phone': row[3],
                  'email': row[4],
                  'password': row[5]}
        return result

    def build_person_attributes(self, f_name, l_name, email, password, phone):
        result = {'f_name': f_name,
                  'l_name': l_name,
                  'email': email,
                  'password': password,
                  'phone': phone}
        return result

    def getAllPatients(self):
        dao = PatientDAO()
        user_list = dao.getAllPatients()
        result_list = []
        for row in user_list:
            result = self.build_person_dict(row)
            result_list.append(result)
        return jsonify(Patients=result_list)

    def getPatientByName(self, json):
        f_name = json['f_name']
        l_name = json['l_name']
        dao = PatientDAO()
        row = dao.getPatientByName(f_name,l_name)
        if not row:
            return jsonify(Error="Person Not Found"), 404
        else:
            part = self.build_person_dict(row)
            return jsonify(Person=part)

    def getAppointmentByID(self, json):
        p_id = json['p_id']
        dao = PatientDAO()
        row = dao.getAppointmentByID(p_id)
        lst = []
        for val in row:
            part = self.build_person_dict(val)
            lst.append(part)
        if not row:
            return jsonify(Error="No appointment found"), 404
        else:
            return jsonify(Person=lst)

    def scheduleAppointment(self, json):

        if not doctorDAO().getDoctorById(json["doctor_id"]):
            return jsonify(Error="Doctor not found"), 404
        
        if not PatientDAO().getPatientByID(json["patient_id"]):
            return jsonify(Error="Patient not found"), 404
        
        if not doctorDAO().getOfficeById(json["office_id"]):
            return jsonify(Error="Office not found"), 404
        
        return jsonify(PatientDAO().addAppointment(json["office_id"], json["patient_id"], json["doctor_id"], json["time"], json["date"], json["notes"])), 200
        
