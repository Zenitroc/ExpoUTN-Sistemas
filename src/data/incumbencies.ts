export interface IncumbencyJob {
  nombre: string
  queHace: string
  materias: number[]
}

export interface IncumbencyArea {
  id: string
  nombre: string
  resumen: string
  alcance: string
  puestos: IncumbencyJob[]
}

export const incumbencyAreas: IncumbencyArea[] = [
  { id: 'desarrollo', nombre: 'Desarrollo de software', resumen: 'Construir el sistema: que funcione, se pueda mantener y no se caiga.', alcance: 'Diseñar, desarrollar, implementar y mantener sistemas de información y software de aplicación.', puestos: [
    { nombre: 'Desarrollador backend', queHace: 'Escribe la lógica y los servicios: reglas de negocio, APIs e integraciones.', materias: [6, 14, 19, 20, 23] },
    { nombre: 'Desarrollador frontend', queHace: 'Construye la parte con la que la persona interactúa, considerando accesibilidad y rendimiento.', materias: [6, 14, 20, 23] },
    { nombre: 'Desarrollador mobile', queHace: 'Desarrolla aplicaciones para celular considerando batería, red, permisos y tiendas de apps.', materias: [14, 20, 23] },
    { nombre: 'Desarrollador de sistemas embebidos', queHace: 'Crea software que corre dentro de dispositivos y trabaja muy cerca del hardware.', materias: [7, 15, 29] },
    { nombre: 'Ingeniero de plataforma / DevOps', queHace: 'Automatiza despliegues y monitoreo para que los equipos puedan entregar sin romper el sistema.', materias: [15, 20, 26] },
  ] },
  { id: 'datos', nombre: 'Datos e inteligencia artificial', resumen: 'Convertir datos sueltos en información para decidir o automatizar.', alcance: 'Diseñar y administrar bases de datos, sistemas de información y modelos para tratar información.', puestos: [
    { nombre: 'Data engineer', queHace: 'Construye cómo llegan, se limpian y quedan disponibles los datos.', materias: [19, 20, 32] },
    { nombre: 'Data analyst', queHace: 'Responde preguntas con datos, arma tableros y explica qué está pasando.', materias: [17, 19, 32] },
    { nombre: 'Data scientist', queHace: 'Construye modelos que predicen o clasifican con estadística, experimentación y validación.', materias: [17, 31, 32] },
    { nombre: 'Machine learning engineer', queHace: 'Lleva modelos a producción y los mantiene cuando los datos cambian.', materias: [28, 31, 32] },
    { nombre: 'Especialista en IA aplicada', queHace: 'Integra modelos de lenguaje y visión en productos y define hasta dónde confiar decisiones.', materias: [31, 32] },
  ] },
  { id: 'ciberseguridad', nombre: 'Ciberseguridad y pericia informática', resumen: 'Proteger sistemas y reconstruir qué pasó cuando ocurre un incidente.', alcance: 'Auditar sistemas y realizar arbitrajes, peritajes y tasaciones sobre sistemas.', puestos: [
    { nombre: 'Analista de seguridad (Blue team)', queHace: 'Monitorea, detecta anomalías, responde incidentes y corrige vulnerabilidades.', materias: [26, 35] },
    { nombre: 'Pentester (Red team)', queHace: 'Prueba sistemas con autorización para encontrar vulnerabilidades antes que un atacante.', materias: [15, 26, 35] },
    { nombre: 'Perito informático', queHace: 'Recupera y preserva evidencia digital para producir informes que se sostienen en juicio.', materias: [24, 35] },
    { nombre: 'Auditor de sistemas', queHace: 'Revisa controles, normativa y trazabilidad de sistemas y procesos.', materias: [16, 25, 30] },
    { nombre: 'Especialista en gobierno de datos y privacidad', queHace: 'Define acceso, conservación y uso responsable de la información.', materias: [19, 24, 35] },
  ] },
  { id: 'gestion', nombre: 'Gestión de proyectos y producto', resumen: 'Que el sistema correcto se construya a tiempo, con los recursos disponibles.', alcance: 'Dirigir y controlar proyectos de sistemas; planificar, organizar y evaluar su implementación.', puestos: [
    { nombre: 'Project leader', queHace: 'Conduce alcance, plazos, riesgos y equipo del proyecto.', materias: [23, 30, 36] },
    { nombre: 'Product owner', queHace: 'Decide qué se construye y en qué orden, con argumentos de producto.', materias: [8, 16, 30] },
    { nombre: 'Scrum master / Agile coach', queHace: 'Mejora cómo trabaja el equipo, destraba y ajusta el proceso.', materias: [23, 30] },
    { nombre: 'Consultor de sistemas', queHace: 'Entiende problemas de una organización y propone un camino de solución.', materias: [8, 16, 33] },
    { nombre: 'Emprendedor / fundador técnico', queHace: 'Crea un producto propio, estimando, diseñando y tomando decisiones tecnológicas.', materias: [18, 30, 34] },
  ] },
  { id: 'analisis', nombre: 'Análisis y procesos', resumen: 'Traducir entre quienes tienen el problema y quienes escriben el código.', alcance: 'Relevar, analizar y modelar procesos y especificar requerimientos de sistemas.', puestos: [
    { nombre: 'Analista funcional', queHace: 'Releva necesidades, las modela y las traduce para el equipo técnico.', materias: [8, 16, 23] },
    { nombre: 'Analista de procesos (BPM)', queHace: 'Detecta pérdidas de tiempo y rediseña cómo trabaja una organización.', materias: [8, 16, 33] },
    { nombre: 'Business analyst', queHace: 'Conecta estrategia de negocio con lo que se puede construir y medir.', materias: [18, 30, 34] },
    { nombre: 'Especialista en transformación digital', queHace: 'Acompaña cambios en la forma de trabajar de una organización.', materias: [8, 30, 33] },
  ] },
  { id: 'calidad', nombre: 'Calidad y testing', resumen: 'Que lo entregado haga lo que dice hacer y pueda demostrarse.', alcance: 'Verificar y certificar sistemas de información y evaluar su calidad.', puestos: [
    { nombre: 'QA analyst', queHace: 'Diseña y ejecuta pruebas para definir si un producto está listo para salir.', materias: [25] },
    { nombre: 'QA automation engineer', queHace: 'Escribe pruebas automáticas que se ejecutan con cada cambio de código.', materias: [20, 25] },
    { nombre: 'Ingeniero de performance', queHace: 'Mide cuánto resiste un sistema y anticipa fallas con usuarios reales.', materias: [25, 28] },
    { nombre: 'Quality control / mejora de procesos', queHace: 'Trabaja sobre métricas, estándares y el proceso de desarrollo.', materias: [25, 30] },
  ] },
  { id: 'infraestructura', nombre: 'Infraestructura, redes y arquitectura', resumen: 'Lo que sostiene todo: dónde corre, cómo se conecta y cómo escala.', alcance: 'Diseñar, dirigir y evaluar infraestructura tecnológica y redes de una organización.', puestos: [
    { nombre: 'Arquitecto de software', queHace: 'Toma decisiones estructurales sobre componentes, integraciones y evolución del sistema.', materias: [20, 23, 30] },
    { nombre: 'Arquitecto de infraestructura / cloud', queHace: 'Diseña servidores, nube, redes y costos equilibrando disponibilidad y presupuesto.', materias: [15, 26, 35] },
    { nombre: 'Administrador de redes', queHace: 'Mantiene redes seguras y disponibles: enrutamiento, segmentación y diagnóstico.', materias: [21, 26] },
    { nombre: 'SRE (Site Reliability Engineer)', queHace: 'Monitorea, atiende incidentes y evita que vuelvan a repetirse.', materias: [15, 26] },
  ] },
  { id: 'diseno', nombre: 'Diseño de experiencia', resumen: 'Que el sistema se entienda sin manual y sirva a quien lo usa.', alcance: 'Participar en el diseño de la interacción entre las personas y los sistemas.', puestos: [
    { nombre: 'Diseñador UX', queHace: 'Investiga usuarios, prueba prototipos y corrige antes de desarrollar.', materias: [8, 16, 23] },
    { nombre: 'Diseñador de interacción / UI', queHace: 'Define comportamiento y forma de una interfaz, incluso frente a errores.', materias: [16, 23] },
    { nombre: 'Especialista en accesibilidad', queHace: 'Hace que los sistemas funcionen también para personas con distintas capacidades.', materias: [16, 23, 24] },
  ] },
  { id: 'academia', nombre: 'Docencia e investigación', resumen: 'Producir conocimiento nuevo y formar a quienes vienen atrás.', alcance: 'Participar en docencia, investigación, desarrollo y transferencia tecnológica.', puestos: [
    { nombre: 'Docente universitario', queHace: 'Da clase, arma material, evalúa y forma parte de una cátedra.', materias: [23, 30] },
    { nombre: 'Investigador', queHace: 'Trabaja sobre problemas abiertos y publica en congresos y revistas.', materias: [28, 36] },
    { nombre: 'Tutor / apoyo académico', queHace: 'Acompaña a estudiantes de los primeros años en su trayectoria.', materias: [] },
    { nombre: 'Extensión y transferencia', queHace: 'Lleva conocimiento de la Facultad a organizaciones, municipios y empresas.', materias: [] },
  ] },
]

export const incumbencyJobCount = incumbencyAreas.reduce((total, area) => total + area.puestos.length, 0)
