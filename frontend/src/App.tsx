import React, { useState } from 'react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [employees, setEmployees] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  
  // Estados para formularios
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

  // Cargar datos del backend
  const loadEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      const employeesArray = Array.isArray(data) ? data : (data.rows || []);
      setEmployees(employeesArray);
      setCurrentPage('employees');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar empleados');
    }
  };

  const loadPayroll = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payroll');
      const data = await response.json();
      const payrollArray = Array.isArray(data) ? data : (data.rows || []);
      setPayroll(payrollArray);
      setCurrentPage('payroll');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar nómina');
    }
  };

  const loadAttendance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance');
      const data = await response.json();
      const attendanceArray = Array.isArray(data) ? data : (data.rows || []);
      setAttendance(attendanceArray);
      setCurrentPage('attendance');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar asistencia');
    }
  };

  const loadDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Agregar nuevo empleado
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department || !newEmployee.salary) {
      alert('Por favor rellena todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newEmployee.name,
          email: newEmployee.email,
          position: newEmployee.position,
          department: newEmployee.department,
          salary: parseFloat(newEmployee.salary),
          hire_date: new Date().toISOString().split('T')[0]
        })
      });

      if (response.ok) {
        alert('Empleado agregado correctamente');
        setNewEmployee({ name: '', email: '', position: '', department: '', salary: '' });
        // Recarga la lista
        await loadEmployees();
      } else {
        alert('Error al agregar empleado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar empleado');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Header */}
      <header style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>📊 Sistema de Gestión de Nómina</h1>
      </header>

      {/* Menú */}
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={loadDashboard}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          📈 Dashboard
        </button>
        <button 
          onClick={loadEmployees}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'employees' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          👥 Empleados
        </button>
        <button 
          onClick={loadPayroll}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'payroll' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          💰 Nómina
        </button>
        <button 
          onClick={loadAttendance}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'attendance' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ✅ Asistencia
        </button>
      </nav>

      {/* Contenido */}
      <main style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        minHeight: '400px'
      }}>
        {currentPage === 'home' && (
          <div>
            <h2>Bienvenido</h2>
            <p>Selecciona una opción del menú para comenzar.</p>
          </div>
        )}

        {currentPage === 'dashboard' && (
          <div>
            <h2>📈 Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Total Empleados</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{employees.length}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Registros de Nómina</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{payroll.length}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Registros de Asistencia</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>{attendance.length}</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'employees' && (
          <div>
            <h2>👥 Empleados</h2>

            {/* Formulario para agregar empleado */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '5px', 
              marginBottom: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>Agregar Nuevo Empleado</h3>
              <form onSubmit={handleAddEmployee}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Posición"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Departamento"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Salario"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ➕ Agregar Empleado
                </button>
              </form>
            </div>

            {/* Lista de empleados */}
            {employees.length === 0 ? (
              <p>No hay empleados registrados.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Posición</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Departamento</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Salario</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.name}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.email}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.position}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.department}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>${emp.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {currentPage === 'payroll' && (
          <div>
            <h2>💰 Nómina</h2>
            {payroll.length === 0 ? (
              <p>No hay registros de nómina.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#28a745', color: 'white' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Empleado</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Mes</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Año</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Sueldo Base</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Descuentos</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Sueldo Neto</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.map((pay, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pay.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pay.employee_id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pay.month}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pay.year}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>${pay.base_pay}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>${pay.deductions}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>${pay.net_pay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {currentPage === 'attendance' && (
          <div>
            <h2>✅ Asistencia</h2>
            {attendance.length === 0 ? (
              <p>No hay registros de asistencia.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#ffc107', color: 'white' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Empleado</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Fecha</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Entrada</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Salida</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Horas</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((att, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.employee_id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.date}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.check_in_time}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.check_out_time}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.hours_worked}h</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{att.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '2px solid #007bff', marginTop: '20px', paddingTop: '10px', textAlign: 'center', color: '#666' }}>
        <p>Sistema de Gestión de Nómina © 2026</p>
      </footer>
    </div>
  );
};

export default App;