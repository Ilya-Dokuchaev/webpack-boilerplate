import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configEnv =
    {
        paths: {
            source: path.resolve(__dirname, '../src/'),
            output: path.resolve(__dirname, '../dist/'),
        },
        server: {
            host: 'localhost',
            port: '3000'
        },
        limits: {
            images: 8192,
            fonts: 8192
        }
    }


export default configEnv