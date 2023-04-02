from daos import patientDAO
from flask import jsonify

from daos.doctorDAO import doctorDAO
class doctorHandler:
    def build_person_dict(self, row):
        result = {
                  'f_name': row[1],
                  'l_name': row[2],
                  'specialty': row[3],
                  'o_ID': row[4]}
        return result

    def build_person_attributes(self, f_name, l_name, email, password, phone):
        result = {'f_name': f_name,
                  'l_name': l_name,
                  'email': email,
                  'password': password,
                  'phone': phone}
        return result

    def getAllDoctors(self):
        dao = doctorDAO()
        user_list = dao.getAllDoctors()
        result_list = []
        for row in user_list:
            result = self.build_person_dict(row)
            result_list.append(result)
        return jsonify(Patients=result_list)

    def getDoctorByName(self, json):
        f_name = json['f_name']
        l_name = json['l_name']
        dao = doctorDAO()
        row = dao.getDoctorByName(f_name,l_name)
        if not row:
            return jsonify(Error="Person Not Found"), 404
        else:
            part = self.build_person_dict(row)
            return jsonify(Person=part)

    def getDoctorByOffice(self,jsom):
        o_ID = jsom['o_ID']
        dao = doctorDAO()
        row = dao.getDoctorByName(o_ID)
        lst = []
        for val in row:
            part = self.build_person_dict(val)
            lst.append(val)
        if not row:
            return jsonify(Error="Person Not Found"), 404
        else:
            return jsonify(Person=lst)

    def getAppointmentsById(self, doctor_id):

        if not doctorDAO().getDoctorById(doctor_id):
            return jsonify(Error="Doctor Not Found"), 404
        
        return jsonify(doctorDAO().getAppointmentsById(doctor_id)), 200