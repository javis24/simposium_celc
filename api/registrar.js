export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, carrera, email, telefono } = req.body || {};
        const fecha = new Date().toLocaleString();

        if (!nombre || !carrera || !email || !telefono) {
            return res.status(400).json({ success: false, message: 'Faltan datos' });
        }

      
        console.log('Registro recibido:', { nombre, carrera, email, telefono, fecha });

        return res.status(200).json({ success: true, message: 'Registro recibido correctamente' });
    }

    res.status(405).json({ success: false, message: 'Método no permitido' });
}
