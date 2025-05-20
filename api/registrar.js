import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Método no permitido' });
    }

    const { nombre, carrera, email, telefono } = req.body;
    const fecha = new Date().toLocaleString();

    if (!nombre || !carrera || !email || !telefono) {
        return res.status(400).json({ success: false, message: 'Faltan datos en el formulario' });
    }

    try {
        const auth = new google.auth.JWT(
            process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            null,
            process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'A:E', // 5 columnas: A - E
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[nombre, carrera, email, telefono, fecha]],
            },
        });

        return res.status(200).json({ success: true, message: 'Registro guardado correctamente en Google Sheets' });

    } catch (error) {
        console.error('Error al guardar en Google Sheets:', error);
        return res.status(500).json({ success: false, message: 'Error al guardar en Google Sheets' });
    }
}
