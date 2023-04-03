import psycopg2
from config.dbconfig import pg_config
from psycopg2.extras import RealDictCursor
import logging

logging.basicConfig(level=logging.DEBUG)

class PatientDAO:

    def __init__(self):
        connection_url = "host = %s dbname=%s user=%s password=%s" % (pg_config['host'],
                                                                      pg_config['dbname'],
                                                                      pg_config['user'],
                                                                      pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def __del__(self):
        logging.info("Connection Closed")
        self.conn.close()



    def getAllPatients(self):
        cursor = self.conn.cursor()
        query = """
        select *
        from patient;
        """
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        cursor.close()
        return result

    def getPatientByName(self,f_name,l_name):
        cursor = self.conn.cursor()
        query = """
        select * 
        from patient
        where f_name = %s AND l_name = %s;
        """
        cursor.execute(query, (f_name,l_name,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def getPatientByID(self,p_id):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query ="""
        SELECT p_id, f_name, l_name, phone, email
        FROM patient
        WHERE p_id = %s
        """
        cursor.execute(query, (p_id,))
        result = cursor.fetchone()
        cursor.close()
        return result

    def getAppointmentByID(self, p_id):
        cursor = self.conn.cursor()
        query = """
        select * 
        from appointment
        where p_id = %s;
        """
        cursor.execute(query, (p_id,))
        result = []
        for row in cursor:
            result.append(row)
        cursor.close()
        return result
    
    def addAppointment(self, office_id, patient_id, doctor_id, time, date, notes):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query = """
        INSERT INTO appointment(o_id, p_id, d_id, time, date, notes)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING a_id;
        """
        cursor.execute(query, (office_id, patient_id, doctor_id, time, date, notes))
        self.conn.commit()
        result = cursor.fetchone()
        cursor.close()
        return result

    def cancelAppointment(self, a_id):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query = """
        UPDATE appointment
        SET is_valid = FALSE
        WHERE a_id = %s
        RETURNING a_id;
        """
        cursor.execute(query, (a_id,))
        self.conn.commit()
        result = cursor.fetchone()
        cursor.close()

        return result
