import psycopg2
from config.dbconfig import pg_config
from psycopg2.extras import RealDictCursor
import logging

logging.basicConfig(level=logging.DEBUG)

class doctorDAO:
    def __init__(self):
        connection_url = "host = %s dbname=%s user=%s password=%s" % (pg_config['host'],
                                                                      pg_config['dbname'],
                                                                      pg_config['user'],
                                                                      pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def __del__(self):
        logging.info("Connection Closed")
        self.conn.close()


    def getAllDoctors(self):
        cursor = self.conn.cursor()
        query = "select * " \
                "from doctor;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        cursor.close()
        return result

    def getDoctorByName(self,f_name,l_name):
        cursor = self.conn.cursor()
        query = "select * " \
                "from doctor " \
                "where f_name = %s AND l_name = %s;"
        cursor.execute(query, (f_name,l_name,))
        result = cursor.fetchone()
        cursor.close()
        return result

    def getDoctorByName(self,o_ID):
        cursor = self.conn.cursor()
        query = "select * " \
                "from doctor " \
                "where o_ID = %s ;"
        cursor.execute(query, (o_ID,))
        result = []
        for row in cursor:
            result.append(row)
        
        cursor.close()
        return result
    
    def getDoctorById(self,d_id):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query ="""
        SELECT d_id, f_name, l_name, o_ID
        FROM doctor
        WHERE d_id = %s
        """
        cursor.execute(query, (d_id,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def getOfficeById(self,o_ID):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT o_id, office_name, office_phone, office_email 
        FROM office
        WHERE o_id = %s;
        """
        cursor.execute(query, (o_ID,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def getAppointmentsById(self, d_id):
        cursor = self.conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT f_name, l_name, date, time, notes
        FROM appointment AS app INNER JOIN patient AS pt ON app.p_id = pt.p_id
        WHERE d_id = %s;
        """
        cursor.execute(query, (d_id,))
        result = cursor.fetchall()
        cursor.close()
        return result