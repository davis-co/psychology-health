import React, { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import Loading from "./pages/Loading/index.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Suspense fallback={<Loading />}>
            <BrowserRouter basename={BASE_URL}>
                <App />
            </BrowserRouter>
        </Suspense>
    </StrictMode>
)
