// esta es la config que necesito para recuperar el punto de entrada de mi app en el index.html para cuando quiero crear un proyecto react con vanilla JS

import { createRoot } from 'react-dom/client'
import { App } from './src/App'

const root = createRoot(document.getElementById('app'))
root.render(<App />)
