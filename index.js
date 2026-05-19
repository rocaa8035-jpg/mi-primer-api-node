const express = require('express');
// Importamos la versión moderna de File System basada en promesas
const fs = require('fs').promises; 
const path = require('path');

const app = express();
const PORT = 3000;
const ARCHIVO_TAREAS = path.join(__dirname, 'tareas.json');

app.use(express.json());

// --- FUNCIONES DE AYUDA (Para no repetir código) ---

// Leer tareas desde el archivo
async function leerTareas() {
  try {
    const datos = await fs.readFile(ARCHIVO_TAREAS, 'utf-8');
    return JSON.parse(datos);
  } catch (error) {
    // Si el archivo no existe (error ENOENT), devolvemos una lista inicial por defecto
    if (error.code === 'ENOENT') {
      const iniciales = [
        { id: 1, texto: 'Aprender lo básico de Node.js', completada: true },
        { id: 2, texto: 'Crear mi primera API', completada: false }
      ];
      // Creamos el archivo por primera vez
      await guardarTareas(iniciales);
      return iniciales;
    }
    throw error;
  }
}

// Guardar tareas en el archivo
async function guardarTareas(tareas) {
  // El 'null, 2' hace que el JSON se guarde ordenado y bonito (con sangrías)
  await fs.writeFile(ARCHIVO_TAREAS, JSON.stringify(tareas, null, 2), 'utf-8');
}

// --- RUTAS DE LA API ---

app.get('/', (req, res) => {
  res.send('¡Bienvenido! Ve a <a href="/tareas">/tareas</a> para ver tus pendientes.');
});

// 1. LEER tareas del archivo
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await leerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer las tareas' });
  }
});

// 2. CREAR tarea y guardarla
app.post('/tareas', async (req, res) => {
  try {
    const tareas = await leerTareas();
    
    // Generar un ID seguro basado en el último ID existente
    const nuevoId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;

    const nuevaTarea = {
      id: nuevoId,
      texto: req.body.texto,
      completada: false
    };

    tareas.push(nuevaTarea);
    await guardarTareas(tareas); // Guardamos la lista actualizada en el disco duro

    res.status(201).json({ mensaje: 'Tarea guardada en el archivo', tarea: nuevaTarea });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar la tarea' });
  }
});

// 3. ACTUALIZAR estado de la tarea en el archivo
app.put('/tareas/:id', async (req, res) => {
  try {
    const idBuscar = parseInt(req.params.id);
    const tareas = await leerTareas();
    const tarea = tareas.find(t => t.id === idBuscar);

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Esa tarea no existe' });
    }

    tarea.completada = !tarea.completada;
    await guardarTareas(tareas); // Sobrescribimos el archivo con el cambio

    res.json({ mensaje: `Tarea ${idBuscar} actualizada`, tarea });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
  }
});

// 4. ELIMINAR tarea del archivo
app.delete('/tareas/:id', async (req, res) => {
  try {
    const idEliminar = parseInt(req.params.id);
    let tareas = await leerTareas();
    
    const longitudOriginal = tareas.length;
    tareas = tareas.filter(t => t.id !== idEliminar);

    if (tareas.length === longitudOriginal) {
      return res.status(404).json({ mensaje: 'Esa tarea no existe' });
    }

    await guardarTareas(tareas); // Guardamos la lista sin la tarea eliminada
    res.json({ mensaje: `Tarea con ID ${idEliminar} eliminada del archivo` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor persistente corriendo en http://localhost:${PORT}`);
});