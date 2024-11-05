import "./index.scss"
import React, { StrictMode, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import Loading from "./pages/Loading/index.jsx"
import { Page } from "./components/elements/index.js"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Suspense
            fallback={
                <Page name="سلامت روان" back={false}>
                    <Loading />
                </Page>
            }
        >
            <BrowserRouter basename={BASE_URL}>
                <App />
            </BrowserRouter>
        </Suspense>
    </StrictMode>
)
