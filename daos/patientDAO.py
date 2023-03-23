import psycopg2
from config.dbconfig import pg_config


class patientDAO:
    def __init__(self):
        connection_url = "host = %s dbname=%s user=%s password=%s" % (pg_config['host'],
                                                                      pg_config['dbname'],
                                                                      pg_config['user'],
                                                                      pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllPatients(self):
        cursor = self.conn.cursor()
        query = "select * " \
                "from patient;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getPatientByName(self,f_name,l_name):
        cursor = self.conn.cursor()
        query = "select * " \
                "from patient " \
                "where f_name = %s AND l_name = %s;"
        cursor.execute(query, (f_name,l_name,))
        result = cursor.fetchone()
        return result

    def getAppointmentByID(self,p_id):
        cursor = self.conn.cursor()
        query = "select * " \
                "from appointment " \
                "where p_id = %s;"
        cursor.execute(query, (p_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result