import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const tourProv = [
  {
    element: '#sidebar-dashboard',
    popover: {
      title: '👋 Bienvenido a NEXO',
      description: 'Este es tu Dashboard — una vista general de todas tus operaciones en tiempo real. Aquí verás KPIs, fill rate por cadena y actividad reciente.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-catalogo',
    popover: {
      title: '📦 Catálogo de Productos',
      description: 'Gestiona todos tus SKUs con EAN, precio base, peso y estado. Sin búsqueda obligatoria — todos tus productos visibles de entrada.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-precios',
    popover: {
      title: '🏷️ Listas de Precios',
      description: 'Configura precios diferenciados por cadena. Wong, Tottus y Plaza Vea pueden tener precios distintos para el mismo producto.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-oc',
    popover: {
      title: '📋 Órdenes de Compra',
      description: 'Aquí llegan todas las OCs de tus cadenas. Puedes confirmar, rechazar o confirmar parcialmente. El sistema valida automáticamente en segundos.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-despacho',
    popover: {
      title: '🚛 Aviso de Despacho (ASN)',
      description: 'Antes de enviar la mercadería, crea un ASN avisando al retail exactamente qué viene, en qué camión y a qué hora llega.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-recibo',
    popover: {
      title: '✅ Aviso de Recibo',
      description: 'El retail confirma aquí lo que recibió. Si hay diferencias, quedan registradas automáticamente y se puede iniciar una devolución.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-devolucion',
    popover: {
      title: '↩️ Devoluciones',
      description: 'Gestiona devoluciones con motivo documentado. Al aprobar, SAP genera la nota de crédito automáticamente.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-financiero',
    popover: {
      title: '🧾 Documentos Financieros',
      description: 'Facturas y notas de crédito con descarga directa. Sin correos, sin links que expiran. Alertas automáticas de vencimientos próximos.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-reportes',
    popover: {
      title: '📊 Reportes',
      description: 'Genera reportes de ventas, fill rate, OCs y devoluciones. Siempre disponibles — descarga directa sin links que expiran.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-trazabilidad',
    popover: {
      title: '🔍 Trazabilidad',
      description: 'Sigue el estado de cualquier OC en tiempo real — desde que entra hasta que se cobra. 9 etapas documentadas con timestamps exactos.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#topbar-acciones',
    popover: {
      title: '⚡ Acciones Rápidas',
      description: 'Accesos rápidos con atajos de teclado. Presiona O para Nueva OC, S para Catálogo, L para Lista de Precios, D para Devoluciones.',
      side: 'bottom', align: 'end'
    }
  },
]

const tourRet = [
  {
    element: '#sidebar-dashboard',
    popover: {
      title: '👋 Bienvenido a NEXO',
      description: 'Este es tu Dashboard — ve el estado de todas tus órdenes, lo que está en camino y lo que tienes pendiente de pago.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-nueva-oc',
    popover: {
      title: '📋 Nueva Orden de Compra',
      description: 'Crea una OC en menos de 2 minutos. Selecciona productos del catálogo de Arca, ajusta cantidades y envía directamente.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-mis-ocs',
    popover: {
      title: '📦 Mis Órdenes',
      description: 'Aquí verás todas tus OCs con su estado en tiempo real. Confirmada, En despacho, Recibida — siempre actualizado.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-recepciones',
    popover: {
      title: '✅ Recepciones',
      description: 'Cuando llegue tu pedido, confirma aquí lo que recibiste. Si hay alguna diferencia, inicia una devolución directamente.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-mis-facturas',
    popover: {
      title: '🧾 Mis Facturas',
      description: 'Consulta y descarga tus facturas cuando quieras. Sin correos ni links que expiran. Verás cuántos días faltan para el vencimiento.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#sidebar-ayuda',
    popover: {
      title: '💬 Centro de Ayuda',
      description: 'Guías paso a paso y preguntas frecuentes. Para incidentes críticos tenemos soporte 24/7 con respuesta en menos de 30 minutos.',
      side: 'right', align: 'start'
    }
  },
  {
    element: '#topbar-nueva-oc-btn',
    popover: {
      title: '🚀 ¡Listo para empezar!',
      description: 'Haz clic aquí para crear tu primera orden de compra a Arca Continental. El proceso toma menos de 2 minutos.',
      side: 'bottom', align: 'end'
    }
  },
]

export function useTour(role) {
  const startTour = () => {
    const steps = role === 'prov' ? tourProv : tourRet

    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayOpacity: 0.6,
      smoothScroll: true,
      allowClose: true,
      progressText: '{{current}} de {{total}}',
      nextBtnText: 'Siguiente →',
      prevBtnText: '← Anterior',
      doneBtnText: '¡Entendido! 🎉',
      onDestroyStarted: () => {
        localStorage.setItem('nexo-tour-done-' + role, 'true')
        driverObj.destroy()
      },
      steps,
    })

    driverObj.drive()
  }

  const isTourDone = () => localStorage.getItem('nexo-tour-done-' + role) === 'true'
  const resetTour = () => localStorage.removeItem('nexo-tour-done-' + role)

  return { startTour, isTourDone, resetTour }
}
