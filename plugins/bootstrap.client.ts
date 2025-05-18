import * as bootstrap from 'bootstrap'
import { Modal, Toast } from "bootstrap";
export default defineNuxtPlugin(() => {
    return {
        provide: {
            bootstrap: bootstrap,
            modal: Modal,
            toast: Toast
        }
    }
})