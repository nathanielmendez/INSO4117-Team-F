import psycopg2
from config.dbconfig import pg_config


class doctorDAO:
    def __init__(self):
        connection_url = "host = %s dbname=%s user=%s password=%s" % (pg_config['host'],
                                                                      pg_config['dbname'],
                                                                      pg_config['user'],
                                                                      pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllDoctors(self):
        cursor = self.conn.cursor()
        query = "select * " \
                "from doctor;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getDoctorByName(self,f_name,l_name):
        cursor = self.conn.cursor()
        query = "select * " \
                "from doctor " \
                "where f_name = %s AND l_name = %s;"
        cursor.execute(query, (f_name,l_name,))
        result = cursor.fetchone()
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
        return result