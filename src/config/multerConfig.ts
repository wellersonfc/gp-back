import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define o caminho absoluto para o diretório "uploads"
const uploadDir = path.resolve(__dirname, '../uploads');

// Verifica se o diretório existe; caso contrário, cria-o
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Usa o caminho absoluto
    callback(null, uploadDir);
  },

  filename: (req, file, callback) => {
    const timestamp = new Date().getTime();
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); // Remove espaços do nome do arquivo
    callback(null, `${timestamp}_${sanitizedFilename}`);
  },
});
