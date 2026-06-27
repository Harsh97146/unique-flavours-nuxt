import Swal, { type SweetAlertIcon } from 'sweetalert2'

type ToastIcon = 'success' | 'error' | 'warning' | 'info'

const toastDefaults = {
  toast: true,
  position: 'top-end' as const,
  timer: 3200,
  timerProgressBar: true,
  showConfirmButton: false,
  customClass: {
    popup: 'uf-toast',
    title: 'uf-toast-title',
    htmlContainer: 'uf-toast-text',
    timerProgressBar: 'uf-toast-progress',
  },
}

export default defineNuxtPlugin(() => {
  const swal = {
    toast(title: string, icon: ToastIcon = 'success', text?: string) {
      Swal.fire({
        ...toastDefaults,
        title,
        text,
        icon,
      })
    },
    confirm(title: string, text: string, icon: SweetAlertIcon = 'question') {
      return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#50267C',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'Cancel',
        customClass: { popup: 'uf-dialog' },
      })
    },
    alert(title: string, text: string, icon: SweetAlertIcon = 'info') {
      return Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#50267C',
        customClass: { popup: 'uf-dialog' },
      })
    },
    error(title: string, text: string) {
      return Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonColor: '#50267C',
        customClass: { popup: 'uf-dialog' },
      })
    },
  }

  return { provide: { swal } }
})
